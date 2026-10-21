import { useAsyncQuery } from '../../../hooks/useAsyncQuery';
import { homeService } from '../services/homeService';

export function useCertificadoQuery() {
  return useAsyncQuery(
    () => homeService.buscarCertificado(),
    [],
    { initialData: null },
  );
}
