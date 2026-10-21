import {
    ApiError,
    unwrapResposta,
    type RespostaApi,
} from '../../../services/apiClient';
import { food99Api } from '../../../services/apiClients';
import type {
    Food99UrlAutorizacaoPayloadDto,
    Food99UrlAutorizacaoResponseDto,
    Food99LojasResponseDto,
    Food99TokenLojaDto,
} from './dtos/food99AuthDtos';

const AUTENTICACAO_BASE_PATH = '/api/v1/food99/auth';

const getConteudo = <T>(resposta: RespostaApi<T>): T => unwrapResposta(resposta);
type Food99RequestOptions = { signal?: AbortSignal };

export const food99AutenticacaoService = {
    async listLojas(opcoes: Food99RequestOptions = {}): Promise<Food99LojasResponseDto> {
        const resposta = await food99Api.get<RespostaApi<Food99LojasResponseDto>>(`${AUTENTICACAO_BASE_PATH}/shops`, opcoes);
        return getConteudo(resposta);
    },

    async gerarUrlAutorizacao(payload: Food99UrlAutorizacaoPayloadDto): Promise<Food99UrlAutorizacaoResponseDto> {
        const resposta = await food99Api.post<RespostaApi<Food99UrlAutorizacaoResponseDto>>(
            `${AUTENTICACAO_BASE_PATH}/authorization-url`,
            payload,
        );
        return getConteudo(resposta);
    },

    async getToken(lojaAppId: string): Promise<Food99TokenLojaDto> {
        const resposta = await food99Api.post<RespostaApi<Food99TokenLojaDto>>(`${AUTENTICACAO_BASE_PATH}/token/get`, {
            app_shop_id: lojaAppId,
        });
        return getConteudo(resposta);
    },

    async refreshToken(lojaAppId: string): Promise<Food99TokenLojaDto> {
        const resposta = await food99Api.post<RespostaApi<Food99TokenLojaDto>>(`${AUTENTICACAO_BASE_PATH}/token/refresh`, {
            app_shop_id: lojaAppId,
        });
        return getConteudo(resposta);
    },

    async getTokenLocal(lojaAppId: string, opcoes: Food99RequestOptions = {}): Promise<Food99TokenLojaDto | null> {
        try {
            const resposta = await food99Api.get<RespostaApi<Food99TokenLojaDto>>(`${AUTENTICACAO_BASE_PATH}/token/local/${encodeURIComponent(lojaAppId)}`, opcoes);
            return getConteudo(resposta);
        } catch (erro) {
            if (erro instanceof ApiError && erro.status === 404) {
                return null;
            }

            throw erro;
        }
    },
};
