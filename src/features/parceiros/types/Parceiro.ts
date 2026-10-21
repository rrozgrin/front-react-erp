export interface Parceiro {
    id: number;
    razaoSocial: string;
    fantasia?: string;
    contato?: string;
    cnpjCpf?: string;
    telefone?: string;
    fax?: string;
    celular?: string;
    email?: string;
    site?: string;
    skype?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    informacoesAdicionais?: string;
    tipoPessoa?: 'f' | 'j' | 'e';
    rgie?: string;
    inscEstadual?: string;
    inscMunicipal?: string;
    dataFundacao?: string;
    prazoEntregaProdutos?: number;
    pais?: string;
    auxImport1?: string;
    auxImport2?: string;
}
