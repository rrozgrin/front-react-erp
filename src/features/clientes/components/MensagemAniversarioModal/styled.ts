import styled from 'styled-components';
import { Textarea as UiTextarea } from '@/common/components/Ui';

export const InputShell = styled.div`
    display: flex;
    align-items: center;
    min-height: 47px;
    padding: 0 var(--space-md);
    border: 1px solid var(--theme-border, var(--bs-border-color));
    border-radius: 0.125rem;
    background: var(--theme-surface, var(--bs-white));

    input {
        flex: 1;
        min-width: 0;
        border: none;
        outline: none;
        background: transparent;
        color: var(--theme-text, var(--bs-body-color));
        font-size: 0.88rem;
    }

    &:focus-within {
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: 0 0 0 4px rgba(var(--bs-primary-rgb), 0.12);
    }
`;

export const Content = styled.div`
    padding: var(--space-lg);
    display: grid;
    gap: 20px;
`;

export const Description = styled.p`
    margin: 0;
    color: #475569;
`;

export const Field = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

export const Label = styled.label`
    font-weight: 600;
`;

export const Textarea = styled(UiTextarea)`
    min-height: 120px;
    padding: var(--space-sm);
    border: 1px solid rgba(148, 163, 184, 0.4);
    border-radius: 0.125rem;
    resize: vertical;
`;

export const Helper = styled.span`
    color: #64748b;
    font-size: 0.8rem;
`;

export const CheckboxGroup = styled.div`
    display: flex;
    gap: var(--space-md);
`;

export const CheckboxItem = styled.label`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.9rem;
`;

export const RadioGroup = styled.div`
    display: flex;
    gap: var(--space-md);
`;

export const Info = styled.span`
    color: #64748b;
    font-size: 0.8rem;
`;
