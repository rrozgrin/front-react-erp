import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const DadosEmpresariaisPage = lazyNamed(
    () => import('../../features/dados-empresariais/pages/DadosEmpresariaisPage'),
    'DadosEmpresariaisPage'
);

export const dadosEmpresariaisRoutes: PrivateRoute[] = [
    { path: '/dadosempresariais', Page: DadosEmpresariaisPage },
];
