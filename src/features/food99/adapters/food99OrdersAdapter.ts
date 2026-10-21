import type {
    Food99PedidoDto,
    Food99ItemPedidoDto,
    Food99ReprocessamentoPedidoDto,
    Food99FilaPedidosDto,
} from '../api/dtos/food99OrdersDtos';
import type {
    Food99FilaPedidos,
    Food99ItemPedido,
    Food99Pedido,
    Food99ResultadoReprocessamentoPedido,
} from '../types/food99Orders';

function food99ItemPedidoFromApi(dto: Food99ItemPedidoDto): Food99ItemPedido {
    return {
        id: dto.id,
        itemAppId: dto.app_item_id,
        idExterno: dto.app_external_id,
        nome: dto.item_name,
        quantidade: dto.amount,
        precoUnitario: dto.sku_price,
        precoTotal: dto.total_price,
        precoReal: dto.real_price,
    };
}

export function food99PedidoFromApi(dto: Food99PedidoDto): Food99Pedido {
    return {
        id: dto.id,
        lojaFood99Id: dto.food99_shop_id,
        lojaAppId: dto.app_shop_id,
        pedidoId: dto.order_id,
        status: dto.status,
        nomeCliente: dto.customer_name,
        telefoneCliente: dto.customer_phone,
        statusSincronizacao: dto.sync_status,
        vendaId: dto.id_venda,
        vendaErpId: dto.erp_sale_id,
        mensagemErro: dto.error_message,
        criadoEm: dto.create_time,
        pagoEm: dto.pay_time,
        concluidoEm: dto.complete_time,
        canceladoEm: dto.cancel_time,
        itens: dto.items.map(food99ItemPedidoFromApi),
    };
}

export function food99FilaPedidosFromApi(dto: Food99FilaPedidosDto): Food99FilaPedidos {
    return {
        cadastroId: dto.id_cadastro,
        lojaAppId: dto.app_shop_id,
        total: dto.total,
        pedidos: dto.orders.map(food99PedidoFromApi),
    };
}

export function food99ReprocessamentoPedidoFromApi(dto: Food99ReprocessamentoPedidoDto): Food99ResultadoReprocessamentoPedido {
    return {
        pedidoFood99Id: dto.food99_order_id,
        pedidoId: dto.order_id,
        statusSincronizacao: dto.sync_status,
        status: dto.status,
        message: dto.message,
    };
}
