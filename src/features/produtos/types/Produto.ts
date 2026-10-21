export type ProdutoStatus = 'ativo' | 'inativo' | 'vip';
export type SimNao = 'S' | 'N';
export type SimNaoBinario = '1' | '0';
export type TipoCorreiro = 'pac' | 'sedex' | 'jadlog' | 'jamef';
export type TipoMargem = 'P' | 'V';

export interface ProdutoCaracteristica {
    atributo: string;
    valor: string;
}

export interface ProdutoLote {
    numero: string;
    quantidade: string;
    fabricacao: string;
    validade: string;
}

export interface ProdutoInfoNutricional {
    possuiInformacaoNutricional: SimNao;
    validadeDias: string;
    porcao: string;
    calorias: string;
    carboidratos: string;
    proteinas: string;
    gordurasTotais: string;
    gordurasSaturadas: string;
    colesterol: string;
    gordurasTrans: string;
    fibra: string;
    calcio: string;
    ferro: string;
    sodio: string;
}

export interface ProdutoInfoFiscal {
    ncm: string;
    impostoNota: string;
    cest: string;
    codigoAnp: string;
    cfop: string;
    csosn: string;
    cstIcms: string;
    cstPis: string;
    cstCofins: string;
    cstIpi: string;
    origemFiscal: string;
    aliquotaIcms: string;
    aliquotaPis: string;
    aliquotaCofins: string;
    aliquotaIpi: string;
    observacoesFiscais: string;
}

export interface ProdutoPrecos {
    precoCusto: string;
    margemLucroTipo: TipoMargem;
    margemLucroPercentual: string;
    margemLucroValor: string;
    margemAtacadoTipo: TipoMargem;
    margemAtacadoPercentual: string;
    margemAtacadoValor: string;
    margemPrazoTipo: TipoMargem;
    margemPrazoPercentual: string;
    margemPrazoValor: string;
    descontoMaximoTipo: TipoMargem;
    descontoMaximoPercentual: string;
    descontoMaximoValor: string;
    precoVarejo: string;
    precoAtacado: string;
    precoPrazo: string;
    alterarTodosGrade: boolean;
    arredondarValor: SimNao;
    observacoesPreco: string;
    precoVarejoEcommerce: string;
    precoAtacadoEcommerce: string;
    precoPrazoEcommerce: string;
    precoIfood: string;
    precoIfoodMercado: string;
    precoShopee: string;
}

export interface ProdutoFrete {
    tipoCorreio: TipoCorreiro;
    pesoBruto: string;
    pesoLiquido: string;
    altura: string;
    largura: string;
    comprimento: string;
}

export interface ProdutoFormData {
    id: string | number;
    fornecedores: string[];
    classificacoes: string[];
    marca: string;
    codigoBarras: string;
    quantidadeDigitosEtiqueta: string;
    codigoInterno: string;
    ean: string;
    nome: string;
    caracteristicas: ProdutoCaracteristica[];
    cor: string;
    tamanho: string;
    lote: string;
    dataFabricacao: string;
    dataValidade: string;
    condicao: string;
    genero: string;
    grupoIdade: string;
    peso: string;
    unidade: string;
    unidadeTributaria: string;
    localizacao: string;
    fabricante: string;
    estoqueMinimo: string;
    estoqueInicial: string;
    origemProduto: string;
    edicao: string;
    descricaoDetalhada: string;
    mostrarLojaVirtual: SimNao;
    mostrarProdutoSemEstoque: SimNao;
    mostrarEstoqueLojaVirtual: SimNaoBinario;
    gerenciarEstoqueLojaVirtual: SimNaoBinario;
    mostrarMarketplace: SimNao;
    publicarShopee: SimNaoBinario;
    publicarIfood: SimNaoBinario;
    publicarIfoodMercado: SimNaoBinario;
    mostrarCatalogo: SimNao;
    mostrarCatalogoDigital: SimNao;
    mostrarTabletPdv: SimNaoBinario;
    locacao: SimNaoBinario;
    quantidadeLocacao: string;
    bloquearDesconto: SimNao;
    ambienteProducao: SimNao;
    solicitarValorDigitado: SimNao;
    permitirEstoqueZero: SimNao;
    bloquearAlteracaoFrenteCaixa: SimNao;
    pedidoEquipamento: SimNao;
    controleQuantidade: SimNao;
    imagens: string[];
    linksVideo: string[];
    lotesControle: ProdutoLote[];
    informacoesNutricionais: ProdutoInfoNutricional;
    informacoesFiscais: ProdutoInfoFiscal;
    precos: ProdutoPrecos;
    frete: ProdutoFrete;
    status: ProdutoStatus;
}

export interface Produto {
    id: number;
    codigoInterno: string;
    nome: string;
    codigoBarras: string;
    classificacao: string;
    estoque: number;
    custo: number;
    venda: number;
    status: ProdutoStatus;
}

export const initialProdutoFormData: ProdutoFormData = {
    id: '',
    fornecedores: [],
    classificacoes: [],
    marca: '',
    codigoBarras: '',
    quantidadeDigitosEtiqueta: '2',
    codigoInterno: '',
    ean: '',
    nome: '',
    caracteristicas: [],
    cor: '',
    tamanho: '',
    lote: '',
    dataFabricacao: '',
    dataValidade: '',
    condicao: 'nao-se-aplica',
    genero: 'nao-se-aplica',
    grupoIdade: 'nao-se-aplica',
    peso: '',
    unidade: '',
    unidadeTributaria: '',
    localizacao: '',
    fabricante: '',
    estoqueMinimo: '',
    estoqueInicial: '',
    origemProduto: '',
    edicao: '',
    descricaoDetalhada: '',
    mostrarLojaVirtual: 'S',
    mostrarProdutoSemEstoque: 'N',
    mostrarEstoqueLojaVirtual: '1',
    gerenciarEstoqueLojaVirtual: '1',
    mostrarMarketplace: 'N',
    publicarShopee: '0',
    publicarIfood: '0',
    publicarIfoodMercado: '0',
    mostrarCatalogo: 'S',
    mostrarCatalogoDigital: 'N',
    mostrarTabletPdv: '0',
    locacao: '0',
    quantidadeLocacao: '',
    bloquearDesconto: 'N',
    ambienteProducao: 'S',
    solicitarValorDigitado: 'N',
    permitirEstoqueZero: 'S',
    bloquearAlteracaoFrenteCaixa: 'N',
    pedidoEquipamento: 'N',
    controleQuantidade: 'N',
    imagens: [],
    linksVideo: [],
    lotesControle: [],
    informacoesNutricionais: {
        possuiInformacaoNutricional: 'N',
        validadeDias: '',
        porcao: '',
        calorias: '',
        carboidratos: '',
        proteinas: '',
        gordurasTotais: '',
        gordurasSaturadas: '',
        colesterol: '',
        gordurasTrans: '',
        fibra: '',
        calcio: '',
        ferro: '',
        sodio: '',
    },
    informacoesFiscais: {
        ncm: '',
        impostoNota: '',
        cest: '',
        codigoAnp: '',
        cfop: '',
        csosn: '',
        cstIcms: '',
        cstPis: '',
        cstCofins: '',
        cstIpi: '',
        origemFiscal: '',
        aliquotaIcms: '',
        aliquotaPis: '',
        aliquotaCofins: '',
        aliquotaIpi: '',
        observacoesFiscais: '',
    },
    precos: {
        precoCusto: '',
        margemLucroTipo: 'P',
        margemLucroPercentual: '',
        margemLucroValor: '',
        margemAtacadoTipo: 'P',
        margemAtacadoPercentual: '',
        margemAtacadoValor: '',
        margemPrazoTipo: 'P',
        margemPrazoPercentual: '',
        margemPrazoValor: '',
        descontoMaximoTipo: 'P',
        descontoMaximoPercentual: '',
        descontoMaximoValor: '',
        precoVarejo: '',
        precoAtacado: '',
        precoPrazo: '',
        alterarTodosGrade: false,
        arredondarValor: 'N',
        observacoesPreco: '',
        precoVarejoEcommerce: '',
        precoAtacadoEcommerce: '',
        precoPrazoEcommerce: '',
        precoIfood: '',
        precoIfoodMercado: '',
        precoShopee: '',
    },
    frete: {
        tipoCorreio: 'pac',
        pesoBruto: '',
        pesoLiquido: '',
        altura: '',
        largura: '',
        comprimento: '',
    },
    status: 'ativo',
};
