import React, { useEffect, useMemo, useState } from "react";
import { IoBodyOutline } from "react-icons/io5";
import {
    Actions,
    Field,
    FieldsGrid,
    Footer,
    InputShell,
    Label,
    StepActionButton,
    SectionHeading,
    SectionLine,
    Select,
    Textarea,
} from "../../../../../common/components/BaseStepModal/styled";
import { BaseStepModal } from "../../../../../common/components/BaseStepModal";
import { Input } from "../../../../../common/components/Ui";
import {
    anamneseSteps,
    areaOptions,
    initialAnamneseFormData,
    procedimentoOptions,
    type AnamneseFormData,
} from "./anamneseConfig";
import {
    AreaOption,
    AreaOptionsGrid,
    CountBadge,
    EmptyProcedimentos,
    ProcedimentoActions,
    ProcedimentoItem,
    ProcedimentoList,
    ProcedimentosSummary,
    ProcedimentosSummaryHeader,
    RemoveProcedureButton,
} from "./styled";
import { AnamneseHistoricoSaudeStep } from "./AnamneseHistoricoSaudeStep";

interface AnamneseClienteModalProps {
    open: boolean;
    clienteNome?: string;
    onClose: () => void;
}

export const AnamneseClienteModal: React.FC<AnamneseClienteModalProps> = ({
    open,
    clienteNome,
    onClose,
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<AnamneseFormData>(
        initialAnamneseFormData,
    );

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [open, onClose]);

    const selectedAreas = useMemo(
        () => formData.areasTratamento.split("|").filter(Boolean),
        [formData.areasTratamento],
    );

    const handleChange = (field: keyof AnamneseFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAreaToggle = (area: string) => {
        setFormData((prev) => {
            const areas = prev.areasTratamento.split("|").filter(Boolean);
            const nextAreas = areas.includes(area)
                ? areas.filter((item) => item !== area)
                : [...areas, area];

            return {
                ...prev,
                areasTratamento: nextAreas.join("|"),
            };
        });
    };

    const handleClearProcedimentoSelection = () => {
        setFormData((prev) => ({
            ...prev,
            procedimentoInteresse: "",
            areasTratamento: "",
        }));
    };

    const handleAddProcedimento = () => {
        if (!formData.procedimentoInteresse || !selectedAreas.length) {
            return;
        }

        setFormData((prev) => ({
            ...prev,
            procedimentoInteresse: "",
            areasTratamento: "",
            procedimentosSelecionados: [
                ...prev.procedimentosSelecionados,
                {
                    id: `${Date.now()}-${prev.procedimentosSelecionados.length}`,
                    procedimento: prev.procedimentoInteresse,
                    areas: selectedAreas,
                },
            ],
        }));
    };

    const handleRemoveProcedimento = (id: string) => {
        setFormData((prev) => ({
            ...prev,
            procedimentosSelecionados: prev.procedimentosSelecionados.filter(
                (item) => item.id !== id,
            ),
        }));
    };

    const handleClose = () => {
        setCurrentStep(0);
        onClose();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleClose();
    };

    const renderHistoricoSaudeStep = () => (
        <AnamneseHistoricoSaudeStep
            formData={formData}
            onChange={handleChange}
        />
    );

    const renderProcedimentosAreasStep = () => (
        <>
            <SectionHeading>
                <span>Procedimentos e áreas</span>
                <SectionLine />
            </SectionHeading>

            <FieldsGrid>
                <Field>
                    <Label htmlFor="anamnese-procedimento-interesse">
                        Procedimento de interesse
                    </Label>
                    <Select
                        id="anamnese-procedimento-interesse"
                        value={formData.procedimentoInteresse}
                        onChange={(event) =>
                            handleChange(
                                "procedimentoInteresse",
                                event.target.value,
                            )
                        }
                    >
                        <option value="">Selecione...</option>
                        {procedimentoOptions.map((procedimento) => (
                            <option key={procedimento} value={procedimento}>
                                {procedimento}
                            </option>
                        ))}
                    </Select>
                </Field>

                <Field>
                    <Label htmlFor="anamnese-areas-tratamento">
                        Áreas de tratamento
                    </Label>
                    <AreaOptionsGrid>
                        {areaOptions.map((area) => (
                            <AreaOption key={area}>
                                <Input
                                    type="checkbox"
                                    checked={selectedAreas.includes(area)}
                                    onChange={() => handleAreaToggle(area)}
                                />
                                {area}
                            </AreaOption>
                        ))}
                    </AreaOptionsGrid>
                </Field>

                <Field>
                    <Label>Seleção atual</Label>
                    <InputShell>
                        <IoBodyOutline size={18} />
                        <Input
                            type="text"
                            readOnly
                            value={
                                formData.procedimentoInteresse
                                    ? `${formData.procedimentoInteresse}${selectedAreas.length ? ` - ${selectedAreas.join(", ")}` : ""}`
                                    : ""
                            }
                            placeholder="Selecione um procedimento e uma ou mais áreas"
                        />
                    </InputShell>
                </Field>

                <ProcedimentoActions>
                    <StepActionButton
                        $variant="secondary"
                        type="button"
                        onClick={handleClearProcedimentoSelection}
                    >
                        Limpar seleção
                    </StepActionButton>

                    <StepActionButton
                        type="button"
                        onClick={handleAddProcedimento}
                        disabled={
                            !formData.procedimentoInteresse ||
                            !selectedAreas.length
                        }
                    >
                        Adicionar procedimento
                    </StepActionButton>
                </ProcedimentoActions>

                <ProcedimentosSummary>
                    <ProcedimentosSummaryHeader>
                        <span>Procedimentos adicionados</span>
                        <CountBadge>
                            {formData.procedimentosSelecionados.length}
                        </CountBadge>
                    </ProcedimentosSummaryHeader>

                    {formData.procedimentosSelecionados.length ? (
                        <ProcedimentoList>
                            {formData.procedimentosSelecionados.map((item) => (
                                <ProcedimentoItem key={item.id}>
                                    <div>
                                        <strong>{item.procedimento}</strong>
                                        <span>{item.areas.join(", ")}</span>
                                    </div>

                                    <RemoveProcedureButton
                                        type="button"
                                        onClick={() =>
                                            handleRemoveProcedimento(item.id)
                                        }
                                    >
                                        Remover
                                    </RemoveProcedureButton>
                                </ProcedimentoItem>
                            ))}
                        </ProcedimentoList>
                    ) : (
                        <EmptyProcedimentos>
                            Nenhum procedimento adicionado.
                        </EmptyProcedimentos>
                    )}
                </ProcedimentosSummary>
            </FieldsGrid>
        </>
    );

    const renderObservacoesStep = () => (
        <>
            <SectionHeading>
                <span>Observações</span>
                <SectionLine />
            </SectionHeading>

            <FieldsGrid>
                <Field>
                    <Label htmlFor="anamnese-observacoes-cliente">
                        Observações do Cliente
                    </Label>
                    <Textarea
                        id="anamnese-observacoes-cliente"
                        placeholder="Anotações importantes para o atendimento"
                        value={formData.observacoesCliente}
                        onChange={(event) =>
                            handleChange(
                                "observacoesCliente",
                                event.target.value,
                            )
                        }
                    />
                </Field>
                <Field>
                    <Label htmlFor="anamnese-observacoes-gerais">
                        Observações do Profissional
                    </Label>
                    <Textarea
                        id="anamnese-observacoes-gerais"
                        placeholder="Anotações importantes para o atendimento"
                        value={formData.observacoesGerais}
                        onChange={(event) =>
                            handleChange(
                                "observacoesGerais",
                                event.target.value,
                            )
                        }
                    />
                </Field>
            </FieldsGrid>
        </>
    );

    const renderStep = () => {
        switch (anamneseSteps[currentStep]?.id) {
            case "historico-saude":
                return renderHistoricoSaudeStep();
            case "procedimentos-areas":
                return renderProcedimentosAreasStep();
            case "observacoes":
                return renderObservacoesStep();
            default:
                return null;
        }
    };

    if (!open) {
        return null;
    }

    return (
        <BaseStepModal
            title="Anamnese Cliente"
            subtitle={
                clienteNome
                    ? `Cliente: ${clienteNome}`
                    : "Preencha a anamnese clínica do cliente."
            }
            onClose={handleClose}
            onSubmit={handleSubmit}
            steps={anamneseSteps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            footer={
                <Footer>
                    <Actions>
                        <StepActionButton
                            $variant="secondary"
                            type="button"
                            onClick={handleClose}
                        >
                            Cancelar
                        </StepActionButton>

                        {currentStep > 0 && (
                            <StepActionButton
                                $variant="secondary"
                                type="button"
                                onClick={() =>
                                    setCurrentStep((prev) => prev - 1)
                                }
                            >
                                Voltar
                            </StepActionButton>
                        )}

                        {currentStep < anamneseSteps.length - 1 ? (
                            <StepActionButton
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentStep((prev) => prev + 1);
                                }}
                            >
                                Próximo passo
                            </StepActionButton>
                        ) : (
                            <StepActionButton type="submit">
                                Salvar anamnese
                            </StepActionButton>
                        )}
                    </Actions>
                </Footer>
            }
        >
            {renderStep()}
        </BaseStepModal>
    );
};
