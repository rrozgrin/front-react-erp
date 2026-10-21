export type Food99StatusSincronizacaoPedido =
    | 'new_order'
    | 'pending_sync'
    | 'synced'
    | 'canceled';

export interface Food99ItemPedido {
    id: number;
    itemAppId: string | null;
    idExterno: string | null;
    nome: string | null;
    quantidade: number;
    precoUnitario: number | null;
    precoTotal: number | null;
    precoReal: number | null;
}

export interface Food99Pedido {
    id: number;
    lojaFood99Id: number;
    lojaAppId: string;
    pedidoId: string;
    status: number | null;
    nomeCliente: string | null;
    telefoneCliente: string | null;
    statusSincronizacao: Food99StatusSincronizacaoPedido;
    vendaId: number | null;
    vendaErpId: string | null;
    mensagemErro: string | null;
    criadoEm: string | null;
    pagoEm: string | null;
    concluidoEm: string | null;
    canceladoEm: string | null;
    itens: Food99ItemPedido[];
}

export interface Food99FilaPedidos {
    cadastroId: number;
    lojaAppId: string | null;
    total: number;
    pedidos: Food99Pedido[];
}

export interface Food99ResultadoReprocessamentoPedido {
    pedidoFood99Id: number;
    pedidoId: string;
    statusSincronizacao: Food99StatusSincronizacaoPedido;
    status: string;
    message: string;
}
