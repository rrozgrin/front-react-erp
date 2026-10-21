import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const Food99 = lazyNamed(() => import('../../features/food99/pages/Food99Page'), 'Food99');
const Food99Cardapio99FoodPage = lazyNamed(() => import('../../features/food99/pages/Cardapio99Food/Food99Cardapio99FoodPage'), 'Food99Cardapio99FoodPage');
const Food99CatalogoPage = lazyNamed(() => import('../../features/food99/pages/Cardapio99Food/Catalogo/Food99CatalogoPage'), 'Food99CatalogoPage');
const Food99ItensCatalogoPage = lazyNamed(() => import('../../features/food99/pages/Cardapio99Food/Itens/Food99ItensCatalogoPage'), 'Food99ItensCatalogoPage');
const Food99AutenticacaoPage = lazyNamed(() => import('../../features/food99/pages/Auth/Food99AuthPage'), 'Food99AutenticacaoPage');
const Food99PedidosPage = lazyNamed(() => import('../../features/food99/pages/Orders/Food99OrdersPage'), 'Food99PedidosPage');
const Food99ConfiguracoesPage = lazyNamed(() => import('../../features/food99/shared/Food99PlaceholderPage'), 'Food99ConfiguracoesPage');

export const Food99Routes: PrivateRoute[] = [
    { path: '/food99', Page: Food99 },
    { path: '/food99/cardapio', crumbTo: '/food99', Page: Food99Cardapio99FoodPage },
    { path: '/food99/cardapio/catalogo', crumbTo: '/food99/cardapio', Page: Food99CatalogoPage },
    { path: '/food99/cardapio/itens', crumbTo: '/food99/cardapio', Page: Food99ItensCatalogoPage },
    { path: '/food99/catalogo', crumbTo: '/food99', Page: Food99Cardapio99FoodPage },
    { path: '/food99/catalogo/cardapio', crumbTo: '/food99/cardapio', Page: Food99Cardapio99FoodPage },
    { path: '/food99/catalogo/itens', crumbTo: '/food99/cardapio', Page: Food99ItensCatalogoPage },
    { path: '/food99/autenticacao', crumbTo: '/food99', Page: Food99AutenticacaoPage },
    { path: '/food99/pedidos', crumbTo: '/food99', Page: Food99PedidosPage },
    { path: '/food99/configuracoes', crumbTo: '/food99', Page: Food99ConfiguracoesPage },
];
