import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, createApiClient, resolveRequestUrl } from './apiClient';

const origin = 'https://app.example';
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

beforeEach(() => {
  vi.stubGlobal('window', { location: { origin } });
  vi.stubGlobal('fetch', vi.fn());
});

describe('cliente HTTP', () => {
  it('preserva caminho, query existente e query adicional', async () => {
    const fetchMock = vi.mocked(fetch).mockImplementation(async () => json({ ok: true }));
    const client = createApiClient({ resolveBaseUrl: () => 'https://api.example/prefix', credentials: 'include' });
    await client.get('/items?existing=1', { query: { page: 2, tags: ['a', 'b'] } });
    const url = fetchMock.mock.calls[0][0] as URL;
    expect(url.toString()).toBe('https://api.example/prefix/items?existing=1&page=2&tags%5B%5D=a&tags%5B%5D=b');
    expect(resolveRequestUrl('/webcontrol', '/webcontrol/apoio/test.php', origin).pathname)
      .toBe('/webcontrol/apoio/test.php');
  });

  it('não resolve a base interna para uma integração pública externa', async () => {
    const resolver = vi.fn(() => 'https://public.example');
    const fetchMock = vi.mocked(fetch).mockImplementation(async () => json({ ok: true }));
    const client = createApiClient({ resolveBaseUrl: resolver, credentials: 'omit' });
    await client.get('/data');
    expect(resolver).toHaveBeenCalledOnce();
    expect((fetchMock.mock.calls[0][0] as URL).origin).toBe('https://public.example');
    expect(fetchMock.mock.calls[0][1]?.credentials).toBe('omit');
    expect(new Headers(fetchMock.mock.calls[0][1]?.headers).has('Authorization')).toBe(false);
  });

  it('bloqueia outra origem em cliente autenticado', async () => {
    const client = createApiClient({ resolveBaseUrl: () => 'https://api.example', credentials: 'include' });
    await expect(client.get('https://other.example/data')).rejects.toThrow('Origem externa');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('serializa JSON e envia URLSearchParams, FormData, Blob e ArrayBuffer diretamente', async () => {
    const fetchMock = vi.mocked(fetch).mockImplementation(async () => json({ ok: true }));
    const client = createApiClient({ resolveBaseUrl: () => origin, credentials: 'omit' });
    const bodies = [
      { value: 1 },
      new URLSearchParams({ value: '1' }),
      new FormData(),
      new Blob(['x']),
      new Uint8Array([1, 2]).buffer,
    ];
    for (const body of bodies) await client.post('/data', body);
    const inits = fetchMock.mock.calls.map((call) => call[1]);
    expect(inits[0]?.body).toBe('{"value":1}');
    expect(new Headers(inits[0]?.headers).get('Content-Type')).toBe('application/json');
    bodies.slice(1).forEach((body, index) => {
      expect(inits[index + 1]?.body).toBe(body);
      expect(new Headers(inits[index + 1]?.headers).has('Content-Type')).toBe(false);
    });
  });

  it('respeita auth false, AbortSignal, 204 e o retorno bruto', async () => {
    const fetchMock = vi.mocked(fetch)
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(json({ msg: 'erro' }, 400));
    const signal = new AbortController().signal;
    const client = createApiClient({
      resolveBaseUrl: () => origin,
      credentials: 'include',
      auth: {
        getAuthorization: () => 'Bearer antigo',
        isExpired: () => false,
        refresh: vi.fn(),
        onRefreshFailure: vi.fn(),
      },
    });
    expect(await client.get('/empty', { auth: false, signal })).toBeNull();
    expect(new Headers(fetchMock.mock.calls[0][1]?.headers).has('Authorization')).toBe(false);
    expect(fetchMock.mock.calls[0][1]?.signal).toBe(signal);
    const response = await client.get<Response>('/raw', { raw: true });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ msg: 'erro' });
  });

  it('renova uma vez e repete a requisição com novo token', async () => {
    let token = 'antigo';
    const refresh = vi.fn(async () => { token = 'novo'; });
    const fetchMock = vi.mocked(fetch)
      .mockResolvedValueOnce(json({ code: 401, conteudo: 'token-expirado', msg: 'expirado' }, 401))
      .mockResolvedValueOnce(json({ ok: true }));
    const client = createApiClient({
      resolveBaseUrl: () => origin,
      credentials: 'include',
      auth: {
        getAuthorization: () => `Bearer ${token}`,
        isExpired: (data) => typeof data === 'object' && data !== null && 'conteudo' in data && data.conteudo === 'token-expirado',
        refresh,
        onRefreshFailure: vi.fn(),
      },
    });
    expect(await client.get('/secure')).toEqual({ ok: true });
    expect(refresh).toHaveBeenCalledOnce();
    expect(new Headers(fetchMock.mock.calls[0][1]?.headers).get('Authorization')).toBe('Bearer antigo');
    expect(new Headers(fetchMock.mock.calls[1][1]?.headers).get('Authorization')).toBe('Bearer novo');
  });

  it('não renova uma requisição pública nem tenta renovar indefinidamente', async () => {
    const expired = json({ code: 401, conteudo: 'token-expirado', msg: 'expirado' }, 401);
    const refresh = vi.fn().mockResolvedValue(undefined);
    const client = createApiClient({
      resolveBaseUrl: () => origin,
      credentials: 'include',
      auth: {
        getAuthorization: () => 'Bearer token',
        isExpired: () => true,
        refresh,
        onRefreshFailure: vi.fn(),
      },
    });
    vi.mocked(fetch).mockImplementation(async () => expired.clone());
    await expect(client.get('/login', { auth: false })).rejects.toBeInstanceOf(ApiError);
    expect(refresh).not.toHaveBeenCalled();
    await expect(client.get('/secure')).rejects.toBeInstanceOf(ApiError);
    expect(refresh).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});
