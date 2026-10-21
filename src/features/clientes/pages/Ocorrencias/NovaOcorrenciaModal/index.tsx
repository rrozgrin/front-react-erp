import React, { useState } from "react";
import styled from "styled-components";
import {
    ModalSimple,
    ModalSimpleActionButton,
} from "../../../../../common/components/ModalSimple";
import {
    Select as UiSelect,
    Textarea as UiTextarea,
} from "../../../../../common/components/Ui";
import { FaBuilding, FaAlignLeft } from "react-icons/fa";
import { formatarDataHoraBR } from "../../../../../types/Data";

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: var(--space-xs);
    width: 100%;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    width: 100%;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 6px;
    }
`;

const Field = styled.div<{ full?: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;

    ${({ full }) =>
        full &&
        `
        grid-column: 1 / -1;
    `}
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: var(--space-xs);

    font-size: 0.92rem;
    font-weight: 600;
    color: var(--theme-text);

    svg {
        color: var(--bs-primary);
        font-size: 0.9rem;
    }
`;

const sharedInputStyles = `
    width: 100%;
    border-radius: var(--radius-xl);
    border: 1px solid var(--theme-border);
    background: var(--theme-surface-soft);
    color: var(--theme-text);

    padding: 14px var(--space-md);
    font-size: 0.95rem;

    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: var(--bs-primary);
        box-shadow: 0 0 0 3px rgba(var(--bs-primary-rgb), 0.15);
        background: var(--theme-surface);
    }

    &::placeholder {
        color: var(--theme-text-soft);
    }

    &:read-only {
        opacity: 0.9;
        cursor: default;
    }

    @media (max-width: 768px) {
        font-size: 0.92rem;
        padding: var(--space-sm) 14px;
    }
`;

const Select = styled(UiSelect)`
    ${sharedInputStyles}
    cursor: pointer;
`;

const Textarea = styled(UiTextarea)`
    ${sharedInputStyles}
    resize: vertical;
    min-height: 130px;
`;

const InfoCard = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);

    background: var(--theme-surface-soft);
    border: 1px solid var(--theme-border);

    border-radius: 18px;
    padding: 18px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    &:not(:last-child) {
        border-right: 1px solid var(--theme-border);
        padding-right: var(--space-md);

        @media (max-width: 768px) {
            border-right: none;
            border-bottom: 1px solid var(--theme-border);
            padding-right: 0;
            padding-bottom: 14px;
        }
    }
`;

const InfoTitle = styled.span`
    font-size: 0.82rem;
    color: var(--theme-text-soft);
    font-weight: 600;
`;

const InfoValue = styled.span`
    font-size: var(--font-size-md);
    color: var(--theme-text);
    font-weight: 500;
    word-break: break-word;
`;

interface NovaOcorrenciaModalProps {
    open: boolean;
    onClose: () => void;
    onRegistrar: (ocorrencia: any) => void;
    cliente?: {
        id?: string;
        nome_fantasia?: string;
    };
}

export function NovaOcorrenciaModal({
    open,
    onClose,
    onRegistrar,
    cliente,
}: NovaOcorrenciaModalProps) {
    const initialState = {
        codigoCliente: cliente?.id || "",
        nomeCliente: cliente?.nome_fantasia || "",
        funcionario: "FUNCIONARIO MASTER",
        departamento: "",
        atendente: "FUNCIONARIO MASTER",
        descricao: "",
        dataHora: formatarDataHoraBR(new Date()),
    };

    const [form, setForm] = useState(initialState);

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleRegistrar() {
        onRegistrar({
            protocolo: Math.floor(Math.random() * 1000000).toString(),
            data: form.dataHora,
            tipo: form.departamento || "Administrativo",
            atendente: form.atendente,
            descricao: form.descricao,
            funcionario: form.funcionario,
            codigoCliente: form.codigoCliente,
            nomeCliente: form.nomeCliente,
        });

        onClose();
        setForm(initialState);
    }

    return open ? (
        <ModalSimple
            title="Registrar Nova Ocorrência"
            subtitle="Preencha as informações abaixo para registrar uma nova ocorrência no sistema."
            onClose={onClose}
            size="lg"
            footer={
                <ModalSimpleActionButton
                    type="button"
                    onClick={handleRegistrar}
                >
                    Registrar
                </ModalSimpleActionButton>
            }
        >
            <ModalContent>
                <InfoCard>
                    <InfoItem>
                        <InfoTitle>Código do Cliente</InfoTitle>
                        <InfoValue>{form.codigoCliente}</InfoValue>
                    </InfoItem>

                    <InfoItem>
                        <InfoTitle>Nome do Cliente</InfoTitle>
                        <InfoValue>{form.nomeCliente}</InfoValue>
                    </InfoItem>

                    <InfoItem>
                        <InfoTitle>Funcionário</InfoTitle>
                        <InfoValue>{form.funcionario}</InfoValue>
                    </InfoItem>
                </InfoCard>

                <Grid>
                    <Field>
                        <Label>
                            <FaBuilding />
                            Departamento Responsável
                        </Label>

                        <Select
                            name="departamento"
                            value={form.departamento}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Administrativo">
                                Administrativo
                            </option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Comercial">Comercial</option>
                        </Select>
                    </Field>

                    <Field full>
                        <Label>
                            <FaAlignLeft />
                            Descrição da Ocorrência
                        </Label>

                        <Textarea
                            name="descricao"
                            value={form.descricao}
                            onChange={handleChange}
                            placeholder="Descreva os detalhes da ocorrência..."
                        />
                    </Field>
                </Grid>
            </ModalContent>
        </ModalSimple>
    ) : null;
}
