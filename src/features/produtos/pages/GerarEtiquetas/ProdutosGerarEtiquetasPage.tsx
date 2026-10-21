import { useMemo, useState } from 'react';
import { FiPlus, FiPrinter, FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { type TableField } from '../../../../common/components/Table';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import { Input, Select } from '../../../../common/components/Ui';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

type ModeloEtiqueta = 'padrao' | 'outras' | 'filipaper';
type TipoItem = 'produto' | 'kit';
type ModoEmissao = 'unico' | 'varios';

interface EtiquetaItem {
    id: number;
    codigoBarras: string;
    descricao: string;
    quantidade: number;
    tipo: TipoItem;
}

const produtosMock = [
    { codigoBarras: '7899565702107', descricao: 'Capa Banco Mod Orig Biz 125 2008' },
    { codigoBarras: '7899565702084', descricao: 'Capa Banco Mod Orig Titan 150 2004/08' },
    { codigoBarras: 'KIT001', descricao: 'Kit / Combo Revisão Básica' },
];

const notasEntrada = ['352606000001', '352606000002', 'MANUAL-001'];

const ContentStack = styled.div`
    display: grid;
    gap: 18px;
`;

const Panel = styled.section`
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: 0.1875rem;
    background: var(--theme-surface, #ffffff);
    padding: 22px;
    display: grid;
    gap: 18px;
`;

const HeaderText = styled.div`
    display: grid;
    gap: 6px;

    h3 {
        margin: 0;
        color: var(--theme-text, #0f172a);
        font-size: 1.15rem;
    }

    p {
        margin: 0;
        color: var(--theme-text-soft, #475569);
    }
`;

const OptionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

const OptionCard = styled.button<{ $active: boolean }>`
    border: 2px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-border, #d8e2ef)')};
    border-radius: 0.1875rem;
    background: ${({ $active }) => ($active ? 'var(--theme-surface-soft, #f0f7ff)' : '#ffffff')};
    color: var(--theme-text, #0f172a);
    padding: 14px;
    text-align: left;
    cursor: pointer;
    display: grid;
    gap: var(--space-2xs);
    font-weight: 800;

    span {
        color: var(--theme-text-soft, #475569);
        font-weight: 500;
        font-size: 0.9rem;
    }
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 14px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const Field = styled.label<{ $span?: number }>`
    grid-column: span ${({ $span = 3 }) => $span};
    display: grid;
    gap: 7px;
    color: var(--theme-text, #0f172a);
    font-weight: 500;

    @media (max-width: 900px) {
        grid-column: span 1;
    }
`;

const WarningText = styled.p`
    margin: 0;
    color: #dc2626;
    font-size: 0.9rem;
`;

const fields: TableField<EtiquetaItem>[] = [
    { id: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao', defaultVisible: true },
    { id: 'quantidade', header: 'Quantidade', accessorKey: 'quantidade', align: 'center', defaultVisible: true },
    { id: 'tipo', header: 'Tipo', accessorKey: 'tipo', align: 'center', defaultVisible: true },
];

const modeloLabels: Record<ModeloEtiqueta, string> = {
    padrao: 'Etiqueta Padrão',
    outras: 'Outras Etiquetas',
    filipaper: 'Filipaper',
};

export const ProdutosGerarEtiquetasPage = () => {
    const [modelo, setModelo] = useState<ModeloEtiqueta>('padrao');
    const [tipoItem, setTipoItem] = useState<TipoItem>('produto');
    const [modo, setModo] = useState<ModoEmissao>('unico');
    const [notaEntrada, setNotaEntrada] = useState('0');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [quantidade, setQuantidade] = useState('1');
    const [itens, setItens] = useState<EtiquetaItem[]>([]);

    const produtosFiltrados = useMemo(() => {
        if (tipoItem === 'kit') {
            return produtosMock.filter((produto) => produto.codigoBarras.startsWith('KIT'));
        }

        return produtosMock.filter((produto) => !produto.codigoBarras.startsWith('KIT'));
    }, [tipoItem]);

    const adicionarItem = async () => {
        const produto = produtosMock.find((item) => item.codigoBarras === codigoBarras.trim());
        const qtde = Number(quantidade);

        if (!produto) {
            await Swal.fire('Atenção', 'Produto não encontrado para o código informado.', 'warning');
            return;
        }

        if (!Number.isFinite(qtde) || qtde <= 0) {
            await Swal.fire('Atenção', 'Informe uma quantidade válida.', 'warning');
            return;
        }

        setItens((current) => [
            ...current,
            {
                id: Date.now(),
                codigoBarras: produto.codigoBarras,
                descricao: produto.descricao,
                quantidade: qtde,
                tipo: tipoItem,
            },
        ]);
        setCodigoBarras('');
        setQuantidade('1');
    };

    const confirmar = async () => {
        const itensParaEmitir = modo === 'unico' && !itens.length ? 1 : itens.length;

        if (!itensParaEmitir) {
            await Swal.fire('Atenção', 'Adicione pelo menos um produto para gerar etiqueta.', 'warning');
            return;
        }

        await Swal.fire(
            'Etiquetas geradas',
            `${modeloLabels[modelo]} preparada(s) para ${itensParaEmitir} item(ns).`,
            'success'
        );
    };

    return (
        <ListagemTemplate
            titulo="Gerar Etiquetas"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Itens da etiqueta"
            descricaoTabela={`Modelo selecionado: ${modeloLabels[modelo]}.`}
            dados={itens}
            campos={fields}
            mensagemVazia="Nenhum item adicionado."
            conteudoAntesTabela={<>
                <Panel>
                    <HeaderText>
                        <h3>Escolher Tipo de Etiqueta</h3>
                        <p>Selecione o modelo de impressão e os produtos que terão etiquetas emitidas.</p>
                    </HeaderText>

                    <OptionGrid>
                        <OptionCard type="button" $active={modelo === 'padrao'} onClick={() => setModelo('padrao')}>
                            Padrão
                            <span>Fluxo principal de etiqueta do estoque.</span>
                        </OptionCard>
                        <OptionCard type="button" $active={modelo === 'outras'} onClick={() => setModelo('outras')}>
                            Outras
                            <span>Modelo alternativo configurável.</span>
                        </OptionCard>
                        <OptionCard type="button" $active={modelo === 'filipaper'} onClick={() => setModelo('filipaper')}>
                            Filipaper
                            <span>Modelo específico para folhas Filipaper.</span>
                        </OptionCard>
                    </OptionGrid>
                </Panel>

                <Panel>
                    <FormGrid>
                        <Field $span={3}>
                            Produto / Kit
                            <Select value={tipoItem} onChange={(event) => setTipoItem(event.target.value as TipoItem)}>
                                <option value="produto">Produto</option>
                                <option value="kit">Kit / Combo</option>
                            </Select>
                        </Field>

                        <Field $span={3}>
                            Quantidade de Produtos
                            <Select value={modo} onChange={(event) => setModo(event.target.value as ModoEmissao)}>
                                <option value="unico">Único Produto</option>
                                <option value="varios">Vários Produtos</option>
                            </Select>
                        </Field>

                        <Field $span={3}>
                            Número Nota Entrada
                            <Select value={notaEntrada} onChange={(event) => setNotaEntrada(event.target.value)}>
                                <option value="0">Informe o Nº da Nota</option>
                                {notasEntrada.map((nota) => (
                                    <option key={nota} value={nota}>{nota}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field $span={3}>
                            Produto rápido
                            <Select value={codigoBarras} onChange={(event) => setCodigoBarras(event.target.value)}>
                                <option value="">Selecione</option>
                                {produtosFiltrados.map((produto) => (
                                    <option key={produto.codigoBarras} value={produto.codigoBarras}>
                                        {produto.codigoBarras} - {produto.descricao}
                                    </option>
                                ))}
                            </Select>
                        </Field>

                        <Field $span={5}>
                            Código Barra / Descrição
                            <Input value={codigoBarras} onChange={(event) => setCodigoBarras(event.target.value)} />
                        </Field>

                        <Field $span={2}>
                            Quantidade
                            <Input value={quantidade} onChange={(event) => setQuantidade(event.target.value)} />
                        </Field>

                        <Field $span={2}>
                            &nbsp;
                            <Botao nome="Adicionar" icone={<FiPlus />} action={() => void adicionarItem()} />
                        </Field>
                    </FormGrid>

                    <WarningText>*Produtos sem quantidade não terão etiquetas emitidas.</WarningText>
                </Panel>
            </>}
            acoes={[
                        {
                            label: 'Remover',
                            icon: <FiTrash2 size={16} />,
                            variant: 'danger',
                            onClick: (item) => setItens((current) => current.filter((row) => row.id !== item.id)),
                        },
            ]}
            conteudoDepoisTabela={(
                <div>
                    <Botao nome="Confirmar" icone={<FiPrinter />} action={() => void confirmar()} />
                </div>
            )}
            renderizarConteudo={(conteudo) => <ContentStack>{conteudo}</ContentStack>}
            configurarColunas={false}
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
    );
};
