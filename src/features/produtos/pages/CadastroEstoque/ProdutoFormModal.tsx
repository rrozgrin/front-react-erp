import React from "react";
import { ModalFooterActions } from "../../../../common/components/BaseStepModal/components/ModalFooterActions";
import { BaseStepModal } from "../../../../common/components/BaseStepModal";
import {
    Field,
    FieldsGrid,
    InputShell,
    Label,
    Select,
    Textarea,
} from "../../../../common/components/BaseStepModal/styled";
import {
    type ProdutoFormData,
    type SimNao,
    type TipoCorreiro,
} from "../../types/Produto";
import { Botao } from "../../../../common/components/Buttons/Botao";
import { ImageUploadGrid } from "../../../../common/components/ImageUploadGrid";
import { SegmentedControl } from "../../../../common/components/SegmentedControl";
import { Input } from "../../../../common/components/Ui";
import { FaPlus } from "react-icons/fa";
import { ProdutoMarketplaceSettingsModal } from "./ProdutoMarketplaceSettingsModal";
import {
    FullWidthField,
    Hint,
    InlineActions,
    SearchableMultiSelect,
    Stack,
    Tag,
    TagList,
    TagRemove,
} from "./ProdutoFormComponents";
import {
    classificacaoOptions,
    fornecedorOptions,
    produtoCadastroSteps,
} from "./produtoFormConfig";
import { useProdutoForm } from "./useProdutoForm";

interface ModalAddProdutosProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: ProdutoFormData) => void;
    initialData?: ProdutoFormData;
    mode?: "create" | "edit";
}

export const ModalAddProdutos: React.FC<ModalAddProdutosProps> = ({
    show,
    onClose,
    onSubmit,
    initialData,
    mode = "create",
}) => {
    const {
        formData, isDisabled, isCompleteMode, setIsCompleteMode, currentStep, setCurrentStep,
        marketplaceSettingsOpen, setMarketplaceSettingsOpen, videoInput, setVideoInput,
        caracteristica, setCaracteristica, loteDraft, setLoteDraft, handleClose, handleFieldChange,
        handleNestedChange, handleCurrencyPriceChange, addListItem, removeListItem, addCaracteristica,
        removeCaracteristica, addLote, removeLote, handleSubmit,
    } = useProdutoForm({ show, mode, initialData, onClose, onSubmit });

    if (!show) return null;

    const activeStep = produtoCadastroSteps[currentStep]?.id;
    const yesNoOptions = [
        { value: "S", label: "Sim" },
        { value: "N", label: "Nao" },
    ];
    return (
        <BaseStepModal
            title={
                mode === "edit" ? "Alterar produto" : "Cadastrar novo produto"
            }
            onClose={handleClose}
            onSubmit={handleSubmit}
            steps={produtoCadastroSteps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            closeOnBackdrop={false}
            headerInsideForm
            footer={
                <ModalFooterActions
                    currentStep={currentStep}
                    isCompleteMode={isCompleteMode}
                    isDisabled={isDisabled}
                    totalSteps={produtoCadastroSteps.length}
                    onClose={handleClose}
                    onNextStep={() =>
                        setCurrentStep((prev) =>
                            Math.min(prev + 1, produtoCadastroSteps.length - 1),
                        )
                    }
                    onPreviousStep={() =>
                        setCurrentStep((prev) => Math.max(prev - 1, 0))
                    }
                    onToggleMode={() => setIsCompleteMode((prev) => !prev)}
                    submitLabel={mode === "edit" ? "Salvar" : "Cadastrar"}
                    completeModeLabel="Cadastro completo"
                    quickModeLabel="Cadastro rápido"
                />
            }
            dialogs={
                <ProdutoMarketplaceSettingsModal
                    open={marketplaceSettingsOpen}
                    onClose={() => setMarketplaceSettingsOpen(false)}
                    formData={formData}
                    videoInput={videoInput}
                    onVideoInputChange={setVideoInput}
                    onFieldChange={handleFieldChange}
                    onAddVideo={() => {
                        addListItem("linksVideo", videoInput);
                        setVideoInput("");
                    }}
                    onRemoveVideo={(index) =>
                        removeListItem("linksVideo", index)
                    }
                />
            }
        >
            {activeStep === "dados" && (
                <Stack>
                    <FieldsGrid $columns={4}>
                        <FullWidthField>
                            <Label>Fornecedor(es)</Label>
                            <SearchableMultiSelect
                                options={fornecedorOptions}
                                value={formData.fornecedores}
                                onChange={(value) =>
                                    handleFieldChange("fornecedores", value)
                                }
                                placeholder="Pesquise e selecione fornecedores"
                                emptyMessage="Nenhum fornecedor disponível"
                            />
                        </FullWidthField>

                        <FullWidthField>
                            <Label>Classificação(ões)</Label>
                            <SearchableMultiSelect
                                options={classificacaoOptions}
                                value={formData.classificacoes}
                                onChange={(value) =>
                                    handleFieldChange("classificacoes", value)
                                }
                                placeholder="Pesquise e selecione classificações"
                                emptyMessage="Nenhuma classificação disponível"
                            />
                        </FullWidthField>

                        <Field $span={2}>
                            <Label>Marca</Label>
                            <InputShell>
                                <Input
                                    value={formData.marca}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "marca",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field $span={2}>
                            <Label>Código de barras</Label>
                            <InputShell>
                                <Input
                                    value={formData.codigoBarras}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "codigoBarras",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Qtde. dígitos etiqueta</Label>
                            <InputShell>
                                <Input
                                    value={formData.quantidadeDigitosEtiqueta}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "quantidadeDigitosEtiqueta",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field $span={2}>
                            <Label>Código interno</Label>
                            <InputShell>
                                <Input
                                    value={formData.codigoInterno}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "codigoInterno",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>EAN</Label>
                            <InputShell>
                                <Input
                                    value={formData.ean}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "ean",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <FullWidthField>
                            <Label>Nome do produto</Label>
                            <InputShell>
                                <Input
                                    value={formData.nome}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "nome",
                                            event.target.value,
                                        )
                                    }
                                    maxLength={120}
                                />
                            </InputShell>
                        </FullWidthField>

                        <FullWidthField>
                            <Label>Características e valores</Label>
                            <InlineActions>
                                <InputShell>
                                    <Input
                                        value={caracteristica.atributo}
                                        onChange={(event) =>
                                            setCaracteristica((prev) => ({
                                                ...prev,
                                                atributo: event.target.value,
                                            }))
                                        }
                                        placeholder="Caracteristica"
                                    />
                                </InputShell>
                                <InputShell>
                                    <Input
                                        value={caracteristica.valor}
                                        onChange={(event) =>
                                            setCaracteristica((prev) => ({
                                                ...prev,
                                                valor: event.target.value,
                                            }))
                                        }
                                        placeholder="Valor"
                                    />
                                </InputShell>
                                <Botao
                                    nome="Adicionar"
                                    color="add"
                                    action={addCaracteristica}
                                    icone={<FaPlus />}
                                />
                            </InlineActions>
                            <TagList>
                                {formData.caracteristicas.map((item, index) => (
                                    <Tag key={`caracteristica-${index}`}>
                                        {item.atributo}: {item.valor}
                                        <TagRemove
                                            type="button"
                                            onClick={() =>
                                                removeCaracteristica(index)
                                            }
                                        >
                                            x
                                        </TagRemove>
                                    </Tag>
                                ))}
                            </TagList>
                        </FullWidthField>

                        <Field>
                            <Label>Cor</Label>
                            <InputShell>
                                <Input
                                    value={formData.cor}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "cor",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Tamanho</Label>
                            <InputShell>
                                <Input
                                    value={formData.tamanho}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "tamanho",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Lote</Label>
                            <InputShell>
                                <Input
                                    value={formData.lote}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "lote",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Data fabricação</Label>
                            <InputShell>
                                <Input
                                    type="date"
                                    value={formData.dataFabricacao}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "dataFabricacao",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Data validade</Label>
                            <InputShell>
                                <Input
                                    type="date"
                                    value={formData.dataValidade}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "dataValidade",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field $span={2}>
                            <Label>Condicao</Label>
                            <Select
                                value={formData.condicao}
                                onChange={(event) =>
                                    handleFieldChange(
                                        "condicao",
                                        event.target.value,
                                    )
                                }
                            >
                                <option value="nao-se-aplica">
                                    Não se aplica
                                </option>
                                <option value="novo">Novo</option>
                                <option value="usado">Usado</option>
                                <option value="seminovo">Seminovo</option>
                            </Select>
                        </Field>
                        <Field $span={2}>
                            <Label>Genero</Label>
                            <Select
                                value={formData.genero}
                                onChange={(event) =>
                                    handleFieldChange(
                                        "genero",
                                        event.target.value,
                                    )
                                }
                            >
                                <option value="nao-se-aplica">
                                    Não se aplica
                                </option>
                                <option value="feminino">Feminino</option>
                                <option value="masculino">Masculino</option>
                                <option value="outros">Outros</option>
                            </Select>
                        </Field>
                        <Field $span={2}>
                            <Label>Grupo de idade</Label>
                            <Select
                                value={formData.grupoIdade}
                                onChange={(event) =>
                                    handleFieldChange(
                                        "grupoIdade",
                                        event.target.value,
                                    )
                                }
                            >
                                <option value="nao-se-aplica">
                                    Não se aplica
                                </option>
                                <option value="recem-nascido">
                                    Recem nascido
                                </option>
                                <option value="infantil">Infantil</option>
                                <option value="adolescente">Adolescente</option>
                                <option value="adulto">Adulto</option>
                            </Select>
                        </Field>
                        <Field>
                            <Label>Peso do produto (kg)</Label>
                            <InputShell>
                                <Input
                                    value={formData.peso}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "peso",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Unidade</Label>
                            <InputShell>
                                <Input
                                    value={formData.unidade}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "unidade",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field $span={2}>
                            <Label>Unidade tributária</Label>
                            <InputShell>
                                <Input
                                    value={formData.unidadeTributaria}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "unidadeTributaria",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field $span={2}>
                            <Label>Localizacao</Label>
                            <InputShell>
                                <Input
                                    value={formData.localizacao}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "localizacao",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field $span={2}>
                            <Label>Fabricante</Label>
                            <InputShell>
                                <Input
                                    value={formData.fabricante}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "fabricante",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Estoque mínimo</Label>
                            <InputShell>
                                <Input
                                    type="number"
                                    value={formData.estoqueMinimo}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "estoqueMinimo",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field $span={2}>
                            <Label>Saldo inicial do estoque</Label>
                            <InputShell>
                                <Input
                                    type="number"
                                    value={formData.estoqueInicial}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "estoqueInicial",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field $span={2}>
                            <Label>Origem do produto</Label>
                            <InputShell>
                                <Input
                                    value={formData.origemProduto}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "origemProduto",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Edição</Label>
                            <InputShell>
                                <Input
                                    value={formData.edicao}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "edicao",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <FullWidthField>
                            <Label>Descrição detalhada</Label>
                            <Textarea
                                value={formData.descricaoDetalhada}
                                onChange={(event) =>
                                    handleFieldChange(
                                        "descricaoDetalhada",
                                        event.target.value,
                                    )
                                }
                            />
                        </FullWidthField>

                        <FullWidthField>
                            <Botao
                                nome="Configurações Marketplaces"
                                variant="secondary"
                                action={() => setMarketplaceSettingsOpen(true)}
                            />
                        </FullWidthField>

                        <FullWidthField>
                            <Label>Controle de lote e validade</Label>
                            <FieldsGrid $columns={4}>
                                <Field>
                                    <Label>Número do lote</Label>
                                    <InputShell>
                                        <Input
                                            value={loteDraft.numero}
                                            onChange={(event) =>
                                                setLoteDraft((prev) => ({
                                                    ...prev,
                                                    numero: event.target.value,
                                                }))
                                            }
                                        />
                                    </InputShell>
                                </Field>
                                <Field>
                                    <Label>Quantidade</Label>
                                    <InputShell>
                                        <Input
                                            value={loteDraft.quantidade}
                                            onChange={(event) =>
                                                setLoteDraft((prev) => ({
                                                    ...prev,
                                                    quantidade:
                                                        event.target.value,
                                                }))
                                            }
                                        />
                                    </InputShell>
                                </Field>
                                <Field>
                                    <Label>Data fabricação</Label>
                                    <InputShell>
                                        <Input
                                            type="date"
                                            value={loteDraft.fabricacao}
                                            onChange={(event) =>
                                                setLoteDraft((prev) => ({
                                                    ...prev,
                                                    fabricacao:
                                                        event.target.value,
                                                }))
                                            }
                                        />
                                    </InputShell>
                                </Field>
                                <Field>
                                    <Label>Data validade</Label>
                                    <InputShell>
                                        <Input
                                            type="date"
                                            value={loteDraft.validade}
                                            onChange={(event) =>
                                                setLoteDraft((prev) => ({
                                                    ...prev,
                                                    validade:
                                                        event.target.value,
                                                }))
                                            }
                                        />
                                    </InputShell>
                                </Field>
                            </FieldsGrid>
                            <InlineActions>
                                <Botao
                                    nome="Adicionar lote"
                                    color="add"
                                    action={addLote}
                                    icone={<FaPlus />}
                                />
                            </InlineActions>
                            <TagList>
                                {formData.lotesControle.map((item, index) => (
                                    <Tag key={`lote-${index}`}>
                                        {item.numero} / {item.quantidade}
                                        <TagRemove
                                            type="button"
                                            onClick={() => removeLote(index)}
                                        >
                                            x
                                        </TagRemove>
                                    </Tag>
                                ))}
                            </TagList>
                        </FullWidthField>
                    </FieldsGrid>
                </Stack>
            )}

            {activeStep === "nutricional" && (
                <Stack>
                    <Field>
                        <Label>Possui informações nutricionais?</Label>
                        <SegmentedControl
                            ariaLabel="Possui informacoes nutricionais"
                            value={
                                formData.informacoesNutricionais
                                    .possuiInformacaoNutricional
                            }
                            onChange={(value) =>
                                handleNestedChange(
                                    "informacoesNutricionais",
                                    "possuiInformacaoNutricional",
                                    value as SimNao,
                                )
                            }
                            options={yesNoOptions}
                        />
                    </Field>
                    <FieldsGrid $columns={5}>
                        <Field>
                            <Label>Validade (dias)</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais
                                            .validadeDias
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "validadeDias",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Porção</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais.porcao
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "porcao",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Calorias</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais
                                            .calorias
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "calorias",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Carboidratos</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais
                                            .carboidratos
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "carboidratos",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Proteínas</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais
                                            .proteinas
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "proteinas",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Gorduras totais</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais
                                            .gordurasTotais
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "gordurasTotais",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Gorduras saturadas</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais
                                            .gordurasSaturadas
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "gordurasSaturadas",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Colesterol</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais
                                            .colesterol
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "colesterol",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Gorduras trans</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais
                                            .gordurasTrans
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "gordurasTrans",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Fibra</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais.fibra
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "fibra",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Cálcio</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais.calcio
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "calcio",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Ferro</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais.ferro
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "ferro",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Sódio</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesNutricionais.sodio
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesNutricionais",
                                            "sodio",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                    </FieldsGrid>
                </Stack>
            )}

            {activeStep === "fiscal" && (
                <Stack>
                    <FieldsGrid $columns={5}>
                        <Field>
                            <Label>NCM</Label>
                            <InputShell>
                                <Input
                                    value={formData.informacoesFiscais.ncm}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "ncm",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Imposto nota</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesFiscais.impostoNota
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "impostoNota",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>CEST</Label>
                            <InputShell>
                                <Input
                                    value={formData.informacoesFiscais.cest}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "cest",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Código ANP</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesFiscais.codigoAnp
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "codigoAnp",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>CFOP</Label>
                            <InputShell>
                                <Input
                                    value={formData.informacoesFiscais.cfop}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "cfop",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>CSOSN</Label>
                            <InputShell>
                                <Input
                                    value={formData.informacoesFiscais.csosn}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "csosn",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>CST ICMS</Label>
                            <InputShell>
                                <Input
                                    value={formData.informacoesFiscais.cstIcms}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "cstIcms",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>CST PIS</Label>
                            <InputShell>
                                <Input
                                    value={formData.informacoesFiscais.cstPis}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "cstPis",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>CST COFINS</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesFiscais.cstCofins
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "cstCofins",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>CST IPI</Label>
                            <InputShell>
                                <Input
                                    value={formData.informacoesFiscais.cstIpi}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "cstIpi",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Origem fiscal</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesFiscais.origemFiscal
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "origemFiscal",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Alíquota ICMS</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesFiscais.aliquotaIcms
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "aliquotaIcms",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Alíquota PIS</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesFiscais.aliquotaPis
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "aliquotaPis",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Alíquota COFINS</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesFiscais
                                            .aliquotaCofins
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "aliquotaCofins",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Alíquota IPI</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.informacoesFiscais.aliquotaIpi
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "informacoesFiscais",
                                            "aliquotaIpi",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <FullWidthField>
                            <Label>Observações fiscais</Label>
                            <Textarea
                                value={
                                    formData.informacoesFiscais
                                        .observacoesFiscais
                                }
                                onChange={(event) =>
                                    handleNestedChange(
                                        "informacoesFiscais",
                                        "observacoesFiscais",
                                        event.target.value,
                                    )
                                }
                            />
                        </FullWidthField>
                    </FieldsGrid>
                </Stack>
            )}

            {activeStep === "precos" && (
                <Stack>
                    <FieldsGrid $columns={4}>
                        <Field>
                            <Label>Preço de custo</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={formData.precos.precoCusto}
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "precoCusto",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Preço varejo</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={formData.precos.precoVarejo}
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "precoVarejo",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Preço atacado</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={formData.precos.precoAtacado}
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "precoAtacado",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Margem lucro percentual</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.precos.margemLucroPercentual
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "precos",
                                            "margemLucroPercentual",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Margem lucro valor</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={formData.precos.margemLucroValor}
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "margemLucroValor",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Margem atacado percentual</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.precos.margemAtacadoPercentual
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "precos",
                                            "margemAtacadoPercentual",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Margem atacado valor</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={formData.precos.margemAtacadoValor}
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "margemAtacadoValor",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Desconto máximo percentual</Label>
                            <InputShell>
                                <Input
                                    value={
                                        formData.precos.descontoMaximoPercentual
                                    }
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "precos",
                                            "descontoMaximoPercentual",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Desconto máximo valor</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={formData.precos.descontoMaximoValor}
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "descontoMaximoValor",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Preço varejo ecommerce</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={formData.precos.precoVarejoEcommerce}
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "precoVarejoEcommerce",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Preço atacado ecommerce</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={
                                        formData.precos.precoAtacadoEcommerce
                                    }
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "precoAtacadoEcommerce",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Preço iFood</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={formData.precos.precoIfood}
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "precoIfood",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Preço iFood Mercado</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={formData.precos.precoIfoodMercado}
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "precoIfoodMercado",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Preço Shopee</Label>
                            <InputShell>
                                <Input
                                    inputMode="numeric"
                                    value={formData.precos.precoShopee}
                                    onChange={(event) =>
                                        handleCurrencyPriceChange(
                                            "precoShopee",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <FullWidthField>
                            <Label>Observações de preço</Label>
                            <Textarea
                                value={formData.precos.observacoesPreco}
                                onChange={(event) =>
                                    handleNestedChange(
                                        "precos",
                                        "observacoesPreco",
                                        event.target.value,
                                    )
                                }
                            />
                        </FullWidthField>
                    </FieldsGrid>
                </Stack>
            )}

            {activeStep === "frete" && (
                <Stack>
                    <Field>
                        <SegmentedControl
                            ariaLabel="Tipo de frete"
                            value={formData.frete.tipoCorreio}
                            onChange={(value) =>
                                handleNestedChange(
                                    "frete",
                                    "tipoCorreio",
                                    value as TipoCorreiro,
                                )
                            }
                            options={[
                                { value: "pac", label: "PAC" },
                                { value: "sedex", label: "Sedex" },
                                { value: "jadlog", label: "Jadlog" },
                                { value: "jamef", label: "Jamef" },
                            ]}
                        />
                    </Field>
                    <FieldsGrid $columns={5}>
                        <Field>
                            <Label>Peso bruto</Label>
                            <InputShell>
                                <Input
                                    value={formData.frete.pesoBruto}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "frete",
                                            "pesoBruto",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Peso líquido</Label>
                            <InputShell>
                                <Input
                                    value={formData.frete.pesoLiquido}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "frete",
                                            "pesoLiquido",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Altura</Label>
                            <InputShell>
                                <Input
                                    type="number"
                                    value={formData.frete.altura}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "frete",
                                            "altura",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Largura</Label>
                            <InputShell>
                                <Input
                                    type="number"
                                    value={formData.frete.largura}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "frete",
                                            "largura",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                        <Field>
                            <Label>Comprimento</Label>
                            <InputShell>
                                <Input
                                    type="number"
                                    value={formData.frete.comprimento}
                                    onChange={(event) =>
                                        handleNestedChange(
                                            "frete",
                                            "comprimento",
                                            event.target.value,
                                        )
                                    }
                                />
                            </InputShell>
                        </Field>
                    </FieldsGrid>
                    <Hint>
                        Baseado no passo 5 do legado para cálculo de frete, com
                        pesos e dimensões do produto/caixa.
                    </Hint>
                </Stack>
            )}

            <ImageUploadGrid
                id="produto-imagens"
                label="Adicionar imagem"
                addLabel="Adicionar imagem"
                viewerTitle="Imagem do produto"
                value={formData.imagens}
                onChange={(value) => handleFieldChange("imagens", value)}
            />
        </BaseStepModal>
    );
};
