export type Food99StatusSincronizacaoPedidoDto =
    | 'new_order'
    | 'pending_sync'
    | 'synced'
    | 'canceled';

export interface Food99ItemPedidoDto {
    id: number;
    app_item_id: string | null;
    app_external_id: string | null;
    item_name: string | null;
    amount: number;
    sku_price: number | null;
    total_price: number | null;
    real_price: number | null;
}

export interface Food99PedidoDto {
    id: number;
    food99_shop_id: number;
    app_shop_id: string;
    order_id: string;
    status: number | null;
    customer_name: string | null;
    customer_phone: string | null;
    sync_status: Food99StatusSincronizacaoPedidoDto;
    id_venda: number | null;
    erp_sale_id: string | null;
    error_message: string | null;
    create_time: string | null;
    pay_time: string | null;
    complete_time: string | null;
    cancel_time: string | null;
    items: Food99ItemPedidoDto[];
}

export interface Food99FilaPedidosDto {
    id_cadastro: number;
    app_shop_id: string | null;
    total: number;
    orders: Food99PedidoDto[];
}

export interface Food99ReprocessamentoPedidoDto {
    food99_order_id: number;
    order_id: string;
    sync_status: Food99StatusSincronizacaoPedidoDto;
    status: string;
    message: string;
}
