let cachedBaseUrl: string | null = null;
let baseUrlPromise: Promise<string> | null = null;
const LOCAL_API_ORIGIN = 'http://127.0.0.1:8000';
const BASE_URL_RESOLUTION_PATH = '/webcontrol/apoio/novo_inicio/BaseUrl.php';

function isLocalHost(): boolean {
  const { hostname } = window.location;
  return hostname.includes('localhost') || hostname.includes('127.0.0.1');
}

export function detectBaseUrl(): string {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return normalizeBaseUrl(configuredBaseUrl);
  }

  if (import.meta.env.DEV) {
    return LOCAL_API_ORIGIN;
  }

  const { hostname } = window.location;

  if (isLocalHost()) {
    return LOCAL_API_ORIGIN;
  }

  if (hostname.includes("webcontrol.test")) {
    return "http://webcontrol.test";
  }

  return "/webcontrol";
}

export function normalizeBaseUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value.endsWith('/') ? value.slice(0, -1) : value;
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
}

export function getCachedBaseUrl(): string {
  if (!cachedBaseUrl) {
    cachedBaseUrl = detectBaseUrl();
  }

  return cachedBaseUrl;
}

export async function resolveBaseUrl(): Promise<string> {
  if (cachedBaseUrl) {
    return cachedBaseUrl;
  }

  // Em desenvolvimento e quando a URL foi definida no ambiente, nao consultar
  // o endpoint legado relativo ao Vite. Assim as requisicoes da API usam a
  // origem configurada diretamente.
  if (import.meta.env.DEV || import.meta.env.VITE_API_BASE_URL?.trim() || isLocalHost()) {
    cachedBaseUrl = detectBaseUrl();
    return cachedBaseUrl;
  }

  if (!baseUrlPromise) {
    const fallbackBaseUrl = detectBaseUrl();

    baseUrlPromise = fetch(BASE_URL_RESOLUTION_PATH, {
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Nao foi possivel resolver baseUrl: ${response.status}`);
        }

        const data = await response.json();
        return normalizeBaseUrl(data.baseUrl ?? fallbackBaseUrl);
      })
      .catch(() => fallbackBaseUrl)
      .then((resolvedBaseUrl) => {
        cachedBaseUrl = resolvedBaseUrl;
        return resolvedBaseUrl;
      })
      .finally(() => {
        baseUrlPromise = null;
      });
  }

  return baseUrlPromise;
}
