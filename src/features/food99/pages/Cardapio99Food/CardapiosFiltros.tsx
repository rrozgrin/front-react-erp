import React from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import type { StatusCardapio } from './cardapioUtils';
import {
    ActionButton,
    FilterCard,
    FiltersGrid,
    FilterSelect,
    FilterStack,
    SearchInput,
    SearchInputWrapper,
    SearchSection,
} from './styled';

interface CardapiosFiltrosProps {
    busca: string;
    status: 'Todos os status' | StatusCardapio;
    ordem: 'Ordenar por ordem' | 'Nome A-Z';
    desabilitado: boolean;
    onBuscaChange: (valor: string) => void;
    onStatusChange: (valor: 'Todos os status' | StatusCardapio) => void;
    onOrdemChange: (valor: 'Ordenar por ordem' | 'Nome A-Z') => void;
    onNovo: () => void;
}

export const CardapiosFiltros: React.FC<CardapiosFiltrosProps> = ({
    busca,
    status,
    ordem,
    desabilitado,
    onBuscaChange,
    onStatusChange,
    onOrdemChange,
    onNovo,
}) => (
    <FilterCard>
        <SearchSection>
            <SearchInputWrapper>
                <FiSearch />
                <SearchInput value={busca} onChange={(evento) => onBuscaChange(evento.target.value)} placeholder="Buscar cardápio" />
            </SearchInputWrapper>
            <FiltersGrid>
                <FilterStack>
                    <span>Status</span>
                    <FilterSelect value={status} onChange={(evento) => onStatusChange(evento.target.value as typeof status)}>
                        <option>Todos os status</option><option>Ativo</option><option>Inativo</option>
                    </FilterSelect>
                </FilterStack>
                <FilterStack>
                    <span>Ordenação</span>
                    <FilterSelect value={ordem} onChange={(evento) => onOrdemChange(evento.target.value as typeof ordem)}>
                        <option>Ordenar por ordem</option><option>Nome A-Z</option>
                    </FilterSelect>
                </FilterStack>
            </FiltersGrid>
            <ActionButton type="button" onClick={onNovo} disabled={desabilitado}>
                <FiPlus /> Novo cardápio
            </ActionButton>
        </SearchSection>
    </FilterCard>
);
