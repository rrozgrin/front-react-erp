import { useMemo, useState } from 'react';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
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

interface NotaRow {
    id: number;
    dataEntrada: string;
    numeroNota: string;
    produto: string;
    fornecedor: string;
    codigoBarras: string;
    quantidade: number;
    custo: number;
    venda: number;
}

const rows: NotaRow[] = [
    {
        id: 1,
        dataEntrada: '2026-05-12T09:15:00',
        numeroNota: '45231',
        produto: 'Óleo Semissintético 10W40',
        fornecedor: 'Auto Lub Distribuidora',
        codigoBarras: '7891234500012',
        quantidade: 24,
        custo: 22.5,
        venda: 34.9,
    },
    {
        id: 2,
        dataEntrada: '2026-05-15T14:40:00',
        numeroNota: '45288',
        produto: 'Capacete Fechado Sport',
        fornecedor: 'Distribuidora Norte',
        codigoBarras: '7899541200456',
        quantidade: 6,
        custo: 89.4,
        venda: 149.9,
    },
    {
        id: 3,
        dataEntrada: '2026-05-21T11:05:00',
        numeroNota: '45377',
        produto: 'Retrovisor Universal Par',
        fornecedor: 'Moto Pecas Centro',
        codigoBarras: '7897788990011',
        quantidade: 10,
        custo: 31.7,
        venda: 57.8,
    },
];

const tableFields: TableField<NotaRow>[] = [
    { id: 'dataEntrada', header: 'Data Entrada', accessorFn: (row) => formatDateTime(row.dataEntrada), defaultVisible: true },
    { id: 'numeroNota', header: 'Número Nota', accessorKey: 'numeroNota', defaultVisible: true },
    { id: 'produto', header: 'Produto', accessorKey: 'produto', defaultVisible: true },
    { id: 'fornecedor', header: 'Fornecedor', accessorKey: 'fornecedor', defaultVisible: true },
    { id: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'quantidade', header: 'Quantidade', accessorKey: 'quantidade', align: 'right', defaultVisible: true },
    { id: 'custo', header: 'Custo', accessorFn: (row) => formatCurrency(row.custo), align: 'right', defaultVisible: true },
    { id: 'venda', header: 'Venda', accessorFn: (row) => formatCurrency(row.venda), align: 'right', defaultVisible: true },
];

const excelColumns: ExcelColumn<NotaRow>[] = [
    { key: 'dataEntrada', header: 'Data Entrada', accessorFn: (row) => formatDateTime(row.dataEntrada) },
    { key: 'numeroNota', header: 'Número Nota', accessorKey: 'numeroNota' },
    { key: 'produto', header: 'Produto', accessorKey: 'produto' },
    { key: 'fornecedor', header: 'Fornecedor', accessorKey: 'fornecedor' },
    { key: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras' },
    { key: 'quantidade', header: 'Quantidade', accessorKey: 'quantidade' },
    { key: 'custo', header: 'Custo', accessorFn: (row) => formatCurrency(row.custo) },
    { key: 'venda', header: 'Venda', accessorFn: (row) => formatCurrency(row.venda) },
];

export const ProdutosRelatorioNotasPage = () => {
    const [codigoBarras, setCodigoBarras] = useState('');
    const [produto, setProduto] = useState('0');
    const [fornecedor, setFornecedor] = useState('0');

    const filteredRows = useMemo(() => {
        const codigo = normalizeText(codigoBarras);

        return rows.filter((row) => {
            const matchesCodigo = !codigo || normalizeText(row.codigoBarras).includes(codigo);
            const matchesProduto = produto === '0' || row.produto === produto;
            const matchesFornecedor = fornecedor === '0' || row.fornecedor === fornecedor;

            return matchesCodigo && matchesProduto && matchesFornecedor;
        });
    }, [codigoBarras, fornecedor, produto]);

    return (
        <RelatorioTemplate
            titulo="Relatório de Notas"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Relatório de notas"
            descricaoTabela="Consulta de entradas por produto, fornecedor e código de barras em tela própria."
            dados={filteredRows}
            campos={tableFields}
            mensagemVazia="Nenhuma nota encontrada para os filtros informados."
            arquivoExcel="relatorio_notas_entrada"
            colunasExcel={excelColumns}
            impressao={{ titulo: 'Relatório de Notas', subtitulo: 'Notas de entrada por produto e fornecedor', orientacao: 'landscape' }}
            painelFiltros={<FiltersPanel>
                    <FiltersHeader>
                        <h3>Filtros do relatório</h3>
                        <p>Página dedicada ao relatório de notas, separando código de barras, produto e fornecedor.</p>
                    </FiltersHeader>

                    <FiltersGrid>
                        <Field $span={3}>
                            <span>Código de barras</span>
                            <TextInput value={codigoBarras} onChange={(event) => setCodigoBarras(event.target.value)} placeholder="Digite ao menos parte do código" />
                        </Field>

                        <Field $span={5}>
                            <span>Produto</span>
                            <SelectField value={produto} onChange={(event) => setProduto(event.target.value)}>
                                <option value="0">Selecione</option>
                                <option value="Óleo Semissintético 10W40">Óleo Semissintético 10W40</option>
                                <option value="Capacete Fechado Sport">Capacete Fechado Sport</option>
                                <option value="Retrovisor Universal Par">Retrovisor Universal Par</option>
                            </SelectField>
                        </Field>

                        <Field $span={4}>
                            <span>Fornecedor</span>
                            <SelectField value={fornecedor} onChange={(event) => setFornecedor(event.target.value)}>
                                <option value="0">Selecione</option>
                                <option value="Auto Lub Distribuidora">Auto Lub Distribuidora</option>
                                <option value="Distribuidora Norte">Distribuidora Norte</option>
                                <option value="Moto Pecas Centro">Moto Pecas Centro</option>
                            </SelectField>
                        </Field>
                    </FiltersGrid>

                    <ActionsRow>
                        <SummaryText>{filteredRows.length} nota(s) encontradas para os filtros informados.</SummaryText>
                    </ActionsRow>
                </FiltersPanel>}
        />
    );
};
