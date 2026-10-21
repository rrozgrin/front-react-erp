import React from 'react';
import { FiSave, FiSearch, FiX } from 'react-icons/fi';
import { ModalSimple, ModalSimpleActionButton } from '@/common/components/ModalSimple';
import { Table, type TableField } from '@/common/components/Table';
import { formatarMoedaBRL } from '@/utils/formatadores';
import type {
    Food99CategoriaProdutoLocal,
    Food99ProdutoLocal,
} from '../../../hooks/useFood99Catalog';
import {
    ActionButton,
    FilterGrid,
    FilterLabel,
    FilterSelect,
    PaginationButton,
    PaginationCurrent,
    PaginationRow,
    SearchInput,
    SearchInputWrapper,
    TableCard,
} from './styled';

const camposProdutos: TableField<Food99ProdutoLocal>[] = [
    { id: 'produto', header: 'Produto', accessorKey: 'nome' },
    {
        id: 'codigo',
        header: 'Código',
        accessorFn: (produto) => `${produto.codigoBarras}${produto.plu ? ` · PLU ${produto.plu}` : ''}`,
    },
    { id: 'estoque', header: 'Estoque', accessorKey: 'estoque' },
    { id: 'preco', header: 'Preço', accessorFn: (produto) => formatarMoedaBRL(produto.valor) },
];

interface ProdutosLocaisModalProps {
    produtos: Food99ProdutoLocal[];
    categorias: Food99CategoriaProdutoLocal[];
    idsSelecionados: number[];
    categoriaId: string;
    busca: string;
    pagina: number;
    ultimaPagina: number;
    total: number;
    carregando: boolean;
    salvando: boolean;
    onClose: () => void;
    onSalvar: () => void;
    onCategoriaChange: (valor: string) => void;
    onBuscaChange: (valor: string) => void;
    onBuscar: () => void;
    onPaginaChange: (pagina: number) => void;
    onAlternarProduto: (produtoId: number) => void;
    onSelecionarIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ProdutosLocaisModal: React.FC<ProdutosLocaisModalProps> = ({
    produtos,
    categorias,
    idsSelecionados,
    categoriaId,
    busca,
    pagina,
    ultimaPagina,
    total,
    carregando,
    salvando,
    onClose,
    onSalvar,
    onCategoriaChange,
    onBuscaChange,
    onBuscar,
    onPaginaChange,
    onAlternarProduto,
    onSelecionarIds,
}) => (
    <ModalSimple
        title="Adicionar produtos à 99Food"
        subtitle="Selecione produtos locais para criar rascunhos na 99Food."
        size="xl"
        onClose={onClose}
        footer={(
            <>
                <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose} disabled={salvando}>
                    <FiX /> Cancelar
                </ModalSimpleActionButton>
                <ModalSimpleActionButton type="button" onClick={onSalvar} disabled={salvando || idsSelecionados.length === 0}>
                    <FiSave /> {salvando ? 'Adicionando...' : `Adicionar selecionados (${idsSelecionados.length})`}
                </ModalSimpleActionButton>
            </>
        )}
    >
        <FilterGrid>
            <FilterLabel>
                <span>Categoria</span>
                <FilterSelect value={categoriaId} onChange={(evento) => onCategoriaChange(evento.target.value)}>
                    <option value="">Todas as categorias</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                    ))}
                </FilterSelect>
            </FilterLabel>
            <SearchInputWrapper>
                <FiSearch />
                <SearchInput
                    value={busca}
                    onChange={(evento) => onBuscaChange(evento.target.value)}
                    onKeyDown={(evento) => { if (evento.key === 'Enter') onBuscar(); }}
                    placeholder="Buscar por nome ou código"
                />
            </SearchInputWrapper>
            <ActionButton type="button" onClick={onBuscar} disabled={carregando}>
                <FiSearch /> Buscar
            </ActionButton>
        </FilterGrid>

        <TableCard>
            <Table
                data={produtos}
                fields={camposProdutos}
                showHeader={false}
                showColumnSelector={false}
                selectable
                allRowsSelected={produtos.length > 0 && produtos.every((produto) => idsSelecionados.includes(produto.produtoId))}
                isRowSelected={(produto) => idsSelecionados.includes(produto.produtoId)}
                onToggleRowSelection={(produto) => onAlternarProduto(produto.produtoId)}
                onToggleAllRows={(selecionar) => onSelecionarIds((atuais) => selecionar
                    ? [...new Set([...atuais, ...produtos.map((produto) => produto.produtoId)])]
                    : atuais.filter((id) => !produtos.some((produto) => produto.produtoId === id)))}
                emptyMessage={carregando ? 'Carregando...' : 'Nenhum produto local disponível.'}
            />
            <PaginationRow>
                <span>{carregando ? 'Carregando...' : `${total} produtos`}</span>
                <div>
                    <PaginationButton type="button" disabled={pagina <= 1 || carregando} onClick={() => onPaginaChange(pagina - 1)}>{'<'}</PaginationButton>
                    <PaginationCurrent>{pagina} de {ultimaPagina}</PaginationCurrent>
                    <PaginationButton type="button" disabled={pagina >= ultimaPagina || carregando} onClick={() => onPaginaChange(pagina + 1)}>{'>'}</PaginationButton>
                </div>
            </PaginationRow>
        </TableCard>
    </ModalSimple>
);
