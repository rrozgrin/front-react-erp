import { useAsyncMutation } from '../../../hooks/useAsyncMutation';
import { homeService } from '../services/homeService';

export function useIndicarAmigoMutation() {
  return useAsyncMutation<Record<string, string>, string>((payload) => homeService.enviarIndicacaoAmigo(payload));
}
