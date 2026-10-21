import { TableField } from '@/common/components/Table';

export interface FinanceiroRow {
    dataPagamento: string;
    nome: string;
    documento: string;
    meioPagamento: string;
    parcela: string;
    vencimento: string;
    localPagamento: string;
    valorRecebido: string;
    jurosMora: string;
    usuario: string;
}

export const camposFinanceiro: TableField<FinanceiroRow>[] = [
    { id: 'dataPagamento', header: 'Data Pagamento', accessorKey: 'dataPagamento', defaultVisible: true, width: '132px' },
    { id: 'nome', header: 'Nome', accessorKey: 'nome', defaultVisible: true, width: '220px' },
    { id: 'documento', header: 'Documento', accessorKey: 'documento', defaultVisible: true, width: '140px' },
    { id: 'meioPagamento', header: 'Meio de Pagamento', accessorKey: 'meioPagamento', defaultVisible: true, width: '170px' },
    { id: 'parcela', header: 'Parcela', accessorKey: 'parcela', defaultVisible: true, align: 'center', width: '100px' },
    { id: 'vencimento', header: 'Vencimento', accessorKey: 'vencimento', defaultVisible: true, width: '120px' },
    { id: 'localPagamento', header: 'Local Pagamento', accessorKey: 'localPagamento', defaultVisible: true, width: '160px' },
    { id: 'valorRecebido', header: 'Valor Recebido', accessorKey: 'valorRecebido', defaultVisible: true, align: 'right', width: '140px' },
    { id: 'jurosMora', header: 'Juros/Mora', accessorKey: 'jurosMora', defaultVisible: true, align: 'right', width: '120px' },
    { id: 'usuario', header: 'Usuário', accessorKey: 'usuario', defaultVisible: true, width: '140px' },
];

export const dadosFinanceiro: FinanceiroRow[] = [];
