import type { Transportadoras } from '../../types/Transportadoras';
import { criarFiltroPeriodo } from '../../../../common/components/Templates/listagemUtils';

const transportadoraDateMap: Record<string, string> = {
    '1': '2026-01-10',
    '2': '2026-01-18',
    '3': '2026-02-05',
    '4': '2026-02-21',
    '5': '2026-03-03',
    '6': '2026-03-19',
};

export function getTransportadoraReferenceDate(transportadora: Transportadoras): string {
    return transportadoraDateMap[String(transportadora.id)] ?? '2026-01-01';
}

export const matchesDateRange = criarFiltroPeriodo(getTransportadoraReferenceDate);
