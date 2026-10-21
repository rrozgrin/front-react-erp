import React from 'react';
import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const RecuperePage = lazyNamed(() => import('../../features/recupere'), 'RecuperePage');

export const recupereRoutes: PrivateRoute[] = [
    { path: '/recupere', Page: () => React.createElement(RecuperePage) },
    { path: '/recupere/excluidos', Page: () => React.createElement(RecuperePage, { mode: 'excluidos' }) },
    { path: '/recupere/relatorio', Page: () => React.createElement(RecuperePage, { mode: 'relatorio' }) },
];
