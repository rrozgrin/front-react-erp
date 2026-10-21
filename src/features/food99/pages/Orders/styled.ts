import styled from 'styled-components';
import {
    Food99ActionButton,
    Food99DateField,
    Food99FilterCard,
    Food99FilterGrid,
    Food99FilterLabel,
    Food99FilterSelect,
    Food99SearchInput,
    Food99SearchInputWrapper,
} from '../../shared/filterControls';
import {
    Food99IconButton,
    Food99PaginationButton,
    Food99PaginationCurrent,
    Food99PaginationRow,
    Food99TableActions,
    Food99TableElement,
    Food99TableScroll,
    food99StatusPillBase,
} from '../../shared/tableControls';

export const TopActionRow = styled.div`
    display: flex;
    justify-content: space-between;
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

            > button {
                width: 100%;
            }
        }
    }
`;

export const ActionButton = Food99ActionButton;

export const FiltersCard = styled(Food99FilterCard)`
    margin-bottom: 20px;
`;

export const FiltersGrid = styled(Food99FilterGrid).attrs({
    $alignLast: true,
    $columns: '180px 180px 190px minmax(260px, 1fr) 96px auto',
})`
`;

export const DateFieldGroup = Food99FilterLabel;

export const DateField = Food99DateField;

export const SelectField = Food99FilterSelect;

export const SearchFieldWrapper = Food99SearchInputWrapper;

export const SearchField = Food99SearchInput;

export const OrdersTable = styled(Food99TableElement).attrs({
    $minWidth: '1060px',
})``;

export const StatusPill = styled.span<{ $status: 'Novo pedido' | 'Pendente ERP' | 'Sincronizado' | 'Cancelado' }>`
    ${food99StatusPillBase}
    min-width: 120px;
    background: ${({ $status }) =>
        $status === 'Sincronizado'
            ? 'rgba(34, 197, 94, 0.12)'
            : $status === 'Cancelado'
                ? 'rgba(239, 68, 68, 0.12)'
            : $status === 'Novo pedido'
                ? 'rgba(168, 85, 247, 0.14)'
                : 'rgba(245, 158, 11, 0.14)'};
    color: ${({ $status }) =>
        $status === 'Sincronizado'
            ? '#15803d'
            : $status === 'Cancelado'
                ? '#dc2626'
            : $status === 'Novo pedido'
                ? '#7e22ce'
                : '#d97706'};
`;

export const TableActions = styled(Food99TableActions)`
    gap: var(--space-md);

    button {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        border: 0;
        background-color: transparent; /* Garante fundo limpo inicial */
        color: #5f5f5f;
        cursor: pointer;
        
        /* Suaviza a animação ao entrar e sair com o mouse */
        transition: background-color 0.2s ease, color 0.2s ease;
    }

    button:hover {
        background-color: #f0f0f0;
        color: #333333;
    }
`;

export const IconButton = Food99IconButton;

export const PaginationRow = Food99PaginationRow;

export const PaginationButton = Food99PaginationButton;

export const PaginationCurrent = Food99PaginationCurrent;

export const TableScroll = Food99TableScroll;
