import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const TransportadorasPage = lazyNamed(
  () => import('../../features/transportadoras/pages/Cadastro/TransportadorasPage'),
  'TransportadorasPage'
);
const RelatorioTransportadorasPage = lazyNamed(
  () => import('../../features/transportadoras/pages/Relatorios/RelatorioTransportadorasPage'),
  'RelatorioTransportadorasPage'
);
const TransportadorasExcluidosPage = lazyNamed(
  () => import('../../features/transportadoras/pages/Listas/TransportadorasExcluidosPage'),
  'TransportadorasExcluidosPage'
);

export const transportadorasRoutes: PrivateRoute[] = [
  { path: '/transportadoras', Page: TransportadorasPage },
  { path: '/transportadoras-relatorios', Page: RelatorioTransportadorasPage },
  { path: '/transportadoras-excluidos', Page: TransportadorasExcluidosPage },
];
