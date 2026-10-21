import { webcontrolApi } from '../apiClients';

export const pedidosService = {
  buscarNovosPedidos: (endpoint: string) => webcontrolApi.get<string>(endpoint),
};
