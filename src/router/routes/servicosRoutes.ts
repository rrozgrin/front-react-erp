import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const ServicosPage = lazyNamed(() => import('../../features/servicos/pages/Servicos/ServicosPage'), 'ServicosPage');
const ServicosClassificacaoPage = lazyNamed(
    () => import('../../features/servicos/pages/Servicos/ServicosClassificacaoPage'),
    'ServicosClassificacaoPage'
);
const ServicosRelatorioVendidosPage = lazyNamed(
    () => import('../../features/servicos/pages/Servicos/ServicosRelatorioVendidosPage'),
    'ServicosRelatorioVendidosPage'
);
const ServicosExcluidosPage = lazyNamed(
    () => import('../../features/servicos/pages/Servicos/ServicosExcluidosPage'),
    'ServicosExcluidosPage'
);
const VisualizarServicosPage = lazyNamed(
    () => import('../../features/servicos/pages/Servicos/VisualizarServicosPage'),
    'VisualizarServicosPage'
);

export const servicosRoutes: PrivateRoute[] = [
    { path: '/servicos', Page: ServicosPage },
    { path: '/servicos/classificacao', Page: ServicosClassificacaoPage },
    { path: '/servicos/relatorio/vendidos', Page: ServicosRelatorioVendidosPage },
    { path: '/servicos/excluidos', Page: ServicosExcluidosPage },
    { path: '/servicos/visualizar/:id', Page: VisualizarServicosPage },
];
