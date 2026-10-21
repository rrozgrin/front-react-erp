import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';
import { clientesRoutes } from './clientesRoutes';
import { fornecedoresRoutes } from './fornecedoresRoutes';
import { funcionariosRoutes } from './funcionariosRoutes';
import { produtosRoutes } from './produtosRoutes';
import { servicosRoutes } from './servicosRoutes';
import { frenteCaixaRoutes } from './frenteCaixaRoutes';
import { Food99Routes } from './food99Routes';
import { assistenciaTecnicaRoutes } from './assistenciaTecnicaRoutes';
import { recomendoRoutes } from './recomendoRoutes';
import { financeiroRoutes } from './financeiroRoutes';
import { dadosEmpresariaisRoutes } from './dadosEmpresariaisRoutes';
import { transportadorasRoutes } from './transportadorasRoutes';
import { recupereRoutes } from './recupereRoutes';
import { registroProtestoRoutes } from './registroProtestoRoutes';
import { whatsappMarketingRoutes } from './whatsappMarketingRoutes';
import { cupomDescontoRoutes } from './cupomDescontoRoutes';
import { mapeamentoEntregaRoutes } from './mapeamentoEntregaRoutes';
import { malaDiretaRoutes } from './malaDiretaRoutes';
import { consultasRoutes } from './consultasRoutes';
import { configuracoesRoutes } from './configuracoesRoutes';
import { catalogoRoutes } from './catalogoRoutes';

const Home = lazyNamed(() => import('../../features/home/pages'), 'Home');
const ArquivosPastasPage = lazyNamed(() => import('../../features/arquivos-documentos/pages/ArquivosPastas'), 'ArquivosPastasPage');

export const privateRoutes: PrivateRoute[] = [
    { path: '/home', Page: Home },
    { path: '/arquivos', Page: ArquivosPastasPage },
    ...clientesRoutes,
    ...dadosEmpresariaisRoutes,
    ...fornecedoresRoutes,
    ...transportadorasRoutes,
    ...funcionariosRoutes,
    ...produtosRoutes,
    ...servicosRoutes,
    ...assistenciaTecnicaRoutes,
    ...frenteCaixaRoutes,
    ...mapeamentoEntregaRoutes,
    ...consultasRoutes,
    ...recomendoRoutes,
    ...recupereRoutes,
    ...registroProtestoRoutes,
    ...financeiroRoutes,
    ...whatsappMarketingRoutes,
    ...cupomDescontoRoutes,
    ...catalogoRoutes,
    ...malaDiretaRoutes,
    ...configuracoesRoutes,
    ...Food99Routes,
];
