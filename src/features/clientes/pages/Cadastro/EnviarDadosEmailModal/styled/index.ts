import styled from 'styled-components';
import { Input as UiInput } from '../../../../../../common/components/Ui';

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background:
        radial-gradient(circle at 15% 20%, rgba(var(--bs-primary-rgb, 13, 110, 253), 0.18), transparent 44%),
        radial-gradient(circle at 80% 85%, rgba(var(--bs-secondary-rgb, 33, 78, 140), 0.14), transparent 48%),
        var(--theme-overlay, rgba(15, 23, 42, 0.45));
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
    padding: 20px;
`;

export const Dialog = styled.div`
    width: 100%;
    max-width: var(--table-min-width-compact);
    border-radius: 1rem;
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.2));
    background: var(--theme-surface, #ffffff);
    box-shadow:
        0 24px 60px rgba(15, 23, 42, 0.28),
        0 6px 18px rgba(15, 23, 42, 0.16);
    overflow: hidden;
    animation: modal-enter 200ms ease-out;

    @keyframes modal-enter {
        from {
            opacity: 0;
            transform: translateY(6px) scale(0.985);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: 20px var(--space-lg);
    border-bottom: 1px solid var(--theme-border, rgba(15, 23, 42, 0.16));

    @media (max-width: 520px) {
        padding: var(--space-md);
    }

    h2 {
        margin: 0;
        font-size: var(--font-size-xs);
        font-weight: 400;
        color: #000;
        letter-spacing: -0.01em;
    }
`;

export const HeaderLeft = styled.div`
    min-width: 0;
    flex: 1;
    display: flex;
    align-items: flex-start;
    gap: 14px;

    @media (max-width: 520px) {
        gap: 10px;
    }
`;

export const HeaderIcon = styled.div`
    width: 36px;
    height: 36px;
    border-radius: var(--radius-pill);
    background: var(--theme-surface-soft, rgba(15, 23, 42, 0.1));
    color: var(--color-main, var(--bs-primary));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;

    svg {
        font-size: 1.2rem;
    }
`;

export const TitleWrap = styled.div`
    min-width: 0;
    display: grid;
    gap: var(--space-2xs);

    p {
        margin: 0;
        font-size: var(--font-size-sm);
        color: #000;
    }
`;

export const Body = styled.div`
    padding: 18px var(--space-lg) 18px;

    @media (max-width: 520px) {
        padding: var(--space-md);
    }
`;

export const SectionTitle = styled.h3`
    margin: 0 0 14px;
    font-size: var(--font-size-xs);
    color: #000;
    font-weight: 500;
`;

export const Divider = styled.hr`
    border: 0;
    border-top: 1px solid var(--theme-border, rgba(15, 23, 42, 0.18));
    margin: 14px 0 18px;
`;

export const Form = styled.form`
    display: grid;
    gap: var(--space-sm);
`;

export const FieldGroup = styled.label`
    display: grid;
    gap: 6px;
`;

export const FieldLabel = styled.span`
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const InputShell = styled.div`
    min-height: var(--control-height-sm);
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.24));
    border-radius: 10px;
    background: var(--theme-surface, #ffffff);
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    align-items: center;
    overflow: hidden;
    transition: border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease;

    &:focus-within {
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: 0 0 0 3px rgba(var(--bs-primary-rgb, 13, 110, 253), 0.18);
        background: var(--theme-surface, #ffffff);
    }
`;

export const InputIcon = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid var(--theme-border, rgba(15, 23, 42, 0.2));
    color: #000;

    svg {
        font-size: var(--font-size-sm);
    }
`;

export const Input = styled(UiInput)`
    min-height: var(--control-height-sm);
    border: none;
    background: transparent;
    outline: none;
    padding: var(--space-xs) 10px;
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: 400;

    &::placeholder {
        color: #000;
    }
`;

export const InfoBox = styled.div`
    margin-top: var(--space-2xs);
    min-height: 46px;
    border-radius: 9px;
    background: var(--theme-surface-soft, rgba(15, 23, 42, 0.08));
    color: #000;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 var(--space-sm);
    font-size: var(--font-size-sm);

    svg {
        font-size: var(--font-size-sm);
        flex: 0 0 auto;
    }

    @media (max-width: 520px) {
        font-size: var(--font-size-sm);
    }
`;
