import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const ClientesPage = lazyNamed(() => import('../../features/clientes/pages/Cadastro/ClientesPage'), 'ClientesPage');
const ClientesInativosPage = lazyNamed(
  () => import('../../features/clientes/pages/Listas/ClientesInativosPage'),
  'ClientesInativosPage'
);
const ClientesExcluidosPage = lazyNamed(
  () => import('../../features/clientes/pages/Listas/ClientesExcluidosPage'),
  'ClientesExcluidosPage'
);
const ClientesLojaVirtualPage = lazyNamed(
  () => import('../../features/clientes/pages/Listas/ClientesLojaVirtualPage'),
  'ClientesLojaVirtualPage'
);
const ClientesQueNaoCompramPage = lazyNamed(
  () => import('../../features/clientes/pages/Relatorios/ClientesQueNaoCompramPage'),
  'ClientesQueNaoCompramPage'
);
const ClientesQueMaisCompramPage = lazyNamed(
  () => import('../../features/clientes/pages/Relatorios/ClientesQueMaisCompramPage'),
  'ClientesQueMaisCompramPage'
);
const ClientesPorLotePage = lazyNamed(
  () => import('../../features/clientes/pages/Lote/ClientesPorLotePage'),
  'ClientesPorLotePage'
);
const BaixarContaCorrente = lazyNamed(
  () => import('../../features/clientes/pages/Financeiro/BaixarContaCorrentePage'),
  'BaixarContaCorrente'
);
const RelatorioClientesPage = lazyNamed(
  () => import('../../features/clientes/pages/Relatorios/RelatorioClientesPage'),
  'RelatorioClientesPage'
);
const RelatorioOcorrencias = lazyNamed(
  () => import('../../features/clientes/pages/Ocorrencias/RelatorioOcorrenciasPage'),
  'RelatorioOcorrencias'
);
const EnviarMensagemAniversario = lazyNamed(
  () => import('../../features/clientes/pages/Aniversario/EnviarMensagemAniversario'),
  'EnviarMensagemAniversario'
);
const RelatorioContaCorrente = lazyNamed(
  () => import('../../features/clientes/pages/Financeiro/RelatorioContaCorrentePage'),
  'RelatorioContaCorrente'
);
const HistoricoAlteracoes = lazyNamed(
  () => import('../../features/clientes/pages/Historico/HistoricoAlteracoesPage'),
  'HistoricoAlteracoes'
);
const TiposDesconto = lazyNamed(
  () => import('../../features/clientes/pages/TiposDesconto/TiposDescontoPage'),
  'TiposDesconto'
);
const FinanceiroClientePage = lazyNamed(
  () => import('../../features/clientes/pages/Financeiro/FinanceiroClientePage'),
  'FinanceiroClientePage'
);
const ContaCorrenteClientePage = lazyNamed(
  () => import('../../features/clientes/pages/Financeiro/ContaCorrenteClientePage'),
  'ContaCorrenteClientePage'
);
const VisualizarClientesPage = lazyNamed(
  () => import('../../features/clientes/pages/Cadastro/VisualizarClientesPage'),
  'VisualizarClientesPage'
);

const DebitosPendentesPage = lazyNamed(
  () => import('../../features/clientes/pages/Financeiro/DebitosPendentesPage'),
  'DebitosPendentesPage'
);

const VisualizarOcorrenciasPage = lazyNamed(
  () => import('../../features/clientes/pages/Ocorrencias/OcorrenciasPage'),
  'default'
);

export const clientesRoutes: PrivateRoute[] = [
  { path: '/clientes', Page: ClientesPage },
  { path: '/clientes-inativos', Page: ClientesInativosPage },
  { path: '/clientes-excluidos', Page: ClientesExcluidosPage },
  { path: '/clientes-loja-virtual', Page: ClientesLojaVirtualPage },
  { path: '/clientes-que-nao-compram', Page: ClientesQueNaoCompramPage },
  { path: '/clientes-que-mais-compram', Page: ClientesQueMaisCompramPage },
  { path: '/clientes-por-lote', Page: ClientesPorLotePage },
  { path: '/mensagem-aniversario', Page: EnviarMensagemAniversario },
  { path: '/relatorio-clientes', Page: RelatorioClientesPage },
  { path: '/relatorio-ocorrencias', Page: RelatorioOcorrencias },
  { path: '/relatorio-conta-corrente', Page: RelatorioContaCorrente },
  { path: '/baixar-conta-corrente', Page: BaixarContaCorrente },
  { path: '/historico-alteracoes', Page: HistoricoAlteracoes },
  { path: '/tipos-desconto', Page: TiposDesconto },
  { path: '/clientes/visualizar/:id', crumbTo: '/clientes', Page: VisualizarClientesPage },
  { path: '/clientes/visualizar/:id/financeiro', crumbTo: '/clientes', Page: FinanceiroClientePage },
  { path: '/clientes/visualizar/:id/conta-corrente', crumbTo: '/clientes', Page: ContaCorrenteClientePage },
  { path: '/clientes/visualizar/:id/debitos-pendentes', crumbTo: '/clientes', Page: DebitosPendentesPage },
  { path: '/clientes/visualizar/:id/ocorrencias', crumbTo: '/clientes', Page: VisualizarOcorrenciasPage },
];
