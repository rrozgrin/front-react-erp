import styled, { css } from 'styled-components';
import { Panel } from '../../../common/components/Ui';
import { food99FilterSurface } from './filterControls';

export const food99TableSurface = css`
    ${food99FilterSurface}
`;

export const food99TableStyles = css<{ $minWidth?: string; $clickableRows?: boolean }>`
    width: 100%;
    min-width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    border: 1px solid rgba(226, 232, 240, 0.95);
    border-radius: var(--space-2xs);

    th,
    td {
        padding: var(--space-2xs) 14px;
        text-align: left;
        border-bottom: 1px solid rgba(226, 232, 240, 0.9);
        white-space: nowrap;
    }

    th {
        color: #475569;
        font-size: 0.94rem;
        font-weight: 600;
        background: #ffffff;
    }

    td {
        color: #111827;
        background: rgba(255, 255, 255, 0.92);
    }

    tbody tr {
        cursor: ${({ $clickableRows }) => ($clickableRows ? 'pointer' : 'default')};
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    @media (max-width: 1440px) {
        ${({ $minWidth }) => ($minWidth ? `min-width: ${$minWidth};` : '')}
    }
`;

export const Food99TableCard = styled(Panel)`
    ${food99TableSurface}
    margin-top: 20px;
    overflow: hidden;

    > p {
        margin: 0 0 var(--space-md);
        color: #475569;
    }
`;

export const Food99TableElement = styled.table<{
    $clickableRows?: boolean;
    $minWidth?: string;
}>`
    ${food99TableStyles}
`;

export const Food99TableScroll = styled.div`
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
`;

export const food99StatusPillBase = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 104px;
    padding: 7px var(--space-sm);
    border-radius: var(--radius-pill);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const Food99TableActions = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: #334155;
`;

export const food99IconButtonStyles = css`
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(226, 232, 240, 0.95);
    border-radius: var(--radius-xl);
    background: #ffffff;
    color: #334155;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.58;
    }
`;

export const Food99IconButton = styled.button`
    ${food99IconButtonStyles}
`;

export const Food99RowActionButton = styled.button`
    ${food99IconButtonStyles}
    width: auto;
    padding: 0 var(--space-sm);
    gap: var(--space-xs);
    border-radius: var(--radius-md);
    font: inherit;
    font-weight: 500;

    span {
        line-height: 1;
    }
`;

export const Food99PaginationRow = styled.div`
    margin-top: var(--space-sm);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);

    > span {
        color: #475569;
    }

    > div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

export const Food99PaginationButton = styled.button`
    width: 40px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid rgba(226, 232, 240, 0.95);
    background: #ffffff;
    color: #64748b;
`;

export const Food99PaginationCurrent = styled.span`
    min-width: 40px;
    height: 36px;
    padding: 0 var(--space-sm);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #ffb800;
    color: #111827;
    font-weight: 500;
`;
