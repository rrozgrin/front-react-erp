import { useMemo } from 'react';
import type {
    Food99Categoria,
    Food99ItemCatalogo,
    Food99Menu,
} from '../../../hooks/useFood99Catalog';
import { montarItensCatalogo, type StatusItem } from './itemCatalogoUtils';

interface UseItensCatalogoViewParams {
    itens: Food99ItemCatalogo[];
    categorias: Food99Categoria[];
    menus: Food99Menu[];
    busca: string;
    menuSelecionado: string;
    categoriaSelecionada: string;
    statusSelecionado: 'Todos os status' | StatusItem;
    ordenacao: string;
    menuFormularioId: string;
}

export function useItensCatalogoView({
    itens,
    categorias,
    menus,
    busca,
    menuSelecionado,
    categoriaSelecionada,
    statusSelecionado,
    ordenacao,
    menuFormularioId,
}: UseItensCatalogoViewParams) {
    const itensVisualizacao = useMemo(
        () => montarItensCatalogo(itens, categorias, menus),
        [categorias, itens, menus],
    );

    const itensFiltrados = useMemo(() => {
        const termo = busca.trim().toLowerCase();

        return [...itensVisualizacao]
            .filter((item) => menuSelecionado === 'Todos os cardápios' || item.cardapio === menuSelecionado)
            .filter((item) => categoriaSelecionada === 'Todas as categorias' || item.categoria === categoriaSelecionada)
            .filter((item) => statusSelecionado === 'Todos os status' || item.status === statusSelecionado)
            .filter((item) => !termo || [
                item.nome,
                item.categoria,
                item.cardapio,
                item.origem.itemAppId,
                item.origem.descricaoCurta ?? '',
            ].some((valor) => valor.toLowerCase().includes(termo)))
            .sort((a, b) => {
                if (ordenacao === 'Nome A-Z') return a.nome.localeCompare(b.nome);
                return (b.origem.ultimaPublicacaoEm ?? b.origem.alteradoEm ?? '').localeCompare(
                    a.origem.ultimaPublicacaoEm ?? a.origem.alteradoEm ?? '',
                );
            });
    }, [busca, categoriaSelecionada, itensVisualizacao, menuSelecionado, ordenacao, statusSelecionado]);

    const categoriasDoMenu = useMemo(() => {
        if (!menuFormularioId) return categorias;
        const menu = menus.find((atual) => atual.menuAppId === menuFormularioId);
        return menu
            ? categorias.filter((categoria) => categoria.menuAppId === menu.menuAppId)
            : categorias;
    }, [categorias, menuFormularioId, menus]);

    return {
        itensFiltrados,
        categoriasDoMenu,
        ultimaPublicacaoEm: itens
            .map((item) => item.ultimaPublicacaoEm)
            .filter(Boolean)
            .sort()
            .at(-1),
        quantidadePublicados: itensFiltrados.filter((item) => item.status === 'Publicado').length,
        quantidadeRascunhos: itensFiltrados.filter((item) => item.status === 'Rascunho').length,
        quantidadeInativos: itensFiltrados.filter((item) => item.status === 'Inativo').length,
    };
}
