import {
    useMemo,
    useState,
} from 'react';
import styled from 'styled-components';
import {
    FiEdit2,
    FiSearch,
    FiSliders,
} from 'react-icons/fi';
import {
    BiLike,
    BiDislike,
} from 'react-icons/bi';
import {
    ModalSimple,
    ModalSimpleActionButton,
    ModalSimpleActions,
    ModalSimpleForm,
} from '../../common/components/ModalSimple';
import { SearchWrapper } from '../../common/components/PageLayout/styled';
import { Botao } from '../../common/components/Buttons/Botao';
import { BuscaSimples } from '../../common/components/Inputs/BuscaSimples';
import { type TableField } from '../../common/components/Table';
import { ListagemTemplate } from '../../common/components/Templates/ListagemTemplate';
import { CampoFormulario, Input, Select, Textarea } from '../../common/components/Ui';

type RecomendacaoSituacao = 'recomendo' | 'nao_recomendo';

interface Recomendacao {
    id: number;
    situacao: RecomendacaoSituacao;
    data: string;
    documento: string;
    nome: string;
    descricao: string;
}

const recomendacoesMock: Recomendacao[] = [
    {
        id: 1,
        situacao: 'nao_recomendo',
        data: '27/10/2024',
        documento: '419.785.563-88',
        nome: 'ADRIANA NASCIMENTO TEIXEIRA',
        descricao: 'Não recomendo a Carlos porque não cumpriu as metas esperadas e deixou desafios pendentes.',
    },
    {
        id: 2,
        situacao: 'nao_recomendo',
        data: '13/10/2024',
        documento: '083.324.121-41',
        nome: 'ERANGIELE CARNEIRO DOS SANTOS',
        descricao: 'Colaborador desmotivado que reclama, com dúvidas, sem a menor chance de crescimento na empresa.',
    },
    {
        id: 3,
        situacao: 'nao_recomendo',
        data: '13/10/2024',
        documento: '024.561.745-68',
        nome: 'RODRIGO AQUINO DE PAULA',
        descricao: 'Não recomendo porque começou sem brilho hoje está numa falta de produtividade.',
    },
    {
        id: 4,
        situacao: 'nao_recomendo',
        data: '29/08/2024',
        documento: '390.594.779-94',
        nome: 'MARIA IZETE VIEIRA MASSARANI',
        descricao: 'DESPROFISSIONALISMO!',
    },
    {
        id: 5,
        situacao: 'recomendo',
        data: '16/06/2024',
        documento: '010.014.144-44',
        nome: '5454545454',
        descricao: '75449524565654',
    },
    {
        id: 6,
        situacao: 'recomendo',
        data: '06/03/2024',
        documento: '418.160.790-90',
        nome: 'RODRIGO SERTO N02',
        descricao: 'Desde 18, joga tudo em dia.',
    },
    {
        id: 7,
        situacao: 'recomendo',
        data: '22/03/2021',
        documento: '142.910.829-91',
        nome: 'JAQUELINE NUNES DE SOUZA',
        descricao: 'Jaqueline é uma boa cliente e eu recomendo.',
    },
    {
        id: 8,
        situacao: 'recomendo',
        data: '20/03/2009',
        documento: '243.565.875-90',
        nome: 'LINCOLN HERBERT TEDECHA',
        descricao: 'Gosto boa, gosta um da.',
    },
    {
        id: 9,
        situacao: 'recomendo',
        data: '22/03/2000',
        documento: '657.561.453-00',
        nome: 'JOÃO HENRIQUE PEDROZO SILVA',
        descricao: 'Comprou em minha loja e foi feliz em pagamentos, recomendo Pedrozo Silva.',
    },
    {
        id: 10,
        situacao: 'recomendo',
        data: '22/08/2012',
        documento: '113.337.777-73',
        nome: 'RENATA XAVIER DA SILVA',
        descricao: 'Renata sempre comprou comigo e paga direitinho.',
    },
];

const PageGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 20px;
    align-items: start;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

const MainCard = styled.section`
    min-width: 0;
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.08));
    border-radius: var(--radius-sm);
    background: var(--theme-surface, #ffffff);
    box-shadow: 0 18px 45px rgba(var(--bs-primary-rgb), 0.08);
    overflow: hidden;
`;

const TableTopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: 14px var(--space-md) 0;
    flex-wrap: wrap;
`;

const PageSize = styled.label`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: #000;
    font-size: 0.88rem;

    select {
        min-height: 34px;
        border: 1px solid var(--theme-border, #d8e2ef);
        border-radius: 0.1875rem;
        padding: var(--space-2xs) 10px;
        background: var(--theme-surface, #ffffff);
        color: #000;
    }
`;

const TableFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: var(--space-md);
    border-top: 1px solid var(--theme-border, rgba(148, 163, 184, 0.18));
    color: #000;
    font-size: 0.88rem;
    flex-wrap: wrap;
`;

const Pagination = styled.div`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);

    button {
        min-width: 36px;
        height: 36px;
        border: 1px solid var(--theme-border, #d8e2ef);
        border-radius: var(--radius-sm);
        background: var(--theme-surface, #ffffff);
        color: #000;
        font-weight: 500;
    }

    button[aria-current='page'] {
        color: #000;
        border-color: var(--color-main, var(--bs-primary));
        background: rgba(var(--bs-primary-rgb), 0.06);
    }
`;

const SideColumn = styled.aside`
    display: grid;
    gap: var(--space-md);
`;

const InfoCard = styled.section`
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.08));
    border-radius: var(--radius-sm);
    background: var(--theme-surface, #ffffff);
    box-shadow: 0 18px 45px rgba(var(--bs-primary-rgb), 0.08);
    padding: 18px;
`;

const CardTitle = styled.h3`
    margin: 0 0 14px;
    color: #000;
    font-size: var(--font-size-md);
    font-weight: 800;
`;

const LegendGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-sm);
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: #000;
    font-size: 0.9rem;
`;

const TextBlock = styled.div`
    display: grid;
    gap: var(--space-sm);
    color: #000;
    font-size: 0.92rem;
    line-height: 1.6;

    strong {
        color: #000;
    }

    p {
        margin: 0;
    }
`;

const SituationIcon = styled.span<{ $situacao: RecomendacaoSituacao }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${({ $situacao }) => ($situacao === 'recomendo' ? '#56a83f' : '#dc2626')};
    font-size: 1.35rem;
`;

const normalizeText = (value: unknown) =>
    String(value ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

const situacaoIcon = (situacao: RecomendacaoSituacao) => (
    <SituationIcon $situacao={situacao}>
        {situacao === 'recomendo' ? <BiLike /> : <BiDislike />}
    </SituationIcon>
);

const fields: TableField<Recomendacao>[] = [
    {
        id: 'situacao',
        header: 'Situação',
        accessorKey: 'situacao',
        align: 'center',
        width: '78px',
        cell: (value) => situacaoIcon(value as RecomendacaoSituacao),
    },
    { id: 'data', header: 'Data', accessorKey: 'data', width: '116px' },
    { id: 'documento', header: 'Documento', accessorKey: 'documento', width: '145px' },
    { id: 'nome', header: 'Nome', accessorKey: 'nome', width: '220px' },
    { id: 'descricao', header: 'Descrição da Recomendação', accessorKey: 'descricao' },
];

export const RecomendoPage = () => {
    const [pesquisa, setPesquisa] = useState('');
    const [pageSize, setPageSize] = useState(20);
    const [showModal, setShowModal] = useState(false);
    const [editingRecomendacao, setEditingRecomendacao] = useState<Recomendacao | null>(null);
    const [viewingRecomendacao, setViewingRecomendacao] = useState<Recomendacao | null>(null);
    const [formValues, setFormValues] = useState({
        situacao: 'recomendo' as RecomendacaoSituacao,
        documento: '',
        nome: '',
        descricao: '',
    });
    const [recomendacoes, setRecomendacoes] = useState(recomendacoesMock);

    const filteredRows = useMemo(() => {
        const termo = normalizeText(pesquisa);

        if (!termo) {
            return recomendacoes;
        }

        return recomendacoes.filter((row) => [
            row.nome,
            row.documento,
            row.descricao,
            row.situacao === 'recomendo' ? 'recomendo' : 'não recomendo',
        ].some((value) => normalizeText(value).includes(termo)));
    }, [pesquisa, recomendacoes]);

    const visibleRows = filteredRows.slice(0, pageSize);

    const closeModal = () => {
        setShowModal(false);
        setEditingRecomendacao(null);
        setFormValues({
            situacao: 'recomendo',
            documento: '',
            nome: '',
            descricao: '',
        });
    };

    const openCreateModal = () => {
        setEditingRecomendacao(null);
        setFormValues({
            situacao: 'recomendo',
            documento: '',
            nome: '',
            descricao: '',
        });
        setShowModal(true);
    };

    const openEditModal = (recomendacao: Recomendacao) => {
        setEditingRecomendacao(recomendacao);
        setFormValues({
            situacao: recomendacao.situacao,
            documento: recomendacao.documento,
            nome: recomendacao.nome,
            descricao: recomendacao.descricao,
        });
        setShowModal(true);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formValues.nome.trim() || !formValues.documento.trim() || !formValues.descricao.trim()) {
            return;
        }

        if (editingRecomendacao) {
            setRecomendacoes((current) => current.map((row) =>
                row.id === editingRecomendacao.id
                    ? {
                        ...row,
                        ...formValues,
                    }
                    : row
            ));
            closeModal();
            return;
        }

        setRecomendacoes((current) => [
            {
                id: Math.max(...current.map((row) => row.id), 0) + 1,
                data: new Date().toLocaleDateString('pt-BR'),
                ...formValues,
            },
            ...current,
        ]);
        closeModal();
    };

    return (
        <>
            <ListagemTemplate
                titulo="Recomendo / Não Recomendo"
                tituloTabela="Recomendações"
                dados={visibleRows}
                campos={fields}
                mensagemVazia="Nenhuma recomendação encontrada."
                exibirBusca={false}
                conteudoAdicionalToolbar={(
                    <>
                        <SearchWrapper>
                            <BuscaSimples
                                pesquisa={pesquisa}
                                onChange={setPesquisa}
                                placeholder="Buscar por nome, documento ou descrição..."
                            />
                        </SearchWrapper>
                        <Botao
                            nome="Recomendar / Não Recomendar"
                            action={openCreateModal}
                            icone={<FiSliders />}
                        />
                    </>
                )}
                acoes={[
                    { label: 'Visualizar', icon: <FiSearch />, onClick: setViewingRecomendacao },
                    { label: 'Editar', icon: <FiEdit2 />, onClick: openEditModal },
                ]}
                mostrarCabecalhoTabela={false}
                tabelaCompacta
                configurarColunas={false}
                impressao={false}
                exibirAcoesFlutuantes={false}
                modaisAbertos={showModal || Boolean(viewingRecomendacao)}
                renderizarTabela={(tabela) => (
                    <PageGrid>
                    <MainCard>
                        <TableTopBar>
                            <PageSize>
                                Mostrar
                                <Select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </Select>
                                registros por página
                            </PageSize>
                        </TableTopBar>

                        {tabela}

                        <TableFooter>
                            <span>Mostrando 1 a {visibleRows.length} de {filteredRows.length} registros</span>
                            <Pagination>
                                <button type="button" aria-label="Página anterior">‹</button>
                                <button type="button" aria-current="page">1</button>
                                <button type="button">2</button>
                                <button type="button">3</button>
                                <button type="button">4</button>
                                <button type="button">5</button>
                                <button type="button" aria-label="Próxima página">›</button>
                            </Pagination>
                        </TableFooter>
                    </MainCard>

                    <SideColumn>
                        <InfoCard>
                            <CardTitle>LEGENDA</CardTitle>
                            <LegendGrid>
                                <LegendItem>
                                    {situacaoIcon('recomendo')}
                                    <span>Recomendo</span>
                                </LegendItem>
                                <LegendItem>
                                    {situacaoIcon('nao_recomendo')}
                                    <span>Não Recomendo</span>
                                </LegendItem>
                            </LegendGrid>
                        </InfoCard>

                        <InfoCard>
                            <CardTitle>Recomendo / Não Recomendo</CardTitle>
                            <TextBlock>
                                <p><strong>Essa é uma ferramenta que o Emissário recomenda seus clientes</strong> baseando-se no Negativamento a outras empresas e análises.</p>
                                <p>É uma forma de proteger sua empresa, tendo ao lado das informações do consumidor que você já tem disponíveis, uma espécie de recomendação de outros Emissários.</p>
                                <p>Faça as Recomendações, pois é uma importante ferramenta para proteger seu negócio, consulte seu cliente, também os Sistemas do Negativamento com outras empresas.</p>
                            </TextBlock>
                        </InfoCard>
                    </SideColumn>
                    </PageGrid>
                )}
            />

            {showModal ? (
                <ModalSimple
                    title={editingRecomendacao ? 'Editar Recomendação' : 'Recomendar / Não Recomendar'}
                    subtitle={editingRecomendacao ? 'Atualize os dados da recomendação selecionada.' : 'Cadastre uma recomendação vinculada a um cliente ou documento.'}
                    size="md"
                    onClose={closeModal}
                    footer={(
                        <ModalSimpleActions>
                            <ModalSimpleActionButton $variant="secondary" type="button" onClick={closeModal}>
                                Cancelar
                            </ModalSimpleActionButton>
                            <ModalSimpleActionButton type="submit" form="recomendacao-form">
                                {editingRecomendacao ? 'Salvar alterações' : 'Salvar recomendação'}
                            </ModalSimpleActionButton>
                        </ModalSimpleActions>
                    )}
                >
                    <ModalSimpleForm id="recomendacao-form" onSubmit={handleSubmit}>
                        <CampoFormulario rotulo="Situação">
                            <Select
                                value={formValues.situacao}
                                onChange={(event) => setFormValues((current) => ({
                                    ...current,
                                    situacao: event.target.value as RecomendacaoSituacao,
                                }))}
                            >
                                <option value="recomendo">Recomendo</option>
                                <option value="nao_recomendo">Não Recomendo</option>
                            </Select>
                        </CampoFormulario>
                        <CampoFormulario rotulo="Documento">
                            <Input
                                value={formValues.documento}
                                onChange={(event) => setFormValues((current) => ({ ...current, documento: event.target.value }))}
                                placeholder="Digite CPF, CNPJ ou documento"
                            />
                        </CampoFormulario>
                        <CampoFormulario rotulo="Nome">
                            <Input
                                value={formValues.nome}
                                onChange={(event) => setFormValues((current) => ({ ...current, nome: event.target.value }))}
                                placeholder="Digite o nome do cliente"
                            />
                        </CampoFormulario>
                        <CampoFormulario rotulo="Descrição da Recomendação">
                            <Textarea
                                value={formValues.descricao}
                                onChange={(event) => setFormValues((current) => ({ ...current, descricao: event.target.value }))}
                                placeholder="Descreva a recomendação..."
                            />
                        </CampoFormulario>
                    </ModalSimpleForm>
                </ModalSimple>
            ) : null}

            {viewingRecomendacao ? (
                <ModalSimple
                    title="Detalhes da Recomendação"
                    subtitle={viewingRecomendacao.nome}
                    size="md"
                    onClose={() => setViewingRecomendacao(null)}
                    footer={(
                        <ModalSimpleActions>
                            <ModalSimpleActionButton $variant="secondary" type="button" onClick={() => setViewingRecomendacao(null)}>
                                Fechar
                            </ModalSimpleActionButton>
                            <ModalSimpleActionButton
                                type="button"
                                onClick={() => {
                                    setViewingRecomendacao(null);
                                    openEditModal(viewingRecomendacao);
                                }}
                            >
                                Editar
                            </ModalSimpleActionButton>
                        </ModalSimpleActions>
                    )}
                >
                    <TextBlock>
                        <p><strong>Situação:</strong> {viewingRecomendacao.situacao === 'recomendo' ? 'Recomendo' : 'Não Recomendo'}</p>
                        <p><strong>Data:</strong> {viewingRecomendacao.data}</p>
                        <p><strong>Documento:</strong> {viewingRecomendacao.documento}</p>
                        <p><strong>Descrição:</strong> {viewingRecomendacao.descricao}</p>
                    </TextBlock>
                </ModalSimple>
            ) : null}
        </>
    );
};
