import { useState } from 'react';
import styled from 'styled-components';
import {
    ModalSimple,
    ModalSimpleFormRow,
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import { Select } from '../../../../common/components/Ui';

const painelPdvOptions = ['IMPORTADO XML', 'LANCHES', 'PARAFUSOS', 'PIZZAS'];

const FieldRow = styled(ModalSimpleFormRow)``;

interface PainelPdvModalProps {
    value: string;
    onClose: () => void;
    onSave: (value: string) => void;
}

export const PainelPdvModal = ({
    value,
    onClose,
    onSave,
}: PainelPdvModalProps) => {
    const [selectedValue, setSelectedValue] = useState(value);

    return (
        <ModalSimple
            title="Painel Principal de Produtos no Tablet PDV:"
            onClose={onClose}
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Fechar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button" onClick={() => { onSave(selectedValue); onClose(); }}>Gravar</ModalSimpleActionButton>
                </>
            )}
        >
            <FieldRow>
                <span>Painel Principal de Produtos no Tablet PDV:</span>
                <Select value={selectedValue} onChange={(event) => setSelectedValue(event.target.value)}>
                    {painelPdvOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </Select>
            </FieldRow>
        </ModalSimple>
    );
};
