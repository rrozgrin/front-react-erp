import styled from 'styled-components';
import { normalizarTexto } from '../Templates/listagemUtils';
import { Input, Select } from '../Ui';
import { formatarDataBR, formatarDataHoraBR } from '../../../types/Data';

export const FiltersPanel = styled.section`
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.08));
    border-radius: 0.1875rem;
    background:
        radial-gradient(circle at top left, var(--theme-surface-soft, rgba(59, 130, 246, 0.12)), transparent 28%),
        linear-gradient(180deg, var(--theme-surface, #ffffff) 0%, var(--theme-surface-muted, #f8fbff) 100%);
    box-shadow: 0 18px 45px rgba(var(--bs-primary-rgb), 0.08);
    padding: var(--space-lg);
    display: grid;
    gap: 18px;

    @media (max-width: 767px) {
        padding: var(--space-md);
        gap: 14px;
    }
`;

export const FiltersHeader = styled.div`
    display: grid;
    gap: 6px;

    h3 {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 500;
        color: var(--theme-text, #0f172a);
    }

    p {
        margin: 0;
        color: var(--theme-text-soft, #475569);
        font-size: 0.95rem;
    }
`;

export const FiltersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--space-md);

    @media (max-width: 991px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        gap: var(--space-sm);
    }
`;

export const Field = styled.label<{ $span?: number }>`
    grid-column: span ${({ $span = 3 }) => $span};
    display: grid;
    gap: var(--space-xs);
    min-width: 0;

    span {
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--theme-text-soft, #334155);
    }

    @media (max-width: 991px) {
        grid-column: span 1;
    }
`;

const controlStyles = `
    width: 100%;
    min-height: var(--control-height-sm);
    border: 1px solid rgba(148, 163, 184, 0.35);
    border-radius: 0.125rem;
    background: rgba(255, 255, 255, 0.96);
    color: var(--theme-text, #0f172a);
    padding: 10px var(--space-sm);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: 0 0 0 3px rgba(var(--bs-primary-rgb), 0.12);
    }
`;

export const TextInput = styled(Input)`
    ${controlStyles}
`;

export const SelectField = styled(Select)`
    ${controlStyles}
`;

export const ActionsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    align-items: center;
    justify-content: space-between;

    @media (max-width: 767px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const SummaryText = styled.p`
    margin: 0;
    color: var(--theme-text-soft, #475569);
    font-size: 0.92rem;
`;

export const normalizeText = normalizarTexto;

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

export function formatDate(value: string) {
    return formatarDataBR(value);
}

export function formatDateTime(value: string) {
    return formatarDataHoraBR(value);
}
