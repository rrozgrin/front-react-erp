import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';
const VendaFinalizadaFrenteCaixaPage = lazyNamed(
    () => import('../../features/frente-caixa/pages/VendaFinalizada/VendaFinalizadaFrenteCaixaPage'),
    'VendaFinalizadaFrenteCaixaPage',
);

const FrenteCaixaPage = lazyNamed(() => import('../../features/frente-caixa/pages/Principal/FrenteCaixaPage'), 'FrenteCaixaPage');
const PedidoPage = lazyNamed(() => import('../../features/pre-venda/pages/Pedido/PedidoPage'), 'PedidoPage');
const OrcamentosPage = lazyNamed(() => import('../../features/pre-venda/pages/Orcamentos/OrcamentosPage'), 'OrcamentosPage');
const OrdemServicoPage = lazyNamed(() => import('../../features/pre-venda/pages/OrdemServico/OrdemServicoPage'), 'OrdemServicoPage');
const VendaConsignadaPage = lazyNamed(() => import('../../features/pre-venda/pages/VendaConsignada/VendaConsignadaPage'), 'VendaConsignadaPage');


export const frenteCaixaRoutes: PrivateRoute[] = [
    { path: '/pedido', Page: PedidoPage },
    { path: '/orcamentos', Page: OrcamentosPage },
    { path: '/ordemdeservico', Page: OrdemServicoPage },
    { path: '/vendaconsignada', Page: VendaConsignadaPage },
    { path: '/frente-caixa', Page: FrenteCaixaPage },
    { path: '/frente-caixa/finalizadaFrenteCaixa', Page: VendaFinalizadaFrenteCaixaPage },
    { path: '/frente-caixa/venda-finalizada', Page: VendaFinalizadaFrenteCaixaPage },
];
