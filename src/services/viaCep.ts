import { viaCepApi } from './apiClients';

export interface ViaCepResponse {
    cep?: string;
    logradouro?: string;
    complemento?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    erro?: boolean;
}

const sanitizeCep = (value: string): string => value.replace(/\D/g, '');

export const fetchViaCep = async (cep: string): Promise<ViaCepResponse> => {
    const sanitizedCep = sanitizeCep(cep);

    if (sanitizedCep.length !== 8) {
        throw new Error('CEP invalido.');
    }

    const data = await viaCepApi.get<ViaCepResponse>(`/ws/${sanitizedCep}/json/`);

    if (data.erro) {
        throw new Error('CEP nao encontrado.');
    }

    return data;
};
