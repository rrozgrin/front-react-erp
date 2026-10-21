import { useState } from "react";
import styled from "styled-components";
import {
    ModalSimple,
    ModalSimpleFormRow,
    ModalSimpleInlineOptions,
    ModalSimpleActionButton,
} from "../../../../common/components/ModalSimple";
import { Input } from "../../../../common/components/Ui";
import type { MarcaFormValues, ProdutoMarca } from "./types";

const FieldRow = styled(ModalSimpleFormRow)`
    small {
        display: block;
        margin-top: 6px;
        color: var(--theme-text-soft, #64748b);
    }
`;

const RadioGroup = styled(ModalSimpleInlineOptions)``;

interface MarcaModalProps {
    initialData?: ProdutoMarca;
    onClose: () => void;
    onSave: (values: MarcaFormValues) => void;
}

export const MarcaModal = ({
    initialData,
    onClose,
    onSave,
}: MarcaModalProps) => {
    const [values, setValues] = useState<MarcaFormValues>(() => ({
        nome: initialData?.nome ?? "",
        lojaVirtual: initialData?.lojaVirtual ?? false,
    }));

    const handleSubmit = () => {
        onSave(values);
        onClose();
    };

    return (
        <ModalSimple
            title={
                initialData
                    ? `Alterar Marca ${initialData.nome}`
                    : "Adicionar Nova Marca"
            }
            onClose={onClose}
            footer={
                <>
                    <ModalSimpleActionButton
                        $variant="secondary"
                        type="button"
                        onClick={onClose}
                    >
                        Fechar
                    </ModalSimpleActionButton>
                    <ModalSimpleActionButton
                        type="button"
                        onClick={handleSubmit}
                    >
                        Gravar
                    </ModalSimpleActionButton>
                </>
            }
        >
            <FieldRow>
                <span>Nome da Marca:</span>
                <Input
                    value={values.nome}
                    onChange={(event) =>
                        setValues((current) => ({
                            ...current,
                            nome: event.target.value,
                        }))
                    }
                />
            </FieldRow>

            <FieldRow>
                <span>Exibir na Loja Virtual</span>
                <RadioGroup>
                    <label>
                        <Input
                            type="radio"
                            checked={values.lojaVirtual}
                            onChange={() =>
                                setValues((current) => ({
                                    ...current,
                                    lojaVirtual: true,
                                }))
                            }
                        />
                        Sim
                    </label>
                    <label>
                        <Input
                            type="radio"
                            checked={!values.lojaVirtual}
                            onChange={() =>
                                setValues((current) => ({
                                    ...current,
                                    lojaVirtual: false,
                                }))
                            }
                        />
                        Não
                    </label>
                </RadioGroup>
            </FieldRow>

            <FieldRow>
                <span>Inserir Imagem:</span>
                <div>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                            setValues((current) => ({
                                ...current,
                                imagem: event.target.files?.[0],
                            }))
                        }
                    />
                    <small>
                        A imagem deve ser superior ou com dimensões de 250x250.
                    </small>
                </div>
            </FieldRow>
        </ModalSimple>
    );
};
