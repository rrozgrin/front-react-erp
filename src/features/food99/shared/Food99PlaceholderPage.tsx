import React from 'react';
import styled from 'styled-components';
import { Food99Shell } from './Food99Shell';
import { Food99SurfaceCard } from './filterControls';

const PlaceholderCard = styled(Food99SurfaceCard)`
    h2 {
        color: #111827;
        font-size: 1.45rem;
    }

    p {
        margin-top: 10px;
        color: #475569;
        line-height: 1.7;
    }
`;

interface Food99PlaceholderPageProps {
    title: string;
    description: string;
}

const Food99PlaceholderPage: React.FC<Food99PlaceholderPageProps> = ({ title, description }) => (
    <Food99Shell pageTitle={title} pageDescription={description}>
        <PlaceholderCard>
            <h2>Página em preparação</h2>
            <p>
                Estruturamos a base compartilhada do marketplace e deixamos esta rota pronta para receber o conteúdo
                especifico depois.
            </p>
        </PlaceholderCard>
    </Food99Shell>
);

export const Food99PedidosPage: React.FC = () => (
    <Food99PlaceholderPage
        title="Pedidos"
        description="Acompanhe pedidos, status de integração e eventos do marketplace em um fluxo único."
    />
);

export const Food99CatalogoCardapioPage: React.FC = () => (
    <Food99PlaceholderPage
        title="Cardápio"
        description="Organize categorias, estrutura de menu e disponibilidade do catálogo conectado ao 99Food."
    />
);

export const Food99CatalogoItensPage: React.FC = () => (
    <Food99PlaceholderPage
        title="Itens do catálogo"
        description="Cadastre e sincronize produtos, preços e informações que serão compartilhadas no marketplace."
    />
);

export const Food99ConfiguracoesPage: React.FC = () => (
    <Food99PlaceholderPage
        title="Configurações"
        description="Centralize parâmetros da integração, ambiente, regras de sincronização e credenciais da loja."
    />
);
