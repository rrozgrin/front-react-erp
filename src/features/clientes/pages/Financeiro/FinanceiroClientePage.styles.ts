import styled from 'styled-components';
import { Input } from '../../../../common/components/Ui';

/* ── Cards de resumo ─────────────────────────────────────────────────────── */
export const SummaryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-sm);

    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 860px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const SummaryCard = styled.div`
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
    border-radius: 0.5rem;
    background: var(--theme-surface, #fff);
    padding: 14px var(--space-md);
    display: flex;
    align-items: center;
    gap: var(--space-sm);

    @media (max-width: 600px) {
        padding: var(--space-sm) 14px;
    }
`;

export const SummaryIconWrap = styled.div`
    width: 36px;
    height: 36px;
    border-radius: var(--radius-pill);
    background: var(--theme-surface-soft, rgba(15, 23, 42, 0.07));
    color: var(--color-main, var(--bs-primary));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;

    svg { font-size: var(--font-size-md); }
`;

export const SummaryInfo = styled.div`
    min-width: 0;

    span {
        display: block;
        font-size: var(--font-size-xs);
        color: #000;
        font-weigth: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    strong {
        display: block;
        font-size: var(--font-size-xs);
        font-weight: 500;
        color: #000;
        margin-top: 2px;
    }

    @media (max-width: 600px) {
        span {
            white-space: normal;
            line-height: 1.2;
        }

        strong {
            font-size: var(--font-size-md);
        }
    }
`;

/* ── Filtros ──────────────────────────────────────────────────────────────── */
export const FilterCard = styled.div`
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
    border-radius: 0.5rem;
    background: var(--theme-surface, #fff);
    padding: var(--space-md) 20px;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: var(--space-lg);

    @media (max-width: 900px) {
        align-items: stretch;
        gap: 14px;
        padding: 14px var(--space-md);
    }

    @media (max-width: 600px) {
        padding: 14px;
        gap: var(--space-sm);
    }
`;

export const FilterGroup = styled.div`
    display: grid;
    gap: 6px;
    flex: 1 1 320px;
    min-width: 0;

    label {
        font-size: var(--font-size-xs);
        font-weight: 500;
        color: #000;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }
`;

export const PeriodRow = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    flex-wrap: wrap;

    @media (max-width: 600px) {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-xs);
    }
`;

export const DateInput = styled(Input)`
    height: 34px;
    border-radius: var(--radius-md);
    padding: 0 10px;
    font-size: var(--font-size-sm);
    min-width: 0;
    max-width: 150px;
    width: 100%;

    @media (max-width: 600px) {
        max-width: none;
    }

    &:focus {
        box-shadow: 0 0 0 2px rgba(var(--bs-primary-rgb, 13, 110, 253), 0.15);
    }
`;

export const Separator = styled.span`
    font-size: var(--font-size-sm);
    color: #000;
    flex-shrink: 0;

    @media (max-width: 600px) {
        display: none;
    }
`;

export const ShortcutGroup = styled.div`
    display: grid;
    gap: 6px;
    flex: 1 1 320px;
    min-width: 0;

    label {
        font-size: var(--font-size-xs);
        font-weight: 500;
        color: #000;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }
`;

export const Shortcuts = styled.div`
    display: flex;
    gap: var(--space-xs);
    flex-wrap: wrap;

    @media (max-width: 600px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`;

/* ── Abas ─────────────────────────────────────────────────────────────────── */
export const TabBar = styled.div`
    display: flex;
    border-bottom: 1px solid var(--theme-border, rgba(15, 23, 42, 0.16));
    overflow-x: auto;

    @media (max-width: 600px) {
        border-bottom: none;
        gap: var(--space-xs);
    }
`;

export const Tab = styled.button<{ $active?: boolean }>`
    padding: 10px 20px;
    border: none;
    background: transparent;
    font-size: var(--font-size-md);
    font-weight: ${({ $active }) => ($active ? '500' : '400')};
    color: #000;
    border-bottom: 2px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'transparent')};
    margin-bottom: calc(1px * -1);
    cursor: pointer;
    transition: color 160ms ease, border-color 160ms ease;
    white-space: nowrap;

    @media (max-width: 600px) {
        flex: 1 1 0;
        padding: 10px var(--space-sm);
        border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.16));
        border-radius: 0.5rem;
        margin-bottom: 0;
        border-bottom-width: 1px;
        text-align: center;
    }

    &:hover { color: var(--color-main, var(--bs-primary)); }
`;

/* ── Tabela ───────────────────────────────────────────────────────────────── */
export const TableCard = styled.div`
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
    border-radius: 0.5rem;
    background: var(--theme-surface, #fff);
    overflow: hidden;
`;

export const TableCardHeader = styled.div`
    padding: 14px 18px var(--space-xs);
    border-bottom: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));

    h3 {
        margin: 0;
        font-size: var(--font-size-xs);
        font-weight: 500;
        color: #000;
    }

    p {
        margin: 2px 0 0;
        font-size: var(--font-size-xs);
        color: #000;
    }

    @media (max-width: 600px) {
        padding: var(--space-sm) 14px var(--space-xs);

        h3 {
            font-size: var(--font-size-md);
        }

        p {
            line-height: 1.3;
        }
    }
`;

export const TableScrollWrapper = styled.div`
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
`;

export const StyledTable = styled.table`
    width: 100%;
    min-width: 900px;
    border-collapse: collapse;
    font-size: var(--font-size-sm);

    @media (max-width: 900px) {
        min-width: 760px;
    }

    @media (max-width: 600px) {
        min-width: 640px;
        font-size: var(--font-size-xs);
    }
`;

export const Thead = styled.thead`
    background: var(--theme-surface-muted, rgba(15, 23, 42, 0.03));

    th {
        padding: 10px var(--space-sm);
        text-align: left;
        font-size: var(--font-size-xs);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #000;
        border-bottom: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
        white-space: nowrap;
    }
`;

export const Tbody = styled.tbody`
    tr {
        border-bottom: 1px solid var(--theme-border, rgba(15, 23, 42, 0.1));

        &:last-child { border-bottom: none; }
        &:hover { background: var(--theme-surface-soft, rgba(15, 23, 42, 0.03)); }
    }

    td {
        padding: 10px var(--space-sm);
        color: #000;
        vertical-align: middle;
        white-space: nowrap;
    }
`;

export const EmptyRow = styled.tr`
    td {
        padding: 48px var(--space-md) !important;
        text-align: center;
        color:#000;

        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-xs);
        }

        svg {
            font-size: 40px;
            opacity: 0.35;
            color: var(--theme-text-soft, #64748b);
        }

        strong {
            font-size: var(--font-size-xs);
            font-weight: 500;
            color: #000;
        }

        span { font-size: var(--font-size-sm); }
    }
`;

export const TableFooter = styled.tfoot`
    background: var(--theme-surface-soft, rgba(15, 23, 42, 0.05));
    border-top: 1px solid var(--theme-border, rgba(15, 23, 42, 0.2));

    td {
        padding: 10px var(--space-sm);
        font-size: var(--font-size-xs);
        font-weight: 500;
        color: #000;
        white-space: nowrap;
    }

    @media (max-width: 600px) {
        td {
            padding: var(--space-xs) 10px;
            font-size: var(--font-size-2xs);
        }
    }

    .highlight { color: #000; }
`;

export const TotalsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 860px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const TotalItem = styled.div`
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
    border-radius: 0.5rem;
    background: var(--theme-surface, #fff);
    padding: var(--space-sm) 14px;
    display: grid;
    gap: var(--space-2xs);

    span {
        font-size: var(--font-size-xs);
        font-weight: 500;
        letter-spacing: 0.04em;
        color: #000;
    }

    strong {
        font-size: var(--font-size-sm);
        color: #000;
    }
`;

/* ── Layout da página ────────────────────────────────────────────────────── */
export const PageWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-md) var(--space-xl);

    @media (max-width: 600px) {
        padding: var(--space-xs) 10px var(--space-80px);
        gap: var(--space-sm);
    }
`;

export const PageTop = styled.div`
    display: flex;
    align-items: flex-start;
    gap: var(--space-xs);
    flex-wrap: wrap;
`;
