
export type ClienteStatus = 'ativo' | 'inativo' | 'vip';
export type TipoPessoa = 'f' | 'j' | 'e';

export interface Cliente {
    id: string | number;
    nome: string;
    saldo?: number | null;
    email?: string;
    inscricao_estadual?: string;
    fax?: string;
    rg?: string;
    expedidor?: string;
    cnh?: string;
    naturalidade?: string;
    telefone?: string;
    celular?: string;
    cidade?: string;
    segmento?: string;
    status?: ClienteStatus;
    observacoes?: string;
    fotos?: string[];
    documento?: string;
    endereco?: string;
    numero?: string;
    bairro?: string;
    estado?: string;
    cep?: string;
    complemento?: string;
    tipoPessoa: TipoPessoa;
    tipoEndereco?: string;
    pais?: string;
    nome_fantasia?: string;
    razao_social?: string;
    dataFundacao?: string;
    dataNascimento?: string;

    estadoCivil?: string;
    issRetido?: string;
    porcentISS?: string;
    suframa?: string;
    municipal?: string;
    inscricaoRural?: string;
    conjugeNome?: string;
    tipoResidencia?: string;
    nomePai?: string;
    telefonePai?: string
    nomeMae?: string;
    conjuge?: string;
    telefoneMae?: string;
    tituloEleitor?: string;
    zonaEleitoral?: string;
    secao?: string;

    enviado?: boolean; // para controle interno de envio de mensagens

    referencia?: {
        nome: string;
        telefone: string;
        relacao: string;
    }[];

    trabalho?: {
        empresa: string;
        cargo: string;
        renda: string;
        telefone?: string;
        endereco?: string;
    }[];

    contato?: {
        nome: string;
        telefone: string;
        celular: string;
        email: string;
        fax: string;
    }[];

    socios?: {
        nome: string;
        email?: string;
        telefone?: string;
        cpf?: string;
        nascimento?: string;
        documento: string;
        participacao: string;
        observacoes: string;
    }[];
    vendedor?: {
        tipo: string;
    }[];
    vinculara?: {
        tipo: string;
    }[];
    veiculos?: {
        marca: string;
        modelo: string;
        placa: string;
        cor: string;
        anoModelo: string;
        anoFabricacao: string;
        chassi: string;
        motor: string;
        kmAtual: string;
    }[];

    infoAdicionais?: {
        limiteCredito?: string;
        taxaEntrega?: string;
    };
}
