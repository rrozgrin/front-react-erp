import type { PageLayoutMenuSection } from '../../../../common/components/PageLayout';

export const assistenciaTecnicaMenuSections: PageLayoutMenuSection[] = [
    {
        titulo: 'Assistência Técnica',
        paginas: [
            { titulo: 'Últimas assistências cadastradas', href: '/assistenciatecnica' },
            { titulo: 'Relatório', href: '/assistenciatecnica/relatorio' },
            { titulo: 'Histórico por nº de série', href: '/assistenciatecnica/historico-serie' },
            { titulo: 'Listar Desativados', href: '/assistenciatecnica/desativados' },
            { titulo: 'Listar Concluídos', href: '/assistenciatecnica/concluidos' },
            { titulo: 'Listar excluídos', href: '/assistenciatecnica/excluidos' },
            { titulo: 'Observações Padrão', href: '/assistenciatecnica/observacoes-padrao' },
        ],
    },
];
