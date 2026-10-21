import { useMemo, useState } from 'react';
import styled from 'styled-components';
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
    formatDate,
    normalizeText,
} from '../../../../common/components/ReportFilters';

type ProdutosVendidosMode = 'produto-venda' | 'mais-vendidos' | 'nao-vendidos';
type TipoItem = 'P' | 'S';
type TipoRelatorio = 'E' | 'G' | 'P';

interface ProdutoVendidoRow {
    id: number;
    produto: string;
    codigoBarras: string;
    tipo: TipoItem;
    classificacao: string;
    marca: string;
    fornecedor: string;
    fabricante: string;
    vendedor: string;
    tamanho: string;
    localizacao: string;
    comprador: string;
    estoqueAtual: number;
    quantidadeVendida: number;
    valorTotal: number;
    ultimaVenda?: string;
    tipoRelatorio: TipoRelatorio;
}

const ToggleGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
`;

const ToggleButton = styled.button<{ $active: boolean }>`
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'rgba(148, 163, 184, 0.35)')};
    border-radius: 0.125rem;
    background: ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'rgba(255, 255, 255, 0.92)')};
    color: ${({ $active }) => ($active ? 'var(--color-font, #ffffff)' : 'var(--theme-text-soft, #334155)')};
    padding: 9px var(--space-sm);
    font-weight: 800;
    font-size: 0.84rem;
`;

const rows: ProdutoVendidoRow[] = [
    {
        id: 2500108,
        produto: 'Capa Banco Mod Orig Biz 125 2008',
        codigoBarras: '7899565702107',
        tipo: 'P',
        classificacao: 'Celulares e Smartphones',
        marca: 'Premium Seat',
        fornecedor: 'Moto Peças Centro',
        fabricante: 'Pro Tork',
        vendedor: 'Mariana Lima',
        tamanho: 'Único',
        localizacao: 'Rua A / Prateleira 03',
        comprador: 'Carlos Henrique',
        estoqueAtual: 2,
        quantidadeVendida: 18,
        valorTotal: 360,
        ultimaVenda: '2026-06-03',
        tipoRelatorio: 'E',
    },
    {
        id: 2500106,
        produto: 'Capa Banco Mod Orig Titan 150 2004/08',
        codigoBarras: '7899565702084',
        tipo: 'P',
        classificacao: 'Importado XML',
        marca: 'Original',
        fornecedor: 'Distribuidora Norte',
        fabricante: 'Honda',
        vendedor: 'Paulo Nunes',
        tamanho: 'Único',
        localizacao: 'Rua B / Prateleira 01',
        comprador: 'Ana Paula Motos',
        estoqueAtual: 12,
        quantidadeVendida: 11,
        valorTotal: 240.35,
        ultimaVenda: '2026-06-05',
        tipoRelatorio: 'G',
    },
    {
        id: 5500190,
        produto: 'Kit Pris Coroa Titan 150 Fan C/Porca',
        codigoBarras: '7899565721764',
        tipo: 'P',
        classificacao: 'Importado XML',
        marca: 'Cromo Forte',
        fornecedor: 'Moto Peças Centro',
        fabricante: 'Cromo Forte',
        vendedor: 'Mariana Lima',
        tamanho: 'Kit',
        localizacao: 'Rua C / Gaveta 08',
        comprador: 'Moto Clube Centro',
        estoqueAtual: 0,
        quantidadeVendida: 7,
        valorTotal: 72.87,
        ultimaVenda: '2026-06-01',
        tipoRelatorio: 'P',
    },
    {
        id: 7000120,
        produto: 'Protetor de Tanque Adesivo',
        codigoBarras: '7890000001200',
        tipo: 'P',
        classificacao: 'Acessórios',
        marca: 'Road Vision',
        fornecedor: 'Auto Peças Sul',
        fabricante: 'Road Vision',
        vendedor: 'Sem venda',
        tamanho: 'Único',
        localizacao: 'Rua D / Prateleira 02',
        comprador: '',
        estoqueAtual: 8,
        quantidadeVendida: 0,
        valorTotal: 0,
        tipoRelatorio: 'E',
    },
    {
        id: 9000100,
        produto: 'Instalação de Acessório',
        codigoBarras: 'SERV-001',
        tipo: 'S',
        classificacao: 'Serviços',
        marca: 'Serviço',
        fornecedor: 'Interno',
        fabricante: 'Interno',
        vendedor: 'Paulo Nunes',
        tamanho: 'N/A',
        localizacao: 'Balcão',
        comprador: 'Fernanda Souza',
        estoqueAtual: 0,
        quantidadeVendida: 5,
        valorTotal: 250,
        ultimaVenda: '2026-06-06',
        tipoRelatorio: 'E',
    },
];

const modeConfig: Record<ProdutosVendidosMode, { title: string; tableTitle: string; soldOnly?: boolean; fileName: string }> = {
    'produto-venda': {
        title: 'Relatório Produto/venda',
        tableTitle: 'Produtos vendidos e não vendidos',
        fileName: 'relatorio_produto_venda',
    },
    'mais-vendidos': {
        title: 'Relatório Mais Vendidos',
        tableTitle: 'Produtos mais vendidos',
        soldOnly: true,
        fileName: 'relatorio_produtos_mais_vendidos',
    },
    'nao-vendidos': {
        title: 'Relatório Não Vendidos',
        tableTitle: 'Produtos não vendidos',
        soldOnly: false,
        fileName: 'relatorio_produtos_nao_vendidos',
    },
};

const tipoRelatorioLabels: Record<TipoRelatorio, string> = {
    E: 'Estoque',
    G: 'Grade',
    P: 'Promoções',
};

const tableFields: TableField<ProdutoVendidoRow>[] = [
    { id: 'produto', header: 'Produto', accessorKey: 'produto', defaultVisible: true },
    { id: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'classificacao', header: 'Classificação', accessorKey: 'classificacao', defaultVisible: true },
    { id: 'marca', header: 'Marca', accessorKey: 'marca' },
    { id: 'fornecedor', header: 'Fornecedor', accessorKey: 'fornecedor' },
    { id: 'fabricante', header: 'Fabricante', accessorKey: 'fabricante' },
    { id: 'vendedor', header: 'Vendedor', accessorKey: 'vendedor', defaultVisible: true },
    { id: 'tamanho', header: 'Tamanho', accessorKey: 'tamanho' },
    { id: 'localizacao', header: 'Localização', accessorKey: 'localizacao' },
    { id: 'comprador', header: 'Cliente Comprador', accessorKey: 'comprador' },
    { id: 'estoqueAtual', header: 'Estoque', accessorKey: 'estoqueAtual', align: 'right', defaultVisible: true },
    { id: 'quantidadeVendida', header: 'Qtd. Vendida', accessorKey: 'quantidadeVendida', align: 'right', defaultVisible: true },
    { id: 'valorTotal', header: 'Valor Total', accessorFn: (row) => formatCurrency(row.valorTotal), align: 'right', defaultVisible: true },
    { id: 'ultimaVenda', header: 'Última Venda', accessorFn: (row) => row.ultimaVenda ? formatDate(row.ultimaVenda) : '-', defaultVisible: true },
    { id: 'tipoRelatorio', header: 'Tipo Relatório', accessorFn: (row) => tipoRelatorioLabels[row.tipoRelatorio] },
];

const excelColumns: ExcelColumn<ProdutoVendidoRow>[] = [
    { key: 'produto', header: 'Produto', accessorKey: 'produto' },
    { key: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras' },
    { key: 'classificacao', header: 'Classificação', accessorKey: 'classificacao' },
    { key: 'marca', header: 'Marca', accessorKey: 'marca' },
    { key: 'fornecedor', header: 'Fornecedor', accessorKey: 'fornecedor' },
    { key: 'fabricante', header: 'Fabricante', accessorKey: 'fabricante' },
    { key: 'vendedor', header: 'Vendedor', accessorKey: 'vendedor' },
    { key: 'tamanho', header: 'Tamanho', accessorKey: 'tamanho' },
    { key: 'localizacao', header: 'Localização', accessorKey: 'localizacao' },
    { key: 'comprador', header: 'Cliente Comprador', accessorKey: 'comprador' },
    { key: 'estoqueAtual', header: 'Estoque', accessorKey: 'estoqueAtual' },
    { key: 'quantidadeVendida', header: 'Qtd. Vendida', accessorKey: 'quantidadeVendida' },
    { key: 'valorTotal', header: 'Valor Total', accessorFn: (row) => formatCurrency(row.valorTotal) },
    { key: 'ultimaVenda', header: 'Última Venda', accessorFn: (row) => row.ultimaVenda ? formatDate(row.ultimaVenda) : '-' },
    { key: 'tipoRelatorio', header: 'Tipo Relatório', accessorFn: (row) => tipoRelatorioLabels[row.tipoRelatorio] },
];

const ProdutosRelatorioProdutosVendidosBasePage = ({ mode }: { mode: ProdutosVendidosMode }) => {
    const config = modeConfig[mode];
    const [tipo, setTipo] = useState('T');
    const [classificacao, setClassificacao] = useState('T');
    const [marca, setMarca] = useState('T');
    const [fornecedor, setFornecedor] = useState('T');
    const [fabricante, setFabricante] = useState('T');
    const [vendedor, setVendedor] = useState('');
    const [produto, setProduto] = useState('');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [dataInicio, setDataInicio] = useState('2026-06-01');
    const [dataFim, setDataFim] = useState('2026-06-08');
    const [tipoRelatorio, setTipoRelatorio] = useState<TipoRelatorio>('E');
    const [showEstoqueZero, setShowEstoqueZero] = useState(true);

    const filteredRows = useMemo(() => {
        const produtoTerm = normalizeText(produto);
        const codigoTerm = normalizeText(codigoBarras);

        return rows
            .filter((row) => {
                const matchesMode = config.soldOnly === undefined
                    || (config.soldOnly ? row.quantidadeVendida > 0 : row.quantidadeVendida === 0);
                const matchesTipo = tipo === 'T' || row.tipo === tipo;
                const matchesClassificacao = classificacao === 'T' || row.classificacao === classificacao;
                const matchesMarca = marca === 'T' || row.marca === marca;
                const matchesFornecedor = fornecedor === 'T' || row.fornecedor === fornecedor;
                const matchesFabricante = fabricante === 'T' || row.fabricante === fabricante;
                const matchesVendedor = !vendedor || row.vendedor === vendedor;
                const matchesProduto = !produtoTerm || normalizeText(row.produto).includes(produtoTerm);
                const matchesCodigo = !codigoTerm || normalizeText(row.codigoBarras).includes(codigoTerm);
                const matchesTipoRelatorio = row.tipoRelatorio === tipoRelatorio;
                const matchesEstoqueZero = showEstoqueZero || row.estoqueAtual !== 0;
                const matchesInicio = !row.ultimaVenda || !dataInicio || row.ultimaVenda >= dataInicio;
                const matchesFim = !row.ultimaVenda || !dataFim || row.ultimaVenda <= dataFim;

                return matchesMode
                    && matchesTipo
                    && matchesClassificacao
                    && matchesMarca
                    && matchesFornecedor
                    && matchesFabricante
                    && matchesVendedor
                    && matchesProduto
                    && matchesCodigo
                    && matchesTipoRelatorio
                    && matchesEstoqueZero
                    && matchesInicio
                    && matchesFim;
            })
            .sort((a, b) => b.quantidadeVendida - a.quantidadeVendida);
    }, [classificacao, codigoBarras, config.soldOnly, dataFim, dataInicio, fabricante, fornecedor, marca, produto, showEstoqueZero, tipo, tipoRelatorio, vendedor]);

    const totalQuantidade = filteredRows.reduce((total, row) => total + row.quantidadeVendida, 0);
    const totalValor = filteredRows.reduce((total, row) => total + row.valorTotal, 0);

    return (
        <RelatorioTemplate
            titulo={config.title}
            secoes={buildProdutosMenuSections({})}
            tituloTabela={config.tableTitle}
            descricaoTabela="Resultado filtrado por produto, período, classificação, fornecedor e vendedor."
            dados={filteredRows}
            campos={tableFields}
            mensagemVazia="Nenhum produto encontrado para os filtros informados."
            arquivoExcel={config.fileName}
            colunasExcel={excelColumns}
            impressao={{ titulo: config.title, subtitulo: 'Produtos filtrados por movimentação de venda', orientacao: 'landscape' }}
            painelFiltros={<FiltersPanel>
                    <FiltersHeader>
                        <h3>Filtros do relatório</h3>
                        <p>Consulta baseada no relatório legado de produtos vendidos e não vendidos.</p>
                    </FiltersHeader>

                    <FiltersGrid>
                        <Field $span={3}>
                            <span>Tipo</span>
                            <SelectField value={tipo} onChange={(event) => setTipo(event.target.value)}>
                                <option value="T">Todos</option>
                                <option value="P">Produto</option>
                                <option value="S">Serviço</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Classificação</span>
                            <SelectField value={classificacao} onChange={(event) => setClassificacao(event.target.value)}>
                                <option value="T">Todas</option>
                                <option value="Celulares e Smartphones">Celulares e Smartphones</option>
                                <option value="Importado XML">Importado XML</option>
                                <option value="Acessórios">Acessórios</option>
                                <option value="Serviços">Serviços</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Marca</span>
                            <SelectField value={marca} onChange={(event) => setMarca(event.target.value)}>
                                <option value="T">Todos</option>
                                <option value="Premium Seat">Premium Seat</option>
                                <option value="Original">Original</option>
                                <option value="Cromo Forte">Cromo Forte</option>
                                <option value="Road Vision">Road Vision</option>
                                <option value="Serviço">Serviço</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Fornecedor</span>
                            <SelectField value={fornecedor} onChange={(event) => setFornecedor(event.target.value)}>
                                <option value="T">Todos</option>
                                <option value="Moto Peças Centro">Moto Peças Centro</option>
                                <option value="Distribuidora Norte">Distribuidora Norte</option>
                                <option value="Auto Peças Sul">Auto Peças Sul</option>
                                <option value="Interno">Interno</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Fabricante</span>
                            <SelectField value={fabricante} onChange={(event) => setFabricante(event.target.value)}>
                                <option value="T">Todos</option>
                                <option value="Pro Tork">Pro Tork</option>
                                <option value="Honda">Honda</option>
                                <option value="Cromo Forte">Cromo Forte</option>
                                <option value="Road Vision">Road Vision</option>
                                <option value="Interno">Interno</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Atendente / Vendedor</span>
                            <SelectField value={vendedor} onChange={(event) => setVendedor(event.target.value)}>
                                <option value="">Todos</option>
                                <option value="Mariana Lima">Mariana Lima</option>
                                <option value="Paulo Nunes">Paulo Nunes</option>
                                <option value="Sem venda">Sem venda</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Nome do Produto</span>
                            <TextInput value={produto} onChange={(event) => setProduto(event.target.value)} />
                        </Field>

                        <Field $span={3}>
                            <span>Código de Barras</span>
                            <TextInput value={codigoBarras} onChange={(event) => setCodigoBarras(event.target.value)} />
                        </Field>

                        <Field $span={3}>
                            <span>Data Inicial</span>
                            <TextInput type="date" value={dataInicio} onChange={(event) => setDataInicio(event.target.value)} />
                        </Field>

                        <Field $span={3}>
                            <span>Data Final</span>
                            <TextInput type="date" value={dataFim} onChange={(event) => setDataFim(event.target.value)} />
                        </Field>

                        <Field $span={3}>
                            <span>Tipo de relatório</span>
                            <SelectField value={tipoRelatorio} onChange={(event) => setTipoRelatorio(event.target.value as TipoRelatorio)}>
                                <option value="E">Estoque</option>
                                <option value="G">Grade</option>
                                <option value="P">Promoções</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Mostrar estoque zero</span>
                            <ToggleGroup>
                                <ToggleButton type="button" $active={showEstoqueZero} onClick={() => setShowEstoqueZero(true)}>Sim</ToggleButton>
                                <ToggleButton type="button" $active={!showEstoqueZero} onClick={() => setShowEstoqueZero(false)}>Não</ToggleButton>
                            </ToggleGroup>
                        </Field>
                    </FiltersGrid>

                    <ActionsRow>
                        <SummaryText>
                            {filteredRows.length} produto(s), {totalQuantidade} unidade(s), {formatCurrency(totalValor)}.
                        </SummaryText>
                    </ActionsRow>
                </FiltersPanel>}
        />
    );
};

export const ProdutosRelatorioProdutoVendaPage = () => <ProdutosRelatorioProdutosVendidosBasePage mode="produto-venda" />;

export const ProdutosRelatorioMaisVendidosPage = () => <ProdutosRelatorioProdutosVendidosBasePage mode="mais-vendidos" />;

export const ProdutosRelatorioNaoVendidosPage = () => <ProdutosRelatorioProdutosVendidosBasePage mode="nao-vendidos" />;
