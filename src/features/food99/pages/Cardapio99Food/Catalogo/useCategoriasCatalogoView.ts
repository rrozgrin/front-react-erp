import { useMemo } from 'react';
import type { Food99Categoria, Food99ItemCatalogo } from '../../../hooks/useFood99Catalog';
import {
    obterStatusItemCatalogo,
    type StatusCatalogo,
    type VisualizacaoCategoriaCatalogo,
} from './catalogoUtils';

interface UseCategoriasCatalogoViewParams {
    categorias: Food99Categoria[];
    itens: Food99ItemCatalogo[];
    idsExpandidos: Set<string>;
    busca: string;
    menuSelecionado: string;
    status: 'Todos os status' | StatusCatalogo;
    ordenacao: string;
}

export function useCategoriasCatalogoView({
    categorias,
    itens,
    idsExpandidos,
    busca,
    menuSelecionado,
    status,
    ordenacao,
}: UseCategoriasCatalogoViewParams) {
    const visualizacoes = useMemo<VisualizacaoCategoriaCatalogo[]>(() => {
        const itensPorCategoria = itens.reduce<Record<string, Food99ItemCatalogo[]>>((acumulador, item) => {
            if (!item.categoriaAppId) return acumulador;
            acumulador[item.categoriaAppId] = [...(acumulador[item.categoriaAppId] ?? []), item];
            return acumulador;
        }, {});

        return categorias.map((categoria) => ({
            ...categoria,
            expandida: idsExpandidos.has(categoria.categoriaAppId),
            itens: itensPorCategoria[categoria.categoriaAppId] ?? [],
        }));
    }, [categorias, idsExpandidos, itens]);

    const categoriasFiltradas = useMemo(() => {
        const termo = busca.trim().toLowerCase();
        return visualizacoes
            .filter((categoria) => menuSelecionado === 'Todos os cardápios' || categoria.menuAppId === menuSelecionado)
            .map((categoria) => {
                const itensFiltrados = categoria.itens.filter((item) => {
                    const correspondeStatus = status === 'Todos os status' || obterStatusItemCatalogo(item) === status;
                    const correspondeBusca = !termo || [
                        categoria.nome,
                        categoria.categoriaAppId,
                        item.nome,
                        item.itemAppId,
                        item.descricaoCurta ?? '',
                    ].some((campo) => campo.toLowerCase().includes(termo));
                    return correspondeStatus && correspondeBusca;
                });
                return {
                    ...categoria,
                    itens: ordenacao === 'Nome A-Z'
                        ? [...itensFiltrados].sort((a, b) => a.nome.localeCompare(b.nome))
                        : itensFiltrados,
                };
            })
            .filter((categoria) => categoria.itens.length > 0 || !termo || categoria.nome.toLowerCase().includes(termo))
            .sort((a, b) => ordenacao === 'Nome A-Z'
                ? a.nome.localeCompare(b.nome)
                : a.ordem - b.ordem);
    }, [busca, menuSelecionado, ordenacao, status, visualizacoes]);

    return {
        categoriasFiltradas,
        ultimaPublicacaoEm: itens
            .map((item) => item.ultimaPublicacaoEm)
            .filter(Boolean)
            .sort()
            .at(-1),
    };
}
