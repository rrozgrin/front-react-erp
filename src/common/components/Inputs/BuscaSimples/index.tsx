import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import styled from 'styled-components';

interface BuscaSimplesProps {
    pesquisa: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onSearch?: (value: string) => void;
    ariaLabel?: string;
}

export const BuscaSimples = React.forwardRef<HTMLInputElement, BuscaSimplesProps>(({
    pesquisa,
    onChange,
    placeholder = 'Digite sua pesquisa...',
    onSearch,
    ariaLabel = 'Pesquisar',
}, ref) => {
    const [valor, setValor] = useState(pesquisa);
    const [focado, setFocado] = useState(false);

    useEffect(() => {
        setValor(pesquisa);
    }, [pesquisa]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValor(e.target.value);
        onChange(e.target.value);
    };

    const handleSearchClick = () => {
        onChange(valor);
        onSearch?.(valor);
    };

    return (
        <SearchRoot>
            <SearchField>
                <SearchInput
                    ref={ref}
                    type="text"
                    value={valor}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                    $focused={focado}
                    onFocus={() => setFocado(true)}
                    onBlur={() => setFocado(false)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            onSearch?.(valor);
                        }
                    }}
                />
                <SearchButton
                    type="button"
                    onClick={handleSearchClick}
                    aria-label={ariaLabel}
                >
                    <IoSearchOutline size={20} />
                </SearchButton>
            </SearchField>
        </SearchRoot>
    );
});

const SearchRoot = styled.div`
    width: 100%;
    padding: 0;
`;

const SearchField = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
`;

const SearchInput = styled.input<{ $focused: boolean }>`
    width: 100%;
    height: 40px;
    padding-left: var(--space-sm);
    border: 1px solid ${({ $focused }) => ($focused ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-border, var(--bs-border-color))')};
    border-radius: 0.125rem;
    background: var(--theme-surface, var(--bs-white));
    color: var(--theme-text, var(--bs-body-color));
    font-size: var(--font-size-md);
    outline: none;
    transition: all 0.2s ease-in-out;
`;

const SearchButton = styled.button`
    position: absolute;
    top: 50%;
    right: var(--space-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--color-main, var(--bs-primary));
    cursor: pointer;
    transform: translateY(-50%);
`;
