import {
    useMemo,
    useState,
} from 'react';
import {
    FiEdit2,
    FiPlus,
    FiToggleLeft,
    FiToggleRight,
    FiTrash2,
} from 'react-icons/fi';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { CadastroAuxiliarTemplate } from '../../../../common/components/Templates/CadastroAuxiliarTemplate';
import { type TableField } from '../../../../common/components/Table';
import { Input, Select } from '../../../../common/components/Ui';
import { moedaBRL } from '../../../../types/Formatadores';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

interface ProdutoPromocao {
    codigoBarras: string;
    descricao: string;
    precoVenda: number;
}

interface PromocaoMultiItens {
    id: number;
    descricao: string;
    tipoPromocao: 'N' | 'S';
    quantidade: number;
    valorDesconto: number;
    dataInicio: string;
    dataFim: string;
    horaInicio: string;
    horaFim: string;
    ativo: boolean;
    produtos: ProdutoPromocao[];
}

interface PromocaoForm {
    descricao: string;
    tipoPromocao: 'N' | 'S';
    quantidade: string;
    valorDesconto: string;
    dataInicio: string;
    dataFim: string;
    horaInicio: string;
    horaFim: string;
    ativo: boolean;
    produtos: ProdutoPromocao[];
}

const produtosDisponiveis: ProdutoPromocao[] = [
    { codigoBarras: '7899565702107', descricao: 'Capa Banco Mod Orig Biz 125 2008', precoVenda: 20 },
    { codigoBarras: '7899565702084', descricao: 'Capa Banco Mod Orig Titan 150 2004/08', precoVenda: 21.85 },
    { codigoBarras: '7891234500012', descricao: 'Óleo Semissintético 10W40', precoVenda: 34.9 },
];

const promocoesMockData: PromocaoMultiItens[] = [
    {
        id: 1,
        descricao: 'LEVE 2 CAPAS',
        tipoPromocao: 'N',
        quantidade: 2,
        valorDesconto: 5,
        dataInicio: '2026-06-01',
        dataFim: '2028-06-01',
        horaInicio: '08:00:00',
        horaFim: '18:00:00',
        ativo: true,
        produtos: [produtosDisponiveis[0], produtosDisponiveis[1]],
    },
];

const gradesDisponiveis: ProdutoPromocao[] = [
    { codigoBarras: '17951372', descricao: 'Capa Banco Mod Orig Biz 125 2008 - Grade Premium', precoVenda: 20 },
    { codigoBarras: '9960935214068', descricao: 'Capa Banco Mod Orig Biz 125 2008 - Grade Banco', precoVenda: 20 },
    { codigoBarras: '7899565721764', descricao: 'Kit Pris Coroa Titan 150 Fan C/Porca - Grade Única', precoVenda: 10.41 },
];

const promocoesGradeMockData: PromocaoMultiItens[] = [
    {
        id: 1,
        descricao: 'LEVE 3 GRADES',
        tipoPromocao: 'S',
        quantidade: 3,
        valorDesconto: 8,
        dataInicio: '2026-06-01',
        dataFim: '2028-06-01',
        horaInicio: '08:00:00',
        horaFim: '18:00:00',
        ativo: true,
        produtos: [gradesDisponiveis[0], gradesDisponiveis[1]],
    },
];

const emptyForm: PromocaoForm = {
    descricao: '',
    tipoPromocao: 'N',
    quantidade: '2',
    valorDesconto: '',
    dataInicio: '2026-06-08',
    dataFim: '2028-06-08',
    horaInicio: '08:00:00',
    horaFim: '18:00:00',
    ativo: true,
    produtos: [],
};

interface PromocaoMultiItensConfig {
    title: string;
    modalTitle: string;
    tableDescription: string;
    itemLabel: string;
    selectPlaceholder: string;
    initialPromocoes: PromocaoMultiItens[];
    itensDisponiveis: ProdutoPromocao[];
}

const ModalGrid = styled.div`
    display: grid;
    gap: 14px;
`;

const FieldGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

const Field = styled.label`
    display: grid;
    gap: 7px;
    color: var(--theme-text, #0f172a);
    font-weight: 500;
`;

const ProductAddRow = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

const ProductList = styled.div`
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: 0.1875rem;
    overflow: hidden;
`;

const ProductItem = styled.div`
    display: grid;
    grid-template-columns: 150px minmax(0, 1fr) 110px auto;
    gap: 10px;
    align-items: center;
    padding: 10px var(--space-sm);
    border-bottom: 1px solid var(--theme-border, #eef2f7);

    &:last-child {
        border-bottom: 0;
    }
`;

const IconButton = styled.button`
    border: 0;
    background: transparent;
    color: #dc2626;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
`;

const StatusText = styled.span<{ $active: boolean }>`
    color: ${({ $active }) => ($active ? '#166534' : '#991b1b')};
    font-weight: 800;
`;

const fields: TableField<PromocaoMultiItens>[] = [
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao', defaultVisible: true },
    { id: 'quantidade', header: 'Quantidade', accessorKey: 'quantidade', align: 'center', defaultVisible: true },
    {
        id: 'codigoBarras',
        header: 'Código Barra',
        accessorFn: (row) => row.produtos.map((produto) => produto.codigoBarras).join(', '),
        defaultVisible: true,
    },
    {
        id: 'valorDesconto',
        header: 'Valor Desconto',
        accessorFn: (row) => moedaBRL.format(row.valorDesconto),
        align: 'right',
        defaultVisible: true,
    },
    { id: 'dataInicio', header: 'Data Início', accessorKey: 'dataInicio', defaultVisible: true },
    { id: 'dataFim', header: 'Data Fim', accessorKey: 'dataFim', defaultVisible: true },
    { id: 'horaInicio', header: 'Hora Início', accessorKey: 'horaInicio', defaultVisible: true },
    { id: 'horaFim', header: 'Hora Fim', accessorKey: 'horaFim', defaultVisible: true },
    {
        id: 'ativo',
        header: 'Status',
        accessorKey: 'ativo',
        align: 'center',
        defaultVisible: true,
        cell: (value) => <StatusText $active={Boolean(value)}>{value ? 'Sim' : 'Não'}</StatusText>,
    },
];

const parseDecimal = (value: string) => {
    const parsed = Number(value.replace(/\./g, '').replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : 0;
};

const toForm = (promocao: PromocaoMultiItens): PromocaoForm => ({
    descricao: promocao.descricao,
    tipoPromocao: promocao.tipoPromocao,
    quantidade: String(promocao.quantidade),
    valorDesconto: String(promocao.valorDesconto).replace('.', ','),
    dataInicio: promocao.dataInicio,
    dataFim: promocao.dataFim,
    horaInicio: promocao.horaInicio,
    horaFim: promocao.horaFim,
    ativo: promocao.ativo,
    produtos: promocao.produtos,
});

const ProdutosPromocaoMultiItensPage = ({
    title,
    modalTitle,
    tableDescription,
    itemLabel,
    selectPlaceholder,
    initialPromocoes,
    itensDisponiveis,
}: PromocaoMultiItensConfig) => {
    const [promocoes, setPromocoes] = useState<PromocaoMultiItens[]>(initialPromocoes);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<PromocaoForm>(emptyForm);
    const [produtoSelecionado, setProdutoSelecionado] = useState('');

    const currentModalTitle = editingId ? `Editar ${modalTitle}` : modalTitle;

    const produtosNaoAdicionados = useMemo(
        () => itensDisponiveis.filter((produto) => !form.produtos.some((item) => item.codigoBarras === produto.codigoBarras)),
        [form.produtos, itensDisponiveis]
    );

    const openCreateModal = () => {
        setEditingId(null);
        setForm(emptyForm);
        setProdutoSelecionado('');
        setModalOpen(true);
    };

    const openEditModal = (promocao: PromocaoMultiItens) => {
        setEditingId(promocao.id);
        setForm(toForm(promocao));
        setProdutoSelecionado('');
        setModalOpen(true);
    };

    const addProduto = () => {
        const produto = itensDisponiveis.find((item) => item.codigoBarras === produtoSelecionado);
        if (!produto) return;

        setForm((current) => ({ ...current, produtos: [...current.produtos, produto] }));
        setProdutoSelecionado('');
    };

    const savePromocao = async () => {
        const quantidade = Number(form.quantidade);
        const valorDesconto = parseDecimal(form.valorDesconto);

        if (!form.descricao.trim()) {
            await Swal.fire('Atenção', 'Informe o nome da promoção.', 'warning');
            return;
        }

        if (!quantidade || quantidade < 2) {
            await Swal.fire('Atenção', 'A quantidade mínima deve ser 2.', 'warning');
            return;
        }

        if (!valorDesconto || valorDesconto <= 0) {
            await Swal.fire('Atenção', 'Informe o valor de desconto.', 'warning');
            return;
        }

        if (!form.produtos.length) {
            await Swal.fire('Atenção', 'Adicione pelo menos um produto à promoção.', 'warning');
            return;
        }

        const payload: Omit<PromocaoMultiItens, 'id'> = {
            descricao: form.descricao.trim().toUpperCase(),
            tipoPromocao: form.tipoPromocao,
            quantidade,
            valorDesconto,
            dataInicio: form.dataInicio,
            dataFim: form.dataFim,
            horaInicio: form.horaInicio,
            horaFim: form.horaFim,
            ativo: form.ativo,
            produtos: form.produtos,
        };

        setPromocoes((current) => {
            if (editingId) {
                return current.map((item) => (item.id === editingId ? { ...payload, id: editingId } : item));
            }

            return [...current, { ...payload, id: Math.max(0, ...current.map((item) => item.id)) + 1 }];
        });

        setModalOpen(false);
    };

    const toggleStatus = (promocao: PromocaoMultiItens) => {
        setPromocoes((current) =>
            current.map((item) => (item.id === promocao.id ? { ...item, ativo: !item.ativo } : item))
        );
    };

    return (
        <>
        <CadastroAuxiliarTemplate
            titulo={title}
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Promoções Cadastradas"
            descricaoTabela={tableDescription}
            dados={promocoes}
            campos={fields}
            mensagemVazia="Nenhuma promoção cadastrada."
            cadastro={{ nome: 'Criar Promoção', action: openCreateModal, icone: <FiPlus /> }}
            modalAberto={modalOpen}
            acoes={[
                        {
                            label: 'Editar',
                            icon: <FiEdit2 size={16} />,
                            onClick: openEditModal,
                        },
                        {
                            label: 'Desativar',
                            icon: <FiToggleLeft size={16} />,
                            variant: 'danger',
                            hidden: (promocao) => !promocao.ativo,
                            onClick: toggleStatus,
                        },
                        {
                            label: 'Ativar',
                            icon: <FiToggleRight size={16} />,
                            variant: 'success',
                            hidden: (promocao) => promocao.ativo,
                            onClick: toggleStatus,
                        },
            ]}
            configurarColunas="tabela"
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
            {modalOpen && (
                <ModalSimple
                    title={currentModalTitle}
                    size="lg"
                    onClose={() => setModalOpen(false)}
                    footer={(
                        <>
                            <ModalSimpleActionButton $variant="secondary" type="button" onClick={() => setModalOpen(false)}>
                                Fechar
                            </ModalSimpleActionButton>
                            <ModalSimpleActionButton type="button" onClick={() => void savePromocao()}>
                                Salvar
                            </ModalSimpleActionButton>
                        </>
                    )}
                >
                    <ModalGrid>
                        <FieldGrid>
                            <Field>
                                Nome:
                                <Input value={form.descricao} onChange={(event) => setForm((current) => ({ ...current, descricao: event.target.value }))} />
                            </Field>

                            <Field>
                                Valor desconto:
                                <Input value={form.valorDesconto} onChange={(event) => setForm((current) => ({ ...current, valorDesconto: event.target.value }))} />
                            </Field>

                            <Field>
                                Tipo promoção:
                                <Select value={form.tipoPromocao} onChange={(event) => setForm((current) => ({ ...current, tipoPromocao: event.target.value as 'N' | 'S' }))}>
                                    <option value="N">A cada</option>
                                    <option value="S">A partir de</option>
                                </Select>
                            </Field>

                            <Field>
                                Quantidade:
                                <Input type="number" min={2} value={form.quantidade} onChange={(event) => setForm((current) => ({ ...current, quantidade: event.target.value }))} />
                            </Field>

                            <Field>
                                Data Inicio:
                                <Input type="date" value={form.dataInicio} onChange={(event) => setForm((current) => ({ ...current, dataInicio: event.target.value }))} />
                            </Field>

                            <Field>
                                Data Fim:
                                <Input type="date" value={form.dataFim} onChange={(event) => setForm((current) => ({ ...current, dataFim: event.target.value }))} />
                            </Field>

                            <Field>
                                Hora Inicio:
                                <Input value={form.horaInicio} onChange={(event) => setForm((current) => ({ ...current, horaInicio: event.target.value }))} />
                            </Field>

                            <Field>
                                Hora Fim:
                                <Input value={form.horaFim} onChange={(event) => setForm((current) => ({ ...current, horaFim: event.target.value }))} />
                            </Field>

                            <Field>
                                Status:
                                <Select value={form.ativo ? '1' : '0'} onChange={(event) => setForm((current) => ({ ...current, ativo: event.target.value === '1' }))}>
                                    <option value="1">Ativo</option>
                                    <option value="0">Inativo</option>
                                </Select>
                            </Field>
                        </FieldGrid>

                        <h4>{itemLabel} Adicionados</h4>
                        <ProductList>
                            {form.produtos.length ? form.produtos.map((produto) => (
                                <ProductItem key={produto.codigoBarras}>
                                    <span>{produto.codigoBarras}</span>
                                    <strong>{produto.descricao}</strong>
                                    <span>{moedaBRL.format(produto.precoVenda)}</span>
                                    <IconButton
                                        type="button"
                                        onClick={() => setForm((current) => ({
                                            ...current,
                                            produtos: current.produtos.filter((item) => item.codigoBarras !== produto.codigoBarras),
                                        }))}
                                    >
                                        <FiTrash2 />
                                    </IconButton>
                                </ProductItem>
                            )) : (
                                <ProductItem>
                                    <span>--</span>
                                    <strong>Nenhum item adicionado.</strong>
                                    <span>--</span>
                                    <span />
                                </ProductItem>
                            )}
                        </ProductList>

                        <ProductAddRow>
                            <Select value={produtoSelecionado} onChange={(event) => setProdutoSelecionado(event.target.value)}>
                                <option value="">{selectPlaceholder}</option>
                                {produtosNaoAdicionados.map((produto) => (
                                    <option key={produto.codigoBarras} value={produto.codigoBarras}>
                                        {produto.codigoBarras} - {produto.descricao}
                                    </option>
                                ))}
                            </Select>
                            <Botao nome={`Adicionar ${itemLabel}`} action={addProduto} />
                        </ProductAddRow>
                    </ModalGrid>
                </ModalSimple>
            )}
        </>
    );
};

export const ProdutosPromocaoMultiItensProdutoPage = () => (
    <ProdutosPromocaoMultiItensPage
        title="Promoção Multi-Itens por Produto"
        modalTitle="Promoção Multi-Itens por Produto"
        tableDescription="Promoções multi-itens configuradas por produto."
        itemLabel="Produtos"
        selectPlaceholder="Selecione um produto"
        initialPromocoes={promocoesMockData}
        itensDisponiveis={produtosDisponiveis}
    />
);

export const ProdutosPromocaoMultiItensGradePage = () => (
    <ProdutosPromocaoMultiItensPage
        title="Promoção Multi-Itens por Grade"
        modalTitle="Promoção Multi-Itens por Grade"
        tableDescription="Promoções multi-itens configuradas por grade."
        itemLabel="Grades"
        selectPlaceholder="Selecione uma grade"
        initialPromocoes={promocoesGradeMockData}
        itensDisponiveis={gradesDisponiveis}
    />
);
