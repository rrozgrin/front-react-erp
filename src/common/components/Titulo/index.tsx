import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowForward } from "react-icons/io";

export interface BreadcrumbItem {
    nome: string;
    href?: string;
}

interface TitulosProps {
    titulo: string;
    caminhos?: BreadcrumbItem[];
    menuOpen?: boolean;
    onToggleMenu?: () => void;
    showMenuButton?: boolean;
}

export const Titulos: React.FC<TitulosProps> = ({ titulo, caminhos = [], menuOpen = false, onToggleMenu, showMenuButton = false }) => {
    const breadcrumbItems = caminhos.length > 0 ? caminhos : [{ nome: titulo }];

    return (
        <TitleWrap>
            <BreadcrumbNav aria-label={titulo}>
                {showMenuButton && !menuOpen && (
                    <>
                        <MenuButton
                            type="button"
                            aria-label="Abrir menu da pagina"
                            aria-expanded={false}
                            title="Menu da pagina"
                            onClick={onToggleMenu}
                        >
                            <IoIosArrowForward size={18} />
                        </MenuButton>

                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    </>
                )}

                {breadcrumbItems.map((item, index) => {
                    const isLast = index === breadcrumbItems.length - 1;

                    return (
                        <React.Fragment key={`${item.nome}-${index}`}>
                            {item.href && !isLast ? (
                                <BreadcrumbLink to={item.href}>
                                    {item.nome}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbText>
                                    {item.nome}
                                </BreadcrumbText>
                            )}

                            {!isLast && (
                                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            )}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbNav>
        </TitleWrap>
    );
};

const TitleWrap = styled.div`
    width: 100%;
`;

const BreadcrumbNav = styled.nav`
    margin: 0;
    padding: 8px 0;
    border-radius: 0.125rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    color: #6c757d;
    font-size: var(--font-size-sm);
    font-weight: 500;
`;

const breadcrumbButtonStyles = `
    min-height: 24px;
    display: inline-flex;
    align-items: center;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-decoration: none;
    line-height: 1;
`;

const MenuButton = styled.button`
    ${breadcrumbButtonStyles}
    cursor: pointer;
    padding: 0;

    svg {
        transform: translateX(-4px);
    }

    &:hover {
        color: var(--color-main, var(--bs-primary));
    }
`;

const BreadcrumbLink = styled(Link)`
    ${breadcrumbButtonStyles}

    &:hover {
        color: var(--color-main, var(--bs-primary));
        text-decoration: underline;
    }
`;

const BreadcrumbText = styled.span`
    ${breadcrumbButtonStyles}
`;

const BreadcrumbSeparator = styled.span`
    color: var(--theme-text-soft, #94a3b8);
    line-height: 1;
`;
