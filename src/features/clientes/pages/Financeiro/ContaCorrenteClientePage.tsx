import { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
    FiBarChart2,
    FiCreditCard,
    FiDollarSign,
    FiPlusCircle,
} from "react-icons/fi";
import { Botao } from "../../../../common/components/Buttons/Botao";
import { FloatingActions } from "../../../../common/components/Buttons/FloatingActions";
import { Table, TableField } from "../../../../common/components/Table";
import { FinanceiroSummaryCards } from '@/features/financeiro';
import { Cliente } from "../../types/Cliente";
import { formatarDataBR } from "../../../../types/Data";
import { AlterarLimiteCreditoModal } from "./AlterarLimiteCreditoModal";
import { FiltroPeriodoFinanceiro } from "./FiltroPeriodoFinanceiro";
import { PageWrap } from "./FinanceiroClientePage.styles";
import { ClienteDetalhePageLayout } from "../shared/ClienteDetalhePageLayout";
import {
    ActionsRow,
    DescriptionMuted,
    DescriptionStack,
    FinancialTypeBadge,
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

interface ContaCorrenteRow {
    centroCusto: string;
    contaContabil: string;
    subCentroCusto: string;
    historico: string;
    tipo: "DÉBITO" | "CRÉDITO" | "";
    descricaoCompleta: string;
    mes: string;
    valor: number;
    saldo: number;
}

const LIMITE_CREDITO = 10000;

const contaCorrenteData: ContaCorrenteRow[] = [
    {
        centroCusto: "ADM - ADMINISTRATIVO",
        contaContabil: "1.1.1.01.0001",
        subCentroCusto: "ADM - GERAL",
        historico: "",
        tipo: "DÉBITO",
        descricaoCompleta:
            "Pagamento de Fornecedor\nNF 12345 - Material de Escritório",
        mes: "mai/2024",
        valor: 2500,
        saldo: -250,
    },
    {
        centroCusto: "FIN - FINANCEIRO",
        contaContabil: "2.1.1.01.0002",
        subCentroCusto: "FIN - TESOURARIA",
        historico: "",
        tipo: "CRÉDITO",
        descricaoCompleta:
            "Recebimento de Cliente\nNF 54321 - Serviços Prestados",
        mes: "mai/2024",
        valor: 5750,
        saldo: 4500,
    },
    {
        centroCusto: "COM - COMERCIAL",
        contaContabil: "3.1.1.02.0003",
        subCentroCusto: "COM - VENDAS",
        historico: "",
        tipo: "DÉBITO",
        descricaoCompleta: "Despesas com Marketing\nCampanha Maio/2024",
        mes: "mai/2024",
        valor: 1500,
        saldo: 3000,
    },
];

const contaCorrenteFields: TableField<ContaCorrenteRow>[] = [
    {
        id: "centroCusto",
        header: "Centro de Custo",
        accessorKey: "centroCusto",
        width: "190px",
        cell: (value) => <strong>{String(value)}</strong>,
    },
    {
        id: "contaContabil",
        header: "Conta Contábil",
        accessorKey: "contaContabil",
        width: "130px",
        cell: (value) => String(value),
    },
    {
        id: "subCentroCusto",
        header: "Sub Centro de Custo",
        accessorKey: "subCentroCusto",
        width: "190px",
        cell: (value) => String(value),
    },
    {
        id: "historico",
        header: "Histórico",
        accessorKey: "historico",
        width: "110px",
        cell: (value) => String(value || "--"),
    },
    {
        id: "tipo",
        header: "Tipo",
        accessorKey: "tipo",
        width: "95px",
        align: "center",
        cell: (value) => {
            if (!value) return "";

            const isDebito = value === "DÉBITO";

            return (
                <FinancialTypeBadge $tone={isDebito ? "success" : "info"}>
                    {String(value)}
                </FinancialTypeBadge>
            );
        },
    },
    {
        id: "descricaoCompleta",
        header: "Descrição Completa",
        accessorKey: "descricaoCompleta",
        width: "260px",
        cell: (value) => {
            const text = String(value);
            const [line1, line2] = text.split("\n");

            return (
                <DescriptionStack>
                    <div>{line1}</div>
                    {line2 ? (
                        <DescriptionMuted>{line2}</DescriptionMuted>
                    ) : null}
                </DescriptionStack>
            );
        },
    },
    {
        id: "mes",
        header: "Mês",
        accessorKey: "mes",
        width: "90px",
        cell: (value) => String(value),
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
    {
        id: "saldo",
        header: "Saldo (R$)",
        accessorKey: "saldo",
        width: "105px",
        align: "right",
        cell: (value) => {
            const saldo = Number(value);
            return (
                <MoneyCell $tone={saldo < 0 ? "negative" : "positive"}>
                    {formatCurrencyBRL.format(saldo)}
                </MoneyCell>
            );
        },
    },
];

export function ContaCorrenteClientePage() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const cliente = state?.cliente;
    const nomeCliente = cliente?.nome ?? `Cliente ${id}`;

    const printRef = useRef<HTMLDivElement>(null);

    const [showLimiteModal, setShowLimiteModal] = useState(false);
    const [limiteCredito, setLimiteCredito] = useState(LIMITE_CREDITO);
    const [dataInicio, setDataInicio] = useState(getFirstOfMonth());
    const [dataFim, setDataFim] = useState(getToday());

    const aplicarAtalho = (tipo: PeriodShortcut) => {
        const period = resolvePeriodShortcut(tipo);
        setDataInicio(period.dataInicio);
        setDataFim(period.dataFim);
    };

    const periodLabel = `${formatarDataBR(dataInicio, "")} a ${formatarDataBR(dataFim, "")}`;
    const totalUtilizado = contaCorrenteData
        .filter((row) => row.tipo === "DÉBITO")
        .reduce((acc, row) => acc + row.valor, 0);
    const saldoAtual =
        contaCorrenteData.length > 0
            ? contaCorrenteData[contaCorrenteData.length - 1].saldo
            : 0;
    const limiteDisponivel = limiteCredito - totalUtilizado;
    const saldoMaisLimite = saldoAtual + limiteCredito;

    const cardsContaCorrente = [
        {
            label: "Total Utilizado",
            value: formatCurrencyBRL.format(totalUtilizado),
            icon: <FiBarChart2 />,
        },
        {
            label: "Limite",
            value: formatCurrencyBRL.format(limiteCredito),
            icon: <FiDollarSign />,
        },
        {
            label: "Limite Disponivel",
            value: formatCurrencyBRL.format(limiteDisponivel),
            icon: <FiCreditCard />,
        },
        {
            label: "Saldo Atual + Limite",
            value: formatCurrencyBRL.format(saldoMaisLimite),
            icon: <FiPlusCircle />,
        },
    ];

    const handleSaveLimite = (nextLimite: number) => {
        setLimiteCredito(nextLimite);
        setShowLimiteModal(false);
    };

    return (
        <>
            <ClienteDetalhePageLayout
                clienteId={id}
                clienteNome={nomeCliente}
                title="Conta Corrente Cliente"
            >
                <PageWrap>

                <FiltroPeriodoFinanceiro
                    dataInicio={dataInicio}
                    dataFim={dataFim}
                    onDataInicioChange={setDataInicio}
                    onDataFimChange={setDataFim}
                    onAplicarAtalho={aplicarAtalho}
                />

                <ActionsRow>
                    <Botao
                        nome="Alterar Limite de Credito"
                        icone={<FiCreditCard size={16} />}
                        action={() => setShowLimiteModal(true)}
                    />
                </ActionsRow>

                <PrintableSection ref={printRef}>
                    <FinanceiroSummaryCards items={cardsContaCorrente} />
                    <Table
                        title="Conta Corrente Cliente"
                        description={`Período selecionado: ${periodLabel}`}
                        data={contaCorrenteData}
                        fields={contaCorrenteFields}
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
                    title: `Conta Corrente Cliente — ${nomeCliente}`,
                    orientation: "landscape",
                }}
            />

            <AlterarLimiteCreditoModal
                open={showLimiteModal}
                initialValue={limiteCredito}
                onClose={() => setShowLimiteModal(false)}
                onSave={handleSaveLimite}
            />
        </>
    );
}
