export interface Food99LojaDto {
    id: number;
    id_cadastro: number | null;
    app_shop_id: string;
    food99_shop_id: string | null;
    name: string | null;
    binding_status: string | null;
    auth_status: string | null;
    last_synced_at: string | null;
    token_found?: boolean;
    token_expires_at?: string | null;
    token_last_retrieved_at?: string | null;
    token_last_refreshed_at?: string | null;
}

export interface Food99LojasResponseDto {
    id_cadastro: number;
    shops: Food99LojaDto[];
}

export interface Food99UrlAutorizacaoPayloadDto {
    app_shop_id?: string;
    shop_name?: string;
}

export interface Food99UrlAutorizacaoResponseDto {
    app_shop_id: string;
    shop: Food99LojaDto;
    authorization_url: string | null;
}

export interface Food99TokenLojaDto {
    id?: number;
    app_shop_id: string;
    token_found?: boolean;
    expires_at?: string | null;
    token_expires_at?: string | null;
    last_retrieved_at?: string | null;
    last_refreshed_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    shop?: Food99LojaDto;
}
