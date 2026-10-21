import { useMemo, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import styled from 'styled-components';
import { Botao } from '@/common/components/Buttons/Botao';
import { PageLayout, type PageLayoutMenuSection } from '@/common/components/PageLayout';
import { ContasAReceber, ContasRecebidas } from '@/features/financeiro';
import { formatarDataBR } from '@/types/Data';

export type RelatorioFinanceiroTipo = 'pagar' | 'pagas' | 'receber' | 'recebidas';

type RelatorioFinanceiroConfig = {
    caminho: string;
    titulo: string;
    usarContasRecebidas: boolean;
};

const relatorios: Record<RelatorioFinanceiroTipo, RelatorioFinanceiroConfig> = {
    receber: { caminho: '/relatoriosfinanceiros/contas-receber', titulo: 'Contas a Receber', usarContasRecebidas: false },
    recebidas: { caminho: '/relatoriosfinanceiros/contas-recebidas', titulo: 'Contas Recebidas', usarContasRecebidas: true },
    pagar: { caminho: '/relatoriosfinanceiros/contas-pagar', titulo: 'Contas a Pagar', usarContasRecebidas: false },
    pagas: { caminho: '/relatoriosfinanceiros/contas-pagas', titulo: 'Contas Pagas', usarContasRecebidas: true },
};

const secoes: PageLayoutMenuSection[] = [{
    titulo: 'Relatórios Financeiros',
    paginas: (Object.entries(relatorios) as [RelatorioFinanceiroTipo, RelatorioFinanceiroConfig][]).map(([, relatorio]) => ({
        titulo: relatorio.titulo,
        href: relatorio.caminho,
    })),
}];

const hoje = () => new Date().toISOString().slice(0, 10);
const inicioDoMes = () => `${hoje().slice(0, 8)}01`;

const Filtros = styled.section`
    display: flex;
    justify-content: space-between;
    gap: var(--space-md);
    flex-wrap: wrap;
    padding: var(--space-md);
    border: 1px solid var(--theme-border, #d8e2ef);
    background: var(--theme-surface, #fff);
`;

const Grupo = styled.div`
    display: flex;
    align-items: end;
    gap: var(--space-xs);
    flex-wrap: wrap;

    label {
        display: grid;
        gap: var(--space-2xs);
        color: var(--theme-text, #0f172a);
        font-size: var(--font-size-xs);
        font-weight: 600;
    }

    input {
        min-height: 36px;
        padding: 0 var(--space-xs);
        border: 1px solid var(--theme-border, #cbd5e1);
    }
`;

type Props = { tipo: RelatorioFinanceiroTipo };

export const RelatoriosFinanceirosPage = ({ tipo }: Props) => {
    const config = relatorios[tipo];
    const [dataInicio, setDataInicio] = useState(inicioDoMes);
    const [dataFim, setDataFim] = useState(hoje);
    const periodo = useMemo(
        () => `${formatarDataBR(dataInicio, '')} a ${formatarDataBR(dataFim, '')}`,
        [dataFim, dataInicio],
    );
    const aplicarPeriodo = (dias?: number) => {
        const fim = hoje();
        if (dias === undefined) {
            setDataInicio(inicioDoMes());
            setDataFim(fim);
            return;
        }
        const inicio = new Date();
        inicio.setDate(inicio.getDate() - dias);
        setDataInicio(inicio.toISOString().slice(0, 10));
        setDataFim(fim);
    };

    return (
        <PageLayout title={config.titulo} sections={secoes}>
            <Filtros>
                <Grupo>
                    <label>Período<input type="date" value={dataInicio} onChange={(event) => setDataInicio(event.target.value)} /></label>
                    <label>Até<input type="date" value={dataFim} onChange={(event) => setDataFim(event.target.value)} /></label>
                    <Botao nome="Aplicar" action={() => undefined} />
                </Grupo>
                <Grupo>
                    <Botao nome="Hoje" icone={<FiCalendar />} action={() => aplicarPeriodo(0)} />
                    <Botao nome="7 dias" icone={<FiCalendar />} action={() => aplicarPeriodo(7)} />
                    <Botao nome="30 dias" icone={<FiCalendar />} action={() => aplicarPeriodo(30)} />
                    <Botao nome="Este mês" icone={<FiCalendar />} action={() => aplicarPeriodo()} />
                </Grupo>
            </Filtros>
            {config.usarContasRecebidas
                ? <ContasRecebidas periodLabel={periodo} reportTitle={`Relatório ${config.titulo}`} />
                : <ContasAReceber periodLabel={periodo} reportTitle={`Relatório ${config.titulo}`} />}
        </PageLayout>
    );
};
