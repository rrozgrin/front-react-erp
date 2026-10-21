import styled, { css } from 'styled-components';
import { Input } from '@/common/components/Ui';

export const RootVars = styled.div`
    --bg: #ffffff;
    --panel: #ffffff;
    --line: #dcdcdc;
    --text: #1f2937;
    --muted: #6b7280;
    --item-selector-box-height: 61.45px;
`;

export const ItemSelectorContainer = styled.div`
    flex: 0 0 clamp(420px, 32vw, 620px);
    width: clamp(420px, 32vw, 620px);
    max-width: 100%;
    height: calc(100vh - 40px);
    min-width: 0;
    color: var(--text);
    background: var(--bg);
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    padding: 7px;
    box-sizing: border-box;
    overflow: auto;

    @media (max-width: 1023px) {
        flex: 0 0 auto;
        width: 100%;
        min-width: 0;
        height: auto;
        max-height: none;
        border-right: none;
        border-bottom: 1px solid var(--line);
        overflow: visible;
    }
`;

export const SearchBar = styled.div`
    width: 100%;
    margin-bottom: 14px;

    input {
        min-height: 58px;
        padding: 0 46px 0 12px;
        border-color: var(--line);
        border-radius: 0;
        background: #fff;
        color: #1f2937;
        font-size: var(--font-size-sm);
    }

    button {
        right: 12px;
        color: #0876d5;
    }
`;

export const SearchInput = styled(Input)`
    height: 100%;
    border: none;
    padding: 0 var(--space-sm);
    font-size: var(--font-size-xs);
    color: #5d5847;
`;

export const SearchButton = styled.button`
    border: none;
    border-left: 1px solid var(--line);
    color: #2b5e86;
    cursor: pointer;
    font-size: var(--font-size-sm);
    background: rgba(255, 255, 255, 0.22);
`;

export const SearchShortcutTrigger = styled.button.attrs({ 'data-app-font-exception': 'frente-caixa-shortcut' })`
    margin-top: 10px;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: 11px 14px;
    border: 1px solid rgba(43, 94, 134, 0.18);
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.65);
    color: var(--text);
    cursor: pointer;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.7) inset;
    transition: background 0.15s ease, transform 0.15s ease, border-color 0.15s ease;

    span {
        font-size: 0.92rem;
        font-weight: 600;
        color: #2f2f2f;
    }

    strong {
        min-width: 34px;
        padding: var(--space-2xs) var(--space-xs);
        border-radius: var(--radius-pill);
        background: rgba(43, 94, 134, 0.1);
        color: #2b5e86;
        font-size: 0.82rem;
        font-weight: 800;
        text-align: center;
    }

    svg {
        flex: 0 0 auto;
        color: #56708a;
    }

    &:hover {
        transform: translateY(-1px);
        border-color: rgba(43, 94, 134, 0.35);
        background: rgba(255, 255, 255, 0.82);
    }

    &:focus-visible {
        outline: 2px solid rgba(43, 94, 134, 0.45);
        outline-offset: 2px;
    }
`;

export const ExitShortcutTrigger = styled.button`
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    text-align: left;
    font: inherit;

    &:hover {
        text-decoration: underline;
    }

    &:focus-visible {
        outline: 2px solid rgba(43, 94, 134, 0.45);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
    }
`;

const fieldBoxStyles = css`
    width: 100%;
    height: var(--item-selector-box-height);
    min-height: var(--item-selector-box-height);
    max-height: var(--item-selector-box-height);
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2px;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    border: 1px solid var(--line);
`;

const fieldValueStyles = css`
    min-width: 0;
    max-width: 100%;
    font-family: Consolas, 'Courier New', monospace;
    font-size: var(--font-size-sm);
    line-height: 1.15;
    font-weight: 300;
    display: -webkit-box;
    max-height: calc(var(--font-size-sm) * 1.15 * 2);
    overflow: hidden;
    overflow-wrap: anywhere;
    word-break: break-word;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

export const ProductGrid = styled.div<{ $hasImage?: boolean }>`
    display: grid;
    grid-template-columns: ${({ $hasImage }) => ($hasImage ? 'minmax(0, 1.35fr) minmax(150px, 0.85fr)' : 'repeat(2, minmax(0, 1fr))')};
    grid-template-rows: ${({ $hasImage }) => ($hasImage ? 'repeat(4, var(--item-selector-box-height))' : 'repeat(4, var(--item-selector-box-height))')};
    grid-auto-rows: var(--item-selector-box-height);
    gap: 8px;
    border: 0;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    align-items: start;

    > * {
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
    }

    @media (max-width: 1023px) {
        grid-template-columns: ${({ $hasImage }) => ($hasImage ? '1fr' : '1fr 1fr')};
        grid-template-rows: auto;
    }

    @media (max-width: 575px) {
        grid-template-columns: 1fr;
    }
`;

export const ProductHeader = styled.div`
    grid-column: 1;
    grid-row: 1;
    ${fieldBoxStyles}

    @media (max-width: 1023px) {
        grid-column: 1 / -1;
        grid-row: auto;
    }
`;

export const ProductName = styled.div`
    margin-top: 0;
    ${fieldValueStyles}
`;

export const ImageFrame = styled.div`
    grid-column: 1;
    grid-row: 2 / 5;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: start;
    justify-self: center;
    width: min(100%, 202px);
    aspect-ratio: 1 / 1;
    padding: 4px;
    background: #fff;
    border: 1px solid var(--line);

    @media (max-width: 1023px) {
        grid-column: 1 / -1;
        grid-row: auto;
        width: min(100%, 280px);
    }
`;

export const ProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const DataBox = styled.div`
    ${fieldBoxStyles}
`;

export const QuantityBox = styled(DataBox)`
    grid-column: 2;
    grid-row: 2;

    @media (max-width: 1023px) {
        grid-column: auto;
        grid-row: auto;
    }

    @media (max-width: 575px) {
        grid-column: 1;
    }
`;

export const UnitBox = styled(DataBox)`
    grid-column: 2;
    grid-row: 3;

    @media (max-width: 1023px) {
        grid-column: auto;
        grid-row: auto;
    }

    @media (max-width: 575px) {
        grid-column: 1;
    }
`;

export const BarcodeBox = styled(DataBox)`
    grid-column: 2;
    grid-row: 1;

    @media (max-width: 1023px) {
        grid-column: auto;
        grid-row: auto;
    }

    @media (max-width: 575px) {
        grid-column: 1;
    }
`;

export const TotalBox = styled(DataBox)`
    grid-column: 2;
    grid-row: 4;

    @media (max-width: 1023px) {
        grid-column: auto;
        grid-row: auto;
    }

    @media (max-width: 575px) {
        grid-column: 1;
    }
`;

export const DataLabel = styled.span`
    color: #0876d5;
    font-family: Consolas, 'Courier New', monospace;
    font-size: 10px;
    line-height: 1.15;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: uppercase;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const DataValue = styled.strong`
    ${fieldValueStyles}
`;

export const Shortcuts = styled.div.attrs({ 'data-app-font-exception': 'frente-caixa-shortcuts' })`
    margin-top: auto;
    padding: 14px;
    border: 1px solid var(--line);
    background: #fff;
    font-family: Consolas, 'Courier New', monospace;
    font-size: 11px;
    line-height: 1.05;
    flex: 0 0 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (max-width: 1023px) {
        display: none;
    }
`;

export const ShortcutsTitle = styled.div`
    display: flex;
    align-items: center;
    font-family: Consolas, 'Courier New', monospace;
    font-size: var(--font-size-sm);
    font-weight: 500;
    gap: var(--space-xs);
    color: #111827;
`;

export const ShortcutsColumns = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(14px, 4vw, 42px);

    @media (max-width: 575px) {
        grid-template-columns: 1fr;
    }
`;

export const ShortcutsList = styled.div`
    display: grid;
    gap: 1px;
    color: #111827;
    font-weight: 500;
    overflow: visible;

    span {
        white-space: normal;
        overflow-wrap: anywhere;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font: inherit;
        text-align: left;
    }

    button strong {
        min-width: 46px;
        border-radius: var(--radius-pill);
        background: rgba(43, 94, 134, 0.1);
        color: #2b5e86;
        font-size: 0.78rem;
        font-weight: 800;
        text-align: center;
    }
`;
