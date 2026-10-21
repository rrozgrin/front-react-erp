import { useConsultaApi, type ConsultaApiContexto, type ConsultaApiKey } from '../../../common/hooks/useConsultaApi';
import {
    homeService,
    type ClienteMaisCompra,
    type Consulta,
    type CTe,
    type HomeGraficosPeriodo,
    type NfeNfce,
    type Pedido,
    type ProdutoMaisVendido,
    type ReceitaItem,
    type TicketMedioAPIResponse,
    type VendaPeriodo,
} from '../services/homeService';
import type { DadosItem } from '../pages/components/ChartTicketMedio';

export type NotaFiscal = {
  tipo: string;
  qtd: number;
};

const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const HOME_GRAFICOS_CACHE_MS = 30_000;

function useHomeGrafico<TData extends unknown[]>(
  chave: ConsultaApiKey,
  consultar: (contexto: ConsultaApiContexto) => Promise<TData>,
) {
  const consulta = useConsultaApi({
    chave,
    consultar,
    tempoValidade: HOME_GRAFICOS_CACHE_MS,
  });

  return { ...consulta, data: consulta.dados ?? ([] as unknown as TData) };
}

export function useReceitaBrutaEDescontosQuery(periodo?: HomeGraficosPeriodo) {
  return useHomeGrafico<ReceitaItem[]>(
    ['home', 'graficos', 'receita-bruta', periodo?.dataInicio ?? null, periodo?.dataFim ?? null],
    async ({ signal }) => {
      const data = await homeService.buscarReceitaBrutaEDescontos(periodo, { signal });
      return data.map((item) => ({
        mes: monthNames[Number(item.mes) - 1] || item.mes,
        receita_bruta: Number(item.receita_bruta),
        descontos: Number(item.descontos),
      }));
    },
  );
}

export function useProdutosMaisVendidosQuery(periodo?: HomeGraficosPeriodo) {
  return useHomeGrafico<ProdutoMaisVendido[]>(
    ['home', 'graficos', 'produtos-mais-vendidos', periodo?.dataInicio ?? null, periodo?.dataFim ?? null],
    async ({ signal }) => {
      const data = await homeService.buscarProdutosMaisVendidos(periodo, { signal });
      return data.map((item) => ({
        nome_produto: item.nome_produto,
        total_qtd_vendida: Number(item.total_qtd_vendida),
        lucro_total: Number(item.lucro_total),
      }));
    },
  );
}

export function useVendasPorPeriodoQuery(periodo?: HomeGraficosPeriodo) {
  return useHomeGrafico<VendaPeriodo[]>(
    ['home', 'graficos', 'vendas-por-periodo', periodo?.dataInicio ?? null, periodo?.dataFim ?? null],
    async ({ signal }) => {
      const data = await homeService.buscarVendasPorPeriodo(periodo, { signal });
      return data.map((item) => ({
        mes: monthNames[Number(item.mes) - 1] || item.mes,
        total: Number(item.total),
      }));
    },
  );
}

export function useClientesQueMaisCompramQuery(periodo?: HomeGraficosPeriodo) {
  return useHomeGrafico<ClienteMaisCompra[]>(
    ['home', 'graficos', 'clientes-mais-compram', periodo?.dataInicio ?? null, periodo?.dataFim ?? null],
    async ({ signal }) => {
      const data = await homeService.buscarClientesQueMaisCompram(periodo, { signal });
      return data.map((item) => ({
        nome: item.nome,
        qtd_compras: Number(item.qtd_compras),
        valor_total: Number(item.valor_total),
      }));
    },
  );
}

export function useTicketMedioQuery(periodo?: HomeGraficosPeriodo) {
  return useHomeGrafico<DadosItem[]>(
    ['home', 'graficos', 'ticket-medio', periodo?.dataInicio ?? null, periodo?.dataFim ?? null],
    async ({ signal }) => {
      const data = await homeService.buscarTicketMedio(periodo, { signal });
      return data.map((item: TicketMedioAPIResponse) => ({
        data: `${item.mes.toString().padStart(2, '0')}/${item.ano}`,
        receita_bruta: parseFloat(item.receita_bruta),
        pedidos: parseInt(item.total_pedidos),
      }));
    },
  );
}

export function useNotasFiscaisQuery(periodo?: HomeGraficosPeriodo) {
  return useHomeGrafico<NotaFiscal[]>(
    ['home', 'graficos', 'notas-fiscais', periodo?.dataInicio ?? null, periodo?.dataFim ?? null],
    async ({ signal }) => {
      const data = await homeService.buscarNotasFiscais(periodo, { signal });
      const mdfeQtd = data.mdfe?.[0]?.mdfe ? Number(data.mdfe[0].mdfe) : 0;
      const cteQtd = data.cte
        ? data.cte
          .filter((item: CTe) => item.status === '1')
          .reduce((acc: number, item: CTe) => acc + Number(item.qtd_ct || 0), 0)
        : 0;
      const nfeQtdBase = data.nfe?.[0]?.qtd_nfe ? Number(data.nfe[0].qtd_nfe) : 0;
      const nfeQtdExtra = data.nfe_nfce
        ? data.nfe_nfce
          .filter((item: NfeNfce) => item.tipo_nota === 'NFE')
          .reduce((acc: number, item: NfeNfce) => acc + Number(item.qtd || 0), 0)
        : 0;
      const qtdPorTipo = (tipo: string) => data.nfe_nfce
        ? data.nfe_nfce
          .filter((item: NfeNfce) => item.tipo_nota === tipo)
          .reduce((acc: number, item: NfeNfce) => acc + Number(item.qtd || 0), 0)
        : 0;

      return [
        { tipo: 'MDF-e', qtd: mdfeQtd },
        { tipo: 'CT-e', qtd: cteQtd },
        { tipo: 'NF-e', qtd: nfeQtdBase + nfeQtdExtra },
        { tipo: 'NFC-e', qtd: qtdPorTipo('NFC') },
        { tipo: 'CF-e', qtd: qtdPorTipo('CFE') },
        { tipo: 'NFS', qtd: qtdPorTipo('NFS') },
      ];
    },
  );
}

const tiposVenda: Record<string, string> = {
  '0': 'Venda',
  '1': 'Pedido',
  '2': 'Orçamento',
  '3': 'Ordem Serviço',
  '8': 'Assistência Técnica',
};

export function useQuantidadePedidosQuery(periodo?: HomeGraficosPeriodo) {
  return useHomeGrafico<Pedido[]>(
    ['home', 'graficos', 'quantidade-pedidos', periodo?.dataInicio ?? null, periodo?.dataFim ?? null],
    async ({ signal }) => {
      const data = await homeService.buscarQuantidadePedidos(periodo, { signal });
      return data
        .filter((item) => Object.prototype.hasOwnProperty.call(tiposVenda, item.id_tipo_venda))
        .map((item) => ({
          id_tipo_venda: tiposVenda[item.id_tipo_venda],
          qtd: Number(item.qtd),
        }));
    },
  );
}

const gruposConsulta: Record<string, string> = {
  A0201: 'CHEQUE',
  A0400: 'VEICULOS',
  CL178: 'VEICULOS',
  A0403: 'VEICULOS',
  A0404: 'VEICULOS',
  A0401: 'VEICULOS',
  A0407: 'VEICULOS',
  A0406: 'VEICULOS',
  A0408: 'VEICULOS',
  A0405: 'VEICULOS',
  A0230: 'PF',
  A0200: 'PF',
  A0710: 'PF',
  A0301: 'PF',
  A0202: 'PF',
  A0207: 'PF',
  A0302: 'PJ',
  A0115: 'PJ',
};

export function useQuantidadeConsultasQuery(periodo?: HomeGraficosPeriodo) {
  return useHomeGrafico<Consulta[]>(
    ['home', 'graficos', 'quantidade-consultas', periodo?.dataInicio ?? null, periodo?.dataFim ?? null],
    async ({ signal }) => {
      const data = await homeService.buscarQuantidadeConsultas(periodo, { signal });
      const acumulado: Record<string, number> = {
        CHEQUE: 0,
        VEICULOS: 0,
        'PESSOA FISICA': 0,
        'PESSOA JURIDICA': 0,
      };

      data.forEach((item) => {
        const grupo = gruposConsulta[item.debito];
        if (!grupo) return;

        if (grupo === 'PF' || grupo === 'PJ') {
          if (item.tpinsc === 'F') acumulado['PESSOA FISICA'] += Number(item.qtd);
          if (item.tpinsc === 'J') acumulado['PESSOA JURIDICA'] += Number(item.qtd);
          return;
        }

        acumulado[grupo] += Number(item.qtd);
      });

      return Object.entries(acumulado).map(([tipo, qtd]) => ({
        debito: tipo,
        tpinsc: '',
        qtd,
      }));
    },
  );
}
