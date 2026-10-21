import type { themes } from '../../context/themes';

export type ThemeKey = keyof typeof themes;

export interface VisibilityGroup {
    id: string;
    title: string;
    fields: {
        id: string;
        label: string;
        checked?: boolean;
    }[];
}

export interface DeletionLog {
    data: string;
    hora: string;
    login: string;
    usuario: string;
    informacoesExcluidas: string;
    resultado: string;
}

export const themeLabels: Record<ThemeKey, string> = {
    blue: 'Azul',
    orange: 'Laranja',
    black: 'Preto',
    yellow: 'Amarelo',
    green: 'Verde',
    turquoise: 'Turquesa',
    red: 'Vermelho',
    purple: 'Roxo',
    pink: 'Rosa',
    framboesa: 'Framboesa',
    xadrez: 'Xadrez',
    praia: 'Praia',
    festa: 'Festa',
};

export const visibilityGroups: VisibilityGroup[] = [
    {
        id: 'agenda',
        title: 'Agenda Telefônica',
        fields: [
            { id: 'nome', label: 'Nome', checked: true },
            { id: 'telefone', label: 'Telefone', checked: true },
            { id: 'celular', label: 'Celular', checked: true },
            { id: 'endereco', label: 'Endereço' },
            { id: 'email', label: 'E-mail' },
            { id: 'cidade', label: 'Cidade', checked: true },
            { id: 'site', label: 'Site', checked: true },
            { id: 'ativo', label: 'Ativo' },
        ],
    },
    {
        id: 'servicos',
        title: 'Serviços Oferecidos',
        fields: [
            { id: 'codigo', label: 'Código do Serviço', checked: true },
            { id: 'nome', label: 'Nome do Serviço', checked: true },
            { id: 'valorCusto', label: 'Valor Custo', checked: true },
            { id: 'valorServico', label: 'Valor Serviço', checked: true },
            { id: 'percentual', label: 'Porcentagem Custo Venda', checked: true },
            { id: 'status', label: 'Status', checked: true },
        ],
    },
    {
        id: 'clientes',
        title: 'Clientes',
        fields: [
            { id: 'codigo', label: 'Cod. Cliente' },
            { id: 'nome', label: 'Nome', checked: true },
            { id: 'razaoSocial', label: 'Razão Social' },
            { id: 'documento', label: 'CPF/CNPJ', checked: true },
            { id: 'telefone', label: 'Telefone' },
            { id: 'celular', label: 'Celular', checked: true },
            { id: 'fax', label: 'Fax' },
            { id: 'cidade', label: 'Cidade' },
            { id: 'uf', label: 'UF' },
            { id: 'cep', label: 'CEP' },
            { id: 'tipoPessoa', label: 'Tipo Pessoa(PF/PJ)' },
            { id: 'email', label: 'E-mail' },
            { id: 'empresa', label: 'Empresa onde trabalha' },
            { id: 'ativo', label: 'Ativo' },
            { id: 'vendedor', label: 'Vendedor/Atendente' },
            { id: 'vinculacao', label: 'Vinculação', checked: true },
            { id: 'veiculos', label: 'Veículos', checked: true },
        ],
    },
    {
        id: 'transportadoras',
        title: 'Transportadoras',
        fields: [
            { id: 'nome', label: 'Nome / Razão Social', checked: true },
            { id: 'tipo', label: 'Tipo', checked: true },
            { id: 'documento', label: 'CPF/CNPJ', checked: true },
            { id: 'telefone', label: 'Telefone Fixo', checked: true },
            { id: 'celular', label: 'Celular', checked: true },
            { id: 'cidade', label: 'Cidade' },
            { id: 'uf', label: 'UF' },
            { id: 'status', label: 'Status' },
        ],
    },
    {
        id: 'produtos',
        title: 'Cadastro/Estoque Produtos',
        fields: [
            { id: 'codigoInterno', label: 'Código Interno', checked: true },
            { id: 'nomeProduto', label: 'Nome Produto', checked: true },
            { id: 'codigoBarra', label: 'Código Barra', checked: true },
            { id: 'estoque', label: 'Qtde. Estoque', checked: true },
            { id: 'reserva', label: 'Qtd. Reserva' },
            { id: 'classificacao', label: 'Classificação', checked: true },
            { id: 'valorCusto', label: 'Valor Custo', checked: true },
            { id: 'valorVenda', label: 'Valor Venda', checked: true },
            { id: 'fabricante', label: 'Fabricante' },
            { id: 'cor', label: 'Cor' },
            { id: 'lojaVirtual', label: 'Loja Virtual' },
            { id: 'ncm', label: 'NCM' },
            { id: 'localizacao', label: 'Localização' },
            { id: 'fornecedor', label: 'Fornecedor' },
            { id: 'valorAtacado', label: 'Valor Atacado' },
            { id: 'tamanho', label: 'Tamanho' },
            { id: 'marca', label: 'Marca' },
            { id: 'margemLucro', label: 'Margem de Lucro' },
            { id: 'previsao', label: 'Previsão de Devolução' },
            { id: 'lote', label: 'Lote' },
        ],
    },
    {
        id: 'funcionarios',
        title: 'Funcionários',
        fields: [
            { id: 'codigo', label: 'Código', checked: true },
            { id: 'nome', label: 'Nome', checked: true },
            { id: 'cpf', label: 'CPF', checked: true },
            { id: 'telefone', label: 'Telefone Fixo', checked: true },
            { id: 'celular', label: 'Celular', checked: true },
            { id: 'dataNascimento', label: 'Data Nascimento' },
            { id: 'email', label: 'E-mail' },
            { id: 'situacao', label: 'Situação', checked: true },
            { id: 'salario', label: 'Salário' },
        ],
    },
    {
        id: 'fornecedores',
        title: 'Fornecedores',
        fields: [
            { id: 'nome', label: 'Nome', checked: true },
            { id: 'razaoSocial', label: 'Razão Social', checked: true },
            { id: 'tipoPessoa', label: 'Tipo Pessoa(PF/PJ)', checked: true },
            { id: 'documento', label: 'CPF/CNPJ', checked: true },
            { id: 'rg', label: 'Rg', checked: true },
            { id: 'telefone', label: 'Telefone', checked: true },
            { id: 'celular', label: 'Celular' },
            { id: 'fax', label: 'Fax' },
            { id: 'email', label: 'E-mail' },
            { id: 'site', label: 'Site' },
            { id: 'cep', label: 'CEP' },
            { id: 'endereco', label: 'Endereço' },
            { id: 'numero', label: 'Nº.' },
            { id: 'cidade', label: 'Cidade', checked: true },
            { id: 'uf', label: 'UF' },
            { id: 'ativo', label: 'Ativo' },
        ],
    },
];

export const deletionCategories = [
    'Produtos',
    'Clientes',
    'Fornecedores',
    'Transportadoras',
    'Classificação de Produtos/Serviços',
    'Vendas',
    'Entrada de Produtos no Estoque',
    'Ajustes de Estoque',
    'Contas a Pagar/Receber',
    'Agendas de Compromisso',
    'Arquivos e Pastas',
    'Funcionários',
    'Site ou Loja Virtual',
    'Campanha - WhatsApp / Torpedo',
    'Listas - WhatsApp / Torpedo',
    'Serviços Oferecidos',
];

export const deletionLogs: DeletionLog[] = [];
