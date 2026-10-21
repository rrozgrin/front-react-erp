import styled from 'styled-components';
import { AppButtonBase } from '../Buttons/buttonBase';
import { Select as UiSelect, Textarea as UiTextarea } from '../Ui';

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1050;
    display: grid;
    place-items: start center;
    padding: var(--space-xl) var(--space-md);
    background: rgba(15, 23, 42, 0.58);
    overflow-y: auto;

    @media (max-width: 767px) {
        padding: 0;
        place-items: stretch;
    }
`;

export const Dialog = styled.div`
    width: min(1080px, 100%);
    max-height: calc(100dvh - 64px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius-sm);
    padding: var(--space-lg) 28px 20px;
    background: #ffffff;
    border: 1px solid #d8e2ef;
    box-shadow: 0 24px 70px rgba(15, 23, 42, 0.26);
    scrollbar-width: thin;
    scrollbar-color: #6b7280 #f1f5f9;

    input:not([type='radio']):not([type='checkbox']):not([type='file']),
    select {
        min-height: 40px;
        height: 40px;
    }

    label {
        font-weight: 500 !important;
    }

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f5f9;
    }

    &::-webkit-scrollbar-thumb {
        background: #6b7280;
        border-radius: var(--radius-pill);
        border: 2px solid #f1f5f9;
    }

    @media (max-width: 767px) {
        width: 100%;
        max-width: 100%;
        max-height: 100dvh;
        height: 100dvh;
        padding: var(--space-md);
        border-radius: 0;
        border: none;
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    margin-bottom: var(--space-2xs);
    flex-shrink: 0;

    @media (max-width: 768px) {
        position: sticky;
        top: 0;
        z-index: 2;
        margin: calc(var(--space-md) * -1) calc(var(--space-md) * -1) var(--space-md);
        padding: var(--space-md) var(--space-md) var(--space-sm);
        background: #ffffff;
        border-bottom: 1px solid #d8e2ef;
    }
`;

export const HeaderContent = styled.div`
    min-width: 0;
`;

export const Eyebrow = styled.span`
    display: inline-flex;
    margin-bottom: 10px;
    padding: 6px var(--space-sm);
    border-radius: 0.125rem;
    font-size: var(--font-size-xs);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #000000;
    background: #f8fafc;
`;

export const Title = styled.h2`
    margin: 0;
    color: #000000;
    font-size: 1.08rem;
    font-weight: 500;
`;

export const Subtitle = styled.p.attrs({ 'data-app-title': true })`
    max-width: 680px;
    color: #000000;
    line-height: 1.4;
`;

export const CloseButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    color: #ef9a9a;
    cursor: pointer;
    padding: var(--space-2xs);
    flex: 0 0 auto;
    line-height: 0;
    transition: color 0.2s ease;

    &:hover {
        color: #dc2626;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
`;

export const ScrollArea = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-right: var(--space-xs);
    scrollbar-width: thin;
    scrollbar-color: #6b7280 #f1f5f9;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f5f9;
    }

    &::-webkit-scrollbar-thumb {
        background: #6b7280;
        border-radius: var(--radius-pill);
        border: 2px solid #f1f5f9;
    }

    @media (max-width: 768px) {
        padding-right: 0;
        padding-bottom: var(--space-sm);
    }
`;

export const ModeToggleButton = styled.button<{ $active?: boolean }>`
    align-self: flex-start;
    min-height: 46px;
    padding: 0 18px;
    border: 1px solid #d8e2ef;
    border-radius: 0.125rem;
    background: #ffffff;
    color: #000000;
    font-size: 0.94rem;
    font-weight: 500;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease, border-color 0.3s ease, color 0.3s ease;

    &:hover {
        transform: translateY(-1px);
        border-color: #111827;
        box-shadow: 0 10px 20px rgba(15, 23, 42, 0.1);
    }
`;

export const HeroIndicator = styled.span<{ $active: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--control-height-sm);
    height: var(--control-height-sm);
    border-radius: var(--radius-pill);
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-light-rgb), 0.24)' : 'rgba(var(--bs-light-rgb), 0.14)')};
    color: var(--color-font, var(--bs-white));
`;

export const SectionHeading = styled.div.attrs({ 'data-app-title': true })`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    color: #000000;
    font-size: 14px;
    font-weight: 500;
`;

export const SectionLine = styled.div`
    flex: 1;
    height: 1px;
    background: #d8e2ef;
`;

type FieldGridColumns = 1 | 2 | 3 | 4 | 5;

export const FieldsGrid = styled.div<{ $columns?: FieldGridColumns }>`
    display: grid;
    grid-template-columns: ${({ $columns = 2 }) => `repeat(${$columns}, minmax(0, 1fr))`};
    gap: 18px;

    @media (max-width: 1024px) {
        grid-template-columns: ${({ $columns = 2 }) => ($columns === 1 ? '1fr' : 'repeat(2, minmax(0, 1fr))')};
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const Field = styled.div<{ $span?: FieldGridColumns }>`
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    grid-column: span ${({ $span = 1 }) => $span};
    min-width: 0;

    @media (max-width: 1024px) {
        grid-column: ${({ $span = 1 }) => ($span > 1 ? '1 / -1' : 'auto')};
    }

    @media (max-width: 768px) {
        grid-column: auto;
    }
`;

export const Label = styled.label.attrs({ 'data-app-font-exception': true })`
    font-size: 13px;
    font-weight: 500 !important;
    color: #000000;
`;

export const InputShell = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 40px;
    padding: 0 14px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    color: #64748b;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    svg {
        flex-shrink: 0;
        color: #64748b;
    }

    input {
        flex: 1;
        min-width: 0;
        width: 100%;
        min-height: 40px;
        height: 40px;
        padding: 0;
        border: none;
        outline: none;
        background: transparent;
        box-shadow: none;
        color: #0f172a;
        font-size: 0.9rem;
        line-height: 1.4;

        &:focus {
            border: none;
            box-shadow: none;
        }
    }

    input::placeholder {
        color: #94a3b8;
    }

    &:focus-within {
        border-color: #94a3b8;
        background: #ffffff;
        box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.18);
    }
`;

export const Select = styled(UiSelect)`
    min-height: 40px;
    padding: 0 14px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    color: #0f172a;
    font-size: 0.9rem;

    &:focus {
        border-color: #94a3b8;
        box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.18);
    }
`;

export const Textarea = styled(UiTextarea)`
    min-height: 120px;
    padding: var(--space-md);
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    color: #0f172a;
    font-size: 0.9rem;

    &::placeholder {
        color: #94a3b8;
    }

    &:focus {
        border-color: #94a3b8;
        box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.18);
    }
`;

export const LookupHint = styled.span`
    color: #495057;
    font-size: 0.86rem;
    line-height: 1.5;
`;

export const LookupStatus = styled.span<{ $status: 'idle' | 'loading' | 'success' | 'error' }>`
    font-size: 0.88rem;
    font-weight: 500;
    color: ${({ $status }) =>
        $status === 'error'
            ? '#b42318'
            : $status === 'success'
                ? '#067647'
                : '#000000'};
`;

export const StepBadges = styled.div`
    position: sticky;
    top: 12px;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 74px;
    padding: 6px 0;

    @media (max-width: 860px) {
        position: static;
        flex-direction: row;
        overflow-x: auto;
        width: 100%;
        padding-bottom: 6px;
        scroll-snap-type: x proximity;
    }
`;

export const StepBadge = styled.button<{ $active: boolean; $done: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    min-width: 52px;
    height: 52px;
    padding: 0;
    border: 1px solid ${({ $active, $done }) =>
        $active || $done ? '#cbd5e1' : '#d8e2ef'};
    background: ${({ $active, $done }) =>
        $active
            ? '#e5e7eb'
            : $done
                ? '#f1f5f9'
                : '#ffffff'};
    color: #000000;
    border-radius: var(--radius-pill);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        border-color: #cbd5e1;
        box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
    }

    &::after {
        content: attr(data-tooltip);
        position: absolute;
        left: calc(100% + 14px);
        top: 50%;
        transform: translateY(-50%);
        min-width: 220px;
        max-width: 280px;
        padding: 10px var(--space-sm);
        border-radius: var(--radius-xl);
        background: rgba(15, 23, 42, 0.94);
        color: #ffffff;
        font-size: 0.82rem;
        line-height: 1.45;
        text-align: left;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.18s ease, transform 0.18s ease;
        box-shadow: 0 16px 32px rgba(15, 23, 42, 0.24);
    }

    &:hover::after {
        opacity: 1;
        transform: translateY(-50%) translateX(2px);
    }

    @media (max-width: 860px) {
        scroll-snap-align: start;

        &::after {
            left: 50%;
            top: calc(100% + 12px);
            transform: translateX(-50%);
        }

        &:hover::after {
            transform: translateX(-50%) translateY(2px);
        }
    }
`;

export const StepPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: var(--space-lg) 26px;
    border: 0;
    border-radius: 0;
    background: #ffffff;
    box-shadow: none;

    > button {
        align-self: flex-end;
        width: auto;
        flex: 0 0 auto;
    }

    @media (max-width: 768px) {
        padding: 18px;
        border-radius: 1rem;
    }
`;

export const StepNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-sm);
    color: #495057;
    font-size: 0.9rem;
    padding: 0 var(--space-2xs);

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const StepLayout = styled.div`
    display: grid;
    grid-template-columns: 70px minmax(0, 1fr);
    gap: 18px;
    align-items: flex-start;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

export const StepProgress = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    span {
        font-size: 0.85rem;
        font-weight: 500;
        color: #495057;
        letter-spacing: 0.02em;
    }
`;

export const StepProgressFill = styled.div<{ $progress: number }>`
    width: ${({ $progress }) => `${$progress}%`};
    height: 5px;
    flex-shrink: 0;
    margin-bottom: var(--space-xs);
    border-radius: 0;
    background: #111827;
    transition: width 0.25s ease;

    @media (max-width: 768px) {
        margin-bottom: var(--space-md);
    }
`;

export const StepBadgeNumber = styled.span<{ $active: boolean; $done: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-pill);
    background: ${({ $active, $done }) =>
        $active
            ? '#d1d5db'
            : $done
                ? '#e2e8f0'
                : '#f8fafc'};
    color: #000000;
    font-size: 0.86rem;
    font-weight: 600;
    flex-shrink: 0;
`;

export const Footer = styled.div <{ $active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-xs);
    flex-wrap: wrap;
    flex-shrink: 0;
    margin-top: var(--space-xs);
    background: #ffffff;
    color: #000000;
    font-size: 0.94rem;
    font-weight: 400;
    padding: 15px 0 0;
    border-top: 1px solid #d8e2ef;

    @media (max-width: 768px) {
        margin: 0 calc(16px * -1) calc(16px * -1);
        padding: var(--space-sm) var(--space-md) calc(var(--space-md) + env(safe-area-inset-bottom));
    }
`;

export const HelperText = styled.p`
    margin: 0;
    color: #495057;
    font-size: 0.92rem;
    max-width: 700px;
`;

export const Actions = styled.div<{ $active?: boolean }>`
    display: flex;
    gap: var(--space-xs);
    flex-wrap: wrap;
    width: auto;
    margin-left: auto;
    align-items: center;
    justify-content: flex-end;
    background: #ffffff;
    color: #000000;
    font-size: 0.94rem;
    font-weight: 400;

    > * {
        flex: 0 0 auto;
    }

    @media (max-width: 768px) {
        button {
            width: auto;
        }
    }
`;

const StepButtonBase = styled(AppButtonBase).attrs({ $size: 'step' })`
    width: auto;
    flex: 0 0 auto;

    @media (max-width: 768px) {
        width: auto;
    }
`;

export const StepActionButton = styled(StepButtonBase)``;

export const ElevatedStepActionButton = styled(StepActionButton)`
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.14);
`;

export const RadioGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: var(--space-sm);
`;

export const OptionGroup = styled.div<{ $center?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: ${({ $center }) => ($center ? 'center' : 'flex-start')};
    gap: var(--space-md);
    flex-wrap: wrap;
`;

export const InlineOption = styled.label<{ $small?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: #000000;
    cursor: pointer;
    font-size: ${({ $small }) => ($small ? '14px' : 'inherit')};
    font-weight: 400;

    input {
        cursor: pointer;
    }

    input[type='radio'],
    input[type='checkbox'] {
        width: 1rem;
        min-width: 1rem;
        height: 1rem;
        min-height: 1rem;
        margin: 0;
        padding: 0;
        flex: 0 0 auto;
    }
`;

export const RepeatedBlock = styled.div<{ $compact?: boolean }>`
    margin-bottom: ${({ $compact }) => ($compact ? '20px' : 'var(--space-lg)')};
    padding-bottom: ${({ $compact }) => ($compact ? '20px' : 'var(--space-lg)')};
    border-bottom: 1px solid #d8e2ef;
`;

export const FullWidthStepActionButton = styled(StepActionButton)`
    width: auto;
    align-self: flex-end;
`;
