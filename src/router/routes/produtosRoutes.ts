import { lazyNamed } from '../lazyNamed';
import type { PrivateRoute } from '../types';

const ProdutosPage = lazyNamed(() => import('../../features/produtos/pages/CadastroEstoque/ProdutosPage'), 'ProdutosPage');
const ProdutosClassificacaoPage = lazyNamed(
    () => import('../../features/produtos/pages/Classificacao/ProdutosClassificacaoPage'),
    'ProdutosClassificacaoPage'
);
const ProdutosClassificacaoExcluidosPage = lazyNamed(
    () => import('../../features/produtos/pages/Classificacao/ProdutosClassificacaoExcluidosPage'),
    'ProdutosClassificacaoExcluidosPage'
);
const ProdutosMarcasPage = lazyNamed(
    () => import('../../features/produtos/pages/Marcas/ProdutosMarcasPage'),
    'ProdutosMarcasPage'
);
const ProdutosVolumesPage = lazyNamed(
    () => import('../../features/produtos/pages/Volumes/ProdutosVolumesPage'),
    'ProdutosVolumesPage'
);
const ProdutosCaracteristicasValoresPage = lazyNamed(
    () => import('../../features/produtos/pages/CaracteristicasValores/ProdutosCaracteristicasValoresPage'),
    'ProdutosCaracteristicasValoresPage'
);
const ProdutosExcluidosPage = lazyNamed(
    () => import('../../features/produtos/pages/Excluidos/ProdutosExcluidosPage'),
    'ProdutosExcluidosPage'
);
const ProdutosHistoricoAlteracaoPage = lazyNamed(
    () => import('../../features/produtos/pages/Historico/ProdutosHistoricoAlteracaoPage'),
    'ProdutosHistoricoAlteracaoPage'
);
const ProdutosKitComboPage = lazyNamed(
    () => import('../../features/produtos/pages/KitCombo/ProdutosKitComboPage'),
    'ProdutosKitComboPage'
);
const ProdutosConferenciaEstoquePage = lazyNamed(
    () => import('../../features/produtos/pages/ConferenciaEstoque/ProdutosConferenciaEstoquePage'),
    'ProdutosConferenciaEstoquePage'
);
const ProdutosEstoqueOperacoesPage = lazyNamed(
    () => import('../../features/produtos/pages/EstoqueOperacoes/ProdutosEstoqueOperacoesPage'),
    'ProdutosEstoqueOperacoesPage'
);
const ProdutosGerarEtiquetasPage = lazyNamed(
    () => import('../../features/produtos/pages/GerarEtiquetas/ProdutosGerarEtiquetasPage'),
    'ProdutosGerarEtiquetasPage'
);
const ProdutosExportarEstoquePage = lazyNamed(
    () => import('../../features/produtos/pages/ExportarEstoque/ProdutosExportarEstoquePage'),
    'ProdutosExportarEstoquePage'
);
const ProdutosZerarCestPage = lazyNamed(
    () => import('../../features/produtos/pages/ZerarCest/ProdutosZerarCestPage'),
    'ProdutosZerarCestPage'
);
const ProdutosListaPrecosPage = lazyNamed(
    () => import('../../features/produtos/pages/ListaPrecos/ProdutosListaPrecosPage'),
    'ProdutosListaPrecosPage'
);
const ProdutosImportarDadosPage = lazyNamed(
    () => import('../../features/produtos/pages/ImportarDados/ProdutosImportarDadosPage'),
    'ProdutosImportarDadosPage'
);
const ProdutosRelatorioEntradaEstoquePage = lazyNamed(
    () => import('../../features/produtos/pages/RelatorioEntradaEstoque/ProdutosRelatorioEntradaEstoquePage'),
    'ProdutosRelatorioEntradaEstoquePage'
);
const ProdutosLoteVencimentoPage = lazyNamed(
    () => import('../../features/produtos/pages/LoteVencimento/ProdutosLoteVencimentoPage'),
    'ProdutosLoteVencimentoPage'
);
const ProdutosRelatorioLotesPage = lazyNamed(
    () => import('../../features/produtos/pages/Relatorios/ProdutosRelatorioLotesPage'),
    'ProdutosRelatorioLotesPage'
);
const ProdutosPromocaoMultiItensProdutoPage = lazyNamed(
    () => import('../../features/produtos/pages/PromocaoMultiItens/ProdutosPromocaoMultiItensProdutoPage'),
    'ProdutosPromocaoMultiItensProdutoPage'
);
const ProdutosPromocaoMultiItensGradePage = lazyNamed(
    () => import('../../features/produtos/pages/PromocaoMultiItens/ProdutosPromocaoMultiItensProdutoPage'),
    'ProdutosPromocaoMultiItensGradePage'
);
const ProdutosMaisPorMenosPage = lazyNamed(
    () => import('../../features/produtos/pages/MaisPorMenos/ProdutosMaisPorMenosPage'),
    'ProdutosMaisPorMenosPage'
);
const ProdutosRelatorioEstoquePage = lazyNamed(
    () => import('../../features/produtos/pages/Relatorios/ProdutosRelatorioEstoquePage'),
    'ProdutosRelatorioEstoquePage'
);
const ProdutosRelatorioProdutosClientesPage = lazyNamed(
    () => import('../../features/produtos/pages/Relatorios/ProdutosRelatorioProdutosClientesPage'),
    'ProdutosRelatorioProdutosClientesPage'
);
const ProdutosRelatorioPromocoesPage = lazyNamed(
    () => import('../../features/produtos/pages/Relatorios/ProdutosRelatorioPromocoesPage'),
    'ProdutosRelatorioPromocoesPage'
);
const ProdutosRelatorioNotasPage = lazyNamed(
    () => import('../../features/produtos/pages/Relatorios/ProdutosRelatorioNotasPage'),
    'ProdutosRelatorioNotasPage'
);
const ProdutosRelatorioProdutoVendaPage = lazyNamed(
    () => import('../../features/produtos/pages/Relatorios/ProdutosRelatorioProdutosVendidosPage'),
    'ProdutosRelatorioProdutoVendaPage'
);
const ProdutosRelatorioMaisVendidosPage = lazyNamed(
    () => import('../../features/produtos/pages/Relatorios/ProdutosRelatorioProdutosVendidosPage'),
    'ProdutosRelatorioMaisVendidosPage'
);
const ProdutosRelatorioNaoVendidosPage = lazyNamed(
    () => import('../../features/produtos/pages/Relatorios/ProdutosRelatorioProdutosVendidosPage'),
    'ProdutosRelatorioNaoVendidosPage'
);
const ProdutosRelatorioProdutosVendidosPorHoraPage = lazyNamed(
    () => import('../../features/produtos/pages/Relatorios/ProdutosRelatorioProdutosVendidosPorHoraPage'),
    'ProdutosRelatorioProdutosVendidosPorHoraPage'
);
const VisualizarProdutosPage = lazyNamed(
    () => import('../../features/produtos/pages/CadastroEstoque/VisualizarProdutosPage'),
    'VisualizarProdutosPage'
);

export const produtosRoutes: PrivateRoute[] = [
    { path: '/produtos', Page: ProdutosPage },
    { path: '/produtos/visualizar/:id', Page: VisualizarProdutosPage },
    { path: '/produtos/classificacao', Page: ProdutosClassificacaoPage },
    { path: '/produtos/classificacao/excluidos', Page: ProdutosClassificacaoExcluidosPage },
    { path: '/produtos/marcas', Page: ProdutosMarcasPage },
    { path: '/produtos/volumes', Page: ProdutosVolumesPage },
    { path: '/produtos/caracteristicas-valores', Page: ProdutosCaracteristicasValoresPage },
    { path: '/produtos/excluidos', Page: ProdutosExcluidosPage },
    { path: '/produtos/historico-alteracao', Page: ProdutosHistoricoAlteracaoPage },
    { path: '/produtos/kit-combo', Page: ProdutosKitComboPage },
    { path: '/produtos/estoque', Page: ProdutosEstoqueOperacoesPage },
    { path: '/produtos/estoque/:tipo', Page: ProdutosEstoqueOperacoesPage },
    { path: '/produtos/gerar-etiquetas', Page: ProdutosGerarEtiquetasPage },
    { path: '/produtos/exportar-estoque', Page: ProdutosExportarEstoquePage },
    { path: '/produtos/zerar-cest', Page: ProdutosZerarCestPage },
    { path: '/produtos/conferencia-estoque', Page: ProdutosConferenciaEstoquePage },
    { path: '/produtos/lista-precos', Page: ProdutosListaPrecosPage },
    { path: '/produtos/importar-dados', Page: ProdutosImportarDadosPage },
    { path: '/produtos/relatorio-entrada-estoque', Page: ProdutosRelatorioEntradaEstoquePage },
    { path: '/produtos/lote-vencimento', Page: ProdutosLoteVencimentoPage },
    { path: '/produtos/relatorio-lotes', Page: ProdutosRelatorioLotesPage },
    { path: '/produtos/promocao-multi-itens-produto', Page: ProdutosPromocaoMultiItensProdutoPage },
    { path: '/produtos/promocao-multi-itens-grade', Page: ProdutosPromocaoMultiItensGradePage },
    { path: '/produtos/mais-por-menos', Page: ProdutosMaisPorMenosPage },
    { path: '/produtos/relatorios', Page: ProdutosRelatorioEstoquePage },
    { path: '/produtos/relatorio/produtos-clientes', Page: ProdutosRelatorioProdutosClientesPage },
    { path: '/produtos/relatorio/promocoes', Page: ProdutosRelatorioPromocoesPage },
    { path: '/produtos/relatorio/notas', Page: ProdutosRelatorioNotasPage },
    { path: '/produtos/relatorio/produto-venda', Page: ProdutosRelatorioProdutoVendaPage },
    { path: '/produtos/relatorio/mais-vendidos', Page: ProdutosRelatorioMaisVendidosPage },
    { path: '/produtos/relatorio/nao-vendidos', Page: ProdutosRelatorioNaoVendidosPage },
    { path: '/produtos/relatorio/vendidos-por-hora', Page: ProdutosRelatorioProdutosVendidosPorHoraPage },
];
