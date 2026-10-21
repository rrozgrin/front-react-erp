import React, { useEffect, useMemo, useState } from 'react';
import {
    Content,
    SearchControls,
    Control,
    Actions,
} from './styled';
import {
    FiPlus,
    FiTool,
} from 'react-icons/fi';
import {
    ModalSimple,
} from '@/common/components/ModalSimple';
import { Table, type TableField } from '@/common/components/Table';
import { BuscaSimples } from '@/common/components/Inputs/BuscaSimples';
import { Botao } from '@/common/components/Buttons/Botao';
import { produtosMock, type ProdutoItem } from '@/features/operacao-comercial/data/produtosMock';

type ProdutoFiltro = 'nome' | 'codigo' | 'codigo_barras' | 'categoria';

interface SearchProdutoProps {
    open: boolean;
    onClose: () => void;
    onOpenCreateProduto?: () => void;
    onSelectProduto?: (produto: ProdutoItem) => void;
    onOpenNovoServico?: () => void;
}

const getProdutoFilterValue = (produto: ProdutoItem, filtro: ProdutoFiltro) => {
    switch (filtro) {
        case 'codigo_barras':
            return produto.codigoBarras;
        case 'nome':
            return produto.nome;
        case 'codigo':
            return produto.codigo;
        case 'categoria':
            return produto.categoria;
        default:
            return produto.nome;
    }
};

export const SearchProduto: React.FC<SearchProdutoProps> = ({
    open,
    onClose,
    onOpenCreateProduto,
    onSelectProduto,
    onOpenNovoServico,
}) => {
    const [filtro, setFiltro] = useState<ProdutoFiltro>('nome');
    const [term, setTerm] = useState('');

    useEffect(() => {
        if (!open) {
            return;
        }

        document.body.style.overflow = 'hidden';

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open) {
            setFiltro('nome');
            setTerm('');
        }
    }, [open]);

    const filteredProducts = useMemo(() => {
        const query = term.trim().toLowerCase();

        if (!query) {
            return produtosMock;
        }

        return produtosMock.filter((produto) => {
            const value = getProdutoFilterValue(produto, filtro).toLowerCase();
            return value.includes(query);
        });
    }, [filtro, term]);

    const fields = useMemo<TableField<ProdutoItem>[]>(() => [
        {
            id: 'codigo',
            header: 'Codigo',
            accessorKey: 'codigo',
            align: 'center',
            width: '90px',
        },
        {
            id: 'nome',
            header: 'Produto',
            accessorKey: 'nome',
        },
        {
            id: 'categoria',
            header: 'Categoria',
            accessorKey: 'categoria',
        },
        {
            id: 'unidade',
            header: 'Un.',
            accessorKey: 'unidade',
            align: 'center',
            width: '80px',
        },
        {
            id: 'estoque',
            header: 'Estoque',
            accessorKey: 'estoque',
            align: 'right',
            width: '100px',
        },
        {
            id: 'preco',
            header: 'Preco',
            accessorKey: 'preco',
            align: 'right',
            width: '100px',
        },
    ], []);

    if (!open) {
        return null;
    }

    const handleSearch = (value = term) => {
        setTerm(value.trim());
    };

    return (
        <ModalSimple
            title="Busca de produtos"
            onClose={onClose}
            footer={(
                <Botao nome="Fechar" action={onClose} />
            )}
            size="xl"
        >
            <Content>
                <SearchControls>
                    <Control>
                        <span>Procure por</span>
                        <select value={filtro} onChange={(event) => setFiltro(event.target.value as ProdutoFiltro)}>
                            <option value="nome">Nome</option>
                            <option value="codigo">Codigo</option>
                            <option value="codigo_barras">Codigo de barras</option>
                            <option value="categoria">Categoria</option>
                        </select>
                    </Control>

                    <Control>
                        <span>Pesquisar</span>
                        <BuscaSimples
                            pesquisa={term}
                            onChange={setTerm}
                            onSearch={handleSearch}
                            placeholder="Digite o que quiser"
                            ariaLabel="Pesquisar produto"
                        />
                    </Control>
                </SearchControls>

                <Actions>
                    {onOpenCreateProduto ? (
                        <Botao icone={<FiPlus />} action={onOpenCreateProduto} color="add" nome="Adicionar" />
                    ) : null}

                    {onOpenNovoServico ? (
                        <Botao icone={<FiTool />} action={onOpenNovoServico} color="add" nome="Adicionar novo serviço" />
                    ) : null}
                </Actions>

                <Table<ProdutoItem>
                    data={filteredProducts}
                    fields={fields}
                    title="Produtos encontrados"
                    description="Selecione uma linha para continuar."
                    emptyMessage="Nenhum produto encontrado."
                    compact
                    rowAction={{
                        label: 'Selecionar',
                        getTitle: (produto) => `Selecionar ${produto.nome}`,
                        onClick: (produto) => {
                            onSelectProduto?.(produto);
                            onClose();
                        },
                    }}
                />
            </Content>
        </ModalSimple>
    );
};

export const BuscaProduto = SearchProduto;
export default SearchProduto;
