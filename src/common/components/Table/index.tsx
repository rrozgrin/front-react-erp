import { useEffect, useMemo } from 'react';
import { getCoreRowModel, getPaginationRowModel, type ColumnDef, type PaginationState, useReactTable } from '@tanstack/react-table';
import { FiSearch } from 'react-icons/fi';
import { ConfigTable } from '../ConfigTable';
import { PaginationBar, ActionButton, ActionCellWrap, ConfigSlot, SelectionCheckbox } from './styled';
import { TableView } from './TableView';
import { formatColumnHeader, getCellAlignment, renderFallbackValue } from './tableUtils';
import { useTableColumnVisibility } from './useTableColumnVisibility';
import { useTablePagination } from './useTablePagination';
import type { TableProps, TableRowAction } from './types';

export type { TableAlign, TableField, TablePaginationState, TableProps, TableRowAction, TableRowActionVariant } from './types';

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function TablePagination<TData>({ table, options }: { table: ReturnType<typeof useReactTable<TData>>; options: number[] }) {
    const { pageIndex, pageSize } = table.getState().pagination;
    const pageCount = table.getPageCount();
    return <PaginationBar aria-label="Paginação da tabela" data-print-hidden="true">
        <span>Página {pageCount ? pageIndex + 1 : 0} de {pageCount}</span>
        <label>Linhas por página <select value={pageSize} onChange={(event) => table.setPageSize(Number(event.target.value))}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
        <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Anterior</button>
        <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Próxima</button>
    </PaginationBar>;
}

export function Table<TData>({
    data, fields, title = 'Tabela', description = 'Selecione acima os campos que deseja visualizar.', emptyMessage = 'Nenhum registro encontrado.',
    showHeader = true, showColumnSelector = true, compact = false, columnVisibility: controlledColumnVisibility, onColumnVisibilityChange,
    onVisibleColumnsChange, rowAction, rowActions, selectable = false, isRowSelected, isRowSelectionDisabled, onToggleRowSelection,
    allRowsSelected = false, onToggleAllRows, pagination: controlledPagination, onPaginationChange, pageCount, manualPagination = false,
    showPagination = false, pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    onRowClick, isRowHighlighted,
}: TableProps<TData>) {
    const { columnVisibility, updateColumnVisibility } = useTableColumnVisibility({ fields, controlledVisibility: controlledColumnVisibility, onChange: onColumnVisibilityChange });
    const paginationEnabled = showPagination || controlledPagination !== undefined || onPaginationChange !== undefined;
    const pagination = useTablePagination({ enabled: paginationEnabled, pagination: controlledPagination, onChange: onPaginationChange });

    const columns = useMemo<ColumnDef<TData>[]>(() => {
        const fieldColumns: ColumnDef<TData>[] = fields.map((field) => ({
            id: field.id, accessorKey: field.accessorKey ? String(field.accessorKey) : undefined, accessorFn: field.accessorFn,
            enableHiding: field.canHide ?? true, header: () => formatColumnHeader(field.header),
            cell: (info) => field.cell ? field.cell(info.getValue(), info.row.original) : renderFallbackValue(info.getValue()),
            meta: { align: getCellAlignment(field), width: field.width },
        }));
        const selectionColumn: ColumnDef<TData> | null = selectable ? {
            id: '__selection__', enableHiding: false, meta: { align: 'center', width: '3rem' },
            header: () => <SelectionCheckbox type="checkbox" aria-label="Selecionar todos os registros desta página" checked={allRowsSelected} onChange={(event) => onToggleAllRows?.(event.target.checked)} />,
            cell: (info) => <SelectionCheckbox type="checkbox" aria-label="Selecionar registro" checked={isRowSelected?.(info.row.original) ?? false} disabled={isRowSelectionDisabled?.(info.row.original) ?? false} onChange={(event) => onToggleRowSelection?.(info.row.original, event.target.checked)} />,
        } : null;
        const actions: TableRowAction<TData>[] = [...(rowActions ?? []), ...(rowAction ? [{ label: rowAction.label ?? 'Visualizar', icon: <FiSearch size={16} />, getTitle: rowAction.getTitle, onClick: rowAction.onClick }] : [])];
        const baseColumns = selectionColumn ? [selectionColumn, ...fieldColumns] : fieldColumns;
        if (!actions.length) return baseColumns;
        return [...baseColumns, {
            id: '__row_action__', enableHiding: false, header: () => formatColumnHeader(actions.length > 1 ? 'Ações' : actions[0].label),
            meta: { align: 'center', width: `max(5.5rem, calc(${actions.length} * 2.75rem + var(--space-lg)))` },
            cell: (info) => <ActionCellWrap>{actions.filter((action) => !action.hidden?.(info.row.original)).map((action) => {
                const linha = info.row.original;
                const actionTitle = action.getTitle?.(linha) ?? action.label;
                const icone = typeof action.icon === 'function' ? action.icon(linha) : action.icon;
                return <ActionButton key={action.label} type="button" title={actionTitle} aria-label={actionTitle} disabled={action.disabled?.(linha) ?? false} $variant={action.variant} onClick={(evento) => { evento.stopPropagation(); action.onClick(linha); }}>{icone}</ActionButton>;
            })}</ActionCellWrap>,
        }];
    }, [allRowsSelected, fields, isRowSelected, isRowSelectionDisabled, onToggleAllRows, onToggleRowSelection, rowAction, rowActions, selectable]);

    const table = useReactTable({
        data, columns,
        state: { columnVisibility, ...(paginationEnabled ? { pagination: pagination.pagination } : {}) },
        onColumnVisibilityChange: updateColumnVisibility,
        ...(paginationEnabled ? { onPaginationChange: pagination.onPaginationChange } : {}),
        getCoreRowModel: getCoreRowModel(),
        ...(paginationEnabled && !manualPagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
        ...(manualPagination ? { manualPagination: true, pageCount } : {}),
    });

    useEffect(() => { if (onVisibleColumnsChange) onVisibleColumnsChange(table.getVisibleLeafColumns().map((column) => column.id)); }, [columnVisibility, onVisibleColumnsChange, table]);

    const normalizedPageSizeOptions = useMemo(() => [...new Set([...pageSizeOptions, (pagination.pagination as PaginationState).pageSize])].sort((first, second) => first - second), [pageSizeOptions, pagination.pagination]);

    return <>
        {showHeader && showColumnSelector && <ConfigSlot><ConfigTable fields={fields} columnVisibility={columnVisibility} onColumnVisibilityChange={updateColumnVisibility} /></ConfigSlot>}
        <TableView table={table} title={title} description={description} emptyMessage={emptyMessage} showHeader={showHeader} compact={compact} onRowClick={onRowClick} isRowHighlighted={isRowHighlighted} footer={paginationEnabled && showPagination ? <TablePagination table={table} options={normalizedPageSizeOptions} /> : undefined} />
    </>;
}
