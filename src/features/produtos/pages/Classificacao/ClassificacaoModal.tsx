import {
    useState,
} from 'react';
import styled from 'styled-components';
import {
    ModalSimple,
    ModalSimpleFormRow,
    ModalSimpleInlineOptions,
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import { Input, Radio, Select } from '../../../../common/components/Ui';
import {
    type ClassificacaoFormValues,
    type ProdutoClassificacao,
    initialClassificacaoFormValues,
} from './types';

const FormGrid = styled.div`
    display: grid;
    gap: 14px;
`;

const FieldRow = styled(ModalSimpleFormRow)``;
const RadioGroup = styled(ModalSimpleInlineOptions)``;

const SectionTitle = styled.h4`
    margin: var(--space-xs) 0 0;
    padding-bottom: var(--space-xs);
    border-bottom: 1px solid var(--theme-border, #cbd5e1);
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-md);
`;

interface ClassificacaoModalProps {
    title: string;
    mode: 'classificacao' | 'subclassificacao';
    classificacoes: ProdutoClassificacao[];
    initialData?: ProdutoClassificacao;
    onClose: () => void;
    onSave: (values: ClassificacaoFormValues) => void;
}

export const ClassificacaoModal = ({
    title,
    mode,
    classificacoes,
    initialData,
    onClose,
    onSave,
}: ClassificacaoModalProps) => {
    const [values, setValues] = useState<ClassificacaoFormValues>(() => {
        if (!initialData) {
            return initialClassificacaoFormValues;
        }

        return {
            ...initialClassificacaoFormValues,
            nome: initialData.nome,
            classificacaoPrincipal: initialData.subClassificacao === '- Principal -' ? '' : initialData.subClassificacao,
            ativo: initialData.status === 'ativo',
            lojaVirtual: initialData.lojaVirtual,
            catalogo: initialData.catalogo,
            mercadoLivre: initialData.mercadoLivre === 'Não Vinculada' ? '' : initialData.mercadoLivre,
        };
    });

    const updateValue = <TKey extends keyof ClassificacaoFormValues>(
        key: TKey,
        value: ClassificacaoFormValues[TKey],
    ) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const handleSubmit = () => {
        onSave(values);
        onClose();
    };

    return (
        <ModalSimple
            title={title}
            onClose={onClose}
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Fechar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button" onClick={handleSubmit}>Gravar</ModalSimpleActionButton>
                </>
            )}
        >
            <FormGrid>
                {mode === 'subclassificacao' && (
                    <FieldRow>
                        <span>Classificação Principal:</span>
                        <Select
                            value={values.classificacaoPrincipal}
                            onChange={(event) => updateValue('classificacaoPrincipal', event.target.value)}
                        >
                            <option value="">Selecione</option>
                            {classificacoes
                                .filter((classificacao) => classificacao.subClassificacao === '- Principal -')
                                .map((classificacao) => (
                                    <option key={classificacao.id} value={classificacao.nome}>
                                        {classificacao.nome}
                                    </option>
                                ))}
                        </Select>
                    </FieldRow>
                )}

                <FieldRow>
                    <span>{mode === 'classificacao' ? 'Nome da Classificação' : 'Nome da SubClassificação'}</span>
                    <Input
                        value={values.nome}
                        onChange={(event) => updateValue('nome', event.target.value)}
                    />
                </FieldRow>

                <FieldRow>
                    <span>Ativo</span>
                    <RadioGroup>
                        <label><Radio checked={values.ativo} onChange={() => updateValue('ativo', true)} /> Sim</label>
                        <label><Radio checked={!values.ativo} onChange={() => updateValue('ativo', false)} /> Não</label>
                    </RadioGroup>
                </FieldRow>

                <FieldRow>
                    <span>Mostrar na Loja Virtual?</span>
                    <RadioGroup>
                        <label><Radio checked={values.lojaVirtual} onChange={() => updateValue('lojaVirtual', true)} /> Sim</label>
                        <label><Radio checked={!values.lojaVirtual} onChange={() => updateValue('lojaVirtual', false)} /> Não</label>
                    </RadioGroup>
                </FieldRow>

                <FieldRow>
                    <span>Mostrar no Catálogo?</span>
                    <RadioGroup>
                        <label><Radio checked={values.catalogo} onChange={() => updateValue('catalogo', true)} /> Sim</label>
                        <label><Radio checked={!values.catalogo} onChange={() => updateValue('catalogo', false)} /> Não</label>
                    </RadioGroup>
                </FieldRow>
            </FormGrid>

            <SectionTitle>Configurações de Comanda</SectionTitle>

            <FormGrid>
                <FieldRow>
                    <span>Mostrar na Comanda?</span>
                    <RadioGroup>
                        <label><Radio checked={values.comanda} onChange={() => updateValue('comanda', true)} /> Sim</label>
                        <label><Radio checked={!values.comanda} onChange={() => updateValue('comanda', false)} /> Não</label>
                    </RadioGroup>
                </FieldRow>

                <FieldRow>
                    <span>Imagem <small>(para uso de mesa/comanda)</small></span>
                    <RadioGroup>
                        <label><Radio checked={values.imagem === 'nenhuma'} onChange={() => updateValue('imagem', 'nenhuma')} /> Nenhuma</label>
                        <label><Radio checked={values.imagem === 'banco'} onChange={() => updateValue('imagem', 'banco')} /> Banco de Imagens</label>
                        <label><Radio checked={values.imagem === 'propria'} onChange={() => updateValue('imagem', 'propria')} /> Minha própria imagem</label>
                    </RadioGroup>
                </FieldRow>
            </FormGrid>

            <SectionTitle>Mercado Livre</SectionTitle>

            <FieldRow>
                <span>Classificação:</span>
                <Input
                    value={values.mercadoLivre}
                    onChange={(event) => updateValue('mercadoLivre', event.target.value)}
                />
            </FieldRow>
        </ModalSimple>
    );
};
