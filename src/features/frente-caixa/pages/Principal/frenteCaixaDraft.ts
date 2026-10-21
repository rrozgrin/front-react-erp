import type { CouponTableItem } from '@/features/operacao-comercial/components/CouponTable';
import type { ItemSelectorProduct } from '@/features/operacao-comercial/components/ItemSelector';
import type { ProdutoItem } from '@/features/operacao-comercial/data/produtosMock';
import { formatarMoedaBRLDeCentavos } from '@/utils/formatadores';

export interface FrenteCaixaDraft {
    items: CouponTableItem[];
    totalCentavos: number;
    product: ItemSelectorProduct;
}

export const frenteCaixaDraftInicial: FrenteCaixaDraft = {
    items: [],
    totalCentavos: 0,
    product: {
        nome: 'Selecione um produto',
        quantidade: '1,000',
        valorUnitario: '0,00',
        codigoBarras: '',
        valorTotal: '0,00',
    },
};

export const formatarTotalCompra = (draft: FrenteCaixaDraft): string =>
    formatarMoedaBRLDeCentavos(draft.totalCentavos);

export function incluirProdutoNoRascunho(draft: FrenteCaixaDraft, produto: ProdutoItem): FrenteCaixaDraft {
    const centavos = Math.round(Number(produto.preco.replace(/\./g, '').replace(',', '.')) * 100);
    if (!Number.isFinite(centavos) || centavos < 0) {
        throw new Error('Preco do produto invalido.');
    }

    const valorUnitario = (centavos / 100).toFixed(2);
    return {
        items: [
            ...draft.items,
            {
                item: String(draft.items.length + 1),
                codigo: produto.codigo,
                nome: produto.nome,
                un: produto.unidade,
                qtd: '1.000',
                unit: valorUnitario,
                desc: '0.00',
                acres: '0.00',
                total: valorUnitario,
            },
        ],
        totalCentavos: draft.totalCentavos + centavos,
        product: {
            nome: produto.nome,
            quantidade: '1,000',
            valorUnitario: produto.preco,
            codigoBarras: produto.codigoBarras,
            valorTotal: produto.preco,
        },
    };
}
