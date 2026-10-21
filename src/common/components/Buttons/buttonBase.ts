import styled, { css } from 'styled-components';

export type AppButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';
export type AppButtonSize = 'page' | 'modal' | 'step';

const variantStyles = {
    primary: css`
        border-color: var(--color-main, var(--bs-primary));
        background: var(--color-main, var(--bs-primary));
        color: var(--color-font, var(--bs-white));

        &:hover,
        &:focus {
            border-color: var(--color-main-hover, var(--color-main, var(--bs-primary)));
            background: var(--color-main-hover, var(--color-main, var(--bs-primary)));
            color: var(--color-font, var(--bs-white));
        }
    `,
    secondary: css`
        border-color: var(--theme-border, var(--bs-border-color));
        background: var(--theme-surface, var(--bs-white));
        color: #000;

        &:hover,
        &:focus {
            border-color: var(--color-main, var(--bs-primary));
            background: var(--theme-surface-muted, rgba(248, 250, 252, 0.95));
            color: #000;
        }
    `,
    success: css`
        border-color: #16a34a;
        background: #16a34a;
        color: var(--bs-white, #fff);

        &:hover,
        &:focus {
            border-color: #15803d;
            background: #15803d;
            color: var(--bs-white, #fff);
        }
    `,
    danger: css`
        border-color: #dc2626;
        background: #dc2626;
        color: var(--bs-white, #fff);

        &:hover,
        &:focus {
            border-color: #b91c1c;
            background: #b91c1c;
            color: var(--bs-white, #fff);
        }
    `,
};

const sizeStyles = {
    page: css`
        min-height: var(--control-height-sm);
        padding: 0 var(--space-md);
        border-radius: 0.125rem;
        font-size: var(--font-size-md);
    `,
    modal: css`
        min-height: 36px;
        padding: 0 14px;
        border-radius: var(--radius-sm);
        font-size: 0.95rem;
    `,
    step: css`
        min-width: 150px;
        min-height: var(--control-height-md);
        padding: 0 20px;
        border-radius: 0.125rem;
        font-size: 0.95rem;
    `,
};

export const AppButtonBase = styled.button<{
    $fullWidth?: boolean;
    $size?: AppButtonSize;
    $variant?: AppButtonVariant;
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
    border: 1px solid;
    font-weight: 500;
    line-height: 1.2;
    cursor: pointer;
    outline: none;
    text-decoration: none;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
    ${({ $size = 'page' }) => sizeStyles[$size]}
    ${({ $variant = 'primary' }) => variantStyles[$variant]}

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        transform: none;
    }
`;
