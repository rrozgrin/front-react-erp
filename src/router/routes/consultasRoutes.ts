import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const ConsultaPessoaFisicaPage = lazyNamed(
    () => import('../../features/consultas/pages/PessoaFisica'),
    'ConsultaPessoaFisicaPage'
);
const ConsultaPessoaJuridicaPage = lazyNamed(
    () => import('../../features/consultas/pages/PessoaJuridica'),
    'ConsultaPessoaJuridicaPage'
);
const ConsultaChequesPage = lazyNamed(
    () => import('../../features/consultas/pages/Cheques'),
    'ConsultaChequesPage'
);
const ConsultaVeiculosPage = lazyNamed(
    () => import('../../features/consultas/pages/Veiculos'),
    'ConsultaVeiculosPage'
);

export const consultasRoutes: PrivateRoute[] = [
    { path: '/consultapf', Page: ConsultaPessoaFisicaPage },
    { path: '/consultapj', Page: ConsultaPessoaJuridicaPage },
    { path: '/consultacheques', Page: ConsultaChequesPage },
    { path: '/consultaveiculares', Page: ConsultaVeiculosPage },
];
