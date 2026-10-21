import { useCallback, useMemo, useState } from 'react';
import type { OnChangeFn, PaginationState } from '@tanstack/react-table';
import type { TablePaginationState } from './types';

interface UseTablePaginationParams {
    pagination?: TablePaginationState;
    onChange?: (pagination: TablePaginationState) => void;
    enabled: boolean;
}

export function useTablePagination({ pagination: controlledPagination, onChange, enabled }: UseTablePaginationParams) {
    const [internalPagination, setInternalPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 25 });
    const pagination = controlledPagination ?? internalPagination;

    const onPaginationChange = useCallback<OnChangeFn<PaginationState>>((updater) => {
        const next = typeof updater === 'function' ? updater(pagination) : updater;
        if (next.pageIndex === pagination.pageIndex && next.pageSize === pagination.pageSize) {
            return;
        }
        if (controlledPagination === undefined) {
            setInternalPagination(next);
        }
        onChange?.(next);
    }, [controlledPagination, onChange, pagination]);

    return useMemo(() => ({
        enabled,
        pagination,
        onPaginationChange,
    }), [enabled, onPaginationChange, pagination]);
}
