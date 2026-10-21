import {
    ListagemTemplate,
    type ConteudoListagem,
    type ListagemTemplateProps,
} from './ListagemTemplate';

export interface RelatorioTemplateProps<TData>
    extends Omit<ListagemTemplateProps<TData>, 'conteudoAntesTabela'> {
    painelFiltros?: ConteudoListagem<TData>;
    resumo?: ConteudoListagem<TData>;
    conteudoAntesTabela?: ConteudoListagem<TData>;
}

export function RelatorioTemplate<TData>({
    painelFiltros,
    resumo,
    conteudoAntesTabela,
    configurarColunas = 'tabela',
    exportarApenasColunasVisiveis = false,
    menuInicialAberto = false,
    agruparConteudo = true,
    ...props
}: RelatorioTemplateProps<TData>) {
    return (
        <ListagemTemplate
            {...props}
            configurarColunas={configurarColunas}
            exportarApenasColunasVisiveis={exportarApenasColunasVisiveis}
            menuInicialAberto={menuInicialAberto}
            agruparConteudo={agruparConteudo}
            conteudoAntesTabela={(contexto) => (
                <>
                    {typeof painelFiltros === 'function' ? painelFiltros(contexto) : painelFiltros}
                    {typeof resumo === 'function' ? resumo(contexto) : resumo}
                    {typeof conteudoAntesTabela === 'function' ? conteudoAntesTabela(contexto) : conteudoAntesTabela}
                </>
            )}
        />
    );
}
