import styled from 'styled-components';
import { Input as UiInput, Radio as UiRadio, Select as UiSelect } from '@/common/components/Ui';

export const Content = styled.div`
    padding: var(--space-lg);
    display: grid;
    gap: 22px;
`;

export const Section = styled.div`
    display: grid;
    gap: var(--space-sm);
`;

export const Label = styled.span`
    font-weight: 600;
    color: var(--theme-text, #0f172a);
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const Field = styled.div`
    display: grid;
    gap: 6px;

    span {
        font-size: 0.85rem;
        color: #475569;
    }
`;

export const Input = styled(UiInput)`
    padding: 10px;
    border-radius: 0.125rem;
    border: 1px solid rgba(148, 163, 184, 0.4);
`;

export const Select = styled(UiSelect)`
    padding: 10px;
    border-radius: 0.125rem;
    border: 1px solid rgba(148, 163, 184, 0.4);
`;

export const Radio = styled(UiRadio)``;

export const Card = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 14px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 0.125rem;
    background: rgba(37, 99, 235, 0.04);
`;

export const Preview = styled.div`
    width: var(--control-height-lg);
    height: 70px;
    border: 1px solid #ccc;
    display: grid;
    place-items: center;
    font-weight: bold;
`;
