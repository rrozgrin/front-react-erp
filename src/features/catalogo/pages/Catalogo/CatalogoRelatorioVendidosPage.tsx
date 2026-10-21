import { useMemo, useState } from "react";
import type { ExcelColumn } from "../../../../common/components/Actions/GerarExcel";
import { RelatorioTemplate } from "../../../../common/components/Templates/RelatorioTemplate";
import type { TableField } from "../../../../common/components/Table";
import {
    ActionsRow,
    Field,
    FiltersGrid,
    FiltersPanel,
    SelectField,
    SummaryText,
    TextInput,
} from "../../../../common/components/ReportFilters";
import {
    buildCatalogoMenuSections,
    type CatalogoConfig,
} from "./catalogoConfig";
import {
    catalogoVendidosMockData,
    formatCurrency,
    formatDate,
    normalizeText,
    type CatalogoVendido,
} from "./catalogoData";

interface CatalogoRelatorioVendidosPageProps {
    config: CatalogoConfig;
}

export const CatalogoRelatorioVendidosPage = ({
    config,
}: CatalogoRelatorioVendidosPageProps) => {
    const [busca, setBusca] = useState("");
    const [classificacao, setClassificacao] = useState("T");
    const [dataInicio, setDataInicio] = useState("2026-06-01");
    const [dataFim, setDataFim] = useState("2026-06-08");

    const rowsBase = useMemo(
        () =>
            catalogoVendidosMockData.filter(
                (row) => row.prodServ === config.prodServ,
            ),
        [config.prodServ],
    );
    const classificacoes = useMemo(
        () => Array.from(new Set(rowsBase.map((row) => row.classificacao))),
        [rowsBase],
    );

    const fields = useMemo<TableField<CatalogoVendido>[]>(
        () => [
            {
                id: "codigo",
                header: config.labels.code,
                accessorKey: "codigo",
                defaultVisible: true,
            },
            {
                id: "item",
                header: config.labels.name,
                accessorKey: "item",
                defaultVisible: true,
            },
            {
                id: "classificacao",
                header: "Classificação",
                accessorKey: "classificacao",
                defaultVisible: true,
            },
            {
                id: "cliente",
                header: "Cliente",
                accessorKey: "cliente",
                defaultVisible: true,
            },
            {
                id: "vendedor",
                header: "Vendedor",
                accessorKey: "vendedor",
                defaultVisible: true,
            },
            {
                id: "dataVenda",
                header: "Data Venda",
                accessorFn: (row) => formatDate(row.dataVenda),
                defaultVisible: true,
            },
            {
                id: "quantidade",
                header: "Quantidade",
                accessorKey: "quantidade",
                align: "right",
                defaultVisible: true,
            },
            {
                id: "valorUnitario",
                header: "Valor Unitário",
                accessorFn: (row) => formatCurrency(row.valorUnitario),
                align: "right",
                defaultVisible: true,
            },
            {
                id: "valorTotal",
                header: "Valor Total",
                accessorFn: (row) => formatCurrency(row.valorTotal),
                align: "right",
                defaultVisible: true,
            },
        ],
        [config.labels.code, config.labels.name],
    );

    const excelColumns = useMemo<ExcelColumn<CatalogoVendido>[]>(
        () => [
            {
                key: "codigo",
                header: config.labels.code,
                accessorKey: "codigo",
            },
            { key: "item", header: config.labels.name, accessorKey: "item" },
            {
                key: "classificacao",
                header: "Classificação",
                accessorKey: "classificacao",
            },
            { key: "cliente", header: "Cliente", accessorKey: "cliente" },
            { key: "vendedor", header: "Vendedor", accessorKey: "vendedor" },
            {
                key: "dataVenda",
                header: "Data Venda",
                accessorFn: (row) => formatDate(row.dataVenda),
            },
            {
                key: "quantidade",
                header: "Quantidade",
                accessorKey: "quantidade",
            },
            {
                key: "valorUnitario",
                header: "Valor Unitário",
                accessorFn: (row) => formatCurrency(row.valorUnitario),
            },
            {
                key: "valorTotal",
                header: "Valor Total",
                accessorFn: (row) => formatCurrency(row.valorTotal),
            },
        ],
        [config.labels.code, config.labels.name],
    );

    const filteredRows = useMemo(() => {
        const termo = normalizeText(busca);
        return rowsBase.filter((row) => {
            const matchesBusca =
                !termo ||
                [row.codigo, row.item, row.cliente, row.vendedor].some(
                    (value) => normalizeText(value).includes(termo),
                );
            const matchesClassificacao =
                classificacao === "T" || row.classificacao === classificacao;
            const matchesInicio = !dataInicio || row.dataVenda >= dataInicio;
            const matchesFim = !dataFim || row.dataVenda <= dataFim;
            return (
                matchesBusca &&
                matchesClassificacao &&
                matchesInicio &&
                matchesFim
            );
        });
    }, [busca, classificacao, dataFim, dataInicio, rowsBase]);

    const totalValor = filteredRows.reduce(
        (total, row) => total + row.valorTotal,
        0,
    );
    const totalQuantidade = filteredRows.reduce(
        (total, row) => total + row.quantidade,
        0,
    );

    return (
        <RelatorioTemplate
            titulo={config.labels.soldReport}
            secoes={buildCatalogoMenuSections(config)}
            tituloTabela={config.labels.soldReport}
            descricaoTabela="Itens vendidos no período selecionado."
            dados={filteredRows}
            campos={fields}
            mensagemVazia="Nenhum item vendido encontrado."
            arquivoExcel={`${config.prodServ === "S" ? "servicos" : "produtos"}_vendidos`}
            colunasExcel={excelColumns}
            impressao={{
                titulo: config.labels.soldReport,
                subtitulo: "Itens filtrados por período",
                orientacao: "landscape",
            }}
            painelFiltros={
                <FiltersPanel>
                    <FiltersGrid>
                        <Field $span={5}>
                            <span>Busca avançada</span>
                            <TextInput
                                value={busca}
                                onChange={(event) =>
                                    setBusca(event.target.value)
                                }
                                placeholder={`${config.labels.singular}, cliente, vendedor ou código`}
                            />
                        </Field>
                        <Field $span={3}>
                            <span>Classificação</span>
                            <SelectField
                                value={classificacao}
                                onChange={(event) =>
                                    setClassificacao(event.target.value)
                                }
                            >
                                <option value="T">Todas</option>
                                {classificacoes.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </SelectField>
                        </Field>
                        <Field $span={2}>
                            <span>Data inicial</span>
                            <TextInput
                                type="date"
                                value={dataInicio}
                                onChange={(event) =>
                                    setDataInicio(event.target.value)
                                }
                            />
                        </Field>
                        <Field $span={2}>
                            <span>Data final</span>
                            <TextInput
                                type="date"
                                value={dataFim}
                                onChange={(event) =>
                                    setDataFim(event.target.value)
                                }
                            />
                        </Field>
                    </FiltersGrid>

                    <ActionsRow>
                        <SummaryText>
                            {filteredRows.length} item(ns), {totalQuantidade}{" "}
                            unidade(s), {formatCurrency(totalValor)}.
                        </SummaryText>
                    </ActionsRow>
                </FiltersPanel>
            }
        />
    );
};
