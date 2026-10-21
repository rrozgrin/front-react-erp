import { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FloatingActions } from "../../../../common/components/Buttons/FloatingActions";
import {
    ContasAReceber,
    ContasRecebidas,
} from '@/features/financeiro';
import { Cliente } from "../../types/Cliente";
import { formatarDataBR } from "../../../../types/Data";
import { FiltroPeriodoFinanceiro } from "./FiltroPeriodoFinanceiro";
import { PageWrap, TabBar, Tab } from "./FinanceiroClientePage.styles";
import { ClienteDetalhePageLayout } from "../shared/ClienteDetalhePageLayout";

type Aba = "recebidas" | "areceber";

interface LocationState {
    cliente?: Cliente;
}

const getToday = () => new Date().toISOString().slice(0, 10);

const addDays = (baseDate: string, days: number) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
};

const getFirstOfMonth = () => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().slice(0, 10);
};

export function FinanceiroClientePage() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const cliente = state?.cliente;
    const nomeCliente = cliente?.nome ?? `Cliente ${id}`;

    const printRef = useRef<HTMLDivElement>(null);

    const [aba, setAba] = useState<Aba>("recebidas");
    const [dataInicio, setDataInicio] = useState(getFirstOfMonth());
    const [dataFim, setDataFim] = useState(getToday());

    const aplicarAtalho = (tipo: "hoje" | "7dias" | "30dias" | "mes") => {
        const hoje = getToday();
        if (tipo === "hoje") {
            setDataInicio(hoje);
            setDataFim(hoje);
        } else if (tipo === "7dias") {
            setDataInicio(addDays(hoje, -7));
            setDataFim(hoje);
        } else if (tipo === "30dias") {
            setDataInicio(addDays(hoje, -30));
            setDataFim(hoje);
        } else {
            setDataInicio(getFirstOfMonth());
            setDataFim(hoje);
        }
    };

    const periodLabel = `${formatarDataBR(dataInicio, "")} a ${formatarDataBR(dataFim, "")}`;

    return (
        <>
            <ClienteDetalhePageLayout
                clienteId={id}
                clienteNome={nomeCliente}
                title="Financeiro do Cliente"
            >
                <PageWrap ref={printRef}>

                <FiltroPeriodoFinanceiro
                    dataInicio={dataInicio}
                    dataFim={dataFim}
                    onDataInicioChange={setDataInicio}
                    onDataFimChange={setDataFim}
                    onAplicarAtalho={aplicarAtalho}
                />

                <TabBar>
                    <Tab
                        $active={aba === "recebidas"}
                        onClick={() => setAba("recebidas")}
                    >
                        Contas Recebidas
                    </Tab>
                    <Tab
                        $active={aba === "areceber"}
                        onClick={() => setAba("areceber")}
                    >
                        Contas a Receber
                    </Tab>
                </TabBar>

                {aba === "recebidas" ? (
                    <ContasRecebidas periodLabel={periodLabel} />
                ) : (
                    <ContasAReceber periodLabel={periodLabel} />
                )}
                </PageWrap>
            </ClienteDetalhePageLayout>

            <FloatingActions
                actions={["print"]}
                labels={{ print: "Imprimir relatório" }}
                printTargetRef={printRef}
                printConfig={{
                    title: `Relatório Financeiro — ${nomeCliente}`,
                    orientation: "landscape",
                }}
            />
        </>
    );
}
