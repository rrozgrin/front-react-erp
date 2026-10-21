import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PageLayout } from '../../../../common/components/PageLayout';
import {
    ActivitySummary,
    CreationPanel,
    ExplorerToolbar,
    FileDetails,
    FileExplorer,
    FolderBreadcrumbs,
    QuickActions,
} from './components';
import type { ArquivoItem, ArquivoKind, CreationMode, ExplorerViewMode, FileTypeFilter } from './types';
import {
    ArquivosRoot,
    ExplorerShell,
    MainColumn,
    SideColumn,
} from './styled';

const now = new Date();

const initialItems: ArquivoItem[] = [
    {
        id: 'folder-clientes',
        name: 'Clientes',
        kind: 'folder',
        parentId: null,
        updatedAt: new Date(now.getTime() - 1000 * 60 * 18).toISOString(),
        owner: 'Equipe comercial',
    },
    {
        id: 'folder-financeiro',
        name: 'Financeiro',
        kind: 'folder',
        parentId: null,
        updatedAt: new Date(now.getTime() - 1000 * 60 * 84).toISOString(),
        owner: 'Financeiro',
    },
    {
        id: 'folder-contratos',
        name: 'Contratos assinados',
        kind: 'folder',
        parentId: 'folder-clientes',
        updatedAt: new Date(now.getTime() - 1000 * 60 * 130).toISOString(),
        owner: 'Atendimento',
    },
    {
        id: 'file-proposta',
        name: 'Proposta Loja Central',
        kind: 'pdf',
        parentId: 'folder-clientes',
        updatedAt: new Date(now.getTime() - 1000 * 60 * 42).toISOString(),
        size: 482430,
        extension: 'pdf',
        owner: 'Mariana',
    },
    {
        id: 'file-planilha',
        name: 'Controle de documentos',
        kind: 'spreadsheet',
        parentId: null,
        updatedAt: new Date(now.getTime() - 1000 * 60 * 240).toISOString(),
        size: 914200,
        extension: 'xlsx',
        owner: 'Administrativo',
    },
    {
        id: 'file-manual',
        name: 'Manual de organizacao',
        kind: 'document',
        parentId: null,
        updatedAt: new Date(now.getTime() - 1000 * 60 * 310).toISOString(),
        size: 73400,
        extension: 'docx',
        owner: 'Sistema',
    },
];

const documentExtensions: Partial<Record<ArquivoKind, string>> = {
    document: 'docx',
    pdf: 'pdf',
    spreadsheet: 'xlsx',
    other: 'txt',
};

function createId(prefix: string) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getFileExtension(fileName: string) {
    const extension = fileName.split('.').pop();
    return extension && extension !== fileName ? extension.toLowerCase() : undefined;
}

function getKindFromFile(file: File): ArquivoKind {
    const extension = getFileExtension(file.name);

    if (file.type.startsWith('image/')) {
        return 'image';
    }
    if (file.type === 'application/pdf' || extension === 'pdf') {
        return 'pdf';
    }
    if (['xls', 'xlsx', 'csv'].includes(extension || '')) {
        return 'spreadsheet';
    }
    if (['zip', 'rar', '7z'].includes(extension || '')) {
        return 'archive';
    }
    if (['doc', 'docx', 'txt', 'rtf'].includes(extension || '')) {
        return 'document';
    }

    return 'other';
}

function normalizeText(value: string) {
    return value.trim().toLowerCase();
}

export const ArquivosPastasPage: React.FC = () => {
    const [items, setItems] = useState<ArquivoItem[]>(initialItems);
    const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
    const [creationMode, setCreationMode] = useState<CreationMode>('folder');
    const [folderName, setFolderName] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [documentKind, setDocumentKind] = useState<ArquivoKind>('document');
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<FileTypeFilter['id']>('all');
    const [viewMode, setViewMode] = useState<ExplorerViewMode>('grid');
    const objectUrlsRef = useRef<string[]>([]);

    useEffect(() => () => {
        objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    }, []);

    const foldersById = useMemo(() => {
        return items.reduce<Record<string, ArquivoItem>>((accumulator, item) => {
            if (item.kind === 'folder') {
                accumulator[item.id] = item;
            }

            return accumulator;
        }, {});
    }, [items]);

    const currentFolderName = activeFolderId ? foldersById[activeFolderId]?.name || 'Pasta' : 'Inicio';

    const breadcrumbs = useMemo(() => {
        const path: ArquivoItem[] = [];
        let cursor = activeFolderId;

        while (cursor && foldersById[cursor]) {
            const folder = foldersById[cursor];
            path.unshift(folder);
            cursor = folder.parentId;
        }

        return path;
    }, [activeFolderId, foldersById]);

    const currentItems = useMemo(() => {
        const term = normalizeText(search);

        return items
            .filter((item) => item.parentId === activeFolderId)
            .filter((item) => typeFilter === 'all' || item.kind === typeFilter)
            .filter((item) => {
                if (!term) {
                    return true;
                }

                return [
                    item.name,
                    item.extension,
                    item.kind,
                    item.owner,
                ].some((value) => normalizeText(value || '').includes(term));
            })
            .sort((a, b) => {
                if (a.kind === 'folder' && b.kind !== 'folder') {
                    return -1;
                }
                if (a.kind !== 'folder' && b.kind === 'folder') {
                    return 1;
                }

                return a.name.localeCompare(b.name, 'pt-BR');
            });
    }, [activeFolderId, items, search, typeFilter]);

    const selectedItem = useMemo(() => {
        return items.find((item) => item.id === selectedItemId);
    }, [items, selectedItemId]);

    const recentItems = useMemo(() => {
        return [...items]
            .filter((item) => item.kind !== 'folder')
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }, [items]);

    const handleOpenFolder = useCallback((folderId: string | null) => {
        setActiveFolderId(folderId);
        setSelectedItemId(undefined);
        setSearch('');
        setTypeFilter('all');
    }, []);

    const handleSelectItem = useCallback((item: ArquivoItem) => {
        setSelectedItemId(item.id);
    }, []);

    const handleCreateFolder = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = folderName.trim();

        if (!name) {
            return;
        }

        const folder: ArquivoItem = {
            id: createId('folder'),
            name,
            kind: 'folder',
            parentId: activeFolderId,
            updatedAt: new Date().toISOString(),
            owner: 'Equipe',
        };

        setItems((current) => [folder, ...current]);
        setFolderName('');
        setSelectedItemId(folder.id);
    }, [activeFolderId, folderName]);

    const handleCreateDocument = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = documentName.trim();

        if (!name) {
            return;
        }

        const extension = documentExtensions[documentKind] || 'txt';
        const document: ArquivoItem = {
            id: createId('file'),
            name,
            kind: documentKind,
            parentId: activeFolderId,
            updatedAt: new Date().toISOString(),
            size: 0,
            extension,
            owner: 'Equipe',
        };

        setItems((current) => [document, ...current]);
        setDocumentName('');
        setSelectedItemId(document.id);
    }, [activeFolderId, documentKind, documentName]);

    const handleUploadFiles = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        if (!files.length) {
            return;
        }

        const uploadedItems = files.map<ArquivoItem>((file) => {
            const kind = getKindFromFile(file);
            const url = kind === 'image' ? URL.createObjectURL(file) : undefined;

            if (url) {
                objectUrlsRef.current.push(url);
            }

            return {
                id: createId('file'),
                name: file.name.replace(/\.[^/.]+$/, ''),
                kind,
                parentId: activeFolderId,
                updatedAt: new Date().toISOString(),
                size: file.size,
                extension: getFileExtension(file.name),
                owner: 'Equipe',
                url,
            };
        });

        setItems((current) => [...uploadedItems, ...current]);
        setSelectedItemId(uploadedItems[0]?.id);
        event.target.value = '';
    }, [activeFolderId]);

    return (
        <PageLayout title="Arquivos e Pastas">
            <ArquivosRoot>
                <ExplorerShell>
                    <MainColumn>
                        <CreationPanel
                            activeMode={creationMode}
                            folderName={folderName}
                            documentName={documentName}
                            documentKind={documentKind}
                            currentFolderName={currentFolderName}
                            onModeChange={setCreationMode}
                            onFolderNameChange={setFolderName}
                            onDocumentNameChange={setDocumentName}
                            onDocumentKindChange={setDocumentKind}
                            onCreateFolder={handleCreateFolder}
                            onCreateDocument={handleCreateDocument}
                            onUploadFiles={handleUploadFiles}
                        />

                        <FolderBreadcrumbs
                            breadcrumbs={breadcrumbs}
                            currentFolderName={currentFolderName}
                            onGoRoot={() => handleOpenFolder(null)}
                            onOpenFolder={handleOpenFolder}
                        />

                        <ExplorerToolbar
                            search={search}
                            filter={typeFilter}
                            viewMode={viewMode}
                            onSearchChange={setSearch}
                            onFilterChange={setTypeFilter}
                            onViewModeChange={setViewMode}
                        />

                        <FileExplorer
                            items={currentItems}
                            selectedItemId={selectedItemId}
                            viewMode={viewMode}
                            onSelectItem={handleSelectItem}
                            onOpenFolder={handleOpenFolder}
                        />
                    </MainColumn>

                    <SideColumn>
                        <FileDetails selectedItem={selectedItem} currentFolderName={currentFolderName} />
                        <QuickActions
                            onGoRoot={() => handleOpenFolder(null)}
                            onSelectUpload={() => setCreationMode('upload')}
                        />
                        <ActivitySummary items={recentItems} />
                    </SideColumn>
                </ExplorerShell>
            </ArquivosRoot>
        </PageLayout>
    );
};
