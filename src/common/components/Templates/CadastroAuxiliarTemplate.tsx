import {
    ListagemTemplate,
    type ConteudoListagem,
    type ListagemBotaoPrincipal,
    type ListagemTemplateProps,
} from './ListagemTemplate';

export interface CadastroAuxiliarTemplateProps<TData>
    extends Omit<ListagemTemplateProps<TData>, 'botaoPrincipal' | 'modaisAbertos'> {
    cadastro?: ListagemBotaoPrincipal;
    modalAberto?: boolean;
    acoesAdicionais?: ConteudoListagem<TData>;
}

export function CadastroAuxiliarTemplate<TData>({
    cadastro,
    modalAberto = false,
    acoesAdicionais,
    placeholderPesquisa = 'Busca Avançada',
    configurarColunas = false,
    exportarApenasColunasVisiveis = false,
    conteudoAdicionalToolbar,
    ...props
}: CadastroAuxiliarTemplateProps<TData>) {
    return (
        <ListagemTemplate
            {...props}
            botaoPrincipal={cadastro}
            modaisAbertos={modalAberto}
            placeholderPesquisa={placeholderPesquisa}
            configurarColunas={configurarColunas}
            exportarApenasColunasVisiveis={exportarApenasColunasVisiveis}
            conteudoAdicionalToolbar={(contexto) => (
                <>
                    {typeof acoesAdicionais === 'function' ? acoesAdicionais(contexto) : acoesAdicionais}
                    {typeof conteudoAdicionalToolbar === 'function' ? conteudoAdicionalToolbar(contexto) : conteudoAdicionalToolbar}
                </>
            )}
        />
    );
}
