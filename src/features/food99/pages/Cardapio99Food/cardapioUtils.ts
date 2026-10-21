import type {
    Food99Categoria,
    Food99ItemCatalogo,
    Food99Menu,
} from '../../hooks/useFood99Catalog';

export type StatusCardapio = 'Ativo' | 'Inativo';

export interface CardapioItem {
    id: string;
    idInterno: number;
    nome: string;
    categorias: number;
    itens: number;
    ordem: number;
    status: StatusCardapio;
    ativo: boolean;
    tagsCategorias: string[];
    menuAppId: string;
}

export interface EstadoFormularioMenu {
    menuAppId: string;
    nomeMenu: string;
    ordem: string;
    ativo: boolean;
}

export const formularioMenuVazio: EstadoFormularioMenu = {
    menuAppId: '',
    nomeMenu: '',
    ordem: '0',
    ativo: true,
};

export const montarItensCardapio = (
    menus: Food99Menu[],
    categorias: Food99Categoria[],
    itensCatalogo: Food99ItemCatalogo[],
): CardapioItem[] => {
    const categoriasPorMenuId = categorias.reduce<Record<string, Food99Categoria[]>>(
        (acumulador, categoria) => {
            if (!categoria.menuAppId) return acumulador;
            acumulador[categoria.menuAppId] = [
                ...(acumulador[categoria.menuAppId] ?? []),
                categoria,
            ];
            return acumulador;
        },
        {},
    );
    const itensPorCategoriaId = itensCatalogo.reduce<Record<string, Food99ItemCatalogo[]>>(
        (acumulador, item) => {
            if (!item.categoriaAppId) return acumulador;
            acumulador[item.categoriaAppId] = [
                ...(acumulador[item.categoriaAppId] ?? []),
                item,
            ];
            return acumulador;
        },
        {},
    );

    return menus.map((menu) => {
        const categoriasMenu = categoriasPorMenuId[menu.menuAppId] ?? [];
        const quantidadeItens = categoriasMenu.reduce(
            (total, categoria) => total + (itensPorCategoriaId[categoria.categoriaAppId]?.length ?? 0),
            0,
        );

        return {
            id: menu.menuAppId,
            idInterno: menu.id,
            nome: menu.nome,
            categorias: categoriasMenu.length,
            itens: quantidadeItens,
            ordem: menu.ordem,
            status: menu.ativo ? 'Ativo' : 'Inativo',
            ativo: menu.ativo,
            tagsCategorias: categoriasMenu.map((categoria) => categoria.nome),
            menuAppId: menu.menuAppId,
        };
    });
};
