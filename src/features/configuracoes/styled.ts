import styled, { css } from 'styled-components';
import { Input, Panel, Textarea } from '../../common/components/Ui';

export const SettingsRoot = styled.div`
    display: grid;
    gap: var(--space-md);
`;

export const TabsBar = styled.nav`
    display: flex;
    gap: var(--space-xs);
    overflow-x: auto;
    padding: var(--space-xs);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface, #ffffff);
    box-shadow: var(--shadow-panel);
    scrollbar-width: thin;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    min-height: 2.75rem;
    padding: 0 var(--space-sm);
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'transparent')};
    border-radius: var(--radius-sm);
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-primary-rgb, 30, 94, 149), 0.1)' : 'transparent')};
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

    &:hover,
    &:focus {
        border-color: #000;
        background: rgba(var(--bs-primary-rgb, 30, 94, 149), 0.07);
        outline: none;
    }
`;

export const ContentPanel = styled(Panel)`
    display: grid;
    gap: var(--space-md);
`;

export const TabContent = styled.div`
    scroll-margin-top: var(--space-md);
    outline: none;
`;

export const SectionHeader = styled.header`
    display: flex;
    justify-content: space-between;
    gap: var(--space-sm);
    align-items: flex-start;
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--theme-border, #dbe1ea);

    h3 {
        margin: 0;
        color: #000;
        font-size: var(--font-size-xs);
        font-weight: 500;
    }

    @media (max-width: 720px) {
        display: grid;
    }
`;

export const LogoGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(18rem, 0.95fr) minmax(18rem, 1.05fr);
    gap: var(--space-md);
    align-items: stretch;

    @media (max-width: 880px) {
        grid-template-columns: 1fr;
    }
`;

export const LogoPreview = styled.div`
    display: grid;
    place-items: center;
    min-height: 13rem;
    padding: var(--space-lg);
    border: 1px dashed rgba(var(--bs-primary-rgb, 30, 94, 149), 0.42);
    border-radius: var(--radius-md);
    background:
        linear-gradient(135deg, rgba(var(--bs-primary-rgb, 30, 94, 149), 0.07), transparent 45%),
        var(--theme-surface-muted, #f8fafc);

    img {
        max-width: min(100%, 32rem);
        max-height: 8.75rem;
        object-fit: contain;
    }
`;

export const LogoControls = styled.div`
    display: grid;
    align-content: center;
    gap: var(--space-md);

    strong {
        color: #000;
        font-size: var(--font-size-sm);
    }

    p {
        margin: 0;
        color: #000;
        font-size: var(--font-size-sm);
    }
`;

export const FileInput = styled(Input)`
    padding: var(--space-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-sm);
    background: var(--theme-surface-muted, #f8fafc);
    color: #000;
    font-size: var(--font-size-sm);
`;

export const PaletteGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 680px) {
        grid-template-columns: 1fr;
    }
`;

export const PaletteCard = styled.label<{ $active?: boolean }>`
    display: grid;
    gap: var(--space-sm);
    min-height: 4.5rem;
    padding: var(--space-sm);
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-border, #dbe1ea)')};
    border-radius: var(--radius-md);
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-primary-rgb, 30, 94, 149), 0.08)' : 'var(--theme-surface, #ffffff)')};
    box-shadow: ${({ $active }) => ($active ? 'var(--shadow-panel-strong)' : 'var(--shadow-panel)')};
    cursor: pointer;
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

    &:hover,
    &:focus-within {
        transform: translateY(-2px);
        border-color: #000;
        box-shadow: var(--shadow-panel-strong);
    }
`;

export const PaletteTitle = styled.span.attrs({ 'data-app-title': true })`
    display: flex;
    justify-content: space-between;
    gap: var(--space-sm);
    align-items: center;
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: 400;

    input {
        width: 1rem;
        height: 1rem;
        accent-color: var(--color-main, var(--bs-primary));
    }
`;

export const SwatchBar = styled.span`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    overflow: hidden;
    min-height: 1.5rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
`;

export const Swatch = styled.span<{ $color: string }>`
    background: ${({ $color }) => $color};
`;

export const ColorCodes = styled.span`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-2xs) var(--space-xs);
    color: #000;
    font-size: var(--font-size-sm);

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const GroupStack = styled.div`
    display: grid;
    gap: var(--space-sm);
`;

export const FieldGroup = styled.section`
    display: grid;
    gap: var(--space-sm);
    padding: var(--space-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface-muted, #f8fafc);
`;

export const FieldGroupTitle = styled.h4`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    margin: 0;
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: 400;
`;

export const CheckboxGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-xs) var(--space-md);

    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 760px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`;

export const CheckOption = styled.label`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    min-width: 0;
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: 400;
    cursor: pointer;

    input {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--color-main, var(--bs-primary));
    }
`;

export const CenterCard = styled.div`
    display: grid;
    justify-items: center;
    gap: var(--space-sm);
    max-width: 54rem;
    margin: 0 auto;
    padding: clamp(var(--space-md), 4vw, var(--space-xl));
    text-align: center;
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface-muted, #f8fafc);
`;

export const RadioGroup = styled.div`
    display: inline-flex;
    gap: var(--space-md);
    flex-wrap: wrap;
    justify-content: center;
`;

export const RadioOption = styled.label`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: 400;

    input {
        width: 1rem;
        height: 1rem;
        accent-color: var(--color-main, var(--bs-primary));
    }
`;

export const DeletionGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(16rem, 0.55fr) minmax(20rem, 1fr);
    gap: var(--space-md);

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const CategoryList = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

export const CategoryOption = styled.label<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    min-height: 2.75rem;
    padding: 0 var(--space-sm);
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-border, #dbe1ea)')};
    border-radius: var(--radius-sm);
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-primary-rgb, 30, 94, 149), 0.08)' : 'var(--theme-surface, #ffffff)')};
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: 400;
    cursor: pointer;

    input {
        width: 1rem;
        height: 1rem;
        accent-color: var(--color-main, var(--bs-primary));
    }
`;

export const RelatedItemsPanel = styled(Panel)`
    display: grid;
    gap: var(--space-sm);
    align-content: start;
`;

export const EmptyRelated = styled.div`
    display: grid;
    place-items: center;
    min-height: 14rem;
    border: 1px dashed var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface-muted, #f8fafc);
    color: #000;
    font-size: var(--font-size-sm);
    text-align: center;
    padding: var(--space-md);
`;

export const EditorShell = styled.div`
    display: grid;
    gap: var(--space-sm);
    max-width: 58rem;
`;

export const EditorToolbar = styled.div`
    display: flex;
    gap: var(--space-xs);
    flex-wrap: wrap;
    padding: var(--space-xs);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface-muted, #f8fafc);
`;

export const ToolbarButton = styled.button<{ $strong?: boolean }>`
    min-width: 2.25rem;
    min-height: 2.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2xs);
    padding: 0 var(--space-xs);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-xs);
    background: var(--theme-surface, #ffffff);
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: ${({ $strong }) => ($strong ? 500 : 400)};
    cursor: pointer;

    &:hover,
    &:focus {
        border-color: var(--color-main, var(--bs-primary));
        color: #000;
        outline: none;
    }
`;

export const EditorTextarea = styled(Textarea)`
    min-height: 20rem;
    font-size: var(--font-size-sm);
    line-height: 1.5;
`;

export const EditorFooter = styled.div`
    display: flex;
    justify-content: space-between;
    gap: var(--space-sm);
    align-items: center;
    color: #000;
    font-size: var(--font-size-sm);

    @media (max-width: 620px) {
        display: grid;
    }
`;

export const InlineActions = styled.div<{ $align?: 'start' | 'end' }>`
    display: flex;
    justify-content: ${({ $align = 'end' }) => ($align === 'start' ? 'flex-start' : 'flex-end')};
    gap: var(--space-sm);
    flex-wrap: wrap;

    @media (max-width: 620px) {
        display: grid;
        grid-template-columns: 1fr;

        > button {
            width: 100%;
        }
    }
`;

export const HiddenText = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;

export const MetricGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

export const MetricCard = styled.div`
    display: grid;
    gap: var(--space-2xs);
    padding: var(--space-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface, #ffffff);

    span {
        color: #000;
        font-size: var(--font-size-xs);
        text-transform: uppercase;
    }

    strong {
        color: #000;
        font-size: var(--font-size-sm);
        font-weight: 400;
    }
`;

export const activeIconStyle = css`
    color: #000;
`;
