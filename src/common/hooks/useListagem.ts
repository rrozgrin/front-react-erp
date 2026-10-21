import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import type { VisibilityState } from '@tanstack/react-table';
import type { ExcelColumn } from '../components/Actions/GerarExcel';
import { createTableColumnVisibility } from '../components/ConfigTable';
import type { TableField } from '../components/Table';
import {
    criarColunasExcel,
    criarFiltroPeriodo,
    criarPesquisaPorCampos,
    normalizarTexto,
} from '../components/Templates/listagemUtils';

export interface ListagemFiltroPeriodo<TData> {
    filtrar: (item: TData, dataInicio: string, dataFim: string) => boolean;
}

export type ListagemId = string | number;

export interface ListagemPaginacaoControlada {
    pagina: number;
    itensPorPagina: number;
    totalRegistros?: number;
    modo?: 'cliente' | 'servidor';
    opcoesItensPorPagina?: number[];
    onChange: (pagina: number, itensPorPagina: number) => void;
}

export interface ListagemSelecaoControlada<TData> {
    obterId: (item: TData) => ListagemId;
    idsSelecionados: ListagemId[];
    onChange: (ids: ListagemId[], dadosSelecionados: TData[]) => void;
    desabilitarSelecao?: (item: TData) => boolean;
}

export interface ListagemContexto<TData> {
    dados: TData[];
    dadosFiltrados: TData[];
    dadosExibidos: TData[];
    pesquisa: string;
    dataInicio: string;
    dataFim: string;
    pagina: number;
    itensPorPagina: number;
    totalRegistros: number;
    totalPaginas: number;
    idsSelecionados: ListagemId[];
    dadosSelecionados: TData[];
}

export interface UseListagemOptions<TData> {
    dados: TData[];
    campos: TableField<TData>[];
    colunasExcel?: ExcelColumn<TData>[];
    pesquisar?: (item: TData, termo: string) => boolean;
    camposPesquisa?: (item: TData) => unknown[];
    periodo?: ListagemFiltroPeriodo<TData>;
    campoData?: (item: TData) => string | Date | null | undefined;
    valorPesquisa?: string;
    onPesquisaChange?: (value: string) => void;
    dataInicio?: string;
    dataFim?: string;
    onPeriodoChange?: (dataInicio: string, dataFim: string) => void;
    normalizarPesquisa?: (value: string) => string;
    exportarApenasColunasVisiveis?: boolean;
    paginacao?: ListagemPaginacaoControlada;
    selecao?: ListagemSelecaoControlada<TData>;
}

const idsVazios: ListagemId[] = [];

export function useListagem<TData>({
    dados,
    campos,
    colunasExcel,
    pesquisar,
    camposPesquisa,
    periodo,
    campoData,
    valorPesquisa,
    onPesquisaChange,
    dataInicio: dataInicioControlada,
    dataFim: dataFimControlada,
    onPeriodoChange,
    normalizarPesquisa = normalizarTexto,
    exportarApenasColunasVisiveis = true,
    paginacao,
    selecao,
}: UseListagemOptions<TData>) {
    const [pesquisaInterna, setPesquisaInterna] = useState('');
    const [dataInicioInterna, setDataInicioInterna] = useState('');
    const [dataFimInterna, setDataFimInterna] = useState('');
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() =>
        createTableColumnVisibility(campos)
    );
    const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>(() =>
        campos.filter((campo) => campo.defaultVisible ?? true).map((campo) => campo.id)
    );
    const pesquisa = valorPesquisa ?? pesquisaInterna;
    const dataInicio = dataInicioControlada ?? dataInicioInterna;
    const dataFim = dataFimControlada ?? dataFimInterna;
    const pesquisaResolvida = useMemo(
        () => pesquisar ?? (camposPesquisa ? criarPesquisaPorCampos(camposPesquisa) : undefined),
        [camposPesquisa, pesquisar]
    );
    const periodoResolvido = useMemo(
        () => periodo ?? (campoData ? { filtrar: criarFiltroPeriodo(campoData) } : undefined),
        [campoData, periodo]
    );
    const colunasExcelResolvidas = useMemo(
        () => colunasExcel ?? criarColunasExcel(campos),
        [campos, colunasExcel]
    );

    useEffect(() => {
        setColumnVisibility((current) => {
            const next = createTableColumnVisibility(campos);
            campos.forEach((campo) => {
                if (campo.id in current) next[campo.id] = current[campo.id];
            });
            const ids = Object.keys(next);
            const unchanged = ids.length === Object.keys(current).length
                && ids.every((id) => next[id] === current[id]);
            return unchanged ? current : next;
        });

        setVisibleColumnIds((current) => {
            const validIds = new Set(campos.map((campo) => campo.id));
            const preserved = current.filter((id) => validIds.has(id));
            const added = campos
                .filter((campo) => !current.includes(campo.id) && (campo.defaultVisible ?? true))
                .map((campo) => campo.id);
            const next = [...preserved, ...added];
            return next.length === current.length && next.every((id, index) => id === current[index]) ? current : next;
        });
    }, [campos]);

    const alterarPesquisa = useCallback((value: string) => {
        if (valorPesquisa === undefined) setPesquisaInterna(value);
        onPesquisaChange?.(value);
    }, [onPesquisaChange, valorPesquisa]);

    const alterarPeriodo = useCallback((inicio: string, fim: string) => {
        if (dataInicioControlada === undefined) setDataInicioInterna(inicio);
        if (dataFimControlada === undefined) setDataFimInterna(fim);
        onPeriodoChange?.(inicio, fim);
    }, [dataFimControlada, dataInicioControlada, onPeriodoChange]);

    const dadosFiltrados = useMemo(() => {
        const termo = normalizarPesquisa(pesquisa);
        return dados.filter((item) => {
            const correspondeBusca = !termo || !pesquisaResolvida || pesquisaResolvida(item, termo);
            const correspondePeriodo = !periodoResolvido || periodoResolvido.filtrar(item, dataInicio, dataFim);
            return correspondeBusca && correspondePeriodo;
        });
    }, [dados, dataFim, dataInicio, normalizarPesquisa, periodoResolvido, pesquisa, pesquisaResolvida]);

    const pagina = Math.max(paginacao?.pagina ?? 1, 1);
    const itensPorPagina = Math.max(paginacao?.itensPorPagina ?? dadosFiltrados.length, 1);
    const totalRegistros = paginacao?.totalRegistros ?? dadosFiltrados.length;
    const totalPaginas = Math.max(Math.ceil(totalRegistros / itensPorPagina), 1);
    const dadosExibidos = useMemo(() => {
        if (!paginacao || paginacao.modo === 'servidor') return dadosFiltrados;
        const inicio = (pagina - 1) * itensPorPagina;
        return dadosFiltrados.slice(inicio, inicio + itensPorPagina);
    }, [dadosFiltrados, itensPorPagina, pagina, paginacao]);

    const idsSelecionados = selecao?.idsSelecionados ?? idsVazios;
    const conjuntoSelecionados = useMemo(() => new Set(idsSelecionados), [idsSelecionados]);
    const dadosSelecionados = useMemo(
        () => selecao ? dados.filter((item) => conjuntoSelecionados.has(selecao.obterId(item))) : [],
        [conjuntoSelecionados, dados, selecao]
    );
    const registrosSelecionaveisPagina = useMemo(
        () => selecao ? dadosExibidos.filter((item) => !selecao.desabilitarSelecao?.(item)) : [],
        [dadosExibidos, selecao]
    );
    const todosPaginaSelecionados = Boolean(
        registrosSelecionaveisPagina.length
        && selecao
        && registrosSelecionaveisPagina.every((item) => conjuntoSelecionados.has(selecao.obterId(item)))
    );

    const alterarSelecao = useCallback((nextIds: ListagemId[]) => {
        if (!selecao) return;
        const nextSet = new Set(nextIds);
        selecao.onChange(nextIds, dados.filter((item) => nextSet.has(selecao.obterId(item))));
    }, [dados, selecao]);

    const alternarRegistro = useCallback((item: TData, selected: boolean) => {
        if (!selecao) return;
        const id = selecao.obterId(item);
        const next = new Set(selecao.idsSelecionados);
        if (selected) next.add(id);
        else next.delete(id);
        alterarSelecao(Array.from(next));
    }, [alterarSelecao, selecao]);

    const alternarPagina = useCallback((selected: boolean) => {
        if (!selecao) return;
        const next = new Set(selecao.idsSelecionados);
        registrosSelecionaveisPagina.forEach((item) => {
            const id = selecao.obterId(item);
            if (selected) next.add(id);
            else next.delete(id);
        });
        alterarSelecao(Array.from(next));
    }, [alterarSelecao, registrosSelecionaveisPagina, selecao]);

    const colunasExcelVisiveis = useMemo(() => {
        if (!exportarApenasColunasVisiveis) return colunasExcelResolvidas;
        const visibleKeys = new Set(visibleColumnIds);
        return colunasExcelResolvidas.filter((coluna) => visibleKeys.has(coluna.key));
    }, [colunasExcelResolvidas, exportarApenasColunasVisiveis, visibleColumnIds]);

    const alterarColunasVisiveis = useCallback((nextVisibleColumns: string[]) => {
        setVisibleColumnIds(nextVisibleColumns);
    }, []);

    const contexto = useMemo<ListagemContexto<TData>>(() => ({
        dados,
        dadosFiltrados,
        dadosExibidos,
        pesquisa,
        dataInicio,
        dataFim,
        pagina,
        itensPorPagina,
        totalRegistros,
        totalPaginas,
        idsSelecionados,
        dadosSelecionados,
    }), [dados, dadosExibidos, dadosFiltrados, dadosSelecionados, dataFim, dataInicio, idsSelecionados, itensPorPagina, pagina, pesquisa, totalPaginas, totalRegistros]);

    return {
        pesquisa,
        alterarPesquisa,
        dataInicio,
        dataFim,
        alterarPeriodo,
        periodoResolvido,
        dadosFiltrados,
        dadosExibidos,
        pagina,
        itensPorPagina,
        totalRegistros,
        totalPaginas,
        columnVisibility,
        setColumnVisibility,
        visibleColumnIds,
        alterarColunasVisiveis,
        colunasExcelResolvidas,
        colunasExcelVisiveis,
        idsSelecionados,
        conjuntoSelecionados,
        dadosSelecionados,
        todosPaginaSelecionados,
        alternarRegistro,
        alternarPagina,
        contexto,
    };
}
