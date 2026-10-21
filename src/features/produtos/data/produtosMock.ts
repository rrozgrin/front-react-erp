import type { Produto } from '../types/Produto';

export const produtosMockData: Produto[] = [
    { id: 2500108, codigoInterno: '2500108', nome: 'Capa Banco Mod Orig Biz 125 2008', codigoBarras: '7899565702107', classificacao: 'Celulares e Smartphones', estoque: 2, custo: 10, venda: 20, status: 'ativo' },
    { id: 2500107, codigoInterno: '2500107', nome: 'Capa Banco Mod Orig Biz 125 2008 Premium', codigoBarras: '17951372', classificacao: 'Importado XML', estoque: 33, custo: 10, venda: 20, status: 'vip' },
    { id: 2500106, codigoInterno: '2500106', nome: 'Capa Banco Mod Orig Titan 150 2004/08', codigoBarras: '7899565702084', classificacao: 'Importado XML', estoque: 2, custo: 16.81, venda: 21.85, status: 'ativo' },
    { id: 2500105, codigoInterno: '2500105', nome: 'Capa Banco Mod Titan 2000', codigoBarras: '7899565702060', classificacao: 'Acessórios', estoque: -4, custo: 17.28, venda: 22.46, status: 'inativo' },
];
