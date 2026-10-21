import type { PageLayoutMenuSection } from '../../../../common/components/PageLayout';

interface BuildProdutosMenuSectionsParams {
    onAddProduto?: () => void;
    onOpenBalanca?: () => void;
    onOpenDigitosPrecos?: () => void;
    onOpenReajustePrecos?: () => void;
    onAddClassificacao?: () => void;
    onAddSubClassificacao?: () => void;
    onOpenPainelPdv?: () => void;
    onAddMarca?: () => void;
    onAddVolume?: () => void;
}

export const buildProdutosMenuSections = ({
    onAddProduto,
    onOpenBalanca,
    onOpenDigitosPrecos,
    onOpenReajustePrecos,
    onAddClassificacao,
    onAddSubClassificacao,
    onOpenPainelPdv,
    onAddMarca,
    onAddVolume,
}: BuildProdutosMenuSectionsParams): PageLayoutMenuSection[] => {
    const produtosChildren = [
        { titulo: 'Produtos Cadastrados', href: '/produtos' },
        { titulo: 'Produtos Excluídos', href: '/produtos/excluidos' },
        onAddProduto
            ? { titulo: 'Cadastrar Produto', action: onAddProduto }
            : { titulo: 'Cadastrar Produto', href: '/produtos?modal=add-produto' },
    ].filter(Boolean) as NonNullable<PageLayoutMenuSection['paginas'][number]['children']>;

    return [
    {
        titulo: 'Gestão de Produtos',
        paginas: [
            {
                titulo: 'Produtos',
                href: '/produtos',
                children: produtosChildren,
            },
            {
                titulo: 'Classificação',
                href: '/produtos/classificacao',
                children: [
                    { titulo: 'Listar Classificações', href: '/produtos/classificacao' },
                    onAddClassificacao
                        ? { titulo: 'Adicionar Nova Classificação', action: onAddClassificacao }
                        : { titulo: 'Adicionar Nova Classificação', href: '/produtos/classificacao?modal=add-classificacao' },
                    onAddSubClassificacao
                        ? { titulo: 'Adicionar Nova SubClassificação', action: onAddSubClassificacao }
                        : { titulo: 'Adicionar Nova SubClassificação', href: '/produtos/classificacao?modal=add-subclassificacao' },
                    onOpenPainelPdv
                        ? { titulo: 'Definir Painel Principal do Tablet PDV', action: onOpenPainelPdv }
                        : { titulo: 'Definir Painel Principal do Tablet PDV', href: '/produtos/classificacao' },
                    { titulo: 'Classificação Excluídos', href: '/produtos/classificacao/excluidos' },
                ],
            },
            {
                titulo: 'Marcas',
                href: '/produtos/marcas',
                children: [
                    { titulo: 'Listar Marcas', href: '/produtos/marcas' },
                    onAddMarca
                        ? { titulo: 'Adicionar Nova Marca', action: onAddMarca }
                        : { titulo: 'Adicionar Nova Marca', href: '/produtos/marcas?modal=add-marca' },
                ],
            },
            {
                titulo: 'Volumes',
                href: '/produtos/volumes',
                children: [
                    { titulo: 'Listar Volumes', href: '/produtos/volumes' },
                    onAddVolume
                        ? { titulo: 'Adicionar Novo Volume', action: onAddVolume }
                        : { titulo: 'Adicionar Novo Volume', href: '/produtos/volumes?modal=add-volume' },
                ],
            },
            { titulo: 'Características e Valores', href: '/produtos/caracteristicas-valores' },
            { titulo: 'Kit / Combo', href: '/produtos/kit-combo' },
            { titulo: 'Histórico de Alteração', href: '/produtos/historico-alteracao' },
        ],
    },
    {
        titulo: 'Relatórios',
        paginas: [
            { titulo: 'Relatório Estoque', href: '/produtos/relatorios' },
            { titulo: 'Relatórios Produtos Clientes', href: '/produtos/relatorio/produtos-clientes' },
            { titulo: 'Relatório Promoções', href: '/produtos/relatorio/promocoes' },
            { titulo: 'Relatório Notas', href: '/produtos/relatorio/notas' },
            { titulo: 'Relatório Produto/venda', href: '/produtos/relatorio/produto-venda' },
            { titulo: 'Relatório Mais Vendidos', href: '/produtos/relatorio/mais-vendidos' },
            { titulo: 'Relatório Não Vendidos', href: '/produtos/relatorio/nao-vendidos' },
            { titulo: 'Relatório Vendidos por Hora', href: '/produtos/relatorio/vendidos-por-hora' },
            { titulo: 'Relatório de Lotes', href: '/produtos/relatorio-lotes' },
        ],
    },
    {
        titulo: 'Estoque e Operações',
        paginas: [
            {
                titulo: 'Estoque',
                href: '/produtos/estoque/entrada',
                children: [
                    { titulo: 'Entrada no Estoque', href: '/produtos/estoque/entrada' },
                    { titulo: 'Saída no Estoque', href: '/produtos/estoque/saida' },
                    { titulo: 'Ajuste no Estoque', href: '/produtos/estoque/ajuste' },
                ],
            },
            { titulo: 'Conferência de Estoque', href: '/produtos/conferencia-estoque' },
            { titulo: 'Gerar Etiquetas', href: '/produtos/gerar-etiquetas' },
            { titulo: 'Importar Dados', href: '/produtos/importar-dados' },
            { titulo: 'Relatório Entrada Estoque', href: '/produtos/relatorio-entrada-estoque' },
            { titulo: 'Config. Lote e Vencimento', href: '/produtos/lote-vencimento' },
        ],
    },
    {
        titulo: 'Preços e Promoções',
        paginas: [
            onOpenDigitosPrecos
                ? { titulo: 'Configurar Dígitos de Preços', action: onOpenDigitosPrecos }
                : { titulo: 'Configurar Dígitos de Preços', href: '/produtos' },
            onOpenReajustePrecos
                ? { titulo: 'Reajustes de Preços', action: onOpenReajustePrecos }
                : { titulo: 'Reajustes de Preços', href: '/produtos' },
            { titulo: 'Lista de Preços', href: '/produtos/lista-precos' },
            { titulo: 'Promoção Multi-Itens por produto', href: '/produtos/promocao-multi-itens-produto' },
            { titulo: 'Promoção Multi-Itens por grade', href: '/produtos/promocao-multi-itens-grade' },
            { titulo: 'Mais por Menos', href: '/produtos/mais-por-menos' },
        ],
    },
    {
        titulo: 'Fiscal e Integrações',
        paginas: [
            onOpenBalanca ? { titulo: 'Balança', action: onOpenBalanca } : { titulo: 'Balança', href: '/produtos' },
            { titulo: 'Exportar Estoque (Bloco K e H)', href: '/produtos/exportar-estoque' },
            { titulo: 'Zerar CEST', href: '/produtos/zerar-cest' },
        ],
    },
    ];
};
