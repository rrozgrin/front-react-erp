import React from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import type { Food99Menu } from '../../../hooks/useFood99Catalog';
import type { StatusCatalogo } from './catalogoUtils';
import {
    ActionButton,
    CategoryActions,
    ContentCard,
    FilterGrid,
    FilterLabel,
    FilterSelect,
    SearchInput,
    SearchInputWrapper,
} from './styled';

interface CatalogoFiltrosProps {
    menus: Food99Menu[];
    menuSelecionado: string;
    busca: string;
    status: 'Todos os status' | StatusCatalogo;
    ordenacao: string;
    desabilitado: boolean;
    onMenuChange: (valor: string) => void;
    onBuscaChange: (valor: string) => void;
    onStatusChange: (valor: 'Todos os status' | StatusCatalogo) => void;
    onOrdenacaoChange: (valor: string) => void;
    onNovaCategoria: () => void;
}

export const CatalogoFiltros: React.FC<CatalogoFiltrosProps> = ({
    menus,
    menuSelecionado,
    busca,
    status,
    ordenacao,
    desabilitado,
    onMenuChange,
    onBuscaChange,
    onStatusChange,
    onOrdenacaoChange,
    onNovaCategoria,
}) => (
    <ContentCard>
        <FilterGrid>
            <FilterLabel>
                <span>Cardápio</span>
                <FilterSelect value={menuSelecionado} onChange={(evento) => onMenuChange(evento.target.value)}>
                    <option>Todos os cardápios</option>
                    {menus.map((menu) => <option key={menu.menuAppId} value={menu.menuAppId}>{menu.nome}</option>)}
                </FilterSelect>
            </FilterLabel>
            <SearchInputWrapper>
                <FiSearch />
                <SearchInput value={busca} onChange={(evento) => onBuscaChange(evento.target.value)} placeholder="Buscar categoria ou item" />
            </SearchInputWrapper>
            <FilterLabel>
                <span>Status</span>
                <FilterSelect value={status} onChange={(evento) => onStatusChange(evento.target.value as typeof status)}>
                    <option>Todos os status</option><option>Publicado</option><option>Rascunho</option><option>Inativo</option>
                </FilterSelect>
            </FilterLabel>
            <FilterLabel>
                <span>Ordenação</span>
                <FilterSelect value={ordenacao} onChange={(evento) => onOrdenacaoChange(evento.target.value)}>
                    <option>Ordenar por ordem</option><option>Nome A-Z</option>
                </FilterSelect>
            </FilterLabel>
            <CategoryActions>
                <ActionButton type="button" onClick={onNovaCategoria} disabled={desabilitado}>
                    <FiPlus /> Nova categoria
                </ActionButton>
            </CategoryActions>
        </FilterGrid>
    </ContentCard>
);
