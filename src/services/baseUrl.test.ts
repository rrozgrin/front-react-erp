import { beforeEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  vi.stubGlobal('window', { location: { hostname: 'app.example' } });
  vi.stubGlobal('fetch', vi.fn());
});

describe('origem WebControl', () => {
  it('usa a variável configurada sem consultar o legado', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://configured.example/api/');
    const { resolveBaseUrl } = await import('./baseUrl');
    expect(await resolveBaseUrl()).toBe('https://configured.example/api');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('usa a origem local em desenvolvimento', async () => {
    vi.stubEnv('DEV', true);
    vi.stubEnv('VITE_API_BASE_URL', '');
    const { resolveBaseUrl } = await import('./baseUrl');
    expect(await resolveBaseUrl()).toBe('http://127.0.0.1:8000');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('descobre a base legada em produção e deduplica consultas', async () => {
    vi.stubEnv('DEV', false);
    vi.stubEnv('VITE_API_BASE_URL', '');
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ baseUrl: 'https://legacy.example/webcontrol/' }), {
      headers: { 'content-type': 'application/json' },
    }));
    const { resolveBaseUrl } = await import('./baseUrl');
    const [first, second] = await Promise.all([resolveBaseUrl(), resolveBaseUrl()]);
    expect(first).toBe('https://legacy.example/webcontrol');
    expect(second).toBe(first);
    expect(fetch).toHaveBeenCalledOnce();
    expect(vi.mocked(fetch).mock.calls[0][1]?.credentials).toBe('include');
  });

  it('mantém o destino de produção quando a descoberta falha', async () => {
    vi.stubEnv('DEV', false);
    vi.stubEnv('VITE_API_BASE_URL', '');
    vi.mocked(fetch).mockRejectedValue(new Error('offline'));
    const { resolveBaseUrl } = await import('./baseUrl');
    expect(await resolveBaseUrl()).toBe('/webcontrol');
  });
});
