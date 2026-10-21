import React, { Suspense, lazy, useMemo, useRef, useState } from 'react';
import { FaBoxOpen, FaCheckCircle, FaPen, FaTag } from 'react-icons/fa';
import { IoCubeOutline } from 'react-icons/io5';
import { useLocation, useParams } from 'react-router-dom';
import { PageLayout } from '../../../../common/components/PageLayout';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { FloatingActions } from '../../../../common/components/Buttons/FloatingActions';
import {
    DetailProfileCard,
    EmptyState,
    FieldCard,
    FieldsGrid,
    FotoColumn,
    HeaderActions,
    MainCard,
    QuickInfo,
    QuickItem,
    SectionBlock,
    SectionHeader,
    SectionsColumn,
    TopGrid,
} from '../../../../common/components/DetailView';
import { moedaBRL } from '../../../../types/Formatadores';
import type { Produto, ProdutoFormData } from '../../types/Produto';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

const ModalAddProdutos = lazy(async () => {
    const module = await import('./ProdutoFormModal');
    return { default: module.ModalAddProdutos };
});

interface ProdutoLocationState {
    produto?: Produto;
}

interface DisplayField {
    label: string;
    value: unknown;
}

const nv = (value: unknown): string => {
    if (value === null || value === undefined || value === '') {
        return '--';
    }
    return String(value);
};

const yesNoLabel = (value: string | boolean): string => {
    if (value === true || value === 'S' || value === '1') {
        return 'Sim';
    }
    if (value === false || value === 'N' || value === '0') {
        return 'Não';
    }
    return nv(value);
};

const joinList = (items: string[]): string => {
    if (!items.length) {
        return '--';
    }
    return items.join(', ');
};

const toProdutoFormData = (produto: Produto): ProdutoFormData => ({
    id: produto.id,
    fornecedores: [],
    classificacoes: produto.classificacao ? [produto.classificacao] : [],
    marca: '',
    codigoBarras: produto.codigoBarras,
    quantidadeDigitosEtiqueta: '2',
    codigoInterno: produto.codigoInterno,
    ean: '',
    nome: produto.nome,
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
    estoqueInicial: String(produto.estoque),
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
        precoCusto: produto.custo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
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
        precoVarejo: produto.venda.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
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
    status: produto.status,
});

const buildProdutoFromId = (id?: string): Produto | undefined => {
    if (!id) {
        return undefined;
    }

    return {
        id: Number(id),
        codigoInterno: id,
        nome: `Produto ${id}`,
        codigoBarras: '--',
        classificacao: '--',
        estoque: 0,
        custo: 0,
        venda: 0,
        status: 'ativo',
    };
};

const renderFieldCards = (fields: DisplayField[]) => fields.map((field) => (
    <FieldCard key={field.label}>
        <dt>{field.label}</dt>
        <dd>{nv(field.value)}</dd>
    </FieldCard>
));

const getProdutoImagem = (produto?: ProdutoFormData): string | undefined => {
    if (!produto?.imagens?.length) {
        return undefined;
    }

    const firstImage = produto.imagens[0]?.trim();
    if (!firstImage) {
        return undefined;
    }

    return firstImage;
};

export const VisualizarProdutosPage: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const state = location.state as ProdutoLocationState | null;
    const [showEditProdutoModal, setShowEditProdutoModal] = useState(false);
    const [produtoAtual, setProdutoAtual] = useState<Produto | undefined>(() => state?.produto ?? buildProdutoFromId(id));
    const [produtoFormDataAtual, setProdutoFormDataAtual] = useState<ProdutoFormData | undefined>(() => {
        const produtoInicial = state?.produto ?? buildProdutoFromId(id);
        return produtoInicial ? toProdutoFormData(produtoInicial) : undefined;
    });
    const printRef = useRef<HTMLDivElement>(null);

    const secoes = useMemo(() => buildProdutosMenuSections({}), []);
    const produto = produtoAtual;
    const produtoFormData = produtoFormDataAtual;
    const fotoProduto = useMemo(() => getProdutoImagem(produtoFormData), [produtoFormData]);
    const quickInfo = useMemo<DisplayField[]>(() => produto ? [
        { label: 'Código', value: produto.id },
        { label: 'Código Interno', value: produto.codigoInterno },
        { label: 'Estoque Atual', value: produto.estoque },
        { label: 'Preço de Venda', value: moedaBRL.format(produto.venda) },
    ] : [], [produto]);
    const fieldsDadosProduto = useMemo<DisplayField[]>(() => {
        if (!produto || !produtoFormData) {
            return [];
        }

        return [
            { label: 'Código', value: produto.id },
            { label: 'Código Interno', value: produto.codigoInterno },
            { label: 'Nome', value: produto.nome },
            { label: 'Código de Barras', value: produto.codigoBarras },
            { label: 'Classificações', value: joinList(produtoFormData.classificacoes) },
            { label: 'Fornecedores', value: joinList(produtoFormData.fornecedores) },
            { label: 'Marca', value: produtoFormData.marca },
            { label: 'EAN', value: produtoFormData.ean },
            { label: 'Cor', value: produtoFormData.cor },
            { label: 'Tamanho', value: produtoFormData.tamanho },
            { label: 'Lote', value: produtoFormData.lote },
            { label: 'Condição', value: produtoFormData.condicao },
            { label: 'Gênero', value: produtoFormData.genero },
            { label: 'Grupo de Idade', value: produtoFormData.grupoIdade },
            { label: 'Peso', value: produtoFormData.peso },
            { label: 'Unidade', value: produtoFormData.unidade },
            { label: 'Unidade Tributária', value: produtoFormData.unidadeTributaria },
            { label: 'Localização', value: produtoFormData.localizacao },
            { label: 'Fabricante', value: produtoFormData.fabricante },
            { label: 'Origem do Produto', value: produtoFormData.origemProduto },
            { label: 'Edição', value: produtoFormData.edicao },
            { label: 'Data Fabricação', value: produtoFormData.dataFabricacao },
            { label: 'Data Validade', value: produtoFormData.dataValidade },
            { label: 'Descrição Detalhada', value: produtoFormData.descricaoDetalhada },
            { label: 'Status', value: produto.status.toUpperCase() },
        ];
    }, [produto, produtoFormData]);

    const fieldsExibicaoEstoque = useMemo<DisplayField[]>(() => {
        if (!produto || !produtoFormData) {
            return [];
        }

        return [
            { label: 'Quantidade Dígitos Etiqueta', value: produtoFormData.quantidadeDigitosEtiqueta },
            { label: 'Estoque Inicial', value: produtoFormData.estoqueInicial },
            { label: 'Estoque Atual', value: produto.estoque },
            { label: 'Estoque Mínimo', value: produtoFormData.estoqueMinimo },
            { label: 'Permitir Estoque Zero', value: yesNoLabel(produtoFormData.permitirEstoqueZero) },
            { label: 'Controle Quantidade', value: yesNoLabel(produtoFormData.controleQuantidade) },
            { label: 'Mostrar Loja Virtual', value: yesNoLabel(produtoFormData.mostrarLojaVirtual) },
            { label: 'Mostrar Produto sem Estoque', value: yesNoLabel(produtoFormData.mostrarProdutoSemEstoque) },
            { label: 'Mostrar Estoque Loja Virtual', value: yesNoLabel(produtoFormData.mostrarEstoqueLojaVirtual) },
            { label: 'Gerenciar Estoque Loja Virtual', value: yesNoLabel(produtoFormData.gerenciarEstoqueLojaVirtual) },
            { label: 'Mostrar Marketplace', value: yesNoLabel(produtoFormData.mostrarMarketplace) },
            { label: 'Publicar Shopee', value: yesNoLabel(produtoFormData.publicarShopee) },
            { label: 'Publicar iFood', value: yesNoLabel(produtoFormData.publicarIfood) },
            { label: 'Publicar iFood Mercado', value: yesNoLabel(produtoFormData.publicarIfoodMercado) },
            { label: 'Mostrar Catálogo', value: yesNoLabel(produtoFormData.mostrarCatalogo) },
            { label: 'Mostrar Catálogo Digital', value: yesNoLabel(produtoFormData.mostrarCatalogoDigital) },
            { label: 'Mostrar Tablet PDV', value: yesNoLabel(produtoFormData.mostrarTabletPdv) },
            { label: 'Locação', value: yesNoLabel(produtoFormData.locacao) },
            { label: 'Quantidade Locação', value: produtoFormData.quantidadeLocacao },
            { label: 'Bloquear Desconto', value: yesNoLabel(produtoFormData.bloquearDesconto) },
            { label: 'Ambiente Produção', value: yesNoLabel(produtoFormData.ambienteProducao) },
            { label: 'Solicitar Valor Digitado', value: yesNoLabel(produtoFormData.solicitarValorDigitado) },
            { label: 'Bloquear Alteração Frente Caixa', value: yesNoLabel(produtoFormData.bloquearAlteracaoFrenteCaixa) },
            { label: 'Pedido Equipamento', value: yesNoLabel(produtoFormData.pedidoEquipamento) },
            { label: 'Imagens', value: joinList(produtoFormData.imagens) },
            { label: 'Links de Vídeo', value: joinList(produtoFormData.linksVideo) },
            { label: 'Características', value: produtoFormData.caracteristicas.length ? produtoFormData.caracteristicas.map((item) => `${item.atributo}: ${item.valor}`).join(' | ') : '--' },
            { label: 'Lotes Controle', value: produtoFormData.lotesControle.length ? produtoFormData.lotesControle.map((item) => `${item.numero} (Qtd: ${item.quantidade})`).join(' | ') : '--' },
        ];
    }, [produto, produtoFormData]);

    const fieldsInfoNutricional = useMemo<DisplayField[]>(() => {
        if (!produtoFormData) {
            return [];
        }
        const n = produtoFormData.informacoesNutricionais;

        return [
            { label: 'Possui Informação Nutricional', value: yesNoLabel(n.possuiInformacaoNutricional) },
            { label: 'Validade Dias', value: n.validadeDias },
            { label: 'Porção', value: n.porcao },
            { label: 'Calorias', value: n.calorias },
            { label: 'Carboidratos', value: n.carboidratos },
            { label: 'Proteínas', value: n.proteinas },
            { label: 'Gorduras Totais', value: n.gordurasTotais },
            { label: 'Gorduras Saturadas', value: n.gordurasSaturadas },
            { label: 'Colesterol', value: n.colesterol },
            { label: 'Gorduras Trans', value: n.gordurasTrans },
            { label: 'Fibra', value: n.fibra },
            { label: 'Cálcio', value: n.calcio },
            { label: 'Ferro', value: n.ferro },
            { label: 'Sódio', value: n.sodio },
        ];
    }, [produtoFormData]);

    const fieldsInfoFiscal = useMemo<DisplayField[]>(() => {
        if (!produtoFormData) {
            return [];
        }
        const f = produtoFormData.informacoesFiscais;

        return [
            { label: 'NCM', value: f.ncm },
            { label: 'Imposto Nota', value: f.impostoNota },
            { label: 'CEST', value: f.cest },
            { label: 'Código ANP', value: f.codigoAnp },
            { label: 'CFOP', value: f.cfop },
            { label: 'CSOSN', value: f.csosn },
            { label: 'CST ICMS', value: f.cstIcms },
            { label: 'CST PIS', value: f.cstPis },
            { label: 'CST COFINS', value: f.cstCofins },
            { label: 'CST IPI', value: f.cstIpi },
            { label: 'Origem Fiscal', value: f.origemFiscal },
            { label: 'Alíquota ICMS', value: f.aliquotaIcms },
            { label: 'Alíquota PIS', value: f.aliquotaPis },
            { label: 'Alíquota COFINS', value: f.aliquotaCofins },
            { label: 'Alíquota IPI', value: f.aliquotaIpi },
            { label: 'Observações Fiscais', value: f.observacoesFiscais },
        ];
    }, [produtoFormData]);

    const fieldsValores = useMemo<DisplayField[]>(() => {
        if (!produto || !produtoFormData) {
            return [];
        }
        const p = produtoFormData.precos;

        return [
            { label: 'Preço Custo', value: p.precoCusto || moedaBRL.format(produto.custo) },
            { label: 'Preço Varejo', value: p.precoVarejo || moedaBRL.format(produto.venda) },
            { label: 'Preço Atacado', value: p.precoAtacado },
            { label: 'Preço Prazo', value: p.precoPrazo },
            { label: 'Margem Lucro Tipo', value: p.margemLucroTipo },
            { label: 'Margem Lucro %', value: p.margemLucroPercentual },
            { label: 'Margem Lucro Valor', value: p.margemLucroValor },
            { label: 'Margem Atacado Tipo', value: p.margemAtacadoTipo },
            { label: 'Margem Atacado %', value: p.margemAtacadoPercentual },
            { label: 'Margem Atacado Valor', value: p.margemAtacadoValor },
            { label: 'Margem Prazo Tipo', value: p.margemPrazoTipo },
            { label: 'Margem Prazo %', value: p.margemPrazoPercentual },
            { label: 'Margem Prazo Valor', value: p.margemPrazoValor },
            { label: 'Desconto Máximo Tipo', value: p.descontoMaximoTipo },
            { label: 'Desconto Máximo %', value: p.descontoMaximoPercentual },
            { label: 'Desconto Máximo Valor', value: p.descontoMaximoValor },
            { label: 'Alterar Todos Grade', value: yesNoLabel(p.alterarTodosGrade) },
            { label: 'Arredondar Valor', value: yesNoLabel(p.arredondarValor) },
            { label: 'Preço Varejo e-commerce', value: p.precoVarejoEcommerce },
            { label: 'Preço Atacado e-commerce', value: p.precoAtacadoEcommerce },
            { label: 'Preço Prazo e-commerce', value: p.precoPrazoEcommerce },
            { label: 'Preço iFood', value: p.precoIfood },
            { label: 'Preço iFood Mercado', value: p.precoIfoodMercado },
            { label: 'Preço Shopee', value: p.precoShopee },
            { label: 'Observações Preço', value: p.observacoesPreco },
        ];
    }, [produto, produtoFormData]);

    const fieldsFrete = useMemo<DisplayField[]>(() => {
        if (!produtoFormData) {
            return [];
        }
        const fr = produtoFormData.frete;
        return [
            { label: 'Tipo Correio', value: fr.tipoCorreio },
            { label: 'Peso Bruto', value: fr.pesoBruto },
            { label: 'Peso Líquido', value: fr.pesoLiquido },
            { label: 'Altura', value: fr.altura },
            { label: 'Largura', value: fr.largura },
            { label: 'Comprimento', value: fr.comprimento },
        ];
    }, [produtoFormData]);

    const handleUpdateProduto = (data: ProdutoFormData) => {
        setProdutoFormDataAtual(data);
        setProdutoAtual((prev) => ({
            id: Number(prev?.id ?? data.id ?? Date.now()),
            codigoInterno: data.codigoInterno || prev?.codigoInterno || String(Date.now()),
            nome: data.nome || prev?.nome || '',
            codigoBarras: data.codigoBarras || prev?.codigoBarras || '',
            classificacao: data.classificacoes[0] || prev?.classificacao || 'Sem classificação',
            estoque: Number(data.estoqueInicial || prev?.estoque || 0),
            custo: Number(data.precos.precoCusto.replace('.', '').replace(',', '.')) || prev?.custo || 0,
            venda: Number(data.precos.precoVarejo.replace('.', '').replace(',', '.')) || prev?.venda || 0,
            status: data.status || prev?.status || 'ativo',
        }));
        setShowEditProdutoModal(false);
    };

    const handleOpenEditProdutoModal = () => {
        setShowEditProdutoModal(true);
    };

    const handleCloseEditProdutoModal = () => {
        setShowEditProdutoModal(false);
    };

    return (
        <PageLayout
            title="Visualização de Produto"
            sections={secoes}
        >
            {produto ? (
                <MainCard ref={printRef}>
                    <TopGrid>
                        <FotoColumn>
                            <DetailProfileCard
                                name={produto.nome || 'Produto sem nome'}
                                imageUrl={fotoProduto}
                                imageAlt={`Foto do produto ${produto.nome}`}
                                badges={[
                                    { icon: <FaCheckCircle aria-hidden="true" />, label: produto.status.toUpperCase() },
                                    { icon: <FaTag aria-hidden="true" />, label: produto.classificacao || 'Sem classificação' },
                                ]}
                            />
                            <QuickInfo>
                                {quickInfo.map((item) => (
                                    <QuickItem key={item.label}>
                                        <dt>{item.label}</dt>
                                        <dd>{nv(item.value)}</dd>
                                    </QuickItem>
                                ))}
                            </QuickInfo>
                        </FotoColumn>

                        <SectionsColumn>
                            <SectionBlock>
                                <SectionHeader>
                                    <IoCubeOutline />
                                    <h3>Dados do Produto</h3>
                                    <HeaderActions>
                                        <Botao
                                            nome="Editar Produto"
                                            icone={<FaPen size={16} />}
                                            action={handleOpenEditProdutoModal}
                                        />
                                    </HeaderActions>
                                </SectionHeader>
                                <FieldsGrid>
                                    {renderFieldCards(fieldsDadosProduto)}
                                </FieldsGrid>
                            </SectionBlock>

                            <SectionBlock>
                                <SectionHeader><FaTag /><h3>Exibição e Estoque</h3></SectionHeader>
                                <FieldsGrid>
                                    {renderFieldCards(fieldsExibicaoEstoque)}
                                </FieldsGrid>
                            </SectionBlock>

                            <SectionBlock>
                                <SectionHeader><FaTag /><h3>Informações Nutricionais</h3></SectionHeader>
                                <FieldsGrid>
                                    {renderFieldCards(fieldsInfoNutricional)}
                                </FieldsGrid>
                            </SectionBlock>

                            <SectionBlock>
                                <SectionHeader><FaTag /><h3>Informações Fiscais</h3></SectionHeader>
                                <FieldsGrid>
                                    {renderFieldCards(fieldsInfoFiscal)}
                                </FieldsGrid>
                            </SectionBlock>

                            <SectionBlock>
                                <SectionHeader><FaBoxOpen /><h3>Valores</h3></SectionHeader>
                                <FieldsGrid>
                                    {renderFieldCards(fieldsValores)}
                                </FieldsGrid>
                            </SectionBlock>

                            <SectionBlock>
                                <SectionHeader><FaBoxOpen /><h3>Frete</h3></SectionHeader>
                                <FieldsGrid>
                                    {renderFieldCards(fieldsFrete)}
                                </FieldsGrid>
                            </SectionBlock>
                        </SectionsColumn>
                    </TopGrid>
                </MainCard>
            ) : (
                <EmptyState>Não foi possível carregar os dados do produto.</EmptyState>
            )}

            {showEditProdutoModal && produtoFormData && (
                <Suspense fallback={null}>
                    <ModalAddProdutos
                        show={showEditProdutoModal}
                        onClose={handleCloseEditProdutoModal}
                        onSubmit={handleUpdateProduto}
                        initialData={produtoFormData}
                        mode="edit"
                    />
                </Suspense>
            )}

            {produto && !showEditProdutoModal && (
                <FloatingActions
                    actions={['print']}
                    labels={{ print: 'Imprimir produto' }}
                    printTargetRef={printRef}
                />
            )}
        </PageLayout>
    );
};
