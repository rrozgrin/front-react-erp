import React from 'react';
import { FiEdit2, FiUploadCloud } from 'react-icons/fi';
import { Table, type TableField } from '@/common/components/Table';
import { estaPublicadoOuNaFila, type VisualizacaoItemCatalogo } from './itemCatalogoUtils';
import {
    StatusPill,
    TableCard,
    TogglePill,
} from './styled';

const camposItens: TableField<VisualizacaoItemCatalogo>[] = [
    { id: 'nome', header: 'Item', accessorKey: 'nome' },
    { id: 'categoria', header: 'Categoria', accessorKey: 'categoria' },
    { id: 'cardapio', header: 'Cardápio', accessorKey: 'cardapio' },
    { id: 'preco', header: 'Preço', accessorKey: 'preco' },
    {
        id: 'status',
        header: 'Status',
        cell: (_valor, item) => <StatusPill $status={item.status}>{item.status}</StatusPill>,
    },
    {
        id: 'ativo',
        header: 'Ativo',
        align: 'center',
        cell: (_valor, item) => <TogglePill $active={item.ativo} />,
    },
];

interface ItensCatalogoTabelaProps {
    itens: VisualizacaoItemCatalogo[];
    carregando: boolean;
    publicando: boolean;
    onEditar: (item: VisualizacaoItemCatalogo) => void;
}

export const ItensCatalogoTabela: React.FC<ItensCatalogoTabelaProps> = ({
    itens,
    carregando,
    publicando,
    onEditar,
}) => (
    <TableCard>
        <Table
            data={itens}
            fields={camposItens}
            showHeader
            showColumnSelector={false}
            title={carregando ? 'Carregando itens...' : `Exibindo ${itens.length} itens`}
            description="Itens disponíveis para publicação na 99Food."
            emptyMessage={carregando ? 'Carregando itens...' : 'Nenhum item encontrado.'}
            rowActions={[{
                label: 'Publicar item',
                icon: (item) => estaPublicadoOuNaFila(item.origem) ? <FiEdit2 /> : <FiUploadCloud />,
                getTitle: (item) => `${estaPublicadoOuNaFila(item.origem) ? 'Atualizar' : 'Cadastrar'} ${item.nome}`,
                disabled: () => publicando,
                onClick: onEditar,
            }]}
        />
    </TableCard>
);
