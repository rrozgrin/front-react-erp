import type {
    Food99UrlAutorizacaoResponseDto,
    Food99LojaDto,
    Food99LojasResponseDto,
    Food99TokenLojaDto,
} from '../api/dtos/food99AuthDtos';
import type {
    Food99Loja,
    Food99LojasResponse,
    Food99TokenLoja,
    Food99UrlAutorizacaoResponse,
} from '../types/food99Auth';

export function food99LojaFromApi(dto: Food99LojaDto): Food99Loja {
    return {
        id: dto.id, cadastroId: dto.id_cadastro, lojaAppId: dto.app_shop_id,
        lojaFood99Id: dto.food99_shop_id, nome: dto.name, statusVinculo: dto.binding_status,
        statusAutorizacao: dto.auth_status, ultimaSincronizacaoEm: dto.last_synced_at,
        tokenEncontrado: dto.token_found, tokenExpiraEm: dto.token_expires_at,
        tokenObtidoEm: dto.token_last_retrieved_at, tokenAtualizadoEm: dto.token_last_refreshed_at,
    };
}

export function food99LojasFromApi(dto: Food99LojasResponseDto): Food99LojasResponse {
    return { cadastroId: dto.id_cadastro, lojas: dto.shops.map(food99LojaFromApi) };
}

export function food99UrlAutorizacaoFromApi(dto: Food99UrlAutorizacaoResponseDto): Food99UrlAutorizacaoResponse {
    return { lojaAppId: dto.app_shop_id, loja: food99LojaFromApi(dto.shop), urlAutorizacao: dto.authorization_url };
}

export function food99TokenLojaFromApi(dto: Food99TokenLojaDto): Food99TokenLoja {
    return {
        id: dto.id, lojaAppId: dto.app_shop_id, tokenEncontrado: dto.token_found,
        expiraEm: dto.expires_at, tokenExpiraEm: dto.token_expires_at,
        obtidoEm: dto.last_retrieved_at, atualizadoEm: dto.last_refreshed_at,
        criadoEm: dto.created_at, alteradoEm: dto.updated_at,
        loja: dto.shop ? food99LojaFromApi(dto.shop) : undefined,
    };
}
