import type { ReactNode } from 'react';
import { PageLayout, type PageLayoutMenuSection } from '../../../../common/components/PageLayout';

interface ClienteDetalhePageLayoutProps {
    clienteId?: string;
    clienteNome: string;
    title: string;
    children: ReactNode;
}

const buildClienteDetalheMenuSections = (clienteId?: string): PageLayoutMenuSection[] => {
    const basePath = clienteId ? `/clientes/visualizar/${clienteId}` : '/clientes';

    return [
        {
            titulo: 'Cliente',
            paginas: [
                { titulo: 'Dados do Cliente', href: basePath },
                { titulo: 'Financeiro do Cliente', href: `${basePath}/financeiro` },
                { titulo: 'Conta Corrente Cliente', href: `${basePath}/conta-corrente` },
                { titulo: 'Débitos Pendentes', href: `${basePath}/debitos-pendentes` },
                { titulo: 'Ocorrências', href: `${basePath}/ocorrencias` },
            ],
        },
    ];
};

export const ClienteDetalhePageLayout = ({
    clienteId,
    clienteNome,
    title,
    children,
}: ClienteDetalhePageLayoutProps) => (
    <PageLayout
        title={title}
        sections={buildClienteDetalheMenuSections(clienteId)}
        breadcrumbs={[
            { nome: 'Clientes', href: '/clientes' },
            { nome: clienteNome, href: clienteId ? `/clientes/visualizar/${clienteId}` : '/clientes' },
            { nome: title },
        ]}
    >
        {children}
    </PageLayout>
);
