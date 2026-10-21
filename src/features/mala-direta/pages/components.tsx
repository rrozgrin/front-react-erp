import {
    FaBoxOpen,
    FaChartLine,
    FaCog,
    FaEye,
    FaRegEnvelope,
    FaTags,
    FaUsers,
} from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { Radio } from "../../../common/components/Ui";
import {
    ActionCardsGrid,
    BenefitList,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    ComputerArt,
    EnvelopeArt,
    FieldLabel,
    FieldStack,
    FormGrid,
    FormRow,
    HeaderIcon,
    HighlightCard,
    HintText,
    IllustrationStage,
    InfoCallout,
    InfoIntro,
    InfoSection,
    InlineOptions,
    InstructionsBody,
    LabelCell,
    LabelGrid,
    LabelSheetArt,
    Magnifier,
    MiniCircleIcon,
    NumberWithUnit,
    OrderCardBody,
    OrderCardTitle,
    Paragraph,
    PositionField,
    PositionGrid,
    PrimaryActionButton,
    RadioLabel,
    RequestButton,
    SectionIcon,
    SectionTitle,
    SheetNumber,
    TextInput,
    WarningText,
} from "./styled";

export type SearchMode = "cep" | "rua";
export type LabelFormat = "pimaco" | "outro";
export type PersonType = "fisica" | "juridica" | "ambos";

interface RadioOption<T extends string> {
    label: string;
    value: T;
}

interface RadioGroupProps<T extends string> {
    name: string;
    options: RadioOption<T>[];
    value: T;
    onChange: (value: T) => void;
}

const RadioGroup = <T extends string>({
    name,
    options,
    value,
    onChange,
}: RadioGroupProps<T>) => (
    <InlineOptions>
        {options.map((option) => (
            <RadioLabel key={option.value}>
                <Radio
                    name={name}
                    checked={value === option.value}
                    onChange={() => onChange(option.value)}
                />
                <span>{option.label}</span>
            </RadioLabel>
        ))}
    </InlineOptions>
);

interface SearchNewClientsCardProps {
    searchMode: SearchMode;
    onSearchModeChange: (mode: SearchMode) => void;
    labelFormat: LabelFormat;
    onLabelFormatChange: (format: LabelFormat) => void;
    personType: PersonType;
    onPersonTypeChange: (type: PersonType) => void;
}

export const SearchNewClientsCard = ({
    searchMode,
    onSearchModeChange,
    labelFormat,
    onLabelFormatChange,
    personType,
    onPersonTypeChange,
}: SearchNewClientsCardProps) => (
    <Card>
        <CardHeader>
            <HeaderIcon>
                <FaUsers size={18} />
            </HeaderIcon>
            <CardTitle>Localizar Novos Clientes</CardTitle>
        </CardHeader>

        <CardBody>
            <FormGrid onSubmit={(event) => event.preventDefault()}>
                <FormRow>
                    <FieldLabel>Buscar por:</FieldLabel>
                    <RadioGroup
                        name="buscar-por"
                        value={searchMode}
                        onChange={onSearchModeChange}
                        options={[
                            { label: "CEP", value: "cep" },
                            { label: "Rua", value: "rua" },
                        ]}
                    />
                </FormRow>

                <FormRow>
                    <FieldLabel>
                        {searchMode === "cep"
                            ? "Informar o CEP:"
                            : "Informar a Rua:"}
                    </FieldLabel>
                    <FieldStack>
                        <TextInput
                            placeholder={
                                searchMode === "cep"
                                    ? "Digite o CEP"
                                    : "Digite a rua"
                            }
                        />
                    </FieldStack>
                </FormRow>

                <FormRow>
                    <FieldLabel>Qtde de Etiquetas:</FieldLabel>
                    <FieldStack>
                        <TextInput
                            type="number"
                            min="1"
                            placeholder="Informe a quantidade de etiquetas"
                        />
                        <HintText>
                            Valor: R$ 0,14 por cliente encontrado
                        </HintText>
                    </FieldStack>
                </FormRow>

                <FormRow>
                    <FieldLabel>Formato:</FieldLabel>
                    <RadioGroup
                        name="formato"
                        value={labelFormat}
                        onChange={onLabelFormatChange}
                        options={[
                            {
                                label: "Etiqueta PIMACO 3 Colunas (6180-Carta)",
                                value: "pimaco",
                            },
                            { label: "Outro formato", value: "outro" },
                        ]}
                    />
                </FormRow>

                <FormRow>
                    <FieldLabel>Tipo de pessoa:</FieldLabel>
                    <RadioGroup
                        name="tipo-pessoa"
                        value={personType}
                        onChange={onPersonTypeChange}
                        options={[
                            { label: "Fisica", value: "fisica" },
                            { label: "Juridica", value: "juridica" },
                            { label: "Ambos", value: "ambos" },
                        ]}
                    />
                </FormRow>

                <FormRow>
                    <FieldLabel>Posicao da Impressao:</FieldLabel>
                    <PositionGrid>
                        <PositionField>
                            Horizontal (X):
                            <NumberWithUnit>
                                <TextInput type="number" defaultValue="0" />
                                <span>mm (Valor positivo e negativo)</span>
                            </NumberWithUnit>
                        </PositionField>

                        <PositionField>
                            Vertical (Y):
                            <NumberWithUnit>
                                <TextInput type="number" defaultValue="0" />
                                <span>mm (Valor positivo e negativo)</span>
                            </NumberWithUnit>
                        </PositionField>
                    </PositionGrid>
                </FormRow>

                <PrimaryActionButton type="submit">
                    <FaEye size={14} />
                    <span>Visualizar as Etiquetas para Impressao</span>
                </PrimaryActionButton>
            </FormGrid>
        </CardBody>
    </Card>
);

export const NewClientsHowToCard = () => (
    <Card>
        <CardHeader>
            <HeaderIcon>
                <FaUsers size={18} />
            </HeaderIcon>
            <CardTitle>Como Conseguir Novos Clientes</CardTitle>
        </CardHeader>

        <CardBody>
            <InfoIntro>
                Entregaremos na sua mao em 5 SEGUNDOS todos os futuros clientes
                da sua RUA, ou VARIAS RUAS, ou tambem todos os futuros clientes
                do seu BAIRRO. Ou somente PESSOAS FISICAS ou PESSOAS JURIDICAS,
                voce escolhe:
            </InfoIntro>

            <InfoSection>
                <SectionIcon>
                    <FaCog />
                </SectionIcon>
                <div>
                    <SectionTitle>Como funciona?</SectionTitle>
                    <Paragraph>
                        Voce imprime a ETIQUETA ADESIVA PIMACO 3 COLUNAS (Codigo
                        Pimaco 6180) com o NOME, ENDERECO e CEP para colar em um
                        envelope que nos da Web Control Empresas fornecemos
                        abaixo. Depois envie dentro dele seu panfleto ou
                        proposta de produtos e servicos para uma rua, varias
                        ruas, seu bairro ou qualquer bairro.
                    </Paragraph>
                </div>
            </InfoSection>

            <InfoSection>
                <SectionIcon>
                    <FaChartLine />
                </SectionIcon>
                <div>
                    <SectionTitle>Quais serao os beneficios?</SectionTitle>
                    <BenefitList>
                        <li>Ser melhor e mais rapido que seus concorrentes</li>
                        <li>Atrair muitos novos clientes.</li>
                        <li>Crescimento do Faturamento.</li>
                        <li>Aumento nos Lucros.</li>
                    </BenefitList>
                </div>
            </InfoSection>

            <InfoCallout>NAO PERCA TEMPO E AUMENTE A SUA CLIENTELA</InfoCallout>
        </CardBody>
    </Card>
);

const LabelSheetPreview = () => (
    <LabelSheetArt>
        <LabelGrid>
            {Array.from({ length: 30 }, (_, index) => (
                <LabelCell key={index} />
            ))}
        </LabelGrid>
        <SheetNumber>30</SheetNumber>
    </LabelSheetArt>
);

interface OrderSupplyCardProps {
    type: "envelope" | "labels";
}

export const OrderSupplyCard = ({ type }: OrderSupplyCardProps) => {
    const isEnvelope = type === "envelope";
    const tone = isEnvelope ? "green" : "purple";

    return (
        <Card>
            <OrderCardBody>
                <OrderCardTitle>
                    <MiniCircleIcon $tone={tone}>
                        {isEnvelope ? (
                            <FaRegEnvelope size={15} />
                        ) : (
                            <FaTags size={15} />
                        )}
                    </MiniCircleIcon>
                    <span>
                        {isEnvelope ? (
                            <>
                                Envelope para envio de{" "}
                                <strong>MALA DIRETA.</strong>
                            </>
                        ) : (
                            <>
                                Cartela de <b>ETIQUETAS</b> para Envelope de{" "}
                                <b>MALA DIRETA.</b>
                            </>
                        )}
                    </span>
                </OrderCardTitle>

                <IllustrationStage>
                    {isEnvelope ? <EnvelopeArt /> : <LabelSheetPreview />}
                </IllustrationStage>

                <RequestButton type="button" $tone={tone}>
                    {isEnvelope ? (
                        <FaBoxOpen size={16} />
                    ) : (
                        <FaTags size={14} />
                    )}
                    <span>
                        {isEnvelope
                            ? "Clique aqui pra Solicitar Envelope"
                            : "Clique aqui pra Solicitar Etiquetas"}
                    </span>
                </RequestButton>
            </OrderCardBody>
        </Card>
    );
};

export const SuppliesCards = () => (
    <ActionCardsGrid>
        <OrderSupplyCard type="envelope" />
        <OrderSupplyCard type="labels" />
    </ActionCardsGrid>
);

export const UsageInstructionsCard = () => (
    <HighlightCard $tone="orange">
        <CardHeader $tone="orange">
            <HeaderIcon $tone="orange">
                <FiAlertTriangle size={22} />
            </HeaderIcon>
            <CardTitle>Instrucoes de Uso</CardTitle>
        </CardHeader>

        <InstructionsBody>
            <ComputerArt>
                <Magnifier />
            </ComputerArt>

            <WarningText>
                Atencao: Clique no botao LOCALIZAR AGORA ou tecla ENTER{" "}
                <strong>apenas uma vez</strong> e aguarde a resposta. Cada vez
                que voce clicar no botao LOCALIZAR AGORA ou pressionar a tecla
                ENTER uma nova consulta sera feita e cobrada no seu extrato,
                mesmo que a resposta da consulta anterior ainda nao tenha
                retornado.
            </WarningText>
        </InstructionsBody>
    </HighlightCard>
);
