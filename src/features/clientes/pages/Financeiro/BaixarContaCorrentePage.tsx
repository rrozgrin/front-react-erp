import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { TableField } from '../../../../common/components/Table';
import { Cliente } from '../../types/Cliente';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import { buildClientesMenuSections } from '../shared/clientesMenuSections';

const ContentCard = styled.section`
    position: relative;
    overflow: hidden;
    border: 1px solid #dbe1ea;
    border-radius: 1rem;
    background: linear-gradient(165deg, #ffffff 0%, #f8fafc 72%, #f1f5f9 100%);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
    padding: 18px;
    display: grid;
    gap: 14px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #0ea5e9 0%, #2563eb 45%, #1d4ed8 100%);
    }

    @media (max-width: 767px) {
        padding: var(--space-sm);
        border-radius: var(--radius-xl);
        gap: var(--space-sm);
    }
`;

const CardTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 6px var(--space-2xs) 0;

    @media (max-width: 767px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const CardTitle = styled.h3`
    margin: 0;
    font-size: var(--font-size-xs);
    font-weight: 500;
    color: #1f2937;
`;

const CardHint = styled.p`
    margin: 2px 0 0;
    font-size: 0.88rem;
    color: #6b7280;
`;

const CountBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 132px;
    padding: 6px 10px;
    border: 1px solid #bfdbfe;
    border-radius: var(--radius-pill);
    background: #eff6ff;
    color: #1d4ed8;
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

const TableCardBody = styled.div`
    border: 1px solid #dbe1ea;
    border-radius: var(--radius-xl);
    background: #ffffff;
    padding: 10px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);

    @media (max-width: 767px) {
        border-radius: 10px;
        padding: var(--space-2xs);
    }
`;

const moedaBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const clientesBaixarContaCorrente: Cliente[] = [
    {
        id: 1,
        nome: 'Mariana Souza',
        razao_social: 'Mariana Souza ME',
        documento: '123.456.789-00',
        saldo: 1540.72,
        tipoPessoa: 'f',
    },
    {
        id: 2,
        nome: 'Carlos Henrique',
        razao_social: 'Constrular Comercio Ltda',
        documento: '12.345.678/0001-99',
        saldo: -280.3,
        tipoPessoa: 'j',
    },
    {
        id: 3,
        nome: 'Fernanda Lima',
        razao_social: 'Petluar Servicos',
        documento: '987.654.321-00',
        saldo: 0,
        tipoPessoa: 'f',
    },
    {
        id: 4,
        nome: 'Rafael Gomes',
        razao_social: 'Fastcell Comercio de Eletronicos',
        documento: '44.555.666/0001-22',
        saldo: null,
        tipoPessoa: 'j',
    },
];

const camposContaCorrente: TableField<Cliente>[] = [
    { id: 'nome', header: 'Nome', accessorKey: 'nome', defaultVisible: true },
    {
        id: 'razao_social',
        header: 'Razao Social',
        accessorKey: 'razao_social',
        defaultVisible: true,
    },
    {
        id: 'documento',
        header: 'CPF/CNPJ',
        accessorKey: 'documento',
        defaultVisible: true,
        align: 'center',
    },
    {
        id: 'saldo',
        header: 'Saldo',
        accessorKey: 'saldo',
        defaultVisible: true,
        align: 'right',
        cell: (value) => (value == null ? '-' : moedaBRL.format(Number(value))),
    },
];

export const BaixarContaCorrente: React.FC = () => {
    const [pesquisa, setPesquisa] = useState('');
    const secoes = useMemo(() => buildClientesMenuSections(), []);

    return (
        <ListagemTemplate
            titulo="Baixar Conta Corrente"
            secoes={secoes}
            tituloTabela="Clientes Conta Corrente"
            descricaoTabela="Consulte nome, razao social, CPF/CNPJ e saldo dos clientes."
            dados={clientesBaixarContaCorrente}
            campos={camposContaCorrente}
            camposPesquisa={(cliente) => [cliente.nome, cliente.razao_social, cliente.documento]}
            valorPesquisa={pesquisa}
            onPesquisaChange={setPesquisa}
            mensagemVazia="Nenhum cliente encontrado para o filtro informado."
            configurarColunas="toolbar"
            impressao={false}
            exibirAcoesFlutuantes={false}
            renderizarTabela={(tabela, dadosFiltrados) => (
                <ContentCard>
                    <CardTop>
                        <div>
                            <CardTitle>Clientes para Baixa em Conta Corrente</CardTitle>
                            <CardHint>Pesquise e selecione os clientes com saldo para processamento financeiro.</CardHint>
                        </div>
                        <CountBadge>{dadosFiltrados.length} cliente(s)</CountBadge>
                    </CardTop>
                    <TableCardBody>{tabela}</TableCardBody>
                </ContentCard>
            )}
        />
    );
};
