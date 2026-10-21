import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SidebarWrapper = styled.div<{ open: boolean }>`
    position: absolute;
    left: calc(-1 * var(--layout-main-padding, 0.8rem));
    top: calc(-1 * var(--layout-main-padding, 0.8rem));
    bottom: 0;
    width: 280px;
    min-width: 280px;
    flex: 0 0 280px;
    max-width: 100%;
    height: calc(100% + var(--layout-main-padding, 0.8rem));
    display: flex;
    flex-direction: column;
    background: var(--bs-white);
    color: var(--bs-gray-900);
    border-right: 1px solid var(--bs-gray-300);
    overflow: hidden;
    contain: layout paint;
    opacity: ${({ open }) => (open ? '1' : '0')};
    transform: translateX(${({ open }) => (open ? '0' : '-100%')});
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
    will-change: transform, opacity;
    transition: transform 0.18s ease-out, opacity 0.14s linear, visibility 0s linear ${({ open }) => (open ? '0s' : '0.18s')};
    z-index: 14;

    @media (max-width: 991px) {
        position: static;
        left: auto;
        top: auto;
        width: 100%;
        min-width: 100%;
        height: auto;
        flex-basis: 100%;
        opacity: 1;
        transform: none;
        visibility: visible;
        pointer-events: auto;
        will-change: auto;
        transition: none;
        display: ${({ open }) => (open ? 'block' : 'none')};
        border: 1px solid var(--bs-gray-300);
    }
`;

export const ToggleButton = styled.button`
    display: inline-flex;
    align-items: center;
    background-color: transparent;
    justify-content: center;
    color: var(--theme-text, var(--color-secondary));
    border: none;
    padding: 10px var(--space-sm);
    cursor: pointer;
     &:hover {
        background: rgba(var(--bs-primary-rgb), 0.02);
    }
`;

export const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 18px;
    border-bottom: 1px solid var(--bs-gray-200);
    margin-bottom: var(--space-xs);
`;

export const SidebarTitle = styled.span.attrs({ 'data-app-title': true })`
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: #000;
`;

export const CloseMenuButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    background: transparent;
    color: #6c757d;
    cursor: pointer;
`;

export const MenuContainer = styled.div`
    flex: 1;
    padding: 0 18px 18px;
    overflow-y: auto;
    scrollbar-width: thin;
`;

export const SectionWrapper = styled.div`
    & + & {
        margin-top: 14px;
        padding-top: 14px;
        border-top: 1px solid var(--bs-gray-200);
    }
`;

export const SectionTitle = styled.h4`
    margin: 0;
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--bs-gray-900);
`;

export const SectionToggle = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: 10px var(--space-xs);
    border: none;
    border-radius: 0.125rem;
    background: transparent;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background: rgba(var(--bs-primary-rgb), 0.06);
    }
`;

export const ToggleIndicator = styled.span<{ $open: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
    border-radius: var(--radius-pill);
    color: var(--color-secondary, var(--bs-primary));
    font-size: var(--font-size-sm);
    font-weight: 500;
    line-height: 1;
`;

export const PageList = styled.div<{ $open: boolean }>`
    max-height: ${({ $open }) => ($open ? '900px' : '0')};
    opacity: ${({ $open }) => ($open ? '1' : '0')};
    overflow: hidden;
    font-size: var(--font-size-sm);
    margin: 0;
    padding: 0;
    transition: max-height 0.24s ease, opacity 0.18s ease;
`;

const pageItemStyles = `
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--bs-gray-700);
    text-decoration: none;
    padding: 4px var(--space-sm);
    margin-bottom: 6px;
    border: none;
    border-radius: 0.125rem;
    background: transparent;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
        background: rgba(var(--bs-primary-rgb), 0.08);
        color: var(--color-secondary, var(--bs-primary));
    }
`;

export const PageLink = styled(Link) <{ $active?: boolean }>`
    ${pageItemStyles}
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-primary-rgb), 0.12)' : 'transparent')};
    color: ${({ $active }) => ($active ? 'var(--color-secondary, var(--bs-primary))' : 'var(--bs-gray-700)')};
    font-weight: ${({ $active }) => ($active ? 500 : 400)};
`;

export const PageButton = styled.button<{ $active?: boolean }>`
    ${pageItemStyles}
    width: 100%;
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-primary-rgb), 0.12)' : 'transparent')};
    color: ${({ $active }) => ($active ? 'var(--color-secondary, var(--bs-primary))' : 'var(--bs-gray-700)')};
    font-weight: ${({ $active }) => ($active ? 500 : 400)};
`;

export const PageItemRow = styled.div`
    display: flex;
    align-items: stretch;
    gap: var(--space-2xs);
    margin-bottom: 6px;

    ${PageLink},
    ${PageButton} {
        flex: 1 1 auto;
        margin-bottom: 0;
    }
`;

export const PageExpandButton = styled.button<{ $open: boolean }>`
    width: 34px;
    flex: 0 0 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 0.125rem;
    margin: 0;
    background: ${({ $open }) =>
        $open ? 'rgba(var(--bs-primary-rgb), 0.14)' : 'rgba(var(--bs-primary-rgb), 0.06)'};
    color: var(--color-secondary, var(--bs-primary));
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
        background: rgba(var(--bs-primary-rgb), 0.18);
    }
`;

export const SubPageList = styled.div<{ $open: boolean }>`
    max-height: ${({ $open }) => ($open ? '600px' : '0')};
    opacity: ${({ $open }) => ($open ? '1' : '0')};
    overflow: hidden;
    padding-left: var(--space-sm);
    border-left: 1px solid rgba(var(--bs-primary-rgb), 0.12);
    transition: max-height 0.24s ease, opacity 0.18s ease;
`;
