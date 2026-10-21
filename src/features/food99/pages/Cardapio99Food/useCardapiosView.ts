import { useMemo } from 'react';
import type {
    Food99Categoria,
    Food99ItemCatalogo,
    Food99Menu,
} from '../../hooks/useFood99Catalog';
import { montarItensCardapio, type StatusCardapio } from './cardapioUtils';

interface UseCardapiosViewParams {
    menus: Food99Menu[];
    categorias: Food99Categoria[];
    itensCatalogo: Food99ItemCatalogo[];
    busca: string;
    status: 'Todos os status' | StatusCardapio;
    ordem: 'Ordenar por ordem' | 'Nome A-Z';
    idSelecionado: string;
}

export function useCardapiosView({
    menus,
    categorias,
    itensCatalogo,
    busca,
    status,
    ordem,
    idSelecionado,
}: UseCardapiosViewParams) {
    const cardapios = useMemo(
        () => montarItensCardapio(menus, categorias, itensCatalogo),
        [categorias, itensCatalogo, menus],
    );
    const itensFiltrados = useMemo(() => {
        const termo = busca.trim().toLowerCase();
        return [...cardapios]
            .filter((item) => status === 'Todos os status' || item.status === status)
            .filter((item) => !termo || [item.nome, item.menuAppId, ...item.tagsCategorias]
                .some((campo) => campo.toLowerCase().includes(termo)))
            .sort((a, b) => ordem === 'Nome A-Z'
                ? a.nome.localeCompare(b.nome)
                : a.ordem - b.ordem);
    }, [busca, cardapios, ordem, status]);

    return {
        cardapios,
        itensFiltrados,
        cardapioSelecionado: itensFiltrados.find((item) => item.id === idSelecionado)
            ?? itensFiltrados[0]
            ?? null,
        quantidadeAtivos: cardapios.filter((item) => item.ativo).length,
        quantidadeInativos: cardapios.filter((item) => !item.ativo).length,
    };
}
