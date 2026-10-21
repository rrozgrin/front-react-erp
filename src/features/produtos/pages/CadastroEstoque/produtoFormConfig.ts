import { initialProdutoFormData, type ProdutoFormData } from '../../types/Produto';

export type ProdutoPrecoCurrencyField = {
    [K in keyof ProdutoFormData['precos']]: ProdutoFormData['precos'][K] extends string ? K : never;
}[keyof ProdutoFormData['precos']];

export const fornecedorOptions = [
    'FIEL COMERCIAL IMPORT E EXPORT LTDA ME', 'A D COMERCIO DE BEBIDAS E CONDIMENTOS', 'A E RIBEIRO EIRELI', 'A G DE ABREU PONTO ECONOMICO', 'A. ANGELONI E CIA. LTDA', 'Acipar Lubrificantes Ltda',
];

export const classificacaoOptions = [
    'CELULARES E SMARTPHONES', 'ADAPTADORES', 'ADESIVO', 'ADICIONAIS', 'ALCOOL EM GEL', 'ALIMENTOS E BEBIDAS',
];

export const produtoCadastroSteps = [
    { id: 'dados', title: 'Dados do produto', description: 'Identificação, classificação, estoque e exibição.' },
    { id: 'nutricional', title: 'Info nutricional', description: 'Validade, porção e indicadores nutricionais.' },
    { id: 'fiscal', title: 'Info fiscal', description: 'NCM, CEST, ANP e parâmetros fiscais.' },
    { id: 'precos', title: 'Valores', description: 'Custo, varejo, atacado, e-commerce e canais.' },
    { id: 'frete', title: 'Frete', description: 'Pesos, dimensões e configuração do envio.' },
];

export const formatProdutoCurrencyBRL = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(digits) / 100);
};

export const buildProdutoFormState = (produto?: ProdutoFormData) => {
    if (!produto) return initialProdutoFormData;

    return {
        ...initialProdutoFormData, ...produto,
        fornecedores: produto.fornecedores?.length ? produto.fornecedores : [],
        classificacoes: produto.classificacoes?.length ? produto.classificacoes : [],
        caracteristicas: produto.caracteristicas?.length ? produto.caracteristicas : [],
        imagens: produto.imagens?.length ? produto.imagens : [],
        linksVideo: produto.linksVideo?.length ? produto.linksVideo : [],
        lotesControle: produto.lotesControle?.length ? produto.lotesControle : [],
        informacoesNutricionais: { ...initialProdutoFormData.informacoesNutricionais, ...produto.informacoesNutricionais },
        informacoesFiscais: { ...initialProdutoFormData.informacoesFiscais, ...produto.informacoesFiscais },
        precos: { ...initialProdutoFormData.precos, ...produto.precos },
        frete: { ...initialProdutoFormData.frete, ...produto.frete },
    };
};
