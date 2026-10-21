import { ReactElement } from 'react';
import { FooterContainer } from './styled';

export const Footer = (): ReactElement => {
    const year = new Date().getFullYear();

    return (
        <FooterContainer >
            <p className="my-2 text-center all-rights">
                {year} &copy; <strong>WebControl Sistemas</strong>. Todos os direitos reservados.
            </p>
        </FooterContainer>
    );
};
