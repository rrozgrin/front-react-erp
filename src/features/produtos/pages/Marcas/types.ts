export interface ProdutoMarca {
    id: number;
    nome: string;
    lojaVirtual: boolean;
    imagem?: string;
}

export interface MarcaFormValues {
    nome: string;
    lojaVirtual: boolean;
    imagem?: File;
}
