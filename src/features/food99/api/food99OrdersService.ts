import { unwrapResposta, type RespostaApi } from '../../../services/apiClient';
import { food99Api } from '../../../services/apiClients';
import type { Food99PedidoDto, Food99ReprocessamentoPedidoDto, Food99FilaPedidosDto } from './dtos/food99OrdersDtos';

export interface Food99FilaPedidosParams {
    limit?: number;
    app_shop_id?: string;
}

export interface Food99RequestOptions {
    signal?: AbortSignal;
}


const PEDIDOS_BASE_PATH = '/api/v1/food99/orders';

const getConteudo = <T>(resposta: RespostaApi<T>): T => unwrapResposta(resposta);

export const food99PedidosService = {
    async listFilaSincronizacao(parametros: Food99FilaPedidosParams = {}, opcoes: Food99RequestOptions = {}): Promise<Food99FilaPedidosDto> {
        const resposta = await food99Api.get<RespostaApi<Food99FilaPedidosDto>>(`${PEDIDOS_BASE_PATH}/sync-queue`, {
            signal: opcoes.signal,
            query: {
                limit: parametros.limit,
                app_shop_id: parametros.app_shop_id,
            },
        });

        return getConteudo(resposta);
    },

    async getPedido(pedidoFood99Id: number): Promise<Food99PedidoDto> {
        const resposta = await food99Api.get<RespostaApi<Food99PedidoDto>>(`${PEDIDOS_BASE_PATH}/${pedidoFood99Id}`);
        return getConteudo(resposta);
    },

    async reprocess(pedidoFood99Id: number): Promise<Food99ReprocessamentoPedidoDto> {
        const resposta = await food99Api.post<RespostaApi<Food99ReprocessamentoPedidoDto>>(
            `${PEDIDOS_BASE_PATH}/${pedidoFood99Id}/sync-erp`,
        );

        return getConteudo(resposta);
    },
};
