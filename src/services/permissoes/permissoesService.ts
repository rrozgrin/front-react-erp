import { webcontrolApi } from '../apiClients';

export const permissoesService = {
  listarPermissoes: (signal?: AbortSignal) => webcontrolApi.get<string[]>('/apoio/permissoes.php', { signal }),
};
