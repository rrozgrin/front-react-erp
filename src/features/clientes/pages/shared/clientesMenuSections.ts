import type { PageLayoutMenuSection } from '../../../../common/components/PageLayout';

interface BuildClientesMenuSectionsParams {
    onOpenMalaDireta?: () => void;
    onOpenMensagemAniversario?: () => void;
    onOpenImportarDados?: () => void;
}

const noop = (): void => undefined;

export const buildClientesMenuSections = ({
    onOpenMalaDireta = noop,
    onOpenMensagemAniversario = noop,
    onOpenImportarDados = noop,
}: BuildClientesMenuSectionsParams = {}): PageLayoutMenuSection[] => [
    {
        titulo: 'Gestão de Clientes',
        paginas: [
            { titulo: 'Clientes Cadastrados', href: '/clientes' },
            { titulo: 'Clientes Inativos', href: '/clientes-inativos' },
            { titulo: 'Clientes Excluídos', href: '/clientes-excluidos' },
            { titulo: 'Clientes Loja Virtual', href: '/clientes-loja-virtual' },
            { titulo: 'Clientes Que Não Compram', href: '/clientes-que-nao-compram' },
            { titulo: 'Clientes Que Mais Compram', href: '/clientes-que-mais-compram' },
            { titulo: 'Clientes por Lote', href: '/clientes-por-lote' },
        ],
    },
    {
        titulo: 'Comunicação e Marketing',
        paginas: [
            { titulo: 'Mala Direta', action: onOpenMalaDireta },
            { titulo: 'Editar Mensagem de Aniversário', action: onOpenMensagemAniversario },
            { titulo: 'Enviar Mensagem de Aniversário', href: '/mensagem-aniversario' },
        ],
    },
    {
        titulo: 'Relatórios e Controle',
        paginas: [
            { titulo: 'Relatórios', href: '/relatorio-clientes' },
            { titulo: 'Relatório de Ocorrências', href: '/relatorio-ocorrencias' },
            { titulo: 'Relatório de Conta Corrente', href: '/relatorio-conta-corrente' },
            { titulo: 'Baixar Conta Corrente', href: '/baixar-conta-corrente' },
        ],
    },
    {
        titulo: 'Configurações e Ferramentas',
        paginas: [
            { titulo: 'Tipos de Desconto', href: '/tipos-desconto' },
            { titulo: 'Histórico de Alterações', href: '/historico-alteracoes' },
            { titulo: 'Arquivos e Pastas', href: '/arquivos' },
            { titulo: 'Importar Dados', action: onOpenImportarDados },
        ],
    },
];
