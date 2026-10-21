import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchReceitaWs } from "../../../../services/receitaWs";
import { fetchViaCep } from "../../../../services/viaCep";
import type { Parceiro } from "../../types/Parceiro";
import {
    formatCep,
    formatCpfOrCnpj,
    formatPhone,
    onlyDigits,
} from "../../../../utils/brasil";
import { BaseStepModal } from "../../../../common/components/BaseStepModal";
import { ModalFooterActions } from "../../../../common/components/BaseStepModal/components/ModalFooterActions";
import {
    initialParceiroFormData,
    parceiroFormToPayload,
    parceiroSteps,
    type ContaBancariaItem,
    type FornecedorFormData,
    type LookupState,
} from "./parceiroFormConfig";
import { ParceiroFormSection } from "./useParceiroFormSections";

interface ModalCadastroParceiroProps<T extends Parceiro> {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: T) => void;
    titulo: string;
}

export const ModalCadastroParceiro = <T extends Parceiro>({
    show,
    onClose,
    onSubmit,
    titulo,
}: ModalCadastroParceiroProps<T>) => {
    const [formData, setFormData] = useState<FornecedorFormData>(
        initialParceiroFormData,
    );
    const [currentStep, setCurrentStep] = useState(0);
    const [cnpjLookupState, setCnpjLookupState] = useState<LookupState>("idle");
    const [cnpjMessage, setCnpjMessage] = useState("");
    const [cepLookupState, setCepLookupState] = useState<LookupState>("idle");
    const [cepMessage, setCepMessage] = useState("");
    const lastFetchedCnpjRef = useRef("");
    const lastCnpjSourceRef = useRef("");
    const lastFetchedCepRef = useRef("");
    const lastCepSourceRef = useRef("");

    useEffect(() => {
        if (!show) {
            return;
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [show]);

    const isDisabled = useMemo(() => {
        if (formData.tipoPessoa === "j") {
            return (
                !formData.razaoSocial.trim() ||
                onlyDigits(formData.documento).length !== 14
            );
        }

        if (formData.tipoPessoa === "e") {
            return !formData.nome.trim() || !formData.documento.trim();
        }

        return !formData.nome.trim() || onlyDigits(formData.cpf).length !== 11;
    }, [
        formData.cpf,
        formData.documento,
        formData.nome,
        formData.razaoSocial,
        formData.tipoPessoa,
    ]);

    const resetState = () => {
        setFormData(initialParceiroFormData);
        setCurrentStep(0);
        setCnpjLookupState("idle");
        setCnpjMessage("");
        setCepLookupState("idle");
        setCepMessage("");
        lastFetchedCnpjRef.current = "";
        lastCnpjSourceRef.current = "";
        lastFetchedCepRef.current = "";
        lastCepSourceRef.current = "";
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleChange = (field: keyof FornecedorFormData, value: string) => {
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

        if (field === "documento") {
            const nextDocDigits = onlyDigits(value);

            if (
                lastFetchedCnpjRef.current &&
                lastFetchedCnpjRef.current !== nextDocDigits
            ) {
                lastFetchedCnpjRef.current = "";
                lastCnpjSourceRef.current = "";
                setCnpjLookupState("idle");
                setCnpjMessage("");
            }
        }
    };

    const handleTipoPessoaChange = (
        tipoPessoa: FornecedorFormData["tipoPessoa"],
    ) => {
        setFormData((prev) => ({
            ...prev,
            tipoPessoa,
            documento: "",
            cpf: "",
            razaoSocial: tipoPessoa === "j" ? prev.razaoSocial : "",
            nomeFantasia: tipoPessoa === "j" ? prev.nomeFantasia : "",
            dataFundacao: tipoPessoa === "j" ? prev.dataFundacao : "",
            inscricaoMunicipal:
                tipoPessoa === "j" ? prev.inscricaoMunicipal : "",
            inscricaoEstadual: tipoPessoa === "j" ? prev.inscricaoEstadual : "",
        }));

        setCnpjLookupState("idle");
        setCnpjMessage("");
        lastFetchedCnpjRef.current = "";
        lastCnpjSourceRef.current = "";
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
            const telefone = data.telefone || data.raw?.telefone || "";
            const email = data.email || data.raw?.email || "";
            const cep = data.cep || data.raw?.cep || "";
            const logradouro = data.logradouro || data.raw?.logradouro || "";
            const numero = data.numero || data.raw?.numero || "";
            const complemento = data.complemento || data.raw?.complemento || "";
            const bairro = data.bairro || data.raw?.bairro || "";
            const cidade = data.cidade || data.raw?.municipio || "";
            const estado = data.uf || data.raw?.uf || "";

            setFormData((prev) => ({
                ...prev,
                razaoSocial:
                    prev.razaoSocial === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? data.razao_social || data.raw?.nome || ""
                        : prev.razaoSocial,
                nomeFantasia:
                    prev.nomeFantasia === "" ||
                    lastCnpjSourceRef.current === prev.documento
                        ? data.nome_fantasia || data.raw?.fantasia || ""
                        : prev.nomeFantasia,
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

    const handleProdutoChange = (index: number, value: string) => {
        setFormData((prev) => {
            const next = [...prev.produtos];
            next[index] = { nome: value };
            return { ...prev, produtos: next };
        });
    };

    const handleTransportadoraChange = (index: number, value: string) => {
        setFormData((prev) => {
            const next = [...prev.transportadoras];
            next[index] = { nome: value };
            return { ...prev, transportadoras: next };
        });
    };

    const handleContaChange = (
        index: number,
        field: keyof ContaBancariaItem,
        value: string,
    ) => {
        setFormData((prev) => {
            const next = [...prev.contasBancarias];
            next[index] = {
                ...next[index],
                [field]: value,
            };
            return { ...prev, contasBancarias: next };
        });
    };

    const handleObservacoesChange: React.ChangeEventHandler<
        HTMLTextAreaElement
    > = (event) => {
        handleChange("observacoes", event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isDisabled) {
            return;
        }

        onSubmit(parceiroFormToPayload(formData) as T);
        resetState();
        onClose();
    };

    const renderCurrentStep = () => {
        switch (parceiroSteps[currentStep]?.id) {
            case "dados":
            case "contato":
            case "endereco":
            case "produtos":
            case "bancarios":
            case "adicionais":
                return <ParceiroFormSection
                    activeStep={parceiroSteps[currentStep]?.id}
                    formData={formData}
                    setFormData={setFormData}
                    cnpjLookupState={cnpjLookupState}
                    cnpjMessage={cnpjMessage}
                    cepLookupState={cepLookupState}
                    cepMessage={cepMessage}
                    handleChange={handleChange}
                    handleTipoPessoaChange={handleTipoPessoaChange}
                    handleProdutoChange={handleProdutoChange}
                    handleTransportadoraChange={handleTransportadoraChange}
                    handleContaChange={handleContaChange}
                    handleObservacoesChange={handleObservacoesChange}
                />;
            default:
                return null;
        }
    };

    if (!show) {
        return null;
    }

    return (
        <BaseStepModal
            title={titulo}
            onClose={handleClose}
            onSubmit={handleSubmit}
            steps={parceiroSteps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            footer={
                <ModalFooterActions
                    currentStep={currentStep}
                    isCompleteMode
                    isDisabled={isDisabled}
                    totalSteps={parceiroSteps.length}
                    onClose={handleClose}
                    onNextStep={() => setCurrentStep((prev) => prev + 1)}
                    onPreviousStep={() => setCurrentStep((prev) => prev - 1)}
                />
            }
        >
            {renderCurrentStep()}
        </BaseStepModal>
    );
};
