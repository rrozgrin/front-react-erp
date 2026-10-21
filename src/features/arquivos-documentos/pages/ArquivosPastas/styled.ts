import styled, { css } from 'styled-components';
import { AppButtonBase } from '../../../../common/components/Buttons/buttonBase';
import { Input as UiInput, Panel, Select as UiSelect } from '../../../../common/components/Ui';
import type { ExplorerViewMode } from './types';

export const ArquivosRoot = styled.div`
    display: grid;
    gap: var(--space-md);
`;

export const HeroPanel = styled(Panel)`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-md);
    align-items: center;
    background:
        linear-gradient(135deg, rgba(var(--bs-primary-rgb, 30, 94, 149), 0.12), transparent 36%),
        var(--theme-surface, #ffffff);

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

export const HeroCopy = styled.div`
    display: grid;
    gap: var(--space-xs);

    h2 {
        margin: 0;
        color: var(--theme-text, #172033);
        font-size: var(--font-size-sm);
        font-weight: 400;
    }

    p {
        max-width: 58rem;
        margin: 0;
        color: var(--theme-text-soft, #64748b);
        font-size: var(--font-size-sm);
        line-height: 1.45;
    }
`;

export const HeroStats = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(7.5rem, 1fr));
    gap: var(--space-xs);

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
    }
`;

export const StatCard = styled.div`
    display: grid;
    gap: var(--space-2xs);
    min-height: 4.75rem;
    padding: var(--space-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-sm);
    background: var(--theme-surface, #ffffff);

    span {
        color: var(--theme-text-soft, #64748b);
        font-size: var(--font-size-xs);
        font-weight: 500;
        text-transform: uppercase;
    }

    strong {
        color: var(--theme-text, #172033);
        font-size: var(--font-size-sm);
        font-weight: 400;
    }
`;

export const ExplorerShell = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.32fr);
    gap: var(--space-md);
    align-items: start;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

export const MainColumn = styled.div`
    display: grid;
    gap: var(--space-md);
    min-width: 0;
`;

export const SideColumn = styled.aside`
    display: grid;
    gap: var(--space-md);
    min-width: 0;
`;

export const ActionPanel = styled(Panel)`
    display: grid;
    gap: var(--space-md);
`;

export const ActionTabs = styled.div`
    display: flex;
    gap: var(--space-xs);
    overflow-x: auto;
    padding: var(--space-xs);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface-muted, #c2c2c2);
`;

export const ActionTab = styled.button<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    min-height: 2.5rem;
    padding: 0 var(--space-sm);
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'transparent')};
    border-radius: var(--radius-sm);
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-primary-rgb, 30, 94, 149), 0.1)' : 'transparent')};
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;

    &:hover,
    &:focus {
        border-color: rgba(var(--bs-primary-rgb, 30, 94, 149), 0.3);
        outline: none;
    }
`;

export const InlineForm = styled.form`
    display: grid;
    grid-template-columns: minmax(16rem, 1fr) auto;
    gap: var(--space-sm);
    align-items: end;

    @media (max-width: 680px) {
        grid-template-columns: 1fr;
    }
`;

export const FieldGroup = styled.label`
    display: grid;
    gap: var(--space-xs);
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const Input = styled(UiInput)``;

export const Select = styled(UiSelect)``;

export const PrimaryButton = styled(AppButtonBase).attrs({ $size: 'page' })``;

export const SecondaryButton = styled(AppButtonBase).attrs({ $size: 'page', $variant: 'secondary' })``;

export const UploadBox = styled.label`
    display: grid;
    justify-items: center;
    gap: var(--space-sm);
    min-height: 10rem;
    padding: var(--space-lg);
    border: 1px dashed rgba(var(--bs-primary-rgb, 30, 94, 149), 0.42);
    border-radius: var(--radius-md);
    background: var(--theme-surface-muted, #f8fafc);
    color: #000;
    text-align: center;
    cursor: pointer;

    svg {
        color: var(--color-main, var(--bs-primary));
        font-size: 2rem;
    }

    strong {
        color: #000;
        font-size: var(--font-size-sm);
    }

    span {
        font-size: var(--font-size-sm);
    }

    input {
        display: none;
    }
`;

export const BreadcrumbPanel = styled(Panel)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    flex-wrap: wrap;
    padding: var(--space-md);
`;

export const BreadcrumbList = styled.nav`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    min-width: 0;
    flex-wrap: wrap;
`;

export const CrumbButton = styled.button<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    min-height: 2rem;
    padding: 0 var(--space-xs);
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'transparent')};
    border-radius: var(--radius-xs);
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-primary-rgb, 30, 94, 149), 0.09)' : 'transparent')};
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;
    cursor: pointer;
`;

export const ToolbarPanel = styled(Panel)`
    display: grid;
    gap: var(--space-sm);
    padding: var(--space-md);
`;

export const ToolbarRow = styled.div`
    display: grid;
    grid-template-columns: minmax(14rem, 1fr) auto;
    gap: var(--space-sm);
    align-items: center;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

export const FilterPills = styled.div`
    display: flex;
    gap: var(--space-xs);
    flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.125rem;
    padding: 0 var(--space-sm);
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-border, #dbe1ea)')};
    border-radius: var(--radius-pill);
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-primary-rgb, 30, 94, 149), 0.1)' : 'var(--theme-surface, #ffffff)')};
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;
    cursor: pointer;
`;

export const ViewToggle = styled.div`
    display: inline-flex;
    gap: var(--space-2xs);
    padding: var(--space-2xs);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface-muted, #f8fafc);

    @media (max-width: 760px) {
        justify-self: start;
    }
`;

export const IconButton = styled.button<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'transparent')};
    border-radius: var(--radius-sm);
    background: ${({ $active }) => ($active ? 'var(--theme-surface, #ffffff)' : 'transparent')};
    color: ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-text-soft, #64748b)')};
    cursor: pointer;
`;

const listCard = css`
    grid-template-columns: auto minmax(0, 1fr) auto;
    min-height: 4.75rem;

    @media (max-width: 640px) {
        grid-template-columns: auto minmax(0, 1fr);
    }
`;

export const FilesPanel = styled(Panel)`
    display: grid;
    gap: var(--space-md);
`;

export const FilesHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--theme-border, #dbe1ea);

    h3 {
        margin: 0;
        color: #000;
        font-size: var(--font-size-sm);
        font-weight: 400;
    }

    span {
        color: #000;
        font-size: var(--font-size-sm);
        font-weight: 400;
    }

    @media (max-width: 640px) {
        display: grid;
    }
`;

export const FilesGrid = styled.div<{ $viewMode: ExplorerViewMode }>`
    display: grid;
    grid-template-columns: ${({ $viewMode }) => ($viewMode === 'grid' ? 'repeat(auto-fill, minmax(13.5rem, 1fr))' : '1fr')};
    gap: var(--space-sm);
`;

export const FileCard = styled.article<{ $selected?: boolean; $viewMode: ExplorerViewMode }>`
    display: grid;
    gap: var(--space-sm);
    align-items: center;
    min-width: 0;
    min-height: 11.5rem;
    padding: var(--space-sm);
    border: 1px solid ${({ $selected }) => ($selected ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-border, #dbe1ea)')};
    border-radius: var(--radius-md);
    background: ${({ $selected }) => ($selected ? 'rgba(var(--bs-primary-rgb, 30, 94, 149), 0.07)' : 'var(--theme-surface, #ffffff)')};
    box-shadow: ${({ $selected }) => ($selected ? 'var(--shadow-panel-strong)' : 'var(--shadow-panel)')};
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

    ${({ $viewMode }) => ($viewMode === 'list' ? listCard : '')}

    &:hover,
    &:focus-within {
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: var(--shadow-panel-strong);
        transform: translateY(-1px);
    }
`;

export const FileIcon = styled.div<{ $kind: string }>`
    display: grid;
    place-items: center;
    width: 3.25rem;
    height: 3.25rem;
    border-radius: var(--radius-sm);
    background: ${({ $kind }) => {
        if ($kind === 'folder') {
            return 'rgba(245, 158, 11, 0.16)';
        }
        if ($kind === 'image') {
            return 'rgba(22, 163, 74, 0.14)';
        }
        if ($kind === 'pdf') {
            return 'rgba(220, 38, 38, 0.12)';
        }
        if ($kind === 'spreadsheet') {
            return 'rgba(20, 184, 166, 0.13)';
        }
        return 'rgba(var(--bs-primary-rgb, 30, 94, 149), 0.12)';
    }};
    color: ${({ $kind }) => {
        if ($kind === 'folder') {
            return '#b45309';
        }
        if ($kind === 'image') {
            return '#15803d';
        }
        if ($kind === 'pdf') {
            return '#b91c1c';
        }
        if ($kind === 'spreadsheet') {
            return '#0f766e';
        }
        return 'var(--color-main, var(--bs-primary))';
    }};
    font-size: 1.65rem;
`;

export const FileInfo = styled.div`
    display: grid;
    gap: var(--space-2xs);
    min-width: 0;

    h4 {
        margin: 0;
        color: #000;
        font-size: var(--font-size-sm);
        font-weight: 400;
        overflow-wrap: anywhere;
    }

    span {
        color: #000;
        font-size: var(--font-size-xs);
        font-weight: 500;
    }
`;

export const FileActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: var(--space-xs);
    flex-wrap: wrap;

    @media (max-width: 640px) {
        grid-column: 1 / -1;
        justify-content: flex-start;
    }
`;

export const MiniButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2xs);
    min-height: 2rem;
    padding: 0 var(--space-xs);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-xs);
    background: var(--theme-surface, #ffffff);
    color: var(--theme-text-soft, #475569);
    font-size: var(--font-size-xs);
    font-weight: 500;
    cursor: pointer;

    &:hover,
    &:focus {
        border-color: var(--color-main, var(--bs-primary));
        color: var(--color-main, var(--bs-primary));
        outline: none;
    }
`;

export const EmptyState = styled.div`
    display: grid;
    place-items: center;
    gap: var(--space-sm);
    min-height: 15rem;
    padding: var(--space-xl);
    border: 1px dashed var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface-muted, #f8fafc);
    color: #000;
    text-align: center;

    svg {
        color: #000;
        font-size: 2rem;
    }

    strong {
        color: #000;
        font-size: var(--font-size-sm);
    }
`;

export const DetailsPanel = styled(Panel)`
    display: grid;
    gap: var(--space-md);
`;

export const DetailsHeader = styled.header`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--theme-border, #dbe1ea);

    h3 {
        margin: 0;
        color: #000;
        font-size: var(--font-size-sm);
        font-weight: 400;
        overflow-wrap: anywhere;
    }
`;

export const PreviewFrame = styled.div`
    display: grid;
    place-items: center;
    min-height: 12rem;
    overflow: hidden;
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface-muted, #f8fafc);

    img {
        width: 100%;
        height: 12rem;
        object-fit: cover;
    }

    svg {
        color: #000;
        font-size: 3rem;
    }
`;

export const DetailList = styled.dl`
    display: grid;
    gap: var(--space-xs);
    margin: 0;

    div {
        display: flex;
        justify-content: space-between;
        gap: var(--space-sm);
        padding-bottom: var(--space-xs);
        border-bottom: 1px solid var(--theme-border, #dbe1ea);
    }

    dt {
        color: #000;
        font-size: var(--font-size-xs);
        font-weight: 500;
        text-transform: uppercase;
    }

    dd {
        margin: 0;
        color: #000;
        font-size: var(--font-size-sm);
        font-weight: 400;
        text-align: right;
    }
`;

export const ActivityPanel = styled(Panel)`
    display: grid;
    gap: var(--space-sm);

    h3 {
        margin: 0;
        color: #000;
        font-size: var(--font-size-sm);
        font-weight: 400;
    }
`;

export const ActivityList = styled.ul`
    display: grid;
    gap: var(--space-xs);
    margin: 0;
    padding: 0;
`;

export const ActivityItem = styled.li`
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-xs);
    align-items: center;
    list-style: none;
    color: #000;
    font-size: var(--font-size-sm);

    svg {
        color: #000;
    }

    strong {
        display: block;
        color: #000;
        font-size: var(--font-size-sm);
        overflow-wrap: anywhere;
    }
`;
