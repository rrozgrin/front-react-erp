import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoCubeOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import { StatusBadge } from '../../../../common/components/PageLayout/styled';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import { Table, type TableField } from '../../../../common/components/Table';
import { Checkbox, Input, Radio, Select } from '../../../../common/components/Ui';
import { formatarDataHoraBR } from '../../../../types/Data';
import { moedaBRL } from '../../../../types/Formatadores';
import type { Produto, ProdutoFormData, ProdutoStatus } from '../../types/Produto';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';
import { produtosMockData } from '../../data/produtosMock';

const ModalAddProdutos = lazy(async () => {
    const module = await import('./ProdutoFormModal');
    return { default: module.ModalAddProdutos };
});

const camposProdutos: TableField<Produto>[] = [
    { id: 'codigoInterno', header: 'Cod. Interno', accessorKey: 'codigoInterno', defaultVisible: true },
    { id: 'nome', header: 'Produto', accessorKey: 'nome', defaultVisible: true },
    { id: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'classificacao', header: 'Classificação', accessorKey: 'classificacao', defaultVisible: true },
    { id: 'estoque', header: 'Qtde. Estoque', accessorKey: 'estoque', defaultVisible: true, align: 'center' },
    {
        id: 'custo',
        header: 'Valor Custo',
        accessorKey: 'custo',
        defaultVisible: true,
        align: 'right',
        cell: (value) => moedaBRL.format(Number(value ?? 0)),
    },
    {
        id: 'venda',
        header: 'Valor Venda',
        accessorKey: 'venda',
        defaultVisible: true,
        align: 'right',
        cell: (value) => moedaBRL.format(Number(value ?? 0)),
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        defaultVisible: true,
        align: 'center',
        cell: (value) => <StatusBadge $variant={value as ProdutoStatus}>{String(value)}</StatusBadge>,
    },
];

const colunasExcelProdutos: ExcelColumn<Produto>[] = [
    { key: 'codigoInterno', header: 'Cod. Interno', accessorKey: 'codigoInterno' },
    { key: 'nome', header: 'Produto', accessorKey: 'nome' },
    { key: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras' },
    { key: 'classificacao', header: 'Classificação', accessorKey: 'classificacao' },
    { key: 'estoque', header: 'Qtde. Estoque', accessorKey: 'estoque' },
    { key: 'custo', header: 'Valor Custo', valueFormatter: (value) => moedaBRL.format(Number(value ?? 0)) },
    { key: 'venda', header: 'Valor Venda', valueFormatter: (value) => moedaBRL.format(Number(value ?? 0)) },
    { key: 'status', header: 'Status', accessorKey: 'status' },
];

const parseMoedaBRL = (value: string) => {
    const normalized = value.replace(/[^\d,-]/g, '').replace(/\./g, '').replace(',', '.');
    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : 0;
};

type BalancaOpcao = 'geracao-carga' | 'quantidade-digitos-etiqueta';
type DigitosPrecosOpcao = '2' | '3';
type ReajusteDirecao = 'a' | 'r';
type ReajusteTipo = 'p' | 'r' | '';

interface ReajustePrecoHistorico {
    id: number;
    dataHora: string;
    usuario: string;
    classificacao: string;
    tipo: string;
    indice: string;
}

interface ReajustePrecoFormValues {
    direcao: ReajusteDirecao;
    classificacao: string;
    fornecedor: string;
    tipo: ReajusteTipo;
    valorPercentual: string;
    valorReal: string;
    precoCusto: boolean;
    precoVenda: boolean;
    precoAtacado: boolean;
    precoPrazo: boolean;
}

const reajusteHistoricoMockData: ReajustePrecoHistorico[] = [
    { id: 1, dataHora: '27/05/2026 09:14', usuario: 'Funcionário Master', classificacao: 'Acessórios', tipo: 'Percentual', indice: '+5%' },
    { id: 2, dataHora: '26/05/2026 17:40', usuario: 'Funcionário Master', classificacao: 'Importado XML', tipo: 'Reais', indice: '+R$ 2,00' },
];

const initialReajusteFormValues: ReajustePrecoFormValues = {
    direcao: 'a',
    classificacao: '0',
    fornecedor: '0',
    tipo: '',
    valorPercentual: '',
    valorReal: '',
    precoCusto: true,
    precoVenda: true,
    precoAtacado: true,
    precoPrazo: true,
};

const camposHistoricoReajuste: TableField<ReajustePrecoHistorico>[] = [
    { id: 'dataHora', header: 'Data/Hora', accessorKey: 'dataHora', defaultVisible: true },
    { id: 'usuario', header: 'Usuário', accessorKey: 'usuario', defaultVisible: true },
    { id: 'classificacao', header: 'Classificação', accessorKey: 'classificacao', defaultVisible: true },
    { id: 'tipo', header: 'Tipo de Reajuste', accessorKey: 'tipo', defaultVisible: true },
    { id: 'indice', header: 'Índice', accessorKey: 'indice', defaultVisible: true },
];

const SuccessAlert = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: var(--space-sm) 14px;
    border: 1px solid #86efac;
    border-radius: var(--radius-sm);
    background: #f0fdf4;
    color: #166534;
    font-size: 0.95rem;
`;

const FieldGrid = styled.div`
    display: grid;
    gap: 14px 18px;
    grid-template-columns: 180px minmax(0, 1fr);
    align-items: start;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const FieldLabel = styled.label`
    color: var(--theme-text-soft, #475569);
    font-size: 0.95rem;
    padding-top: 10px;
`;

const FieldStack = styled.div`
    display: grid;
    gap: 10px;
`;

const RadioGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;

    label {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        color: var(--theme-text-soft, #475569);
        font-size: 0.95rem;
    }
`;

const SelectField = styled(Select)`
    min-height: 40px;
    border-radius: 0.125rem;
    padding: var(--space-xs) 10px;
`;

const InputField = styled(Input)`
    min-height: 40px;
    border-radius: 0.125rem;
    padding: var(--space-xs) 10px;
`;

const InlineOption = styled.label`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    margin-right: 18px;
    color: var(--theme-text-soft, #475569);
    font-size: 0.95rem;
`;

const WarningText = styled.p`
    margin: 6px 0 0;
    color: #dc2626;
    font-size: 0.9rem;
`;

const HistorySection = styled.section`
    border-top: 1px solid var(--theme-border, #d8e2ef);
    padding-top: var(--space-md);

    h4 {
        margin: 0 0 var(--space-sm);
        color: var(--theme-text, #0f172a);
        font-size: var(--font-size-md);
    }
`;

const ReajustePrecosModal = ({
    values,
    history,
    showSuccess,
    onChange,
    onToggle,
    onClose,
    onConfirm,
}: {
    values: ReajustePrecoFormValues;
    history: ReajustePrecoHistorico[];
    showSuccess: boolean;
    onChange: (field: keyof ReajustePrecoFormValues, value: string) => void;
    onToggle: (field: keyof ReajustePrecoFormValues, value: boolean) => void;
    onClose: () => void;
    onConfirm: () => void;
}) => (
    <ModalSimple
        title="Reajustar Preços por Classificação"
        onClose={onClose}
        size="lg"
        footer={(
            <>
                <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Fechar</ModalSimpleActionButton>
                <ModalSimpleActionButton type="button" onClick={onConfirm}>Realizar Reajuste</ModalSimpleActionButton>
            </>
        )}
    >
        {showSuccess && <SuccessAlert>Reajuste realizado com sucesso!</SuccessAlert>}

        <FieldGrid>
            <FieldLabel>Ação:</FieldLabel>
            <RadioGroup>
                <label>
                    <Radio
                        name="direcao-reajuste"
                        checked={values.direcao === 'a'}
                        onChange={() => onChange('direcao', 'a')}
                    />
                    Aumentar Preços
                </label>
                <label>
                    <Radio
                        name="direcao-reajuste"
                        checked={values.direcao === 'r'}
                        onChange={() => onChange('direcao', 'r')}
                    />
                    Reduzir Preços
                </label>
            </RadioGroup>

            <FieldLabel>Classificação:</FieldLabel>
            <FieldStack>
                <SelectField
                    value={values.classificacao}
                    onChange={(event) => onChange('classificacao', event.target.value)}
                >
                    <option value="0">-- Todas --</option>
                    <option value="acessorios">Acessórios</option>
                    <option value="celulares">Celulares e Smartphones</option>
                    <option value="importado">Importado XML</option>
                </SelectField>
            </FieldStack>

            <FieldLabel>Fornecedor:</FieldLabel>
            <FieldStack>
                <SelectField
                    value={values.fornecedor}
                    onChange={(event) => onChange('fornecedor', event.target.value)}
                >
                    <option value="0">-- Todas --</option>
                    <option value="fornecedor-a">Fornecedor A</option>
                    <option value="fornecedor-b">Fornecedor B</option>
                </SelectField>
            </FieldStack>

            <FieldLabel>Índice de Reajuste:</FieldLabel>
            <FieldStack>
                <RadioGroup>
                    <label>
                        <Radio
                            name="tipo-reajuste"
                            checked={values.tipo === 'p'}
                            onChange={() => {
                                onChange('tipo', 'p');
                                onChange('valorReal', '');
                            }}
                        />
                        Percentual (%)
                    </label>
                    <label>
                        <Radio
                            name="tipo-reajuste"
                            checked={values.tipo === 'r'}
                            onChange={() => {
                                onChange('tipo', 'r');
                                onChange('valorPercentual', '');
                            }}
                        />
                        Reais (R$)
                    </label>
                </RadioGroup>

                {values.tipo === 'p' && (
                    <div>
                        <InputField
                            value={values.valorPercentual}
                            onChange={(event) => onChange('valorPercentual', event.target.value)}
                            placeholder="Ex: 5"
                        />
                        <WarningText>
                            ATENÇÃO: Não será possível reverter alterações feitas por reajustes em percentual.
                        </WarningText>
                    </div>
                )}

                {values.tipo === 'r' && (
                    <InputField
                        value={values.valorReal}
                        onChange={(event) => onChange('valorReal', event.target.value)}
                        placeholder="Ex: 2,50"
                    />
                )}
            </FieldStack>

            <FieldLabel>Preços a reajustar:</FieldLabel>
            <FieldStack>
                <div>
                    <InlineOption>
                        <Checkbox
                            checked={values.precoCusto}
                            onChange={(event) => onToggle('precoCusto', event.target.checked)}
                        />
                        Custo
                    </InlineOption>
                    <InlineOption>
                        <Checkbox
                            checked={values.precoVenda}
                            onChange={(event) => onToggle('precoVenda', event.target.checked)}
                        />
                        Venda
                    </InlineOption>
                    <InlineOption>
                        <Checkbox
                            checked={values.precoAtacado}
                            onChange={(event) => onToggle('precoAtacado', event.target.checked)}
                        />
                        Atacado
                    </InlineOption>
                    <InlineOption>
                        <Checkbox
                            checked={values.precoPrazo}
                            onChange={(event) => onToggle('precoPrazo', event.target.checked)}
                        />
                        Prazo
                    </InlineOption>
                </div>
            </FieldStack>
        </FieldGrid>

        <HistorySection>
            <h4>Histórico de Registros de Reajuste de Preços e os Responsáveis</h4>
            <Table
                data={history}
                fields={camposHistoricoReajuste}
                emptyMessage="Nenhum reajuste registrado."
                showHeader={false}
                showColumnSelector={false}
                compact
            />
        </HistorySection>
    </ModalSimple>
);

const BalancaModal = ({
    value,
    onClose,
    onSave,
}: {
    value: BalancaOpcao;
    onClose: () => void;
    onSave: (value: BalancaOpcao) => void;
}) => {
    const [selectedValue, setSelectedValue] = useState<BalancaOpcao>(value);

    return (
        <ModalSimple
            title="Balança"
            onClose={onClose}
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Fechar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button" onClick={() => onSave(selectedValue)}>Salvar</ModalSimpleActionButton>
                </>
            )}
        >
            <RadioGroup>
                <label>
                    <Radio
                        name="balanca-opcao"
                        checked={selectedValue === 'geracao-carga'}
                        onChange={() => setSelectedValue('geracao-carga')}
                    />
                    Geração de Carga
                </label>
                <label>
                    <Radio
                        name="balanca-opcao"
                        checked={selectedValue === 'quantidade-digitos-etiqueta'}
                        onChange={() => setSelectedValue('quantidade-digitos-etiqueta')}
                    />
                    Quantidade de Dígitos na Etiqueta
                </label>
            </RadioGroup>
        </ModalSimple>
    );
};

const DigitosPrecosModal = ({
    value,
    onClose,
    onSave,
}: {
    value: DigitosPrecosOpcao;
    onClose: () => void;
    onSave: (value: DigitosPrecosOpcao) => void;
}) => {
    const [selectedValue, setSelectedValue] = useState<DigitosPrecosOpcao>(value);

    return (
        <ModalSimple
            title="Selecione a quantidade de dígitos após a vírgula para os preços:"
            onClose={onClose}
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Fechar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button" onClick={() => onSave(selectedValue)}>Salvar</ModalSimpleActionButton>
                </>
            )}
        >
            <SelectField value={selectedValue} onChange={(event) => setSelectedValue(event.target.value as DigitosPrecosOpcao)}>
                <option value="2">2 Dígitos (Ex: 10,99)</option>
                <option value="3">3 Dígitos (Ex: 10,999)</option>
            </SelectField>
        </ModalSimple>
    );
};

export const ProdutosPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState<Produto[]>(produtosMockData);
    const [showAddProdutoModal, setShowAddProdutoModal] = useState(false);
    const [showReajustePrecosModal, setShowReajustePrecosModal] = useState(false);
    const [showBalancaModal, setShowBalancaModal] = useState(false);
    const [showDigitosPrecosModal, setShowDigitosPrecosModal] = useState(false);
    const [balancaOption, setBalancaOption] = useState<BalancaOpcao>('geracao-carga');
    const [digitosPrecosOption, setDigitosPrecosOption] = useState<DigitosPrecosOpcao>('2');
    const [showReajusteSuccess, setShowReajusteSuccess] = useState(false);
    const [reajusteForm, setReajusteForm] = useState<ReajustePrecoFormValues>(initialReajusteFormValues);
    const [reajusteHistorico, setReajusteHistorico] = useState<ReajustePrecoHistorico[]>(reajusteHistoricoMockData);

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get('modal') !== 'add-produto') {
            return;
        }

        params.delete('modal');
        setShowAddProdutoModal(true);
        navigate({
            pathname: location.pathname,
            search: params.toString() ? `?${params.toString()}` : '',
            hash: location.hash,
        }, { replace: true });
    }, [location.hash, location.pathname, location.search, navigate]);

    const handleOpenBalanca = useCallback(() => {
        setShowBalancaModal(true);
    }, []);

    const handleOpenDigitosPrecos = useCallback(() => {
        setShowDigitosPrecosModal(true);
    }, []);

    const handleOpenAddProdutoModal = useCallback(() => {
        console.log('[ProdutosPage] open add modal');
        setShowAddProdutoModal(true);
    }, []);

    const handleCloseAddProdutoModal = useCallback(() => {
        console.log('[ProdutosPage] close add modal');
        setShowAddProdutoModal(false);
    }, []);

    const secoes = useMemo(
        () => buildProdutosMenuSections({
            onAddProduto: handleOpenAddProdutoModal,
            onOpenBalanca: () => {
                void handleOpenBalanca();
            },
            onOpenDigitosPrecos: () => {
                void handleOpenDigitosPrecos();
            },
            onOpenReajustePrecos: () => {
                setShowReajusteSuccess(false);
                setShowReajustePrecosModal(true);
            },
        }),
        [handleOpenBalanca, handleOpenDigitosPrecos, handleOpenAddProdutoModal]
    );

    const handleAddProduto = useCallback((data: ProdutoFormData) => {
        const novoProduto: Produto = {
            id: Number(data.id || Date.now()),
            codigoInterno: data.codigoInterno || String(Date.now()),
            nome: data.nome,
            codigoBarras: data.codigoBarras,
            classificacao: data.classificacoes[0] || 'Sem classificação',
            estoque: Number(data.estoqueInicial || 0),
            custo: parseMoedaBRL(data.precos.precoCusto),
            venda: parseMoedaBRL(data.precos.precoVarejo),
            status: data.status || 'ativo',
        };

        setProdutos((prev) => [novoProduto, ...prev]);
    }, []);

    const handleOpenProduto = useCallback((produto: Produto) => {
        navigate(`/produtos/visualizar/${produto.id}`, { state: { produto } });
    }, [navigate]);

    const handleReajusteFieldChange = useCallback((field: keyof ReajustePrecoFormValues, value: string) => {
        setReajusteForm((current) => ({ ...current, [field]: value }));
    }, []);

    const handleReajusteToggle = useCallback((field: keyof ReajustePrecoFormValues, value: boolean) => {
        setReajusteForm((current) => ({ ...current, [field]: value }));
    }, []);

    const handleConfirmReajuste = useCallback(async () => {
        if (!reajusteForm.tipo) {
            await Swal.fire('Atenção', 'Informe o tipo do reajuste.', 'warning');
            return;
        }

        const valorInformado = reajusteForm.tipo === 'p' ? reajusteForm.valorPercentual.trim() : reajusteForm.valorReal.trim();
        if (!valorInformado) {
            await Swal.fire('Atenção', 'Informe o valor do reajuste.', 'warning');
            return;
        }

        const confirmation = await Swal.fire({
            title: 'Aviso Importante',
            text: 'A alteração de preço afeta os produtos da classificação selecionada. Em caso de reversão por backup, poderá haver custo operacional. Deseja continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, desejo realizar o reajuste',
            cancelButtonText: 'Não, desejo cancelar o reajuste',
        });

        if (!confirmation.isConfirmed) {
            return;
        }

        const classificacaoLabel = reajusteForm.classificacao === '0'
            ? 'Todas'
            : ({
                acessorios: 'Acessórios',
                celulares: 'Celulares e Smartphones',
                importado: 'Importado XML',
            }[reajusteForm.classificacao] ?? reajusteForm.classificacao);

        setReajusteHistorico((current) => [
            {
                id: Date.now(),
                dataHora: formatarDataHoraBR(new Date()),
                usuario: 'Funcionário Master',
                classificacao: classificacaoLabel,
                tipo: reajusteForm.tipo === 'p' ? 'Percentual' : 'Reais',
                indice: `${reajusteForm.direcao === 'a' ? '+' : '-'}${reajusteForm.tipo === 'p' ? `${valorInformado}%` : `R$ ${valorInformado}`}`,
            },
            ...current,
        ]);
        setShowReajusteSuccess(true);
        setReajusteForm(initialReajusteFormValues);
    }, [reajusteForm]);

    return (
        <>
            <ListagemTemplate
                titulo="Cadastro e Estoque de Produtos"
                secoes={secoes}
                dados={produtos}
                campos={camposProdutos}
                colunasExcel={colunasExcelProdutos}
                camposPesquisa={(produto) => [
                    produto.codigoInterno,
                    produto.nome,
                    produto.codigoBarras,
                    produto.classificacao,
                    produto.status,
                ]}
                acoes={[
                    {
                        label: 'Visualizar',
                        icon: <FiSearch size={16} />,
                        getTitle: (produto) => `Visualizar produto ${String(produto.nome ?? produto.id)}`,
                        onClick: handleOpenProduto,
                    },
                ]}
                botaoPrincipal={{
                    nome: 'Produto',
                    icone: <IoCubeOutline size={20} />,
                    action: handleOpenAddProdutoModal,
                }}
                arquivoExcel="produtos"
                tituloTabela="Produtos cadastrados"
                descricaoTabela="Pesquise, acompanhe o estoque e escolha quais colunas quer exibir."
                mensagemVazia="Nenhum produto encontrado para o filtro informado."
                modaisAbertos={showAddProdutoModal || showReajustePrecosModal || showBalancaModal || showDigitosPrecosModal}
                menuInicialAberto={false}
            />

            {showAddProdutoModal && (
                <Suspense fallback={null}>
                    <ModalAddProdutos
                        show={showAddProdutoModal}
                        onClose={handleCloseAddProdutoModal}
                        onSubmit={handleAddProduto}
                    />
                </Suspense>
            )}

            {showReajustePrecosModal && (
                <ReajustePrecosModal
                    values={reajusteForm}
                    history={reajusteHistorico}
                    showSuccess={showReajusteSuccess}
                    onChange={handleReajusteFieldChange}
                    onToggle={handleReajusteToggle}
                    onClose={() => {
                        setShowReajustePrecosModal(false);
                        setShowReajusteSuccess(false);
                    }}
                    onConfirm={() => {
                        void handleConfirmReajuste();
                    }}
                />
            )}

            {showBalancaModal && (
                <BalancaModal
                    value={balancaOption}
                    onClose={() => setShowBalancaModal(false)}
                    onSave={(value) => {
                        setBalancaOption(value);
                        setShowBalancaModal(false);
                    }}
                />
            )}

            {showDigitosPrecosModal && (
                <DigitosPrecosModal
                    value={digitosPrecosOption}
                    onClose={() => setShowDigitosPrecosModal(false)}
                    onSave={(value) => {
                        setDigitosPrecosOption(value);
                        setShowDigitosPrecosModal(false);
                    }}
                />
            )}

        </>
    );
};
