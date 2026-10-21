import React from 'react';
import { FiChevronDown, FiChevronRight, FiEdit2, FiMenu } from 'react-icons/fi';
import { Table, type TableField } from '@/common/components/Table';
import { formatarMoedaBRL } from '@/utils/formatadores';
import type { Food99Categoria, Food99ItemCatalogo } from '../../../hooks/useFood99Catalog';
import {
    obterStatusItemCatalogo,
    type VisualizacaoCategoriaCatalogo,
} from './catalogoUtils';
import {
    CategoryBadge,
    CategoryBlock,
    CategoryHeader,
    CategoryMeta,
    CategoryTitle,
    CategoryTools,
    IconButton,
    InlineMessage,
    StatusPill,
} from './styled';

const camposItens: TableField<Food99ItemCatalogo>[] = [
    { id: 'nome', header: 'Nome do item', accessorKey: 'nome' },
    { id: 'descricao', header: 'Descrição', accessorFn: (item) => item.descricaoCurta || '-' },
    {
        id: 'preco',
        header: 'Preço',
        accessorFn: (item) => formatarMoedaBRL(item.valorPreco, item.precoCentavos),
    },
    {
        id: 'status',
        header: 'Status',
        cell: (_valor, item) => {
            const status = obterStatusItemCatalogo(item);
            return <StatusPill $status={status}>{status}</StatusPill>;
        },
    },
];

interface CategoriasCatalogoListaProps {
    categorias: VisualizacaoCategoriaCatalogo[];
    carregando: boolean;
    onAlternar: (categoriaId: string) => void;
    onEditar: (categoria: Food99Categoria) => void;
}

export const CategoriasCatalogoLista: React.FC<CategoriasCatalogoListaProps> = ({
    categorias,
    carregando,
    onAlternar,
    onEditar,
}) => (
    <>
        {categorias.map((categoria) => (
            <CategoryBlock key={categoria.categoriaAppId}>
                <CategoryHeader>
                    <CategoryMeta>
                        <FiMenu />
                        <button type="button" onClick={() => onAlternar(categoria.categoriaAppId)} aria-label={`Alternar ${categoria.nome}`}>
                            {categoria.expandida ? <FiChevronDown /> : <FiChevronRight />}
                        </button>
                        <CategoryTitle>{categoria.nome}</CategoryTitle>
                        <CategoryBadge>{categoria.itens.length} itens</CategoryBadge>
                    </CategoryMeta>
                    <CategoryTools>
                        <span>{categoria.nomeMenu ?? '-'}</span>
                        <span>{categoria.ativo ? 'Ativa' : 'Inativa'}</span>
                        <IconButton type="button" onClick={() => onEditar(categoria)} aria-label={`Editar ${categoria.nome}`}>
                            <FiEdit2 />
                        </IconButton>
                    </CategoryTools>
                </CategoryHeader>
                {categoria.expandida ? (
                    <Table
                        data={categoria.itens}
                        fields={camposItens}
                        showHeader={false}
                        showColumnSelector={false}
                        compact
                        emptyMessage="Nenhum item nesta categoria."
                    />
                ) : null}
            </CategoryBlock>
        ))}
        {!carregando && categorias.length === 0 ? (
            <InlineMessage $tone="success">Nenhuma categoria cadastrada.</InlineMessage>
        ) : null}
    </>
);
