import styled from 'styled-components';

const ControlsGrid = styled.form`
    display: grid;
    gap: 14px;
    grid-template-columns: 180px minmax(0, 1fr);
    align-items: end;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

const ControlGroup = styled.label`
    display: grid;
    gap: 6px;
    color: #000;
    font-size: 0.9rem;

    select,
    input {
        width: 100%;
        min-height: var(--control-height-sm);
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: 0.125rem;
        padding: 0 var(--space-sm);
        background: var(--theme-surface, #ffffff);
    }
`;

const TableWrap = styled.div`
    margin-top: 14px;
    max-width: 100%;
    overflow-x: auto;
`;

const moneyBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export { ControlsGrid, ControlGroup, TableWrap, moneyBRL };
