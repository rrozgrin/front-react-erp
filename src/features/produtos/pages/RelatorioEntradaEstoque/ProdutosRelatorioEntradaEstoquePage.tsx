import { useMemo, useState } from 'react';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import { Botao } from '../../../../common/components/Buttons/Botao';
import type { TableField } from '../../../../common/components/Table';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
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
    formatDate,
} from '../../../../common/components/ReportFilters';

interface EntradaEstoque {
    id: number;
    tipo: 'manual' | 'xml';
    data: string;
    numeroNota: string;
    fornecedor: string;
    idProduto: string;
    descricao: string;
    valor: number;
    quantidade: number;
}

const entradasMockData: EntradaEstoque[] = [
    {
        id: 1,
        tipo: 'manual',
        data: '2026-06-01',
        numeroNota: 'MANUAL-001',
        fornecedor: 'Ajuste interno',
        idProduto: '2500108',
        descricao: 'Capa Banco Mod Orig Biz 125 2008',
        valor: 20,
        quantidade: 5,
    },
    {
        id: 2,
        tipo: 'xml',
        data: '2026-06-02',
        numeroNota: '352606000001',
        fornecedor: 'Moto Peças Centro',
        idProduto: '2500106',
        descricao: 'Capa Banco Mod Orig Titan 150 2004/08',
        valor: 21.85,
        quantidade: 12,
    },
    {
        id: 3,
        tipo: 'xml',
        data: '2026-06-04',
        numeroNota: '352606000002',
        fornecedor: 'Distribuidora Norte',
        idProduto: '5500190',
        descricao: 'Kit Pris Coroa Titan 150 Fan C/Porca',
        valor: 10.41,
        quantidade: 30,
    },
];

const fields: TableField<EntradaEstoque>[] = [
    { id: 'data', header: 'Data', accessorFn: (row) => formatDate(row.data), defaultVisible: true },
    { id: 'numeroNota', header: 'Nº Nota', accessorKey: 'numeroNota', defaultVisible: true },
    { id: 'fornecedor', header: 'Fornecedor', accessorKey: 'fornecedor', defaultVisible: true },
    { id: 'idProduto', header: 'ID Produto', accessorKey: 'idProduto', defaultVisible: true },
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao', defaultVisible: true },
    { id: 'valor', header: 'Valor', accessorFn: (row) => formatCurrency(row.valor), align: 'right', defaultVisible: true },
    { id: 'quantidade', header: 'Quantidade', accessorKey: 'quantidade', align: 'center', defaultVisible: true },
];

const excelColumns: ExcelColumn<EntradaEstoque>[] = [
    { key: 'data', header: 'Data', accessorFn: (row) => formatDate(row.data) },
    { key: 'numeroNota', header: 'Nº Nota', accessorKey: 'numeroNota' },
    { key: 'fornecedor', header: 'Fornecedor', accessorKey: 'fornecedor' },
    { key: 'idProduto', header: 'ID Produto', accessorKey: 'idProduto' },
    { key: 'descricao', header: 'Descrição', accessorKey: 'descricao' },
    { key: 'valor', header: 'Valor', accessorFn: (row) => formatCurrency(row.valor) },
    { key: 'quantidade', header: 'Quantidade', accessorKey: 'quantidade' },
];

export const ProdutosRelatorioEntradaEstoquePage = () => {
    const [tipoEstoque, setTipoEstoque] = useState('todos');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [gerouRelatorio, setGerouRelatorio] = useState(false);

    const entradasFiltradas = useMemo(() => {
        if (!gerouRelatorio) return [];

        return entradasMockData.filter((entrada) => {
            const matchesTipo = tipoEstoque === 'todos' || entrada.tipo === tipoEstoque;
            const matchesInicio = !dataInicio || entrada.data >= dataInicio;
            const matchesFim = !dataFim || entrada.data <= dataFim;

            return matchesTipo && matchesInicio && matchesFim;
        });
    }, [dataFim, dataInicio, gerouRelatorio, tipoEstoque]);

    const totalQuantidade = entradasFiltradas.reduce((total, entrada) => total + entrada.quantidade, 0);

    return (
        <RelatorioTemplate
            titulo="Relatório de Entrada de Estoque"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Entradas de estoque"
            descricaoTabela="Dados filtrados por tipo de entrada e período."
            dados={entradasFiltradas}
            campos={fields}
            mensagemVazia={gerouRelatorio ? 'Nenhuma entrada encontrada.' : 'Nenhum dado carregado.'}
            arquivoExcel="relatorio_entrada_estoque"
            colunasExcel={excelColumns}
            impressao={{ titulo: 'Relatório de Entrada de Estoque', subtitulo: 'Entradas filtradas por tipo e período', orientacao: 'landscape' }}
            painelFiltros={(
                <FiltersPanel>
                    <FiltersHeader>
                        <h3>Relatório de Entrada de Estoque</h3>
                        <p>Filtre entradas manuais ou por XML em um período específico.</p>
                    </FiltersHeader>

                    <FiltersGrid>
                        <Field $span={4}>
                            <span>Tipo de Estoque</span>
                            <SelectField value={tipoEstoque} onChange={(event) => setTipoEstoque(event.target.value)}>
                                <option value="todos">Todos</option>
                                <option value="manual">Entrada Manual de Estoque</option>
                                <option value="xml">Entrada XML de Estoque</option>
                            </SelectField>
                        </Field>

                        <Field $span={4}>
                            <span>Data Início</span>
                            <TextInput type="date" value={dataInicio} onChange={(event) => setDataInicio(event.target.value)} />
                        </Field>

                        <Field $span={4}>
                            <span>Data Fim</span>
                            <TextInput type="date" value={dataFim} onChange={(event) => setDataFim(event.target.value)} />
                        </Field>
                    </FiltersGrid>

                    <ActionsRow>
                        <SummaryText>
                            {gerouRelatorio
                                ? `${entradasFiltradas.length} entrada(s), ${totalQuantidade} unidade(s).`
                                : 'Nenhum dado carregado.'}
                        </SummaryText>
                        <Botao nome="Gerar Relatório" action={() => setGerouRelatorio(true)} />
                    </ActionsRow>
                </FiltersPanel>
            )}
        />
    );
};
