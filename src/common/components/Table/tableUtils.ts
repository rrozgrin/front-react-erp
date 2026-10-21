import type { VisibilityState } from '@tanstack/react-table';
import type React from 'react';
import type { TableAlign, TableField } from './types';

export function buildVisibilityState<TData>(fields: TableField<TData>[]): VisibilityState {
    return fields.reduce<VisibilityState>((visibility, field) => {
        visibility[field.id] = field.defaultVisible ?? true;
        return visibility;
    }, {});
}

export function getCellAlignment<TData>(field: TableField<TData>): TableAlign {
    return field.align ?? 'left';
}

export function renderFallbackValue(value: unknown): React.ReactNode {
    return value === null || value === undefined || value === '' ? '--' : String(value);
}

export function formatColumnHeader(header: string): string {
    const lowerHeader = header.toLocaleLowerCase('pt-BR');
    const firstLetterIndex = lowerHeader.search(/\p{L}/u);

    return firstLetterIndex === -1
        ? lowerHeader
        : `${lowerHeader.slice(0, firstLetterIndex)}${lowerHeader.charAt(firstLetterIndex).toLocaleUpperCase('pt-BR')}${lowerHeader.slice(firstLetterIndex + 1)}`;
}

export function visibilityStatesAreEqual(current: VisibilityState, next: VisibilityState): boolean {
    const keys = new Set([...Object.keys(current), ...Object.keys(next)]);
    return [...keys].every((key) => current[key] === next[key]);
}
