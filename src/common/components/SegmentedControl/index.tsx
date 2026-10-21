import type { ReactNode } from 'react';
import styled from 'styled-components';

type SegmentedControlSize = 'default' | 'compact';

export interface SegmentedControlOption {
    value: string;
    label: ReactNode;
}

interface SegmentedControlProps {
    ariaLabel: string;
    onChange: (value: string) => void;
    options: SegmentedControlOption[];
    size?: SegmentedControlSize;
    value: string;
}

const Control = styled.div`
    display: inline-flex;
    align-items: stretch;
    align-self: center;
    justify-self: start;
    width: max-content;
    max-width: 100%;
    overflow: hidden;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    background: #ffffff;
`;

const OptionButton = styled.button<{ $active?: boolean; $size: SegmentedControlSize }>`
    min-height: ${({ $size }) => ($size === 'compact' ? '24px' : '38px')};
    padding: ${({ $size }) => ($size === 'compact' ? '0 10px' : '0 14px')};
    border: 0;
    border-right: 1px solid #cbd5e1;
    background: ${({ $active }) => ($active ? '#f1f5f9' : '#ffffff')};
    color: ${({ $active }) => ($active ? '#000000' : '#495057')};
    font-size: ${({ $size }) => ($size === 'compact' ? '0.78rem' : '0.84rem')};
    font-weight: ${({ $active }) => ($active ? 600 : 500)};
    letter-spacing: 0.01em;
    cursor: pointer;
    transition: background 0.18s ease, color 0.18s ease;

    &:last-child {
        border-right: 0;
    }

    &:hover {
        background: ${({ $active }) => ($active ? '#f1f5f9' : '#f8fafc')};
        color: #000000;
    }

    &:focus-visible {
        position: relative;
        z-index: 1;
        outline: 3px solid rgba(100, 116, 139, 0.22);
        outline-offset: -3px;
    }
`;

export const SegmentedFieldHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xs);
    height: 26px;
    min-height: 26px;
`;

export const SegmentedFieldLabel = styled.label.attrs({ 'data-app-font-exception': true })`
    font-size: 0.95rem;
    font-weight: 500;
    color: #000000;
`;

export const SegmentedControl = ({
    ariaLabel,
    onChange,
    options,
    size = 'default',
    value,
}: SegmentedControlProps) => (
    <Control role="group" aria-label={ariaLabel}>
        {options.map((option) => (
            <OptionButton
                key={option.value}
                type="button"
                $active={option.value === value}
                $size={size}
                aria-pressed={option.value === value}
                onClick={() => onChange(option.value)}
            >
                {option.label}
            </OptionButton>
        ))}
    </Control>
);
