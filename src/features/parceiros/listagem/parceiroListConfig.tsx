import type { TableField } from '@/common/components/Table';
import { StatusBadge } from '@/common/components/PageLayout/styled';
import { criarColunasExcel } from '@/common/components/Templates/listagemUtils';
import { moedaBRL } from '@/types/Formatadores';
import type { Parceiro } from '../types/Parceiro';

type ParceiroListavel = Parceiro & { ativo?: boolean };

export const criarConfiguracaoListagemParceiro = <T extends ParceiroListavel>(nomeEntidade: string) => {
    const camposPesquisa = (parceiro: T): string[] => [
        parceiro.razaoSocial,
        parceiro.email ?? '',
        parceiro.telefone ?? '',
        parceiro.cidade ?? '',
        parceiro.tipoPessoa ?? '',
        parceiro.ativo ? 'ativo' : 'inativo',
    ];

    const camposPadrao: TableField<T>[] = [
        { id: 'nome', header: nomeEntidade, accessorKey: 'razaoSocial', defaultVisible: true },
        { id: 'email', header: 'E-mail', accessorKey: 'email', defaultVisible: true },
        { id: 'telefone', header: 'Telefone', accessorKey: 'telefone', defaultVisible: true },
        { id: 'cidade', header: 'Cidade', accessorKey: 'cidade', defaultVisible: false },
        { id: 'ultimaCompra', header: 'Última compra', defaultVisible: true, align: 'center' },
        { id: 'tipoPessoa', header: 'Tipo de Pessoa', accessorKey: 'tipoPessoa', defaultVisible: true, align: 'center' },
        {
            id: 'totalCompras',
            header: 'Total em compras',
            defaultVisible: true,
            align: 'right',
            cell: (valor) => moedaBRL.format(Number(valor ?? 0)),
        },
    ];

    const colunasExcelPadrao = criarColunasExcel(camposPadrao, {
        ultimaCompra: {},
        totalCompras: { valueFormatter: (valor) => moedaBRL.format(Number(valor ?? 0)) },
    });

    const camposExcluidos: TableField<T>[] = [
        { id: 'nome', header: nomeEntidade, accessorKey: 'razaoSocial', defaultVisible: true },
        { id: 'email', header: 'E-mail', accessorKey: 'email', defaultVisible: true },
        { id: 'telefone', header: 'Telefone', accessorKey: 'telefone', defaultVisible: true },
        { id: 'cidade', header: 'Cidade', accessorKey: 'cidade', defaultVisible: true },
        {
            id: 'status',
            header: 'Status',
            defaultVisible: true,
            align: 'center',
            cell: (_, parceiro) => (
                <StatusBadge $variant={parceiro.ativo ? 'ativo' : 'inativo'}>
                    {parceiro.ativo ? 'ativo' : 'inativo'}
                </StatusBadge>
            ),
        },
        { id: 'tipoPessoa', header: 'Tipo de Pessoa', accessorKey: 'tipoPessoa', defaultVisible: true, align: 'center' },
    ];

    const colunasExcelExcluidos = criarColunasExcel(camposExcluidos, {
        status: { valueFormatter: (_, parceiro) => (parceiro.ativo ? 'ativo' : 'inativo') },
    });

    return { camposPesquisa, camposPadrao, colunasExcelPadrao, camposExcluidos, colunasExcelExcluidos };
};
