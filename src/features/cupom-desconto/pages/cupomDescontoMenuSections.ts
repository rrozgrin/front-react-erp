import type { PageLayoutMenuSection } from '../../../common/components/PageLayout';

export const cupomDescontoMenuSections: PageLayoutMenuSection[] = [
    {
        titulo: 'Cupom de Desconto',
        paginas: [
            { titulo: 'Cupons de Desconto', href: '/cupom_desconto' },
            { titulo: 'Relatórios', href: '/cupom_desconto/relatorio' },
        ],
    },
];
