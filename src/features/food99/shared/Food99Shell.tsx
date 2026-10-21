import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLayout, type PageLayoutMenuSection } from '../../../common/components/PageLayout';
import { useFood99Lojas } from '../hooks/useFood99Auth';

interface Food99ShellProps {
    pageTitle: string;
    pageDescription?: string;
    topCards?: unknown[];
    children: React.ReactNode;
}

const food99MenuSections: PageLayoutMenuSection[] = [
    {
        titulo: '99Food',
        paginas: [
            { titulo: 'Pedidos', href: '/food99/pedidos' },
            {
                titulo: 'Cardápio',
                href: '/food99/cardapio',
                children: [
                    { titulo: 'Catálogo', href: '/food99/cardapio/catalogo' },
                    { titulo: 'Itens do catálogo', href: '/food99/cardapio/itens' },
                ],
            },
            { titulo: 'Autenticação', href: '/food99/autenticacao' },
        ],
    },
];

export const Food99Shell: React.FC<Food99ShellProps> = ({
    pageTitle,
    children,
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const lojasQuery = useFood99Lojas();

    useEffect(() => {
        if (location.pathname === '/food99/autenticacao') {
            return;
        }

        if (lojasQuery.carregando) return;
        const possuiLojaVinculada = lojasQuery.dados?.lojas.some((loja) => Boolean(loja.lojaFood99Id));
        if (!possuiLojaVinculada) navigate('/food99/autenticacao', { replace: true });
    }, [location.pathname, navigate, lojasQuery.carregando, lojasQuery.dados]);

    return (
        <PageLayout title={pageTitle} sections={food99MenuSections}>
            {children}
        </PageLayout>
    );
};
