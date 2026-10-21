import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import { Botao } from '../../Buttons/Botao';

interface PeriodoInputProps {
    onChange: (dataInicio: string, dataFim: string) => void;
    modo?: 'imediato' | 'confirmar';
    larguraTotal?: boolean;
    dataInicio?: string;
    dataFim?: string;
}

const FieldsRow = styled.div<{ $larguraTotal: boolean }>`
    display: flex;
    align-items: stretch;
    gap: var(--space-xs);
    width: ${({ $larguraTotal }) => ($larguraTotal ? '100%' : 'fit-content')};
    max-width: 100%;

    @media (max-width: 767px) {
        width: 100%;
        flex-wrap: wrap;
    }
`;

const DateFieldWrap = styled.label<{ $larguraTotal: boolean }>`
    position: relative;
    flex: ${({ $larguraTotal }) => ($larguraTotal ? '1' : '0 0 10.625rem')};
    min-width: ${({ $larguraTotal }) => ($larguraTotal ? '0' : '10.625rem')};

    @media (max-width: 767px) {
        flex-basis: ${({ $larguraTotal }) => ($larguraTotal ? 'calc(50% - var(--space-xs))' : '100%')};
        min-width: 0;
    }
`;

const DateField = styled.input<{ $hasValue: boolean }>`
    width: 100%;
    min-height: var(--control-height-sm);
    padding: var(--space-xs) var(--space-sm);
    border: 1px solid var(--theme-border, var(--bs-border-color));
    border-radius: 0.125rem;
    background: var(--theme-surface, var(--bs-white));
    color: ${({ $hasValue }) => ($hasValue ? 'var(--theme-text, var(--bs-body-color))' : 'transparent')};
    font-size: var(--font-size-sm);
    outline: none;

    &:focus {
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: var(--shadow-focus);
        color: var(--theme-text, var(--bs-body-color));
    }
`;

const FieldText = styled.span<{ $hidden: boolean }>`
    position: absolute;
    left: var(--space-sm);
    top: 50%;
    transform: translateY(-50%);
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-xs);
    pointer-events: none;
    opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
`;

export const PeriodoInput = ({
    onChange,
    modo = 'imediato',
    larguraTotal = false,
    dataInicio: dataInicioControlada,
    dataFim: dataFimControlada,
}: PeriodoInputProps) => {
    const [dataInicio, setDataInicio] = useState(dataInicioControlada ?? '');
    const [dataFim, setDataFim] = useState(dataFimControlada ?? '');

    useEffect(() => {
        if (dataInicioControlada !== undefined) setDataInicio(dataInicioControlada);
    }, [dataInicioControlada]);

    useEffect(() => {
        if (dataFimControlada !== undefined) setDataFim(dataFimControlada);
    }, [dataFimControlada]);

    const alterar = (inicio: string, fim: string) => {
        setDataInicio(inicio);
        setDataFim(fim);
        if (modo === 'imediato') onChange(inicio, fim);
    };

    return (
        <FieldsRow $larguraTotal={larguraTotal}>
            <DateFieldWrap $larguraTotal={larguraTotal}>
                <DateField type="date" value={dataInicio} $hasValue={Boolean(dataInicio)} aria-label="Data Início" onChange={(event) => alterar(event.target.value, dataFim)} />
                <FieldText $hidden={Boolean(dataInicio)}>DATA INÍCIO</FieldText>
            </DateFieldWrap>
            <DateFieldWrap $larguraTotal={larguraTotal}>
                <DateField type="date" value={dataFim} $hasValue={Boolean(dataFim)} aria-label="Data Fim" onChange={(event) => alterar(dataInicio, event.target.value)} />
                <FieldText $hidden={Boolean(dataFim)}>DATA FIM</FieldText>
            </DateFieldWrap>
            {modo === 'confirmar' && (
                <Botao nome="Pesquisar" action={() => onChange(dataInicio, dataFim)} disabled={!dataInicio || !dataFim} icone={<FaSearch />} />
            )}
        </FieldsRow>
    );
};
