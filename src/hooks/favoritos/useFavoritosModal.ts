import { useAsyncMutation } from '../useAsyncMutation';
import { useAsyncQuery } from '../useAsyncQuery';
import { favoritosService, type FavoritoResponse } from '../../services/favoritos/favoritosService';

export type Favorito = FavoritoResponse;

export type FavoritosModalData = {
  favoritos: Record<string, Favorito[]>;
  selecionados: Favorito[];
};

export function useFavoritosModalQuery(show: boolean) {
  return useAsyncQuery<FavoritosModalData>(
    async () => {
      const todosFavoritos = await favoritosService.listarFavoritos();
      const agrupados: Record<string, Favorito[]> = {};

      todosFavoritos.forEach((fav) => {
        const seg = fav.segmento_url.trim();
        if (!agrupados[seg]) agrupados[seg] = [];
        agrupados[seg].push(fav);
      });

      const favoritosCliente = await favoritosService.buscarFavoritosCliente();
      let favoritosSalvos: string[] = [];

      try {
        const raw = typeof favoritosCliente.favoritos === 'string' ? favoritosCliente.favoritos : '[]';
        const arr = JSON.parse(raw || '[]') as (string | number)[];
        favoritosSalvos = arr.map((value) => String(value));
      } catch {
        favoritosSalvos = [];
      }

      const selecionados: Favorito[] = [];
      Object.values(agrupados).forEach((grupo) => {
        grupo.forEach((fav) => {
          if (favoritosSalvos.includes(fav.id)) {
            selecionados.push(fav);
          }
        });
      });

      return { favoritos: agrupados, selecionados };
    },
    [show],
    { enabled: show, initialData: { favoritos: {}, selecionados: [] } },
  );
}

export function useSalvarFavoritosMutation() {
  return useAsyncMutation<string[], Awaited<ReturnType<typeof favoritosService.salvarFavoritos>>>((ids) => favoritosService.salvarFavoritos(ids));
}
