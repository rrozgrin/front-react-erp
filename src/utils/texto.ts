export const normalizarSlug = (valor: string, tamanhoMaximo = 100): string => valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, tamanhoMaximo);

export const escaparHtml = (valor: string): string => valor.replace(
    /[&<>"]/g,
    (caractere) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
    })[caractere] ?? caractere,
);

