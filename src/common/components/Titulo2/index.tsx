import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface BreadcrumbItem {
    nome: string;
    href?: string;
}

interface TitulosProps {
    titulo: string;
    caminhos?: BreadcrumbItem[];
}

export const Titulos2: React.FC<TitulosProps> = ({ titulo, caminhos = [] }) => {
    return (
        <TitleWrap>
            <Title>{titulo}</Title>

            {caminhos.length > 0 && (
                <BreadcrumbNav aria-label="Breadcrumb">
                    {caminhos.map((item, index) => {
                        const isLast = index === caminhos.length - 1;

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
                                    <BreadcrumbSeparator>
                                        {'>'}
                                    </BreadcrumbSeparator>
                                )}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbNav>
            )}
        </TitleWrap>
    );
};

const TitleWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
`;

const Title = styled.h1`
    margin: 0;
    padding: 10px;
    border-radius: 0.125rem;
    color: var(--theme-text, var(--color-secondary));
    font-size: 22px;
    font-weight: 750;
`;

const BreadcrumbNav = styled.nav`
    display: flex;
    align-items: center;
    min-width: 0;
`;

const breadcrumbItemStyles = `
    color: var(--theme-text-soft, #64748b);
    font-size: 1.05rem;
    font-weight: 400;
`;

const BreadcrumbLink = styled(Link)`
    ${breadcrumbItemStyles}
    text-decoration: none;
`;

const BreadcrumbText = styled.span`
    ${breadcrumbItemStyles}
`;

const BreadcrumbSeparator = styled.span`
    margin: 0 10px;
    color: var(--theme-text-soft, #94a3b8);
    font-size: 0.95rem;
    line-height: 1;
`;
