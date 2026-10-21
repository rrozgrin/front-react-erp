import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    FiChevronDown,
} from 'react-icons/fi';
import {
    ModalSimple,
} from '@/common/components/ModalSimple';
import {
    FieldLabel,
    FieldStack,
    FieldsGrid,
    FormField,
    FormInput,
    ModalBody,
    SelectLikeField,
    SelectLikeInput,
    SelectLikeTrigger,
} from './styled';
import { Botao } from '@/common/components/Buttons/Botao';

export interface FrenteCaixaAlterarItem {
    item: string;
    codigo: string;
    descricao: string;
    quantidade: string;
    valorUnitario: string;
}

export interface AlterarItemFormValues extends FrenteCaixaAlterarItem {
    valorTotal: string;
}

interface AlterarItemModalProps {
    initialItem?: FrenteCaixaAlterarItem | null;
    onClose: () => void;
    onSave?: (values: AlterarItemFormValues) => void;
    open: boolean;
}

const mockItens: AlterarItemFormValues[] = [
    {
        item: '1',
        codigo: '51547356',
        descricao: 'MORANGO M',
        quantidade: '1,000',
        valorUnitario: '63,26',
        valorTotal: '63,26',
    },
    {
        item: '2',
        codigo: '100',
        descricao: 'HAMBURGUER ARTESANAL 01',
        quantidade: '1,000',
        valorUnitario: '20,00',
        valorTotal: '20,00',
    },
    {
        item: '3',
        codigo: '8001',
        descricao: 'TORTA DE LIMAO',
        quantidade: '0,202',
        valorUnitario: '50,50',
        valorTotal: '10,20',
    },
];

const formatMoeda = (value: number) => new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format(value);

const parsePtBrNumber = (value: string) => {
    const normalized = value.replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '');
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
};

const calculateTotal = (quantidade: string, valorUnitario: string) => formatMoeda(parsePtBrNumber(quantidade) * parsePtBrNumber(valorUnitario));

const resolveItem = (item: string) => mockItens.find((entry) => entry.item === item) ?? null;

export const AlterarItemModal: React.FC<AlterarItemModalProps> = ({
    initialItem,
    onClose,
    onSave,
    open,
}) => {
    const itemInputRef = useRef<HTMLInputElement | null>(null);
    const descricaoRef = useRef<HTMLInputElement | null>(null);
    const [itemNumber, setItemNumber] = useState('');
    const [selectedItem, setSelectedItem] = useState<AlterarItemFormValues | null>(null);
    const [descricao, setDescricao] = useState('');
    const [codigo, setCodigo] = useState('');
    const [quantidade, setQuantidade] = useState('1,000');
    const [valorUnitario, setValorUnitario] = useState('');

    useEffect(() => {
        if (!open) {
            return;
        }

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        if (!open) {
            setItemNumber('');
            setSelectedItem(null);
            setDescricao('');
            setCodigo('');
            setQuantidade('1,000');
            setValorUnitario('');
            return;
        }

        if (initialItem) {
            const initialValues = {
                ...initialItem,
                valorTotal: calculateTotal(initialItem.quantidade, initialItem.valorUnitario),
            };

            setItemNumber(initialItem.item);
            setSelectedItem(initialValues);
            setCodigo(initialItem.codigo);
            setDescricao(initialItem.descricao);
            setQuantidade(initialItem.quantidade);
            setValorUnitario(initialItem.valorUnitario);
            window.setTimeout(() => descricaoRef.current?.focus(), 0);
            return;
        }

        setItemNumber('');
        setSelectedItem(null);
        setCodigo('');
        setDescricao('');
        setQuantidade('1,000');
        setValorUnitario('');
        window.setTimeout(() => itemInputRef.current?.focus(), 0);
    }, [initialItem, open]);

    const valorTotal = useMemo(() => calculateTotal(quantidade, valorUnitario), [quantidade, valorUnitario]);

    const canSave = Boolean(selectedItem || initialItem) && descricao.trim() !== '' && codigo.trim() !== '' && quantidade.trim() !== '' && valorUnitario.trim() !== '';

    const handleConfirmItem = useCallback(() => {
        const resolved = resolveItem(itemNumber.trim());

        if (!resolved) {
            return;
        }

        setSelectedItem(resolved);
        setItemNumber(resolved.item);
        setCodigo(resolved.codigo);
        setDescricao(resolved.descricao);
        setQuantidade(resolved.quantidade);
        setValorUnitario(resolved.valorUnitario);
        window.setTimeout(() => descricaoRef.current?.focus(), 0);
    }, [itemNumber]);

    const handleSave = useCallback(() => {
        if (!canSave) {
            return;
        }

        onSave?.({
            item: itemNumber.trim() || selectedItem?.item || initialItem?.item || '',
            codigo: codigo.trim(),
            descricao: descricao.trim(),
            quantidade: quantidade.trim(),
            valorUnitario: valorUnitario.trim(),
            valorTotal,
        });

        onClose();
    }, [canSave, codigo, descricao, itemNumber, onClose, onSave, quantidade, selectedItem, valorTotal, valorUnitario]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, open]);

    if (!open) {
        return null;
    }

    const showingItem = Boolean(selectedItem || initialItem);

    return (
        <ModalSimple
            title="Alterar Item"
            subtitle=''
            onClose={onClose}
            size="sm"
            footer={(
                <>
                    <Botao nome="Fechar" action={onClose} />
                    <Botao nome="Confirmar" color="add" action={handleSave} />
                </>
            )}
        >
            <ModalBody>
                {!showingItem ? (
                    <FieldStack>
                        <FieldLabel htmlFor="alterar-item-numero">
                            N° do Item
                        </FieldLabel>
                        <SelectLikeField>
                            <SelectLikeInput
                                id="alterar-item-numero"
                                ref={itemInputRef}
                                value={itemNumber}
                                onChange={(event) => setItemNumber(event.target.value)}
                                onBlur={(event) => setItemNumber(event.target.value.trim())}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleConfirmItem();
                                    }
                                }}
                                list="alterar-item-opcoes"
                                placeholder="Selecione ou digite o número do item"
                                autoComplete="off"
                            />
                            <SelectLikeTrigger type="button" onClick={handleConfirmItem} aria-label="Selecionar item">
                                <FiChevronDown />
                            </SelectLikeTrigger>
                        </SelectLikeField>
                        <datalist id="alterar-item-opcoes">
                            {mockItens.map((item) => (
                                <option key={item.item} value={item.item}>
                                    {item.descricao}
                                </option>
                            ))}
                        </datalist>
                    </FieldStack>

                ) : (
                    <FieldsGrid>
                        <FormField htmlFor="alterar-item-numero-editavel">
                            N° do Item
                            <FormInput
                                id="alterar-item-numero-editavel"
                                value={itemNumber}
                                onChange={(event) => setItemNumber(event.target.value)}
                                onBlur={(event) => setItemNumber(event.target.value.trim())}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleSave();
                                    }
                                }}
                            />
                        </FormField>

                        <FormField htmlFor="alterar-item-codigo">
                            Código
                            <FormInput
                                id="alterar-item-codigo"
                                value={codigo}
                                readOnly
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleSave();
                                    }
                                }}
                            />
                        </FormField>

                        <FormField htmlFor="alterar-item-descricao">
                            Descrição do Item
                            <FormInput
                                id="alterar-item-descricao"
                                ref={descricaoRef}
                                value={descricao}
                                onChange={(event) => setDescricao(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleSave();
                                    }
                                }}
                            />
                        </FormField>

                        <FormField htmlFor="alterar-item-valor-unitario">
                            Valor Unitário
                            <FormInput
                                id="alterar-item-valor-unitario"
                                value={valorUnitario}
                                onChange={(event) => setValorUnitario(event.target.value)}
                                inputMode="decimal"
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleSave();
                                    }
                                }}
                            />
                        </FormField>

                        <FormField htmlFor="alterar-item-quantidade">
                            Quantidade
                            <FormInput
                                id="alterar-item-quantidade"
                                value={quantidade}
                                onChange={(event) => setQuantidade(event.target.value)}
                                inputMode="decimal"
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleSave();
                                    }
                                }}
                            />
                        </FormField>

                        <FormField htmlFor="alterar-item-total">
                            Valor Total
                            <FormInput
                                id="alterar-item-total"
                                value={valorTotal}
                                readOnly
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleSave();
                                    }
                                }}
                            />
                        </FormField>
                    </FieldsGrid>
                )}
            </ModalBody>
        </ModalSimple>
    );
};

export default AlterarItemModal;
