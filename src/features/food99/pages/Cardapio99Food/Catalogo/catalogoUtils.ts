import type { Food99Categoria, Food99ItemCatalogo } from '../../../hooks/useFood99Catalog';

export type StatusCatalogo = 'Publicado' | 'Rascunho' | 'Inativo';

export interface EstadoFormularioCategoria {
    menuAppId: string;
    categoriaAppId: string;
    nomeCategoria: string;
    ordem: string;
    ativo: boolean;
}

export interface VisualizacaoCategoriaCatalogo extends Food99Categoria {
    expandida: boolean;
    itens: Food99ItemCatalogo[];
}

export const formularioCategoriaVazio: EstadoFormularioCategoria = {
    menuAppId: '',
    categoriaAppId: '',
    nomeCategoria: '',
    ordem: '0',
    ativo: true,
};

export const obterStatusItemCatalogo = (item: Food99ItemCatalogo): StatusCatalogo => {
    if (!item.ativo) return 'Inativo';
    return item.statusPublicacao === 'published' ? 'Publicado' : 'Rascunho';
};
