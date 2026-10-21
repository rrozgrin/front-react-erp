import { useMemo, useState } from "react";
import {
    FiBarChart2,
    FiCheck,
    FiDownload,
    FiEdit2,
    FiEye,
    FiMoreVertical,
    FiPercent,
    FiShoppingBag,
    FiTag,
    FiTrendingUp,
} from "react-icons/fi";
import { Botao } from "../../../common/components/Buttons/Botao";
import { ButtonTableAction } from "../../../common/components/Buttons/ButtonTableAction";
import { FinanceiroSummaryCards } from '@/features/financeiro';
import { RelatorioTemplate } from "../../../common/components/Templates/RelatorioTemplate";
import type { TableField } from "../../../common/components/Table";
import { Select } from "../../../common/components/Ui";
import {
    couponReports,
    couponStatusLabels,
    type CouponReport,
    type CupomStatus,
} from "../data/cupomDescontoData";
import { cupomDescontoMenuSections } from "./cupomDescontoMenuSections";
import {
    ContentStack,
    CouponContent,
    CouponPageShell,
    FilterLabel,
    FiltersBar,
    PageButtons,
    PaginationBar,
    Panel,
    ReportHeader,
    SectionTitle,
    StatusPill,
    SummaryCardsArea,
    TableActions,
} from "./styled";
import { PeriodoInput } from "../../../common/components/Inputs/PeriodoInput";
import { normalizarTexto } from "../../../common/components/Templates/listagemUtils";

const reportFields: TableField<CouponReport>[] = [
    {
        id: "code",
        header: "Código do Cupom",
        accessorKey: "code",
        align: "center",
        defaultVisible: true,
    },
    {
        id: "validUntil",
        header: "Data de Validade",
        accessorKey: "validUntil",
        align: "center",
        defaultVisible: true,
    },
    {
        id: "ownCustomersPercent",
        header: "% Meus Clientes",
        accessorKey: "ownCustomersPercent",
        align: "center",
        defaultVisible: true,
    },
    {
        id: "otherCompaniesPercent",
        header: "% Outras Empresas",
        accessorKey: "otherCompaniesPercent",
        align: "center",
        defaultVisible: true,
    },
    {
        id: "saleValue",
        header: "Venda",
        accessorKey: "saleValue",
        align: "right",
        defaultVisible: true,
    },
    {
        id: "generatedAt",
        header: "Data da Geração",
        accessorKey: "generatedAt",
        align: "center",
        defaultVisible: true,
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        align: "center",
        defaultVisible: true,
        cell: (value) => {
            const status = value as CupomStatus;

            return (
                <StatusPill $status={status}>
                    {couponStatusLabels[status]}
                </StatusPill>
            );
        },
    },
    {
        id: "actions",
        header: "Ações",
        align: "center",
        defaultVisible: true,
        canHide: false,
        cell: () => (
            <TableActions>
                <ButtonTableAction title="Visualizar cupom">
                    <FiEye size={15} />
                </ButtonTableAction>
                <ButtonTableAction title="Editar cupom">
                    <FiEdit2 size={15} />
                </ButtonTableAction>
                <ButtonTableAction title="Mais ações">
                    <FiMoreVertical size={15} />
                </ButtonTableAction>
            </TableActions>
        ),
    },
];

export const RelatorioCupomDescontoPage = () => {
    const [statusFilter, setStatusFilter] = useState<"all" | CupomStatus>(
        "all",
    );

    const filteredReports = useMemo(() => {
        if (statusFilter === "all") {
            return couponReports;
        }

        return couponReports.filter(
            (report) =>
                normalizarTexto(report.status) ===
                normalizarTexto(statusFilter),
        );
    }, [statusFilter]);

    const reportSummaryItems = [
        {
            label: "Total de Cupons",
            value: "12",
            icon: <FiTag />,
        },
        {
            label: "Cupons Ativos",
            value: "10",
            icon: <FiCheck />,
        },
        {
            label: "Total de Vendas",
            value: "1.248",
            icon: <FiTrendingUp />,
        },
        {
            label: "Valor Total em Vendas",
            value: "R$ 128.450,00",
            icon: <FiShoppingBag />,
        },
        {
            label: "Desconto Total Concedido",
            value: "R$ 12.845,00",
            icon: <FiPercent />,
        },
    ];

    return (
        <CouponPageShell>
            <RelatorioTemplate
                titulo="Relatório de Cupons"
                secoes={cupomDescontoMenuSections}
                tituloTabela="Histórico de cupons"
                descricaoTabela="Registros encontrados para os filtros selecionados."
                dados={filteredReports}
                campos={reportFields}
                mensagemVazia="Nenhum cupom encontrado."
                tabelaCompacta
                mostrarCabecalhoTabela={false}
                configurarColunas={false}
                impressao={false}
                exibirAcoesFlutuantes={false}
                painelFiltros={
                    <>
                        <ReportHeader>
                            <SectionTitle>
                                <FiBarChart2 size={20} />
                                <div>
                                    <h2>Relatório de Cupons de Desconto</h2>
                                    <p>
                                        Acompanhe o desempenho dos seus cupons
                                        de desconto.
                                    </p>
                                </div>
                            </SectionTitle>
                            <Botao
                                nome="Exportar Relatório"
                                action={() => undefined}
                                icone={<FiDownload size={16} />}
                            />
                        </ReportHeader>

                        <FiltersBar>
                            <PeriodoInput
                                modo="confirmar"
                                onChange={() => undefined}
                            />
                            <FilterLabel>
                                Status do Cupom
                                <Select
                                    value={statusFilter}
                                    onChange={(event) =>
                                        setStatusFilter(
                                            event.target.value as
                                                "all" | CupomStatus,
                                        )
                                    }
                                >
                                    <option value="all">TODOS</option>
                                    <option value="active">Ativo</option>
                                    <option value="paused">Pausado</option>
                                    <option value="expired">Expirado</option>
                                </Select>
                            </FilterLabel>
                            <Botao
                                variant="primary"
                                nome="Gerar Relatório"
                                action={() => undefined}
                                icone={<FiBarChart2 size={16} />}
                            />
                        </FiltersBar>

                        <SummaryCardsArea>
                            <FinanceiroSummaryCards
                                items={reportSummaryItems}
                            />
                        </SummaryCardsArea>
                    </>
                }
                conteudoDepoisTabela={
                    <PaginationBar>
                        <span>Mostrando 1 a 10 de 12 registros</span>
                        <PageButtons>
                            <button type="button" aria-label="Página anterior">
                                «
                            </button>
                            <button type="button" aria-current="page">
                                1
                            </button>
                            <button type="button">2</button>
                            <button type="button" aria-label="Próxima página">
                                »
                            </button>
                            <Select
                                aria-label="Itens por página"
                                defaultValue="10"
                            >
                                <option value="10">10 por página</option>
                                <option value="20">20 por página</option>
                            </Select>
                        </PageButtons>
                    </PaginationBar>
                }
                renderizarConteudo={(conteudo) => (
                    <CouponContent>
                        <ContentStack>
                            <Panel>{conteudo}</Panel>
                        </ContentStack>
                    </CouponContent>
                )}
            />
        </CouponPageShell>
    );
};
