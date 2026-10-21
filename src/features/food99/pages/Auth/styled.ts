import styled from 'styled-components';
import { Food99ActionButton } from '../../shared/filterControls';

export const AuthLayout = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 32px;
    min-height: 520px;
`;

export const AuthCard = styled.section`
    width: min(100%, 490px);
    padding: 40px 52px;
    border: 1px solid var(--theme-border, #d8dee8);
    background: var(--theme-surface, #fff);
    box-sizing: border-box;
    display: grid;
    gap: var(--space-md);
`;

export const AuthIcon = styled.div`
    display: grid;
    width: 64px;
    height: 64px;
    margin: 0 auto 18px;
    place-items: center;
    border-radius: 50%;
    background: #ffdc00;
    color: #111827;
    font-size: 28px;
`;

export const AuthContent = styled.div`
    margin-bottom: var(--space-sm);
    text-align: center;

    h2 { margin: 0 0 10px; color: #111827; font-size: 1.45rem; }
    p { margin: 0; color: #475569; line-height: 1.55; }
`;

export const Field = styled.label`
    display: grid;
    gap: 6px;
    color: #111827;
    font-size: var(--font-size-xs);
    font-weight: 700;

`;

export const FieldGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 0;

    @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const Control = styled.input`
    width: 100%;
    height: 38px;
    margin-top: 0;
    padding: 0 11px;
    border: 1px solid #cbd5e1;
    border-radius: 2px;
    background: #fff;
    color: #0f172a;
`;

export const FormInput = Control;
export const FormSelect = styled.select`
    width: 100%;
    height: 38px;
    margin-top: 0;
    padding: 0 11px;
    border: 1px solid #cbd5e1;
    border-radius: 2px;
    background: #fff;
    color: #0f172a;
`;

export const ActionsRow = styled.div`
    display: flex;
    gap: 10px;
    margin-top: var(--space-sm);
`;

export const ActionButton = styled(Food99ActionButton)`
    flex: 1;
    justify-content: center;
    &:disabled { cursor: not-allowed; opacity: .58; }
`;

export const HelpCard = styled.aside`
    width: min(100%, 355px);
    padding: 30px;
    border: 1px solid var(--theme-border, #d8dee8);
    background: var(--theme-surface, #fff);

    h3 { margin: 0 0 20px; color: #111827; font-size: 1.15rem; }
`;

export const HelpStep = styled.p`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 15px 0;
    color: #334155;
    font-size: var(--font-size-sm);

    span {
        display: grid;
        flex: 0 0 26px;
        width: 26px;
        height: 26px;
        place-items: center;
        border-radius: 50%;
        background: #ffdc00;
        color: #111827;
        font-weight: 800;
    }
`;

export const LinkPreviewBlock = styled.div`margin-top: 24px;`;
export const LinkLabel = styled.span`display: block; margin-bottom: 6px; color: #111827; font-size: var(--font-size-xs); font-weight: 700;`;
export const LinkBox = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 7px;
    @media (max-width: 560px) { grid-template-columns: 1fr; }
`;
export const LinkInput = styled.div`
    display: flex;
    align-items: center;
    min-width: 0;
    height: 38px;
    padding: 0 11px;
    overflow: hidden;
    border: 1px solid #cbd5e1;
    border-radius: 2px;
    color: #475569;
    font-size: var(--font-size-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
`;
export const InfoNotice = styled.div<{ $tone?: 'error' | 'success' }>`
    margin-top: var(--space-md);
    color: ${({ $tone }) => ($tone === 'error' ? '#b91c1c' : '#15803d')};
    font-size: var(--font-size-sm);
    font-weight: 500;
`;
