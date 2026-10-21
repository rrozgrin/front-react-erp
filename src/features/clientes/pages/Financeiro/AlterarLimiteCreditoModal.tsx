import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ModalSimple, ModalSimpleActionButton } from '../../../../common/components/ModalSimple';
import { Input as UiInput } from '../../../../common/components/Ui';

type Props = {
    open: boolean;
    initialValue: number;
    onClose: () => void;
    onSave: (nextValue: number) => void;
};

const Body = styled.div`
    display: grid;
    gap: 10px;

    @media (max-width: 768px) {
        gap: var(--space-xs);
    }
`;

const Label = styled.label`
    display: block;
    font-size: var(--font-size-xs);
    font-weight: 500;
    color: var(--theme-text, #0f172a);
    margin-bottom: 10px;

    small {
        color: #ef4444;
        margin-left: var(--space-2xs);
    }
`;

const CurrencyField = styled.div`
    height: 56px;
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.22));
    border-radius: 10px;
    display: grid;
    grid-template-columns: 58px 1fr;
    align-items: stretch;
    overflow: hidden;
    background: var(--theme-surface, #ffffff);

    &:focus-within {
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: 0 0 0 3px rgba(var(--bs-primary-rgb, 13, 110, 253), 0.15);
    }
`;

const Prefix = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--theme-text-soft, #475569);
    border-right: 1px solid var(--theme-border, rgba(15, 23, 42, 0.12));
    background: var(--theme-surface-muted, rgba(248, 250, 252, 0.92));
    font-size: 1.2rem;
    font-weight: 500;
`;

const Input = styled(UiInput)`
    border: none;
    padding: 0 var(--space-md);
    font-size: 1.2rem;
    color: var(--theme-text, #0f172a);
    background: transparent;

    &::placeholder {
        color: var(--theme-text-soft, #94a3b8);
    }

    @media (max-width: 768px) {
        font-size: var(--font-size-md);
    }
`;

const Hint = styled.p`
    margin: 10px 0 0;
    color: var(--theme-text-soft, #64748b);
`;

const toDigits = (value: string) => value.replace(/\D/g, '');

const formatCentsToBRLInput = (digits: string) => {
    const normalized = digits || '0';
    const cents = Number.parseInt(normalized, 10);
    const value = Number.isFinite(cents) ? cents / 100 : 0;

    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

const centsDigitsToNumber = (digits: string) => {
    const cents = Number.parseInt(digits || '0', 10);
    return Number.isFinite(cents) ? cents / 100 : 0;
};

export const AlterarLimiteCreditoModal: React.FC<Props> = ({
    open,
    initialValue,
    onClose,
    onSave,
}) => {
    const [digitsValue, setDigitsValue] = useState('0');

    useEffect(() => {
        if (!open) {
            return;
        }

        const next = Math.round((initialValue || 0) * 100);
        setDigitsValue(String(next));
    }, [initialValue, open]);

    const displayValue = useMemo(() => formatCentsToBRLInput(digitsValue), [digitsValue]);
    const parsedValue = useMemo(() => centsDigitsToNumber(digitsValue), [digitsValue]);
    const canSave = parsedValue >= 0;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDigitsValue(toDigits(event.target.value));
    };

    const handleSave = () => {
        if (!canSave) {
            return;
        }

        onSave(parsedValue);
    };

    if (!open) {
        return null;
    }

    return (
        <ModalSimple
            title="Alterar Limite de Crédito"
            subtitle="Informe o novo limite de crédito disponível para este usuário."
            onClose={onClose}
            size="sm"
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Cancelar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button" onClick={handleSave} disabled={!canSave}>Salvar</ModalSimpleActionButton>
                </>
            )}
        >
            <Body>
                <Label>
                    Limite de Crédito <small>*</small>
                </Label>

                <CurrencyField>
                    <Prefix>R$</Prefix>
                    <Input
                        value={displayValue}
                        onChange={handleInputChange}
                        inputMode="numeric"
                        placeholder="0,00"
                        aria-label="Limite de crédito"
                        autoFocus
                    />
                </CurrencyField>

                <Hint>Digite o valor do limite de crédito.</Hint>
            </Body>
        </ModalSimple>
    );
};
