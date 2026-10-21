import styled from 'styled-components';
import { AppButtonBase } from '../Buttons/buttonBase';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

const modalWidths: Record<ModalSize, string> = {
    sm: '480px',
    md: '640px',
    lg: '860px',
    xl: '980px',
};

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

export const Dialog = styled.div<{ $size: ModalSize }>`
    width: min(${({ $size }) => modalWidths[$size]}, 100%);
    background: #ffffff;
    border: 1px solid #d8e2ef;
    border-radius: var(--radius-sm);
    box-shadow: 0 24px 70px rgba(15, 23, 42, 0.26);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: calc(100dvh - 64px);

    input:not([type='radio']):not([type='checkbox']):not([type='file']),
    select {
        min-height: 40px;
        height: 40px;
    }

    label {
        font-weight: 500 !important;
    }

    @media (max-width: 767px) {
        width: 100%;
        min-height: 100dvh;
        max-height: 100dvh;
        border-radius: 0;
        border: 0;
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: var(--space-md);
    border-bottom: 1px solid #d8e2ef;
    background: #ffffff;
`;

export const HeaderContent = styled.div`
    min-width: 0;
`;

export const Title = styled.h3`
    margin: 0;
    color: #000;
    font-size: 1.08rem;
    font-weight: 500;
`;

export const Subtitle = styled.p.attrs({ 'data-app-title': true })`
    margin: 6px 0 0;
    color: #000;
    font-size: 0.92rem;
    line-height: 1.45;
`;

export const CloseButton = styled.button`
    border: 0;
    background: transparent;
    color: #ef9a9a;
    cursor: pointer;
    padding: var(--space-2xs);
    flex: 0 0 auto;
`;

export const Body = styled.div`
    flex: 1;
    display: grid;
    gap: var(--space-md);
    padding: 18px var(--space-md);
    min-height: 0;
    overflow: auto;
    background: #ffffff;
`;

export const Footer = styled.footer`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-xs);
    flex-wrap: wrap;
    padding: var(--space-md);
    border-top: 1px solid #d8e2ef;
    background: #ffffff;

    > * {
        flex: 0 0 auto;
    }

    button {
        width: auto;
    }

    @media (max-width: 767px) {
        padding: 14px var(--space-md) calc(22px + env(safe-area-inset-bottom, 0px));
        margin-bottom: 10px;
        background: #ffffff;
    }
`;

export const ModalActionButton = styled(AppButtonBase).attrs({ $size: 'modal' })``;

export const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: var(--space-xs);
    flex-wrap: wrap;
`;

export const ModalForm = styled.form`
    display: grid;
    gap: var(--space-md);
`;

export const FormRow = styled.label`
    display: grid;
    grid-template-columns: 180px 1fr;
    align-items: center;
    gap: var(--space-sm);
    color: #000;
    font-size: 0.9rem;
    font-weight: 500 !important;

    input:not([type='radio']):not([type='checkbox']),
    select,
    textarea {
        width: 100%;
        min-height: 40px;
        border: 1px solid #cbd5e1;
        border-radius: 0.125rem;
        padding: 6px var(--space-xs);
        color: #000;
        background: #ffffff;
    }

    textarea {
        min-height: 96px;
        resize: vertical;
    }

    small {
        display: block;
        margin-top: 6px;
        color: #000;
        font-weight: 400;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 6px;
    }
`;

export const InlineOptions = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-md);
    flex-wrap: wrap;

    label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.9rem;
        font-weight: 400;
    }

    input[type='radio'],
    input[type='checkbox'] {
        width: 16px;
        min-width: 16px;
        height: 16px;
        min-height: 16px;
        margin: 0;
        padding: 0;
        flex: 0 0 auto;
    }
`;

export type { ModalSize };
