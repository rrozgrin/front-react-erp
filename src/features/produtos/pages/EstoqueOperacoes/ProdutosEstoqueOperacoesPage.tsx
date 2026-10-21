import { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { type TableField } from '../../../../common/components/Table';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import { Input, Select } from '../../../../common/components/Ui';
import { moedaBRL } from '../../../../types/Formatadores';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

type EstoqueModo = 'entrada' | 'saida' | 'ajuste';

interface EstoqueItem {
    id: number;
    codigoBarras: string;
    descricao: string;
    estoqueAtual: number;
    quantidade: number;
    custo: number;
    venda: number;
    lote?: string;
}

const produtosMock = [
    { codigoBarras: '7899565702107', descricao: 'Capa Banco Mod Orig Biz 125 2008', estoqueAtual: 2, custo: 10, venda: 20 },
    { codigoBarras: '7899565702084', descricao: 'Capa Banco Mod Orig Titan 150 2004/08', estoqueAtual: 25, custo: 16.81, venda: 21.85 },
    { codigoBarras: '7891234500012', descricao: 'Óleo Semissintético 10W40', estoqueAtual: 48, custo: 22.5, venda: 34.9 },
];

const modoLabels: Record<EstoqueModo, string> = {
    entrada: 'Entrada no Estoque (Adicionar)',
    saida: 'Saída no Estoque (Diminuir)',
    ajuste: 'Ajuste no Estoque (Alterar)',
};

const PageStack = styled.div`
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

const ModeTitle = styled.div.attrs({ 'data-app-title': true })`
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

const WarningPanel = styled.div`
    border: 1px solid #fde68a;
    border-radius: 0.1875rem;
    background: #fffbeb;
    color: #92400e;
    padding: 14px;
    font-weight: 500;
`;

const fields: TableField<EstoqueItem>[] = [
    { id: 'codigoBarras', header: 'Cód. Barras', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao', defaultVisible: true },
    { id: 'estoqueAtual', header: 'Qtde Atual', accessorKey: 'estoqueAtual', align: 'center', defaultVisible: true },
    { id: 'quantidade', header: 'Qtde Movimento', accessorKey: 'quantidade', align: 'center', defaultVisible: true },
    { id: 'custo', header: 'Vlr. Custo Unit.', accessorFn: (row) => moedaBRL.format(row.custo), align: 'right', defaultVisible: true },
    { id: 'venda', header: 'Vlr. Venda', accessorFn: (row) => moedaBRL.format(row.venda), align: 'right', defaultVisible: true },
    { id: 'lote', header: 'Lote', accessorKey: 'lote', defaultVisible: true },
    {
        id: 'total',
        header: 'Total',
        accessorFn: (row) => moedaBRL.format(row.quantidade * row.custo),
        align: 'right',
        defaultVisible: true,
    },
];

const getHelpText = (modo: EstoqueModo) => {
    if (modo === 'entrada') return 'Inclua produtos em uma nota/manual ou carregue entrada por XML.';
    if (modo === 'saida') return 'Registre retirada manual para diminuir o saldo dos produtos.';
    return 'Altere o saldo atual do produto para uma quantidade exata.';
};

export const ProdutosEstoqueOperacoesPage = () => {
    const { tipo } = useParams();
    const modo = (tipo ?? 'entrada') as EstoqueModo;
    const [codigoBarras, setCodigoBarras] = useState('');
    const [quantidade, setQuantidade] = useState('1');
    const [numeroNota, setNumeroNota] = useState('');
    const [fornecedor, setFornecedor] = useState('0');
    const [usarXml, setUsarXml] = useState('nao');
    const [lote, setLote] = useState('');
    const [itens, setItens] = useState<EstoqueItem[]>([]);

    const title = useMemo(() => {
        if (modo === 'entrada') return 'Entrada de Estoque de Produtos';
        if (modo === 'saida') return 'Saída de Estoque de Produtos';
        return 'Ajuste de Estoque de Produtos';
    }, [modo]);

    if (!['entrada', 'saida', 'ajuste'].includes(modo)) {
        return <Navigate to="/produtos/estoque/entrada" replace />;
    }

    const adicionarItem = async () => {
        const produto = produtosMock.find((item) => item.codigoBarras === codigoBarras.trim());
        const qtde = Number(quantidade);

        if (!produto) {
            await Swal.fire('Atenção', 'Produto não encontrado pelo código de barras.', 'warning');
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
                ...produto,
                quantidade: qtde,
                lote,
            },
        ]);
        setCodigoBarras('');
        setQuantidade('1');
        setLote('');
    };

    const confirmarMovimento = async () => {
        if (!itens.length) {
            await Swal.fire('Atenção', 'Adicione pelo menos um produto.', 'warning');
            return;
        }

        setItens([]);
        await Swal.fire('Sucesso', `${modoLabels[modo]} confirmada com sucesso.`, 'success');
    };

    return (
        <ListagemTemplate
            titulo="Entrada, Saída e Ajuste de Estoque de Produtos"
            secoes={buildProdutosMenuSections({})}
            tituloTabela={modo === 'entrada' ? 'Relação de produtos incluídos nesta nota' : 'Produtos do movimento'}
            descricaoTabela="Lista temporária da operação selecionada no submenu Estoque."
            dados={itens}
            campos={fields}
            mensagemVazia="Nenhum produto incluído."
            conteudoAntesTabela={<>
                <Panel>
                    <ModeTitle>
                        <h3>{title}</h3>
                        <p>{getHelpText(modo)}</p>
                    </ModeTitle>

                    {modo === 'entrada' && (
                        <FormGrid>
                            <Field $span={3}>
                                Inserir Arquivo XML:
                                <Select value={usarXml} onChange={(event) => setUsarXml(event.target.value)}>
                                    <option value="nao">Não</option>
                                    <option value="sim">Sim</option>
                                </Select>
                            </Field>

                            {usarXml === 'sim' ? (
                                <Field $span={5}>
                                    Localize o arquivo:
                                    <Input type="file" accept=".xml" />
                                </Field>
                            ) : (
                                <>
                                    <Field $span={3}>
                                        No. Nota Fiscal:
                                        <Input value={numeroNota} onChange={(event) => setNumeroNota(event.target.value)} />
                                    </Field>
                                    <Field $span={4}>
                                        Fornecedor:
                                        <Select value={fornecedor} onChange={(event) => setFornecedor(event.target.value)}>
                                            <option value="0">-- Selecione --</option>
                                            <option value="1">Moto Peças Centro</option>
                                            <option value="2">Distribuidora Norte</option>
                                        </Select>
                                    </Field>
                                </>
                            )}
                        </FormGrid>
                    )}

                    <FormGrid>
                        <Field $span={3}>
                            Cód. de Barras
                            <Input value={codigoBarras} onChange={(event) => setCodigoBarras(event.target.value)} />
                        </Field>
                        <Field $span={2}>
                            {modo === 'ajuste' ? 'Nova Quantidade' : 'Quantidade'}
                            <Input value={quantidade} onChange={(event) => setQuantidade(event.target.value)} />
                        </Field>
                        <Field $span={3}>
                            Nº do Lote
                            <Input value={lote} onChange={(event) => setLote(event.target.value)} placeholder="Opcional" />
                        </Field>
                        <Field $span={2}>
                            &nbsp;
                            <Botao nome="Adicionar" action={() => void adicionarItem()} />
                        </Field>
                    </FormGrid>
                </Panel>

                {itens.length > 0 && (
                    <WarningPanel>
                        Esta operação ainda não foi finalizada. Para concluir, confirme o movimento no estoque.
                    </WarningPanel>
                )}
            </>}
            acoes={[
                        {
                            label: 'Remover',
                            icon: <span>×</span>,
                            variant: 'danger',
                            onClick: (item) => setItens((current) => current.filter((row) => row.id !== item.id)),
                        },
            ]}
            conteudoDepoisTabela={(
                <div>
                    <Botao nome={`Confirmar ${modoLabels[modo]}`} action={() => void confirmarMovimento()} />
                </div>
            )}
            renderizarConteudo={(conteudo) => <PageStack>{conteudo}</PageStack>}
            configurarColunas={false}
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
    );
};
