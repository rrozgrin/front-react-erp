import { useState } from 'react';
import styled from 'styled-components';
import {
    ModalSimple,
    ModalSimpleFormRow,
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import { Input } from '../../../../common/components/Ui';
import type { ProdutoVolume, VolumeFormValues } from './types';

const FieldRow = styled(ModalSimpleFormRow)``;

interface VolumeModalProps {
    initialData?: ProdutoVolume;
    onClose: () => void;
    onSave: (values: VolumeFormValues) => void;
}

export const VolumeModal = ({
    initialData,
    onClose,
    onSave,
}: VolumeModalProps) => {
    const [values, setValues] = useState<VolumeFormValues>(() => ({
        descricao: initialData?.descricao ?? '',
        alturaCm: initialData?.alturaCm ?? '',
        larguraCm: initialData?.larguraCm ?? '',
        comprimentoCm: initialData?.comprimentoCm ?? '',
        pesoKg: initialData?.pesoKg ?? '',
    }));

    const updateField = (field: keyof VolumeFormValues, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = () => {
        onSave(values);
        onClose();
    };

    return (
        <ModalSimple
            title={initialData ? `Alterar Volume ${initialData.descricao}` : 'Adicionar Novo Volume'}
            onClose={onClose}
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Fechar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button" onClick={handleSubmit}>Gravar</ModalSimpleActionButton>
                </>
            )}
        >
            <FieldRow>
                <span>Descrição do volume:</span>
                <Input
                    value={values.descricao}
                    onChange={(event) => updateField('descricao', event.target.value)}
                />
            </FieldRow>

            <FieldRow>
                <span>Altura (cm):</span>
                <Input
                    value={values.alturaCm}
                    onChange={(event) => updateField('alturaCm', event.target.value)}
                />
            </FieldRow>

            <FieldRow>
                <span>Largura (cm):</span>
                <Input
                    value={values.larguraCm}
                    onChange={(event) => updateField('larguraCm', event.target.value)}
                />
            </FieldRow>

            <FieldRow>
                <span>Comprimento (cm):</span>
                <Input
                    value={values.comprimentoCm}
                    onChange={(event) => updateField('comprimentoCm', event.target.value)}
                />
            </FieldRow>

            <FieldRow>
                <span>Peso (kg):</span>
                <Input
                    value={values.pesoKg}
                    onChange={(event) => updateField('pesoKg', event.target.value)}
                />
            </FieldRow>
        </ModalSimple>
    );
};
