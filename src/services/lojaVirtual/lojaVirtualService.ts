import { webcontrolApi } from '../apiClients';

export interface ModuloLojaResponse {
  status?: boolean;
  preco?: string;
}

const MODULO_LOJA_PATH = '/apoio/ajaxModuloLojaVirtual.php';
const FORM_HEADERS = { 'Content-Type': 'application/x-www-form-urlencoded' };

export const lojaVirtualService = {
  verificarLiberacao: () =>
    webcontrolApi.post<ModuloLojaResponse>(MODULO_LOJA_PATH, new URLSearchParams({ op: 'verificaLiberacao' }), {
      headers: FORM_HEADERS,
    }),

  ativarModulo: () =>
    webcontrolApi.post<ModuloLojaResponse>(MODULO_LOJA_PATH, new URLSearchParams({ op: 'ativaLiberacao' }), {
      headers: FORM_HEADERS,
    }),
};
