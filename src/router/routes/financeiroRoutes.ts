import React from 'react';
import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const PagamentoParceladoPage = lazyNamed(
    () => import('../../features/financeiro/pages/PagamentosParcelados/PagamentoParceladoPages'),
    'PagamentoParceladoPage'
);
const RelatoriosFinanceirosPage = lazyNamed(
    () => import('../../features/financeiro/pages/RelatoriosFinanceiros/RelatoriosFinanceirosPage'),
    'RelatoriosFinanceirosPage'
);

const paymentRoutes = [
    { legacy: '/vendasboleto', basePath: '/financeiro/boleto', kind: 'boleto' },
    { legacy: '/vendascrediario', basePath: '/financeiro/crediario', kind: 'crediario' },
    { legacy: '/vendascarne', basePath: '/financeiro/carne', kind: 'carne' },
    { legacy: '/vendaspromissoria', basePath: '/financeiro/promissoria', kind: 'promissoria' },
] as const;

export const financeiroRoutes: PrivateRoute[] = paymentRoutes.flatMap(({ legacy, basePath, kind }) => [
    { path: legacy, Page: () => React.createElement(PagamentoParceladoPage, { kind }) },
    { path: basePath, Page: () => React.createElement(PagamentoParceladoPage, { kind }) },
    { path: `${basePath}/excluidos`, Page: () => React.createElement(PagamentoParceladoPage, { kind, mode: 'excluidos' }) },
    { path: `${basePath}/relatorio`, Page: () => React.createElement(PagamentoParceladoPage, { kind, mode: 'relatorio' }) },
]).concat([
    { path: '/relatoriosfinanceiros', Page: () => React.createElement(RelatoriosFinanceirosPage, { tipo: 'recebidas' }) },
    { path: '/relatoriosfinanceiros/contas-pagar', Page: () => React.createElement(RelatoriosFinanceirosPage, { tipo: 'pagar' }) },
    { path: '/relatoriosfinanceiros/contas-pagas', Page: () => React.createElement(RelatoriosFinanceirosPage, { tipo: 'pagas' }) },
    { path: '/relatoriosfinanceiros/contas-receber', Page: () => React.createElement(RelatoriosFinanceirosPage, { tipo: 'receber' }) },
    { path: '/relatoriosfinanceiros/contas-recebidas', Page: () => React.createElement(RelatoriosFinanceirosPage, { tipo: 'recebidas' }) },
]);
