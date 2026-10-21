import type { VisibilityState } from '@tanstack/react-table';
import type React from 'react';

export type TableAlign = 'left' | 'center' | 'right';
export type TableRowActionVariant = 'primary' | 'danger' | 'success' | 'muted';

export interface TableRowAction<TData> {
    label: string;
    icon: React.ReactNode | ((row: TData) => React.ReactNode);
    getTitle?: (row: TData) => string;
    onClick: (row: TData) => void;
    variant?: TableRowActionVariant;
    hidden?: (row: TData) => boolean;
    disabled?: (row: TData) => boolean;
}

export interface TableField<TData> {
    id: string;
    header: string;
    accessorKey?: keyof TData;
    accessorFn?: (row: TData) => unknown;
    cell?: (value: unknown, row: TData) => React.ReactNode;
    align?: TableAlign;
    width?: string;
    defaultVisible?: boolean;
    canHide?: boolean;
}

export interface TablePaginationState {
    pageIndex: number;
    pageSize: number;
}

export interface TableProps<TData> {
    data: TData[];
    fields: TableField<TData>[];
    title?: string;
    description?: string;
    emptyMessage?: string;
    showHeader?: boolean;
    showColumnSelector?: boolean;
    compact?: boolean;
    columnVisibility?: VisibilityState;
    onColumnVisibilityChange?: (nextVisibility: VisibilityState) => void;
    onVisibleColumnsChange?: (visibleColumnIds: string[]) => void;
    rowAction?: {
        label?: string;
        getTitle?: (row: TData) => string;
        onClick: (row: TData) => void;
    };
    rowActions?: TableRowAction<TData>[];
    selectable?: boolean;
    isRowSelected?: (row: TData) => boolean;
    isRowSelectionDisabled?: (row: TData) => boolean;
    onToggleRowSelection?: (row: TData, selected: boolean) => void;
    allRowsSelected?: boolean;
    onToggleAllRows?: (selected: boolean) => void;
    onRowClick?: (row: TData) => void;
    isRowHighlighted?: (row: TData) => boolean;
    /** Enables controlled client or server pagination without changing existing tables. */
    pagination?: TablePaginationState;
    onPaginationChange?: (nextPagination: TablePaginationState) => void;
    pageCount?: number;
    manualPagination?: boolean;
    showPagination?: boolean;
    pageSizeOptions?: number[];
}
