import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const AssistenciaTecnicaPage = lazyNamed(
    () => import('../../features/assistencia-tecnica/pages/AssistenciaTecnica/AssistenciaTecnicaPage'),
    'AssistenciaTecnicaPage'
);
const AssistenciaTecnicaRelatorioPage = lazyNamed(
    () => import('../../features/assistencia-tecnica/pages/AssistenciaTecnica/AssistenciaTecnicaSupportPages'),
    'AssistenciaTecnicaRelatorioPage'
);
const AssistenciaTecnicaHistoricoSeriePage = lazyNamed(
    () => import('../../features/assistencia-tecnica/pages/AssistenciaTecnica/AssistenciaTecnicaSupportPages'),
    'AssistenciaTecnicaHistoricoSeriePage'
);
const AssistenciaTecnicaDesativadosPage = lazyNamed(
    () => import('../../features/assistencia-tecnica/pages/AssistenciaTecnica/AssistenciaTecnicaSupportPages'),
    'AssistenciaTecnicaDesativadosPage'
);
const AssistenciaTecnicaConcluidosPage = lazyNamed(
    () => import('../../features/assistencia-tecnica/pages/AssistenciaTecnica/AssistenciaTecnicaSupportPages'),
    'AssistenciaTecnicaConcluidosPage'
);
const AssistenciaTecnicaExcluidosPage = lazyNamed(
    () => import('../../features/assistencia-tecnica/pages/AssistenciaTecnica/AssistenciaTecnicaSupportPages'),
    'AssistenciaTecnicaExcluidosPage'
);
const AssistenciaTecnicaObservacoesPadraoPage = lazyNamed(
    () => import('../../features/assistencia-tecnica/pages/AssistenciaTecnica/AssistenciaTecnicaSupportPages'),
    'AssistenciaTecnicaObservacoesPadraoPage'
);

export const assistenciaTecnicaRoutes: PrivateRoute[] = [
    { path: '/assistenciatecnica', Page: AssistenciaTecnicaPage },
    { path: '/assistenciatecnica/relatorio', crumbTo: '/assistenciatecnica', Page: AssistenciaTecnicaRelatorioPage },
    { path: '/assistenciatecnica/historico-serie', crumbTo: '/assistenciatecnica', Page: AssistenciaTecnicaHistoricoSeriePage },
    { path: '/assistenciatecnica/desativados', crumbTo: '/assistenciatecnica', Page: AssistenciaTecnicaDesativadosPage },
    { path: '/assistenciatecnica/concluidos', crumbTo: '/assistenciatecnica', Page: AssistenciaTecnicaConcluidosPage },
    { path: '/assistenciatecnica/excluidos', crumbTo: '/assistenciatecnica', Page: AssistenciaTecnicaExcluidosPage },
    { path: '/assistenciatecnica/observacoes-padrao', crumbTo: '/assistenciatecnica', Page: AssistenciaTecnicaObservacoesPadraoPage },
];
