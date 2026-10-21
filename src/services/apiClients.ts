import { createApiClient, type ApiAuthPolicy } from './apiClient';
import { clearStoredToken, getStoredToken, redirectToLogin, refreshAccessToken } from './authSession';
import { normalizeBaseUrl, resolveBaseUrl } from './baseUrl';

const jwtAuth: ApiAuthPolicy = {
  getAuthorization: () => {
    const token = getStoredToken();
    return token ? `${token.token_type} ${token.access_token}` : null;
  },
  isExpired: (data) => typeof data === 'object' && data !== null &&
    'code' in data && data.code === 401 &&
    'conteudo' in data && data.conteudo === 'token-expirado',
  refresh: refreshAccessToken,
  onRefreshFailure: () => {
    clearStoredToken();
    redirectToLogin();
  },
};

export const webcontrolApi = createApiClient({
  resolveBaseUrl,
  credentials: 'include',
  auth: jwtAuth,
});

export const food99Api = createApiClient({
  resolveBaseUrl: () => {
    const configured = import.meta.env.VITE_FOOD99_API_BASE_URL?.trim();
    return configured ? normalizeBaseUrl(configured) : resolveBaseUrl();
  },
  credentials: 'include',
  auth: jwtAuth,
});

export const viaCepApi = createApiClient({
  resolveBaseUrl: () => 'https://viacep.com.br',
  credentials: 'omit',
});

export const receitaWsApi = createApiClient({
  resolveBaseUrl: () => 'https://api3.webcontrolempresas.com.br/api2webcontrol/public',
  credentials: 'omit',
});
