import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const ConfiguracaoCatalogoPage = lazyNamed(
    () => import('../../features/catalogo/pages/Catalogo/ConfiguracaoCatalogoPage'),
    'ConfiguracaoCatalogoPage'
);

export const catalogoRoutes: PrivateRoute[] = [
    { path: '/catalogo', Page: ConfiguracaoCatalogoPage },
];
