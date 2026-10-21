export interface CatalogGeneralOption {
    id: string;
    title: string;
    description: string;
    kind: 'radio' | 'checkboxes';
    options: {
        value: string;
        label: string;
        checked?: boolean;
    }[];
}

export interface CatalogFieldOption {
    id: string;
    label: string;
    icon: string;
    checked?: boolean;
}

export const catalogGeneralOptions: CatalogGeneralOption[] = [
    {
        id: 'status',
        title: 'Status do Catálogo',
        description: 'Ative ou pause a página pública do catálogo externo.',
        kind: 'radio',
        options: [
            { value: 'ativo', label: 'Ativo', checked: true },
            { value: 'inativo', label: 'Inativo' },
        ],
    },
    {
        id: 'fotos',
        title: 'Exibir Fotos dos Produtos',
        description: 'Mostra a imagem principal dos itens publicados.',
        kind: 'radio',
        options: [
            { value: 'sim', label: 'Sim', checked: true },
            { value: 'nao', label: 'Não' },
        ],
    },
    {
        id: 'precos',
        title: 'Exibir Preços',
        description: 'Define se valores aparecem no catálogo.',
        kind: 'radio',
        options: [
            { value: 'sim', label: 'Sim', checked: true },
            { value: 'nao', label: 'Não' },
        ],
    },
    {
        id: 'descricao',
        title: 'Exibir Descrição Detalhada',
        description: 'Inclui as informações completas do cadastro.',
        kind: 'radio',
        options: [
            { value: 'sim', label: 'Sim', checked: true },
            { value: 'nao', label: 'Não' },
        ],
    },
    {
        id: 'tiposPreco',
        title: 'Exibir Preços',
        description: 'Escolha quais tabelas de preço ficam visíveis.',
        kind: 'checkboxes',
        options: [
            { value: 'varejo', label: 'Exibir preço varejo', checked: true },
            { value: 'atacado', label: 'Exibir preço atacado', checked: true },
        ],
    },
    {
        id: 'grade',
        title: 'Exibir Grade',
        description: 'Mostra variações e combinações cadastradas.',
        kind: 'radio',
        options: [
            { value: 'sim', label: 'Sim', checked: true },
            { value: 'nao', label: 'Não' },
        ],
    },
    {
        id: 'codigoBarras',
        title: 'Exibir Código de Barras',
        description: 'Publica o código para identificação do produto.',
        kind: 'radio',
        options: [
            { value: 'sim', label: 'Sim', checked: true },
            { value: 'nao', label: 'Não' },
        ],
    },
    {
        id: 'pedidosOnline',
        title: 'Aceitar Pedidos Online',
        description: 'Permite que clientes enviem pedidos pelo catálogo.',
        kind: 'radio',
        options: [
            { value: 'sim', label: 'Sim', checked: true },
            { value: 'nao', label: 'Não' },
        ],
    },
    {
        id: 'estoqueGrade',
        title: 'Mostrar Estoque (somente com grade ativo)',
        description: 'Exibe disponibilidade por grade quando aplicável.',
        kind: 'radio',
        options: [
            { value: 'sim', label: 'Sim', checked: true },
            { value: 'nao', label: 'Não' },
        ],
    },
    {
        id: 'produtosHabilitados',
        title: 'Mostrar somente Produtos habilitados para loja virtual',
        description: 'Filtra o catálogo para itens marcados como publicados.',
        kind: 'radio',
        options: [
            { value: 'sim', label: 'Sim' },
            { value: 'nao', label: 'Não', checked: true },
        ],
    },
];

export const catalogFieldOptions: CatalogFieldOption[] = [
    { id: 'codigoBarras', label: 'Código de Barras', icon: 'barcode' },
    { id: 'codigoInterno', label: 'Código Interno', icon: '#' },
    { id: 'descricao', label: 'Descrição do Produto', icon: 'file' },
    { id: 'classificacao', label: 'Classificação', icon: 'tag' },
    { id: 'fornecedor', label: 'Fornecedor', icon: 'truck' },
    { id: 'fabricante', label: 'Fabricante', icon: 'factory' },
    { id: 'precoCusto', label: 'Preço de Custo', icon: '$' },
    { id: 'precoVenda', label: 'Preço de Venda', icon: '$' },
    { id: 'precoAtacado', label: 'Preço de Atacado', icon: 'tag' },
    { id: 'quantidade', label: 'Quantidade', icon: '123' },
    { id: 'fotoProduto', label: 'Foto do Produto', icon: 'image' },
];

export const catalogClassificationOptions = [
    'Celulares e Smartphones',
    'Acessórios',
    'Importado XML',
    'Peças e Componentes',
    'Promoções',
];
