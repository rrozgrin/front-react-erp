import { webcontrolApi } from '../../../services/apiClients';

export interface TicketMedioAPIResponse {
  ano: string;
  mes: string;
  receita_bruta: string;
  total_pedidos: string;
}

export interface ReceitaItem {
  mes: string;
  receita_bruta: number;
  descontos: number;
}

export interface ProdutoMaisVendido {
  nome_produto: string;
  total_qtd_vendida: number;
  lucro_total: number;
}

export interface VendaPeriodo {
  mes: string;
  total: number;
}

export interface ClienteMaisCompra {
  nome: string;
  qtd_compras: number;
  valor_total: number;
}

export interface CTe {
  qtd_ct: string;
  status: string;
}

export interface NfeNfce {
  tipo_nota: string;
  qtd: string;
}

export interface NotasFiscaisResponse {
  mdfe?: Array<{ mdfe?: string }>;
  cte?: CTe[];
  nfe?: Array<{ qtd_nfe?: string }>;
  nfe_nfce?: NfeNfce[];
}

export interface Pedido {
  id_tipo_venda: string;
  qtd: number;
}

export interface Consulta {
  debito: string;
  tpinsc: string;
  qtd: number;
}

export interface CompromissosResponse {
  compromissosHoje?: string;
}

export interface ContasPagarResponse {
  html?: string;
}

export interface LocacaoResponse {
  data_fim: string;
  nome: string;
}

export interface CertificadoResponse {
  dias_restantes?: string | number;
}

const GRAFICOS_PATH = '/apoio/novo_inicio/Graficos.php';

export type HomeGraficosPeriodo = {
  dataInicio?: string;
  dataFim?: string;
};

type ConsultaOptions = {
  signal?: AbortSignal;
};

const graficoQuery = (action: string, periodo?: HomeGraficosPeriodo) => ({
  action,
  dataInicio: periodo?.dataInicio,
  dataFim: periodo?.dataFim,
});

export const homeService = {
  buscarReceitaBrutaEDescontos: (periodo?: HomeGraficosPeriodo, options: ConsultaOptions = {}) =>
    webcontrolApi.get<ReceitaItem[]>(GRAFICOS_PATH, { signal: options.signal, query: graficoQuery('receitaBrutaeDescontos', periodo) }),

  buscarProdutosMaisVendidos: (periodo?: HomeGraficosPeriodo, options: ConsultaOptions = {}) =>
    webcontrolApi.get<ProdutoMaisVendido[]>(GRAFICOS_PATH, { signal: options.signal, query: graficoQuery('produtosMaisVendidos', periodo) }),

  buscarVendasPorPeriodo: (periodo?: HomeGraficosPeriodo, options: ConsultaOptions = {}) =>
    webcontrolApi.get<VendaPeriodo[]>(GRAFICOS_PATH, { signal: options.signal, query: graficoQuery('vendasPorPeriodo', periodo) }),

  buscarClientesQueMaisCompram: (periodo?: HomeGraficosPeriodo, options: ConsultaOptions = {}) =>
    webcontrolApi.get<ClienteMaisCompra[]>(GRAFICOS_PATH, { signal: options.signal, query: graficoQuery('clientesQueMaisCompram', periodo) }),

  buscarTicketMedio: (periodo?: HomeGraficosPeriodo, options: ConsultaOptions = {}) =>
    webcontrolApi.get<TicketMedioAPIResponse[]>(GRAFICOS_PATH, { signal: options.signal, query: graficoQuery('ticketMedio', periodo) }),

  buscarNotasFiscais: (periodo?: HomeGraficosPeriodo, options: ConsultaOptions = {}) =>
    webcontrolApi.get<NotasFiscaisResponse>(GRAFICOS_PATH, { signal: options.signal, query: graficoQuery('notasFiscais', periodo) }),

  buscarQuantidadePedidos: (periodo?: HomeGraficosPeriodo, options: ConsultaOptions = {}) =>
    webcontrolApi.get<Pedido[]>(GRAFICOS_PATH, { signal: options.signal, query: graficoQuery('quantidadePedidos', periodo) }),

  buscarQuantidadeConsultas: (periodo?: HomeGraficosPeriodo, options: ConsultaOptions = {}) =>
    webcontrolApi.get<Consulta[]>(GRAFICOS_PATH, { signal: options.signal, query: graficoQuery('quantidadeConsultas', periodo) }),

  buscarCompromissos: (idCadastro: string) =>
    webcontrolApi.post<CompromissosResponse>('/apoio/novo_inicio/AgendaComp.php', new URLSearchParams({
      acao: 'relatorioCompromissosAVencer',
      id_cadastro: idCadastro,
      isApp: '1',
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),

  buscarContasPagarSemana: (idCadastro: string) =>
    webcontrolApi.post<ContasPagarResponse>('/apoio/financeiro_ajaxrequests.php', new URLSearchParams({
      act: 'buscaContasPagarSemana',
      idEmpresa: idCadastro,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),

  buscarPromissorias: (idCadastro: string) =>
    webcontrolApi.post<string>('/apoio/BuscaClientesAjax.php', new URLSearchParams({
      action: 'promissoria_home',
      id_cadastro: idCadastro,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),

  buscarLocacoes: (idCadastro: string) =>
    webcontrolApi.post<LocacaoResponse[]>('/apoio/locacao_nova.php', new URLSearchParams({
      acao: 'relatorioLocacoesAVencer',
      id_cadastro: idCadastro,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),

  buscarCertificado: () =>
    webcontrolApi.get<CertificadoResponse>('/apoio/novo_inicio/Certificado.php'),

  enviarIndicacaoAmigo: (payload: Record<string, string>) =>
    webcontrolApi.post<string>('/apoio/EnvioEmailIndicaAmigo.php', new URLSearchParams(payload), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),
};
