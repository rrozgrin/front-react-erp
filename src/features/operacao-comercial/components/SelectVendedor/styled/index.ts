import styled from 'styled-components';

const Body = styled.div`
    display: grid;
    gap: var(--space-sm);
`;

const KeyboardHint = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: 10px var(--space-sm);
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.32));
    border-radius: var(--radius-sm);
    background: var(--theme-surface-soft, rgba(37, 99, 235, 0.06));
    color: var(--theme-text-soft, #475569);
    font-size: 0.9rem;
`;

const SelectedBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: 10px var(--space-sm);
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.32));
    border-radius: var(--radius-sm);
    background: var(--theme-surface, #ffffff);
    color: #000;
    font-size: 0.92rem;
`;

const ActionFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: var(--space-xs);
`;

export {
    Body,
    KeyboardHint,
    SelectedBar,
    ActionFooter,
}
