import styled from 'styled-components';
import { ModalSimpleActionButton } from '@/common/components/ModalSimple';
import { Input } from '@/common/components/Ui';

const Content = styled.div`
    display: grid;
    gap: 14px;

    @media (max-width: 767px) {
        gap: var(--space-sm);
    }
`;

const SearchBar = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 140px;
    gap: 10px;
    align-items: start;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        gap: var(--space-xs);
    }
`;

const SearchInput = styled(Input)`
    min-height: var(--control-height-sm);
    padding: 0 var(--space-sm);
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.32));
    border-radius: var(--radius-sm);

    &:focus {
        box-shadow: 0 0 0 3px rgba(var(--bs-primary-rgb, 59, 130, 246), 0.12);
    }
`;

const SearchButton = styled(ModalSimpleActionButton)`
    min-width: 140px;
    min-height: var(--control-height-sm);
    height: var(--control-height-sm);
    padding: 0 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    align-self: start;
    line-height: 1;

    @media (max-width: 767px) {
        min-width: 0;
        width: 100%;
        height: var(--control-height-sm);
    }
`;

const AddButton = styled(ModalSimpleActionButton)`
    min-height: var(--control-height-sm);
    height: var(--control-height-sm);
    padding: 0 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    align-self: start;
    line-height: 1;

    @media (max-width: 767px) {
        width: 100%;
        height: var(--control-height-sm);
    }
`;

const Actions = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    align-items: start;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

export {
    Content,
    SearchBar,
    SearchInput,
    SearchButton,
    AddButton,
    Actions,
}
