import { formatarDataBR, formatarDataHoraBR } from '../../../../types/Data';
import { normalizarTexto } from '../../../../common/components/Templates/listagemUtils';

export type CatalogoProdServ = 'P' | 'S';
export type CatalogoStatus = 'ativo' | 'excluido';

export interface CatalogoItem {
    id: number;
    prodServ?: CatalogoProdServ;
    codigo: string;
    nome: string;
    classificacao: string;
    fornecedor: string;
    unidade: string;
    custo: number;
    venda: number;
    estoque: number;
    percentualCustoVenda: number;
    status: CatalogoStatus;
    dataExclusao?: string;
}

export interface CatalogoClassificacao {
    id: number;
    prodServ?: CatalogoProdServ;
    nome: string;
    subClassificacao: string;
    status: 'ativo' | 'inativo';
}

export interface CatalogoVendido {
    id: number;
    prodServ: CatalogoProdServ;
    codigo: string;
    item: string;
    classificacao: string;
    cliente: string;
    vendedor: string;
    dataVenda: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
}

export const catalogoItemsMockData: CatalogoItem[] = [
    { id: 2500108, prodServ: 'P', codigo: '7899565702107', nome: 'Capa Banco Mod Orig Biz 125 2008', classificacao: 'Celulares e Smartphones', fornecedor: 'Moto Peças Centro', unidade: 'UN', custo: 10, venda: 20, estoque: 2, percentualCustoVenda: 0, status: 'ativo' },
    { id: 2500106, prodServ: 'P', codigo: '7899565702084', nome: 'Capa Banco Mod Orig Titan 150 2004/08', classificacao: 'Importado XML', fornecedor: 'Distribuidora Norte', unidade: 'UN', custo: 16.81, venda: 21.85, estoque: 2, percentualCustoVenda: 0, status: 'ativo' },
    { id: 2500105, prodServ: 'P', codigo: '7899565702060', nome: 'Capa Banco Mod Titan 2000', classificacao: 'Acessórios', fornecedor: 'Moto Peças Centro', unidade: 'UN', custo: 17.28, venda: 22.46, estoque: -4, percentualCustoVenda: 0, status: 'excluido', dataExclusao: '2026-05-11T17:40:00' },
    { id: 1, prodServ: 'S', codigo: '1015411784', nome: 'Balanceamento e Geometria', classificacao: 'Manutenção', fornecedor: 'Interno', unidade: 'UN', custo: 0, venda: 50, estoque: 0, percentualCustoVenda: 0, status: 'ativo' },
    { id: 2, prodServ: 'S', codigo: '61828353', nome: 'Corte de Cabelo', classificacao: 'Atendimento', fornecedor: 'Interno', unidade: 'UN', custo: 0, venda: 20, estoque: 0, percentualCustoVenda: 0, status: 'ativo' },
    { id: 3, prodServ: 'S', codigo: '68488857', nome: 'Formatação', classificacao: 'Suporte Técnico', fornecedor: 'Interno', unidade: 'UN', custo: -22, venda: 95.93, estoque: 0, percentualCustoVenda: 0, status: 'ativo' },
    { id: 4, prodServ: 'S', codigo: '57660349', nome: 'Reparo e Manutenção', classificacao: 'Manutenção', fornecedor: 'Interno', unidade: 'UN', custo: 66, venda: 165.63, estoque: 0, percentualCustoVenda: 150.95, status: 'ativo' },
    { id: 5, prodServ: 'S', codigo: '4874795', nome: 'Taxa Avulso', classificacao: 'Taxas', fornecedor: 'Interno', unidade: 'UN', custo: -11, venda: 63.26, estoque: 0, percentualCustoVenda: 0, status: 'excluido', dataExclusao: '2026-05-24T10:20:00' },
];

export const catalogoClassificacoesMockData: CatalogoClassificacao[] = [
    { id: 1, prodServ: 'P', nome: 'Celulares e Smartphones', subClassificacao: '- Principal -', status: 'ativo' },
    { id: 2, prodServ: 'P', nome: 'Importado XML', subClassificacao: '- Principal -', status: 'ativo' },
    { id: 3, prodServ: 'P', nome: 'Acessórios', subClassificacao: '- Principal -', status: 'ativo' },
    { id: 4, prodServ: 'S', nome: 'Manutenção', subClassificacao: '- Principal -', status: 'ativo' },
    { id: 5, prodServ: 'S', nome: 'Atendimento', subClassificacao: '- Principal -', status: 'ativo' },
    { id: 6, prodServ: 'S', nome: 'Suporte Técnico', subClassificacao: '- Principal -', status: 'ativo' },
    { id: 7, prodServ: 'S', nome: 'Taxas', subClassificacao: '- Principal -', status: 'ativo' },
];

export const catalogoVendidosMockData: CatalogoVendido[] = [
    { id: 1, prodServ: 'P', codigo: '7899565702107', item: 'Capa Banco Mod Orig Biz 125 2008', classificacao: 'Celulares e Smartphones', cliente: 'Carlos Henrique', vendedor: 'Mariana Lima', dataVenda: '2026-06-03', quantidade: 18, valorUnitario: 20, valorTotal: 360 },
    { id: 2, prodServ: 'P', codigo: '7899565702084', item: 'Capa Banco Mod Orig Titan 150 2004/08', classificacao: 'Importado XML', cliente: 'Ana Paula Motos', vendedor: 'Paulo Nunes', dataVenda: '2026-06-05', quantidade: 11, valorUnitario: 21.85, valorTotal: 240.35 },
    { id: 3, prodServ: 'S', codigo: '1015411784', item: 'Balanceamento e Geometria', classificacao: 'Manutenção', cliente: 'Carlos Henrique', vendedor: 'Mariana Lima', dataVenda: '2026-06-03', quantidade: 3, valorUnitario: 50, valorTotal: 150 },
    { id: 4, prodServ: 'S', codigo: '61828353', item: 'Corte de Cabelo', classificacao: 'Atendimento', cliente: 'Fernanda Souza', vendedor: 'Paulo Nunes', dataVenda: '2026-06-04', quantidade: 5, valorUnitario: 20, valorTotal: 100 },
    { id: 5, prodServ: 'S', codigo: '57660349', item: 'Reparo e Manutenção', classificacao: 'Manutenção', cliente: 'Moto Clube Centro', vendedor: 'Mariana Lima', dataVenda: '2026-06-06', quantidade: 2, valorUnitario: 165.63, valorTotal: 331.26 },
];

export const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const formatDate = (value: string) => formatarDataBR(value);

export const formatDateTime = (value: string) => formatarDataHoraBR(value);

export const normalizeText = normalizarTexto;
