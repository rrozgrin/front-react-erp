import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const MapeamentoEntregaPage = lazyNamed(() => import('../../features/mapeamento-entrega/pages'), 'MapeamentoEntregaPage');

export const mapeamentoEntregaRoutes: PrivateRoute[] = [
    {
        path: '/mapeamentoentrega',
        Page: MapeamentoEntregaPage,
    },
];
