import styled, { css } from 'styled-components';
import { Panel } from '../../../../common/components/Ui';
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
    Food99SurfaceCard,
    food99FilterSurface,
} from '../../shared/filterControls';
import {
    Food99IconButton,
    Food99TableCard,
    Food99TableElement,
    Food99TableScroll,
    food99StatusPillBase,
} from '../../shared/tableControls';

const surfaceCard = css`
    ${food99FilterSurface}
`;

export const TopToolbar = styled.div`
    display: flex;
    justify-content: space-between;
    gap: var(--space-md);
    margin-bottom: 18px;

    @media (max-width: 1440px) {
        flex-direction: column;
        align-items: stretch;
    }

    > div:last-child {
        @media (max-width: 1440px) {
            width: 100%;
            justify-content: flex-end;
        }

        @media (max-width: 768px) {
            width: 100%;
            grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr) auto;

            > button {
                width: 100%;
            }
        }
    }
`;

export const ToolbarSpacer = styled.div`
    flex: 1;
`;

export const ToolbarActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    justify-self: end;
    align-self: end;
    min-width: 0;
    width: max-content;
    white-space: nowrap;

    @media (max-width: 768px) {
        width: 100%;
        justify-self: stretch;
        justify-content: flex-end;
    }
`;

export const ActionButton = Food99ActionButton;

export const FilterCard = Food99FilterCard;

export const FormCard = styled(Panel)`
    ${surfaceCard}
    margin-bottom: 20px;
`;

export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-md);
    align-items: end;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const FormStack = styled.label`
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    color: #475569;
    font-size: 0.95rem;
    font-weight: 600;
    min-width: 0;
`;

export const FormInput = Food99FormInput;

export const FormActions = styled.div`
    display: flex;
    gap: var(--space-sm);
    justify-content: flex-end;

    @media (max-width: 1440px) {
        grid-column: 1 / -1;
    }

    @media (max-width: 768px) {
        flex-direction: column;

        > button {
            width: 100%;
        }
    }
`;

export const InlineMessage = Food99InlineMessage;

export const SearchSection = styled.div`
    display: grid;
    grid-template-columns: minmax(240px, 320px) minmax(420px, 1fr) auto;
    gap: var(--space-md);
    align-items: end;

    > * {
        min-width: 0;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const SearchInputWrapper = Food99SearchInputWrapper;

export const SearchInput = Food99SearchInput;

export const FiltersGrid = styled(Food99FilterGrid).attrs({
    $columns: 'repeat(2, minmax(0, 1fr))',
    $tabletColumns: 'repeat(2, minmax(0, 1fr))',
})``;

export const FilterStack = Food99FilterLabel;

export const FilterSelect = Food99FilterSelect;

export const TableCard = Food99TableCard;

export const TableElement = styled(Food99TableElement).attrs({
    $clickableRows: true,
})``;

export const TableStatus = styled.span<{ $status: 'Ativo' | 'Inativo' }>`
    ${food99StatusPillBase}
    background: ${({ $status }) => ($status === 'Ativo' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(148, 163, 184, 0.16)')};
    color: ${({ $status }) => ($status === 'Ativo' ? '#15803d' : '#475569')};
`;

export const TableTools = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
`;

export const ActionIconButton = Food99IconButton;

export const BottomSummaryCard = styled(Food99SurfaceCard)`
    margin-top: 20px;
`;

export const SummaryBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 14px;
    padding: var(--space-xs) 14px;
    border-radius: var(--radius-pill);
    background: rgba(255, 243, 205, 0.9);
    color: #7c5d00;
    font-weight: 500;
`;

export const SummaryGrid = styled.div`
    margin-top: 22px;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 20px;

    @media (max-width: 1180px) {
        grid-template-columns: 1fr;
    }

    > div {
        min-width: 0;
    }

    > div span:first-child,
    > div p {
        color: #475569;
    }
`;

export const SummaryMetric = styled.div`
    display: grid;
    gap: 6px;
    color: #111827;

    svg {
        font-size: var(--font-size-2xl);
        color: #ffb800;
    }

    strong {
        font-size: 2rem;
        line-height: 1;
    }

    span {
        color: #475569;
    }
`;

export const SummaryTagsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: var(--space-sm);
`;

export const SummaryTag = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 14px;
    border-radius: var(--radius-pill);
    background: #f8fafc;
    color: #334155;
    border: 1px solid rgba(226, 232, 240, 0.95);
    font-weight: 600;
`;

export const TableScroll = Food99TableScroll;
