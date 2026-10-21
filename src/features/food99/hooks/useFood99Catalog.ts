import {
    food99CatalogoService,
} from '../api/food99CatalogService';
import { useConsultaApi, type ResultadoConsultaApi } from '../../../common/hooks/useConsultaApi';
import { useFood99Mutation } from './useFood99Mutation';
import {
  food99CategoriaFromApi,
  food99CategoriasFromApi,
  food99ItemCatalogoFromApi,
  food99ItensFromApi,
  food99MenuFromApi,
  food99MenusFromApi,
  food99ProdutosLocaisAdicionadosFromApi,
  food99ProdutosLocaisFromApi,
  food99PublicacaoFromApi,
  food99TarefasPublicacaoFromApi,
} from '../adapters/food99CatalogAdapter';
import type {
  Food99CategoriasResponse,
  Food99ItensResponse,
  Food99ProdutosLocaisResponse,
  Food99MenusResponse,
  Food99TarefasPublicacaoResponse,
} from '../types/food99Catalog';

export type {
  Food99Categoria,
  Food99ItemCatalogo,
  Food99Menu,
  Food99ProdutoLocal,
  Food99CategoriaProdutoLocal,
} from '../types/food99Catalog';

const FOOD99_CATALOGO_CACHE_MS = 30_000;
const chaveFood99Catalogo = ['food99', 'catalog'] as const;

export function useFood99Menus(
  lojaAppId: string | undefined,
  visao: 'local' | 'published' = 'local',
): ResultadoConsultaApi<Food99MenusResponse> {
  return useConsultaApi({
    chave: [...chaveFood99Catalogo, 'menus', lojaAppId ?? null, visao],
    consultar: () => food99CatalogoService.listMenus(lojaAppId as string, visao).then(food99MenusFromApi),
    habilitada: Boolean(lojaAppId),
    tempoValidade: FOOD99_CATALOGO_CACHE_MS,
  });
}

export function useFood99Categorias(
  lojaAppId: string | undefined,
  visao: 'local' | 'published' = 'local',
): ResultadoConsultaApi<Food99CategoriasResponse> {
  return useConsultaApi({
    chave: [...chaveFood99Catalogo, 'categories', lojaAppId ?? null, visao],
    consultar: () => food99CatalogoService.listCategorias(lojaAppId as string, visao).then(food99CategoriasFromApi),
    habilitada: Boolean(lojaAppId),
    tempoValidade: FOOD99_CATALOGO_CACHE_MS,
  });
}

export function useFood99ItensCatalogo(
  lojaAppId: string | undefined,
  visao: 'local' | 'published' = 'local',
): ResultadoConsultaApi<Food99ItensResponse> {
  return useConsultaApi({
    chave: [...chaveFood99Catalogo, 'items', lojaAppId ?? null, visao],
    consultar: () => food99CatalogoService.listItens(lojaAppId as string, visao).then(food99ItensFromApi),
    habilitada: Boolean(lojaAppId),
    tempoValidade: FOOD99_CATALOGO_CACHE_MS,
  });
}

export function useFood99ProdutosLocaisNaoVinculados(
  parametros: Parameters<typeof food99CatalogoService.listProdutosLocaisNaoVinculados>[0] | undefined,
  habilitada = true,
): ResultadoConsultaApi<Food99ProdutosLocaisResponse> {
  const chaveConsulta = parametros ? JSON.stringify([
    parametros.page ?? 1,
    parametros.per_page ?? null,
    parametros.search ?? '',
    parametros.category_id ?? null,
  ]) : null;

  return useConsultaApi({
    chave: [...chaveFood99Catalogo, 'local-unlinked-products', parametros?.app_shop_id ?? null, chaveConsulta],
    consultar: () => food99CatalogoService.listProdutosLocaisNaoVinculados(parametros as NonNullable<typeof parametros>).then(food99ProdutosLocaisFromApi),
    habilitada: Boolean(parametros?.app_shop_id) && habilitada,
    tempoValidade: FOOD99_CATALOGO_CACHE_MS,
  });
}

export function useFood99TarefasPublicacao(lojaAppId: string | undefined): ResultadoConsultaApi<Food99TarefasPublicacaoResponse> {
  return useConsultaApi({
    chave: [...chaveFood99Catalogo, 'publish-jobs', lojaAppId ?? null],
    consultar: () => food99CatalogoService.listTarefasPublicacao(lojaAppId as string).then(food99TarefasPublicacaoFromApi),
    habilitada: Boolean(lojaAppId),
    tempoValidade: FOOD99_CATALOGO_CACHE_MS,
  });
}

export function useFood99UpsertMenu() {
  return useFood99Mutation(
    async (payload: Parameters<typeof food99CatalogoService.upsertMenu>[0]) => food99MenuFromApi(await food99CatalogoService.upsertMenu(payload)),
    chaveFood99Catalogo,
  );
}

export function useFood99UpsertCategoria() {
  return useFood99Mutation(
    async (payload: Parameters<typeof food99CatalogoService.upsertCategoria>[0]) => food99CategoriaFromApi(await food99CatalogoService.upsertCategoria(payload)),
    chaveFood99Catalogo,
  );
}

export function useFood99ConfigurarItem() {
  return useFood99Mutation(
    async (payload: Parameters<typeof food99CatalogoService.configurarItem>[0]) => food99ItemCatalogoFromApi(await food99CatalogoService.configurarItem(payload)),
    chaveFood99Catalogo,
  );
}

export function useFood99UpsertItem() {
  return useFood99Mutation(
    async (payload: Parameters<typeof food99CatalogoService.upsertItem>[0]) => food99ItemCatalogoFromApi(await food99CatalogoService.upsertItem(payload)),
    chaveFood99Catalogo,
  );
}

export function useFood99PublicarCatalogo() {
  return useFood99Mutation(
    async (payload: Parameters<typeof food99CatalogoService.publicar>[0]) => food99PublicacaoFromApi(await food99CatalogoService.publicar(payload)),
    chaveFood99Catalogo,
  );
}

export function useFood99AddProdutosLocais() {
  return useFood99Mutation(
    async (payload: Parameters<typeof food99CatalogoService.addProdutosLocais>[0]) => food99ProdutosLocaisAdicionadosFromApi(await food99CatalogoService.addProdutosLocais(payload)),
    chaveFood99Catalogo,
  );
}
