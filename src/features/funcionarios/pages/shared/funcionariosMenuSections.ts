import type { PageLayoutMenuSection } from '../../../../common/components/PageLayout';

interface BuildFuncionariosMenuSectionsParams {
    onAddFuncionario?: () => void;
}

export const buildFuncionariosMenuSections = ({
    onAddFuncionario,
}: BuildFuncionariosMenuSectionsParams = {}): PageLayoutMenuSection[] => [
    {
        titulo: 'Gestão de Funcionários',
        paginas: [
            {
                titulo: 'Funcionários',
                href: '/funcionarios',
                children: [
                    { titulo: 'Funcionários Cadastrados', href: '/funcionarios' },
                    { titulo: 'Funcionários Excluídos', href: '/funcionarios/excluidos' },
                    onAddFuncionario
                        ? { titulo: 'Adicionar Funcionários', action: onAddFuncionario }
                        : { titulo: 'Adicionar Funcionários', href: '/funcionarios?modal=add-funcionario' },
                ],
            },
            { titulo: 'Adicionar Setor', href: '/funcionarios/setores' },
        ],
    },
    {
        titulo: 'Relatórios',
        paginas: [
            { titulo: 'Relatórios de Funcionários', href: '/funcionarios/relatorios' },
            { titulo: 'Relatório de Comissão', href: '/funcionarios/relatorio-comissao' },
            { titulo: 'Relatório de Comissão Auxiliares', href: '/funcionarios/relatorio-comissao-auxiliares' },
            { titulo: 'Relatório de vale presente', href: '/funcionarios/relatorio-vale-presente' },
            { titulo: 'Ver minhas comissões', href: '/funcionarios/minhas-comissoes?id_funcionario=328990' },
        ],
    },
];
