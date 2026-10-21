import styled, { css } from 'styled-components';

export type UiStatusTone = 'neutral' | 'success' | 'danger' | 'warning' | 'info' | 'primary';

const statusToneStyles = {
    neutral: css`
        background: var(--theme-surface-muted, #f1f5f9);
        color: var(--theme-text-soft, #475569);
        border-color: var(--theme-border, #dbe1ea);
    `,
    success: css`
        background: rgba(22, 163, 74, 0.12);
        color: var(--status-success, #16a34a);
        border-color: rgba(22, 163, 74, 0.24);
    `,
    danger: css`
        background: rgba(220, 38, 38, 0.1);
        color: var(--status-danger, #dc2626);
        border-color: rgba(220, 38, 38, 0.22);
    `,
    warning: css`
        background: rgba(245, 158, 11, 0.14);
        color: #b45309;
        border-color: rgba(245, 158, 11, 0.28);
    `,
    info: css`
        background: rgba(59, 130, 246, 0.12);
        color: var(--color-info, #2563eb);
        border-color: rgba(59, 130, 246, 0.24);
    `,
    primary: css`
        background: rgba(var(--bs-primary-rgb, 30, 94, 149), 0.12);
        color: var(--color-main, var(--bs-primary));
        border-color: rgba(var(--bs-primary-rgb, 30, 94, 149), 0.24);
    `,
};

const controlStyles = css`
    width: 100%;
    min-height: var(--control-height-sm);
    border: 1px solid var(--theme-border, #cbd5e1);
    border-radius: 0.125rem;
    background: var(--theme-surface, #ffffff);
    color: var(--theme-text, #0f172a);
    font-size: var(--font-size-sm);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    &:focus {
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: var(--shadow-focus, 0 0 0 3px rgba(var(--bs-primary-rgb, 30, 94, 149), 0.12));
    }

    &:disabled {
        background: var(--theme-surface-muted, #f1f5f9);
        color: var(--theme-text-soft, #94a3b8);
        cursor: not-allowed;
    }
`;

export const Panel = styled.section<{ $compact?: boolean }>`
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: 0.5rem;
    background: var(--theme-surface, #ffffff);
    box-shadow: var(--shadow-panel);
    padding: ${({ $compact }) => ($compact ? 'var(--space-md)' : 'var(--space-lg)')};
`;

export const FormGrid = styled.div<{ $columns?: number }>`
    display: grid;
    grid-template-columns: repeat(${({ $columns = 1 }) => $columns}, minmax(0, 1fr));
    gap: var(--space-md);

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

export const FormField = styled.label<{ $span?: number }>`
    display: grid;
    gap: var(--space-xs);
    grid-column: span ${({ $span = 1 }) => $span};
    color: var(--theme-text-soft, #475569);
    font-size: var(--font-size-xs);
    font-weight: 500;

    small {
        color: var(--theme-text-soft, #64748b);
        font-size: var(--font-size-xs);
        font-weight: 500;
    }
`;

export const Input = styled.input`
    ${controlStyles}
    padding: 0 var(--space-sm);
`;

export const Select = styled.select`
    ${controlStyles}
    padding: 0 var(--space-sm);
`;

export const Textarea = styled.textarea`
    ${controlStyles}
    min-height: 6rem; /* 96px */
    padding: var(--space-sm);
    resize: vertical;
`;

const choiceControlStyles = css`
    width: 1rem;
    height: 1rem;
    min-width: 1rem;
    min-height: 1rem;
    margin: 0;
    accent-color: var(--color-main, var(--bs-primary));
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    ${choiceControlStyles}
`;

export const Radio = styled.input.attrs({ type: 'radio' })`
    ${choiceControlStyles}
`;

export const ActionsRow = styled.div<{ $align?: 'start' | 'center' | 'end' | 'between' }>`
    display: flex;
    align-items: center;
    justify-content: ${({ $align = 'end' }) => {
        if ($align === 'start') {
            return 'flex-start';
        }

        if ($align === 'center') {
            return 'center';
        }

        if ($align === 'between') {
            return 'space-between';
        }

        return 'flex-end';
    }};
    gap: var(--space-sm);
    flex-wrap: wrap;
`;

export const StatusPill = styled.span<{ $tone?: UiStatusTone }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2xs);
    min-height: 1.75rem; /* 28px */
    padding: var(--space-2xs) var(--space-sm);
    border: 1px solid;
    border-radius: var(--radius-pill);
    font-size: var(--font-size-xs);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;

    ${({ $tone = 'neutral' }) => statusToneStyles[$tone]}
`;

export const FormFeedback = styled.p<{ $tone?: UiStatusTone }>`
    margin: 0;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-sm);
    border: 1px solid;
    border-radius: 0.1875rem;
    font-size: var(--font-size-sm);
    font-weight: 500;

    ${({ $tone = 'danger' }) => statusToneStyles[$tone]}
`;

export const Pagination = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-xs);
    flex-wrap: wrap;
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-sm);
`;

export const PaginationButton = styled.button<{ $active?: boolean }>`
    min-width: 2.25rem; /* 36px */
    min-height: 2.25rem; /* 36px */
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-border, #dbe1ea)')};
    border-radius: 0.125rem;
    background: ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-surface, #ffffff)')};
    color: ${({ $active }) => ($active ? 'var(--color-font, #ffffff)' : 'var(--theme-text-soft, #475569)')};
    font-size: var(--font-size-sm);
    font-weight: 500;
    cursor: pointer;

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }
`;
