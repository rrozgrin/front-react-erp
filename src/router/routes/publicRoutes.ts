import { lazy } from 'react';
import type { PublicRoute } from '../types';

const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const SuportePage = lazy(() => import('../../features/auth/pages/SuportePage'));

export const publicRoutes: PublicRoute[] = [
  { path: '', label: 'Login', Page: LoginPage },
  { path: '/suporte', label: 'Suporte', Page: SuportePage },
];
