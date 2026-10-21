import styled, { css } from 'styled-components';
import { Panel } from '../../../../../common/components/Ui';
import {
    Food99ActionButton,
    Food99FilterCard,
    Food99FilterGrid,
    Food99FilterLabel,
    Food99FilterSelect,
    Food99FormInput,
    Food99InlineMessage,
    Food99SearchInput,
    Food99SearchInputWrapper,
    food99FilterSurface,
} from '../../../shared/filterControls';
import {
    Food99PaginationButton,
    Food99PaginationCurrent,
    Food99PaginationRow,
    Food99RowActionButton,
    Food99TableActions,
    Food99TableCard,
    Food99TableElement,
    Food99TableScroll,
    food99StatusPillBase,
} from '../../../shared/tableControls';

const surface = css`
    ${food99FilterSurface}
`;

export const TopActionRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;

    @media (max-width: 1440px) {
        flex-direction: column;
        align-items: stretch;
    }

    > div:last-child {
        display: flex;
        gap: var(--space-sm);
        flex-wrap: wrap;

        @media (max-width: 1440px) {
            width: 100%;
            justify-content: flex-end;
        }

        @media (max-width: 768px) {
            justify-content: stretch;

            > button {
                width: 100%;
            }
        }
    }
`;

export const ActionButton = Food99ActionButton;

export const FilterCard = Food99FilterCard;

export const FormCard = styled(Panel)`
    ${surface}
    margin-bottom: 20px;
`;

export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(190px, 1fr) 130px 110px minmax(210px, 1.2fr) 120px minmax(160px, 0.9fr) minmax(220px, 1.2fr) 130px auto;
    gap: var(--space-md);
    align-items: end;

    @media (max-width: 1440px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const FormInput = Food99FormInput;

export const InlineMessage = Food99InlineMessage;

export const ModalItemSummary = styled.div`
    display: grid;
    gap: 6px;
    padding: var(--space-sm) 14px;
    border: 1px solid rgba(226, 232, 240, 0.95);
    border-radius: 0.5rem;
    background: #f8fafc;

    strong {
        color: #111827;
    }

    span {
        color: #64748b;
        font-size: 0.92rem;
    }
`;

export const ModalFormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-md);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const FilterGrid = styled(Food99FilterGrid).attrs({
    $columns: 'repeat(3, minmax(160px, 1fr)) minmax(240px, 1.3fr) 160px',
})``;

export const FilterLabel = Food99FilterLabel;

export const FilterSelect = Food99FilterSelect;

export const SearchInputWrapper = Food99SearchInputWrapper;

export const SearchInput = Food99SearchInput;

export const MetricsGrid = styled(Panel)`
    ${surface}
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;

    @media (max-width: 1080px) {
        grid-template-columns: 1fr;
    }
`;

export const MetricCard = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-md);
    min-width: 0;

    svg {
        font-size: 1.6rem;
        color: #111827;
    }

    .dot {
        width: 32px;
        height: 32px;
        border-radius: var(--radius-xl);
        display: inline-block;
        flex: 0 0 auto;
    }

    .published {
        background: rgba(34, 197, 94, 0.16);
    }

    .draft {
        background: rgba(249, 115, 22, 0.16);
    }

    .inactive {
        background: rgba(148, 163, 184, 0.18);
    }

    strong,
    span,
    small {
        display: block;
    }

    strong {
        color: #111827;
        font-size: 2rem;
        line-height: 1;
    }

    span {
        margin-top: 6px;
        color: #334155;
        font-weight: 500;
    }

    small {
        margin-top: var(--space-2xs);
        color: #64748b;
    }
`;

export const TableCard = Food99TableCard;

export const TableElement = styled(Food99TableElement).attrs({
    $minWidth: '1250px',
})``;

export const ThumbCell = styled.div`
    display: flex;
    align-items: center;
`;

export const Thumb = styled.div<{ $tone: string }>`
    width: 44px;
    height: 44px;
    border-radius: var(--radius-xl);
    background: ${({ $tone }) => $tone};
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.26);
`;

export const StatusPill = styled.span<{ $status: 'Publicado' | 'Rascunho' | 'Na fila' | 'Inativo' }>`
    ${food99StatusPillBase}
    background: ${({ $status }) =>
        $status === 'Publicado'
            ? 'rgba(34, 197, 94, 0.12)'
            : $status === 'Rascunho'
                ? 'rgba(249, 115, 22, 0.12)'
                : $status === 'Na fila'
                    ? 'rgba(59, 130, 246, 0.12)'
                    : 'rgba(226, 232, 240, 0.9)'};
    color: ${({ $status }) =>
        $status === 'Publicado'
            ? '#15803d'
            : $status === 'Rascunho'
                ? '#ea580c'
                : $status === 'Na fila'
                    ? '#1d4ed8'
                    : '#475569'};
`;

export const TableActions = styled(Food99TableActions)`
    button:hover {
        background-color: #f0f0f0;
        color: #333333;
    }
`;

export const RowActionButton = Food99RowActionButton;

export const TogglePill = styled.span<{ $active: boolean }>`
    width: var(--control-height-sm);
    height: 24px;
    border-radius: var(--radius-pill);
    display: inline-flex;
    align-items: center;
    padding: 3px;
    background: ${({ $active }) => ($active ? '#ffb800' : '#e5e7eb')};
    position: relative;

    &::after {
        content: '';
        width: 18px;
        height: 18px;
        border-radius: var(--radius-pill);
        background: #ffffff;
        transform: translateX(${({ $active }) => ($active ? '18px' : '0')});
        transition: transform 0.2s ease;
    }
`;

export const PaginationRow = Food99PaginationRow;

export const PaginationButton = Food99PaginationButton;

export const PaginationCurrent = Food99PaginationCurrent;

export const TableScroll = Food99TableScroll;
