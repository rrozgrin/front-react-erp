import {
    useMemo,
    useState,
} from 'react';
import {
    FiEdit2,
    FiToggleLeft,
    FiToggleRight,
} from 'react-icons/fi';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import { CadastroAuxiliarTemplate } from '../../../../common/components/Templates/CadastroAuxiliarTemplate';
import { type TableField } from '../../../../common/components/Table';
import { Input, Select } from '../../../../common/components/Ui';
import { moedaBRL } from '../../../../types/Formatadores';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';
import {
    ActionsRow,
    Field,
    FiltersGrid,
    FiltersHeader,
    FiltersPanel,
    SummaryText,
    TextInput,
    normalizeText,
} from '../../../../common/components/ReportFilters';

interface MaisPorMenos {
    id: number;
    produto: string;
    usuarioCadastro: string;
    dataInicio: string;
    dataFim: string;
    horaInicio: string;
    horaFim: string;
    tipoDesconto: 'C' | 'A';
    fatorQuantidade: number;
    valorVenda: number;
    valorDesconto: number;
    ativo: boolean;
}

const promocoesMockData: MaisPorMenos[] = [
    {
        id: 1,
        produto: 'Capa Banco Mod Orig Biz 125 2008',
        usuarioCadastro: 'Funcionário Master',
        dataInicio: '2026-06-08',
        dataFim: '2028-06-08',
        horaInicio: '08:00',
        horaFim: '18:00',
        tipoDesconto: 'C',
        fatorQuantidade: 3,
        valorVenda: 60,
        valorDesconto: 10,
        ativo: true,
    },
    {
        id: 2,
        produto: 'Óleo Semissintético 10W40',
        usuarioCadastro: 'Funcionário Master',
        dataInicio: '2026-06-01',
        dataFim: '2028-06-01',
        horaInicio: '09:00',
        horaFim: '17:00',
        tipoDesconto: 'A',
        fatorQuantidade: 2,
        valorVenda: 69.8,
        valorDesconto: 7.5,
        ativo: false,
    },
];

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

const ModalField = styled.label`
    display: grid;
    gap: 7px;
    color: var(--theme-text, #0f172a);
    font-weight: 500;
`;

const StatusText = styled.span<{ $active: boolean }>`
    color: ${({ $active }) => ($active ? '#166534' : '#991b1b')};
    font-weight: 800;
`;

const fields: TableField<MaisPorMenos>[] = [
    { id: 'produto', header: 'Produto', accessorKey: 'produto', defaultVisible: true },
    { id: 'usuarioCadastro', header: 'Usuário Cadastro', accessorKey: 'usuarioCadastro', defaultVisible: true },
    { id: 'dataInicio', header: 'Data Início', accessorKey: 'dataInicio', defaultVisible: true },
    { id: 'dataFim', header: 'Data Fim', accessorKey: 'dataFim', defaultVisible: true },
    { id: 'fatorQuantidade', header: 'Fator(Quantidade)', accessorKey: 'fatorQuantidade', align: 'center', defaultVisible: true },
    {
        id: 'valorDesconto',
        header: 'Valor Desconto(R$)',
        accessorFn: (row) => moedaBRL.format(row.valorDesconto),
        align: 'right',
        defaultVisible: true,
    },
    {
        id: 'ativo',
        header: 'Ativo',
        accessorKey: 'ativo',
        align: 'center',
        defaultVisible: true,
        cell: (value) => <StatusText $active={Boolean(value)}>{value ? 'Ativo' : 'Inativo'}</StatusText>,
    },
];

const parseDecimal = (value: string) => {
    const parsed = Number(value.replace(/\./g, '').replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : 0;
};

export const ProdutosMaisPorMenosPage = () => {
    const [promocoes, setPromocoes] = useState<MaisPorMenos[]>(promocoesMockData);
    const [filtro, setFiltro] = useState('');
    const [editing, setEditing] = useState<MaisPorMenos | null>(null);

    const promocoesFiltradas = useMemo(() => {
        const termo = normalizeText(filtro);
        if (!termo) return promocoes;
        return promocoes.filter((item) => normalizeText(item.produto).includes(termo) || normalizeText(item.usuarioCadastro).includes(termo));
    }, [filtro, promocoes]);

    const updateEditing = <K extends keyof MaisPorMenos>(field: K, value: MaisPorMenos[K]) => {
        setEditing((current) => (current ? { ...current, [field]: value } : current));
    };

    const salvar = async () => {
        if (!editing) return;

        if (!editing.fatorQuantidade || editing.fatorQuantidade < 1) {
            await Swal.fire('Atenção', 'Informe a quantidade da promoção.', 'warning');
            return;
        }

        if (!editing.valorDesconto || editing.valorDesconto <= 0) {
            await Swal.fire('Atenção', 'Informe o valor a ser descontado.', 'warning');
            return;
        }

        setPromocoes((current) => current.map((item) => (item.id === editing.id ? editing : item)));
        setEditing(null);
    };

    const alternarStatus = (promocao: MaisPorMenos) => {
        setPromocoes((current) => current.map((item) => (item.id === promocao.id ? { ...item, ativo: !item.ativo } : item)));
    };

    return (
        <>
        <CadastroAuxiliarTemplate
            titulo="Promoção Mais por Menos"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Promoções Cadastradas"
            descricaoTabela="Listagem de produtos em Mais por Menos."
            dados={promocoesFiltradas}
            campos={fields}
            mensagemVazia="Nenhuma promoção encontrada."
            conteudoAntesTabela={(
                <FiltersPanel>
                    <FiltersHeader>
                        <h3>Promoções Cadastradas</h3>
                        <p>Pesquise por produto ou usuário de cadastro.</p>
                    </FiltersHeader>
                    <FiltersGrid>
                        <Field $span={4}>
                            <span>Pesquisar</span>
                            <TextInput value={filtro} onChange={(event) => setFiltro(event.target.value)} placeholder="Digite aqui" />
                        </Field>
                    </FiltersGrid>
                    <ActionsRow>
                        <SummaryText>{promocoesFiltradas.length} promoção(ões) encontrada(s).</SummaryText>
                    </ActionsRow>
                </FiltersPanel>
            )}
            acoes={[
                        {
                            label: 'Editar',
                            icon: <FiEdit2 size={16} />,
                            onClick: setEditing,
                        },
                        {
                            label: 'Desativar',
                            icon: <FiToggleLeft size={16} />,
                            variant: 'danger',
                            hidden: (promocao) => !promocao.ativo,
                            onClick: alternarStatus,
                        },
                        {
                            label: 'Ativar',
                            icon: <FiToggleRight size={16} />,
                            variant: 'success',
                            hidden: (promocao) => promocao.ativo,
                            onClick: alternarStatus,
                        },
            ]}
            modalAberto={Boolean(editing)}
            agruparConteudo
            configurarColunas="tabela"
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
            {editing && (
                <ModalSimple
                    title="Editar Mais Por Menos"
                    size="lg"
                    onClose={() => setEditing(null)}
                    footer={(
                        <>
                            <ModalSimpleActionButton $variant="secondary" type="button" onClick={() => setEditing(null)}>
                                Fechar
                            </ModalSimpleActionButton>
                            <ModalSimpleActionButton type="button" onClick={() => void salvar()}>
                                Salvar
                            </ModalSimpleActionButton>
                        </>
                    )}
                >
                    <FormGrid>
                        <ModalField>
                            Produto
                            <Input value={editing.produto} disabled />
                        </ModalField>
                        <ModalField>
                            Tipo de desconto
                            <Select value={editing.tipoDesconto} onChange={(event) => updateEditing('tipoDesconto', event.target.value as 'C' | 'A')}>
                                <option value="C">A CADA</option>
                                <option value="A">A PARTIR</option>
                            </Select>
                        </ModalField>
                        <ModalField>
                            Data Inicial
                            <Input value={editing.dataInicio} type="date" onChange={(event) => updateEditing('dataInicio', event.target.value)} />
                        </ModalField>
                        <ModalField>
                            Hora Inicial
                            <Input value={editing.horaInicio} onChange={(event) => updateEditing('horaInicio', event.target.value)} />
                        </ModalField>
                        <ModalField>
                            Data Final
                            <Input value={editing.dataFim} type="date" onChange={(event) => updateEditing('dataFim', event.target.value)} />
                        </ModalField>
                        <ModalField>
                            Hora Final
                            <Input value={editing.horaFim} onChange={(event) => updateEditing('horaFim', event.target.value)} />
                        </ModalField>
                        <ModalField>
                            {editing.tipoDesconto === 'A' ? 'A Partir de' : 'A Cada'} Quantidade(s)
                            <Input
                                type="number"
                                value={editing.fatorQuantidade}
                                onChange={(event) => updateEditing('fatorQuantidade', Number(event.target.value))}
                            />
                        </ModalField>
                        <ModalField>
                            Valor de Venda
                            <Input value={moedaBRL.format(editing.valorVenda)} disabled />
                        </ModalField>
                        <ModalField>
                            Valor à ser Descontado
                            <Input
                                value={String(editing.valorDesconto).replace('.', ',')}
                                onChange={(event) => updateEditing('valorDesconto', parseDecimal(event.target.value))}
                            />
                        </ModalField>
                    </FormGrid>
                </ModalSimple>
            )}
        </>
    );
};
