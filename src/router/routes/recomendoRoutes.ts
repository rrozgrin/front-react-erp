import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const RecomendoPage = lazyNamed(() => import('../../features/recomendo'), 'RecomendoPage');

export const recomendoRoutes: PrivateRoute[] = [
    { path: '/recomendo', Page: RecomendoPage },
];
