import React from 'react';
import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const FuncionariosPage = lazyNamed(
    () => import('../../features/funcionarios/pages/Cadastro/FuncionariosPage'),
    'FuncionariosPage'
);
const RelatorioFuncionariosPage = lazyNamed(
    () => import('../../features/funcionarios/pages/Relatorios/RelatorioFuncionariosPage'),
    'RelatorioFuncionariosPage'
);
const FuncionariosExcluidosPage = lazyNamed(
    () => import('../../features/funcionarios/pages/Listas/FuncionariosExcluidosPage'),
    'FuncionariosExcluidosPage'
);
const FuncionariosSimpleReportPage = lazyNamed(
    () => import('../../features/funcionarios/pages/Relatorios/FuncionariosSimpleReportPage'),
    'FuncionariosSimpleReportPage'
);
const RelatorioFuncionariosImpressaoPage = lazyNamed(
    () => import('../../features/funcionarios/pages/Relatorios/RelatorioFuncionariosImpressaoPage'),
    'RelatorioFuncionariosImpressaoPage'
);
const VisualizarFuncionarioPage = lazyNamed(
    () => import('../../features/funcionarios/pages/Cadastro/VisualizarFuncionarioPage'),
    'VisualizarFuncionarioPage'
);
const VisualizarFuncionarioSupportPage = lazyNamed(
    () => import('../../features/funcionarios/pages/Cadastro/VisualizarFuncionarioSupportPages'),
    'VisualizarFuncionarioSupportPage'
);

export const funcionariosRoutes: PrivateRoute[] = [
    { path: '/funcionarios', Page: FuncionariosPage },
    { path: '/funcionarios/visualizar/:id', Page: VisualizarFuncionarioPage },
    {
        path: '/funcionarios/visualizar/:id/ocorrencias',
        Page: () => React.createElement(VisualizarFuncionarioSupportPage, { type: 'ocorrencias' }),
    },
    {
        path: '/funcionarios/visualizar/:id/documentos',
        Page: () => React.createElement(VisualizarFuncionarioSupportPage, { type: 'documentos' }),
    },
    {
        path: '/funcionarios/visualizar/:id/consulta-credito',
        Page: () => React.createElement(VisualizarFuncionarioSupportPage, { type: 'consultaCredito' }),
    },
    {
        path: '/funcionarios/visualizar/:id/boleto',
        Page: () => React.createElement(VisualizarFuncionarioSupportPage, { type: 'boleto' }),
    },
    {
        path: '/funcionarios/visualizar/:id/clientes',
        Page: () => React.createElement(VisualizarFuncionarioSupportPage, { type: 'clientes' }),
    },
    {
        path: '/funcionarios/visualizar/:id/vale-compra',
        Page: () => React.createElement(VisualizarFuncionarioSupportPage, { type: 'valeCompra' }),
    },
    {
        path: '/funcionarios/visualizar/:id/comissao-produtos',
        Page: () => React.createElement(VisualizarFuncionarioSupportPage, { type: 'comissaoProdutos' }),
    },
    {
        path: '/funcionarios/visualizar/:id/agendamentos',
        Page: () => React.createElement(VisualizarFuncionarioSupportPage, { type: 'agendamentos' }),
    },
    { path: '/funcionarios/relatorios', Page: RelatorioFuncionariosPage },
    { path: '/funcionarios/relatorios/impressao', Page: RelatorioFuncionariosImpressaoPage },
    { path: '/funcionarios/excluidos', Page: FuncionariosExcluidosPage },
    {
        path: '/funcionarios/relatorio-comissao',
        Page: () => React.createElement(FuncionariosSimpleReportPage, { title: 'Relatório de Comissão', type: 'comissao' }),
    },
    {
        path: '/funcionarios/minhas-comissoes',
        Page: () => React.createElement(FuncionariosSimpleReportPage, { title: 'Ver minhas comissões', type: 'comissao' }),
    },
    {
        path: '/funcionarios/relatorio-comissao-auxiliares',
        Page: () => React.createElement(FuncionariosSimpleReportPage, { title: 'Relatório de Comissão Auxiliares', type: 'auxiliares' }),
    },
    {
        path: '/funcionarios/relatorio-vale-presente',
        Page: () => React.createElement(FuncionariosSimpleReportPage, { title: 'Relatório de vale presente', type: 'valePresente' }),
    },
    {
        path: '/funcionarios/setores',
        Page: () => React.createElement(FuncionariosSimpleReportPage, { title: 'Adicionar Setor', type: 'setores' }),
    },
];
