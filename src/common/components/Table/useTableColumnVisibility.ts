import { useCallback, useEffect, useRef, useState } from 'react';
import type { VisibilityState } from '@tanstack/react-table';
import type { TableField } from './types';
import { buildVisibilityState, visibilityStatesAreEqual } from './tableUtils';

interface UseTableColumnVisibilityParams<TData> {
    fields: TableField<TData>[];
    controlledVisibility?: VisibilityState;
    onChange?: (visibility: VisibilityState) => void;
}

export function useTableColumnVisibility<TData>({
    fields,
    controlledVisibility,
    onChange,
}: UseTableColumnVisibilityParams<TData>) {
    const [internalVisibility, setInternalVisibility] = useState<VisibilityState>(() => buildVisibilityState(fields));
    const visibility = controlledVisibility ?? internalVisibility;
    const visibilityRef = useRef(visibility);
    const isControlled = controlledVisibility !== undefined;

    useEffect(() => {
        visibilityRef.current = visibility;
    }, [visibility]);

    const updateVisibility = useCallback((updater: VisibilityState | ((current: VisibilityState) => VisibilityState)) => {
        const next = typeof updater === 'function' ? updater(visibilityRef.current) : updater;

        if (visibilityStatesAreEqual(visibilityRef.current, next)) {
            return;
        }

        visibilityRef.current = next;
        if (!isControlled) {
            setInternalVisibility(next);
        }
        onChange?.(next);
    }, [isControlled, onChange]);

    useEffect(() => {
        updateVisibility((current) => {
            const defaults = buildVisibilityState(fields);
            fields.forEach((field) => {
                if (field.id in current) {
                    defaults[field.id] = current[field.id];
                }
            });
            return defaults;
        });
    }, [fields, updateVisibility]);

    return { columnVisibility: visibility, updateColumnVisibility: updateVisibility };
}
