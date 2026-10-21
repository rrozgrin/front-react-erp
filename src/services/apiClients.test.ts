import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./baseUrl', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./baseUrl')>()),
  resolveBaseUrl: vi.fn().mockResolvedValue('https://web.example/base'),
}));

import { food99Api, webcontrolApi } from './apiClients';
import { getStoredToken, persistToken } from './authSession';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

beforeEach(() => {
  vi.unstubAllEnvs();
  const values = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
  });
  vi.stubGlobal('window', {
    location: { origin: 'https://app.example', pathname: '/private' },
    history: { pushState: vi.fn() },
    dispatchEvent: vi.fn(),
  });
  vi.stubGlobal('PopStateEvent', Event);
  vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => json({ ok: true })));
});

describe('configuração das APIs', () => {
  it('seleciona explicitamente WebControl ou a origem configurada da 99Food', async () => {
    vi.stubEnv('VITE_FOOD99_API_BASE_URL', 'https://food.example/root/');
    await webcontrolApi.get('/api/v1/food99/auth/shops');
    await food99Api.get('/api/v1/food99/auth/shops');
    const calls = vi.mocked(fetch).mock.calls;
    expect((calls[0][0] as URL).toString()).toBe('https://web.example/base/api/v1/food99/auth/shops');
    expect((calls[1][0] as URL).toString()).toBe('https://food.example/root/api/v1/food99/auth/shops');
  });

  it('usa o destino WebControl para 99Food sem variável dedicada', async () => {
    vi.stubEnv('VITE_FOOD99_API_BASE_URL', '');
    await food99Api.get('/api/v1/food99/orders');
    expect((vi.mocked(fetch).mock.calls[0][0] as URL).toString())
      .toBe('https://web.example/base/api/v1/food99/orders');
  });

  it('compartilha uma renovação para requisições simultâneas', async () => {
    persistToken({ access_token: 'antigo', token_type: 'Bearer' });
    vi.mocked(fetch).mockImplementation(async (input, init) => {
      const url = input.toString();
      if (url.endsWith('/api/v1/refresh')) {
        return json({ access_token: 'novo', token_type: 'Bearer' });
      }
      const authorization = new Headers(init?.headers).get('Authorization');
      return authorization === 'Bearer novo'
        ? json({ ok: true })
        : json({ code: 401, conteudo: 'token-expirado', msg: 'expirado' }, 401);
    });
    const results = await Promise.all([
      webcontrolApi.get('/one'),
      food99Api.get('/two'),
    ]);
    expect(results).toEqual([{ ok: true }, { ok: true }]);
    expect(getStoredToken()?.access_token).toBe('novo');
    expect(vi.mocked(fetch).mock.calls.filter(([input]) => input.toString().endsWith('/api/v1/refresh')))
      .toHaveLength(1);
  });

  it('limpa a sessão e redireciona quando a renovação falha', async () => {
    persistToken({ access_token: 'antigo', token_type: 'Bearer' });
    vi.mocked(fetch).mockImplementation(async (input) => input.toString().endsWith('/api/v1/refresh')
      ? json({ msg: 'falha' }, 401)
      : json({ code: 401, conteudo: 'token-expirado', msg: 'expirado' }, 401));
    await expect(webcontrolApi.get('/secure')).rejects.toThrow('falha');
    expect(getStoredToken()).toBeNull();
    expect(window.history.pushState).toHaveBeenCalledOnce();
  });
});
