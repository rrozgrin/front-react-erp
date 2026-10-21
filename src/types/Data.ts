export const dataBR = new Intl.DateTimeFormat('pt-BR');

export const dataHoraBR = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

const parseData = (value: string | Date): Date => {
    if (value instanceof Date) return value;
    return new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value);
};

export const formatarDataBR = (value?: string | Date | null, fallback = '-'): string => {
    if (!value) return fallback;

    const date = parseData(value);
    if (Number.isNaN(date.getTime())) return typeof value === 'string' ? value : fallback;

    return dataBR.format(date);
};

export const formatarDataHoraBR = (value?: string | Date | null, fallback = '-'): string => {
    if (!value) return fallback;

    const date = parseData(value);
    if (Number.isNaN(date.getTime())) return typeof value === 'string' ? value : fallback;

    return dataHoraBR.format(date);
};
