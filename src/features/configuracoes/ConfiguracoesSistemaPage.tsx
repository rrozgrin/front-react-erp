import React, {
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    FiBold,
    FiCheck,
    FiChevronRight,
    FiEye,
    FiImage,
    FiItalic,
    FiList,
    FiPrinter,
    FiSave,
    FiSettings,
    FiType,
    FiUploadCloud,
} from "react-icons/fi";
import { Botao } from "../../common/components/Buttons/Botao";
import { PageLayout } from "../../common/components/PageLayout";
import { Table, type TableField } from "../../common/components/Table";
import { Checkbox, Radio, StatusPill } from "../../common/components/Ui";
import { ThemeContext } from "../../context/ThemeContext";
import { themes } from "../../context/themes";
import {
    deletionCategories,
    deletionLogs,
    themeLabels,
    visibilityGroups,
    type DeletionLog,
    type ThemeKey,
} from "./configuracoesSistemaData";
import {
    CategoryList,
    CategoryOption,
    CenterCard,
    CheckboxGrid,
    CheckOption,
    ContentPanel,
    DeletionGrid,
    EditorFooter,
    EditorShell,
    EditorTextarea,
    EditorToolbar,
    EmptyRelated,
    FieldGroup,
    FieldGroupTitle,
    FileInput,
    GroupStack,
    InlineActions,
    LogoControls,
    LogoGrid,
    LogoPreview,
    MetricCard,
    MetricGrid,
    PaletteCard,
    PaletteGrid,
    PaletteTitle,
    RadioGroup,
    RadioOption,
    RelatedItemsPanel,
    SectionHeader,
    SettingsRoot,
    Swatch,
    SwatchBar,
    TabContent,
    TabButton,
    TabsBar,
    ToolbarButton,
} from "./styled";
type TabId = "logo" | "cores" | "dados" | "funcionarios" | "exclusao" | "cupom";

interface SettingsTab {
    id: TabId;
    label: string;
    icon: React.ReactNode;
}

const tabs: SettingsTab[] = [
    { id: "logo", label: "Mudar Logo", icon: <FiImage /> },
    { id: "cores", label: "Cores do Sistema", icon: <FiEye /> },
    { id: "dados", label: "Dados Visualização Imediata", icon: <FiCheck /> },
    {
        id: "funcionarios",
        label: "Visualização de Funcionários",
        icon: <FiSettings />,
    },
    { id: "exclusao", label: "Exclusão de Informações", icon: <FiList /> },
    { id: "cupom", label: "Cupom Promocional", icon: <FiType /> },
];

const deletionFields: TableField<DeletionLog>[] = [
    { id: "data", header: "Data", accessorKey: "data", width: "7rem" },
    { id: "hora", header: "Hora", accessorKey: "hora", width: "6rem" },
    { id: "login", header: "Login", accessorKey: "login", width: "8rem" },
    {
        id: "usuario",
        header: "Usuário",
        accessorKey: "usuario",
        width: "12rem",
    },
    {
        id: "informacoesExcluidas",
        header: "Informações Excluídas",
        accessorKey: "informacoesExcluidas",
    },
    {
        id: "resultado",
        header: "Resultado",
        accessorKey: "resultado",
        width: "10rem",
    },
];

function getInitialVisibilityState() {
    return visibilityGroups.reduce<Record<string, boolean>>(
        (groupAccumulator, group) => {
            group.fields.forEach((field) => {
                groupAccumulator[`${group.id}.${field.id}`] = Boolean(
                    field.checked,
                );
            });

            return groupAccumulator;
        },
        {},
    );
}

const themeEntries = Object.entries(themes) as [
    ThemeKey,
    (typeof themes)[ThemeKey],
][];

export const ConfiguracoesSistemaPage: React.FC = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const currentTheme = (
        theme && themes[theme] ? theme : "purple"
    ) as ThemeKey;
    const [activeTab, setActiveTab] = useState<TabId>("logo");
    const tabContentRef = useRef<HTMLDivElement>(null);
    const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(currentTheme);
    const [visibilityState, setVisibilityState] = useState<
        Record<string, boolean>
    >(getInitialVisibilityState);
    const [restrictEmployees, setRestrictEmployees] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(
        deletionCategories[0],
    );
    const [couponText, setCouponText] = useState("");
    const [logoPreview, setLogoPreview] = useState("/logo-webcontrol.png");
    const [savedMessage, setSavedMessage] = useState("");

    const checkedFieldsCount = useMemo(() => {
        return Object.values(visibilityState).filter(Boolean).length;
    }, [visibilityState]);

    const totalFieldsCount = useMemo(() => {
        return visibilityGroups.reduce(
            (total, group) => total + group.fields.length,
            0,
        );
    }, []);

    const handleLogoChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (!file) {
                return;
            }

            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
        },
        [],
    );

    const focusTabContent = useCallback(() => {
        window.setTimeout(() => {
            tabContentRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            tabContentRef.current?.focus({ preventScroll: true });
        }, 80);
    }, []);

    const handleSelectTab = useCallback(
        (tabId: TabId) => {
            setActiveTab(tabId);
            focusTabContent();
        },
        [focusTabContent],
    );

    const handleSaveTheme = useCallback(() => {
        setTheme(selectedTheme);
        setSavedMessage(`Tema ${themeLabels[selectedTheme]} aplicado.`);
    }, [selectedTheme, setTheme]);

    const handleToggleVisibility = useCallback((key: string) => {
        setVisibilityState((current) => ({
            ...current,
            [key]: !current[key],
        }));
    }, []);

    const handleCouponCommand = useCallback((token: string) => {
        setCouponText((current) => (current ? `${current}\n${token}` : token));
    }, []);

    const handlePrintCoupon = useCallback(() => {
        window.print();
    }, []);

    const renderLogoTab = () => (
        <ContentPanel>
            <SectionHeader>
                <div>
                    <h3>Carregar Logo</h3>
                </div>
                <StatusPill $tone="primary">PNG ou JPG</StatusPill>
            </SectionHeader>

            <LogoGrid>
                <LogoPreview>
                    <img src={logoPreview} alt="Logo atual da empresa" />
                </LogoPreview>
                <LogoControls>
                    <div>
                        <strong>Formatos permitidos: PNG, JPG</strong>
                        <p>
                            Tamanho ideal: 250 pixels de largura por 80 pixels
                            de altura.
                        </p>
                    </div>
                    <FileInput
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={handleLogoChange}
                    />
                    <InlineActions $align="start">
                        <Botao
                            nome="Criar Minha Logo"
                            variant="primary"
                            action={() => undefined}
                            icone={<FiUploadCloud />}
                        />
                        <Botao
                            nome="Restaurar padrão"
                            action={() => undefined}
                        />
                    </InlineActions>
                </LogoControls>
            </LogoGrid>
        </ContentPanel>
    );

    const renderColorsTab = () => (
        <ContentPanel>
            <SectionHeader>
                <div>
                    <h3>Paleta de Cores do Sistema</h3>
                    <p>
                        As opções abaixo vêm do tema atual do sistema e mostram
                        as cores aplicadas em menus, botões, detalhes e textos.
                    </p>
                </div>
                <InlineActions>
                    <Botao
                        nome="Salvar Configurações"
                        variant="primary"
                        action={handleSaveTheme}
                        icone={<FiSave />}
                    />
                </InlineActions>
            </SectionHeader>

            <PaletteGrid>
                {themeEntries.map(([key, colors]) => {
                    const palette = [
                        colors.main,
                        colors.secondary,
                        colors.tertiary,
                        colors.quaternary,
                        colors.font,
                    ];

                    return (
                        <PaletteCard key={key} $active={key === selectedTheme}>
                            <PaletteTitle>
                                <span>
                                    <Radio
                                        name="system-theme"
                                        checked={key === selectedTheme}
                                        onChange={() => setSelectedTheme(key)}
                                    />{" "}
                                    {themeLabels[key]}
                                </span>
                                {key === currentTheme ? (
                                    <StatusPill $tone="success">
                                        Atual
                                    </StatusPill>
                                ) : null}
                            </PaletteTitle>
                            <SwatchBar>
                                {palette.map((color) => (
                                    <Swatch
                                        key={`${key}-${color}`}
                                        $color={color}
                                    />
                                ))}
                            </SwatchBar>
                        </PaletteCard>
                    );
                })}
            </PaletteGrid>

            {savedMessage ? (
                <StatusPill $tone="success">{savedMessage}</StatusPill>
            ) : null}
        </ContentPanel>
    );

    const renderImmediateDataTab = () => (
        <ContentPanel>
            <SectionHeader>
                <div>
                    <h3>Dados de Visualização Imediata</h3>
                    <p>
                        Escolha quais campos aparecem primeiro nos cadastros e
                        listas operacionais.
                    </p>
                </div>
                <StatusPill $tone="primary">
                    {checkedFieldsCount} de {totalFieldsCount} ativos
                </StatusPill>
            </SectionHeader>

            <MetricGrid>
                <MetricCard>
                    <span>Seções</span>
                    <strong>{visibilityGroups.length}</strong>
                </MetricCard>
                <MetricCard>
                    <span>Campos visíveis</span>
                    <strong>{checkedFieldsCount}</strong>
                </MetricCard>
                <MetricCard>
                    <span>Campos ocultos</span>
                    <strong>{totalFieldsCount - checkedFieldsCount}</strong>
                </MetricCard>
            </MetricGrid>

            <GroupStack>
                {visibilityGroups.map((group) => (
                    <FieldGroup key={group.id}>
                        <FieldGroupTitle>
                            <FiChevronRight />
                            {group.title}
                        </FieldGroupTitle>
                        <CheckboxGrid>
                            {group.fields.map((field) => {
                                const key = `${group.id}.${field.id}`;

                                return (
                                    <CheckOption key={key}>
                                        <Checkbox
                                            checked={visibilityState[key]}
                                            onChange={() =>
                                                handleToggleVisibility(key)
                                            }
                                        />
                                        <span>{field.label}</span>
                                    </CheckOption>
                                );
                            })}
                        </CheckboxGrid>
                    </FieldGroup>
                ))}
            </GroupStack>

            <InlineActions>
                <Botao
                    nome="Salvar Configurações"
                    variant="primary"
                    action={() => undefined}
                    icone={<FiSave />}
                />
            </InlineActions>
        </ContentPanel>
    );

    const renderEmployeesTab = () => (
        <ContentPanel>
            <SectionHeader>
                <div>
                    <h3>Visualização de Funcionários</h3>
                    <p>
                        Controle se usuários que não são masters podem
                        visualizar dados de outros funcionários.
                    </p>
                </div>
            </SectionHeader>

            <CenterCard>
                <StatusPill $tone="warning">Permissão sensível</StatusPill>
                <h3>Restringir visualização para usuários não masters?</h3>
                <RadioGroup>
                    <RadioOption>
                        <Radio
                            name="restrict-employees"
                            checked={restrictEmployees}
                            onChange={() => setRestrictEmployees(true)}
                        />
                        <span>Sim</span>
                    </RadioOption>
                    <RadioOption>
                        <Radio
                            name="restrict-employees"
                            checked={!restrictEmployees}
                            onChange={() => setRestrictEmployees(false)}
                        />
                        <span>Não</span>
                    </RadioOption>
                </RadioGroup>
                <Botao
                    nome="Salvar"
                    variant="primary"
                    action={() => undefined}
                    icone={<FiSave />}
                />
            </CenterCard>
        </ContentPanel>
    );

    const renderDeletionTab = () => (
        <ContentPanel>
            <SectionHeader>
                <div>
                    <h3>Exclusão de Informações</h3>
                    <p>
                        Selecione uma categoria para localizar itens
                        relacionados e confirme exclusões com rastreabilidade.
                    </p>
                </div>
                <Botao
                    nome="Confirma Exclusão"
                    variant="primary"
                    action={() => undefined}
                />
            </SectionHeader>

            <DeletionGrid>
                <RelatedItemsPanel $compact>
                    <h3>Categorias</h3>
                    <CategoryList>
                        {deletionCategories.map((category) => (
                            <CategoryOption
                                key={category}
                                $active={selectedCategory === category}
                            >
                                <Radio
                                    name="deletion-category"
                                    checked={selectedCategory === category}
                                    onChange={() =>
                                        setSelectedCategory(category)
                                    }
                                />
                                <span>{category}</span>
                            </CategoryOption>
                        ))}
                    </CategoryList>
                </RelatedItemsPanel>

                <RelatedItemsPanel $compact>
                    <h3>Itens Relacionados</h3>
                    <EmptyRelated>
                        Nenhum item carregado para {selectedCategory}. Use os
                        filtros da categoria para revisar antes de confirmar a
                        exclusão.
                    </EmptyRelated>
                </RelatedItemsPanel>
            </DeletionGrid>

            <Table
                title="Histórico de Registros de Exclusão de Informações e os Responsáveis"
                description="Todas as exclusões confirmadas serão registradas aqui com data, usuário e resultado."
                data={deletionLogs}
                fields={deletionFields}
                emptyMessage="Nenhum registro de exclusão encontrado."
                showColumnSelector={false}
                compact
            />
        </ContentPanel>
    );

    const renderCouponTab = () => (
        <ContentPanel>
            <SectionHeader>
                <div>
                    <h3>Cupom Promocional</h3>
                    <p>
                        Crie a mensagem promocional, revise o texto e imprima a
                        térmica quando estiver pronto.
                    </p>
                </div>
            </SectionHeader>

            <EditorShell>
                <EditorToolbar aria-label="Ferramentas do cupom promocional">
                    <ToolbarButton
                        type="button"
                        title="Visualizar"
                        onClick={() => handleCouponCommand("[prévia do cupom]")}
                    >
                        <FiEye />
                    </ToolbarButton>
                    <ToolbarButton
                        type="button"
                        title="Negrito"
                        $strong
                        onClick={() =>
                            handleCouponCommand("**texto em destaque**")
                        }
                    >
                        <FiBold />
                    </ToolbarButton>
                    <ToolbarButton
                        type="button"
                        title="Itálico"
                        onClick={() =>
                            handleCouponCommand("_texto em itálico_")
                        }
                    >
                        <FiItalic />
                    </ToolbarButton>
                    <ToolbarButton
                        type="button"
                        title="Inserir título"
                        onClick={() =>
                            handleCouponCommand("TÍTULO DA PROMOÇÃO")
                        }
                    >
                        <FiType />
                    </ToolbarButton>
                    <ToolbarButton
                        type="button"
                        title="Inserir lista"
                        onClick={() =>
                            handleCouponCommand("- Item promocional")
                        }
                    >
                        <FiList />
                    </ToolbarButton>
                </EditorToolbar>
                <EditorTextarea
                    value={couponText}
                    onChange={(event) => setCouponText(event.target.value)}
                    placeholder="Digite aqui o texto do cupom promocional..."
                />
                <EditorFooter>
                    <span>
                        Palavras:{" "}
                        {couponText.trim()
                            ? couponText.trim().split(/\s+/).length
                            : 0}
                    </span>
                    <InlineActions>
                        <Botao
                            nome="Imprimir Térmica"
                            variant="primary"
                            action={handlePrintCoupon}
                            icone={<FiPrinter />}
                        />
                    </InlineActions>
                </EditorFooter>
            </EditorShell>
        </ContentPanel>
    );

    const renderActiveTab = () => {
        if (activeTab === "logo") {
            return renderLogoTab();
        }
        if (activeTab === "cores") {
            return renderColorsTab();
        }
        if (activeTab === "dados") {
            return renderImmediateDataTab();
        }
        if (activeTab === "funcionarios") {
            return renderEmployeesTab();
        }
        if (activeTab === "exclusao") {
            return renderDeletionTab();
        }

        return renderCouponTab();
    };

    return (
        <PageLayout title="Configurações do Sistema">
            <SettingsRoot>
                <TabsBar aria-label="Abas de configurações">
                    {tabs.map((tab) => (
                        <TabButton
                            key={tab.id}
                            type="button"
                            $active={activeTab === tab.id}
                            onClick={() => handleSelectTab(tab.id)}
                        >
                            {tab.icon}
                            {tab.label}
                        </TabButton>
                    ))}
                </TabsBar>

                <TabContent ref={tabContentRef} tabIndex={-1}>
                    {renderActiveTab()}
                </TabContent>
            </SettingsRoot>
        </PageLayout>
    );
};
