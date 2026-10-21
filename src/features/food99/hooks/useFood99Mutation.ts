import { useCallback, useState } from 'react';
import { invalidarConsultaApi, type ConsultaApiKey } from '../../../common/hooks/useConsultaApi';

export interface Food99MutationResult<TPayload, TResponse> {
  executar: (payload: TPayload) => Promise<TResponse>;
  carregando: boolean;
  erro: unknown | null;
  limparErro: () => void;
}

export function useFood99Mutation<TPayload, TResponse>(
  mutation: (payload: TPayload) => Promise<TResponse>,
  chavesParaInvalidar: ConsultaApiKey | ConsultaApiKey[],
): Food99MutationResult<TPayload, TResponse> {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<unknown | null>(null);

  const executar = useCallback(async (payload: TPayload) => {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await mutation(payload);
      const chaves = Array.isArray(chavesParaInvalidar[0])
        ? chavesParaInvalidar as ConsultaApiKey[]
        : [chavesParaInvalidar as ConsultaApiKey];
      chaves.forEach(invalidarConsultaApi);
      return resposta;
    } catch (error) {
      setErro(error);
      throw error;
    } finally {
      setCarregando(false);
    }
  }, [chavesParaInvalidar, mutation]);

  return { executar, carregando, erro, limparErro: () => setErro(null) };
}
