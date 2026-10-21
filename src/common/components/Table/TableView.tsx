import { flexRender, type Table as ReactTable } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import {
    EmptyState, Header, HeaderText, StyledTable, TableCell, TableHeadCell, TableRow, TableShell, TableWrapper,
} from './styled';
import type { TableAlign } from './types';

interface TableViewProps<TData> {
    table: ReactTable<TData>;
    title: string;
    description: string;
    emptyMessage: string;
    showHeader: boolean;
    compact: boolean;
    onRowClick?: (row: TData) => void;
    isRowHighlighted?: (row: TData) => boolean;
    footer?: ReactNode;
}

const getAlign = (meta: unknown): TableAlign => (meta as { align?: TableAlign } | undefined)?.align ?? 'left';
const getWidth = (meta: unknown): string | undefined => (meta as { width?: string } | undefined)?.width;

export function TableView<TData>({ table, title, description, emptyMessage, showHeader, compact, onRowClick, isRowHighlighted, footer }: TableViewProps<TData>) {
    const rows = table.getRowModel().rows;
    const visibleColumnCount = Math.max(table.getVisibleLeafColumns().length, 1);

    return (
        <TableShell $compact={compact}>
            {showHeader && <Header><HeaderText data-print-role="table-header-text"><h3>{title}</h3><p data-print-hidden="true">{description}</p></HeaderText></Header>}
            <TableWrapper>
                <StyledTable $compact={compact}>
                    <thead>
                        {table.getHeaderGroups().map((group) => <tr key={group.id}>{group.headers.map((header) => (
                            <TableHeadCell key={header.id} $align={getAlign(header.column.columnDef.meta)} $width={getWidth(header.column.columnDef.meta)} $compact={compact}>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHeadCell>
                        ))}</tr>)}
                    </thead>
                    <tbody>
                        {rows.length ? rows.map((row) => <TableRow key={row.id} $clicavel={Boolean(onRowClick)} $destacada={isRowHighlighted?.(row.original) ?? false} onClick={() => onRowClick?.(row.original)}>{row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} $align={getAlign(cell.column.columnDef.meta)} $compact={compact}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                        ))}</TableRow>) : <tr><TableCell colSpan={visibleColumnCount} $align="center" $compact={compact}><EmptyState $compact={compact}>{emptyMessage}</EmptyState></TableCell></tr>}
                    </tbody>
                </StyledTable>
            </TableWrapper>
            {footer}
        </TableShell>
    );
}
