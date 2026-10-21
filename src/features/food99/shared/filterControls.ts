import styled, { css } from 'styled-components';
import { AppButtonBase } from '../../../common/components/Buttons/buttonBase';
import { Input, Panel, Select } from '../../../common/components/Ui';

export type Food99ActionButtonVariant = 'primary' | 'secondary';

export const food99FilterSurface = css`
    padding: var(--space-md) 26px;
    border-radius: var(--space-2xs);
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(226, 232, 240, 0.9);
    box-shadow: 0 22px 46px rgba(148, 163, 184, 0.12);
`;

export const food99ControlStyles = css`
    height: 40px;
    min-width: 0;
    padding: 0 var(--space-md);
    border-radius: var(--space-2xs);
    border: 1px solid rgba(226, 232, 240, 0.95);
    background: #ffffff;
    color: #111827;
    font: inherit;
`;

export const Food99FilterCard = styled(Panel)`
    ${food99FilterSurface}
    overflow: hidden;
`;

export const Food99SurfaceCard = styled.section`
    ${food99FilterSurface}

    h2,
    h3,
    p {
        margin: 0;
        color: #000;
    }
`;

export const Food99FilterGrid = styled.div<{
    $alignLast?: boolean;
    $columns?: string;
    $tabletColumns?: string;
}>`
    display: grid;
    grid-template-columns: ${({ $columns }) => $columns ?? 'repeat(2, minmax(0, 1fr))'};
    gap: var(--space-xs);
    align-items: end;

    > * {
        min-width: 0;
    }

    > *:last-child {
        justify-self: ${({ $alignLast }) => ($alignLast ? 'end' : 'stretch')};
    }

    span {
        display: block;
        margin-bottom: var(--space-xs);
        color: #475569;
        font-size: 0.95rem;
        font-weight: 600;
    }

    @media (max-width: 1440px) {
        grid-template-columns: ${({ $tabletColumns }) => $tabletColumns ?? 'repeat(2, minmax(0, 1fr))'};

        > *:last-child {
            grid-column: ${({ $alignLast }) => ($alignLast ? '1 / -1' : 'auto')};
            justify-self: ${({ $alignLast }) => ($alignLast ? 'end' : 'stretch')};
        }
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;

        > *:last-child {
            grid-column: auto;
            justify-self: stretch;
        }
    }
`;

export const Food99FilterLabel = styled.label`
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    min-width: 0;
    color: #475569;
    font-size: var(--font-size-xs);
    font-weight: 500;

    select{
        font-weight: 100;
    }

    span {
        color: inherit;
        font-size: inherit;
        font-weight: inherit;
        margin-bottom: 0;
    }
`;

export const Food99FilterSelect = styled(Select)`
    ${food99ControlStyles}
    width: 100%;
`;

export const Food99SearchInputWrapper = styled.label`
    ${food99ControlStyles}
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 0 18px;
    color: #64748b;
`;

export const Food99SearchInput = styled(Input)`
    width: 100%;
    border: none;
    min-height: 0;
    outline: none;
    background: transparent;
    color: #111827;
    font: inherit;
`;

export const Food99DateField = styled.div`
    ${food99ControlStyles}
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    color: #475569;

    input {
        width: 100%;
        border: none;
        outline: none;
        background: transparent;
        color: #111827;
        font: inherit;
    }
`;

export const Food99FormInput = styled(Input)`
    ${food99ControlStyles}
    width: 100%;

    &:disabled {
        background: #f8fafc;
        color: #64748b;
    }
`;

export const Food99InlineMessage = styled.div<{ $tone: 'error' | 'success' }>`
    margin-top: 20px;
    padding: 14px var(--space-md);
    border-radius: var(--space-2xs);
    border: 1px solid ${({ $tone }) => ($tone === 'success' ? 'rgba(34, 197, 94, 0.28)' : 'rgba(239, 68, 68, 0.28)')};
    background: ${({ $tone }) => ($tone === 'success' ? 'rgba(240, 253, 244, 0.96)' : 'rgba(254, 242, 242, 0.96)')};
    color: ${({ $tone }) => ($tone === 'success' ? '#15803d' : '#b91c1c')};
    font-weight: 500;
`;

export const Food99ActionButton = styled(AppButtonBase).attrs<{
    $variant?: Food99ActionButtonVariant;
}>(({ $variant }) => ({
    $size: 'modal',
    $variant: $variant === 'secondary' ? 'secondary' : 'primary',
})) <{ $variant?: Food99ActionButtonVariant }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 40px;
    padding: 7px 16px;
    border-radius: 0.125rem;
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.58;
    }
`;
