import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ModalSimple } from '@/common/components/ModalSimple';
import {
    FieldGroup,
    FieldInput,
    FieldLabel,
    FieldStack,
    ModalBody,
} from './styled';
import { Botao } from '@/common/components/Buttons/Botao';

export interface CancelarItemFormValues {
    codigoBarra: string;
    item: string;
}

interface CancelarItemModalProps {
    open: boolean;
    onClose: () => void;
    onCancelItem?: (values: CancelarItemFormValues) => void;
}

export const CancelarItemModal: React.FC<CancelarItemModalProps> = ({
    open,
    onClose,
    onCancelItem,
}) => {
    const codigoBarraRef = useRef<HTMLInputElement | null>(null);
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [codigoBarra, setCodigoBarra] = useState('');
    const [item, setItem] = useState('');

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

    useEffect(() => {
        if (!open) {
            setCodigoBarra('');
            setItem('');
            return;
        }

        window.setTimeout(() => codigoBarraRef.current?.focus(), 0);
    }, [open]);

    const canCancel = useMemo(() => codigoBarra.trim() !== '' || item.trim() !== '', [codigoBarra, item]);

    const handleCancelItem = () => {
        if (!canCancel) {
            return;
        }

        onCancelItem?.({
            codigoBarra: codigoBarra.trim(),
            item: item.trim(),
        });

        onClose();
    };

    if (!open) {
        return null;
    }

    return (
        <ModalSimple
            title="Cancelar Item"
            subtitle="(ESC) Sair"
            onClose={onClose}
            size="sm"
            footer={(
                <>
                    <Botao nome="Fechar" action={onClose} />
                    <Botao nome="Confirmar" color="add" action={handleCancelItem} />
                </>
            )}
        >
            <ModalBody>
                <FieldGroup>
                    <FieldStack>
                        <FieldLabel htmlFor="cancelar-item-codigo-barra">
                            Código de Barra
                        </FieldLabel>
                        <FieldInput
                            id="cancelar-item-codigo-barra"
                            ref={codigoBarraRef}
                            value={codigoBarra}
                            onChange={(event) => setCodigoBarra(event.target.value)}
                            placeholder="Digite o código de barra"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    itemRef.current?.focus();
                                }
                            }}
                        />
                    </FieldStack>
                </FieldGroup>

                <FieldGroup>
                    <FieldStack>
                        <FieldLabel htmlFor="cancelar-item-numero">
                            Nº do Item <small>*</small>
                        </FieldLabel>
                        <FieldInput
                            id="cancelar-item-numero"
                            ref={itemRef}
                            value={item}
                            onChange={(event) => setItem(event.target.value)}
                            placeholder="Digite o número do item"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    handleCancelItem();
                                }
                            }}
                        />
                    </FieldStack>
                </FieldGroup>
            </ModalBody>
        </ModalSimple>
    );
};

export default CancelarItemModal;
