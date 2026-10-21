import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: var(--theme-overlay, rgba(15, 23, 42, 0.45));
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
    padding: var(--space-md);
`;

export const Dialog = styled.div`
    width: 100%;
    max-width: 680px;
    max-height: calc(100dvh - 32px);
    border-radius: var(--radius-xl);
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.16));
    background: var(--theme-surface, #ffffff);
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.3);
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: var(--theme-border, rgba(15, 23, 42, 0.28)) transparent;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: var(--radius-pill);
        background: var(--theme-border, rgba(15, 23, 42, 0.28));
    }
`;

export const Header = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    padding: 18px;
    background: var(--theme-surface, #ffffff);
    border-bottom: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
`;

export const HeaderLeft = styled.div`
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
`;

export const HeaderIcon = styled.div`
    width: 34px;
    height: 34px;
    border-radius: var(--radius-pill);
    background: var(--theme-surface-soft, rgba(15, 23, 42, 0.08));
    color: var(--color-main, var(--bs-primary));
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 17px;
    }
`;

export const TitleWrap = styled.div`
    min-width: 0;

    h2 {
        margin: 0;
        font-size: var(--font-size-xs);
        font-weight: 500;
        color: var(--theme-text, var(--color-secondary));
        line-height: 1.1;
    }

    p {
        margin: 6px 0 0;
        font-size: var(--font-size-sm);
        color: var(--theme-text-soft, #64748b);
    }
`;

export const CloseButton = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 0.5rem;
    border: none;
    background: var(--theme-surface-soft, rgba(15, 23, 42, 0.08));
    color: var(--theme-text-soft, #64748b);
    font-size: 22px;
    line-height: 1;
    cursor: pointer;

    &:hover {
        color: var(--theme-text, var(--color-secondary));
    }
`;

export const Body = styled.div`
    padding: 14px var(--space-md) var(--space-md);
    display: grid;
    gap: 6px;
`;

export const OptionButton = styled.button`
    width: 100%;
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
    border-radius: 0.5rem;
    background: var(--theme-surface, #ffffff);
    min-height: 44px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: 400;
    cursor: pointer;

    .leftIcon {
        color: var(--color-main, var(--bs-primary));
        font-size: 17px;
        flex: 0 0 auto;
    }

    .label {
        flex: 1;
        min-width: 0;
        text-align: left;
        font-size: var(--font-size-xs);
        font-weight: 500;
    }

    .rightIcon {
        color: var(--color-main, var(--bs-primary));
        font-size: var(--font-size-sm);
        flex: 0 0 auto;
    }

    &:hover {
        background: var(--theme-surface-soft, rgba(15, 23, 42, 0.06));
    }
`;

export const ReportsBlock = styled.div`
    margin-top: 2px;
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
    border-radius: 0.5rem;
    overflow: hidden;
`;

export const ReportsHeader = styled.button`
    width: 100%;
    min-height: 44px;
    border: none;
    background: var(--theme-surface-soft, rgba(15, 23, 42, 0.07));
    padding: 0 14px;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: 400;
    cursor: pointer;

    .leftIcon {
        color: var(--color-main, var(--bs-primary));
        font-size: 17px;
        flex: 0 0 auto;
    }

    .label {
        flex: 1;
        min-width: 0;
        text-align: left;
        font-size: var(--font-size-xs);
        font-weight: 500;
    }

    .rightIcon {
        color: var(--color-main, var(--bs-primary));
        font-size: var(--font-size-sm);
        flex: 0 0 auto;
    }
`;

export const ReportsList = styled.div`
    border-top: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
    background: var(--theme-surface-muted, rgba(15, 23, 42, 0.03));
`;

export const ReportRow = styled.button`
    width: 100%;
    min-height: 40px;
    border: none;
    background: transparent;
    border-bottom: 1px solid var(--theme-border, rgba(15, 23, 42, 0.11));
    padding: 0 14px 0 var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    color: #000;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    .dot {
        color: var(--color-main, var(--bs-primary));
        font-size: var(--font-size-sm);
        line-height: 1;
        flex: 0 0 auto;
    }

    .label {
        flex: 1;
        min-width: 0;
        text-align: left;
        font-size: var(--font-size-xs);
        font-weight: 400;
    }

    .rightIcon {
        color: var(--color-main, var(--bs-primary));
        font-size: var(--font-size-sm);
        flex: 0 0 auto;
    }

    &:hover {
        background: var(--theme-surface-soft, rgba(15, 23, 42, 0.06));
    }
`;

export const Footer = styled.div`
    min-height: 8px;
`;
