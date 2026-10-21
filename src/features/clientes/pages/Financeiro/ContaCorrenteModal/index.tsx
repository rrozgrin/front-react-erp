import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    FiCreditCard,
    FiDollarSign,
    FiFileText,
    FiMinusCircle,
    FiPlusCircle,
    FiPrinter,
    FiSave,
} from 'react-icons/fi';
import {
    Table,
    type TableField,
} from '../../../../../common/components/Table';
import { FinanceiroSummaryCards } from '@/features/financeiro';
import { FiltroPeriodoFinanceiro } from '../FiltroPeriodoFinanceiro';
import {
    ModalSimple,
} from '../../../../../common/components/ModalSimple';
import { Botao } from '../../../../../common/components/Buttons/Botao';
import { formatarDataBR } from '../../../../../types/Data';
import {
    Body,
    FieldGroup,
    Input,
    LaunchForm,
    Panel,
    PanelTitle,
    ReportBody,
    ReportFilters,
    Segmented,
    SummaryWrap,
    TableWrap,
    TypeBadge,
    TypeButton,
    TypeFilter,
} from './styled';
import {
    formatCurrencyBRL,
    getFirstOfMonth,
    getToday,
    MoneyCell,
    PeriodShortcut,
    resolvePeriodShortcut,
} from '../shared/financeiroClienteShared';

type TipoLancamento = 'credito' | 'debito';
type TipoFiltroRelatorio = 'todos' | TipoLancamento;

interface ContaCorrenteLancamento {
    id: string;
    data: string;
    dataISO: string;
    descricao: string;
    tipo: TipoLancamento;
    valor: number;
}

interface ContaCorrenteModalProps {
    open: boolean;
    clienteNome?: string;
    onClose: () => void;
}

const printElement = (target: HTMLElement, title: string) => {
    const printWindow = window.open('', '_blank', 'width=1024,height=768');

    if (!printWindow) {
        return;
    }

    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map((node) => node.outerHTML)
        .join('\n');

    printWindow.document.write(`
        <html>
            <head>
                <title>${title}</title>
                ${styles}
                <style>
                    @page { size: A4 landscape; margin: 14mm; }
                    body { margin: 0; padding: 0; background: #fff; }
                    .print-title { margin: 0 0 var(--space-md); color: #1d4f91; font-size: 22px; font-weight: 500; }
                    button, input, select, textarea, [data-print-hidden="true"] { display: none !important; }
                    table { width: 100% !important; }
                </style>
            </head>
            <body>
                <h1 class="print-title">${title}</h1>
                ${target.outerHTML}
            </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 300);
};

const contaCorrenteFields: TableField<ContaCorrenteLancamento>[] = [
    {
        id: 'data',
        header: 'Data',
        accessorKey: 'data',
        width: '110px',
        align: 'center',
        canHide: false,
    },
    {
        id: 'descricao',
        header: 'Descrição',
        accessorKey: 'descricao',
        canHide: false,
    },
    {
        id: 'tipo',
        header: 'Tipo',
        accessorKey: 'tipo',
        width: '110px',
        align: 'center',
        canHide: false,
        cell: (value) => {
            const tipo = value as TipoLancamento;

            return (
                <TypeBadge $variant={tipo}>
                    {tipo === 'credito' ? 'Crédito' : 'Débito'}
                </TypeBadge>
            );
        },
    },
    {
        id: 'valor',
        header: 'Valor',
        accessorKey: 'valor',
        width: '130px',
        align: 'right',
        canHide: false,
        cell: (value, row) => {
            return (
                <MoneyCell $tone={row.tipo === 'credito' ? 'positive' : 'negative'}>
                    {formatCurrencyBRL.format(Number(value))}
                </MoneyCell>
            );
        },
    },
];

const contaCorrenteReportFields: TableField<ContaCorrenteLancamento>[] = [
    {
        id: 'dataLancamento',
        header: 'Data Lançamento',
        accessorKey: 'data',
        width: '150px',
        align: 'center',
        canHide: false,
    },
    {
        id: 'descricao',
        header: 'Descrição',
        accessorKey: 'descricao',
        canHide: false,
    },
    {
        id: 'tipoLancamento',
        header: 'Tipo Lançamento',
        accessorKey: 'tipo',
        width: '160px',
        align: 'center',
        canHide: false,
        cell: (value) => {
            const tipo = value as TipoLancamento;

            return (
                <TypeBadge $variant={tipo}>
                    {tipo === 'credito' ? 'Crédito' : 'Débito'}
                </TypeBadge>
            );
        },
    },
    {
        id: 'valor',
        header: 'Valor',
        accessorKey: 'valor',
        width: '150px',
        align: 'right',
        canHide: false,
        cell: (value, row) => {
            return (
                <MoneyCell $tone={row.tipo === 'credito' ? 'positive' : 'negative'}>
                    {formatCurrencyBRL.format(Number(value))}
                </MoneyCell>
            );
        },
    },
];

interface ContaCorrenteRelatorioModalProps {
    open: boolean;
    clienteNome?: string;
    lancamentos: ContaCorrenteLancamento[];
    onClose: () => void;
}

const ContaCorrenteRelatorioModal: React.FC<ContaCorrenteRelatorioModalProps> = ({
    open,
    clienteNome,
    lancamentos,
    onClose,
}) => {
    const [dataInicio, setDataInicio] = useState(getFirstOfMonth());
    const [dataFim, setDataFim] = useState(getToday());
    const [tipoFiltro, setTipoFiltro] = useState<TipoFiltroRelatorio>('todos');
    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose, open]);

    const aplicarAtalho = (tipo: PeriodShortcut) => {
        const period = resolvePeriodShortcut(tipo);
        setDataInicio(period.dataInicio);
        setDataFim(period.dataFim);
    };

    const lancamentosFiltrados = useMemo(() => {
        return lancamentos.filter((lancamento) => {
            const matchesTipo = tipoFiltro === 'todos' || lancamento.tipo === tipoFiltro;
            const matchesInicio = !dataInicio || lancamento.dataISO >= dataInicio;
            const matchesFim = !dataFim || lancamento.dataISO <= dataFim;

            return matchesTipo && matchesInicio && matchesFim;
        });
    }, [dataFim, dataInicio, lancamentos, tipoFiltro]);

    const handlePrint = () => {
        if (!printRef.current) {
            return;
        }

        printElement(printRef.current, `Relatório de Conta Corrente${clienteNome ? ` - ${clienteNome}` : ''}`);
    };

    if (!open) {
        return null;
    }

    return (
        <ModalSimple
            title="Relatório de Conta Corrente"
            subtitle="Filtre os lançamentos por período e tipo."
            onClose={onClose}
            size="xl"
            footer={(
                <>
                    <Botao nome="Imprimir" action={handlePrint} icone={<FiPrinter />} />
                    <Botao nome="Fechar" action={onClose} variant="secondary" />
                </>
            )}
        >
            <ReportBody>
                <ReportFilters>
                    <FiltroPeriodoFinanceiro
                        dataInicio={dataInicio}
                        dataFim={dataFim}
                        onDataInicioChange={setDataInicio}
                        onDataFimChange={setDataFim}
                        onAplicarAtalho={aplicarAtalho}
                    />

                    <TypeFilter>
                        <span>Tipo de lançamento</span>
                        <Segmented>
                            <TypeButton type="button" $active={tipoFiltro === 'todos'} $variant="credito" onClick={() => setTipoFiltro('todos')}>
                                Todos
                            </TypeButton>
                            <TypeButton type="button" $active={tipoFiltro === 'credito'} $variant="credito" onClick={() => setTipoFiltro('credito')}>
                                <FiPlusCircle />
                                Crédito
                            </TypeButton>
                            <TypeButton type="button" $active={tipoFiltro === 'debito'} $variant="debito" onClick={() => setTipoFiltro('debito')}>
                                <FiMinusCircle />
                                Débito
                            </TypeButton>
                        </Segmented>
                    </TypeFilter>
                </ReportFilters>

                <TableWrap ref={printRef}>
                    <Table
                        data={lancamentosFiltrados}
                        fields={contaCorrenteReportFields}
                        emptyMessage="Nenhum lançamento encontrado para os filtros selecionados."
                        showHeader={false}
                        showColumnSelector={false}
                        compact
                    />
                </TableWrap>
            </ReportBody>
        </ModalSimple>
    );
};

export const ContaCorrenteModal: React.FC<ContaCorrenteModalProps> = ({
    open,
    clienteNome,
    onClose,
}) => {
    const [lancamentos, setLancamentos] = useState<ContaCorrenteLancamento[]>([]);
    const [tipo, setTipo] = useState<TipoLancamento>('credito');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [showRelatorioModal, setShowRelatorioModal] = useState(false);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose, open]);

    const saldoAtual = useMemo(() => {
        return lancamentos.reduce((total, lancamento) => {
            const signedValue = lancamento.tipo === 'credito' ? lancamento.valor : -lancamento.valor;
            return total + signedValue;
        }, 2540);
    }, [lancamentos]);

    const limiteDisponivel = 5000;

    const summaryItems = useMemo(() => [
        {
            label: 'Limite disponível',
            value: formatCurrencyBRL.format(limiteDisponivel),
            icon: <FiCreditCard />,
        },
        {
            label: 'Saldo atual',
            value: formatCurrencyBRL.format(saldoAtual),
            icon: <FiDollarSign />,
        },
    ], [saldoAtual]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsedValue = Number(valor.replace(',', '.'));
        const cleanDescricao = descricao.trim();

        if (!cleanDescricao || !Number.isFinite(parsedValue) || parsedValue <= 0) {
            return;
        }

        setLancamentos((current) => [
            ...current,
            {
                id: String(Date.now()),
                data: formatarDataBR(new Date()),
                dataISO: getToday(),
                descricao: cleanDescricao,
                tipo,
                valor: parsedValue,
            },
        ]);
        setDescricao('');
        setValor('');
        setTipo('credito');
    };

    if (!open) {
        return null;
    }

    return (
        <>
            <ModalSimple
                title="Conta Corrente"
                subtitle={clienteNome ? `Gerencie os lançamentos de ${clienteNome}.` : 'Gerencie seus lançamentos e consulte o saldo da conta.'}
                onClose={onClose}
                size="xl"
                footer={(
                    <>
                        <Botao nome="Abrir relatório" action={() => setShowRelatorioModal(true)} icone={<FiFileText />} />
                        <Botao nome="Fechar" action={onClose} variant="secondary" />
                    </>
                )}
            >
                <Body>
                    <SummaryWrap>
                        <FinanceiroSummaryCards items={summaryItems} />
                    </SummaryWrap>

                    <Panel>
                        <PanelTitle>Histórico de lançamentos</PanelTitle>
                        <TableWrap>
                            <Table
                                data={lancamentos}
                                fields={contaCorrenteFields}
                                emptyMessage="Nenhum lançamento registrado ainda. Use o formulário abaixo para adicionar um novo lançamento."
                                showHeader={false}
                                showColumnSelector={false}
                                compact
                            />
                        </TableWrap>
                    </Panel>

                    <Panel>
                        <PanelTitle>Novo lançamento</PanelTitle>
                        <LaunchForm onSubmit={handleSubmit}>
                            <FieldGroup>
                                Tipo
                                <Segmented>
                                    <TypeButton
                                        type="button"
                                        $active={tipo === 'credito'}
                                        $variant="credito"
                                        onClick={() => setTipo('credito')}
                                    >
                                        <FiPlusCircle />
                                        Crédito
                                    </TypeButton>
                                    <TypeButton
                                        type="button"
                                        $active={tipo === 'debito'}
                                        $variant="debito"
                                        onClick={() => setTipo('debito')}
                                    >
                                        <FiMinusCircle />
                                        Débito
                                    </TypeButton>
                                </Segmented>
                            </FieldGroup>

                            <FieldGroup>
                                Descrição
                                <Input
                                    value={descricao}
                                    onChange={(event) => setDescricao(event.target.value)}
                                    placeholder="Ex.: Pagamento de cliente, compra de material..."
                                />
                            </FieldGroup>

                            <FieldGroup>
                                Valor
                                <Input
                                    value={valor}
                                    onChange={(event) => setValor(event.target.value)}
                                    inputMode="decimal"
                                    placeholder="0,00"
                                />
                            </FieldGroup>

                            <Botao
                                nome="Salvar lançamento"
                                type="submit"
                                action={() => undefined}
                                icone={<FiSave />}
                            />
                        </LaunchForm>
                    </Panel>
                </Body>
            </ModalSimple>

            <ContaCorrenteRelatorioModal
                open={showRelatorioModal}
                clienteNome={clienteNome}
                lancamentos={lancamentos}
                onClose={() => setShowRelatorioModal(false)}
            />
        </>
    );
};
