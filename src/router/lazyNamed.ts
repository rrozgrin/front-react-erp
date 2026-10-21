import { lazy, type ComponentType } from 'react';

export const lazyNamed = (
  factory: () => Promise<Record<string, ComponentType<any>>>,
  exportName: string
) =>
  lazy(async () => {
    const module = await factory();
    return { default: module[exportName] };
  });
