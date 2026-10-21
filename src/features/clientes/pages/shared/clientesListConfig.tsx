import type { TableField } from '../../../../common/components/Table';
import { criarColunasExcel } from '../../../../common/components/Templates/listagemUtils';
import type { Cliente } from '../../types/Cliente';
import { StatusBadge } from '../../../../common/components/PageLayout/styled';

export { clientesMockData } from '../../data/clientesMock';

export const defaultClienteSearchFields = (cliente: Cliente): string[] => [
    cliente.nome,
    cliente.email ?? '',
    cliente.telefone ?? '',
    cliente.cidade ?? '',
    cliente.segmento ?? '',
    cliente.status ?? '',
    cliente.tipoPessoa,
];

export const defaultClienteTableFields: TableField<Cliente>[] = [
    { id: 'nome', header: 'Cliente', accessorKey: 'nome', defaultVisible: true },
    { id: 'email', header: 'E-mail', accessorKey: 'email', defaultVisible: true },
    { id: 'telefone', header: 'Telefone', accessorKey: 'telefone', defaultVisible: true },
    { id: 'cidade', header: 'Cidade', accessorKey: 'cidade', defaultVisible: true },
    { id: 'segmento', header: 'Segmento', accessorKey: 'segmento', defaultVisible: true },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        defaultVisible: true,
        align: 'center',
        cell: (value) => <StatusBadge $variant={value as Cliente['status']}>{String(value)}</StatusBadge>,
    },
    {
        id: 'tipoPessoa',
        header: 'Tipo de Pessoa',
        accessorKey: 'tipoPessoa',
        defaultVisible: true,
        align: 'center',
    },
];

export const defaultClienteExcelColumns = criarColunasExcel(defaultClienteTableFields);
