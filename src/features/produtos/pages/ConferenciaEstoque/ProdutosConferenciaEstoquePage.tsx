import { useMemo, useRef, useState, type ReactNode } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { type TableField } from '@/common/components/Table';
import { ListagemTemplate } from '@/common/components/Templates/ListagemTemplate';
import { Botao } from '@/common/components/Buttons/Botao';
import { Input } from '@/common/components/Ui';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

interface ProdutoConferencia {
    codigoBarras: string;
    descricao: string;
    estoqueAtual: number;
}

interface ItemConferencia extends ProdutoConferencia {
    contagem: number;
}

const produtosDisponiveis: ProdutoConferencia[] = [
    { codigoBarras: '7899565702107', descricao: 'Capa Banco Mod Orig Biz 125 2008', estoqueAtual: 2 },
    { codigoBarras: '17951372', descricao: 'Capa Banco Mod Orig Biz 125 2008', estoqueAtual: 25 },
    { codigoBarras: '9960935214068', descricao: 'Capa Banco Mod Orig Biz 125 2008', estoqueAtual: 39 },
    { codigoBarras: '7899565702084', descricao: 'Capa Banco Mod Orig Titan 150 2004/08', estoqueAtual: 2 },
];

const ContentStack = styled.div`
    display: grid;
    gap: 18px;
`;

const Panel = styled.section`
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: 0.1875rem;
    background: var(--theme-surface, #ffffff);
    padding: var(--space-lg);
    display: grid;
    gap: 18px;
`;

const CenteredHeader = styled.div`
    text-align: center;

    h3 {
        margin: 0;
        color: var(--theme-text, #0f172a);
        font-size: 1.1rem;
        font-weight: 500;
    }
`;

const ScanField = styled.label`
    width: min(460px, 100%);
    margin: 0 auto;
    display: grid;
    gap: var(--space-xs);
    color: var(--theme-text-soft, #475569);
    font-weight: 500;
`;

const ScanInput = styled(Input)`
    min-height: 44px;
    border-radius: 0.125rem;
    padding: 10px var(--space-sm);
`;

const ActionRow = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-sm);
`;

const QuantityInput = styled(Input)`
    width: 72px;
    min-height: 34px;
    border-radius: 0.125rem;
    padding: 6px var(--space-xs);
    text-align: center;
`;

const fields: TableField<ItemConferencia>[] = [
    { id: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao', defaultVisible: true },
    { id: 'estoqueAtual', header: 'Estoque Atual', accessorKey: 'estoqueAtual', align: 'center', defaultVisible: true },
    { id: 'contagem', header: 'Contagem', accessorKey: 'contagem', align: 'center', defaultVisible: true },
    {
        id: 'diferenca',
        header: 'Diferença',
        accessorFn: (row) => row.contagem - row.estoqueAtual,
        align: 'center',
        defaultVisible: true,
    },
];

export const ProdutosConferenciaEstoquePage = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const [codigoBarras, setCodigoBarras] = useState('');
    const [itens, setItens] = useState<ItemConferencia[]>([]);
    const [ultimoCodigo, setUltimoCodigo] = useState<string | null>(null);
    const [editingCode, setEditingCode] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState('');

    const tableFields = useMemo<TableField<ItemConferencia>[]>(() => [
        ...fields.map((field) => {
            if (field.id !== 'contagem') return field;

            return {
                ...field,
                cell: (value: ReactNode, row: { codigoBarras: string; }) => {
                    if (editingCode === row.codigoBarras) {
                        return (
                            <QuantityInput
                                value={editingValue}
                                onChange={(event) => setEditingValue(event.target.value)}
                                onBlur={() => salvarQuantidade(row.codigoBarras)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') salvarQuantidade(row.codigoBarras);
                                }}
                                autoFocus
                            />
                        );
                    }

                    return value;
                },
            };
        }),
    ], [editingCode, editingValue]);

    const possuiItens = itens.length > 0;

    const inserirCodigo = async () => {
        const codigo = codigoBarras.trim();
        const produto = produtosDisponiveis.find((item) => item.codigoBarras === codigo);

        if (!codigo) return;

        if (!produto) {
            await Swal.fire('Atenção!', 'Produto não encontrado para o código informado.', 'warning');
            setCodigoBarras('');
            inputRef.current?.focus();
            return;
        }

        setItens((current) => {
            const existe = current.find((item) => item.codigoBarras === codigo);

            if (existe) {
                return current.map((item) =>
                    item.codigoBarras === codigo ? { ...item, contagem: item.contagem + 1 } : item
                );
            }

            return [...current, { ...produto, contagem: 1 }];
        });
        setUltimoCodigo(codigo);
        setCodigoBarras('');
        inputRef.current?.focus();
    };

    const desfazerUltimo = () => {
        if (!ultimoCodigo) return;

        setItens((current) =>
            current.flatMap((item) => {
                if (item.codigoBarras !== ultimoCodigo) return [item];
                if (item.contagem <= 1) return [];
                return [{ ...item, contagem: item.contagem - 1 }];
            })
        );
        setUltimoCodigo(null);
    };

    const editarQuantidade = (item: ItemConferencia) => {
        setEditingCode(item.codigoBarras);
        setEditingValue(String(item.contagem));
    };

    const salvarQuantidade = async (codigo: string) => {
        const quantidade = Number(editingValue);

        if (!Number.isInteger(quantidade) || quantidade < 0) {
            await Swal.fire('Atenção!', 'Informe uma quantidade válida.', 'warning');
            return;
        }

        if (quantidade > 100) {
            await Swal.fire('Atenção!', 'O ajuste manual está limitado a um máximo de 100 unidades.', 'warning');
            return;
        }

        setItens((current) =>
            quantidade === 0
                ? current.filter((item) => item.codigoBarras !== codigo)
                : current.map((item) => (item.codigoBarras === codigo ? { ...item, contagem: quantidade } : item))
        );
        setEditingCode(null);
        setEditingValue('');
    };

    const finalizarConferencia = async () => {
        const result = await Swal.fire({
            title: 'Finalizar Conferência?',
            text: 'A conferência atual será finalizada.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Finalizar',
            cancelButtonText: 'Cancelar',
        });

        if (!result.isConfirmed) return;

        setItens([]);
        setUltimoCodigo(null);
        await Swal.fire('Sucesso!', 'Conferência finalizada com sucesso.', 'success');
    };

    return (
        <ListagemTemplate
            titulo="Conferência de Estoque"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Itens da conferência"
            descricaoTabela="Ajuste a contagem física e acompanhe a diferença em relação ao estoque atual."
            dados={itens}
            campos={tableFields}
            mensagemVazia="Nenhum item adicionado à conferência."
            conteudoAntesTabela={(
                <Panel>
                    <CenteredHeader>
                        <h3>Conferência de Estoque</h3>
                    </CenteredHeader>

                    <ScanField>
                        Código Barras:
                        <ScanInput
                            ref={inputRef}
                            value={codigoBarras}
                            onChange={(event) => setCodigoBarras(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === 'Tab') {
                                    event.preventDefault();
                                    void inserirCodigo();
                                }
                            }}
                            placeholder="Utilize o leitor ou digite o Código de Barras"
                        />
                    </ScanField>
                </Panel>
            )}
            acoes={[
                        {
                            label: 'Editar',
                            icon: <FiEdit2 size={16} />,
                            onClick: editarQuantidade,
                        },
                        {
                            label: 'Excluir',
                            icon: <FiTrash2 size={16} />,
                            variant: 'danger',
                            onClick: (item) => setItens((current) => current.filter((row) => row.codigoBarras !== item.codigoBarras)),
                        },
            ]}
            conteudoDepoisTabela={(
                <ActionRow>
                    <Botao nome="Finalizar Conferência" color="add" disabled={!possuiItens} action={() => void finalizarConferencia()} />
                    <Botao nome="Finalizar Depois" disabled={!possuiItens} action={() => navigate('/produtos')} />
                    <Botao nome="Desfazer Última Ação" color="close" disabled={!ultimoCodigo} action={desfazerUltimo} />
                </ActionRow>
            )}
            renderizarConteudo={(conteudo) => <ContentStack>{conteudo}</ContentStack>}
            configurarColunas={false}
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
    );
};
