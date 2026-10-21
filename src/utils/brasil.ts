export const onlyDigits = (value: string): string => value.replace(/\D/g, '');

export const isCnpj = (value: string): boolean => onlyDigits(value).length === 14;

export const formatCep = (value: string): string => {
    const digits = onlyDigits(value).slice(0, 8);

    if (digits.length <= 5) {
        return digits;
    }

    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

export const formatCpfOrCnpj = (value: string): string => {
    const digits = onlyDigits(value).slice(0, 14);

    if (digits.length <= 11) {
        return digits
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1-$2');
    }

    return digits
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
};

export const formatPhone = (value: string): string => {
    const digits = onlyDigits(value).slice(0, 11);

    if (digits.length <= 2) {
        return digits ? `(${digits}` : '';
    }

    if (digits.length <= 6) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }

    if (digits.length <= 10) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};
