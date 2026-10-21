import styled from 'styled-components';
import { ActionsRow as UiActionsRow, StatusPill } from '../../../../../common/components/Ui';

export type PeriodShortcut = 'hoje' | '7dias' | '30dias' | 'mes';

export const formatCurrencyBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const getToday = () => new Date().toISOString().slice(0, 10);

export const addDays = (baseDate: string, days: number) => {
    const date = new Date(`${baseDate}T00:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
};

export const getFirstOfMonth = () => {
    const date = new Date();
    date.setDate(1);
    return date.toISOString().slice(0, 10);
};

export const resolvePeriodShortcut = (shortcut: PeriodShortcut) => {
    const hoje = getToday();

    if (shortcut === 'hoje') {
        return { dataInicio: hoje, dataFim: hoje };
    }

    if (shortcut === '7dias') {
        return { dataInicio: addDays(hoje, -7), dataFim: hoje };
    }

    if (shortcut === '30dias') {
        return { dataInicio: addDays(hoje, -30), dataFim: hoje };
    }

    return { dataInicio: getFirstOfMonth(), dataFim: hoje };
};

export const ActionsRow = styled(UiActionsRow)``;

export const PrintableSection = styled.div`
    display: grid;
    gap: var(--space-lg);
`;

export const MoneyCell = styled.span<{ $tone?: 'positive' | 'negative' | 'info' }>`
    color: ${({ $tone }) => {
        if ($tone === 'negative') {
            return 'var(--status-danger, #dc2626)';
        }

        if ($tone === 'info') {
            return 'var(--color-info, #2563eb)';
        }

        return 'var(--status-success, #16a34a)';
    }};
    font-weight: 500;
`;

export const FinancialTypeBadge = styled(StatusPill) <{ $tone?: 'success' | 'danger' | 'info' }>`
    min-width: 4.25rem; /* 68px */
    font-size: var(--font-size-2xs);
`;

export const DescriptionStack = styled.div`
    display: grid;
    gap: var(--space-2xs);
`;

export const DescriptionMuted = styled.div`
    color: var(--theme-text-soft, #334155);
`;
