import { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FiBarChart2 } from "react-icons/fi";
import { FloatingActions } from "../../../../common/components/Buttons/FloatingActions";
import { Table, TableField } from "../../../../common/components/Table";
import { FinanceiroSummaryCards } from '@/features/financeiro';
import { Cliente } from "../../types/Cliente";
import { formatarDataBR } from "../../../../types/Data";
import { FiltroPeriodoFinanceiro } from "./FiltroPeriodoFinanceiro";
import { PageWrap } from "./FinanceiroClientePage.styles";
import { ClienteDetalhePageLayout } from "../shared/ClienteDetalhePageLayout";
import {
    formatCurrencyBRL,
    getFirstOfMonth,
    getToday,
    MoneyCell,
    PeriodShortcut,
    PrintableSection,
    resolvePeriodShortcut,
} from "./shared/financeiroClienteShared";

interface LocationState {
    cliente?: Cliente;
}

interface debitoPendenteRow {
    contrato: string;
    venda: string;
    vencimento: string;
    parcela: string;
    tipoPagamento: string;
    valor: number;
}

const debitoPendenteData: debitoPendenteRow[] = [
    {
        contrato: "ADM - ADMINISTRATIVO",
        venda: "1.1.1.01.0001",
        vencimento: "ADM - GERAL",
        parcela: "",
        tipoPagamento: "DÉBITO",
        valor: 2500,
    },
    {
        contrato: "FIN - FINANCEIRO",
        venda: "2.1.1.01.0002",
        vencimento: "FIN - TESOURARIA",
        parcela: "",
        tipoPagamento: "CRÉDITO",
        valor: 5750,
    },
    {
        contrato: "COM - COMERCIAL",
        venda: "3.1.1.02.0003",
        vencimento: "COM - VENDAS",
        parcela: "",
        tipoPagamento: "DÉBITO",
        valor: 1500,
    },
];

const debitoPendenteFields: TableField<debitoPendenteRow>[] = [
    {
        id: "contrato",
        header: "Contrato",
        accessorKey: "contrato",
        width: "190px",
        cell: (value) => <strong>{String(value)}</strong>,
    },
    {
        id: "venda",
        header: "Venda",
        accessorKey: "venda",
        width: "130px",
        cell: (value) => String(value),
    },
    {
        id: "vencimento",
        header: "Vencimento",
        accessorKey: "vencimento",
        width: "190px",
        cell: (value) => String(value),
    },
    {
        id: "parcela",
        header: "Parcela",
        accessorKey: "parcela",
        width: "110px",
        cell: (value) => String(value || "--"),
    },
    {
        id: "tipoPagamento",
        header: "Tipo pagamento",
        accessorKey: "tipoPagamento",
        width: "105px",
        align: "right",
    },
    {
        id: "valor",
        header: "Valor (R$)",
        accessorKey: "valor",
        width: "105px",
        align: "right",
        cell: (value) => (
            <MoneyCell>{formatCurrencyBRL.format(Number(value))}</MoneyCell>
        ),
    },
];

export function DebitosPendentesPage() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const cliente = state?.cliente;
    const nomeCliente = cliente?.nome ?? `Cliente ${id}`;

    const printRef = useRef<HTMLDivElement>(null);

    const [dataInicio, setDataInicio] = useState(getFirstOfMonth());
    const [dataFim, setDataFim] = useState(getToday());

    const aplicarAtalho = (tipo: PeriodShortcut) => {
        const period = resolvePeriodShortcut(tipo);
        setDataInicio(period.dataInicio);
        setDataFim(period.dataFim);
    };

    const periodLabel = `${formatarDataBR(dataInicio, "")} a ${formatarDataBR(dataFim, "")}`;
    const totalUtilizado = debitoPendenteData
        .filter(
            (row) =>
                row.tipoPagamento === "DÉBITO" ||
                row.tipoPagamento === "CRÉDITO",
        )
        .reduce((acc, row) => acc + row.valor, 0);

    const cardsContaCorrente = [
        {
            label: "Total de Débitos Pendentes",
            value: formatCurrencyBRL.format(totalUtilizado),
            icon: <FiBarChart2 />,
        },
    ];

    return (
        <>
            <ClienteDetalhePageLayout
                clienteId={id}
                clienteNome={nomeCliente}
                title="Débitos Pendentes"
            >
                <PageWrap>

                <FiltroPeriodoFinanceiro
                    dataInicio={dataInicio}
                    dataFim={dataFim}
                    onDataInicioChange={setDataInicio}
                    onDataFimChange={setDataFim}
                    onAplicarAtalho={aplicarAtalho}
                />

                <PrintableSection ref={printRef}>
                    <FinanceiroSummaryCards items={cardsContaCorrente} />
                    <Table
                        title="Débitos Pendentes"
                        description={`Período selecionado: ${periodLabel}`}
                        data={debitoPendenteData}
                        fields={debitoPendenteFields}
                        emptyMessage="Nenhum lançamento encontrado para o período informado."
                    />
                </PrintableSection>
                </PageWrap>
            </ClienteDetalhePageLayout>

            <FloatingActions
                actions={["print"]}
                labels={{ print: "Imprimir relatório" }}
                printTargetRef={printRef}
                printConfig={{
                    title: `Débitos Pendentes Cliente — ${nomeCliente}`,
                    orientation: "landscape",
                }}
            />
        </>
    );
}
