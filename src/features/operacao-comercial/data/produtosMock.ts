export interface ProdutoItem {
    id: string;
    codigo: string;
    codigoBarras: string;
    nome: string;
    categoria: string;
    unidade: string;
    estoque: number;
    preco: string;
}

export const produtosMock: ProdutoItem[] = [
    {
        id: '1',
        codigo: '100',
        codigoBarras: '7891234567890',
        nome: 'HAMBURGUER ARTESANAL 01',
        categoria: 'Lanches',
        unidade: 'UN',
        estoque: 18,
        preco: '20,00',
    },
    {
        id: '2',
        codigo: '8001',
        codigoBarras: '7899876543210',
        nome: 'TORTA DE LIMAO',
        categoria: 'Doces',
        unidade: 'KG',
        estoque: 7,
        preco: '50,50',
    },
    {
        id: '3',
        codigo: '2010',
        codigoBarras: '7895551230001',
        nome: 'REFRIGERANTE LATA 350ML',
        categoria: 'Bebidas',
        unidade: 'UN',
        estoque: 42,
        preco: '6,90',
    },
];

export function buscarProdutoPorCodigo(codigo: string): ProdutoItem | undefined {
    const valor = codigo.trim();
    return produtosMock.find((produto) => produto.codigoBarras === valor)
        ?? produtosMock.find((produto) => produto.codigo === valor);
}
