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
    normalizeText,
} from '../../../../common/components/ReportFilters';

interface EstoqueReportRow {
    id: number;
    produto: string;
    codigoBarras: string;
    atributo: string;
    classificacao: string;
    fabricante: string;
    marca: string;
    fornecedor: string;
    unidade: string;
    localizacao: string;
    estoqueAtual: number;
    custo: number;
    venda: number;
}

const estoqueRows: EstoqueReportRow[] = [
    {
        id: 1,
        produto: 'Capa Banco Biz 125 Premium',
        codigoBarras: '7899565702107',
        atributo: 'Cor: Preta',
        classificacao: 'Acessórios',
        fabricante: 'Pro Tork',
        marca: 'Premium Seat',
        fornecedor: 'Moto Pecas Centro',
        unidade: 'UN',
        localizacao: 'Rua A / Prateleira 03',
        estoqueAtual: 12,
        custo: 17.28,
        venda: 29.9,
    },
    {
        id: 2,
        produto: 'Capacete Fechado Sport',
        codigoBarras: '7899541200456',
        atributo: 'Tamanho: 58',
        classificacao: 'Capacetes',
        fabricante: 'Liberty Four',
        marca: 'Liberty',
        fornecedor: 'Distribuidora Norte',
        unidade: 'UN',
        localizacao: 'Rua B / Prateleira 01',
        estoqueAtual: 5,
        custo: 89.4,
        venda: 149.9,
    },
    {
        id: 3,
        produto: 'Óleo Semissintético 10W40',
        codigoBarras: '7891234500012',
        atributo: 'Volume: 1L',
        classificacao: 'Lubrificantes',
        fabricante: 'Mobil',
        marca: 'Mobil',
        fornecedor: 'Auto Lub Distribuidora',
        unidade: 'UN',
        localizacao: 'Rua C / Gaveta 08',
        estoqueAtual: 48,
        custo: 22.5,
        venda: 34.9,
    },
    {
        id: 4,
        produto: 'Retrovisor Universal Par',
        codigoBarras: '7897788990011',
        atributo: 'Lado: Par',
        classificacao: 'Acessórios',
        fabricante: 'Cromo Forte',
        marca: 'Road Vision',
        fornecedor: 'Moto Pecas Centro',
        unidade: 'PAR',
        localizacao: 'Rua A / Prateleira 09',
        estoqueAtual: 0,
        custo: 31.7,
        venda: 57.8,
    },
];

const tableFields: TableField<EstoqueReportRow>[] = [
    { id: 'produto', header: 'Produto', accessorKey: 'produto', defaultVisible: true },
    { id: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'atributo', header: 'Atributo', accessorKey: 'atributo', defaultVisible: true },
    { id: 'classificacao', header: 'Classificação', accessorKey: 'classificacao', defaultVisible: true },
    { id: 'fabricante', header: 'Fabricante', accessorKey: 'fabricante', defaultVisible: true },
    { id: 'estoqueAtual', header: 'Estoque', accessorKey: 'estoqueAtual', align: 'right', defaultVisible: true },
    { id: 'custo', header: 'Custo', accessorFn: (row) => formatCurrency(row.custo), align: 'right', defaultVisible: true },
    { id: 'venda', header: 'Venda', accessorFn: (row) => formatCurrency(row.venda), align: 'right', defaultVisible: true },
    { id: 'localizacao', header: 'Localização', accessorKey: 'localizacao' },
];

const excelColumns: ExcelColumn<EstoqueReportRow>[] = [
    { key: 'produto', header: 'Produto', accessorKey: 'produto' },
    { key: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras' },
    { key: 'atributo', header: 'Atributo', accessorKey: 'atributo' },
    { key: 'classificacao', header: 'Classificação', accessorKey: 'classificacao' },
    { key: 'fabricante', header: 'Fabricante', accessorKey: 'fabricante' },
    { key: 'marca', header: 'Marca', accessorKey: 'marca' },
    { key: 'fornecedor', header: 'Fornecedor', accessorKey: 'fornecedor' },
    { key: 'unidade', header: 'Unidade', accessorKey: 'unidade' },
    { key: 'localizacao', header: 'Localização', accessorKey: 'localizacao' },
    { key: 'estoqueAtual', header: 'Estoque Atual', accessorKey: 'estoqueAtual' },
    { key: 'custo', header: 'Custo', accessorFn: (row) => formatCurrency(row.custo) },
    { key: 'venda', header: 'Venda', accessorFn: (row) => formatCurrency(row.venda) },
];

export const ProdutosRelatorioEstoquePage = () => {
    const [produto, setProduto] = useState('');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [atributo, setAtributo] = useState('todos');
    const [classificacao, setClassificacao] = useState('todas');
    const [fabricante, setFabricante] = useState('todos');
    const [fornecedor, setFornecedor] = useState('todos');

    const filteredRows = useMemo(() => {
        const normalizedProduto = normalizeText(produto);
        const normalizedCodigo = normalizeText(codigoBarras);

        return estoqueRows.filter((row) => {
            const matchesProduto = !normalizedProduto || normalizeText(row.produto).includes(normalizedProduto);
            const matchesCodigo = !normalizedCodigo || normalizeText(row.codigoBarras).includes(normalizedCodigo);
            const matchesAtributo = atributo === 'todos' || row.atributo === atributo;
            const matchesClassificacao = classificacao === 'todas' || row.classificacao === classificacao;
            const matchesFabricante = fabricante === 'todos' || row.fabricante === fabricante;
            const matchesFornecedor = fornecedor === 'todos' || row.fornecedor === fornecedor;

            return matchesProduto && matchesCodigo && matchesAtributo && matchesClassificacao && matchesFabricante && matchesFornecedor;
        });
    }, [atributo, classificacao, codigoBarras, fabricante, fornecedor, produto]);

    return (
        <RelatorioTemplate
            titulo="Relatório de Estoque"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Relatório de estoque"
            descricaoTabela="Consulta de produtos, grade, classificação e posição de estoque em uma página própria."
            dados={filteredRows}
            campos={tableFields}
            mensagemVazia="Nenhum produto encontrado para os filtros informados."
            arquivoExcel="relatorio_estoque_produtos"
            colunasExcel={excelColumns}
            impressao={{ titulo: 'Relatório de Estoque', subtitulo: 'Produtos e posicoes filtradas', orientacao: 'landscape' }}
            painelFiltros={<FiltersPanel>
                    <FiltersHeader>
                        <h3>Filtros do relatório</h3>
                        <p>Versão separada do legado de relatórios de estoque e produto, focada apenas em estoque.</p>
                    </FiltersHeader>

                    <FiltersGrid>
                        <Field $span={4}>
                            <span>Nome do produto</span>
                            <TextInput value={produto} onChange={(event) => setProduto(event.target.value)} placeholder="Todos" />
                        </Field>

                        <Field $span={4}>
                            <span>Código de barras</span>
                            <TextInput value={codigoBarras} onChange={(event) => setCodigoBarras(event.target.value)} placeholder="Todos" />
                        </Field>

                        <Field $span={4}>
                            <span>Atributo de grade</span>
                            <SelectField value={atributo} onChange={(event) => setAtributo(event.target.value)}>
                                <option value="todos">Todos</option>
                                <option value="Cor: Preta">Cor: Preta</option>
                                <option value="Tamanho: 58">Tamanho: 58</option>
                                <option value="Volume: 1L">Volume: 1L</option>
                                <option value="Lado: Par">Lado: Par</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Classificação</span>
                            <SelectField value={classificacao} onChange={(event) => setClassificacao(event.target.value)}>
                                <option value="todas">Todas</option>
                                <option value="Acessórios">Acessórios</option>
                                <option value="Capacetes">Capacetes</option>
                                <option value="Lubrificantes">Lubrificantes</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Fabricante</span>
                            <SelectField value={fabricante} onChange={(event) => setFabricante(event.target.value)}>
                                <option value="todos">Todos</option>
                                <option value="Pro Tork">Pro Tork</option>
                                <option value="Liberty Four">Liberty Four</option>
                                <option value="Mobil">Mobil</option>
                                <option value="Cromo Forte">Cromo Forte</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Fornecedor</span>
                            <SelectField value={fornecedor} onChange={(event) => setFornecedor(event.target.value)}>
                                <option value="todos">Todos</option>
                                <option value="Moto Pecas Centro">Moto Pecas Centro</option>
                                <option value="Distribuidora Norte">Distribuidora Norte</option>
                                <option value="Auto Lub Distribuidora">Auto Lub Distribuidora</option>
                            </SelectField>
                        </Field>
                    </FiltersGrid>

                    <ActionsRow>
                        <SummaryText>{filteredRows.length} produto(s) encontrados para o recorte atual.</SummaryText>
                    </ActionsRow>
                </FiltersPanel>}
        />
    );
};
