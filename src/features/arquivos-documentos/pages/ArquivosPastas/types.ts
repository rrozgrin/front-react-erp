export type ArquivoKind = 'folder' | 'document' | 'image' | 'pdf' | 'spreadsheet' | 'archive' | 'other';

export type ExplorerViewMode = 'grid' | 'list';

export type CreationMode = 'folder' | 'document' | 'upload';

export interface ArquivoItem {
    id: string;
    name: string;
    kind: ArquivoKind;
    parentId: string | null;
    updatedAt: string;
    size?: number;
    extension?: string;
    owner?: string;
    url?: string;
}

export interface FileTypeFilter {
    id: ArquivoKind | 'all';
    label: string;
}
