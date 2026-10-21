import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiCalendar, FiHash, FiPlus, FiTool, FiUser } from "react-icons/fi";
import {
    Actions,
    Field,
    InputShell,
    Label,
    StepActionButton,
    SectionHeading,
    SectionLine,
    Footer,
} from "../../../../common/components/BaseStepModal/styled";
import { Input, Select, Textarea } from "../../../../common/components/Ui";
import { BaseStepModal } from "../../../../common/components/BaseStepModal";
import { ModalAddClientes } from "../../../clientes";
import type { Cliente } from "../../../clientes/types/Cliente";
import type { AssistenciaStatus, AssistenciaTecnica } from "./assistenciaData";

export interface AssistenciaFormValues {
    cliente: string;
    status: AssistenciaStatus;
    nfr: string;
    aparelho: string;
    marca: string;
    modelo: string;
    serie: string;
    voltagem: string;
    tipoServico: string;
    acessorios: string;
    defeitosRelatados: string;
    nomeTecnico: string;
    entradaOs: string;
    dataEntrada: string;
    previsaoConclusao: string;
    garantia: string;
    tecnico: string;
}

interface AssistenciaTecnicaModalProps {
    initialData?: AssistenciaTecnica | null;
    mode?: "create" | "edit";
    onClose: () => void;
    onSubmit: (values: AssistenciaFormValues) => void;
}

const DenseGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--space-md);

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

const DenseField = styled(Field)<{ $span?: number }>`
    grid-column: span ${({ $span = 6 }) => $span};

    @media (max-width: 860px) {
        grid-column: span 1;
    }
`;

const InputActionButton = styled.button`
    width: 34px;
    height: 34px;
    border: 1px solid var(--theme-border, var(--bs-border-color));
    border-radius: 0.125rem;
    background: var(--theme-surface-soft, var(--bs-light-bg-subtle));
    color: var(--color-main, var(--bs-primary));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
`;

const steps = [
    {
        id: "cliente",
        title: "Cliente",
        description: "Cliente, status e identificação inicial.",
    },
    {
        id: "equipamento",
        title: "Equipamento",
        description: "Aparelho, marca, modelo, série e voltagem.",
    },
    {
        id: "servico",
        title: "Serviço",
        description: "Serviço solicitado, defeito, técnico e prazos.",
    },
];

const emptyValues: AssistenciaFormValues = {
    cliente: "",
    status: "aberta",
    nfr: "",
    aparelho: "",
    marca: "",
    modelo: "",
    serie: "",
    voltagem: "110 V",
    tipoServico: "",
    acessorios: "",
    defeitosRelatados: "",
    nomeTecnico: "",
    entradaOs: "",
    dataEntrada: new Date().toISOString().slice(0, 10),
    previsaoConclusao: "",
    garantia: "Sem Garantia",
    tecnico: "",
};

const buildInitialValues = (
    initialData?: AssistenciaTecnica | null,
): AssistenciaFormValues => {
    if (!initialData) {
        return emptyValues;
    }

    return {
        cliente: initialData.cliente,
        status: initialData.status,
        nfr: initialData.numero,
        aparelho: initialData.aparelho,
        marca: initialData.marca,
        modelo: initialData.modelo,
        serie: initialData.serie,
        voltagem: initialData.voltagem,
        tipoServico: initialData.tipoServico,
        acessorios: initialData.acessorios,
        defeitosRelatados: initialData.defeitosRelatados,
        nomeTecnico: initialData.nomeTecnico,
        entradaOs: initialData.entradaOs,
        dataEntrada: initialData.dataEntrada,
        previsaoConclusao: initialData.previsaoConclusao,
        garantia: initialData.garantia,
        tecnico: initialData.tecnico,
    };
};

export const AssistenciaTecnicaModal = ({
    initialData,
    mode = "create",
    onClose,
    onSubmit,
}: AssistenciaTecnicaModalProps) => {
    const [values, setValues] = useState<AssistenciaFormValues>(() =>
        buildInitialValues(initialData),
    );
    const [currentStep, setCurrentStep] = useState(0);
    const [showClienteModal, setShowClienteModal] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !showClienteModal) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose, showClienteModal]);

    const isLastStep = currentStep === steps.length - 1;
    const isDisabled =
        !values.cliente.trim() ||
        !values.status ||
        !values.aparelho.trim() ||
        !values.marca.trim() ||
        !values.modelo.trim() ||
        !values.tipoServico.trim() ||
        !values.dataEntrada ||
        !values.tecnico.trim();

    const updateValue = <TKey extends keyof AssistenciaFormValues>(
        key: TKey,
        value: AssistenciaFormValues[TKey],
    ) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isDisabled) {
            return;
        }

        onSubmit(values);
    };

    const handleClienteSubmit = (cliente: Cliente) => {
        const nomeCliente =
            cliente.tipoPessoa === "j"
                ? cliente.razao_social || cliente.nome_fantasia || cliente.nome
                : cliente.nome;

        updateValue("cliente", nomeCliente);
        setShowClienteModal(false);
    };

    const renderClienteStep = () => (
        <>
            <SectionHeading>
                <span>Dados iniciais</span>
                <SectionLine />
            </SectionHeading>

            <DenseGrid>
                <DenseField $span={7}>
                    <Label htmlFor="assistencia-cliente">Cliente *</Label>
                    <InputShell>
                        <FiUser size={18} />
                        <Input
                            id="assistencia-cliente"
                            type="text"
                            placeholder="Digite o nome ou razão social..."
                            value={values.cliente}
                            onChange={(event) =>
                                updateValue("cliente", event.target.value)
                            }
                        />
                        <InputActionButton
                            type="button"
                            title="Adicionar cliente"
                            aria-label="Adicionar cliente"
                            onClick={() => setShowClienteModal(true)}
                        >
                            <FiPlus size={16} />
                        </InputActionButton>
                    </InputShell>
                </DenseField>

                <DenseField $span={5}>
                    <Label htmlFor="assistencia-status">Status *</Label>
                    <Select
                        id="assistencia-status"
                        value={values.status}
                        onChange={(event) =>
                            updateValue(
                                "status",
                                event.target.value as AssistenciaStatus,
                            )
                        }
                    >
                        <option value="aberta">Aberta</option>
                        <option value="em_andamento">Em andamento</option>
                        <option value="aguardando_peca">Aguardando peça</option>
                        <option value="concluida">Concluída</option>
                        <option value="cancelada">Cancelada</option>
                        <option value="desativada">Desativada</option>
                    </Select>
                </DenseField>

                <DenseField $span={5}>
                    <Label htmlFor="assistencia-nfr">NF/RR</Label>
                    <InputShell>
                        <FiHash size={18} />
                        <Input
                            id="assistencia-nfr"
                            type="text"
                            placeholder="Informe NF, RR ou código interno"
                            value={values.nfr}
                            onChange={(event) =>
                                updateValue("nfr", event.target.value)
                            }
                        />
                    </InputShell>
                </DenseField>
            </DenseGrid>
        </>
    );

    const renderEquipamentoStep = () => (
        <>
            <SectionHeading>
                <span>Equipamento</span>
                <SectionLine />
            </SectionHeading>

            <DenseGrid>
                <DenseField $span={3}>
                    <Label htmlFor="assistencia-aparelho">Aparelho *</Label>
                    <Select
                        id="assistencia-aparelho"
                        value={values.aparelho}
                        onChange={(event) =>
                            updateValue("aparelho", event.target.value)
                        }
                    >
                        <option value="">Selecione</option>
                        <option value="Televisor">Televisor</option>
                        <option value="Microondas">Microondas</option>
                        <option value="Geladeira">Geladeira</option>
                        <option value="Ar Condicionado">Ar Condicionado</option>
                        <option value="Notebook">Notebook</option>
                        <option value="Lavadora">Lavadora</option>
                    </Select>
                </DenseField>

                <DenseField $span={3}>
                    <Label htmlFor="assistencia-marca">Marca *</Label>
                    <Select
                        id="assistencia-marca"
                        value={values.marca}
                        onChange={(event) =>
                            updateValue("marca", event.target.value)
                        }
                    >
                        <option value="">Selecione</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Electrolux">Electrolux</option>
                        <option value="Brastemp">Brastemp</option>
                        <option value="LG">LG</option>
                        <option value="Dell">Dell</option>
                        <option value="JBL">JBL</option>
                    </Select>
                </DenseField>

                <DenseField $span={3}>
                    <Label htmlFor="assistencia-modelo">Modelo *</Label>
                    <InputShell>
                        <Input
                            id="assistencia-modelo"
                            type="text"
                            placeholder="Selecione ou digite"
                            value={values.modelo}
                            onChange={(event) =>
                                updateValue("modelo", event.target.value)
                            }
                        />
                        <InputActionButton
                            type="button"
                            title="Adicionar modelo"
                            aria-label="Adicionar modelo"
                        >
                            <FiPlus size={16} />
                        </InputActionButton>
                    </InputShell>
                </DenseField>

                <DenseField $span={2}>
                    <Label htmlFor="assistencia-serie">Nº Série</Label>
                    <InputShell>
                        <Input
                            id="assistencia-serie"
                            type="text"
                            placeholder="Digite o nº de série"
                            value={values.serie}
                            onChange={(event) =>
                                updateValue("serie", event.target.value)
                            }
                        />
                    </InputShell>
                </DenseField>

                <DenseField $span={1}>
                    <Label htmlFor="assistencia-voltagem">Voltagem</Label>
                    <Select
                        id="assistencia-voltagem"
                        value={values.voltagem}
                        onChange={(event) =>
                            updateValue("voltagem", event.target.value)
                        }
                    >
                        <option value="110 V">110 V</option>
                        <option value="220 V">220 V</option>
                        <option value="Bivolt">Bivolt</option>
                    </Select>
                </DenseField>
            </DenseGrid>
        </>
    );

    const renderServicoStep = () => (
        <>
            <SectionHeading>
                <span>Serviço e prazos</span>
                <SectionLine />
            </SectionHeading>

            <DenseGrid>
                <DenseField $span={6}>
                    <Label htmlFor="assistencia-tipo-servico">
                        Tipo de Serviço *
                    </Label>
                    <Select
                        id="assistencia-tipo-servico"
                        value={values.tipoServico}
                        onChange={(event) =>
                            updateValue("tipoServico", event.target.value)
                        }
                    >
                        <option value="">Selecione um serviço</option>
                        <option value="Diagnóstico técnico">
                            Diagnóstico técnico
                        </option>
                        <option value="Manutenção corretiva">
                            Manutenção corretiva
                        </option>
                        <option value="Troca de componente">
                            Troca de componente
                        </option>
                        <option value="Limpeza e carga de gás">
                            Limpeza e carga de gás
                        </option>
                        <option value="Análise de hardware">
                            Análise de hardware
                        </option>
                    </Select>
                </DenseField>

                <DenseField $span={6}>
                    <Label htmlFor="assistencia-nome-tecnico">
                        Nome do Técnico
                    </Label>
                    <InputShell>
                        <FiTool size={18} />
                        <Input
                            id="assistencia-nome-tecnico"
                            type="text"
                            placeholder="Digite o nome do técnico responsável"
                            value={values.nomeTecnico}
                            onChange={(event) =>
                                updateValue("nomeTecnico", event.target.value)
                            }
                        />
                    </InputShell>
                </DenseField>

                <DenseField $span={6}>
                    <Label htmlFor="assistencia-acessorios">Acessórios</Label>
                    <Textarea
                        id="assistencia-acessorios"
                        placeholder="Informe os acessórios inclusos..."
                        value={values.acessorios}
                        onChange={(event) =>
                            updateValue("acessorios", event.target.value)
                        }
                    />
                </DenseField>

                <DenseField $span={6}>
                    <Label htmlFor="assistencia-defeitos">
                        Defeitos Relatados
                    </Label>
                    <Textarea
                        id="assistencia-defeitos"
                        placeholder="Descreva o problema relatado pelo cliente..."
                        value={values.defeitosRelatados}
                        onChange={(event) =>
                            updateValue("defeitosRelatados", event.target.value)
                        }
                    />
                </DenseField>

                <DenseField $span={4}>
                    <Label htmlFor="assistencia-entrada-os">Entrada - OS</Label>
                    <InputShell>
                        <FiHash size={18} />
                        <Input
                            id="assistencia-entrada-os"
                            type="text"
                            placeholder="Digite o número da OS de entrada"
                            value={values.entradaOs}
                            onChange={(event) =>
                                updateValue("entradaOs", event.target.value)
                            }
                        />
                    </InputShell>
                </DenseField>

                <DenseField $span={4}>
                    <Label htmlFor="assistencia-data-entrada">
                        Data Entrada *
                    </Label>
                    <InputShell>
                        <FiCalendar size={18} />
                        <Input
                            id="assistencia-data-entrada"
                            type="date"
                            value={values.dataEntrada}
                            onChange={(event) =>
                                updateValue("dataEntrada", event.target.value)
                            }
                        />
                    </InputShell>
                </DenseField>

                <DenseField $span={4}>
                    <Label htmlFor="assistencia-previsao">
                        Previsão de conclusão do serviço
                    </Label>
                    <InputShell>
                        <FiCalendar size={18} />
                        <Input
                            id="assistencia-previsao"
                            type="date"
                            value={values.previsaoConclusao}
                            onChange={(event) =>
                                updateValue(
                                    "previsaoConclusao",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </DenseField>

                <DenseField $span={6}>
                    <Label htmlFor="assistencia-garantia">Garantia</Label>
                    <Select
                        id="assistencia-garantia"
                        value={values.garantia}
                        onChange={(event) =>
                            updateValue("garantia", event.target.value)
                        }
                    >
                        <option value="Sem Garantia">Sem Garantia</option>
                        <option value="Garantia de 30 dias">
                            Garantia de 30 dias
                        </option>
                        <option value="Garantia de 90 dias">
                            Garantia de 90 dias
                        </option>
                        <option value="Garantia de fábrica">
                            Garantia de fábrica
                        </option>
                    </Select>
                </DenseField>

                <DenseField $span={6}>
                    <Label htmlFor="assistencia-tecnico">Técnico *</Label>
                    <Select
                        id="assistencia-tecnico"
                        value={values.tecnico}
                        onChange={(event) => {
                            updateValue("tecnico", event.target.value);
                            if (!values.nomeTecnico) {
                                updateValue(
                                    "nomeTecnico",
                                    event.target.value.replace(" MASTER", ""),
                                );
                            }
                        }}
                    >
                        <option value="">
                            Selecione o técnico responsável
                        </option>
                        <option value="João da Silva MASTER">
                            João da Silva MASTER
                        </option>
                        <option value="Lucas Pereira MASTER">
                            Lucas Pereira MASTER
                        </option>
                        <option value="Ana Paula MASTER">
                            Ana Paula MASTER
                        </option>
                    </Select>
                </DenseField>
            </DenseGrid>
        </>
    );

    const renderStep = () => {
        if (currentStep === 0) {
            return renderClienteStep();
        }

        if (currentStep === 1) {
            return renderEquipamentoStep();
        }

        return renderServicoStep();
    };

    return (
        <>
            <BaseStepModal
                title={
                    mode === "edit"
                        ? "Alterar Assistência Técnica"
                        : "Nova Assistência Técnica"
                }
                subtitle="Preencha os dados do cliente, equipamento e acompanhamento técnico."
                onClose={onClose}
                onSubmit={handleSubmit}
                steps={steps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
                footer={
                    <Footer>
                        <Actions>
                            <StepActionButton
                                $variant="secondary"
                                type="button"
                                onClick={onClose}
                            >
                                Cancelar
                            </StepActionButton>
                            {currentStep > 0 ? (
                                <StepActionButton
                                    $variant="secondary"
                                    type="button"
                                    onClick={() =>
                                        setCurrentStep((current) => current - 1)
                                    }
                                >
                                    Voltar
                                </StepActionButton>
                            ) : null}
                            {!isLastStep ? (
                                <StepActionButton
                                    type="button"
                                    onClick={() =>
                                        setCurrentStep((current) => current + 1)
                                    }
                                >
                                    Próximo passo
                                </StepActionButton>
                            ) : (
                                <StepActionButton
                                    type="submit"
                                    disabled={isDisabled}
                                >
                                    {mode === "edit"
                                        ? "Salvar alterações"
                                        : "Criar Assistência Técnica"}
                                </StepActionButton>
                            )}
                        </Actions>
                    </Footer>
                }
            >
                {renderStep()}
            </BaseStepModal>

            <ModalAddClientes
                show={showClienteModal}
                onClose={() => setShowClienteModal(false)}
                onSubmit={handleClienteSubmit}
            />
        </>
    );
};
