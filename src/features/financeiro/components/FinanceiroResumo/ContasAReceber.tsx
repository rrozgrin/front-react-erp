import {
    FiAlertCircle,
    FiArrowDownCircle,
    FiBarChart2,
    FiCreditCard,
    FiDollarSign,
} from 'react-icons/fi';
import { Table } from '@/common/components/Table';
import { FinanceiroSummaryCards } from './SummaryCards';
import { camposFinanceiro, dadosFinanceiro, FinanceiroRow } from './types';
import {
    TotalItem,
    TotalsGrid,
} from './styled';

type Props = {
    periodLabel: string;
    data?: FinanceiroRow[];
    reportTitle?: string;
};

const moedaBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const ZERO = moedaBRL.format(0);

const summaryItems = [
    { label: 'Total origem de vendas', value: ZERO, icon: <FiBarChart2 /> },
    { label: 'Total cadastrado avulso', value: ZERO, icon: <FiDollarSign /> },
    { label: 'Total a receber', value: ZERO, icon: <FiArrowDownCircle /> },
    { label: 'Juros/Mora', value: ZERO, icon: <FiAlertCircle /> },
    { label: 'Saldo total', value: ZERO, icon: <FiCreditCard /> },
];

export const ContasAReceber = ({ periodLabel, data = dadosFinanceiro, reportTitle = 'Relatório Contas a Receber' }: Props) => {
    return (
        <>
            <FinanceiroSummaryCards items={summaryItems} />

            <Table
                title={reportTitle}
                description={`Período selecionado: ${periodLabel}`}
                data={data}
                fields={camposFinanceiro}
                emptyMessage="Nenhum registro encontrado. Tente ajustar os filtros ou o período selecionado."
            />

            <TotalsGrid>
                <TotalItem>
                    <span>Total origem vendas</span>
                    <strong>{ZERO}</strong>
                </TotalItem>
                <TotalItem>
                    <span>Total avulso</span>
                    <strong>{ZERO}</strong>
                </TotalItem>
                <TotalItem>
                    <span>Total a receber</span>
                    <strong>{ZERO}</strong>
                </TotalItem>
                <TotalItem>
                    <span>Juros/Mora</span>
                    <strong>{ZERO}</strong>
                </TotalItem>
                <TotalItem>
                    <span>Saldo</span>
                    <strong>{ZERO}</strong>
                </TotalItem>
            </TotalsGrid>
        </>
    );
};
