import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaCaretRight, FaCheckCircle, FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import { Checkbox, Input, Radio } from '../../../../common/components/Ui';
import type { ConsultationPageConfig, ConsultationService } from './types';
import {
    CheckboxRow,
    CheckAmountLine,
    CheckBankInfo,
    CheckCmc7Preview,
    CheckField,
    CheckFormBody,
    CheckFieldsGrid,
    CheckFormLayout,
    CheckFormSection,
    CheckMetaGrid,
    CheckPayLine,
    CheckPreview,
    CheckPreviewField,
    CheckPreviewInput,
    CheckSideFields,
    CheckSideRow,
    CheckTopGrid,
    CompactInput,
    CompactSelect,
    ConsultationRoot,
    DetailGrid,
    FieldRow,
    Footnote,
    Form,
    HeaderPrice,
    HeroIcon,
    HeroPanel,
    HeroText,
    Hint,
    InfoItem,
    InfoList,
    InfoPanel,
    InlineOptions,
    NeighborBox,
    OptionLine,
    OptionsBox,
    Panel,
    PanelBody,
    PanelHeader,
    RadioLabel,
    SectionTitle,
    ServiceBadge,
    ServiceCard,
    ServiceDescription,
    ServiceGrid,
    ServiceHeader,
    ServicePrice,
    ServiceTitle,
    SplitInputs,
    SubmitButton,
    UtilityLinks,
    ValueRow,
    VehicleField,
    VehicleFields,
    VehicleFormBody,
    VehicleOptionLine,
    VehicleOptionsBox,
    VehicleOptionsTitle,
    WarningIcon,
    WarningPanel,
    WarningText,
    NoticeItem,
    NoticeList,
    NoticePanel,
} from './styled';

interface ConsultationPageProps {
    config: ConsultationPageConfig;
}

const instructionText = (
    <>
        Clique em REALIZAR CONSULTA ou pressione ENTER <strong>apenas uma vez</strong> e aguarde a resposta.
        Cada nova tentativa envia outra consulta e pode ser cobrada no extrato, mesmo que a resposta anterior ainda não tenha retornado.
    </>
);

const today = '25/06/2026';

interface CheckFormData {
    comp: string;
    banco: string;
    agencia: string;
    c1: string;
    conta: string;
    c2: string;
    cheque: string;
    c3: string;
    valor: string;
    dataVencimento: string;
    documento: string;
    rg: string;
    cmc71: string;
    cmc72: string;
    cmc73: string;
    tipoVenda: string;
    dddTelefone: string;
    celular: string;
    comercial: string;
    referencia1: string;
    referencia2: string;
}

const initialCheckFormData: CheckFormData = {
    comp: '',
    banco: '',
    agencia: '',
    c1: '',
    conta: '',
    c2: '',
    cheque: '',
    c3: '',
    valor: '',
    dataVencimento: today,
    documento: '',
    rg: '',
    cmc71: '',
    cmc72: '',
    cmc73: '',
    tipoVenda: '',
    dddTelefone: '',
    celular: '',
    comercial: '',
    referencia1: '',
    referencia2: '',
};

type CheckFieldName = keyof CheckFormData;

const ConsultationServiceSelector = ({
    services,
    selectedId,
    onSelect,
}: {
    services: ConsultationService[];
    selectedId: string;
    onSelect: (id: string) => void;
}) => (
    <ServiceGrid>
        {services.map((service) => (
            <ServiceCard
                key={service.id}
                type="button"
                aria-pressed={service.id === selectedId}
                $selected={service.id === selectedId}
                $featured={service.featured}
                onClick={() => onSelect(service.id)}
            >
                <ServiceHeader>
                    <ServiceTitle>
                        <strong>{service.name}</strong>
                        <small>{service.subtitle}</small>
                    </ServiceTitle>
                    <ServicePrice>{service.price}</ServicePrice>
                </ServiceHeader>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceBadge>{service.badge}</ServiceBadge>
            </ServiceCard>
        ))}
    </ServiceGrid>
);

const SearchModeGroup = () => (
    <InlineOptions>
        {['Nome', 'CPF / CNPJ', 'Telefone'].map((label) => (
            <RadioLabel key={label}>
                <Radio name="buscar-por" defaultChecked={label === 'CPF / CNPJ'} />
                <span>{label}</span>
            </RadioLabel>
        ))}
    </InlineOptions>
);

const NeighborSearchBox = () => (
    <NeighborBox>
        <strong>Pesquisar também o endereço, telefone e vizinhos?</strong>
        <Hint>(Pesquisa Localiza Max agregada cobrada conforme tabela)</Hint>
        <InlineOptions>
            <RadioLabel>
                <Radio name="pesquisar-vizinhos" />
                <span>Sim</span>
            </RadioLabel>
            <RadioLabel>
                <Radio name="pesquisar-vizinhos" defaultChecked />
                <span>Não</span>
            </RadioLabel>
        </InlineOptions>
    </NeighborBox>
);

const LocalizaForm = ({
    service,
    firstInputRef,
}: {
    service: ConsultationService;
    firstInputRef: React.Ref<HTMLInputElement>;
}) => (
    <Form onSubmit={(event) => event.preventDefault()}>
        <FieldRow as="div">
            <span>Buscar por:</span>
            <SearchModeGroup />
        </FieldRow>

        <FieldRow>
            <span>CPF / CNPJ:</span>
            <CompactInput ref={firstInputRef} />
        </FieldRow>

        <ValueRow>
            <span>Valor da Consulta:</span>
            <strong>{service.price}</strong>
        </ValueRow>

        <SubmitButton type="submit">
            <FaSearch size={16} />
            <span>Realizar Consulta</span>
        </SubmitButton>
    </Form>
);

const Cmc7Fields = () => (
    <FieldRow as="div">
        <CheckboxRow>
            <Checkbox />
            <span>CMC7</span>
        </CheckboxRow>
        <div>
            <SplitInputs>
                <CompactInput aria-label="CMC7 bloco 1" />
                <CompactInput aria-label="CMC7 bloco 2" />
                <CompactInput aria-label="CMC7 bloco 3" />
            </SplitInputs>
            <Hint>(somente para cheques)</Hint>
        </div>
    </FieldRow>
);

const defaultPhoneFields = ['Residencial', 'Celular', 'Comercial', 'Referência Pessoal 1', 'Referência Pessoal 2'];

const ConfirmationPhones = ({ service }: { service: ConsultationService }) => {
    const phoneFields = service.phoneFields ?? defaultPhoneFields;

    if (!phoneFields.length) {
        return null;
    }

    return (
        <>
            {service.showConfirmationTitle !== false ? <SectionTitle>Telefones para Confirmação</SectionTitle> : null}
            {phoneFields.map((field) => (
                <FieldRow key={field}>
                    <span>{field}:</span>
                    <CompactInput />
                </FieldRow>
            ))}
        </>
    );
};

const AdditionalOptions = ({ service }: { service: ConsultationService }) => {
    if (!service.additionalOptions?.length) {
        return null;
    }

    return (
        <OptionsBox>
            <strong>Opções Adicionais (Tarifados à Parte)</strong>
            {service.additionalOptions.map((option) => (
                <OptionLine key={option.label}>
                    <Checkbox />
                    <span>{option.label}</span>
                    <strong>{option.price}</strong>
                </OptionLine>
            ))}
        </OptionsBox>
    );
};

const CreditForm = ({
    service,
    firstInputRef,
}: {
    service: ConsultationService;
    firstInputRef: React.Ref<HTMLInputElement>;
}) => (
    <Form onSubmit={(event) => event.preventDefault()}>
        <FieldRow>
            <span>{service.documentLabel}:</span>
            <CompactInput ref={firstInputRef} />
        </FieldRow>
        {service.showRg !== false ? (
            <FieldRow>
                <span>RG:</span>
                <CompactInput />
            </FieldRow>
        ) : null}
        <FieldRow>
            <span>Vencimento:</span>
            <CompactInput defaultValue={today} />
        </FieldRow>
        <FieldRow>
            <span>Valor da Venda:</span>
            <CompactInput />
        </FieldRow>
        <FieldRow>
            <span>Tipo Venda:</span>
            <CompactSelect defaultValue="">
                <option value="" disabled>Escolha uma Opção</option>
                <option>À vista</option>
                <option>Parcelada</option>
                <option>Cheque</option>
                <option>Cartão</option>
            </CompactSelect>
        </FieldRow>
        <FieldRow as="div">
            <span>No. Parcelas:</span>
            <span>à vista</span>
        </FieldRow>

        {service.allowsCmc7 ? <Cmc7Fields /> : null}

        <ConfirmationPhones service={service} />
        <AdditionalOptions service={service} />
        {service.showNeighborSearch !== false ? <NeighborSearchBox /> : null}

        <SubmitButton type="submit">
            <FaSearch size={16} />
            <span>Realizar Consulta</span>
        </SubmitButton>
    </Form>
);

const CheckPreviewControl = ({
    label,
    name,
    data,
    onChange,
    inputRef,
}: {
    label: string;
    name: CheckFieldName;
    data: CheckFormData;
    onChange: (name: CheckFieldName, value: string) => void;
    inputRef?: React.Ref<HTMLInputElement>;
}) => (
    <CheckPreviewInput
        aria-label={label}
        ref={inputRef}
        value={data[name]}
        onChange={(event) => onChange(name, event.target.value)}
    />
);

const CheckPreviewCard = ({
    data,
    onChange,
    firstInputRef,
}: {
    data: CheckFormData;
    onChange: (name: CheckFieldName, value: string) => void;
    firstInputRef: React.Ref<HTMLInputElement>;
}) => (
    <CheckPreview aria-label="Prévia do cheque preenchida pelos campos abaixo">
        <CheckTopGrid>
            <CheckPreviewField>
                <span>Comp</span>
                <CheckPreviewControl label="Comp" name="comp" data={data} onChange={onChange} inputRef={firstInputRef} />
            </CheckPreviewField>
            <CheckPreviewField>
                <span>Banco</span>
                <CheckPreviewControl label="Banco" name="banco" data={data} onChange={onChange} />
            </CheckPreviewField>
            <CheckPreviewField>
                <span>Agência</span>
                <CheckPreviewControl label="Agência" name="agencia" data={data} onChange={onChange} />
            </CheckPreviewField>
            <CheckPreviewField>
                <span>C1</span>
                <CheckPreviewControl label="C1" name="c1" data={data} onChange={onChange} />
            </CheckPreviewField>
            <CheckPreviewField>
                <span>Número da Conta</span>
                <CheckPreviewControl label="Número da Conta" name="conta" data={data} onChange={onChange} />
            </CheckPreviewField>
            <CheckPreviewField>
                <span>C2</span>
                <CheckPreviewControl label="C2" name="c2" data={data} onChange={onChange} />
            </CheckPreviewField>
            <CheckPreviewField>
                <span>Número do Cheque</span>
                <CheckPreviewControl label="Número do Cheque" name="cheque" data={data} onChange={onChange} />
            </CheckPreviewField>
            <CheckPreviewField>
                <span>C3</span>
                <CheckPreviewControl label="C3" name="c3" data={data} onChange={onChange} />
            </CheckPreviewField>
            <CheckPreviewField>
                <span>R$</span>
                <CheckPreviewControl label="Valor em reais" name="valor" data={data} onChange={onChange} />
            </CheckPreviewField>
        </CheckTopGrid>

        <CheckAmountLine>
            <CheckPayLine>
                Pague por este cheque a quantia de
                <Input
                    aria-label="Quantia do cheque"
                    value={data.valor}
                    onChange={(event) => onChange('valor', event.target.value)}
                />
            </CheckPayLine>
            <CheckPayLine>
                e centavos acima
                <Input
                    aria-label="Complemento do valor"
                    value={data.valor}
                    onChange={(event) => onChange('valor', event.target.value)}
                />
            </CheckPayLine>
        </CheckAmountLine>

        <CheckMetaGrid>
            <CheckBankInfo>
                NOME DO BANCO<br />
                ENDEREÇO DO BANCO<br />
                CIDADE - ESTADO
            </CheckBankInfo>

            <CheckSideFields>
                <CheckSideRow>
                    <span>Data Venc.:</span>
                    <Input
                        aria-label="Data de vencimento"
                        value={data.dataVencimento}
                        onChange={(event) => onChange('dataVencimento', event.target.value)}
                    />
                </CheckSideRow>
                <CheckSideRow>
                    <span>CPF/CNPJ:</span>
                    <Input
                        aria-label="CPF/CNPJ"
                        value={data.documento}
                        onChange={(event) => onChange('documento', event.target.value)}
                    />
                </CheckSideRow>
                <CheckSideRow>
                    <span>RG:</span>
                    <Input
                        aria-label="RG"
                        value={data.rg}
                        onChange={(event) => onChange('rg', event.target.value)}
                    />
                </CheckSideRow>
            </CheckSideFields>
        </CheckMetaGrid>

        <CheckCmc7Preview>
            <span>CMC7</span>
            <Input
                aria-label="CMC7 bloco 1"
                value={data.cmc71}
                onChange={(event) => onChange('cmc71', event.target.value)}
            />
            <Input
                aria-label="CMC7 bloco 2"
                value={data.cmc72}
                onChange={(event) => onChange('cmc72', event.target.value)}
            />
            <Input
                aria-label="CMC7 bloco 3"
                value={data.cmc73}
                onChange={(event) => onChange('cmc73', event.target.value)}
            />
        </CheckCmc7Preview>
    </CheckPreview>
);

const CheckInput = ({
    label,
    name,
    data,
    onChange,
    inputRef,
}: {
    label: string;
    name: CheckFieldName;
    data: CheckFormData;
    onChange: (name: CheckFieldName, value: string) => void;
    inputRef?: React.Ref<HTMLInputElement>;
}) => (
    <CheckField>
        <span>{label}</span>
        <CompactInput
            ref={inputRef}
            value={data[name]}
            onChange={(event) => onChange(name, event.target.value)}
        />
    </CheckField>
);

const CheckForm = ({
    service,
    firstInputRef,
}: {
    service: ConsultationService;
    firstInputRef: React.Ref<HTMLInputElement>;
}) => {
    const [data, setData] = useState<CheckFormData>(initialCheckFormData);

    const handleChange = useCallback((name: CheckFieldName, value: string) => {
        setData((current) => ({
            ...current,
            [name]: value,
        }));
    }, []);

    return (
        <CheckFormLayout>
            <CheckPreviewCard data={data} onChange={handleChange} firstInputRef={firstInputRef} />

            <CheckFormBody onSubmit={(event) => event.preventDefault()}>
                <CheckFormSection>
                    <CheckFieldsGrid>
                        <CheckInput label="Comp" name="comp" data={data} onChange={handleChange} />
                        <CheckInput label="Banco" name="banco" data={data} onChange={handleChange} />
                        <CheckInput label="Agência" name="agencia" data={data} onChange={handleChange} />
                        <CheckInput label="C1" name="c1" data={data} onChange={handleChange} />
                        <CheckInput label="Número da Conta" name="conta" data={data} onChange={handleChange} />
                        <CheckInput label="C2" name="c2" data={data} onChange={handleChange} />
                        <CheckInput label="Número do Cheque" name="cheque" data={data} onChange={handleChange} />
                        <CheckInput label="C3" name="c3" data={data} onChange={handleChange} />
                        <CheckInput label="R$" name="valor" data={data} onChange={handleChange} />
                    </CheckFieldsGrid>
                </CheckFormSection>

                <CheckFormSection>
                    <CheckFieldsGrid>
                        <CheckInput label="Data Venc." name="dataVencimento" data={data} onChange={handleChange} />
                        <CheckInput label={service.documentLabel} name="documento" data={data} onChange={handleChange} />
                        <CheckInput label="RG" name="rg" data={data} onChange={handleChange} />
                        <CheckInput label="CMC7 - Bloco 1" name="cmc71" data={data} onChange={handleChange} />
                        <CheckInput label="CMC7 - Bloco 2" name="cmc72" data={data} onChange={handleChange} />
                        <CheckInput label="CMC7 - Bloco 3" name="cmc73" data={data} onChange={handleChange} />
                    </CheckFieldsGrid>
                </CheckFormSection>

                <CheckFormSection>
                    <FieldRow>
                        <span>Tipo Venda:</span>
                        <CompactSelect
                            value={data.tipoVenda}
                            onChange={(event) => handleChange('tipoVenda', event.target.value)}
                        >
                            <option value="" disabled>Escolha uma Opção</option>
                            <option>À vista</option>
                            <option>Parcelada</option>
                            <option>Cheque</option>
                        </CompactSelect>
                    </FieldRow>
                    <FieldRow as="div">
                        <span>No. Parcelas:</span>
                        <span>à vista</span>
                    </FieldRow>
                    <CheckFieldsGrid>
                        <CheckInput label="DDD/Telefone" name="dddTelefone" data={data} onChange={handleChange} />
                        <CheckInput label="Celular" name="celular" data={data} onChange={handleChange} />
                        <CheckInput label="Comercial" name="comercial" data={data} onChange={handleChange} />
                        <CheckInput label="Referência Pessoal 1" name="referencia1" data={data} onChange={handleChange} />
                        <CheckInput label="Referência Pessoal 2" name="referencia2" data={data} onChange={handleChange} />
                    </CheckFieldsGrid>
                </CheckFormSection>

                <AdditionalOptions service={service} />
                <NeighborSearchBox />

                <SubmitButton type="submit">
                    <FaSearch size={16} />
                    <span>Realizar Consulta</span>
                </SubmitButton>
            </CheckFormBody>
        </CheckFormLayout>
    );
};

const VehicleForm = ({
    service,
    firstInputRef,
}: {
    service: ConsultationService;
    firstInputRef: React.Ref<HTMLInputElement>;
}) => {
    const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});

    const handleToggleOption = useCallback((label: string, checked: boolean) => {
        setSelectedOptions((current) => ({
            ...current,
            [label]: checked,
        }));
    }, []);

    return (
        <VehicleFormBody onSubmit={(event) => event.preventDefault()}>
            <VehicleFields>
                <VehicleField>
                    <span>Número do CRLV:</span>
                    <CompactInput ref={firstInputRef} />
                </VehicleField>
                <VehicleField>
                    <span>Chassi:</span>
                    <CompactInput />
                </VehicleField>
                <VehicleField>
                    <span>Motor:</span>
                    <CompactInput />
                </VehicleField>
                <VehicleField>
                    <span>Renavam:</span>
                    <CompactInput />
                </VehicleField>
                <VehicleField>
                    <span>Placa:</span>
                    <CompactInput />
                </VehicleField>
            </VehicleFields>

            <VehicleOptionsBox>
                <VehicleOptionsTitle>Selecione as opções desejadas:</VehicleOptionsTitle>
                {service.additionalOptions?.map((option) => (
                    <VehicleOptionLine key={option.label}>
                        <Input
                            type="checkbox"
                            checked={Boolean(selectedOptions[option.label])}
                            onChange={(event) => handleToggleOption(option.label, event.target.checked)}
                        />
                        <span>{option.label}</span>
                        <strong>{option.price}</strong>
                    </VehicleOptionLine>
                ))}
            </VehicleOptionsBox>

            <SubmitButton type="submit">
                <FaSearch size={16} />
                <span>Realizar Consulta</span>
            </SubmitButton>
        </VehicleFormBody>
    );
};

const ConsultationFormPanel = ({
    service,
    panelRef,
    firstInputRef,
}: {
    service: ConsultationService;
    panelRef: React.Ref<HTMLElement>;
    firstInputRef: React.Ref<HTMLInputElement>;
}) => (
    <Panel ref={panelRef}>
        <PanelHeader>
            <h3>Consulta {service.name}</h3>
            {service.price ? <HeaderPrice>{service.price}</HeaderPrice> : null}
        </PanelHeader>
        <PanelBody>
            {service.formKind === 'localiza' ? <LocalizaForm service={service} firstInputRef={firstInputRef} /> : null}
            {service.formKind === 'credit' ? <CreditForm service={service} firstInputRef={firstInputRef} /> : null}
            {service.formKind === 'check' ? <CheckForm service={service} firstInputRef={firstInputRef} /> : null}
            {service.formKind === 'vehicle' ? <VehicleForm service={service} firstInputRef={firstInputRef} /> : null}
        </PanelBody>
    </Panel>
);

const ConsultationNoticePanel = ({ service }: { service: ConsultationService }) => {
    if (!service.noticeTitle || !service.noticeItems?.length) {
        return null;
    }

    return (
        <NoticePanel>
            <PanelHeader>
                <h3>{service.noticeTitle}</h3>
            </PanelHeader>
            <PanelBody>
                <NoticeList>
                    {service.noticeItems.map((item) => (
                        <NoticeItem key={item}>
                            <FaCaretRight />
                            <span>{item}</span>
                        </NoticeItem>
                    ))}
                </NoticeList>
            </PanelBody>
        </NoticePanel>
    );
};

const ConsultationInfoPanel = ({ service }: { service: ConsultationService }) => (
    <InfoPanel>
        <PanelHeader>
            <h3>Dados Informados Nesta Consulta</h3>
        </PanelHeader>
        <PanelBody>
            <InfoList>
                {service.infoItems.map((item) => (
                    <InfoItem key={item}>
                        <FaCheckCircle />
                        <span>{item}</span>
                    </InfoItem>
                ))}
            </InfoList>
            {service.showInfoFootnote !== false ? <Footnote>(*) Dados não apresentados em todas as consultas</Footnote> : null}
        </PanelBody>
    </InfoPanel>
);

const UsageInstructions = () => (
    <WarningPanel>
        <WarningIcon>
            <FaExclamationTriangle />
        </WarningIcon>
        <WarningText>
            <h3>Instruções de Uso</h3>
            <p>{instructionText}</p>
        </WarningText>
    </WarningPanel>
);

export const ConsultationPage = ({ config }: ConsultationPageProps) => {
    const [selectedId, setSelectedId] = useState(config.defaultServiceId ?? '');
    const servicesRef = useRef<HTMLDivElement>(null);
    const formPanelRef = useRef<HTMLElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);
    const userSelectedService = useRef(false);
    const selectedService = config.services.find((service) => service.id === selectedId);

    const focusForm = useCallback(() => {
        formPanelRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        window.setTimeout(() => {
            firstInputRef.current?.focus({ preventScroll: true });
        }, 220);
    }, []);

    const handleSelectService = useCallback((id: string) => {
        userSelectedService.current = true;

        if (id === selectedId) {
            focusForm();
            return;
        }

        setSelectedId(id);
    }, [focusForm, selectedId]);

    const handleBackToServices = useCallback(() => {
        userSelectedService.current = false;
        setSelectedId('');

        servicesRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        window.setTimeout(() => {
            const firstCard = servicesRef.current?.querySelector<HTMLButtonElement>('button');
            firstCard?.focus({ preventScroll: true });
        }, 220);
    }, []);

    useEffect(() => {
        if (!userSelectedService.current) {
            return;
        }

        focusForm();
    }, [focusForm, selectedId]);

    return (
        <ConsultationRoot>
            <HeroPanel>
                <HeroText>
                    <h2>{config.heading}</h2>
                    <p>{config.description}</p>
                </HeroText>
                <HeroIcon>{config.icon}</HeroIcon>
            </HeroPanel>

            {!config.hideServiceSelector ? (
                <div ref={servicesRef}>
                    <ConsultationServiceSelector
                        services={config.services}
                        selectedId={selectedId}
                        onSelect={handleSelectService}
                    />
                </div>
            ) : null}

            {selectedService ? (
                <>
                    {!config.hideServiceSelector ? (
                        <UtilityLinks>
                            <button type="button" onClick={handleBackToServices}>
                                <FaArrowLeft size={12} />
                                {' '}Voltar
                            </button>
                            <span>|</span>
                            <button type="button">Relatório de Consultas</button>
                        </UtilityLinks>
                    ) : null}

                    <DetailGrid $wideForm={selectedService.formKind === 'check' || selectedService.formKind === 'vehicle'}>
                        <ConsultationFormPanel
                            service={selectedService}
                            panelRef={formPanelRef}
                            firstInputRef={firstInputRef}
                        />
                        <div>
                            <ConsultationNoticePanel service={selectedService} />
                            <ConsultationInfoPanel service={selectedService} />
                            <UsageInstructions />
                        </div>
                    </DetailGrid>
                </>
            ) : null}
        </ConsultationRoot>
    );
};
