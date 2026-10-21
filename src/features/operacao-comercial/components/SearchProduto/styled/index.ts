import styled from 'styled-components';
const Content = styled.div`
    display: grid;
    gap: 14px;
`;

const SearchControls = styled.div`
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 10px;
    align-items: end;

    select {
        font-weight: 400;
    }

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

const Control = styled.label`
    display: grid;
    gap: 6px;
    color: #000;
    font-size: var(--font-size-sm);

    select,
    input {
        width: 100%;
        min-height: var(--control-height-sm);
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: var(--radius-sm);
        padding: 0 var(--space-sm);
        background: var(--theme-surface, #ffffff);
        color: #000;
    }
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;

    @media (max-width: 767px) {
        > * {
            width: 100%;
        }
    }
`;

export {
    Content,
    SearchControls,
    Control,
    Actions,
}
