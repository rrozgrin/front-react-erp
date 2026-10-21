import React from 'react';
import type { TableField } from '../../../../common/components/Table';
import type { Cliente } from '../../types/Cliente';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import { buildClientesMenuSections } from '../shared/clientesMenuSections';

const moedaBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const clientesContaCorrente: Cliente[] = [
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

export const RelatorioContaCorrente: React.FC = () => {
    return (
        <RelatorioTemplate
            titulo="Relatório de Conta Corrente"
            secoes={buildClientesMenuSections()}
            tituloTabela="Clientes Conta Corrente"
            descricaoTabela="Consulte nome, razao social, CPF/CNPJ e saldo dos clientes."
            dados={clientesContaCorrente}
            campos={camposContaCorrente}
            camposPesquisa={(cliente) => [cliente.nome, cliente.razao_social, cliente.documento]}
            mensagemVazia="Nenhum cliente encontrado para o filtro informado."
            configurarColunas="toolbar"
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
    );
};
