import { useAsyncMutation } from '../useAsyncMutation';
import { lojaVirtualService } from '../../services/lojaVirtual/lojaVirtualService';

export function useVerificarLiberacaoLojaMutation() {
  return useAsyncMutation<void, Awaited<ReturnType<typeof lojaVirtualService.verificarLiberacao>>>(() =>
    lojaVirtualService.verificarLiberacao(),
  );
}

export function useAtivarModuloLojaMutation() {
  return useAsyncMutation<void, Awaited<ReturnType<typeof lojaVirtualService.ativarModulo>>>(() =>
    lojaVirtualService.ativarModulo(),
  );
}
