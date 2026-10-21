import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { Table, type TableField } from '@/common/components/Table';
import type { CardapioItem } from './cardapioUtils';
import {
    TableCard,
    TableStatus,
} from './styled';

const camposCardapios: TableField<CardapioItem>[] = [
    { id: 'nome', header: 'Cardápio', accessorKey: 'nome', cell: (valor) => <strong>{String(valor)}</strong> },
    { id: 'categorias', header: 'Categorias', accessorFn: (item) => `${item.categorias} categorias` },
    { id: 'itens', header: 'Itens vinculados', accessorFn: (item) => `${item.itens} itens` },
    {
        id: 'status',
        header: 'Status',
        cell: (_valor, item) => <TableStatus $status={item.status}>{item.status}</TableStatus>,
    },
];

interface CardapiosTabelaProps {
    itens: CardapioItem[];
    carregando: boolean;
    onSelecionar: (id: string) => void;
    onEditar: (item: CardapioItem) => void;
}

export const CardapiosTabela: React.FC<CardapiosTabelaProps> = ({ itens, carregando, onSelecionar, onEditar }) => (
    <TableCard>
        <p>{carregando ? 'Carregando cardápios...' : `Exibindo ${itens.length} cardápios`}</p>
        <Table
            data={itens}
            fields={camposCardapios}
            showHeader={false}
            showColumnSelector={false}
            emptyMessage={carregando ? 'Carregando cardápios...' : 'Nenhum cardápio encontrado.'}
            onRowClick={(item) => onSelecionar(item.id)}
            rowActions={[{
                label: 'Editar',
                icon: <FiEdit2 />,
                getTitle: (item) => `Editar ${item.nome}`,
                onClick: onEditar,
            }]}
        />
    </TableCard>
);
