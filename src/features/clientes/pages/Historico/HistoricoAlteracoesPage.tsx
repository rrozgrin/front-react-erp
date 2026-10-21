import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import { SearchWrapper } from '../../../../common/components/PageLayout/styled';
import { BuscaSimples } from '../../../../common/components/Inputs/BuscaSimples';
import { buildClientesMenuSections } from '../shared/clientesMenuSections';
import { Table, type TableField } from '../../../../common/components/Table';
import { Panel, Select } from '../../../../common/components/Ui';

type CampoAlterado = {
    campo: string;
    valorAnterior: string;
    valorNovo: string;
};

type AlteracaoCliente = {
    id: number;
    clienteId: number;
    clienteNome: string;
    alteradoPor: string;
    alteradoPorId: number;
    dataHora: string;
    mudancas: CampoAlterado[];
};

const alteracoesMock: AlteracaoCliente[] = [
    {
        id: 1,
        clienteId: 9125561,
        clienteNome: 'ADOBE TELHAS',
        alteradoPor: 'FUNCIONARIO MASTER',
        alteradoPorId: 80,
        dataHora: '2026-04-01 13:53:04',
        mudancas: [
            {
                campo: 'uf',
                valorAnterior: 'PE',
                valorNovo: 'PR',
            },
        ],
    },
    {
        id: 2,
        clienteId: 11096832,
        clienteNome: 'RAFAEL R',
        alteradoPor: 'FUNCIONARIO MASTER',
        alteradoPorId: 80,
        dataHora: '2026-03-30 09:30:23',
        mudancas: [
            {
                campo: 'endereco',
                valorAnterior: 'PROFESSOR JOAO SOARES BARCELO',
                valorNovo: 'PROFESSOR JOAO SOARES BARCEL',
            },
            {
                campo: 'bairro',
                valorAnterior: 'CENTRO',
                valorNovo: 'JARDIM ITALIA',
            },
        ],
    },
    {
        id: 3,
        clienteId: 7782344,
        clienteNome: 'MERCADO NOVA ERA',
        alteradoPor: 'CARLA SUPERVISORA',
        alteradoPorId: 154,
        dataHora: '2026-04-06 16:11:42',
        mudancas: [
            {
                campo: 'telefone',
                valorAnterior: '(11) 3333-4444',
                valorNovo: '(11) 98888-7777',
            },
            {
                campo: 'email',
                valorAnterior: 'contato@novaera.com',
                valorNovo: 'financeiro@novaera.com',
            },
        ],
    },
    {
        id: 4,
        clienteId: 4459021,
        clienteNome: 'DISTRIBUIDORA CENTRAL',
        alteradoPor: 'RENATO ADM',
        alteradoPorId: 23,
        dataHora: '2026-04-08 10:05:12',
        mudancas: [
            {
                campo: 'limite_credito',
                valorAnterior: 'R$ 2.500,00',
                valorNovo: 'R$ 5.000,00',
            },
        ],
    },
];

const PageCard = styled(Panel)`
    position: relative;
    background: linear-gradient(165deg, #ffffff 0%, #f8fafc 72%, #f1f5f9 100%);
    display: grid;
    gap: 14px;
`;

const FilterSelect = styled(Select)`
    min-width: 190px;

    @media (max-width: 767px) {
        min-width: 0;
        width: 100%;
    }
`;

const CardsGrid = styled.div`
    display: grid;
    gap: 14px;
`;

const ChangeCard = styled.article`
    border: 1px solid #dbe1ea;
    border-radius: 0.125rem;
    background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
    padding: var(--space-md) 18px;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    transition: transform 0.18s ease, box-shadow 0.18s ease;

    @media (max-width: 767px) {
        padding: var(--space-sm);
    }
`;

const CardHeader = styled.header`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-xs);
    margin-bottom: 6px;
`;

const ClientLabel = styled.span`
    font-size: 1.02rem;
    color: #374151;
`;

const ClientName = styled.strong`
    font-size: var(--font-size-xl);
    line-height: 1;
    color: #1f2937;
`;

const ClientId = styled.span`
    font-size: 1.1rem;
    color: #64748b;
`;

const MetaLine = styled.p`
    margin: 0;
    color: #4b5563;
    font-size: 0.98rem;

    strong {
        color: #374151;
    }
`;

const FieldValue = styled.span`
    color: #374151;
    font-weight: 600;
    text-transform: capitalize;
`;

const OldValue = styled.span`
    color: #dc2626;
`;

const NewValue = styled.span`
    color: #16a34a;
`;

const EmptyState = styled.div`
    border: 1px dashed #cbd5e1;
    border-radius: 0.125rem;
    padding: var(--space-lg);
    text-align: center;
    color: #6b7280;
    background: #fff;
`;

const changesFields: TableField<CampoAlterado>[] = [
    {
        id: 'campo',
        header: 'Campo',
        accessorKey: 'campo',
        width: '160px',
        defaultVisible: true,
        canHide: false,
        cell: (value) => <FieldValue>{String(value).replace(/_/g, ' ')}</FieldValue>,
    },
    {
        id: 'valorAnterior',
        header: 'Valor anterior',
        accessorKey: 'valorAnterior',
        defaultVisible: true,
        canHide: false,
        cell: (value) => <OldValue>{String(value)}</OldValue>,
    },
    {
        id: 'valorNovo',
        header: 'Valor novo',
        accessorKey: 'valorNovo',
        defaultVisible: true,
        canHide: false,
        cell: (value) => <NewValue>{String(value)}</NewValue>,
    },
];

export const HistoricoAlteracoes: React.FC = () => {
    const [pesquisa, setPesquisa] = useState('');
    const [filtro, setFiltro] = useState<'clienteId' | 'clienteNome' | 'alteradoPor'>('clienteId');
    const [filtroValor] = useState('');
    const secoes = useMemo(() => buildClientesMenuSections(), []);

    const alteracoesFiltradas = useMemo(() => {
        const termo = pesquisa.trim().toLowerCase();
        const valorFiltro = filtroValor.trim().toLowerCase();

        return alteracoesMock.filter((alteracao) => {
            const matchBusca = !termo
                || [
                    alteracao.clienteNome,
                    String(alteracao.clienteId),
                    alteracao.alteradoPor,
                    ...alteracao.mudancas.map((mudanca) => `${mudanca.campo} ${mudanca.valorAnterior} ${mudanca.valorNovo}`),
                ].some((campo) => campo.toLowerCase().includes(termo));

            const baseFiltro =
                filtro === 'clienteId'
                    ? String(alteracao.clienteId)
                    : filtro === 'clienteNome'
                        ? alteracao.clienteNome
                        : alteracao.alteradoPor;

            const matchFiltro = !valorFiltro || baseFiltro.toLowerCase().includes(valorFiltro);

            return matchBusca && matchFiltro;
        });
    }, [filtro, filtroValor, pesquisa]);

    return (
        <RelatorioTemplate<AlteracaoCliente>
            titulo="Histórico de Alterações de Clientes"
            secoes={secoes}
            tituloTabela="Histórico de alterações"
            dados={alteracoesFiltradas}
            campos={[]}
            mensagemVazia="Nenhuma alteracao encontrada para os filtros informados."
            exibirTabela={false}
            impressao={false}
            exibirAcoesFlutuantes={false}
            configurarColunas={false}
            filtros={(
                <>
                    <FilterSelect
                        value={filtro}
                        onChange={(event) => setFiltro(event.target.value as 'clienteId' | 'clienteNome' | 'alteradoPor')}
                        aria-label="Filtrar por"
                    >
                        <option value="clienteId">ID do Cliente</option>
                        <option value="clienteNome">Nome do Cliente</option>
                        <option value="alteradoPor">Alterado por</option>
                    </FilterSelect>
                    <SearchWrapper>
                        <BuscaSimples pesquisa={pesquisa} onChange={setPesquisa} />
                    </SearchWrapper>
                </>
            )}
            conteudoAntesTabela={<PageCard>
                {alteracoesFiltradas.length === 0 ? (
                    <EmptyState>
                        Nenhuma alteracao encontrada para os filtros informados.
                    </EmptyState>
                ) : (
                    <CardsGrid>
                        {alteracoesFiltradas.map((alteracao) => (
                            <ChangeCard key={alteracao.id}>
                                <CardHeader>
                                    <ClientLabel>Cliente:</ClientLabel>
                                    <ClientName>{alteracao.clienteNome}</ClientName>
                                    <ClientId>(#{alteracao.clienteId})</ClientId>
                                </CardHeader>

                                <MetaLine>
                                    Alterado por: <strong>{alteracao.alteradoPor}</strong> (#{alteracao.alteradoPorId}) em {alteracao.dataHora}
                                </MetaLine>

                                <Table
                                    data={alteracao.mudancas}
                                    fields={changesFields}
                                    emptyMessage="Nenhuma mudança registrada."
                                    showColumnSelector={false}
                                    showHeader={false}
                                    compact
                                />
                            </ChangeCard>
                        ))}
                    </CardsGrid>
                )}
            </PageCard>}
        />
    );
};
