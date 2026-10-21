import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import {
    SearchWrapper,
} from '../../../../common/components/PageLayout/styled';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { BuscaSimples } from '../../../../common/components/Inputs/BuscaSimples';
import { PeriodoInput } from '../../../../common/components/Inputs/PeriodoInput';
import type { TableField } from '../../../../common/components/Table';
import { Select } from '../../../../common/components/Ui';
import { formatarDataHoraBR } from '../../../../types/Data';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

interface ProdutoHistoricoAlteracao {
    id: number;
    dataHora: string;
    descricao: string;
    itemGrade: string;
    codigoBarraAtual: string;
    codigoBarraAntigo: string;
    estoqueAtual: string;
    estoqueAntigo: string;
    valorCustoAtual: string;
    valorCustoAntigo: string;
    valorVendaAtual: string;
    valorVendaAntigo: string;
    valorAtacadoAtual: string;
    valorAtacadoAntigo: string;
    statusAtual: string;
    statusAntigo: string;
    usuario: string;
    origem: string;
}

const historicoMockData: ProdutoHistoricoAlteracao[] = [
    {
        id: 1,
        dataHora: '2026-05-27T09:14:00',
        descricao: 'Capa Banco Mod Orig Biz 125 2008',
        itemGrade: 'PRETA',
        codigoBarraAtual: '7899565702107',
        codigoBarraAntigo: '7899565702107',
        estoqueAtual: '2 PC',
        estoqueAntigo: '5 PC',
        valorCustoAtual: 'R$ 10,00',
        valorCustoAntigo: 'R$ 9,50',
        valorVendaAtual: 'R$ 20,00',
        valorVendaAntigo: 'R$ 19,00',
        valorAtacadoAtual: 'R$ 18,00',
        valorAtacadoAntigo: 'R$ 17,50',
        statusAtual: 'Ativo',
        statusAntigo: 'Ativo',
        usuario: 'Funcionário Master',
        origem: 'Manual',
    },
    {
        id: 2,
        dataHora: '2026-05-27T11:42:00',
        descricao: 'Capa Banco Mod Orig Biz 125 2008 Premium',
        itemGrade: 'VERMELHA',
        codigoBarraAtual: '17951372',
        codigoBarraAntigo: '17951372',
        estoqueAtual: '33 PC',
        estoqueAntigo: '32 PC',
        valorCustoAtual: 'R$ 10,00',
        valorCustoAntigo: 'R$ 10,00',
        valorVendaAtual: 'R$ 20,00',
        valorVendaAntigo: 'R$ 20,00',
        valorAtacadoAtual: 'R$ 18,50',
        valorAtacadoAntigo: 'R$ 18,00',
        statusAtual: 'Ativo',
        statusAntigo: 'Ativo',
        usuario: 'Funcionário Master',
        origem: 'Venda',
    },
    {
        id: 3,
        dataHora: '2026-05-26T16:08:00',
        descricao: 'Capa Banco Mod Titan 2000',
        itemGrade: '-',
        codigoBarraAtual: '7899565702060',
        codigoBarraAntigo: '7899565702060',
        estoqueAtual: '-4 PC',
        estoqueAntigo: '1 PC',
        valorCustoAtual: 'R$ 17,28',
        valorCustoAntigo: 'R$ 16,90',
        valorVendaAtual: 'R$ 22,46',
        valorVendaAntigo: 'R$ 22,46',
        valorAtacadoAtual: 'R$ 20,10',
        valorAtacadoAntigo: 'R$ 19,90',
        statusAtual: 'Excluído',
        statusAntigo: 'Ativo',
        usuario: 'Ana Souza',
        origem: 'Importação',
    },
];

const usuariosMockData = ['Funcionário Master', 'Ana Souza', 'Carlos Lima'];

const ToolbarGrid = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-wrap: wrap;
    width: 100%;

    @media (max-width: 767px) {
        display: grid;
        grid-template-columns: 1fr;
    }
`;

const SelectWrap = styled.div`
    min-width: 240px;

    @media (max-width: 767px) {
        min-width: 0;
        width: 100%;
    }
`;

const UserSelect = styled(Select)`
    min-height: var(--control-height-md);
    border-radius: 0.125rem;
    padding: 0 14px;
    font-size: var(--font-size-md);
`;

const parseInputDate = (value: string) => {
    if (!value) {
        return null;
    }

    return new Date(`${value}T00:00:00`);
};

const hasDifference = (current: string, previous: string) => current !== previous;

export const ProdutosHistoricoAlteracaoPage: React.FC = () => {
    const [pesquisa, setPesquisa] = useState('');
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const secoes = useMemo(() => buildProdutosMenuSections({}), []);

    const filteredData = useMemo(() => {
        const termo = pesquisa.trim().toLowerCase();
        const inicio = parseInputDate(dataInicio);
        const fim = parseInputDate(dataFim);

        if (fim) {
            fim.setHours(23, 59, 59, 999);
        }

        return historicoMockData.filter((item) => {
            const itemDate = new Date(item.dataHora);
            const matchesUser = !usuarioSelecionado || item.usuario === usuarioSelecionado;
            const matchesSearch = !termo || [
                item.descricao,
                item.codigoBarraAtual,
                item.codigoBarraAntigo,
                item.usuario,
                item.origem,
                item.itemGrade,
            ].some((field) => field.toLowerCase().includes(termo));

            const matchesStart = !inicio || itemDate >= inicio;
            const matchesEnd = !fim || itemDate <= fim;

            return matchesUser && matchesSearch && matchesStart && matchesEnd;
        });
    }, [dataFim, dataInicio, pesquisa, usuarioSelecionado]);

    const renderDiffCell = useCallback((current: string, previous: string, label: string) => (
        <span style={{ color: hasDifference(current, previous) ? '#b91c1c' : 'inherit', fontWeight: hasDifference(current, previous) ? 700 : 400 }}>
            {label === 'Atual' ? current : previous}
        </span>
    ), []);

    const fields = useMemo<TableField<ProdutoHistoricoAlteracao>[]>(() => [
        {
            id: 'dataHora',
            header: 'Data Hora',
            accessorKey: 'dataHora',
            defaultVisible: true,
            cell: (value) => formatarDataHoraBR(String(value ?? '')),
        },
        { id: 'descricao', header: 'Descrição', accessorKey: 'descricao', defaultVisible: true },
        { id: 'itemGrade', header: 'Item Grade', accessorKey: 'itemGrade', defaultVisible: true },
        {
            id: 'codigoBarraAtual',
            header: 'Código Barra Atual',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.codigoBarraAtual, row.codigoBarraAntigo, 'Atual'),
        },
        {
            id: 'codigoBarraAntigo',
            header: 'Código Barra Antigo',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.codigoBarraAtual, row.codigoBarraAntigo, 'Antigo'),
        },
        {
            id: 'estoqueAtual',
            header: 'Estoque Atual',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.estoqueAtual, row.estoqueAntigo, 'Atual'),
        },
        {
            id: 'estoqueAntigo',
            header: 'Estoque Antigo',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.estoqueAtual, row.estoqueAntigo, 'Antigo'),
        },
        {
            id: 'valorCustoAtual',
            header: 'Valor Custo Atual',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.valorCustoAtual, row.valorCustoAntigo, 'Atual'),
        },
        {
            id: 'valorCustoAntigo',
            header: 'Valor Custo Antigo',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.valorCustoAtual, row.valorCustoAntigo, 'Antigo'),
        },
        {
            id: 'valorVendaAtual',
            header: 'Valor Venda Atual',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.valorVendaAtual, row.valorVendaAntigo, 'Atual'),
        },
        {
            id: 'valorVendaAntigo',
            header: 'Valor Venda Antigo',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.valorVendaAtual, row.valorVendaAntigo, 'Antigo'),
        },
        {
            id: 'valorAtacadoAtual',
            header: 'Valor Atacado Atual',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.valorAtacadoAtual, row.valorAtacadoAntigo, 'Atual'),
        },
        {
            id: 'valorAtacadoAntigo',
            header: 'Valor Atacado Antigo',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.valorAtacadoAtual, row.valorAtacadoAntigo, 'Antigo'),
        },
        {
            id: 'statusAtual',
            header: 'Status Atual',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.statusAtual, row.statusAntigo, 'Atual'),
        },
        {
            id: 'statusAntigo',
            header: 'Status Antigo',
            defaultVisible: true,
            cell: (_, row) => renderDiffCell(row.statusAtual, row.statusAntigo, 'Antigo'),
        },
        { id: 'usuario', header: 'Usuário', accessorKey: 'usuario', defaultVisible: true },
        { id: 'origem', header: 'Origem', accessorKey: 'origem', defaultVisible: true },
    ], [renderDiffCell]);

    const excelColumns = useMemo<ExcelColumn<ProdutoHistoricoAlteracao>[]>(() => [
        { key: 'dataHora', header: 'Data Hora', valueFormatter: (value) => formatarDataHoraBR(String(value ?? '')) },
        { key: 'descricao', header: 'Descrição', accessorKey: 'descricao' },
        { key: 'itemGrade', header: 'Item Grade', accessorKey: 'itemGrade' },
        { key: 'codigoBarraAtual', header: 'Código Barra Atual', accessorKey: 'codigoBarraAtual' },
        { key: 'codigoBarraAntigo', header: 'Código Barra Antigo', accessorKey: 'codigoBarraAntigo' },
        { key: 'estoqueAtual', header: 'Estoque Atual', accessorKey: 'estoqueAtual' },
        { key: 'estoqueAntigo', header: 'Estoque Antigo', accessorKey: 'estoqueAntigo' },
        { key: 'valorCustoAtual', header: 'Valor Custo Atual', accessorKey: 'valorCustoAtual' },
        { key: 'valorCustoAntigo', header: 'Valor Custo Antigo', accessorKey: 'valorCustoAntigo' },
        { key: 'valorVendaAtual', header: 'Valor Venda Atual', accessorKey: 'valorVendaAtual' },
        { key: 'valorVendaAntigo', header: 'Valor Venda Antigo', accessorKey: 'valorVendaAntigo' },
        { key: 'valorAtacadoAtual', header: 'Valor Atacado Atual', accessorKey: 'valorAtacadoAtual' },
        { key: 'valorAtacadoAntigo', header: 'Valor Atacado Antigo', accessorKey: 'valorAtacadoAntigo' },
        { key: 'statusAtual', header: 'Status Atual', accessorKey: 'statusAtual' },
        { key: 'statusAntigo', header: 'Status Antigo', accessorKey: 'statusAntigo' },
        { key: 'usuario', header: 'Usuário', accessorKey: 'usuario' },
        { key: 'origem', header: 'Origem', accessorKey: 'origem' },
    ], []);

    const handleDateSearch = useCallback((inicio: string, fim: string) => {
        setDataInicio(inicio);
        setDataFim(fim);
    }, []);

    return (
        <RelatorioTemplate
            titulo="Histórico de Alterações"
            secoes={secoes}
            tituloTabela="Histórico de alterações"
            descricaoTabela="Acompanhe alterações de estoque, preços, status e códigos dos produtos."
            dados={filteredData}
            campos={fields}
            mensagemVazia="Nenhum registro encontrado para os filtros informados."
            arquivoExcel="historico_alteracoes_produtos"
            colunasExcel={excelColumns}
            impressao={{
                titulo: 'Histórico de Alterações',
                subtitulo: 'Cadastro e Estoque de Produtos',
                orientacao: 'landscape',
            }}
            filtros={(
                <ToolbarGrid>
                    <SearchWrapper>
                        <BuscaSimples
                            pesquisa={pesquisa}
                            onChange={setPesquisa}
                            placeholder="Busca Avançada (Descrição, Código de Barras)"
                        />
                    </SearchWrapper>

                    <SelectWrap>
                        <UserSelect
                            value={usuarioSelecionado}
                            onChange={(event) => setUsuarioSelecionado(event.target.value)}
                            aria-label="Buscar por usuário"
                        >
                            <option value="">Selecione o usuário</option>
                            {usuariosMockData.map((usuario) => (
                                <option key={usuario} value={usuario}>
                                    {usuario}
                                </option>
                            ))}
                        </UserSelect>
                    </SelectWrap>

                    <PeriodoInput modo="confirmar" onChange={handleDateSearch} />
                </ToolbarGrid>
            )}
        />
    );
};
