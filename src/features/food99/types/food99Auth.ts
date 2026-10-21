export interface Food99Loja {
    id: number;
    cadastroId: number | null;
    lojaAppId: string;
    lojaFood99Id: string | null;
    nome: string | null;
    statusVinculo: string | null;
    statusAutorizacao: string | null;
    ultimaSincronizacaoEm: string | null;
    tokenEncontrado?: boolean;
    tokenExpiraEm?: string | null;
    tokenObtidoEm?: string | null;
    tokenAtualizadoEm?: string | null;
}

export interface Food99LojasResponse {
    cadastroId: number;
    lojas: Food99Loja[];
}

export interface Food99UrlAutorizacaoResponse {
    lojaAppId: string;
    loja: Food99Loja;
    urlAutorizacao: string | null;
}

export interface Food99TokenLoja {
    id?: number;
    lojaAppId: string;
    tokenEncontrado?: boolean;
    expiraEm?: string | null;
    tokenExpiraEm?: string | null;
    obtidoEm?: string | null;
    atualizadoEm?: string | null;
    criadoEm?: string | null;
    alteradoEm?: string | null;
    loja?: Food99Loja;
}
