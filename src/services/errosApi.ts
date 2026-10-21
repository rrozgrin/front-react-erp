import { ApiError } from './apiClient';

interface DadosErroApi {
    msg?: unknown;
    code?: unknown;
    file?: unknown;
    line?: unknown;
    exception?: unknown;
}

interface OpcoesMensagemErroApi {
    detalhar?: boolean;
}

export const obterMensagemErroApi = (
    erro: unknown,
    mensagemPadrao = 'Não foi possível comunicar com a API.',
    opcoes: OpcoesMensagemErroApi = {},
): string => {
    if (!(erro instanceof ApiError)) return mensagemPadrao;

    const dados = erro.data as DadosErroApi | null | undefined;
    const mensagem = typeof dados?.msg === 'string' && dados.msg.trim()
        ? dados.msg
        : erro.message;

    if (!opcoes.detalhar) return mensagem;

    const codigo = typeof dados?.code === 'number' ? `Código: ${dados.code}` : '';
    const excecao = typeof dados?.exception === 'string' ? dados.exception : '';
    const localizacao = typeof dados?.file === 'string' && typeof dados?.line === 'number'
        ? `${dados.file}:${dados.line}`
        : '';

    return [mensagem, codigo, excecao, localizacao].filter(Boolean).join('\n');
};

