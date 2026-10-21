import type { PageLayoutMenuSection } from '../../../../common/components/PageLayout';
import type { CatalogoProdServ } from './catalogoData';

export interface CatalogoConfig {
    prodServ: CatalogoProdServ;
    basePath: string;
    labels: {
        singular: string;
        plural: string;
        listTitle: string;
        create: string;
        classification: string;
        soldReport: string;
        excluded: string;
        code: string;
        name: string;
        saleValue: string;
    };
}

export const produtosCatalogoConfig: CatalogoConfig = {
    prodServ: 'P',
    basePath: '/produtos',
    labels: {
        singular: 'Produto',
        plural: 'Produtos',
        listTitle: 'Cadastro e Estoque de Produtos',
        create: 'Cadastrar Produto',
        classification: 'Classificação',
        soldReport: 'Relatório Produtos Vendidos',
        excluded: 'Produtos Excluídos',
        code: 'Código de Barras',
        name: 'Nome do Produto',
        saleValue: 'Valor Venda',
    },
};

export const servicosCatalogoConfig: CatalogoConfig = {
    prodServ: 'S',
    basePath: '/servicos',
    labels: {
        singular: 'Serviço',
        plural: 'Serviços',
        listTitle: 'Serviços Oferecidos',
        create: 'Cadastrar',
        classification: 'Classificação',
        soldReport: 'Relatórios Serviços Vendidos',
        excluded: 'Serviços Excluídos',
        code: 'Código do Serviço',
        name: 'Nome do Serviço',
        saleValue: 'Valor Serviço',
    },
};

export const buildCatalogoMenuSections = (config: CatalogoConfig, params: { onCreate?: () => void } = {}): PageLayoutMenuSection[] => [
    {
        titulo: config.labels.plural,
        paginas: [
            { titulo: config.labels.listTitle, href: config.basePath },
            params.onCreate ? { titulo: config.labels.create, action: params.onCreate } : { titulo: config.labels.create, href: `${config.basePath}?modal=create` },
            { titulo: config.labels.classification, href: `${config.basePath}/classificacao` },
            { titulo: config.labels.soldReport, href: `${config.basePath}/relatorio/vendidos` },
            { titulo: config.labels.excluded, href: `${config.basePath}/excluidos` },
        ],
    },
];
