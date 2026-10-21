import type { PageLayoutMenuSection } from '../../../../common/components/PageLayout';

interface BuildTransportadorasMenuSectionsParams {
    onAddTransportadora?: () => void;
    onOpenImportarDados?: () => void;
}

export const buildTransportadorasMenuSections = ({
    onAddTransportadora,
    onOpenImportarDados,
}: BuildTransportadorasMenuSectionsParams = {}): PageLayoutMenuSection[] => [
    {
        titulo: 'Gestão de Transportadoras',
        paginas: [
            onAddTransportadora
                ? { titulo: 'Cadastro de Transportadoras', action: onAddTransportadora }
                : { titulo: 'Cadastro de Transportadoras', href: '/transportadoras?modal=add-transportadora' },
            {
                titulo: 'Relatórios',
                href: '/transportadoras-relatorios',
                children: [
                    { titulo: 'Listar Transportadoras', href: '/transportadoras-relatorios' },
                ],
            },
            { titulo: 'Transportadoras Excluídas', href: '/transportadoras-excluidos' },
            onOpenImportarDados
                ? { titulo: 'Importar Dados', action: onOpenImportarDados }
                : { titulo: 'Importar Dados', href: '/transportadoras' },
        ],
    },
];
