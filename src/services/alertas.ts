import Swal from 'sweetalert2';
import { escaparHtml } from '@/utils/texto';
import { obterMensagemErroApi } from './errosApi';

interface OpcoesAlertaErroApi {
    titulo?: string;
    mensagemPadrao?: string;
    detalhar?: boolean;
}

export const exibirAlertaErroApi = async (
    erro: unknown,
    opcoes: OpcoesAlertaErroApi = {},
): Promise<void> => {
    const mensagem = obterMensagemErroApi(
        erro,
        opcoes.mensagemPadrao,
        { detalhar: opcoes.detalhar },
    );

    await Swal.fire({
        icon: 'error',
        title: opcoes.titulo ?? 'Erro ao salvar',
        html: mensagem.split('\n').map(escaparHtml).join('<br>'),
        confirmButtonText: 'OK',
    });
};

