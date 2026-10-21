import type { ComponentType } from 'react';

export type PrivateRoute = {
  path: string;
  crumbTo?: string;
  Page: ComponentType;
};

export type PublicRoute = {
  path: string;
  label: string;
  Page: ComponentType;
};
