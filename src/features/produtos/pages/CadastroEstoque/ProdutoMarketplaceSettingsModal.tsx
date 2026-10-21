import styled from 'styled-components';
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import {
    Field,
    FieldsGrid,
    InputShell,
    Label,
} from '../../../../common/components/BaseStepModal/styled';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { SegmentedControl } from '../../../../common/components/SegmentedControl';
import { Input } from '../../../../common/components/Ui';
import { FaPlus } from 'react-icons/fa';
import type { ProdutoFormData } from '../../types/Produto';

interface ProdutoMarketplaceSettingsModalProps {
    formData: ProdutoFormData;
    onAddVideo: () => void;
    onClose: () => void;
    onFieldChange: <K extends keyof ProdutoFormData>(field: K, value: ProdutoFormData[K]) => void;
    onRemoveVideo: (index: number) => void;
    onVideoInputChange: (value: string) => void;
    open: boolean;
    videoInput: string;
}

const ModalContent = styled.div`
    display: grid;
    gap: var(--space-md);
`;

const InlineActions = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
`;

const Tag = styled.span`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    border: 1px solid #d8e2ef;
    border-radius: var(--radius-pill);
    background: #f8fafc;
    color: #000000;
    font-size: 0.88rem;
`;

const TagRemove = styled.button`
    border: none;
    background: transparent;
    color: #495057;
    font-weight: 500;
`;

export const ProdutoMarketplaceSettingsModal = ({
    formData,
    onAddVideo,
    onClose,
    onFieldChange,
    onRemoveVideo,
    onVideoInputChange,
    open,
    videoInput,
}: ProdutoMarketplaceSettingsModalProps) => {
    if (!open) {
        return null;
    }

    const yesNoOptions = [
        { value: 'S', label: 'Sim' },
        { value: 'N', label: 'Nao' },
    ];
    const oneZeroOptions = [
        { value: '1', label: 'Sim' },
        { value: '0', label: 'Nao' },
    ];

    const handleSegmentedChange = <K extends keyof ProdutoFormData>(field: K) => (value: string) => {
        onFieldChange(field, value as ProdutoFormData[K]);
    };

    return (
        <ModalSimple
            title="Configurações Marketplaces"
            size="lg"
            onClose={onClose}
            footer={(
                <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>
                    Fechar
                </ModalSimpleActionButton>
            )}
        >
            <ModalContent>
                <FieldsGrid $columns={2}>
                    <Field>
                        <Label>Mostrar na loja virtual?</Label>
                        <SegmentedControl
                            ariaLabel="Mostrar na loja virtual"
                            value={formData.mostrarLojaVirtual}
                            onChange={handleSegmentedChange('mostrarLojaVirtual')}
                            options={yesNoOptions}
                        />
                    </Field>
                    <Field>
                        <Label>Mostrar produto sem estoque?</Label>
                        <SegmentedControl
                            ariaLabel="Mostrar produto sem estoque"
                            value={formData.mostrarProdutoSemEstoque}
                            onChange={handleSegmentedChange('mostrarProdutoSemEstoque')}
                            options={yesNoOptions}
                        />
                    </Field>
                    <Field>
                        <Label>Gerenciar estoque na loja virtual?</Label>
                        <SegmentedControl
                            ariaLabel="Gerenciar estoque na loja virtual"
                            value={formData.gerenciarEstoqueLojaVirtual}
                            onChange={handleSegmentedChange('gerenciarEstoqueLojaVirtual')}
                            options={oneZeroOptions}
                        />
                    </Field>
                    <Field>
                        <Label>Mostrar em marketplace?</Label>
                        <SegmentedControl
                            ariaLabel="Mostrar em marketplace"
                            value={formData.mostrarMarketplace}
                            onChange={handleSegmentedChange('mostrarMarketplace')}
                            options={yesNoOptions}
                        />
                    </Field>
                    <Field>
                        <Label>Publicar na Shopee?</Label>
                        <SegmentedControl
                            ariaLabel="Publicar na Shopee"
                            value={formData.publicarShopee}
                            onChange={handleSegmentedChange('publicarShopee')}
                            options={oneZeroOptions}
                        />
                    </Field>
                    <Field>
                        <Label>Publicar no iFood?</Label>
                        <SegmentedControl
                            ariaLabel="Publicar no iFood"
                            value={formData.publicarIfood}
                            onChange={handleSegmentedChange('publicarIfood')}
                            options={oneZeroOptions}
                        />
                    </Field>
                    <Field>
                        <Label>Publicar no iFood Mercado?</Label>
                        <SegmentedControl
                            ariaLabel="Publicar no iFood Mercado"
                            value={formData.publicarIfoodMercado}
                            onChange={handleSegmentedChange('publicarIfoodMercado')}
                            options={oneZeroOptions}
                        />
                    </Field>
                    <Field>
                        <Label>Permitir vender estoque zero?</Label>
                        <SegmentedControl
                            ariaLabel="Permitir vender estoque zero"
                            value={formData.permitirEstoqueZero}
                            onChange={handleSegmentedChange('permitirEstoqueZero')}
                            options={yesNoOptions}
                        />
                    </Field>
                    <Field>
                        <Label>Bloquear desconto?</Label>
                        <SegmentedControl
                            ariaLabel="Bloquear desconto"
                            value={formData.bloquearDesconto}
                            onChange={handleSegmentedChange('bloquearDesconto')}
                            options={yesNoOptions}
                        />
                    </Field>
                    <Field>
                        <Label>Locação?</Label>
                        <SegmentedControl
                            ariaLabel="Locacao"
                            value={formData.locacao}
                            onChange={handleSegmentedChange('locacao')}
                            options={oneZeroOptions}
                        />
                    </Field>
                    <Field $span={2}>
                        <Label>Quantidade para locação</Label>
                        <InputShell>
                            <Input
                                type="number"
                                value={formData.quantidadeLocacao}
                                onChange={(event) => onFieldChange('quantidadeLocacao', event.target.value)}
                            />
                        </InputShell>
                    </Field>
                </FieldsGrid>

                <Field>
                    <Label>Vídeos da loja virtual</Label>
                    <InlineActions>
                        <InputShell>
                            <Input
                                value={videoInput}
                                onChange={(event) => onVideoInputChange(event.target.value)}
                                placeholder="Cole um link do YouTube"
                            />
                        </InputShell>
                        <Botao
                            nome="Adicionar vídeo"
                            color="add"
                            action={onAddVideo}
                            icone={<FaPlus />}
                        />
                    </InlineActions>
                    <TagList>
                        {formData.linksVideo.map((item, index) => (
                            <Tag key={`${item}-${index}`}>
                                {item}
                                <TagRemove type="button" onClick={() => onRemoveVideo(index)}>
                                    x
                                </TagRemove>
                            </Tag>
                        ))}
                    </TagList>
                </Field>
            </ModalContent>
        </ModalSimple>
    );
};
