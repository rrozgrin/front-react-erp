import styled from 'styled-components';

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

    svg {
        font-size: var(--font-size-sm);
    }
`;

export const SummaryInfo = styled.div`
    min-width: 0;

    span {
        display: block;
        font-size: var(--font-size-xs);
        font-weight: 500;
        color: #000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    strong {
        display: block;
        font-size: var(--font-size-sm);
        font-weight: 400;
        color: #000;
        margin-top: 2px;
    }

    @media (max-width: 600px) {
        span {
            white-space: normal;
            line-height: 1.2;
        }

        strong {
            font-size: var(--font-size-sm);
        }
    }
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
        font-weight: 400;
        color: #000;
    }
`;
