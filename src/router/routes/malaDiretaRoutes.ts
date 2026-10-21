import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const MalaDiretaNovosClientesPage = lazyNamed(
    () => import('../../features/mala-direta/pages'),
    'MalaDiretaNovosClientesPage'
);

export const malaDiretaRoutes: PrivateRoute[] = [
    { path: '/maladireta', Page: MalaDiretaNovosClientesPage },
];
