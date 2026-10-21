export const moedaBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const quantidadeBR = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
});

export const formatarMoedaBRL = (
    valor: string | number | null | undefined,
    valorEmCentavos?: number | null,
): string => {
    const numero = valor !== null && valor !== undefined && valor !== ''
        ? Number(valor)
        : Number(valorEmCentavos ?? 0) / 100;

    return moedaBRL.format(Number.isFinite(numero) ? numero : 0);
};

export const formatarMoedaBRLDeCentavos = (valor: number | null | undefined): string =>
    formatarMoedaBRL(null, valor);

export const formatarCampoMoedaBRL = (valor: string): string => {
    const centavos = valor.replace(/\D/g, '');
    return formatarMoedaBRL(Number(centavos || 0) / 100);
};

export const converterMoedaBRLParaNumero = (valor: string): number => {
    const valorLimpo = valor.replace(/[^\d,.-]/g, '');
    const valorNormalizado = valorLimpo.includes(',')
        ? valorLimpo.replace(/\./g, '').replace(',', '.')
        : valorLimpo;
    const numero = Number(valorNormalizado);

    return Number.isFinite(numero) ? numero : 0;
};
