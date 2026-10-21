import React, { useMemo, useState } from "react";
import {
    FiBarChart2,
    FiCheck,
    FiExternalLink,
    FiGrid,
    FiLink,
    FiSave,
    FiSliders,
} from "react-icons/fi";
import { Botao } from "../../../../common/components/Buttons/Botao";
import { PageLayout } from "../../../../common/components/PageLayout";
import { Checkbox, Radio } from "../../../../common/components/Ui";
import {
    catalogClassificationOptions,
    catalogFieldOptions,
    catalogGeneralOptions,
} from "./configuracaoCatalogoData";
import {
    CatalogFieldCard,
    CatalogInput,
    CatalogSelect,
    CatalogSettingsRoot,
    CatalogTextarea,
    ChoiceLabel,
    ContentGrid,
    FieldIcon,
    FieldsGrid,
    FieldStack,
    FooterActions,
    FormLabel,
    HelperLink,
    IconButton,
    InlineOptions,
    LinkInputWrap,
    OptionCard,
    OptionsGrid,
    OptionTitle,
    SectionHeader,
    SectionPanel,
    SideActions,
} from "./configuracaoCatalogoStyled";
type CatalogState = Record<string, string | string[]>;
function getInitialCatalogState(): CatalogState {
    return catalogGeneralOptions.reduce<CatalogState>((accumulator, option) => {
        if (option.kind === "checkboxes") {
            accumulator[option.id] = option.options
                .filter((item) => item.checked)
                .map((item) => item.value);
            return accumulator;
        }

        accumulator[option.id] =
            option.options.find((item) => item.checked)?.value ??
            option.options[0]?.value ??
            "";
        return accumulator;
    }, {});
}

const initialFieldState = catalogFieldOptions.reduce<Record<string, boolean>>(
    (accumulator, field) => {
        accumulator[field.id] = Boolean(field.checked);
        return accumulator;
    },
    {},
);

export const ConfiguracaoCatalogoPage: React.FC = () => {
    const [catalogState, setCatalogState] = useState<CatalogState>(() =>
        getInitialCatalogState(),
    );
    const [fieldState, setFieldState] =
        useState<Record<string, boolean>>(initialFieldState);
    const [classification, setClassification] = useState("");
    const [onlyVirtualProducts, setOnlyVirtualProducts] = useState("nao");
    const [catalogLink, setCatalogLink] = useState(
        "https://www.webcontrolempresas.com.br/testeloja",
    );
    const [notes, setNotes] = useState("");

    const selectedFieldsCount = useMemo(() => {
        return Object.values(fieldState).filter(Boolean).length;
    }, [fieldState]);

    const handleRadioChange = (optionId: string, value: string) => {
        setCatalogState((current) => ({
            ...current,
            [optionId]: value,
        }));
    };

    const handleCheckboxChange = (optionId: string, value: string) => {
        setCatalogState((current) => {
            const selectedValues = Array.isArray(current[optionId])
                ? (current[optionId] as string[])
                : [];
            const nextValues = selectedValues.includes(value)
                ? selectedValues.filter((item) => item !== value)
                : [...selectedValues, value];

            return {
                ...current,
                [optionId]: nextValues,
            };
        });
    };

    return (
        <PageLayout title="Relatórios de Estoque e Produto">
            <CatalogSettingsRoot>
                <ContentGrid>
                    <SectionPanel>
                        <SectionHeader>
                            <FiSliders />
                            <h3>Configurações gerais</h3>
                        </SectionHeader>

                        <OptionsGrid>
                            {catalogGeneralOptions.map((option) => (
                                <OptionCard key={option.id}>
                                    <OptionTitle>
                                        <strong>{option.title}</strong>
                                        <small>{option.description}</small>
                                    </OptionTitle>
                                    <InlineOptions>
                                        {option.options.map((item) => {
                                            const selectedValues =
                                                catalogState[option.id];
                                            const checked =
                                                option.kind === "checkboxes"
                                                    ? Array.isArray(
                                                          selectedValues,
                                                      ) &&
                                                      selectedValues.includes(
                                                          item.value,
                                                      )
                                                    : selectedValues ===
                                                      item.value;

                                            return (
                                                <ChoiceLabel
                                                    key={`${option.id}-${item.value}`}
                                                >
                                                    {option.kind ===
                                                    "checkboxes" ? (
                                                        <Checkbox
                                                            name={option.id}
                                                            checked={checked}
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    option.id,
                                                                    item.value,
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <Radio
                                                            name={option.id}
                                                            checked={checked}
                                                            onChange={() =>
                                                                handleRadioChange(
                                                                    option.id,
                                                                    item.value,
                                                                )
                                                            }
                                                        />
                                                    )}
                                                    <span>{item.label}</span>
                                                </ChoiceLabel>
                                            );
                                        })}
                                    </InlineOptions>
                                </OptionCard>
                            ))}
                        </OptionsGrid>

                        <FieldStack>
                            <FormLabel>
                                <span>Link do Seu Catálogo</span>
                                <LinkInputWrap>
                                    <CatalogInput
                                        value={catalogLink}
                                        onChange={(event) =>
                                            setCatalogLink(event.target.value)
                                        }
                                    />
                                    <IconButton
                                        type="button"
                                        title="Abrir catálogo em nova aba"
                                        aria-label="Abrir catálogo em nova aba"
                                        onClick={() =>
                                            window.open(
                                                catalogLink,
                                                "_blank",
                                                "noopener,noreferrer",
                                            )
                                        }
                                    >
                                        <FiExternalLink />
                                    </IconButton>
                                </LinkInputWrap>
                            </FormLabel>
                            <HelperLink
                                href={catalogLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Acessar Catálogo
                            </HelperLink>
                        </FieldStack>

                        <FormLabel>
                            <span>Observações</span>
                            <CatalogTextarea
                                value={notes}
                                onChange={(event) =>
                                    setNotes(event.target.value)
                                }
                                placeholder="Digite aqui suas observações (opcional)..."
                            />
                        </FormLabel>

                        <FooterActions>
                            <Botao
                                nome="Salvar Configurações"
                                variant="primary"
                                action={() => undefined}
                                icone={<FiSave />}
                            />
                        </FooterActions>
                    </SectionPanel>

                    <SectionPanel>
                        <SectionHeader>
                            <FiGrid />
                            <h3>Campos do Catálogo</h3>
                        </SectionHeader>

                        <FormLabel>
                            <span>Buscar por Classificação (Opcional)</span>
                            <CatalogSelect
                                value={classification}
                                onChange={(event) =>
                                    setClassification(event.target.value)
                                }
                            >
                                <option value="">
                                    Selecione uma classificação
                                </option>
                                {catalogClassificationOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </CatalogSelect>
                        </FormLabel>

                        <FieldStack>
                            <strong>Campos disponíveis</strong>
                            <FieldsGrid>
                                {catalogFieldOptions.map((field) => (
                                    <CatalogFieldCard key={field.id}>
                                        <Checkbox
                                            checked={fieldState[field.id]}
                                            onChange={() =>
                                                setFieldState((current) => ({
                                                    ...current,
                                                    [field.id]:
                                                        !current[field.id],
                                                }))
                                            }
                                        />
                                        <FieldIcon>{field.icon}</FieldIcon>
                                        <span>{field.label}</span>
                                    </CatalogFieldCard>
                                ))}
                            </FieldsGrid>
                        </FieldStack>

                        <OptionCard>
                            <OptionTitle>
                                <strong>
                                    Mostrar somente Produtos habilitados para
                                    loja virtual
                                </strong>
                                <small>
                                    {selectedFieldsCount} campo(s)
                                    selecionado(s) para compor o catálogo.
                                </small>
                            </OptionTitle>
                            <InlineOptions>
                                <ChoiceLabel>
                                    <Radio
                                        name="only-virtual-products"
                                        checked={onlyVirtualProducts === "sim"}
                                        onChange={() =>
                                            setOnlyVirtualProducts("sim")
                                        }
                                    />
                                    <span>Sim</span>
                                </ChoiceLabel>
                                <ChoiceLabel>
                                    <Radio
                                        name="only-virtual-products"
                                        checked={onlyVirtualProducts === "nao"}
                                        onChange={() =>
                                            setOnlyVirtualProducts("nao")
                                        }
                                    />
                                    <span>Não</span>
                                </ChoiceLabel>
                            </InlineOptions>
                        </OptionCard>

                        <SideActions>
                            <Botao
                                nome="Gerar Catálogo"
                                variant="primary"
                                action={() => undefined}
                                icone={<FiCheck />}
                            />
                            <Botao
                                nome="Pré-visualizar"
                                action={() => undefined}
                                icone={<FiLink />}
                            />
                            <Botao
                                nome="Relatório"
                                action={() => undefined}
                                icone={<FiBarChart2 />}
                            />
                        </SideActions>
                    </SectionPanel>
                </ContentGrid>
            </CatalogSettingsRoot>
        </PageLayout>
    );
};
