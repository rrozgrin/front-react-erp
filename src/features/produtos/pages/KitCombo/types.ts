export interface KitComboItem {
    id: number;
    produto: string;
    quantidade: number;
    valorProduto: number;
    valorKitCombo: number;
}

export interface KitCombo {
    id: number;
    nome: string;
    codigoBarras: string;
    valorOriginal: number;
    valorPromocional: number;
    ativo: boolean;
    exibeComanda: boolean;
    itens: KitComboItem[];
}
