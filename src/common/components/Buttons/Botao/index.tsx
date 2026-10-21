import React from 'react';
import styled from 'styled-components';
import { AppButtonBase, type AppButtonVariant } from '../buttonBase';

type BotaoColor = 'add' | 'close';

interface BotaoProps {
    nome: string;
    action: () => void;
    ariaLabel?: string;
    className?: string;
    disabled?: boolean;
    icone?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant?: AppButtonVariant;
    color?: BotaoColor;
    Color?: BotaoColor;
}

const colorVariantMap: Record<BotaoColor, AppButtonVariant> = {
    add: 'success',
    close: 'danger',
};

export const Botao: React.FC<BotaoProps> = ({ nome, action, ariaLabel, className, disabled = false, icone, type = 'button', variant, color, Color }) => {
    const resolvedColor = color ?? Color;
    const resolvedVariant = resolvedColor ? colorVariantMap[resolvedColor] : variant ?? 'secondary';

    return (
        <StyledButton
            aria-label={ariaLabel}
            className={className}
            disabled={disabled}
            type={type}
            $variant={resolvedVariant}
            onClick={action}
        >
            {icone}
            <span>{nome}</span>
        </StyledButton>
    );
};

const StyledButton = styled(AppButtonBase).attrs({ $size: 'page' })`
    min-height: 38px;
    padding: 0 var(--space-sm);
    font-weight: 400;
`;
