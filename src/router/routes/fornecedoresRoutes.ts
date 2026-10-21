import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const FornecedoresPage = lazyNamed(
  () => import('../../features/fornecedores/pages/Cadastro/FornecedoresPage'),
  'FornecedoresPage'
);
const RelatorioFornecedoresPage = lazyNamed(
  () => import('../../features/fornecedores/pages/Relatorios/RelatorioFornecedoresPage'),
  'RelatorioFornecedoresPage'
);
const FornecedoresExcluidosPage = lazyNamed(
  () => import('../../features/fornecedores/pages/Listas/FornecedoresExcluidosPage'),
  'FornecedoresExcluidosPage'
);

export const fornecedoresRoutes: PrivateRoute[] = [
  { path: '/fornecedores', Page: FornecedoresPage },
  { path: '/fornecedores-relatorios', Page: RelatorioFornecedoresPage },
  { path: '/fornecedores-excluidos', Page: FornecedoresExcluidosPage },
];
