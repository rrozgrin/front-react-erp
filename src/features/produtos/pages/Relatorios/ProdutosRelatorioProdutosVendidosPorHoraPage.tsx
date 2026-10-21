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

type TipoItem = 'P' | 'S';

interface ProdutoVendidoHoraRow {
    id: number;
    produto: string;
    codigoBarras: string;
    tipo: TipoItem;
    classificacao: string;
    dataVenda: string;
    horaVenda: string;
    quantidade: number;
    valorTotal: number;
    vendedor: string;
}

const rows: ProdutoVendidoHoraRow[] = [
    {
        id: 1,
        produto: 'Capa Banco Mod Orig Biz 125 2008',
        codigoBarras: '7899565702107',
        tipo: 'P',
        classificacao: 'Celulares e Smartphones',
        dataVenda: '2026-06-08',
        horaVenda: '09:20',
        quantidade: 2,
        valorTotal: 40,
        vendedor: 'Mariana Lima',
    },
    {
        id: 2,
        produto: 'Capa Banco Mod Orig Titan 150 2004/08',
        codigoBarras: '7899565702084',
        tipo: 'P',
        classificacao: 'Importado XML',
        dataVenda: '2026-06-08',
        horaVenda: '14:35',
        quantidade: 3,
        valorTotal: 65.55,
        vendedor: 'Paulo Nunes',
    },
    {
        id: 3,
        produto: 'Instalação de Acessório',
        codigoBarras: 'SERV-001',
        tipo: 'S',
        classificacao: 'Serviços',
        dataVenda: '2026-06-08',
        horaVenda: '16:10',
        quantidade: 1,
        valorTotal: 50,
        vendedor: 'Mariana Lima',
    },
    {
        id: 4,
        produto: 'Kit Pris Coroa Titan 150 Fan C/Porca',
        codigoBarras: '7899565721764',
        tipo: 'P',
        classificacao: 'Importado XML',
        dataVenda: '2026-06-07',
        horaVenda: '10:05',
        quantidade: 4,
        valorTotal: 41.64,
        vendedor: 'Paulo Nunes',
    },
];

const fields: TableField<ProdutoVendidoHoraRow>[] = [
    { id: 'produto', header: 'Produto', accessorKey: 'produto', defaultVisible: true },
    { id: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'classificacao', header: 'Classificação', accessorKey: 'classificacao', defaultVisible: true },
    { id: 'dataVenda', header: 'Data', accessorKey: 'dataVenda', align: 'center', defaultVisible: true },
    { id: 'horaVenda', header: 'Hora', accessorKey: 'horaVenda', align: 'center', defaultVisible: true },
    { id: 'quantidade', header: 'Quantidade', accessorKey: 'quantidade', align: 'right', defaultVisible: true },
    { id: 'valorTotal', header: 'Valor Total', accessorFn: (row) => formatCurrency(row.valorTotal), align: 'right', defaultVisible: true },
    { id: 'vendedor', header: 'Vendedor', accessorKey: 'vendedor', defaultVisible: true },
];

const excelColumns: ExcelColumn<ProdutoVendidoHoraRow>[] = [
    { key: 'produto', header: 'Produto', accessorKey: 'produto' },
    { key: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras' },
    { key: 'classificacao', header: 'Classificação', accessorKey: 'classificacao' },
    { key: 'dataVenda', header: 'Data', accessorKey: 'dataVenda' },
    { key: 'horaVenda', header: 'Hora', accessorKey: 'horaVenda' },
    { key: 'quantidade', header: 'Quantidade', accessorKey: 'quantidade' },
    { key: 'valorTotal', header: 'Valor Total', accessorFn: (row) => formatCurrency(row.valorTotal) },
    { key: 'vendedor', header: 'Vendedor', accessorKey: 'vendedor' },
];

export const ProdutosRelatorioProdutosVendidosPorHoraPage = () => {
    const [tipo, setTipo] = useState('T');
    const [classificacao, setClassificacao] = useState('T');
    const [produto, setProduto] = useState('');
    const [dataVenda, setDataVenda] = useState('2026-06-08');
    const [horaInicial, setHoraInicial] = useState('00:00');
    const [horaFinal, setHoraFinal] = useState('23:59');

    const filteredRows = useMemo(() => {
        const produtoTerm = normalizeText(produto);

        return rows.filter((row) => {
            const matchesTipo = tipo === 'T' || row.tipo === tipo;
            const matchesClassificacao = classificacao === 'T' || row.classificacao === classificacao;
            const matchesProduto = !produtoTerm || normalizeText(row.produto).includes(produtoTerm);
            const matchesData = !dataVenda || row.dataVenda === dataVenda;
            const matchesHoraInicial = !horaInicial || row.horaVenda >= horaInicial;
            const matchesHoraFinal = !horaFinal || row.horaVenda <= horaFinal;

            return matchesTipo && matchesClassificacao && matchesProduto && matchesData && matchesHoraInicial && matchesHoraFinal;
        });
    }, [classificacao, dataVenda, horaFinal, horaInicial, produto, tipo]);

    const totalQuantidade = filteredRows.reduce((total, row) => total + row.quantidade, 0);
    const totalValor = filteredRows.reduce((total, row) => total + row.valorTotal, 0);

    return (
        <RelatorioTemplate
            titulo="Relatório Vendidos por Hora"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Produtos vendidos por hora"
            descricaoTabela="Resultado filtrado por data e horário de venda."
            dados={filteredRows}
            campos={fields}
            mensagemVazia="Nenhum produto vendido encontrado para os filtros informados."
            arquivoExcel="relatorio_produtos_vendidos_por_hora"
            colunasExcel={excelColumns}
            impressao={{ titulo: 'Relatório Vendidos por Hora', subtitulo: 'Produtos vendidos por data e faixa de horário', orientacao: 'landscape' }}
            painelFiltros={<FiltersPanel>
                    <FiltersHeader>
                        <h3>Filtros do relatório</h3>
                        <p>Consulta baseada no relatório legado de produtos vendidos por data e faixa de horário.</p>
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
                                <option value="Serviços">Serviços</option>
                            </SelectField>
                        </Field>

                        <Field $span={3}>
                            <span>Nome do Produto</span>
                            <TextInput value={produto} onChange={(event) => setProduto(event.target.value)} />
                        </Field>

                        <Field $span={3}>
                            <span>Data das Vendas</span>
                            <TextInput type="date" value={dataVenda} onChange={(event) => setDataVenda(event.target.value)} />
                        </Field>

                        <Field $span={3}>
                            <span>Hora Inicial</span>
                            <TextInput type="time" value={horaInicial} onChange={(event) => setHoraInicial(event.target.value)} />
                        </Field>

                        <Field $span={3}>
                            <span>Hora Final</span>
                            <TextInput type="time" value={horaFinal} onChange={(event) => setHoraFinal(event.target.value)} />
                        </Field>
                    </FiltersGrid>

                    <ActionsRow>
                        <SummaryText>
                            {filteredRows.length} item(ns), {totalQuantidade} unidade(s), {formatCurrency(totalValor)}.
                        </SummaryText>
                    </ActionsRow>
                </FiltersPanel>}
        />
    );
};
