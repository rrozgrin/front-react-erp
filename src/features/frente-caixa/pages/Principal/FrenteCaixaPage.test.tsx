// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, it, vi } from 'vitest';
import { FrenteCaixaPage } from './FrenteCaixaPage';

afterEach(() => {
    vi.restoreAllMocks();
});

it('inclui produtos pelo código de barras e atualiza o cupom e o total', () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    render(<MemoryRouter><FrenteCaixaPage /></MemoryRouter>);
    const input = screen.getByRole('textbox', { name: 'Código de barras ou código do produto' });

    const lerCodigo = (codigo: string) => {
        fireEvent.change(input, { target: { value: codigo } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    };

    lerCodigo('7891234567890');
    expect(screen.getByText('R$ 20,00')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Alterar item 1' })).toBeTruthy();
    expect(input).toHaveProperty('value', '');

    lerCodigo('7895551230001');
    expect(screen.getByText('R$ 26,90')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Alterar item 2' })).toBeTruthy();

    lerCodigo('0000000000000');
    expect(screen.getByRole('alert').textContent).toBe('Produto não encontrado.');
    expect(screen.getByText('R$ 26,90')).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
}, 15_000);
