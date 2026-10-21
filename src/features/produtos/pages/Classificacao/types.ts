export type ProdutoClassificacaoStatus = 'ativo' | 'inativo';
export type ProdutoClassificacaoModal = 'classificacao' | 'subclassificacao' | 'painelPdv' | null;

export interface ProdutoClassificacao {
    id: number;
    nome: string;
    subClassificacao: string;
    status: ProdutoClassificacaoStatus;
    lojaVirtual: boolean;
    catalogo: boolean;
    mercadoLivre: string;
    marcado: boolean;
}

export interface ClassificacaoFormValues {
    nome: string;
    classificacaoPrincipal: string;
    ativo: boolean;
    lojaVirtual: boolean;
    catalogo: boolean;
    comanda: boolean;
    imagem: 'nenhuma' | 'banco' | 'propria';
    mercadoLivre: string;
}

export const initialClassificacaoFormValues: ClassificacaoFormValues = {
    nome: '',
    classificacaoPrincipal: '',
    ativo: true,
    lojaVirtual: false,
    catalogo: true,
    comanda: false,
    imagem: 'nenhuma',
    mercadoLivre: '',
};
