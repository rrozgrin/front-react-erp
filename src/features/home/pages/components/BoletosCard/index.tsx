import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AppButtonBase } from '@/common/components/Buttons/buttonBase';
import { formatarMoedaBRL } from '@/utils/formatadores';
import { DashboardTableModal, type DashboardColumn } from '../DashboardTableModal';
import { LinkFeature, type Badge } from '../LinkFeature';

type Boleto = {
    numdoc: string;
    vencimento: string;
    dt_orig: string;
    diasatraso: string;
    valor_boleto: string;
    referencia: string;
    datapg: string | null;
    protocolo?: string;
    tem_nota?: boolean;
};

interface Props {
    baseUrl: string;
}

const Prazo = styled.span<{ $atrasado: boolean }>`
    color: ${({ $atrasado }) => ($atrasado ? '#b22222' : '#155724')};
    font-weight: 600;
`;

const Valor = styled.span<{ $destaque: boolean }>`
    color: ${({ $destaque }) => ($destaque ? '#b22222' : 'var(--color-secondary, var(--bs-primary))')};
    font-weight: 600;
`;

const NotaFiscalButton = styled(AppButtonBase).attrs({ $size: 'modal' })`
    min-height: 30px;
    padding: 0 12px;
    font-size: 12px;
`;

const obterUrlNota = (boleto: Boleto): string | null => {
    if (!boleto.tem_nota) return null;
    return `https://exemplo.com/notafiscal/${boleto.protocolo || boleto.numdoc}`;
};

const obterUrlBoleto = (boleto: Boleto): string => `https://exemplo.com/boleto/${boleto.numdoc}`;

const diferencaDias = (vencimento: string): number => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const [dia, mes, ano] = vencimento.split('/').map(Number);
    const dataVencimento = new Date(ano, mes - 1, dia);
    dataVencimento.setHours(0, 0, 0, 0);

    return Math.floor((dataVencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
};

export const BoletosCard = ({ baseUrl: _baseUrl }: Props) => {
    const [boletos, setBoletos] = useState<Boleto[]>([]);
    const [aberto, setAberto] = useState(false);

    useEffect(() => {
        setBoletos([
            { numdoc: '1001', vencimento: '28/03/2026', dt_orig: '01/03/2026', diasatraso: '-2', valor_boleto: '150.50', referencia: 'Março', datapg: null, tem_nota: true },
            { numdoc: '1002', vencimento: '30/03/2026', dt_orig: '05/03/2026', diasatraso: '2', valor_boleto: '200.00', referencia: 'Março', datapg: null },
            { numdoc: '1003', vencimento: '25/03/2026', dt_orig: '01/03/2026', diasatraso: '-3', valor_boleto: '350.75', referencia: 'Março', datapg: null, tem_nota: true },
            { numdoc: '1004', vencimento: '01/04/2026', dt_orig: '01/03/2026', diasatraso: '3', valor_boleto: '120.00', referencia: 'Abril', datapg: null },
        ]);
    }, []);

    const badges = useMemo<Badge[]>(() => {
        let vencidos = 0;
        let aVencer = 0;

        boletos.forEach((boleto) => {
            const dias = diferencaDias(boleto.vencimento);
            if (dias < 0) vencidos += 1;
            else if (dias <= 5) aVencer += 1;
        });

        return [
            ...(vencidos ? [{ value: vencidos, color: 'danger' as const }] : []),
            ...(aVencer ? [{ value: aVencer, color: 'warning' as const }] : []),
        ];
    }, [boletos]);

    const colunas: DashboardColumn<Boleto>[] = [
        { key: 'numdoc', header: 'Documento', render: (boleto) => boleto.numdoc },
        { key: 'vencimento', header: 'Vencimento', render: (boleto) => boleto.vencimento },
        {
            key: 'diasatraso',
            header: 'Dias atraso',
            render: (boleto) => {
                const dias = Number.parseInt(boleto.diasatraso, 10);
                const texto = dias < 0
                    ? `${Math.abs(dias)} dias de atraso`
                    : dias === 0 ? 'Vence hoje' : `Vence em ${boleto.diasatraso} dias`;
                return <Prazo $atrasado={dias < 0}>{texto}</Prazo>;
            },
        },
        {
            key: 'valor_boleto',
            header: 'Valor',
            align: 'right',
            render: (boleto) => (
                <Valor $destaque={Number.parseInt(boleto.diasatraso, 10) > 0}>
                    {formatarMoedaBRL(boleto.valor_boleto)}
                </Valor>
            ),
        },
        {
            key: 'nota_fiscal',
            header: 'Nota Fiscal',
            align: 'center',
            render: (boleto) => {
                const urlNota = obterUrlNota(boleto);
                return urlNota ? (
                    <NotaFiscalButton
                        type="button"
                        onClick={(evento) => {
                            evento.stopPropagation();
                            window.open(urlNota, '_blank', 'noopener,noreferrer');
                        }}
                    >
                        Ver Nota
                    </NotaFiscalButton>
                ) : '-';
            },
        },
    ];

    return (
        <>
            <LinkFeature
                to="#"
                iconName="fa-solid fa-file-invoice"
                text="Boletos em aberto"
                badges={badges}
                onClick={() => setAberto(true)}
            />

            {aberto ? (
                <DashboardTableModal
                    columns={colunas}
                    emptyMessage="Você não tem boletos em aberto."
                    iconName="fa-solid fa-file-invoice"
                    onClose={() => setAberto(false)}
                    onRowClick={(boleto) => window.open(obterUrlBoleto(boleto), '_blank', 'noopener,noreferrer')}
                    rows={boletos}
                    title="Boletos em aberto"
                    width="800px"
                />
            ) : null}
        </>
    );
};
