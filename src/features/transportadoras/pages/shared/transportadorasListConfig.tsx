import { criarConfiguracaoListagemParceiro } from '@/features/parceiros';
import type { Transportadoras } from '../../types/Transportadoras';

export { transportadorasExcluidosMockData, transportadorasMockData } from '../../data/transportadorasMock';

const configuracao = criarConfiguracaoListagemParceiro<Transportadoras>('Transportadora');

export const defaultTransportadoraSearchFields = configuracao.camposPesquisa;
export const defaultTransportadorasTableFields = configuracao.camposPadrao;
export const defaultTransportadorasExcelColumns = configuracao.colunasExcelPadrao;
export const excludedTransportadorasTableFields = configuracao.camposExcluidos;
export const excludedTransportadorasExcelColumns = configuracao.colunasExcelExcluidos;
