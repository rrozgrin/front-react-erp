import React from 'react';
import { FiSearch } from 'react-icons/fi';
import type { Food99Categoria, Food99Menu } from '../../../hooks/useFood99Catalog';
import type { StatusItem } from './itemCatalogoUtils';
import {
    FilterCard,
    FilterGrid,
    FilterLabel,
    FilterSelect,
    SearchInput,
    SearchInputWrapper,
} from './styled';

interface ItensCatalogoFiltrosProps {
    menus: Food99Menu[];
    categorias: Food99Categoria[];
    menuSelecionado: string;
    categoriaSelecionada: string;
    statusSelecionado: 'Todos os status' | StatusItem;
    busca: string;
    ordenacao: string;
    onMenuChange: (valor: string) => void;
    onCategoriaChange: (valor: string) => void;
    onStatusChange: (valor: 'Todos os status' | StatusItem) => void;
    onBuscaChange: (valor: string) => void;
    onOrdenacaoChange: (valor: string) => void;
}

export const ItensCatalogoFiltros: React.FC<ItensCatalogoFiltrosProps> = ({
    menus,
    categorias,
    menuSelecionado,
    categoriaSelecionada,
    statusSelecionado,
    busca,
    ordenacao,
    onMenuChange,
    onCategoriaChange,
    onStatusChange,
    onBuscaChange,
    onOrdenacaoChange,
}) => (
    <FilterCard>
        <FilterGrid>
            <FilterLabel>
                <span>Cardápio</span>
                <FilterSelect value={menuSelecionado} onChange={(evento) => onMenuChange(evento.target.value)}>
                    <option>Todos os cardápios</option>
                    {menus.map((menu) => <option key={menu.menuAppId}>{menu.nome}</option>)}
                </FilterSelect>
            </FilterLabel>

            <FilterLabel>
                <span>Categoria</span>
                <FilterSelect value={categoriaSelecionada} onChange={(evento) => onCategoriaChange(evento.target.value)}>
                    <option>Todas as categorias</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.categoriaAppId}>{categoria.nome}</option>
                    ))}
                </FilterSelect>
            </FilterLabel>

            <FilterLabel>
                <span>Status</span>
                <FilterSelect
                    value={statusSelecionado}
                    onChange={(evento) => onStatusChange(evento.target.value as 'Todos os status' | StatusItem)}
                >
                    <option>Todos os status</option>
                    <option>Publicado</option>
                    <option>Rascunho</option>
                    <option>Na fila</option>
                    <option>Inativo</option>
                </FilterSelect>
            </FilterLabel>

            <SearchInputWrapper>
                <FiSearch />
                <SearchInput
                    value={busca}
                    onChange={(evento) => onBuscaChange(evento.target.value)}
                    placeholder="Buscar item, ID ou descrição"
                />
            </SearchInputWrapper>

            <FilterLabel>
                <span>Ordenar por</span>
                <FilterSelect value={ordenacao} onChange={(evento) => onOrdenacaoChange(evento.target.value)}>
                    <option>Mais recentes</option>
                    <option>Nome A-Z</option>
                </FilterSelect>
            </FilterLabel>
        </FilterGrid>
    </FilterCard>
);
