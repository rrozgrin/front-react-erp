import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const WhatsappMarketingDashboardPage = lazyNamed(
    () => import('../../features/whatsapp-marketing'),
    'WhatsappMarketingDashboardPage'
);
const WhatsappMarketingListasPage = lazyNamed(
    () => import('../../features/whatsapp-marketing'),
    'WhatsappMarketingListasPage'
);
const WhatsappMarketingCampanhaPage = lazyNamed(
    () => import('../../features/whatsapp-marketing'),
    'WhatsappMarketingCampanhaPage'
);
const WhatsappMarketingResultadosPage = lazyNamed(
    () => import('../../features/whatsapp-marketing'),
    'WhatsappMarketingResultadosPage'
);

export const whatsappMarketingRoutes: PrivateRoute[] = [
    { path: '/whatsapp', Page: WhatsappMarketingDashboardPage },
    { path: '/whatsapp/listas', crumbTo: '/whatsapp', Page: WhatsappMarketingListasPage },
    { path: '/whatsapp/campanha', crumbTo: '/whatsapp', Page: WhatsappMarketingCampanhaPage },
    { path: '/whatsapp/resultados', crumbTo: '/whatsapp', Page: WhatsappMarketingResultadosPage },
];
