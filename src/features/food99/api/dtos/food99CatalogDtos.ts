export type Food99VisaoCatalogoDto = 'local' | 'published';
export type Food99StatusPublicacaoItemDto = 'draft' | 'queued' | 'published' | 'failed';

export interface Food99MenuDto {
  id: number; food99_shop_id: number; app_menu_id: string; menu_name: string;
  sort_order: number; is_active: boolean; metadata?: unknown;
  created_at?: string | null; updated_at?: string | null;
}

export interface Food99CategoriaDto {
  id: number; food99_shop_id: number; food99_shop_menu_id: number | null;
  app_menu_id: string | null; menu_name: string | null; app_category_id: string;
  category_name: string; sort_order: number; is_active: boolean; metadata?: unknown;
  created_at?: string | null; updated_at?: string | null;
}

export interface Food99ItemCatalogoDto {
  id: number; food99_shop_id: number; food99_shop_category_id: number | null;
  id_cadastro: number | null; id_produto: number; id_grade: number | null;
  app_item_id: string; app_category_id: string | null; category_name: string | null;
  app_menu_id: string | null; menu_name: string | null; app_external_id: string | null;
  item_name: string; short_desc: string | null; head_img: string | null;
  price_source: 'produto' | 'grade' | 'override'; price_amount: string | number | null;
  price_cents: number | null; tax_rate: number | null; is_active: boolean;
  publish_status: Food99StatusPublicacaoItemDto; last_published_at: string | null;
  last_error_message: string | null; created_at?: string | null; updated_at?: string | null;
}

export interface Food99MenusResponseDto { app_shop_id: string; food99_shop_id: number; view: Food99VisaoCatalogoDto; source?: string; menus: Food99MenuDto[]; }
export interface Food99CategoriasResponseDto { app_shop_id: string; food99_shop_id: number; view: Food99VisaoCatalogoDto; source?: string; categories: Food99CategoriaDto[]; }
export interface Food99ItensResponseDto { app_shop_id: string; food99_shop_id: number; view: Food99VisaoCatalogoDto; source?: string; items: Food99ItemCatalogoDto[]; }

export interface Food99CategoriaProdutoLocalDto { id: number; name: string; }
export interface Food99ProdutoLocalDto { id_produto: number; id_grade: number; nome: string; codigo_barra: string; plu: string; estoque: number; valor: number; }
export interface Food99ProdutosLocaisResponseDto {
  items: Food99ProdutoLocalDto[]; categories: Food99CategoriaProdutoLocalDto[];
  pagination: { page: number; per_page: number; total: number; last_page: number };
}

export interface Food99MenuUpsertPayloadDto { app_shop_id: string; app_menu_id: string; menu_name: string; sort_order?: number; is_active?: boolean; metadata?: Record<string, unknown>; }
export interface Food99CategoriaUpsertPayloadDto { app_shop_id: string; app_menu_id: string; app_category_id: string; category_name: string; sort_order?: number; is_active?: boolean; metadata?: Record<string, unknown>; }
export interface Food99ItemUpsertPayloadDto { app_shop_id: string; app_category_id: string; id_produto: number; id_grade?: number; app_item_id?: string; app_external_id?: string; item_name: string; short_desc?: string; head_img?: string; price_source?: 'produto' | 'grade' | 'override'; price_cents?: number; price_amount?: number; tax_rate?: number; is_active?: boolean; publish_status?: Food99StatusPublicacaoItemDto; sort_order?: number; }
export interface Food99ConfigurarItemPayloadDto { app_shop_id: string; app_item_id: string; app_category_id: string; app_menu_id?: string; id_produto: number; id_grade?: number; item_name?: string; short_desc?: string; price_amount?: number; price_cents?: number; is_active?: boolean; }
export interface Food99ProdutosLocaisQueryDto { app_shop_id: string; page?: number; per_page?: number; search?: string; category_id?: number; }
export interface Food99AddProdutosLocaisPayloadDto { app_shop_id: string; product_ids: number[]; }
export interface Food99AddProdutosLocaisResponseDto { inserted: number; ignored: number; items: Food99ItemCatalogoDto[]; }
export interface Food99PublicarPayloadDto { app_shop_id: string; app_item_ids?: string[]; }
export interface Food99PublicarResponseDto { app_shop_id: string; job_id: number; status: string; published_items: number; published_app_item_ids: string[]; stats?: Record<string, unknown>; }
export interface Food99TarefaPublicacaoDto { id: number; food99_shop_id: number; event_type: string; status: string; triggered_by_user_id: number | null; started_at: string | null; finished_at: string | null; error_message: string | null; created_at?: string | null; updated_at?: string | null; }
export interface Food99TarefasPublicacaoResponseDto { app_shop_id: string; food99_shop_id: number; jobs: Food99TarefaPublicacaoDto[]; }
