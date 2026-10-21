import { criarConfiguracaoListagemParceiro } from '@/features/parceiros';
import type { Fornecedores } from '../../types/Fornecedores';

export { fornecedoresExcluidosMockData, fornecedoresMockData } from '../../data/fornecedoresMock';

const configuracao = criarConfiguracaoListagemParceiro<Fornecedores>('Fornecedor');

export const defaultFornecedorSearchFields = configuracao.camposPesquisa;
export const defaultFornecedoresTableFields = configuracao.camposPadrao;
export const defaultFornecedoresExcelColumns = configuracao.colunasExcelPadrao;
export const excludedFornecedoresTableFields = configuracao.camposExcluidos;
export const excludedFornecedoresExcelColumns = configuracao.colunasExcelExcluidos;
