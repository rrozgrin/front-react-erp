import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const RegistroPage = lazyNamed(() => import('../../features/registro'), 'RegistroPage');
const ProtestoPage = lazyNamed(() => import('../../features/protesto'), 'ProtestoPage');

export const registroProtestoRoutes: PrivateRoute[] = [
    { path: '/registro', Page: RegistroPage },
    { path: '/protesto', Page: ProtestoPage },
];
