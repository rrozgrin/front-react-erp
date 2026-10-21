import styled, { css } from 'styled-components';
import { Input, Panel } from '../../../../../common/components/Ui';
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
    Food99IconButton,
    Food99TableActions,
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
    gap: var(--space-md);
    margin-bottom: 18px;

    @media (max-width: 1440px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const CategoryActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  justify-self: end;
  grid-column: 2;

  @media (min-width: 1441px) {
    grid-column: 5;
  }
`;

export const ActionButton = Food99ActionButton;

export const ContentCard = Food99FilterCard;

export const FormCard = styled(Panel)`
    ${surface}
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

export const FilterGrid = styled(Food99FilterGrid).attrs({
    $alignLast: true,
    $columns: '190px minmax(260px, 1fr) 170px 180px auto',
})``;

export const FilterLabel = Food99FilterLabel;

export const FilterSelect = Food99FilterSelect;

export const SearchInputWrapper = Food99SearchInputWrapper;

export const SearchInput = Food99SearchInput;

export const CategoryBlock = styled(Panel)`
    ${surface}
    margin-top: 18px;
    overflow: hidden;
`;

export const CategoryHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);

    @media (max-width: 980px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const CategoryMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;

    button {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: var(--radius-pill);
        background: rgba(255, 193, 7, 0.12);
        color: #111827;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

export const CategoryTitle = styled.h3`
    margin: 0;
    color: #111827;
    font-size: 1.9rem;
    line-height: 1;
`;

export const CategoryBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-xl);
    background: #f1f5f9;
    color: #475569;
    font-weight: 500;
`;

export const CategoryTools = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-md);
    color: #334155;

    input {
        width: var(--control-height-sm);
        height: 24px;
        accent-color: #ffb800;
    }
`;

export const IconButton = Food99IconButton;

export const TableElement = styled(Food99TableElement).attrs({
    $minWidth: '1100px',
})``;

export const TableScroll = styled(Food99TableScroll)`
    margin-top: 20px;
`;

export const ItemCell = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

export const ItemThumb = styled.div<{ $tone: string }>`
    width: 40px;
    height: 40px;
    border-radius: 14px;
    background: ${({ $tone }) => $tone};
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
`;

export const ItemName = styled.strong`
    display: block;
    color: #111827;
`;

export const ItemCode = styled.span`
    display: block;
    margin-top: var(--space-2xs);
    color: #64748b;
`;

export const StatusPill = styled.span<{ $status: 'Publicado' | 'Rascunho' | 'Inativo' }>`
    ${food99StatusPillBase}
    background: ${({ $status }) =>
        $status === 'Publicado'
            ? 'rgba(34, 197, 94, 0.12)'
            : $status === 'Inativo'
                ? 'rgba(226, 232, 240, 0.9)'
                : 'rgba(245, 158, 11, 0.14)'};
    color: ${({ $status }) =>
        $status === 'Publicado'
            ? '#15803d'
            : $status === 'Inativo'
                ? '#475569'
                : '#c2410c'};
`;

export const InlineOrderInput = styled(Input)`
    width: 52px;
    height: 40px;
    border: 1px solid rgba(226, 232, 240, 0.95);
    border-radius: 10px;
    text-align: center;
    color: #111827;
    background: #ffffff;
`;

export const TableActions = styled(Food99TableActions)`
    gap: var(--space-md);
`;
