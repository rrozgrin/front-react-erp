import { useConsultaApi } from '../../common/hooks/useConsultaApi';
import { permissoesService } from '../../services/permissoes/permissoesService';

export function usePermissoesQuery() {
  const consulta = useConsultaApi({
    chave: ['permissoes'],
    consultar: ({ signal }) => permissoesService.listarPermissoes(signal),
    tempoValidade: 5 * 60_000,
  });

  return { ...consulta, data: consulta.dados ?? [] };
}
