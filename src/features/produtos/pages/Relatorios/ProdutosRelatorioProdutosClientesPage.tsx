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
    SummaryText,
    TextInput,
    formatCurrency,
    formatDate,
    normalizeText,
} from '../../../../common/components/ReportFilters';

interface ProdutosClientesRow {
    id: number;
    cliente: string;
    documento: string;
    produto: string;
    quantidade: number;
    ultimaCompra: string;
    valorTotal: number;
}

const rows: ProdutosClientesRow[] = [
    { id: 1, cliente: 'Ana Paula Motos', documento: '12.345.678/0001-01', produto: 'Capacete Fechado Sport', quantidade: 8, ultimaCompra: '2026-05-03', valorTotal: 1199.2 },
    { id: 2, cliente: 'Carlos Henrique', documento: '123.456.789-00', produto: 'Óleo Semissintético 10W40', quantidade: 15, ultimaCompra: '2026-05-08', valorTotal: 523.5 },
    { id: 3, cliente: 'Moto Clube Centro', documento: '56.789.123/0001-44', produto: 'Retrovisor Universal Par', quantidade: 4, ultimaCompra: '2026-05-11', valorTotal: 231.2 },
    { id: 4, cliente: 'Fernanda Souza', documento: '987.654.321-00', produto: 'Capa Banco Biz 125 Premium', quantidade: 2, ultimaCompra: '2026-05-19', valorTotal: 59.8 },
];

const tableFields: TableField<ProdutosClientesRow>[] = [
    { id: 'cliente', header: 'Cliente', accessorKey: 'cliente', defaultVisible: true },
    { id: 'documento', header: 'CPF / CNPJ', accessorKey: 'documento', defaultVisible: true },
    { id: 'produto', header: 'Produto', accessorKey: 'produto', defaultVisible: true },
    { id: 'quantidade', header: 'Quantidade', accessorKey: 'quantidade', align: 'right', defaultVisible: true },
    { id: 'ultimaCompra', header: 'Última Compra', accessorFn: (row) => formatDate(row.ultimaCompra), defaultVisible: true },
    { id: 'valorTotal', header: 'Valor Total', accessorFn: (row) => formatCurrency(row.valorTotal), align: 'right', defaultVisible: true },
];

const excelColumns: ExcelColumn<ProdutosClientesRow>[] = [
    { key: 'cliente', header: 'Cliente', accessorKey: 'cliente' },
    { key: 'documento', header: 'CPF / CNPJ', accessorKey: 'documento' },
    { key: 'produto', header: 'Produto', accessorKey: 'produto' },
    { key: 'quantidade', header: 'Quantidade', accessorKey: 'quantidade' },
    { key: 'ultimaCompra', header: 'Última Compra', accessorFn: (row) => formatDate(row.ultimaCompra) },
    { key: 'valorTotal', header: 'Valor Total', accessorFn: (row) => formatCurrency(row.valorTotal) },
];

export const ProdutosRelatorioProdutosClientesPage = () => {
    const [buscaCliente, setBuscaCliente] = useState('');
    const [dataInicio, setDataInicio] = useState('2026-05-01');
    const [dataFim, setDataFim] = useState('2026-05-29');

    const filteredRows = useMemo(() => {
        const term = normalizeText(buscaCliente);

        return rows.filter((row) => {
            const matchesCliente = !term
                || normalizeText(row.cliente).includes(term)
                || normalizeText(row.documento).includes(term)
                || normalizeText(row.produto).includes(term);
            const matchesInicio = !dataInicio || row.ultimaCompra >= dataInicio;
            const matchesFim = !dataFim || row.ultimaCompra <= dataFim;

            return matchesCliente && matchesInicio && matchesFim;
        });
    }, [buscaCliente, dataFim, dataInicio]);

    return (
        <RelatorioTemplate
            titulo="Relatórios Produtos Clientes"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Relatório de produtos por cliente"
            descricaoTabela="Visão separada do antigo formulário com filtro por cliente e período."
            dados={filteredRows}
            campos={tableFields}
            mensagemVazia="Nenhuma movimentação encontrada para os filtros informados."
            arquivoExcel="relatorio_produtos_clientes"
            colunasExcel={excelColumns}
            impressao={{ titulo: 'Relatório de Produtos por Cliente', subtitulo: 'Clientes e itens vendidos no período', orientacao: 'landscape' }}
            painelFiltros={<FiltersPanel>
                    <FiltersHeader>
                        <h3>Filtros do relatório</h3>
                        <p>Separação do legado de produtos por cliente, preservando busca avançada e período.</p>
                    </FiltersHeader>

                    <FiltersGrid>
                        <Field $span={6}>
                            <span>Busca avançada</span>
                            <TextInput
                                value={buscaCliente}
                                onChange={(event) => setBuscaCliente(event.target.value)}
                                placeholder="Nome, CPF, CNPJ ou produto"
                            />
                        </Field>

                        <Field $span={3}>
                            <span>Data inicial</span>
                            <TextInput type="date" value={dataInicio} onChange={(event) => setDataInicio(event.target.value)} />
                        </Field>

                        <Field $span={3}>
                            <span>Data final</span>
                            <TextInput type="date" value={dataFim} onChange={(event) => setDataFim(event.target.value)} />
                        </Field>
                    </FiltersGrid>

                    <ActionsRow>
                        <SummaryText>{filteredRows.length} cliente(s) com movimentação no período selecionado.</SummaryText>
                    </ActionsRow>
                </FiltersPanel>}
        />
    );
};
