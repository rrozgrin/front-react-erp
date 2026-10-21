import React from "react";
import {
    FiArchive,
    FiChevronRight,
    FiClock,
    FiFile,
    FiFileText,
    FiFolder,
    FiGrid,
    FiHardDrive,
    FiHome,
    FiImage,
    FiList,
    FiPlus,
    FiSearch,
    FiUploadCloud,
} from "react-icons/fi";
import { StatusPill } from "../../../../common/components/Ui";
import type {
    ArquivoItem,
    ArquivoKind,
    CreationMode,
    ExplorerViewMode,
    FileTypeFilter,
} from "./types";
import {
    ActionPanel,
    ActionTab,
    ActionTabs,
    ActivityItem,
    ActivityList,
    ActivityPanel,
    BreadcrumbList,
    BreadcrumbPanel,
    CrumbButton,
    DetailList,
    DetailsHeader,
    DetailsPanel,
    EmptyState,
    FieldGroup,
    FileActions,
    FileCard,
    FileIcon,
    FileInfo,
    FilesGrid,
    FilesHeader,
    FilesPanel,
    FilterButton,
    FilterPills,
    IconButton,
    InlineForm,
    Input,
    MiniButton,
    PreviewFrame,
    PrimaryButton,
    SecondaryButton,
    Select,
    ToolbarPanel,
    ToolbarRow,
    UploadBox,
    ViewToggle,
} from "./styled";
const kindLabels: Record<ArquivoKind, string> = {
    folder: "Pasta",
    document: "Documento",
    image: "Imagem",
    pdf: "PDF",
    spreadsheet: "Planilha",
    archive: "Compactado",
    other: "Arquivo",
};
export const fileTypeFilters: FileTypeFilter[] = [
    { id: "all", label: "Todos" },
    { id: "folder", label: "Pastas" },
    { id: "document", label: "Documentos" },
    { id: "image", label: "Imagens" },
    { id: "pdf", label: "PDFs" },
    { id: "spreadsheet", label: "Planilhas" },
    { id: "archive", label: "Compactados" },
];

export function getKindLabel(kind: ArquivoKind) {
    return kindLabels[kind];
}

export function formatFileSize(size?: number) {
    if (!size) {
        return "-";
    }

    const units = ["B", "KB", "MB", "GB"];
    let unitIndex = 0;
    let value = size;

    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex += 1;
    }

    return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

export function formatDate(date: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

export function getFileIcon(kind: ArquivoKind) {
    if (kind === "folder") {
        return <FiFolder />;
    }
    if (kind === "image") {
        return <FiImage />;
    }
    if (kind === "archive") {
        return <FiArchive />;
    }
    if (kind === "document" || kind === "pdf" || kind === "spreadsheet") {
        return <FiFileText />;
    }

    return <FiFile />;
}

interface CreationPanelProps {
    activeMode: CreationMode;
    folderName: string;
    documentName: string;
    documentKind: ArquivoKind;
    currentFolderName: string;
    onModeChange: (mode: CreationMode) => void;
    onFolderNameChange: (value: string) => void;
    onDocumentNameChange: (value: string) => void;
    onDocumentKindChange: (value: ArquivoKind) => void;
    onCreateFolder: (event: React.FormEvent<HTMLFormElement>) => void;
    onCreateDocument: (event: React.FormEvent<HTMLFormElement>) => void;
    onUploadFiles: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CreationPanel = ({
    activeMode,
    folderName,
    documentName,
    documentKind,
    currentFolderName,
    onModeChange,
    onFolderNameChange,
    onDocumentNameChange,
    onDocumentKindChange,
    onCreateFolder,
    onCreateDocument,
    onUploadFiles,
}: CreationPanelProps) => (
    <ActionPanel>
        <ActionTabs aria-label="Acoes de arquivos">
            <ActionTab
                type="button"
                $active={activeMode === "folder"}
                onClick={() => onModeChange("folder")}
            >
                <FiFolder />
                Nova pasta
            </ActionTab>
            <ActionTab
                type="button"
                $active={activeMode === "document"}
                onClick={() => onModeChange("document")}
            >
                <FiFileText />
                Novo documento
            </ActionTab>
            <ActionTab
                type="button"
                $active={activeMode === "upload"}
                onClick={() => onModeChange("upload")}
            >
                <FiUploadCloud />
                Enviar arquivo
            </ActionTab>
        </ActionTabs>

        {activeMode === "folder" ? (
            <InlineForm onSubmit={onCreateFolder}>
                <FieldGroup>
                    Nome da pasta em {currentFolderName}
                    <Input
                        value={folderName}
                        onChange={(event) =>
                            onFolderNameChange(event.target.value)
                        }
                        placeholder="Ex.: Contratos 2026"
                    />
                </FieldGroup>
                <PrimaryButton type="submit">
                    <FiPlus />
                    Criar pasta
                </PrimaryButton>
            </InlineForm>
        ) : null}

        {activeMode === "document" ? (
            <InlineForm onSubmit={onCreateDocument}>
                <FieldGroup>
                    Nome do documento
                    <Input
                        value={documentName}
                        onChange={(event) =>
                            onDocumentNameChange(event.target.value)
                        }
                        placeholder="Ex.: Proposta comercial"
                    />
                </FieldGroup>
                <FieldGroup>
                    Tipo
                    <Select
                        value={documentKind}
                        onChange={(event) =>
                            onDocumentKindChange(
                                event.target.value as ArquivoKind,
                            )
                        }
                    >
                        <option value="document">Documento</option>
                        <option value="pdf">PDF</option>
                        <option value="spreadsheet">Planilha</option>
                        <option value="other">Outro</option>
                    </Select>
                </FieldGroup>
                <PrimaryButton type="submit">
                    <FiPlus />
                    Criar
                </PrimaryButton>
            </InlineForm>
        ) : null}

        {activeMode === "upload" ? (
            <UploadBox>
                <FiUploadCloud />
                <strong>Selecionar arquivos para {currentFolderName}</strong>
                <span>
                    Fotos, PDFs, planilhas, documentos e qualquer outro formato.
                </span>
                <Input type="file" multiple onChange={onUploadFiles} />
            </UploadBox>
        ) : null}
    </ActionPanel>
);

interface FolderBreadcrumbsProps {
    breadcrumbs: ArquivoItem[];
    currentFolderName: string;
    onGoRoot: () => void;
    onOpenFolder: (folderId: string | null) => void;
}

export const FolderBreadcrumbs = ({
    breadcrumbs,
    currentFolderName,
    onGoRoot,
    onOpenFolder,
}: FolderBreadcrumbsProps) => (
    <BreadcrumbPanel>
        <BreadcrumbList aria-label="Caminho atual">
            <CrumbButton
                type="button"
                $active={!breadcrumbs.length}
                onClick={onGoRoot}
            >
                <FiHome />
                Inicio
            </CrumbButton>
            {breadcrumbs.map((folder, index) => (
                <React.Fragment key={folder.id}>
                    <FiChevronRight />
                    <CrumbButton
                        type="button"
                        $active={index === breadcrumbs.length - 1}
                        onClick={() => onOpenFolder(folder.id)}
                    >
                        {folder.name}
                    </CrumbButton>
                </React.Fragment>
            ))}
        </BreadcrumbList>
        <StatusPill $tone="primary">{currentFolderName}</StatusPill>
    </BreadcrumbPanel>
);

interface ExplorerToolbarProps {
    search: string;
    filter: FileTypeFilter["id"];
    viewMode: ExplorerViewMode;
    onSearchChange: (value: string) => void;
    onFilterChange: (value: FileTypeFilter["id"]) => void;
    onViewModeChange: (value: ExplorerViewMode) => void;
}

export const ExplorerToolbar = ({
    search,
    filter,
    viewMode,
    onSearchChange,
    onFilterChange,
    onViewModeChange,
}: ExplorerToolbarProps) => (
    <ToolbarPanel>
        <ToolbarRow>
            <FieldGroup>
                Buscar
                <Input
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Buscar por nome, tipo ou extensao"
                />
            </FieldGroup>
            <ViewToggle aria-label="Modo de visualizacao">
                <IconButton
                    type="button"
                    title="Grade"
                    aria-label="Visualizar em grade"
                    $active={viewMode === "grid"}
                    onClick={() => onViewModeChange("grid")}
                >
                    <FiGrid />
                </IconButton>
                <IconButton
                    type="button"
                    title="Lista"
                    aria-label="Visualizar em lista"
                    $active={viewMode === "list"}
                    onClick={() => onViewModeChange("list")}
                >
                    <FiList />
                </IconButton>
            </ViewToggle>
        </ToolbarRow>
        <FilterPills>
            {fileTypeFilters.map((item) => (
                <FilterButton
                    key={item.id}
                    type="button"
                    $active={filter === item.id}
                    onClick={() => onFilterChange(item.id)}
                >
                    {item.label}
                </FilterButton>
            ))}
        </FilterPills>
    </ToolbarPanel>
);

interface FileExplorerProps {
    items: ArquivoItem[];
    selectedItemId?: string;
    viewMode: ExplorerViewMode;
    onSelectItem: (item: ArquivoItem) => void;
    onOpenFolder: (folderId: string) => void;
}

export const FileExplorer = ({
    items,
    selectedItemId,
    viewMode,
    onSelectItem,
    onOpenFolder,
}: FileExplorerProps) => (
    <FilesPanel>
        <FilesHeader>
            <h3>Conteudo da pasta</h3>
            <span>{items.length} item(ns)</span>
        </FilesHeader>

        {items.length ? (
            <FilesGrid $viewMode={viewMode}>
                {items.map((item) => (
                    <FileCard
                        key={item.id}
                        tabIndex={0}
                        $selected={selectedItemId === item.id}
                        $viewMode={viewMode}
                        onClick={() => onSelectItem(item)}
                        onDoubleClick={() => {
                            if (item.kind === "folder") {
                                onOpenFolder(item.id);
                            }
                        }}
                    >
                        <FileIcon $kind={item.kind}>
                            {getFileIcon(item.kind)}
                        </FileIcon>
                        <FileInfo>
                            <h4>{item.name}</h4>
                            <span>
                                {getKindLabel(item.kind)}{" "}
                                {item.extension ? `.${item.extension}` : ""}
                            </span>
                            <span>
                                {formatFileSize(item.size)} -{" "}
                                {formatDate(item.updatedAt)}
                            </span>
                        </FileInfo>
                        <FileActions>
                            {item.kind === "folder" ? (
                                <MiniButton
                                    type="button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onOpenFolder(item.id);
                                    }}
                                >
                                    Abrir
                                </MiniButton>
                            ) : null}
                            <MiniButton
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onSelectItem(item);
                                }}
                            >
                                Detalhes
                            </MiniButton>
                        </FileActions>
                    </FileCard>
                ))}
            </FilesGrid>
        ) : (
            <EmptyState>
                <FiSearch />
                <strong>Nenhum item encontrado</strong>
                <span>
                    Crie uma pasta, envie arquivos ou ajuste os filtros acima.
                </span>
            </EmptyState>
        )}
    </FilesPanel>
);

interface FileDetailsProps {
    selectedItem?: ArquivoItem;
    currentFolderName: string;
}

export const FileDetails = ({
    selectedItem,
    currentFolderName,
}: FileDetailsProps) => (
    <DetailsPanel>
        {selectedItem ? (
            <>
                <DetailsHeader>
                    <FileIcon $kind={selectedItem.kind}>
                        {getFileIcon(selectedItem.kind)}
                    </FileIcon>
                    <h3>{selectedItem.name}</h3>
                </DetailsHeader>
                <PreviewFrame>
                    {selectedItem.kind === "image" && selectedItem.url ? (
                        <img src={selectedItem.url} alt={selectedItem.name} />
                    ) : (
                        getFileIcon(selectedItem.kind)
                    )}
                </PreviewFrame>
                <DetailList>
                    <div>
                        <dt>Tipo</dt>
                        <dd>{getKindLabel(selectedItem.kind)}</dd>
                    </div>
                    <div>
                        <dt>Tamanho</dt>
                        <dd>{formatFileSize(selectedItem.size)}</dd>
                    </div>
                    <div>
                        <dt>Atualizado</dt>
                        <dd>{formatDate(selectedItem.updatedAt)}</dd>
                    </div>
                    <div>
                        <dt>Dono</dt>
                        <dd>{selectedItem.owner || "Equipe"}</dd>
                    </div>
                </DetailList>
            </>
        ) : (
            <>
                <DetailsHeader>
                    <FileIcon $kind="folder">
                        <FiFolder />
                    </FileIcon>
                    <h3>{currentFolderName}</h3>
                </DetailsHeader>
                <PreviewFrame>
                    <FiFolder />
                </PreviewFrame>
                <DetailList>
                    <div>
                        <dt>Status</dt>
                        <dd>Sem selecao</dd>
                    </div>
                    <div>
                        <dt>Pasta atual</dt>
                        <dd>{currentFolderName}</dd>
                    </div>
                </DetailList>
            </>
        )}
    </DetailsPanel>
);

interface ActivitySummaryProps {
    items: ArquivoItem[];
}

export const ActivitySummary = ({ items }: ActivitySummaryProps) => (
    <ActivityPanel>
        <h3>Atualizados recentemente</h3>
        <ActivityList>
            {items.slice(0, 5).map((item) => (
                <ActivityItem key={item.id}>
                    <FiClock />
                    <span>
                        <strong>{item.name}</strong>
                        {getKindLabel(item.kind)} - {formatDate(item.updatedAt)}
                    </span>
                </ActivityItem>
            ))}
            {!items.length ? (
                <ActivityItem>
                    <FiHardDrive />
                    <span>
                        <strong>Sem movimentacao</strong>
                        Os proximos arquivos criados aparecem aqui.
                    </span>
                </ActivityItem>
            ) : null}
        </ActivityList>
    </ActivityPanel>
);

interface QuickActionsProps {
    onGoRoot: () => void;
    onSelectUpload: () => void;
}

export const QuickActions = ({
    onGoRoot,
    onSelectUpload,
}: QuickActionsProps) => (
    <ActivityPanel>
        <h3>Acoes rapidas</h3>
        <SecondaryButton type="button" $fullWidth onClick={onGoRoot}>
            <FiHome />
            Ir para inicio
        </SecondaryButton>
        <PrimaryButton type="button" $fullWidth onClick={onSelectUpload}>
            <FiUploadCloud />
            Enviar arquivos
        </PrimaryButton>
    </ActivityPanel>
);
