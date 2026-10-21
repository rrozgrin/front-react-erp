import {
    food99PedidosService,
    type Food99FilaPedidosParams,
} from '../api/food99OrdersService';
import { useConsultaApi } from '../../../common/hooks/useConsultaApi';
import { food99FilaPedidosFromApi, food99ReprocessamentoPedidoFromApi } from '../adapters/food99OrdersAdapter';
import { useFood99Mutation } from './useFood99Mutation';

export type {
  Food99Pedido,
  Food99StatusSincronizacaoPedido,
} from '../types/food99Orders';

const FOOD99_PEDIDOS_CACHE_MS = 5_000;

/** Consulta declarativa usada pelas páginas; o service continua responsável pelo envelope `conteudo`. */
export function useFood99Pedidos(parametros: Food99FilaPedidosParams = {}) {
  const chave = ['food99', 'orders', parametros.limit ?? null, parametros.app_shop_id ?? null] as const;

  return useConsultaApi({
    chave,
    consultar: ({ signal }) => food99PedidosService.listFilaSincronizacao(parametros, { signal }).then(food99FilaPedidosFromApi),
    tempoValidade: FOOD99_PEDIDOS_CACHE_MS,
    intervaloAtualizacao: 15_000,
  });
}

export function useFood99PedidosMutations() {
  const reprocess = useFood99Mutation(
    async (pedidoFood99Id: number) => food99ReprocessamentoPedidoFromApi(await food99PedidosService.reprocess(pedidoFood99Id)),
    ['food99', 'orders'],
  );

  return { ...reprocess, reprocess: reprocess.executar };
}
