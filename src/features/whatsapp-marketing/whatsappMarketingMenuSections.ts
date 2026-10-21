import type { PageLayoutMenuSection } from '../../common/components/PageLayout';

export const whatsappMarketingMenuSections: PageLayoutMenuSection[] = [
    {
        titulo: 'WhatsApp Marketing',
        paginas: [
            { titulo: 'Início', href: '/whatsapp' },
            { titulo: 'Listas de contatos', href: '/whatsapp/listas' },
            { titulo: 'Criar campanha', href: '/whatsapp/campanha' },
            { titulo: 'Resultados', href: '/whatsapp/resultados' },
        ],
    },
];
