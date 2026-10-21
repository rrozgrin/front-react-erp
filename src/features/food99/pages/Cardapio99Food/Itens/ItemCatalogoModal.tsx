import React from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import { ModalSimple, ModalSimpleActionButton } from '@/common/components/ModalSimple';
import { formatarCampoMoedaBRL } from '@/utils/formatadores';
import type { Food99Categoria, Food99Menu } from '../../../hooks/useFood99Catalog';
import {
    estaPublicadoOuNaFila,
    type EstadoFormularioItem,
    type VisualizacaoItemCatalogo,
} from './itemCatalogoUtils';
import {
    FilterLabel,
    FilterSelect,
    FormInput,
    ModalFormGrid,
    ModalItemSummary,
} from './styled';

interface ItemCatalogoModalProps {
    item: VisualizacaoItemCatalogo;
    dados: EstadoFormularioItem;
    menus: Food99Menu[];
    categorias: Food99Categoria[];
    categoriasDoMenu: Food99Categoria[];
    salvando: boolean;
    onDadosChange: React.Dispatch<React.SetStateAction<EstadoFormularioItem>>;
    onClose: () => void;
    onSubmit: (evento: React.FormEvent<HTMLFormElement>) => void;
}

export const ItemCatalogoModal: React.FC<ItemCatalogoModalProps> = ({
    item,
    dados,
    menus,
    categorias,
    categoriasDoMenu,
    salvando,
    onDadosChange,
    onClose,
    onSubmit,
}) => {
    const publicadoOuNaFila = estaPublicadoOuNaFila(item.origem);

    return (
        <ModalSimple
            title={publicadoOuNaFila ? 'Atualizar item 99Food' : 'Cadastrar item 99Food'}
            subtitle="Confirme o cardápio e a categoria antes de publicar o item."
            size="lg"
            onClose={onClose}
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose} disabled={salvando}>
                        <FiX /> Cancelar
                    </ModalSimpleActionButton>
                    <ModalSimpleActionButton type="submit" form="food99-item-configure-form" disabled={salvando}>
                        <FiSave /> {salvando ? 'Salvando...' : publicadoOuNaFila ? 'Atualizar' : 'Cadastrar'}
                    </ModalSimpleActionButton>
                </>
            )}
        >
            <ModalItemSummary>
                <strong>{item.nome}</strong>
                <span>{item.preco} | {item.status}</span>
            </ModalItemSummary>

            <form id="food99-item-configure-form" onSubmit={onSubmit}>
                <ModalFormGrid>
                    <FilterLabel>
                        <span>Cardápio</span>
                        <FilterSelect
                            value={dados.menuAppId}
                            onChange={(evento) => {
                                const proximoMenuId = evento.target.value;
                                const proximaCategoria = categorias.find(
                                    (categoria) => categoria.menuAppId === proximoMenuId,
                                );

                                onDadosChange((atual) => ({
                                    ...atual,
                                    menuAppId: proximoMenuId,
                                    categoriaAppId: proximaCategoria?.categoriaAppId ?? '',
                                }));
                            }}
                        >
                            <option value="">Selecione</option>
                            {menus.map((menu) => (
                                <option key={menu.menuAppId} value={menu.menuAppId}>{menu.nome}</option>
                            ))}
                        </FilterSelect>
                    </FilterLabel>

                    <FilterLabel>
                        <span>Categoria</span>
                        <FilterSelect
                            value={dados.categoriaAppId}
                            onChange={(evento) => onDadosChange((atual) => ({
                                ...atual,
                                categoriaAppId: evento.target.value,
                            }))}
                        >
                            <option value="">Selecione</option>
                            {categoriasDoMenu.map((categoria) => (
                                <option key={categoria.categoriaAppId} value={categoria.categoriaAppId}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </FilterSelect>
                    </FilterLabel>

                    <FilterLabel>
                        <span>Nome do item</span>
                        <FormInput
                            maxLength={50}
                            value={dados.nomeItem}
                            onChange={(evento) => onDadosChange((atual) => ({
                                ...atual,
                                nomeItem: evento.target.value,
                            }))}
                        />
                    </FilterLabel>

                    <FilterLabel>
                        <span>Preço</span>
                        <FormInput
                            inputMode="numeric"
                            value={dados.valorPreco}
                            onChange={(evento) => onDadosChange((atual) => ({
                                ...atual,
                                valorPreco: formatarCampoMoedaBRL(evento.target.value),
                            }))}
                            placeholder="R$ 29,90"
                        />
                    </FilterLabel>

                    <FilterLabel>
                        <span>Descrição</span>
                        <FormInput
                            maxLength={300}
                            value={dados.descricaoCurta}
                            onChange={(evento) => onDadosChange((atual) => ({
                                ...atual,
                                descricaoCurta: evento.target.value,
                            }))}
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
                            <option value="active">Ativo</option>
                            <option value="inactive">Inativo</option>
                        </FilterSelect>
                    </FilterLabel>
                </ModalFormGrid>
            </form>
        </ModalSimple>
    );
};
