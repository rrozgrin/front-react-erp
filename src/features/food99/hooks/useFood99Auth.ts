import {
    food99AutenticacaoService,
} from '../api/food99AuthService';
import {
  food99LojasFromApi,
  food99TokenLojaFromApi,
  food99UrlAutorizacaoFromApi,
} from '../adapters/food99AuthAdapter';

export type {
  Food99Loja,
  Food99TokenLoja,
  Food99UrlAutorizacaoResponse,
} from '../types/food99Auth';
import type { Food99LojasResponse, Food99TokenLoja, Food99UrlAutorizacaoResponse } from '../types/food99Auth';
import { useConsultaApi, type ResultadoConsultaApi } from '../../../common/hooks/useConsultaApi';
import { useFood99Mutation } from './useFood99Mutation';
import type { Food99UrlAutorizacaoPayloadDto } from '../api/dtos/food99AuthDtos';

const FOOD99_LOJAS_CACHE_MS = 30_000;
const chaveFood99Autenticacao = ['food99', 'auth'] as const;

export function useFood99Lojas(): ResultadoConsultaApi<Food99LojasResponse> {
  return useConsultaApi({
    chave: [...chaveFood99Autenticacao, 'shops'],
    consultar: ({ signal }) => food99AutenticacaoService.listLojas({ signal }).then(food99LojasFromApi),
    tempoValidade: FOOD99_LOJAS_CACHE_MS,
  });
}

export function useFood99TokenLocal(lojaAppId: string | undefined): ResultadoConsultaApi<Food99TokenLoja | null> {
  return useConsultaApi({
    chave: [...chaveFood99Autenticacao, 'local-token', lojaAppId ?? null],
    consultar: ({ signal }) => food99AutenticacaoService.getTokenLocal(lojaAppId as string, { signal })
      .then((token) => token ? food99TokenLojaFromApi(token) : null),
    habilitada: Boolean(lojaAppId),
    tempoValidade: FOOD99_LOJAS_CACHE_MS,
  });
}

export function useFood99GerarUrlAutorizacao() {
  return useFood99Mutation<Food99UrlAutorizacaoPayloadDto, Food99UrlAutorizacaoResponse>(
    async (payload) => food99UrlAutorizacaoFromApi(await food99AutenticacaoService.gerarUrlAutorizacao(payload)),
    chaveFood99Autenticacao,
  );
}

export function useFood99GetToken() {
  return useFood99Mutation<string, Food99TokenLoja>(
    async (lojaAppId) => food99TokenLojaFromApi(await food99AutenticacaoService.getToken(lojaAppId)),
    chaveFood99Autenticacao,
  );
}

export function useFood99RefreshToken() {
  return useFood99Mutation<string, Food99TokenLoja>(
    async (lojaAppId) => food99TokenLojaFromApi(await food99AutenticacaoService.refreshToken(lojaAppId)),
    chaveFood99Autenticacao,
  );
}
