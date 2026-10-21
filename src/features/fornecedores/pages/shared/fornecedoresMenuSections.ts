import type { PageLayoutMenuSection } from '../../../../common/components/PageLayout';

interface BuildFornecedoresMenuSectionsParams {
    onAddFornecedor?: () => void;
    onOpenImportarDados?: () => void;
}

export const buildFornecedoresMenuSections = ({
    onAddFornecedor,
    onOpenImportarDados,
}: BuildFornecedoresMenuSectionsParams = {}): PageLayoutMenuSection[] => [
    {
        titulo: 'Gestão de Fornecedores',
        paginas: [
            onAddFornecedor
                ? { titulo: 'Cadastro de Fornecedores', action: onAddFornecedor }
                : { titulo: 'Cadastro de Fornecedores', href: '/fornecedores?modal=add-fornecedor' },
            { titulo: 'Fornecedores Excluídos', href: '/fornecedores-excluidos' },
                        {
                titulo: 'Relatórios',
                href: '/fornecedores-relatorios',
                children: [
                    { titulo: 'Listar Fornecedores', href: '/fornecedores-relatorios' },
                ],
            },
            onOpenImportarDados
                ? { titulo: 'Importar Dados', action: onOpenImportarDados }
                : { titulo: 'Importar Dados', href: '/fornecedores' },
        ],
    },
];
