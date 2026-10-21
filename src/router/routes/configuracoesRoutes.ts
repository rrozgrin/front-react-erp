import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const ConfiguracoesSistemaPage = lazyNamed(
    () => import('../../features/configuracoes'),
    'ConfiguracoesSistemaPage'
);

export const configuracoesRoutes: PrivateRoute[] = [
    { path: '/configuracoes', Page: ConfiguracoesSistemaPage },
];
