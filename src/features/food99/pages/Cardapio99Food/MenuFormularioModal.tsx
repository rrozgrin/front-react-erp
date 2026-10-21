import React from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import { ModalSimple, ModalSimpleActionButton } from '@/common/components/ModalSimple';
import { normalizarSlug } from '@/utils/texto';
import { type EstadoFormularioMenu } from './cardapioUtils';
import { FilterSelect, FormGrid, FormInput, FormStack } from './styled';

interface MenuFormularioModalProps {
    dados: EstadoFormularioMenu;
    editando: boolean;
    salvando: boolean;
    onDadosChange: React.Dispatch<React.SetStateAction<EstadoFormularioMenu>>;
    onClose: () => void;
    onSubmit: (evento: React.FormEvent<HTMLFormElement>) => void;
}

export const MenuFormularioModal: React.FC<MenuFormularioModalProps> = ({
    dados,
    editando,
    salvando,
    onDadosChange,
    onClose,
    onSubmit,
}) => (
    <ModalSimple
        title={editando ? 'Editar cardápio' : 'Novo cardápio'}
        size="lg"
        onClose={onClose}
        footer={(
            <>
                <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose} disabled={salvando}>
                    <FiX /> Cancelar
                </ModalSimpleActionButton>
                <ModalSimpleActionButton type="submit" form="food99-menu-form" disabled={salvando}>
                    <FiSave /> {salvando ? 'Salvando...' : 'Salvar'}
                </ModalSimpleActionButton>
            </>
        )}
    >
        <form id="food99-menu-form" onSubmit={onSubmit}>
            <FormGrid>
                <FormStack>
                    <span>Nome do cardápio</span>
                    <FormInput
                        value={dados.nomeMenu}
                        onChange={(evento) => {
                            const proximoNome = evento.target.value;
                            onDadosChange((atual) => ({
                                ...atual,
                                nomeMenu: proximoNome,
                                menuAppId: editando ? atual.menuAppId : normalizarSlug(proximoNome),
                            }));
                        }}
                        maxLength={100}
                        placeholder="Menu Principal"
                    />
                </FormStack>
                <FormStack>
                    <span>ID do cardápio</span>
                    <FormInput
                        value={dados.menuAppId}
                        onChange={(evento) => onDadosChange((atual) => ({ ...atual, menuAppId: evento.target.value }))}
                        maxLength={100}
                        disabled={editando}
                        placeholder="menu-principal"
                    />
                </FormStack>
                <FormStack>
                    <span>Ordem</span>
                    <FormInput
                        type="number"
                        min={0}
                        value={dados.ordem}
                        onChange={(evento) => onDadosChange((atual) => ({ ...atual, ordem: evento.target.value }))}
                    />
                </FormStack>
                <FormStack>
                    <span>Status</span>
                    <FilterSelect
                        value={dados.ativo ? 'active' : 'inactive'}
                        onChange={(evento) => onDadosChange((atual) => ({
                            ...atual,
                            ativo: evento.target.value === 'active',
                        }))}
                    >
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                    </FilterSelect>
                </FormStack>
            </FormGrid>
        </form>
    </ModalSimple>
);
