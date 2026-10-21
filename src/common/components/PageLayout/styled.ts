import styled from 'styled-components';

const SIDEBAR_WIDTH = 280;

export const PageShell = styled.div<{ $menuOpen: boolean }>`
    margin: 0;
    position: relative;
    min-height: calc(100vh - 56px);
`;

export const PageContent = styled.div<{ $menuOpen: boolean }>`
    margin-left: ${({ $menuOpen }) => ($menuOpen ? `calc(${SIDEBAR_WIDTH}px - var(--layout-main-padding, 0.8rem))` : '0')};
    padding: 0 var(--space-2xs) var(--space-2xs)
        ${({ $menuOpen }) => ($menuOpen ? 'var(--space-2xs)' : 'var(--space-2xs)')};
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    /* A transição de margem força novo layout de toda a página a cada frame. */
    transition: none;

    @media (max-width: 991px) {
        margin-left: 0;
        padding: 0 var(--space-sm) var(--space-lg);
        gap: var(--space-md);
        transition: none;
    }
`;

export const PageHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    width: 100%;

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const PageTitleArea = styled.div`
    flex: 1;
    min-width: 0;
`;

export const PageTitleRow = styled.div`
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: var(--space-sm);

    > :first-child {
        display: flex;
        align-items: center;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

export const Toolbar = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-wrap: wrap;

    @media (max-width: 767px) {
        display: grid;
        grid-template-columns: 1fr;
    }
`;

export const SearchWrapper = styled.div`
    flex: 1;
    min-width: 17.5rem; /* 280px */

    > div {
        padding: 0;
    }

    @media (max-width: 767px) {
        min-width: 0;
        width: 100%;
    }
`;

export const TableSection = styled.div`
    min-width: 0;
    width: 100%;

    @media (max-width: 767px) {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
`;

export const TemplateContent = styled.div`
    display: grid;
    gap: var(--space-md);
`;

export const TemplateDescription = styled.p`
    margin: 0;
    color: var(--theme-text-soft, var(--text-muted));
    font-size: var(--font-size-sm);
`;

export const TemplateState = styled.div<{ $error?: boolean }>`
    padding: var(--space-xl) var(--space-lg);
    border: 1px solid ${({ $error }) => ($error ? 'rgba(220, 38, 38, 0.28)' : 'var(--theme-border, #d8e2ef)')};
    border-radius: 0.1875rem;
    background: ${({ $error }) => ($error ? 'rgba(254, 242, 242, 0.72)' : 'var(--theme-surface, #fff)')};
    color: ${({ $error }) => ($error ? 'var(--status-danger, #b91c1c)' : 'var(--theme-text-soft, #64748b)')};
    text-align: center;
`;

export const TemplatePagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    flex-wrap: wrap;

    > div {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    }

    select {
        min-height: var(--control-height-sm);
        border: 1px solid var(--theme-border, var(--bs-border-color));
        border-radius: 0.125rem;
        background: var(--theme-surface, #fff);
        color: var(--theme-text, #111827);
    }
`;

export const TemplateBatchActions = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-wrap: wrap;
    padding: var(--space-sm);
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: 0.1875rem;
    background: var(--theme-surface-muted, #f8fafc);
`;

export const StatusBadge = styled.span<{ $variant?: 'ativo' | 'inativo' | 'vip' }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 5.625rem; /* 90px */
    padding: 0 var(--space-sm);
    border-radius: 4px;
    font-size: var(--font-size-xs);
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    height: 1.2rem;
    color: ${({ $variant }) =>
        $variant === 'ativo'
            ? '#166534'
            : $variant === 'vip'
                ? '#92400e'
                : '#ffffff'};
    background: ${({ $variant }) =>
        $variant === 'ativo'
            ? '#dcfce7'
            : $variant === 'vip'
                ? '#fef3c7'
                : '#374151'};
`;
