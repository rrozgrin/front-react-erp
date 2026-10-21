import React from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import { ModalSimple, ModalSimpleActionButton } from '@/common/components/ModalSimple';
import { normalizarSlug } from '@/utils/texto';
import type { Food99Menu } from '../../../hooks/useFood99Catalog';
import {
    type EstadoFormularioCategoria,
} from './catalogoUtils';
import { FilterLabel, FilterSelect, FormGrid, FormInput } from './styled';

interface CategoriaFormularioModalProps {
    dados: EstadoFormularioCategoria;
    menus: Food99Menu[];
    editando: boolean;
    salvando: boolean;
    onDadosChange: React.Dispatch<React.SetStateAction<EstadoFormularioCategoria>>;
    onClose: () => void;
    onSubmit: (evento: React.FormEvent<HTMLFormElement>) => void;
}

export const CategoriaFormularioModal: React.FC<CategoriaFormularioModalProps> = ({
    dados,
    menus,
    editando,
    salvando,
    onDadosChange,
    onClose,
    onSubmit,
}) => (
    <ModalSimple
        title={editando ? 'Editar categoria' : 'Nova categoria'}
        size="lg"
        onClose={onClose}
        footer={(
            <>
                <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose} disabled={salvando}>
                    <FiX /> Cancelar
                </ModalSimpleActionButton>
                <ModalSimpleActionButton type="submit" form="food99-category-form" disabled={salvando}>
                    <FiSave /> {salvando ? 'Salvando...' : 'Salvar'}
                </ModalSimpleActionButton>
            </>
        )}
    >
        <form id="food99-category-form" onSubmit={onSubmit}>
            <FormGrid>
                <FilterLabel>
                    <span>Cardápio</span>
                    <FilterSelect
                        value={dados.menuAppId}
                        onChange={(evento) => onDadosChange((atual) => ({ ...atual, menuAppId: evento.target.value }))}
                    >
                        <option value="">Selecione</option>
                        {menus.map((menu) => <option key={menu.menuAppId} value={menu.menuAppId}>{menu.nome}</option>)}
                    </FilterSelect>
                </FilterLabel>
                <FilterLabel>
                    <span>Nome da categoria</span>
                    <FormInput
                        value={dados.nomeCategoria}
                        onChange={(evento) => {
                            const proximoNome = evento.target.value;
                            onDadosChange((atual) => ({
                                ...atual,
                                nomeCategoria: proximoNome,
                                categoriaAppId: editando ? atual.categoriaAppId : normalizarSlug(proximoNome),
                            }));
                        }}
                        maxLength={100}
                        placeholder="Bebidas"
                    />
                </FilterLabel>
                <FilterLabel>
                    <span>ID da categoria</span>
                    <FormInput
                        value={dados.categoriaAppId}
                        onChange={(evento) => onDadosChange((atual) => ({ ...atual, categoriaAppId: evento.target.value }))}
                        maxLength={100}
                        disabled={editando}
                        placeholder="bebidas"
                    />
                </FilterLabel>
                <FilterLabel>
                    <span>Ordem</span>
                    <FormInput
                        type="number"
                        min={0}
                        value={dados.ordem}
                        onChange={(evento) => onDadosChange((atual) => ({ ...atual, ordem: evento.target.value }))}
                    />
                </FilterLabel>
                <FilterLabel>
                    <span>Status</span>
                    <FilterSelect
                        value={dados.ativo ? 'active' : 'inactive'}
                        onChange={(evento) => onDadosChange((atual) => ({
                            ...atual,
                            ativo: evento.target.value === 'active',
                        }))}
                    >
                        <option value="active">Ativo</option><option value="inactive">Inativo</option>
                    </FilterSelect>
                </FilterLabel>
            </FormGrid>
        </form>
    </ModalSimple>
);
