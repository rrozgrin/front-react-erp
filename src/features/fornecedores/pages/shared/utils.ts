import type { Fornecedores } from '../../types/Fornecedores';
import { criarFiltroPeriodo } from '../../../../common/components/Templates/listagemUtils';

const fornecedorDateMap: Record<string, string> = {
    '1': '2026-01-10',
    '2': '2026-01-18',
    '3': '2026-02-05',
    '4': '2026-02-21',
    '5': '2026-03-03',
    '6': '2026-03-19',
};

export function getFornecedorReferenceDate(fornecedor: Fornecedores): string {
    return fornecedorDateMap[String(fornecedor.id)] ?? '2026-01-01';
}

export const matchesDateRange = criarFiltroPeriodo(getFornecedorReferenceDate);
