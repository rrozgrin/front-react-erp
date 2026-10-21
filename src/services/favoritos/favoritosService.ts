import { webcontrolApi } from '../apiClients';

export interface FavoritoResponse {
  id: string;
  descricao: string;
  segmento_url: string;
  icone?: string;
  url?: string;
}

export interface FavoritosClienteResponse {
  favoritos?: string;
}

const FAVORITOS_PATH = '/apoio/novo_inicio/Favoritos.php';

export const favoritosService = {
  listarFavoritos: () =>
    webcontrolApi.get<FavoritoResponse[]>(FAVORITOS_PATH, { query: { action: 'listarFavoritos' } }),

  buscarFavoritosCliente: () =>
    webcontrolApi.get<FavoritosClienteResponse>(FAVORITOS_PATH, { query: { action: 'getFavoritosCliente' } }),

  salvarFavoritos: (favorito: string[]) =>
    webcontrolApi.post(FAVORITOS_PATH, { favorito }, { query: { action: 'salvarFavoritos' } }),
};
