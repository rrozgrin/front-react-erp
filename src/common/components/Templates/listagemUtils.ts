import type { ExcelColumn } from '../Actions/GerarExcel';
import type { TableField } from '../Table';

type ValorExportavel = string | number | boolean | null | undefined | Date;

export const normalizarTexto = (value: unknown) => String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

export const criarPesquisaPorCampos = <TData>(
    obterCampos: (item: TData) => unknown[],
) => (item: TData, termo: string) => obterCampos(item)
    .some((campo) => normalizarTexto(campo).includes(termo));

export const converterData = (value: string | Date | null | undefined) => {
    if (!value) return null;
    if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : new Date(value);

    const dataBr = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
    const data = dataBr
        ? new Date(Number(dataBr[3]), Number(dataBr[2]) - 1, Number(dataBr[1]))
        : new Date(value.length === 10 ? `${value}T00:00:00` : value);

    return Number.isNaN(data.getTime()) ? null : data;
};

export const criarFiltroPeriodo = <TData>(
    obterData: (item: TData) => string | Date | null | undefined,
) => (item: TData, dataInicio: string, dataFim: string) => {
    if (!dataInicio && !dataFim) return true;

    const dataItem = converterData(obterData(item));
    const inicio = converterData(dataInicio);
    const fim = converterData(dataFim);

    if (!dataItem) return false;
    if (inicio && dataItem < inicio) return false;

    if (fim) {
        fim.setHours(23, 59, 59, 999);
        if (dataItem > fim) return false;
    }

    return true;
};

export const criarColunasExcel = <TData>(
    campos: TableField<TData>[],
    sobrescritas: Partial<Record<string, Partial<ExcelColumn<TData>> | false>> = {},
): ExcelColumn<TData>[] => campos.flatMap((campo) => {
    const sobrescrita = sobrescritas[campo.id];
    if (sobrescrita === false || (!campo.accessorKey && !campo.accessorFn && !sobrescrita)) return [];

    return [{
        key: campo.id,
        header: campo.header,
        accessorKey: campo.accessorKey,
        accessorFn: campo.accessorFn as ((row: TData) => ValorExportavel) | undefined,
        ...sobrescrita,
    }];
});
