import { ApiError } from './apiError';
import { resolveBaseUrl } from './baseUrl';

export interface TokenJWT {
  access_token: string;
  token_type: string;
}

const ACCESS_TOKEN_KEY = 'access_token';
const TOKEN_TYPE_KEY = 'token_type';
let refreshTokenPromise: Promise<TokenJWT> | null = null;

export function getStoredToken(): TokenJWT | null {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const tokenType = localStorage.getItem(TOKEN_TYPE_KEY);
  return accessToken && tokenType ? { access_token: accessToken, token_type: tokenType } : null;
}

export function persistToken(token: TokenJWT): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
  localStorage.setItem(TOKEN_TYPE_KEY, token.token_type);
}

export function clearStoredToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(TOKEN_TYPE_KEY);
}

export function redirectToLogin(): void {
  if (window.location.pathname === '/') return;
  window.history.pushState({}, '', '/');
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function isTokenJWT(data: unknown): data is TokenJWT {
  return typeof data === 'object' && data !== null &&
    'access_token' in data && typeof data.access_token === 'string' &&
    'token_type' in data && typeof data.token_type === 'string';
}

// O JWT é emitido pela API WebControl, inclusive para as rotas da 99Food.
export function refreshAccessToken(): Promise<TokenJWT> {
  if (!refreshTokenPromise) {
    refreshTokenPromise = (async () => {
      const token = getStoredToken();
      if (!token) throw new ApiError('Sessao expirada.', 401, null);

      const baseUrl = await resolveBaseUrl();
      const response = await fetch(new URL(`${baseUrl}/api/v1/refresh`, window.location.origin), {
        method: 'POST',
        credentials: 'include',
        headers: { Authorization: `${token.token_type} ${token.access_token}` },
      });
      const data: unknown = await response.json();
      if (!response.ok || !isTokenJWT(data)) {
        const message = typeof data === 'object' && data !== null && 'msg' in data &&
          typeof data.msg === 'string' ? data.msg : 'Erro ao atualizar token de acesso.';
        throw new ApiError(message, response.status, data);
      }
      persistToken(data);
      return data;
    })().finally(() => { refreshTokenPromise = null; });
  }
  return refreshTokenPromise;
}
