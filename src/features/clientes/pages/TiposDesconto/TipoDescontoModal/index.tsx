import React, { useEffect, useMemo, useState } from "react";
import {
    ModalSimple,
    ModalSimpleFormRow,
} from "../../../../../common/components/ModalSimple";
import { Botao } from "../../../../../common/components/Buttons/Botao";
export interface TipoDescontoFormData {
    descricao: string;
    desconto: string;
}

interface ModalTipoDescontoProps {
    show: boolean;
    onClose: () => void;
    onSave: (data: TipoDescontoFormData) => void;
    initialData?: TipoDescontoFormData | null;
}

export const ModalTipoDesconto: React.FC<ModalTipoDescontoProps> = ({
    show,
    onClose,
    onSave,
    initialData,
}) => {
    const [descricao, setDescricao] = useState("");
    const [desconto, setDesconto] = useState("");

    useEffect(() => {
        if (!show) {
            return;
        }

        setDescricao(initialData?.descricao ?? "");
        setDesconto(initialData?.desconto ?? "");
    }, [initialData, show]);

    const title = useMemo(
        () =>
            initialData
                ? "Editar Tipo de Desconto"
                : "Cadastrar Tipo de Desconto",
        [initialData],
    );
    const canSave = descricao.trim() !== "" && desconto.trim() !== "";

    const handleSave = () => {
        if (!canSave) {
            return;
        }

        onSave({
            descricao: descricao.trim(),
            desconto: desconto.trim(),
        });
    };

    if (!show) {
        return null;
    }

    return (
        <ModalSimple
            title={title}
            onClose={onClose}
            size="md"
            footer={
                <>
                    <Botao nome="Cancelar" action={onClose} />
                    <Botao
                        nome="Salvar"
                        color="add"
                        action={handleSave}
                        disabled={!canSave}
                    />
                </>
            }
        >
            <ModalSimpleFormRow>
                <span>Descrição</span>
                <input
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                    placeholder="Ex: Premium"
                />
            </ModalSimpleFormRow>

            <ModalSimpleFormRow>
                <span>Desconto (%)</span>
                <input
                    value={desconto}
                    onChange={(event) => setDesconto(event.target.value)}
                    placeholder="Ex: 20"
                    inputMode="decimal"
                />
            </ModalSimpleFormRow>
        </ModalSimple>
    );
};

export default ModalTipoDesconto;
