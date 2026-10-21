export interface Entrega {
    id: string | number;
    data: string;
    cliente: string;
    contato: string;
    valorTotal: number;
    dataPrevista?: string;
}
