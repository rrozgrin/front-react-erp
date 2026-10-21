import { useAsyncQuery } from '../useAsyncQuery';
import { pedidosService } from '../../services/pedidos/pedidosService';

type ApiObject = Record<string, unknown>;

const NUMBER_KEYS = ['quantidade', 'qtd', 'total', 'count', 'novosPedidos', 'novos_pedidos'];
const ARRAY_KEYS = ['pedidos', 'data', 'results', 'items'];

function tryParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function extractPositiveNumber(value: unknown): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed || trimmed === '0' || trimmed.toLowerCase() === 'false' || trimmed.toLowerCase() === 'null') {
      return 0;
    }

    const numericValue = Number(trimmed);
    if (Number.isFinite(numericValue)) {
      return numericValue > 0 ? numericValue : 0;
    }
  }

  return 0;
}

function getNovosPedidosCount(payload: unknown): number {
  if (!payload || payload === false) return 0;
  if (Array.isArray(payload)) return payload.length;

  const directNumber = extractPositiveNumber(payload);
  if (directNumber > 0) return directNumber;

  if (typeof payload === 'object') {
    const data = payload as ApiObject;

    for (const key of ARRAY_KEYS) {
      if (Array.isArray(data[key])) return data[key].length;
    }

    for (const key of NUMBER_KEYS) {
      const count = extractPositiveNumber(data[key]);
      if (count > 0) return count;
    }
  }

  return 0;
}

export function useNovosPedidosQuery(endpoint: string) {
  return useAsyncQuery<number>(
    async () => {
      const rawPayload = await pedidosService.buscarNovosPedidos(endpoint);
      return getNovosPedidosCount(tryParseJson(rawPayload));
    },
    [endpoint],
    { initialData: 0, enabled: Boolean(endpoint) },
  );
}
