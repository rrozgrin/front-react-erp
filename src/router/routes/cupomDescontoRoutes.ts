import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const CupomDescontoPage = lazyNamed(
    () => import('../../features/cupom-desconto/pages/CupomDescontoPage'),
    'CupomDescontoPage'
);
const RelatorioCupomDescontoPage = lazyNamed(
    () => import('../../features/cupom-desconto/pages/RelatorioCupomDescontoPage'),
    'RelatorioCupomDescontoPage'
);

export const cupomDescontoRoutes: PrivateRoute[] = [
    { path: '/cupom_desconto', Page: CupomDescontoPage },
    { path: '/cupom_desconto/relatorio', crumbTo: '/cupom_desconto', Page: RelatorioCupomDescontoPage },
];
