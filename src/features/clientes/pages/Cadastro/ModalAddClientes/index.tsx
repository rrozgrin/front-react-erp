import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchReceitaWs } from "../../../../../services/receitaWs";
import { fetchViaCep } from "../../../../../services/viaCep";
import {
    formatCep,
    formatCpfOrCnpj,
    formatPhone,
    onlyDigits,
} from "../../../../../utils/brasil";
import {} from "../../../../../common/components/BaseStepModal/styled";
import type { Cliente, TipoPessoa } from "../../../types/Cliente";
import {
    buildClienteFormState,
    clienteFormToPayload,
    getClienteCompleteSteps,
    initialClienteState,
    type LookupState,
} from "./formConfig";
import { ModalFooterActions } from "../../../../../common/components/BaseStepModal/components/ModalFooterActions";
import { BaseStepModal } from "../../../../../common/components/BaseStepModal";
import { ImageUploadGrid } from "../../../../../common/components/ImageUploadGrid";
import { ClienteDadosPessoaisStep } from "./ClienteDadosPessoaisStep";
import { ClienteComplementarySections } from "./useClienteComplementarySections";

interface ModalAddClientesProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: Cliente) => void;
    initialData?: Cliente;
    mode?: "create" | "edit";
}

export const ModalAddClientes: React.FC<ModalAddClientesProps> = ({
    show,
    onClose,
    onSubmit,
    initialData,
    mode = "create",
}) => {
    const [formData, setFormData] = useState<Cliente>(initialClienteState);
    const [isCompleteMode, setIsCompleteMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [cnpjLookupState, setCnpjLookupState] = useState<LookupState>("idle");
    const [cepLookupState, setCepLookupState] = useState<LookupState>("idle");
    const [cnpjMessage, setCnpjMessage] = useState("");
    const [cepMessage, setCepMessage] = useState("");
    const [clienteFotos, setClienteFotos] = useState<string[]>([]);
    const lastFetchedCnpjRef = useRef("");
    const lastFetchedCepRef = useRef("");
    const lastCepSourceRef = useRef("");
    const lastCnpjSourceRef = useRef("");

    useEffect(() => {
        if (!show) {
            return;
        }

        setFormData(buildClienteFormState(initialData));
        setClienteFotos(initialData?.fotos ?? []);

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
    }, [initialData, show, onClose]);

    const completeSteps = useMemo(
        () => getClienteCompleteSteps(formData.tipoPessoa),
        [formData.tipoPessoa],
    );
    const activeStep = completeSteps[currentStep];
    useEffect(() => {
        if (!isCompleteMode) {
            setCurrentStep(0);
            return;
        }

        if (currentStep > completeSteps.length - 1) {
            setCurrentStep(completeSteps.length - 1);
        }
    }, [completeSteps, currentStep, isCompleteMode]);

    const isDisabled = useMemo(() => {
        const displayName =
            formData.tipoPessoa === "j"
                ? formData.razao_social ||
                  formData.nome ||
                  formData.nome_fantasia ||
                  ""
                : formData.nome;

        return !displayName.trim() || !formData.telefone?.trim();
    }, [
        formData.nome,
        formData.nome_fantasia,
        formData.razao_social,
        formData.telefone,
        formData.tipoPessoa,
    ]);

    const resetState = () => {
        setFormData(initialClienteState);
        setIsCompleteMode(false);
        setCurrentStep(0);
        setCnpjLookupState("idle");
        setCepLookupState("idle");
        setCnpjMessage("");
        setCepMessage("");
        setClienteFotos([]);
        lastFetchedCnpjRef.current = "";
        lastFetchedCepRef.current = "";
        lastCepSourceRef.current = "";
        lastCnpjSourceRef.current = "";
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleChange = (field: keyof Cliente, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === "cep") {
            const nextCepDigits = onlyDigits(value);

            if (
                lastFetchedCepRef.current &&
                lastFetchedCepRef.current !== nextCepDigits
            ) {
                lastFetchedCepRef.current = "";
                lastCepSourceRef.current = "";
                setCepLookupState("idle");
                setCepMessage("");
            }
        }
    };

    const handleReferenciaChange = (
        index: number,
        field: "nome" | "telefone" | "relacao",
        value: string,
    ) => {
        setFormData((prev) => {
            const novasReferencias = [...(prev.referencia || [])];

            novasReferencias[index] = {
                ...novasReferencias[index],
                [field]: value,
            };

            return {
                ...prev,
                referencia: novasReferencias,
            };
        });
    };

    const handleTrabalhoChange = (
        index: number,
        field: "empresa" | "cargo" | "renda" | "telefone" | "endereco",
        value: string,
    ) => {
        setFormData((prev) => {
            const novosTrabalhos = [...(prev.trabalho || [])];
            novosTrabalhos[index] = {
                ...novosTrabalhos[index],
                [field]: value,
            };
            return {
                ...prev,
                trabalho: novosTrabalhos,
            };
        });
    };

    const handleContatoChange = (
        index: number,
        field: "nome" | "telefone" | "email" | "fax" | "celular",
        value: string,
    ) => {
        setFormData((prev) => {
            const novosContatos = [...(prev.contato || [])];
            novosContatos[index] = {
                ...novosContatos[index],
                [field]: value,
            };
            return {
                ...prev,
                contato: novosContatos,
            };
        });
    };

    const handleTipoPessoaChange = (tipoPessoa: TipoPessoa) => {
        setFormData((prev) => ({
            ...prev,
            tipoPessoa,
            documento: "",
        }));
        setCnpjLookupState("idle");
        setCnpjMessage("");
        lastFetchedCnpjRef.current = "";
        lastCnpjSourceRef.current = "";
        setCurrentStep(0);
    };

    const applyReceitaWsData = async () => {
        const rawDocumento = onlyDigits(formData.documento ?? "");

        if (formData.tipoPessoa !== "j" || rawDocumento.length !== 14) {
            return;
        }

        try {
            setCnpjLookupState("loading");
            setCnpjMessage("Consultando ReceitaWS...");

            const data = await fetchReceitaWs(rawDocumento);
            const formattedDocumento = formatCpfOrCnpj(rawDocumento);
            const atividadePrincipal =
                data.atividade_principal ||
                data.raw?.atividade_principal?.[0]?.text ||
                "";
            const telefone = data.telefone || data.raw?.telefone || "";
            const email = data.email || data.raw?.email || "";
            const cep = data.cep || data.raw?.cep || "";
            const logradouro = data.logradouro || data.raw?.logradouro || "";
            const numero = data.numero || data.raw?.numero || "";
            const complemento = data.complemento || data.raw?.complemento || "";
            const bairro = data.bairro || data.raw?.bairro || "";
            const cidade = data.cidade || data.raw?.municipio || "";
            const estado = data.uf || data.raw?.uf || "";
            const socioPrincipal = data.qsa?.[0] || data.raw?.qsa?.[0];
            const observacoesReceita = [
                data.situacao || data.raw?.situacao,
                data.abertura || data.raw?.abertura,
                atividadePrincipal,
                socioPrincipal?.nome
                    ? `Responsavel: ${socioPrincipal.nome}`
                    : "",
            ]
                .filter(Boolean)
                .join(" | ");

            setFormData((prev) => ({
                ...prev,
                nome:
                    prev.nome === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? data.razao_social || data.raw?.nome || ""
                        : prev.nome,
                razao_social:
                    prev.razao_social === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? data.razao_social || data.raw?.nome || ""
                        : prev.razao_social,
                nome_fantasia:
                    prev.nome_fantasia === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? data.nome_fantasia || data.raw?.fantasia || ""
                        : prev.nome_fantasia,
                email:
                    prev.email === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? email
                        : prev.email,
                telefone:
                    prev.telefone === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? formatPhone(telefone)
                        : prev.telefone,
                segmento:
                    prev.segmento === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? atividadePrincipal
                        : prev.segmento,
                endereco:
                    prev.endereco === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? logradouro
                        : prev.endereco,
                numero:
                    prev.numero === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? numero
                        : prev.numero,
                complemento:
                    prev.complemento === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? complemento
                        : prev.complemento,
                bairro:
                    prev.bairro === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? bairro
                        : prev.bairro,
                cidade:
                    prev.cidade === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? cidade
                        : prev.cidade,
                estado:
                    prev.estado === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? estado
                        : prev.estado,
                cep:
                    prev.cep === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? formatCep(cep)
                        : prev.cep,
                dataFundacao:
                    prev.dataFundacao === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? data.abertura || data.raw?.abertura || ""
                        : prev.dataFundacao,
                observacoes:
                    prev.observacoes === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? observacoesReceita
                        : prev.observacoes,
                infoAdicionais: {
                    ...prev.infoAdicionais,
                },
            }));

            setCnpjLookupState("success");
            setCnpjMessage("Dados do CNPJ preenchidos com sucesso.");
            lastFetchedCnpjRef.current = rawDocumento;
            lastCnpjSourceRef.current = formattedDocumento;

            if (cep && onlyDigits(formData.cep ?? "").length !== 8) {
                setTimeout(() => {
                    void applyViaCepData(formatCep(cep));
                }, 0);
            }
        } catch (error) {
            setCnpjLookupState("error");
            setCnpjMessage(
                error instanceof Error
                    ? error.message
                    : "Falha ao consultar o ReceitaWS.",
            );
            lastFetchedCnpjRef.current = rawDocumento;
        }
    };

    const applyViaCepData = async (cepParam?: string) => {
        const cepDigits = onlyDigits(cepParam ?? formData.cep ?? "");

        if (cepDigits.length !== 8) {
            return;
        }

        try {
            setCepLookupState("loading");
            setCepMessage("Consultando ViaCEP...");

            const data = await fetchViaCep(cepDigits);

            setFormData((prev) => ({
                ...prev,
                cep: formatCep(data.cep || cepDigits),
                endereco:
                    prev.endereco === "" ||
                    lastCepSourceRef.current === prev.cep
                        ? data.logradouro || ""
                        : prev.endereco,
                complemento:
                    prev.complemento === "" ||
                    lastCepSourceRef.current === prev.cep
                        ? data.complemento || ""
                        : prev.complemento,
                bairro:
                    prev.bairro === "" || lastCepSourceRef.current === prev.cep
                        ? data.bairro || ""
                        : prev.bairro,
                cidade:
                    prev.cidade === "" || lastCepSourceRef.current === prev.cep
                        ? data.localidade || ""
                        : prev.cidade,
                estado:
                    prev.estado === "" || lastCepSourceRef.current === prev.cep
                        ? data.uf || ""
                        : prev.estado,
            }));

            setCepLookupState("success");
            setCepMessage("Endereço preenchido a partir do CEP.");
            lastFetchedCepRef.current = cepDigits;
            lastCepSourceRef.current = formatCep(data.cep || cepDigits);
        } catch (error) {
            setCepLookupState("error");
            setCepMessage(
                error instanceof Error
                    ? error.message
                    : "Falha ao consultar o ViaCEP.",
            );
            lastFetchedCepRef.current = cepDigits;
        }
    };

    useEffect(() => {
        const documentoDigits = onlyDigits(formData.documento ?? "");

        if (formData.tipoPessoa !== "j") {
            return;
        }

        if (documentoDigits.length !== 14) {
            if (
                lastFetchedCnpjRef.current &&
                lastFetchedCnpjRef.current !== documentoDigits
            ) {
                lastFetchedCnpjRef.current = "";
            }
            return;
        }

        if (
            lastFetchedCnpjRef.current === documentoDigits ||
            cnpjLookupState === "loading"
        ) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            void applyReceitaWsData();
        }, 300);

        return () => window.clearTimeout(timeoutId);
    }, [formData.documento, formData.tipoPessoa, cnpjLookupState]);

    useEffect(() => {
        const cepDigits = onlyDigits(formData.cep ?? "");

        if (cepDigits.length !== 8) {
            if (
                lastFetchedCepRef.current &&
                lastFetchedCepRef.current !== cepDigits
            ) {
                lastFetchedCepRef.current = "";
            }
            return;
        }

        if (
            lastFetchedCepRef.current === cepDigits ||
            cepLookupState === "loading"
        ) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            void applyViaCepData();
        }, 300);

        return () => window.clearTimeout(timeoutId);
    }, [formData.cep, cepLookupState]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isDisabled) {
            return;
        }

        onSubmit(clienteFormToPayload(formData, clienteFotos));

        resetState();
        onClose();
    };

    const renderDadosPessoaisStep = () => (
        <ClienteDadosPessoaisStep
            formData={formData}
            isCompleteMode={isCompleteMode}
            lastFetchedCnpjRef={lastFetchedCnpjRef}
            lastCnpjSourceRef={lastCnpjSourceRef}
            cnpjLookupState={cnpjLookupState}
            cnpjMessage={cnpjMessage}
            cepLookupState={cepLookupState}
            cepMessage={cepMessage}
            onChange={handleChange}
            onTipoPessoaChange={handleTipoPessoaChange}
            onResetCnpjLookup={() => {
                setCnpjLookupState("idle");
                setCnpjMessage("");
            }}
        />
    );
    const renderQuickMode = () => renderDadosPessoaisStep();

    const renderCompleteStep = () => {
        switch (activeStep?.id) {
            case "dados":
                return renderDadosPessoaisStep();
            case "socios":
            case "referencia":
            case "trabalho":
            case "contato":
            case "veiculo":
            case "informacoes":
                return <ClienteComplementarySections activeStep={activeStep.id} formData={formData} setFormData={setFormData} handleChange={handleChange} handleReferenciaChange={handleReferenciaChange} handleTrabalhoChange={handleTrabalhoChange} handleContatoChange={handleContatoChange} />;
            default:
                return null;
        }
    };

    if (!show) {
        return null;
    }

    return (
        <BaseStepModal
            title={mode === "edit" ? "Alterar cliente" : "Adicionar cliente"}
            onClose={handleClose}
            onSubmit={handleSubmit}
            steps={completeSteps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            showSteps={isCompleteMode}
            afterContent={
                isCompleteMode && (
                    <ImageUploadGrid
                        id="cliente-foto"
                        label="Adicionar foto"
                        addLabel="Adicionar foto"
                        viewerTitle="Foto do cliente"
                        value={clienteFotos}
                        onChange={setClienteFotos}
                    />
                )
            }
            footer={
                <ModalFooterActions
                    currentStep={currentStep}
                    isCompleteMode={isCompleteMode}
                    isDisabled={isDisabled}
                    totalSteps={completeSteps.length}
                    onClose={handleClose}
                    onNextStep={() => setCurrentStep((prev) => prev + 1)}
                    onPreviousStep={() => setCurrentStep((prev) => prev - 1)}
                    onToggleMode={() => {
                        setIsCompleteMode((prev) => !prev);
                        setCurrentStep(0);
                    }}
                    submitLabel={mode === "edit" ? "Salvar" : "Salvar"}
                    completeModeLabel={
                        mode === "edit"
                            ? "Alteracao completa"
                            : "Cadastro completo"
                    }
                    quickModeLabel={
                        mode === "edit" ? "Alteracao rapida" : "Cadastro rápido"
                    }
                />
            }
        >
            {isCompleteMode ? renderCompleteStep() : renderQuickMode()}
        </BaseStepModal>
    );
};
