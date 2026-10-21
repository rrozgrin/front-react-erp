export type Food99StatusPublicacaoItem = 'draft' | 'queued' | 'published' | 'failed';

export interface Food99Menu {
  id: number; lojaFood99Id: number; menuAppId: string; nome: string; ordem: number;
  ativo: boolean; metadados?: unknown; criadoEm?: string | null; alteradoEm?: string | null;
}

export interface Food99Categoria {
  id: number; lojaFood99Id: number; menuLojaFood99Id: number | null;
  menuAppId: string | null; nomeMenu: string | null; categoriaAppId: string;
  nome: string; ordem: number; ativo: boolean; metadados?: unknown;
  criadoEm?: string | null; alteradoEm?: string | null;
}

export interface Food99ItemCatalogo {
  id: number; lojaFood99Id: number; categoriaLojaFood99Id: number | null;
  cadastroId: number | null; produtoId: number; gradeId: number | null;
  itemAppId: string; categoriaAppId: string | null; nomeCategoria: string | null;
  menuAppId: string | null; nomeMenu: string | null; idExternoApp: string | null;
  nome: string; descricaoCurta: string | null; imagemPrincipal: string | null;
  origemPreco: 'produto' | 'grade' | 'override'; valorPreco: string | number | null;
  precoCentavos: number | null; taxa: number | null; ativo: boolean;
  statusPublicacao: Food99StatusPublicacaoItem; ultimaPublicacaoEm: string | null;
  ultimaMensagemErro: string | null; criadoEm?: string | null; alteradoEm?: string | null;
}

export interface Food99CategoriaProdutoLocal { id: number; nome: string; }
export interface Food99ProdutoLocal { produtoId: number; gradeId: number; nome: string; codigoBarras: string; plu: string; estoque: number; valor: number; }
export interface Food99MenusResponse { lojaAppId: string; lojaFood99Id: number; visao: 'local' | 'published'; origem?: string; menus: Food99Menu[]; }
export interface Food99CategoriasResponse { lojaAppId: string; lojaFood99Id: number; visao: 'local' | 'published'; origem?: string; categorias: Food99Categoria[]; }
export interface Food99ItensResponse { lojaAppId: string; lojaFood99Id: number; visao: 'local' | 'published'; origem?: string; itens: Food99ItemCatalogo[]; }
export interface Food99ProdutosLocaisResponse { itens: Food99ProdutoLocal[]; categorias: Food99CategoriaProdutoLocal[]; paginacao: { pagina: number; itensPorPagina: number; total: number; ultimaPagina: number }; }
export interface Food99AddProdutosLocaisResponse { adicionados: number; ignorados: number; itens: Food99ItemCatalogo[]; }
export interface Food99PublicacaoResponse { lojaAppId: string; tarefaId: number; status: string; itensPublicados: number; itemAppIdsPublicados: string[]; estatisticas?: Record<string, unknown>; }
export interface Food99TarefasPublicacaoResponse { lojaAppId: string; lojaFood99Id: number; tarefas: Array<{ id: number; lojaFood99Id: number; tipoEvento: string; status: string; usuarioId: number | null; iniciadoEm: string | null; finalizadoEm: string | null; mensagemErro: string | null; criadoEm?: string | null; alteradoEm?: string | null }>; }
