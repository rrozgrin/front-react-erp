import {
    useCallback,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import type { ExcelColumn } from '../Actions/GerarExcel';
import { Botao } from '../Buttons/Botao';
import { FloatingActions } from '../Buttons/FloatingActions';
import { ConfigTable } from '../ConfigTable';
import { BuscaSimples } from '../Inputs/BuscaSimples';
import { PeriodoInput } from '../Inputs/PeriodoInput';
import { PageLayout, type PageLayoutMenuSection } from '../PageLayout';
import {
    SearchWrapper,
    TemplateBatchActions,
    TemplateContent,
    TemplatePagination,
    TemplateState,
} from '../PageLayout/styled';
import { Table, type TableField, type TableRowAction } from '../Table';
import {
    useListagem,
    type ListagemContexto,
    type ListagemFiltroPeriodo,
    type ListagemId,
    type ListagemPaginacaoControlada,
    type ListagemSelecaoControlada,
} from '../../hooks/useListagem';

export type {
    ListagemContexto,
    ListagemFiltroPeriodo,
    ListagemId,
    ListagemPaginacaoControlada,
    ListagemSelecaoControlada,
} from '../../hooks/useListagem';

export interface ListagemBotaoPrincipal {
    nome: string;
    icone?: ReactNode;
    action: () => void;
    ariaLabel?: string;
    color?: 'add' | 'close';
}

export interface ListagemConfigImpressao {
    titulo?: string;
    subtitulo?: string;
    orientacao?: 'portrait' | 'landscape';
    onPrint?: () => void;
}

export interface ListagemAcaoEmLote<TData> {
    nome: string;
    icone?: ReactNode;
    action: (ids: ListagemId[], dadosSelecionados: TData[]) => void;
    desabilitada?: (ids: ListagemId[], dadosSelecionados: TData[]) => boolean;
    color?: 'add' | 'close';
}

export type ConteudoListagem<TData> = ReactNode | ((contexto: ListagemContexto<TData>) => ReactNode);

export interface ListagemTemplateProps<TData> {
    titulo: string;
    secoes?: PageLayoutMenuSection[];
    dados: TData[];
    campos: TableField<TData>[];
    colunasExcel?: ExcelColumn<TData>[];
    pesquisar?: (item: TData, termo: string) => boolean;
    camposPesquisa?: (item: TData) => unknown[];
    acoes?: TableRowAction<TData>[];
    botaoPrincipal?: ListagemBotaoPrincipal;
    arquivoExcel?: string;
    tituloTabela: string;
    descricaoTabela?: string;
    mensagemVazia: string;
    impressao?: ListagemConfigImpressao | false;
    periodo?: ListagemFiltroPeriodo<TData>;
    campoData?: (item: TData) => string | Date | null | undefined;
    filtros?: ConteudoListagem<TData>;
    conteudoAdicionalToolbar?: ConteudoListagem<TData>;
    conteudoAntesTabela?: ConteudoListagem<TData>;
    conteudoDepoisTabela?: ConteudoListagem<TData>;
    modaisAbertos?: boolean;
    placeholderPesquisa?: string;
    menuInicialAberto?: boolean;
    exibirBusca?: boolean;
    configurarColunas?: boolean | 'toolbar' | 'tabela';
    exportarApenasColunasVisiveis?: boolean;
    exibirAcoesFlutuantes?: boolean;
    valorPesquisa?: string;
    onPesquisaChange?: (value: string) => void;
    dataInicio?: string;
    dataFim?: string;
    onPeriodoChange?: (dataInicio: string, dataFim: string) => void;
    normalizarPesquisa?: (value: string) => string;
    mostrarCabecalhoTabela?: boolean;
    tabelaCompacta?: boolean;
    agruparConteudo?: boolean;
    exibirTabela?: boolean;
    carregando?: boolean;
    mensagemCarregando?: ReactNode;
    erro?: ReactNode;
    paginacao?: ListagemPaginacaoControlada;
    selecao?: ListagemSelecaoControlada<TData>;
    acoesEmLote?: ListagemAcaoEmLote<TData>[];
    renderizarConteudo?: (conteudo: ReactNode, contexto: ListagemContexto<TData>) => ReactNode;
    renderizarTabela?: (tabela: ReactNode, dadosFiltrados: TData[], contexto: ListagemContexto<TData>) => ReactNode;
}

export function ListagemTemplate<TData>({
    titulo,
    secoes,
    dados,
    campos,
    colunasExcel,
    pesquisar,
    camposPesquisa,
    acoes,
    botaoPrincipal,
    arquivoExcel,
    tituloTabela,
    descricaoTabela,
    mensagemVazia,
    impressao,
    periodo,
    campoData,
    filtros,
    conteudoAdicionalToolbar,
    conteudoAntesTabela,
    conteudoDepoisTabela,
    modaisAbertos = false,
    placeholderPesquisa,
    menuInicialAberto = false,
    exibirBusca,
    configurarColunas = true,
    exportarApenasColunasVisiveis = true,
    exibirAcoesFlutuantes = true,
    valorPesquisa,
    onPesquisaChange,
    dataInicio: dataInicioControlada,
    dataFim: dataFimControlada,
    onPeriodoChange,
    normalizarPesquisa,
    mostrarCabecalhoTabela = true,
    tabelaCompacta = false,
    agruparConteudo = false,
    exibirTabela = true,
    carregando = false,
    mensagemCarregando = 'Carregando registros...',
    erro,
    paginacao,
    selecao,
    acoesEmLote = [],
    renderizarConteudo,
    renderizarTabela,
}: ListagemTemplateProps<TData>) {
    const [menuOpen, setMenuOpen] = useState(menuInicialAberto);
    const printRef = useRef<HTMLDivElement>(null);
    const {
        pesquisa,
        alterarPesquisa: handlePesquisaChange,
        dataInicio,
        dataFim,
        alterarPeriodo: handleDateSearch,
        periodoResolvido,
        dadosFiltrados,
        dadosExibidos,
        pagina,
        itensPorPagina,
        totalRegistros,
        totalPaginas,
        columnVisibility,
        setColumnVisibility,
        colunasExcelResolvidas,
        colunasExcelVisiveis,
        idsSelecionados,
        conjuntoSelecionados,
        dadosSelecionados,
        todosPaginaSelecionados,
        alternarRegistro: toggleRegistro,
        alternarPagina: togglePagina,
        alterarColunasVisiveis: handleVisibleColumnsChange,
        contexto,
    } = useListagem({
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
        normalizarPesquisa,
        exportarApenasColunasVisiveis,
        paginacao,
        selecao,
    });
    const buscaVisivel = exibirBusca ?? Boolean(pesquisar || camposPesquisa || onPesquisaChange);
    const exportacaoHabilitada = Boolean(arquivoExcel && colunasExcelResolvidas.length);
    const impressaoHabilitada = impressao !== false;
    const configurarColunasToolbar = configurarColunas === true || configurarColunas === 'toolbar';
    const configurarColunasTabela = configurarColunas === 'tabela';
    const toolbarVisivel = Boolean(botaoPrincipal || buscaVisivel || periodoResolvido || configurarColunasToolbar || filtros || conteudoAdicionalToolbar);

    const resolverConteudo = useCallback((conteudo?: ConteudoListagem<TData>) => {
        return typeof conteudo === 'function' ? conteudo(contexto) : conteudo;
    }, [contexto]);

    const acoesFlutuantes = useMemo(() => {
        const actions: Array<'excel' | 'print'> = [];

        if (exportacaoHabilitada) {
            actions.push('excel');
        }

        if (impressaoHabilitada) {
            actions.push('print');
        }

        return actions;
    }, [exportacaoHabilitada, impressaoHabilitada]);

    const tabela = carregando ? (
        <TemplateState role="status">{mensagemCarregando}</TemplateState>
    ) : erro ? (
        <TemplateState role="alert" $error>{erro}</TemplateState>
    ) : exibirTabela ? (
        <Table
            title={tituloTabela}
            description={descricaoTabela}
            data={dadosExibidos}
            fields={campos}
            rowActions={acoes}
            emptyMessage={mensagemVazia}
            showHeader={mostrarCabecalhoTabela}
            showColumnSelector={configurarColunasTabela}
            compact={tabelaCompacta}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            onVisibleColumnsChange={handleVisibleColumnsChange}
            selectable={Boolean(selecao)}
            isRowSelected={selecao ? (item) => conjuntoSelecionados.has(selecao.obterId(item)) : undefined}
            isRowSelectionDisabled={selecao?.desabilitarSelecao}
            onToggleRowSelection={selecao ? toggleRegistro : undefined}
            allRowsSelected={todosPaginaSelecionados}
            onToggleAllRows={selecao ? togglePagina : undefined}
        />
    ) : null;
    const tabelaRenderizada = tabela && renderizarTabela
        ? renderizarTabela(tabela, dadosFiltrados, contexto)
        : tabela;
    const acoesLoteRenderizadas = selecao && acoesEmLote.length ? (
        <TemplateBatchActions>
            <span>{idsSelecionados.length} registro(s) selecionado(s)</span>
            {acoesEmLote.map((acao) => (
                <Botao
                    key={acao.nome}
                    nome={acao.nome}
                    icone={acao.icone}
                    color={acao.color}
                    disabled={!idsSelecionados.length || acao.desabilitada?.(idsSelecionados, dadosSelecionados)}
                    action={() => acao.action(idsSelecionados, dadosSelecionados)}
                />
            ))}
        </TemplateBatchActions>
    ) : null;
    const paginacaoRenderizada = paginacao && !carregando && !erro ? (
        <TemplatePagination>
            <span>Página {Math.min(pagina, totalPaginas)} de {totalPaginas} — {totalRegistros} registro(s)</span>
            <div>
                <label>
                    Itens por página{' '}
                    <select
                        value={itensPorPagina}
                        onChange={(event) => paginacao.onChange(1, Number(event.target.value))}
                    >
                        {(paginacao.opcoesItensPorPagina ?? [10, 20, 50, 100]).map((opcao) => (
                            <option key={opcao} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </label>
                <Botao nome="Anterior" disabled={pagina <= 1} action={() => paginacao.onChange(pagina - 1, itensPorPagina)} />
                <Botao nome="Próxima" disabled={pagina >= totalPaginas} action={() => paginacao.onChange(pagina + 1, itensPorPagina)} />
            </div>
        </TemplatePagination>
    ) : null;
    const conteudoTabela = (
        <>
            {resolverConteudo(conteudoAntesTabela)}
            {acoesLoteRenderizadas}
            {tabelaRenderizada}
            {paginacaoRenderizada}
            {resolverConteudo(conteudoDepoisTabela)}
        </>
    );
    const conteudoPagina = agruparConteudo ? <TemplateContent>{conteudoTabela}</TemplateContent> : conteudoTabela;

    return (
        <>
            <PageLayout
                title={titulo}
                sections={secoes}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                contentRef={printRef}
                toolbar={toolbarVisivel ? (
                    <>
                        {botaoPrincipal && (
                            <Botao
                                nome={botaoPrincipal.nome}
                                icone={botaoPrincipal.icone}
                                action={botaoPrincipal.action}
                                ariaLabel={botaoPrincipal.ariaLabel}
                                color={botaoPrincipal.color ?? 'add'}
                            />
                        )}

                        {buscaVisivel && (
                            <SearchWrapper>
                                <BuscaSimples
                                    pesquisa={pesquisa}
                                    onChange={handlePesquisaChange}
                                    placeholder={placeholderPesquisa}
                                />
                            </SearchWrapper>
                        )}

                        {periodoResolvido && (
                            <SearchWrapper>
                                <PeriodoInput
                                    modo="confirmar"
                                    dataInicio={dataInicio}
                                    dataFim={dataFim}
                                    onChange={handleDateSearch}
                                />
                            </SearchWrapper>
                        )}

                        {resolverConteudo(filtros)}

                        {configurarColunasToolbar && (
                            <ConfigTable
                                fields={campos}
                                columnVisibility={columnVisibility}
                                onColumnVisibilityChange={setColumnVisibility}
                            />
                        )}

                        {resolverConteudo(conteudoAdicionalToolbar)}
                    </>
                ) : undefined}
            >
                {renderizarConteudo ? renderizarConteudo(conteudoPagina, contexto) : conteudoPagina}
            </PageLayout>

            {exibirAcoesFlutuantes && !modaisAbertos && !carregando && !erro && acoesFlutuantes.length > 0 && (
                <FloatingActions
                    actions={acoesFlutuantes}
                    excelConfig={exportacaoHabilitada ? {
                        fileName: arquivoExcel,
                        columns: colunasExcelVisiveis,
                        data: dadosFiltrados,
                    } : undefined}
                    printTargetRef={printRef}
                    printConfig={impressao && typeof impressao === 'object' ? {
                        title: impressao.titulo,
                        subtitle: impressao.subtitulo,
                        orientation: impressao.orientacao,
                    } : undefined}
                    onPrint={impressao && typeof impressao === 'object' ? impressao.onPrint : undefined}
                />
            )}
        </>
    );
}
