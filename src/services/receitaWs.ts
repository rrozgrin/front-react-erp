import { ApiError } from './apiClient';
import { receitaWsApi } from './apiClients';

export interface ReceitaWsActivity {
    code?: string;
    text?: string;
}

export interface ReceitaWsQsaItem {
    nome?: string;
    qual?: string;
    pais_origem?: string;
    nome_rep_legal?: string;
    qual_rep_legal?: string;
}

export interface ReceitaWsResponse {
    error?: string;
    razao_social?: string;
    nome_fantasia?: string;
    email?: string;
    telefone?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    situacao?: string;
    abertura?: string;
    atividade_principal?: string;
    qsa?: ReceitaWsQsaItem[];
    raw?: {
        status?: string;
        message?: string;
        fantasia?: string;
        nome?: string;
        email?: string;
        telefone?: string;
        cep?: string;
        logradouro?: string;
        numero?: string;
        complemento?: string;
        bairro?: string;
        municipio?: string;
        uf?: string;
        situacao?: string;
        abertura?: string;
        natureza_juridica?: string;
        atividade_principal?: ReceitaWsActivity[];
        qsa?: ReceitaWsQsaItem[];
    };
}

const sanitizeCnpj = (value: string): string => value.replace(/\D/g, '');

export const fetchReceitaWs = async (cnpj: string): Promise<ReceitaWsResponse> => {
    const sanitizedCnpj = sanitizeCnpj(cnpj);

    if (sanitizedCnpj.length !== 14) {
        throw new Error('CNPJ invalido.');
    }

    let data: ReceitaWsResponse;

    try {
        data = await receitaWsApi.get<ReceitaWsResponse>(`/api/v1/consulta-cnpj/${sanitizedCnpj}`, {
            headers: { Accept: 'application/json' },
        });
    } catch (error) {
        if (error instanceof ApiError) {
            const errorData = error.data as ReceitaWsResponse | undefined;
            throw new Error(errorData?.error || 'Erro ao consultar dados do CNPJ.');
        }

        throw error;
    }

    if (data.error) {
        throw new Error(data.error);
    }

    if (data.raw?.status === 'ERROR') {
        throw new Error(data.raw.message || 'CNPJ nao encontrado.');
    }

    return data;
};
