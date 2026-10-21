import { ApiError } from './apiError';

export { ApiError } from './apiError';

type Primitive = string | number | boolean;
type QueryValue = Primitive | null | undefined | Primitive[];
type QueryParams = Record<string, QueryValue>;
type ApiRequestBody = BodyInit | object | null;
type RequestOptions = Omit<RequestInit, 'body' | 'method' | 'credentials'> & {
  auth?: boolean;
  body?: ApiRequestBody;
  query?: QueryParams;
  /** Retorna Response sem consumir o corpo nem converter status HTTP em ApiError. */
  raw?: boolean;
};

export interface RespostaPadrao<TConteudo> {
  conteudo: TConteudo;
  msg: string;
  code: number;
}
export interface RespostaErro {
  conteudo: null;
  msg: string;
  code: number;
}
export interface RespostaErroDetalhado extends RespostaErro {
  file: string;
  line: number;
  exception: string;
  trace: string;
}
export type RespostaApi<TConteudo> = RespostaPadrao<TConteudo> | RespostaErro | RespostaErroDetalhado;

export function unwrapResposta<TConteudo>(data: RespostaApi<TConteudo>): TConteudo {
  if (data.code >= 400) throw new ApiError(data.msg || `Erro na requisicao: ${data.code}`, data.code, data);
  return (data as RespostaPadrao<TConteudo>).conteudo;
}

export interface ApiAuthPolicy {
  getAuthorization: () => string | null;
  isExpired: (data: unknown) => boolean;
  refresh: () => Promise<unknown>;
  onRefreshFailure: () => void;
}
export interface ApiClientConfig {
  resolveBaseUrl: () => string | Promise<string>;
  credentials: RequestCredentials;
  auth?: ApiAuthPolicy;
}

function appendQueryParams(url: URL, query?: QueryParams): void {
  if (!query) return;
  Object.entries(query).forEach(([key, value]) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      const arrayKey = key.endsWith('[]') ? key : `${key}[]`;
      value.forEach((item) => url.searchParams.append(arrayKey, String(item)));
    } else {
      url.searchParams.set(key, String(value));
    }
  });
}

function isJsonBody(body: ApiRequestBody | undefined): body is object {
  if (!body || typeof body !== 'object') return false;
  if (Array.isArray(body)) return true;
  const prototype = Object.getPrototypeOf(body);
  return prototype === Object.prototype || prototype === null;
}

async function parseResponse(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205) return null;
  const contentType = response.headers.get('content-type') ?? '';
  return contentType.includes('json') ? response.json() : response.text();
}

function responseMessage(data: unknown, status: number): string {
  if (typeof data === 'object' && data !== null) {
    if ('message' in data && typeof data.message === 'string') return data.message;
    if ('msg' in data && typeof data.msg === 'string') return data.msg;
  }
  return `Erro na requisicao: ${status}`;
}

export function resolveRequestUrl(baseUrl: string, path: string, origin: string): URL {
  const base = new URL(baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`, origin);
  if (/^https?:\/\//i.test(path)) return new URL(path);
  const basePath = base.pathname.replace(/\/$/, '');
  if (basePath && basePath !== '/' && (path === basePath || path.startsWith(`${basePath}/`))) {
    return new URL(path, base.origin);
  }
  return new URL(path.replace(/^\/+/, ''), base);
}

export function createApiClient(config: ApiClientConfig) {
  async function request<T>(path: string, options: RequestOptions & { method?: string } = {}, retry = true): Promise<T> {
    const { auth = true, body, headers, query, raw = false, ...init } = options;
    const baseUrl = await config.resolveBaseUrl();
    const url = resolveRequestUrl(baseUrl, path, window.location.origin);
    const configuredOrigin = new URL(baseUrl, window.location.origin).origin;
    if (url.origin !== configuredOrigin) {
      throw new Error('Origem externa nao permitida para este cliente HTTP.');
    }
    appendQueryParams(url, query);

    const requestHeaders = new Headers(headers);
    if (auth && config.auth && !requestHeaders.has('Authorization')) {
      const authorization = config.auth.getAuthorization();
      if (authorization) requestHeaders.set('Authorization', authorization);
    }
    let requestBody: BodyInit | null | undefined;
    if (isJsonBody(body)) {
      if (!requestHeaders.has('Content-Type')) requestHeaders.set('Content-Type', 'application/json');
      requestBody = JSON.stringify(body);
    } else {
      requestBody = body as BodyInit | null | undefined;
    }
    const response = await fetch(url, {
      ...init,
      credentials: config.credentials,
      headers: requestHeaders,
      body: requestBody,
    });
    if (raw) return response as T;
    const data = await parseResponse(response);
    if (!response.ok) {
      if (retry && auth && !new Headers(headers).has('Authorization') && config.auth?.isExpired(data)) {
        try {
          await config.auth.refresh();
        } catch (error) {
          config.auth.onRefreshFailure();
          throw error;
        }
        return request<T>(path, options, false);
      }
      throw new ApiError(responseMessage(data, response.status), response.status, data);
    }
    return data as T;
  }

  return {
    request,
    get: <T>(path: string, options?: Omit<RequestOptions, 'body'>) => request<T>(path, { ...options, method: 'GET' }),
    post: <T>(path: string, body?: ApiRequestBody, options?: Omit<RequestOptions, 'body'>) => request<T>(path, { ...options, method: 'POST', body }),
    put: <T>(path: string, body?: ApiRequestBody, options?: Omit<RequestOptions, 'body'>) => request<T>(path, { ...options, method: 'PUT', body }),
    patch: <T>(path: string, body?: ApiRequestBody, options?: Omit<RequestOptions, 'body'>) => request<T>(path, { ...options, method: 'PATCH', body }),
    delete: <T>(path: string, options?: Omit<RequestOptions, 'body'>) => request<T>(path, { ...options, method: 'DELETE' }),
  };
}
