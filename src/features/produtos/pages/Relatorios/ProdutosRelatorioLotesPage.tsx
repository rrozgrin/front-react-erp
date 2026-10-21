import { useMemo, useState } from 'react';
import { FiEdit2, FiPlus, FiRepeat } from 'react-icons/fi';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import { Botao } from '../../../../common/components/Buttons/Botao';
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import type { TableField } from '../../../../common/components/Table';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';
import {
    ActionsRow,
    Field,
    FiltersGrid,
    FiltersHeader,
    FiltersPanel,
    SelectField,
    SummaryText,
    TextInput,
    formatDate,
    normalizeText,
} from '../../../../common/components/ReportFilters';

type LoteStatus = 'OK' | 'PROXIMO' | 'VENCIDO' | 'INATIVO';
type LoteTipo = 'XML' | 'MANUAL' | 'AJUSTE';

interface ProdutoLote {
    id: number;
    produto: string;
    codigoBarras: string;
    numeroLote: string;
    fabricacao: string;
    validade: string;
    entrada: number;
    disponivel: number;
    consumida: number;
    tipo: LoteTipo;
    status: LoteStatus;
}

interface NovoLoteFormValues {
    codigo: string;
    numero: string;
    quantidade: string;
    fabricacao: string;
    validade: string;
}

const lotesMockData: ProdutoLote[] = [
    {
        id: 1,
        produto: 'Capa Banco Mod Orig Biz 125 2008',
        codigoBarras: '7899565702107',
        numeroLote: 'LOT2026001',
        fabricacao: '2026-05-01',
        validade: '2026-12-30',
        entrada: 50,
        disponivel: 42,
        consumida: 8,
        tipo: 'XML',
        status: 'OK',
    },
    {
        id: 2,
        produto: 'Óleo Semissintético 10W40',
        codigoBarras: '7891234500012',
        numeroLote: 'OLEO-0626',
        fabricacao: '2026-01-10',
        validade: '2026-07-05',
        entrada: 80,
        disponivel: 12,
        consumida: 68,
        tipo: 'MANUAL',
        status: 'PROXIMO',
    },
    {
        id: 3,
        produto: 'Produto Perecível Teste',
        codigoBarras: '7890000001111',
        numeroLote: 'VENC-001',
        fabricacao: '2025-01-01',
        validade: '2026-01-15',
        entrada: 20,
        disponivel: 4,
        consumida: 16,
        tipo: 'AJUSTE',
        status: 'VENCIDO',
    },
];

const ModalFormGrid = styled.div`
    display: grid;
    gap: var(--space-sm);
`;

const StatusFilters = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
`;

const StatusPill = styled.button<{ $active: boolean; $status: LoteStatus }>`
    border: 0;
    border-radius: 0.1875rem;
    padding: 7px 10px;
    color: #ffffff;
    font-size: 0.78rem;
    font-weight: 800;
    opacity: ${({ $active }) => ($active ? 1 : 0.35)};
    box-shadow: ${({ $active }) => ($active ? '0 0 0 2px rgba(0, 0, 0, 0.18)' : 'none')};
    background: ${({ $status }) => {
        if ($status === 'OK') return '#16a34a';
        if ($status === 'PROXIMO') return '#f59e0b';
        if ($status === 'VENCIDO') return '#dc2626';
        return '#64748b';
    }};
`;

const Badge = styled.span<{ $status?: LoteStatus; $tipo?: LoteTipo }>`
    display: inline-flex;
    justify-content: center;
    min-width: 74px;
    padding: 5px var(--space-xs);
    border-radius: 0.1875rem;
    color: ${({ $tipo }) => ($tipo ? '#0f172a' : '#ffffff')};
    font-size: var(--font-size-xs);
    font-weight: 800;
    background: ${({ $status, $tipo }) => {
        if ($tipo === 'XML') return '#d9edf7';
        if ($tipo === 'MANUAL') return '#fcf8e3';
        if ($tipo === 'AJUSTE') return '#f2dede';
        if ($status === 'OK') return '#16a34a';
        if ($status === 'PROXIMO') return '#f59e0b';
        if ($status === 'VENCIDO') return '#dc2626';
        return '#64748b';
    }};
`;

const MethodInfo = styled.div`
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: 0.1875rem;
    background: var(--theme-surface-muted, #f8fafc);
    padding: var(--space-sm) 14px;
    color: var(--theme-text-soft, #475569);
    font-size: 0.95rem;
`;

const statusLabels: Record<LoteStatus, string> = {
    OK: 'OK',
    PROXIMO: 'PRÓX. VENC.',
    VENCIDO: 'VENCIDO',
    INATIVO: 'INATIVO',
};

const fields: TableField<ProdutoLote>[] = [
    { id: 'produto', header: 'Produto', accessorKey: 'produto', defaultVisible: true },
    { id: 'codigoBarras', header: 'Cód. Barra', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'numeroLote', header: 'Nº Lote', accessorKey: 'numeroLote', defaultVisible: true },
    { id: 'fabricacao', header: 'Fabricação', accessorFn: (row) => formatDate(row.fabricacao), defaultVisible: true },
    { id: 'validade', header: 'Validade', accessorFn: (row) => formatDate(row.validade), defaultVisible: true },
    { id: 'entrada', header: 'Entrada', accessorFn: (row) => row.entrada.toFixed(3), align: 'right', defaultVisible: true },
    { id: 'disponivel', header: 'Disponível', accessorFn: (row) => row.disponivel.toFixed(3), align: 'right', defaultVisible: true },
    { id: 'consumida', header: 'Consumida', accessorFn: (row) => row.consumida.toFixed(3), align: 'right', defaultVisible: true },
    {
        id: 'tipo',
        header: 'Tipo',
        accessorKey: 'tipo',
        align: 'center',
        defaultVisible: true,
        cell: (value) => <Badge $tipo={value as LoteTipo}>{String(value)}</Badge>,
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        align: 'center',
        defaultVisible: true,
        cell: (value) => <Badge $status={value as LoteStatus}>{statusLabels[value as LoteStatus]}</Badge>,
    },
];

const NovoLoteModal = ({
    values,
    error,
    onChange,
    onClose,
    onSave,
}: {
    values: NovoLoteFormValues;
    error: string;
    onChange: (field: keyof NovoLoteFormValues, value: string) => void;
    onClose: () => void;
    onSave: () => void;
}) => (
    <ModalSimple
        title="Cadastrar Novo Lote"
        onClose={onClose}
        footer={(
            <>
                <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Cancelar</ModalSimpleActionButton>
                <ModalSimpleActionButton type="button" onClick={onSave}>Salvar</ModalSimpleActionButton>
            </>
        )}
    >
        <ModalFormGrid>
            <Field $span={12}>
                <span>Código de barras</span>
                <TextInput value={values.codigo} onChange={(event) => onChange('codigo', event.target.value)} />
            </Field>
            <Field $span={12}>
                <span>Número do lote</span>
                <TextInput value={values.numero} onChange={(event) => onChange('numero', event.target.value)} />
            </Field>
            <Field $span={12}>
                <span>Quantidade</span>
                <TextInput value={values.quantidade} onChange={(event) => onChange('quantidade', event.target.value)} />
            </Field>
            <Field $span={12}>
                <span>Fabricação</span>
                <TextInput type="date" value={values.fabricacao} onChange={(event) => onChange('fabricacao', event.target.value)} />
            </Field>
            <Field $span={12}>
                <span>Validade</span>
                <TextInput type="date" value={values.validade} onChange={(event) => onChange('validade', event.target.value)} />
            </Field>
            {error ? <SummaryText>{error}</SummaryText> : null}
        </ModalFormGrid>
    </ModalSimple>
);

export const ProdutosRelatorioLotesPage = () => {
    const [lotes, setLotes] = useState<ProdutoLote[]>(lotesMockData);
    const [busca, setBusca] = useState('');
    const [validadeDe, setValidadeDe] = useState('');
    const [validadeAte, setValidadeAte] = useState('');
    const [tipo, setTipo] = useState('todos');
    const [statusSelecionados, setStatusSelecionados] = useState<LoteStatus[]>(['OK']);
    const [showNovoLoteModal, setShowNovoLoteModal] = useState(false);
    const [novoLoteForm, setNovoLoteForm] = useState<NovoLoteFormValues>({
        codigo: '',
        numero: '',
        quantidade: '',
        fabricacao: '',
        validade: '',
    });
    const [novoLoteError, setNovoLoteError] = useState('');

    const lotesFiltrados = useMemo(() => {
        const termo = normalizeText(busca);

        return lotes.filter((lote) => {
            const matchesBusca =
                !termo ||
                normalizeText(lote.produto).includes(termo) ||
                normalizeText(lote.codigoBarras).includes(termo) ||
                normalizeText(lote.numeroLote).includes(termo);
            const matchesStatus = statusSelecionados.length === 0 || statusSelecionados.includes(lote.status);
            const matchesTipo = tipo === 'todos' || lote.tipo === tipo;
            const matchesDe = !validadeDe || lote.validade >= validadeDe;
            const matchesAte = !validadeAte || lote.validade <= validadeAte;

            return matchesBusca && matchesStatus && matchesTipo && matchesDe && matchesAte;
        });
    }, [busca, lotes, statusSelecionados, tipo, validadeAte, validadeDe]);

    const toggleStatus = (status: LoteStatus) => {
        setStatusSelecionados((current) =>
            current.includes(status) ? current.filter((item) => item !== status) : [...current, status]
        );
    };

    const limparFiltros = () => {
        setBusca('');
        setValidadeDe('');
        setValidadeAte('');
        setTipo('todos');
        setStatusSelecionados(['OK']);
    };

    const novoLote = () => {
        const codigo = novoLoteForm.codigo.trim();
        const numero = novoLoteForm.numero.trim();
        const quantidade = Number(novoLoteForm.quantidade.replace(',', '.'));

        if (!codigo || !numero || !quantidade || quantidade <= 0) {
            setNovoLoteError('Preencha código de barras, número do lote e quantidade maior que zero.');
            return;
        }

        setLotes((current) => [
            ...current,
            {
                id: Math.max(0, ...current.map((lote) => lote.id)) + 1,
                produto: 'Produto importado manualmente',
                codigoBarras: codigo,
                numeroLote: numero.toUpperCase(),
                fabricacao: novoLoteForm.fabricacao,
                validade: novoLoteForm.validade,
                entrada: quantidade,
                disponivel: quantidade,
                consumida: 0,
                tipo: 'MANUAL',
                status: 'OK',
            },
        ]);
        setShowNovoLoteModal(false);
        setNovoLoteError('');
        setNovoLoteForm({ codigo: '', numero: '', quantidade: '', fabricacao: '', validade: '' });
    };

    const ajustarLote = async (lote: ProdutoLote) => {
        const result = await Swal.fire<string>({
            title: 'Ajuste de Lote',
            text: `Lote: ${lote.numeroLote}`,
            input: 'number',
            inputValue: String(lote.disponivel),
            showCancelButton: true,
            confirmButtonText: 'Ajustar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                const quantidade = Number(value);
                if (!Number.isFinite(quantidade) || quantidade < 0) return 'Informe uma quantidade válida.';
                return undefined;
            },
        });

        if (!result.isConfirmed || result.value === undefined) return;

        const novaQuantidade = Number(result.value);
        setLotes((current) =>
            current.map((item) =>
                item.id === lote.id
                    ? { ...item, disponivel: novaQuantidade, consumida: Math.max(0, item.entrada - novaQuantidade), tipo: 'AJUSTE' }
                    : item
            )
        );
    };

    const verMovimentacoes = async (lote: ProdutoLote) => {
        await Swal.fire({
            title: 'Histórico de Movimentações',
            html: `
                <div style="text-align:left;font-size: var(--font-size-md);line-height:1.7">
                    <strong>${lote.numeroLote}</strong><br>
                    ENTRADA: ${lote.entrada.toFixed(3)} unidade(s)<br>
                    SAÍDA: ${lote.consumida.toFixed(3)} unidade(s)<br>
                    DISPONÍVEL: ${lote.disponivel.toFixed(3)} unidade(s)
                </div>
            `,
            confirmButtonText: 'Fechar',
        });
    };

    return (
        <RelatorioTemplate
            titulo="Relatório de Lotes"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Lotes Cadastrados"
            descricaoTabela="Lista de lotes, validade, quantidades e status."
            dados={lotesFiltrados}
            campos={fields}
            mensagemVazia="Nenhum lote encontrado."
            acoes={[
                { label: 'Movimentações', icon: <FiRepeat size={16} />, onClick: (lote) => void verMovimentacoes(lote) },
                { label: 'Ajustar', icon: <FiEdit2 size={16} />, variant: 'muted', onClick: (lote) => void ajustarLote(lote) },
            ]}
            impressao={false}
            exibirAcoesFlutuantes={false}
            menuInicialAberto
            modaisAbertos={showNovoLoteModal}
            painelFiltros={<FiltersPanel>
                    <FiltersHeader>
                        <h3>Filtros</h3>
                        <p>Consulte lotes por produto, código de barras, status e validade.</p>
                    </FiltersHeader>

                    <FiltersGrid>
                        <Field $span={5}>
                            <span>Buscar por Nome, Código de Barras ou Lote</span>
                            <TextInput value={busca} onChange={(event) => setBusca(event.target.value)} />
                        </Field>

                        <Field $span={3}>
                            <span>Tipo</span>
                            <SelectField value={tipo} onChange={(event) => setTipo(event.target.value)}>
                                <option value="todos">Todos</option>
                                <option value="XML">XML</option>
                                <option value="MANUAL">Manual</option>
                                <option value="AJUSTE">Ajuste</option>
                            </SelectField>
                        </Field>

                        <Field $span={2}>
                            <span>Validade De</span>
                            <TextInput type="date" value={validadeDe} onChange={(event) => setValidadeDe(event.target.value)} />
                        </Field>

                        <Field $span={2}>
                            <span>Validade Até</span>
                            <TextInput type="date" value={validadeAte} onChange={(event) => setValidadeAte(event.target.value)} />
                        </Field>

                        <Field $span={12}>
                            <span>Status</span>
                            <StatusFilters>
                                {(['OK', 'PROXIMO', 'VENCIDO', 'INATIVO'] as LoteStatus[]).map((status) => (
                                    <StatusPill
                                        key={status}
                                        type="button"
                                        $status={status}
                                        $active={statusSelecionados.includes(status)}
                                        onClick={() => toggleStatus(status)}
                                    >
                                        {statusLabels[status]}
                                    </StatusPill>
                                ))}
                            </StatusFilters>
                        </Field>
                    </FiltersGrid>

                    <ActionsRow>
                        <SummaryText>{lotesFiltrados.length} lote(s) encontrado(s).</SummaryText>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <Botao nome="Limpar Filtros" action={limparFiltros} />
                            <Botao nome="Novo Lote" icone={<FiPlus />} action={() => setShowNovoLoteModal(true)} />
                        </div>
                    </ActionsRow>
                </FiltersPanel>}
            conteudoAntesTabela={<MethodInfo>
                    Método de consumo: <strong>FEFO</strong> - Primeiro a Vencer, Primeiro a Sair | Alerta Próx. Venc.: <strong>30 dias</strong>
                </MethodInfo>}
            conteudoDepoisTabela={showNovoLoteModal ? (
                    <NovoLoteModal
                        values={novoLoteForm}
                        error={novoLoteError}
                        onChange={(field, value) => {
                            setNovoLoteForm((current) => ({ ...current, [field]: value }));
                            setNovoLoteError('');
                        }}
                        onClose={() => {
                            setShowNovoLoteModal(false);
                            setNovoLoteError('');
                        }}
                        onSave={novoLote}
                    />
                ) : null}
        />
    );
};
