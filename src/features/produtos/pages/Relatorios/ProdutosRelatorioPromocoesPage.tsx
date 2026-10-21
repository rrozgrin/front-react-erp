import { useMemo, useState } from 'react';
import styled from 'styled-components';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import { StatusBadge } from '../../../../common/components/PageLayout/styled';
import type { TableField } from '../../../../common/components/Table';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';
import {
    ActionsRow,
    Field,
    FiltersGrid,
    FiltersHeader,
    FiltersPanel,
    SelectField,
    SummaryText,
    TextInput,
    formatCurrency,
    formatDateTime,
    normalizeText,
} from '../../../../common/components/ReportFilters';

interface PromocaoRow {
    id: number;
    produto: string;
    codigoBarras: string;
    custo: number;
    venda: number;
    nomePromocao: string;
    valorPromocao: number;
    inicio: string;
    fim: string;
    responsavel: string;
    situacao: 'ativo' | 'inativo';
}

const InlineAction = styled.button`
    border: 1px solid rgba(var(--bs-primary-rgb), 0.2);
    background: rgba(var(--bs-primary-rgb), 0.06);
    color: var(--color-main, var(--bs-primary));
    padding: var(--space-xs) 10px;
    border-radius: 0.125rem;
    font-size: 0.82rem;
    font-weight: 500;
`;

const rows: PromocaoRow[] = [
    {
        id: 1,
        produto: 'Capacete Fechado Sport',
        codigoBarras: '7899541200456',
        custo: 89.4,
        venda: 149.9,
        nomePromocao: 'Semana do Capacete',
        valorPromocao: 129.9,
        inicio: '2026-05-20T08:00:00',
        fim: '2026-05-31T22:00:00',
        responsavel: 'Mariana Lima',
        situacao: 'ativo',
    },
    {
        id: 2,
        produto: 'Retrovisor Universal Par',
        codigoBarras: '7897788990011',
        custo: 31.7,
        venda: 57.8,
        nomePromocao: 'Outlet de Acessórios',
        valorPromocao: 49.9,
        inicio: '2026-05-10T09:30:00',
        fim: '2026-05-18T18:00:00',
        responsavel: 'Paulo Nunes',
        situacao: 'inativo',
    },
];

const tableFields: TableField<PromocaoRow>[] = [
    { id: 'produto', header: 'Produto', accessorKey: 'produto', defaultVisible: true },
    { id: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'custo', header: 'Custo', accessorFn: (row) => formatCurrency(row.custo), align: 'right', defaultVisible: true },
    { id: 'venda', header: 'Venda', accessorFn: (row) => formatCurrency(row.venda), align: 'right', defaultVisible: true },
    { id: 'nomePromocao', header: 'Nome da Promoção', accessorKey: 'nomePromocao', defaultVisible: true },
    { id: 'valorPromocao', header: 'Valor Promocional', accessorFn: (row) => formatCurrency(row.valorPromocao), align: 'right', defaultVisible: true },
    { id: 'inicio', header: 'Início', accessorFn: (row) => formatDateTime(row.inicio), defaultVisible: true },
    { id: 'fim', header: 'Fim', accessorFn: (row) => formatDateTime(row.fim), defaultVisible: true },
    { id: 'responsavel', header: 'Responsável', accessorKey: 'responsavel', defaultVisible: true },
    {
        id: 'situacao',
        header: 'Situação',
        accessorFn: (row) => row.situacao,
        cell: (_, row) => <StatusBadge $variant={row.situacao}>{row.situacao}</StatusBadge>,
        align: 'center',
        defaultVisible: true,
    },
    {
        id: 'acao',
        header: 'Ação',
        accessorFn: () => '',
        cell: (_, row) => <InlineAction type="button">{row.situacao === 'ativo' ? 'Encerrar' : 'Reativar'}</InlineAction>,
        align: 'center',
        defaultVisible: true,
        canHide: false,
    },
];

const excelColumns: ExcelColumn<PromocaoRow>[] = [
    { key: 'produto', header: 'Produto', accessorKey: 'produto' },
    { key: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras' },
    { key: 'custo', header: 'Custo', accessorFn: (row) => formatCurrency(row.custo) },
    { key: 'venda', header: 'Venda', accessorFn: (row) => formatCurrency(row.venda) },
    { key: 'nomePromocao', header: 'Nome da Promoção', accessorKey: 'nomePromocao' },
    { key: 'valorPromocao', header: 'Valor Promocional', accessorFn: (row) => formatCurrency(row.valorPromocao) },
    { key: 'inicio', header: 'Início', accessorFn: (row) => formatDateTime(row.inicio) },
    { key: 'fim', header: 'Fim', accessorFn: (row) => formatDateTime(row.fim) },
    { key: 'responsavel', header: 'Responsável', accessorKey: 'responsavel' },
    { key: 'situacao', header: 'Situação', accessorKey: 'situacao' },
];

export const ProdutosRelatorioPromocoesPage = () => {
    const [produto, setProduto] = useState('');
    const [situacao, setSituacao] = useState('todos');

    const filteredRows = useMemo(() => {
        const term = normalizeText(produto);

        return rows.filter((row) => {
            const matchesProduto = !term
                || normalizeText(row.produto).includes(term)
                || normalizeText(row.nomePromocao).includes(term)
                || normalizeText(row.codigoBarras).includes(term);
            const matchesSituacao = situacao === 'todos' || row.situacao === situacao;

            return matchesProduto && matchesSituacao;
        });
    }, [produto, situacao]);

    return (
        <RelatorioTemplate
            titulo="Relatório de Promoções"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Relatório de promoções"
            descricaoTabela="Página dedicada para consultar promoções cadastradas, com período, responsável e situação."
            dados={filteredRows}
            campos={tableFields}
            mensagemVazia="Nenhuma promoção encontrada para os filtros informados."
            arquivoExcel="relatorio_promocoes"
            colunasExcel={excelColumns}
            impressao={{ titulo: 'Relatório de Promoções', subtitulo: 'Promoções e vigências ativas ou encerradas', orientacao: 'landscape' }}
            painelFiltros={<FiltersPanel>
                    <FiltersHeader>
                        <h3>Filtros do relatório</h3>
                        <p>Listagem separada do legado de promoções, com foco em acompanhamento e consulta.</p>
                    </FiltersHeader>

                    <FiltersGrid>
                        <Field $span={8}>
                            <span>Produto, promoção ou código de barras</span>
                            <TextInput value={produto} onChange={(event) => setProduto(event.target.value)} placeholder="Buscar item" />
                        </Field>

                        <Field $span={4}>
                            <span>Situação</span>
                            <SelectField value={situacao} onChange={(event) => setSituacao(event.target.value)}>
                                <option value="todos">Todas</option>
                                <option value="ativo">Ativas</option>
                                <option value="inativo">Inativas</option>
                            </SelectField>
                        </Field>
                    </FiltersGrid>

                    <ActionsRow>
                        <SummaryText>{filteredRows.length} promoção(ões) encontradas para os filtros atuais.</SummaryText>
                    </ActionsRow>
                </FiltersPanel>}
        />
    );
};
