import styled from 'styled-components';
import { Input } from '@/common/components/Ui';

export const ModalBody = styled.div`
    display: grid;
    gap: var(--space-md);
`;

export const InfoText = styled.p`
    margin: 0;
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-md);
    font-style: italic;
`;

export const FieldGroup = styled.div`
    display: grid;
    gap: var(--space-xs);
    align-items: start;

    @media (max-width: 768px) {
        gap: var(--space-xs);
    }
`;

export const FieldStack = styled.div`
    display: grid;
    gap: 6px;
`;

export const FieldLabel = styled.label`
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;

    small {
        color: #ef4444;
        margin-left: var(--space-2xs);
    }
`;

export const FieldInput = styled(Input)`
    min-height: 44px;
    border-radius: var(--radius-md);
    padding: 0 var(--space-md);
    font-size: var(--font-size-sm);

    &::placeholder {
        color: #000
    }
`;
