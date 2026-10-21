import { unwrapResposta, type RespostaApi } from '../../../services/apiClient';
import { food99Api } from '../../../services/apiClients';
import type {
    Food99AddProdutosLocaisPayloadDto,
    Food99AddProdutosLocaisResponseDto,
    Food99ItemCatalogoDto,
    Food99CategoriasResponseDto,
    Food99CategoriaDto,
    Food99CategoriaUpsertPayloadDto,
    Food99ConfigurarItemPayloadDto,
    Food99ItensResponseDto,
    Food99ItemUpsertPayloadDto,
    Food99ProdutosLocaisQueryDto,
    Food99ProdutosLocaisResponseDto,
    Food99MenuDto,
    Food99MenusResponseDto,
    Food99MenuUpsertPayloadDto,
    Food99TarefasPublicacaoResponseDto,
    Food99PublicarPayloadDto,
    Food99PublicarResponseDto,
} from './dtos/food99CatalogDtos';

const CATALOGO_BASE_PATH = '/api/v1/food99/catalog';

const getConteudo = <T>(resposta: RespostaApi<T>): T => unwrapResposta(resposta);

export const food99CatalogoService = {
    async listMenus(lojaAppId: string, visao: 'local' | 'published' = 'local'): Promise<Food99MenusResponseDto> {
        const resposta = await food99Api.get<RespostaApi<Food99MenusResponseDto>>(`${CATALOGO_BASE_PATH}/menus/${encodeURIComponent(lojaAppId)}`, {
            query: { view: visao },
        });

        return getConteudo(resposta);
    },

    async upsertMenu(payload: Food99MenuUpsertPayloadDto): Promise<Food99MenuDto> {
        const resposta = await food99Api.post<RespostaApi<Food99MenuDto>>(`${CATALOGO_BASE_PATH}/menus/upsert`, payload);
        return getConteudo(resposta);
    },

    async listCategorias(lojaAppId: string, visao: 'local' | 'published' = 'local'): Promise<Food99CategoriasResponseDto> {
        const resposta = await food99Api.get<RespostaApi<Food99CategoriasResponseDto>>(`${CATALOGO_BASE_PATH}/categories/${encodeURIComponent(lojaAppId)}`, {
            query: { view: visao },
        });

        return getConteudo(resposta);
    },

    async upsertCategoria(payload: Food99CategoriaUpsertPayloadDto): Promise<Food99CategoriaDto> {
        const resposta = await food99Api.post<RespostaApi<Food99CategoriaDto>>(`${CATALOGO_BASE_PATH}/categories/upsert`, payload);
        return getConteudo(resposta);
    },

    async listItens(lojaAppId: string, visao: 'local' | 'published' = 'local'): Promise<Food99ItensResponseDto> {
        const resposta = await food99Api.get<RespostaApi<Food99ItensResponseDto>>(`${CATALOGO_BASE_PATH}/items/${encodeURIComponent(lojaAppId)}`, {
            query: { view: visao },
        });

        return getConteudo(resposta);
    },

    async upsertItem(payload: Food99ItemUpsertPayloadDto): Promise<Food99ItemCatalogoDto> {
        const resposta = await food99Api.post<RespostaApi<Food99ItemCatalogoDto>>(`${CATALOGO_BASE_PATH}/items/upsert`, payload);
        return getConteudo(resposta);
    },

    async configurarItem(payload: Food99ConfigurarItemPayloadDto): Promise<Food99ItemCatalogoDto> {
        const resposta = await food99Api.post<RespostaApi<Food99ItemCatalogoDto>>(`${CATALOGO_BASE_PATH}/items/configure`, payload);
        return getConteudo(resposta);
    },

    async listProdutosLocaisNaoVinculados(payload: Food99ProdutosLocaisQueryDto): Promise<Food99ProdutosLocaisResponseDto> {
        const resposta = await food99Api.post<RespostaApi<Food99ProdutosLocaisResponseDto>>(`${CATALOGO_BASE_PATH}/items/local-unlinked`, payload);
        return getConteudo(resposta);
    },

    async addProdutosLocais(payload: Food99AddProdutosLocaisPayloadDto): Promise<Food99AddProdutosLocaisResponseDto> {
        const resposta = await food99Api.post<RespostaApi<Food99AddProdutosLocaisResponseDto>>(`${CATALOGO_BASE_PATH}/items/add-local`, payload);
        return getConteudo(resposta);
    },

    async publicar(payload: Food99PublicarPayloadDto): Promise<Food99PublicarResponseDto> {
        const resposta = await food99Api.post<RespostaApi<Food99PublicarResponseDto>>(`${CATALOGO_BASE_PATH}/publish`, payload);
        return getConteudo(resposta);
    },

    async listTarefasPublicacao(lojaAppId: string): Promise<Food99TarefasPublicacaoResponseDto> {
        const resposta = await food99Api.get<RespostaApi<Food99TarefasPublicacaoResponseDto>>(`${CATALOGO_BASE_PATH}/publish/jobs/${encodeURIComponent(lojaAppId)}`);
        return getConteudo(resposta);
    },
};
