import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdArrowRoundBack } from "react-icons/io";

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--control-height-sm);
    padding: 0 var(--space-md);
    border: 1px solid var(--theme-border, var(--bs-border-color));
    border-radius: 0.125rem;
    background: var(--theme-surface, var(--bs-white));
    color: var(--color-main, var(--bs-primary));
    text-decoration: none;
    font-size: var(--font-size-xs);
    font-weight: 500;
    line-height: 1.2;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: var(--shadow-control-hover);
        border-color: var(--color-main, var(--bs-primary));
        color: var(--color-main, var(--bs-primary));
    }

    @media (max-width: 767px) {
        width: 100%;
    }
`;

const BackIcon = styled(IoMdArrowRoundBack)`
    margin-right: var(--space-xs);
`;

interface VoltarPageProps {
    href: string;
}

export const VoltarPage: React.FC<VoltarPageProps> = ({ href }) => {
    return <BackLink to={href}><BackIcon />Voltar</BackLink>;
};
