import styled from 'styled-components';

const Wrapper = styled.div<{ $zIndex: number }>`
    position: fixed;
    right: var(--space-lg);
    bottom: var(--space-lg);
    z-index: ${({ $zIndex }) => $zIndex};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-xs);

    @media (max-width: 767px) {
        right: var(--space-md);
        bottom: var(--space-md);
    }
`;

const ActionsList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2xs);
`;

const ActionButton = styled.button`
    position: relative;
    display: inline-flex;
    align-items: anchor-center;
    place-items: center;
    justify-content: center;
    width: 2.5rem; /* 40px */
    height: 2.5rem; /* 40px */
    border: none;
    border-radius: var(--radius-pill);
    background: var(--theme-surface, var(--bs-white));
    color: var(--theme-text, var(--bs-body-color));
    box-shadow: var(--shadow-floating);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: var(--shadow-floating-hover);
    }

    &::after {
        content: attr(data-tooltip);
        position: absolute;
        right: calc(100% + var(--space-xs));
        top: 50%;
        transform: translateY(-50%);
        padding: var(--space-xs) 0.625rem; /* 10px */
        border-radius: 0.5rem;
        background: rgba(var(--bs-dark-rgb), 0.92);
        color: var(--bs-white);
        font-size: var(--font-size-xs);
        font-weight: 500;
        line-height: 1;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.18s ease, transform 0.18s ease;
    }

    &:hover::after {
        opacity: 1;
        transform: translateY(-50%) translateX(-2px);
    }

    @media (max-width: 767px) {
        width: 2.5rem;
        height: 2.5rem;
    }
`;

const MainButton = styled.button<{ $open: boolean }>`
    display: inline-flex;
    align-items: anchor-center;
    place-items: center;
    justify-content: center;
    width: 2.875rem; /* 46px */
    height: 2.875rem; /* 46px */
    border: none;
    border-radius: var(--radius-pill);
    background: linear-gradient(135deg, var(--color-secondary, var(--bs-secondary)) 0%, var(--color-main, var(--bs-primary)) 100%);
    color: var(--color-font, var(--bs-white));
    transition: transform 0.2s ease;

    svg {
        transform: rotate(${({ $open }) => ($open ? '45deg' : '0deg')});
        transition: transform 0.2s ease;
    }

    &:hover {
        transform: translateY(-1px) scale(1.02);
    }
`;

const Backdrop = styled.button<{ $zIndex: number }>`
    position: fixed;
    inset: 0;
    z-index: ${({ $zIndex }) => $zIndex};
    border: none;
    background: transparent;
`;

const ChartOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1600;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-lg);
    background: rgba(var(--bs-dark-rgb), 0.48);
    backdrop-filter: blur(4px);

    @media (max-width: 767px) {
        padding: 0;
    }
`;

const ChartDialog = styled.div`
    position: relative;
    width: min(920px, 100%);
    max-height: min(88vh, 57.5rem); /* 920px */
    overflow-y: auto;
    padding: var(--space-lg);
    border-radius: 1rem;
    background: var(--theme-surface, var(--bs-white));

    @media (max-width: 767px) {
        width: 100%;
        max-height: 100dvh;
        height: 100dvh;
        border-radius: 0;
        padding: 1.125rem; /* 18px */
    }
`;

const ChartCloseButton = styled.button`
    position: sticky;
    top: 0;
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--control-height-sm);
    height: var(--control-height-sm);
    border: 1px solid var(--theme-border, var(--bs-border-color));
    border-radius: var(--radius-pill);
    background: var(--theme-surface, var(--bs-white));
    color: var(--theme-text, var(--bs-body-color));
`;

export {
    Wrapper,
    ActionsList,
    ActionButton,
    MainButton,
    Backdrop,
    ChartOverlay,
    ChartDialog,
    ChartCloseButton,
};
