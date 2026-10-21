import styled from 'styled-components';
import type { TableAlign, TableRowActionVariant } from './types';

export const TableShell = styled.section<{ $compact?: boolean }>`
    border: 1px solid #e5e7eb;
    border-radius: 0.1875rem;
    background: #ffffff;
    box-shadow: ${({ $compact }) => ($compact ? 'none' : 'var(--shadow-panel-strong)')};
    overflow: hidden;

    @media (max-width: 767px) { border-radius: 0.125rem; }
`;

export const Header = styled.div`
    padding: var(--space-lg);
    border-bottom: 1px solid #e5e7eb;
    display: grid;
    gap: var(--space-lg);
    @media (max-width: 767px) { padding: var(--space-md); gap: var(--space-sm); }
`;

export const HeaderText = styled.div`
    display: grid;
    gap: var(--space-xs);
    h3 { margin: 0; font-size: 15px; font-weight: 500; color: #111827; }
    p { margin: 0; color: #6b7280; font-size: var(--font-size-md); }
`;

export const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
`;

export const StyledTable = styled.table<{ $compact?: boolean }>`
    width: 100%;
    min-width: ${({ $compact }) => ($compact ? 'var(--table-min-width-compact)' : 'var(--table-min-width)')};
    border-collapse: separate;
    border-spacing: 0;
    @media (max-width: 767px) { min-width: ${({ $compact }) => ($compact ? '32.5rem' : '40rem')}; }
`;

export const TableHeadCell = styled.th<{ $align: TableAlign; $width?: string; $compact?: boolean }>`
    position: sticky;
    top: 40px;
    z-index: 2;
    text-align: ${({ $align }) => $align};
    padding: ${({ $compact }) => ($compact ? '0.625rem var(--space-sm)' : 'var(--space-xs) 1.25rem')};
    color: #4b5563;
    font-size: var(--font-size-xs);
    font-weight: 500;
    background: #f3f4f6;
    border-bottom: 1px solid #e5e7eb;
    width: ${({ $width }) => $width || 'auto'};
    white-space: nowrap;
    @media (max-width: 767px) { padding: ${({ $compact }) => ($compact ? '0.5625rem 0.625rem' : 'var(--space-sm) 0.875rem')}; }
`;

export const TableCell = styled.td<{ $align: TableAlign; $compact?: boolean }>`
    text-align: ${({ $align }) => $align};
    padding: ${({ $compact }) => ($compact ? '0.5rem var(--space-sm)' : '0.2rem 1.25rem')};
    border-bottom: 1px solid #e5e7eb;
    color: #111827;
    font-size: ${({ $compact }) => ($compact ? 'var(--font-size-sm)' : 'var(--font-size-md)')};
    vertical-align: middle;
    @media (max-width: 767px) { padding: ${({ $compact }) => ($compact ? '0.5625rem 0.625rem' : '0.875rem')}; font-size: var(--font-size-sm); }
`;

export const TableRow = styled.tr<{ $clicavel?: boolean; $destacada?: boolean }>`
    transition: background 0.2s ease;
    cursor: ${({ $clicavel }) => ($clicavel ? 'pointer' : 'default')};
    background: ${({ $destacada }) => ($destacada ? '#fff3cd' : 'transparent')};
    ${({ $destacada }) => $destacada && '& td { color: #856404; font-weight: 600; }'}
    &:hover { background: ${({ $destacada }) => ($destacada ? '#ffe69c' : '#f9fafb')}; }
`;

export const ActionCellWrap = styled.div`display: flex; justify-content: center; gap: var(--space-xs);`;

export const ActionButton = styled.button<{ $variant?: TableRowActionVariant }>`
    width: 2.125rem; height: 2.125rem; border-radius: var(--radius-pill); border: none;
    background: ${({ $variant }) => $variant === 'danger' ? 'rgba(254, 242, 242, 0.95)' : $variant === 'success' ? 'rgba(240, 253, 244, 0.95)' : $variant === 'muted' ? 'var(--theme-surface-muted, var(--surface-panel-soft))' : 'var(--theme-surface, var(--surface-panel))'};
    color: ${({ $variant }) => $variant === 'danger' ? 'var(--status-danger)' : $variant === 'success' ? 'var(--status-success)' : $variant === 'muted' ? 'var(--theme-text-soft, var(--text-muted))' : 'var(--color-main, var(--bs-primary))'};
    display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s ease;
    &:hover { transform: translateY(-1px); box-shadow: var(--shadow-control-hover); }
    &:disabled { cursor: not-allowed; opacity: 0.48; transform: none; box-shadow: none; }
`;

export const EmptyState = styled.div<{ $compact?: boolean }>`
    padding: ${({ $compact }) => ($compact ? 'var(--space-lg) var(--space-md)' : '2.625rem var(--space-lg)')};
    text-align: center; color: var(--theme-text-soft, var(--text-muted));
`;

export const ConfigSlot = styled.div`margin-bottom: var(--space-sm);`;

export const SelectionCheckbox = styled.input`
    width: 1rem; height: 1rem; accent-color: var(--color-main, var(--bs-primary)); cursor: pointer;
    &:disabled { cursor: not-allowed; opacity: 0.45; }
`;

export const PaginationBar = styled.nav`
    display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md); border-top: 1px solid #e5e7eb; color: #4b5563; font-size: var(--font-size-sm);
    button, select { min-height: 2rem; border: 1px solid #d1d5db; border-radius: 0.1875rem; background: #fff; color: inherit; padding: 0 var(--space-sm); }
    button:disabled { cursor: not-allowed; opacity: .5; }
`;
