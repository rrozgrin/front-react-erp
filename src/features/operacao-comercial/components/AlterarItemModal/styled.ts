import styled from 'styled-components';
import { Input } from '@/common/components/Ui';

export const ModalBody = styled.div`
    display: grid;
    gap: 18px;
`;

export const HelpText = styled.p`
    margin: 0;
    color: #000;
    font-size: var(--font-size-sm);
    line-height: 1.45;
`;

export const LookupGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(180px, 260px) minmax(0, 1fr) minmax(230px, 300px);
    gap: var(--space-md);
    align-items: start;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
        gap: var(--space-sm);
    }
`;

export const FieldStack = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

export const FieldLabel = styled.label`
    display: grid;
    gap: var(--space-xs);
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;

    small {
        color: #ef4444;
        font-weight: 500;
        margin-left: var(--space-2xs);
    }
`;

export const RequiredMark = styled.small`
    color: #ef4444;
    font-weight: 500;
`;

export const SelectLikeField = styled.div`
    display: grid;
    grid-template-columns: 1fr 40px;
    align-items: stretch;
    min-height: var(--control-height-sm);
    border: 1px solid var(--theme-border, #cbd5e1);
    border-radius: var(--radius-md);
    overflow: hidden;
    background: var(--theme-surface, #ffffff);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus-within {
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: 0 0 0 3px rgba(var(--bs-primary-rgb, 13, 110, 253), 0.14);
    }
`;

export const SelectLikeInput = styled(Input)`
    border: 0;
    padding: 0 14px;
    font-size: var(--font-size-sm);
    color: #000;
    background: transparent;

    &::placeholder {
        color:#000;
    }
`;

export const SelectLikeTrigger = styled.button`
    border: 0;
    border-left: 1px solid var(--theme-border, #cbd5e1);
    background: var(--theme-surface-muted, #f8fafc);
    color: #000;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const HintBlock = styled.div`
    display: grid;
    gap: var(--space-xs);
    align-content: start;
    color: #000;
    font-size: 0.9rem;
    line-height: 1.45;
    padding-top: var(--space-lg);

    @media (max-width: 860px) {
        padding-top: 0;
    }
`;

export const FieldsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-md) 18px;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
        gap: var(--space-sm);
    }
`;

export const FormField = styled.label`
    display: grid;
    gap: var(--space-xs);
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;

`;

export const FormInput = styled(Input)`
    width: 100%;
    min-height: var(--control-height-sm);
    border-radius: var(--radius-md);
    padding: 0 var(--space-sm);
    font-size: var(--font-size-sm);
    color: #000;
    font-weight: 400;

    &[readonly] {
        background: #f3f4f6;
        color: #000;
    }
`;

export const FieldWithSide = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1fr;
    gap: var(--space-md);
    align-items: start;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
        gap: var(--space-sm);
    }
`;

export const FooterText = styled.div`
    margin-right: auto;
    color: #000;
    font-size: var(--font-size-sm);
    line-height: 1.35;
`;
