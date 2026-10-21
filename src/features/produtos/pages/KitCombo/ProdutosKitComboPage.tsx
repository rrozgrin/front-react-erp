import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { FiEdit2, FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import { SearchWrapper } from '../../../../common/components/PageLayout/styled';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { ButtonTableAction } from '../../../../common/components/Buttons/ButtonTableAction';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { BuscaSimples } from '../../../../common/components/Inputs/BuscaSimples';
import { type TableField } from '../../../../common/components/Table';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import { Input, Select } from '../../../../common/components/Ui';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';
import { KitComboModal } from './KitComboModal';
import type { KitCombo } from './types';

const kitsMockData: KitCombo[] = [
    {
        id: 1,
        nome: 'KIT CAPA + SUPORTE',
        codigoBarras: '789100000001',
        valorOriginal: 79.9,
        valorPromocional: 69.9,
        ativo: true,
        exibeComanda: true,
        itens: [
            { id: 11, produto: 'Capa Banco Mod Orig Biz 125 2008', quantidade: 1, valorProduto: 39.9, valorKitCombo: 34.9 },
            { id: 12, produto: 'Suporte Universal', quantidade: 1, valorProduto: 40, valorKitCombo: 35 },
        ],
    },
    {
        id: 2,
        nome: 'COMBO MANUTENCAO RAPIDA',
        codigoBarras: '789100000002',
        valorOriginal: 119.9,
        valorPromocional: 99.9,
        ativo: false,
        exibeComanda: false,
        itens: [
            { id: 21, produto: 'Lubrificante Spray', quantidade: 1, valorProduto: 35.9, valorKitCombo: 29.9 },
            { id: 22, produto: 'Pano Microfibra', quantidade: 2, valorProduto: 12, valorKitCombo: 9.5 },
            { id: 23, produto: 'Escova de Limpeza', quantidade: 1, valorProduto: 60, valorKitCombo: 51 },
        ],
    },
];

const moedaBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const ToolbarRow = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-wrap: wrap;
    width: 100%;

    @media (max-width: 767px) {
        display: grid;
        grid-template-columns: 1fr;
    }
`;

const InlineForm = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    width: 100%;
`;

const InlineInput = styled(Input)`
    min-width: 220px;
    min-height: var(--control-height-sm);
    border-radius: 0.125rem;
    padding: var(--space-xs) 10px;
`;

const StatusSelect = styled(Select)`
    min-width: 160px;
    min-height: var(--control-height-sm);
    border-radius: 0.125rem;
    padding: var(--space-xs) 10px;
`;

const RowActions = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;
`;

const StatusPill = styled.span<{ $active: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 88px;
    padding: 7px var(--space-sm);
    border-radius: var(--radius-pill);
    font-size: 0.82rem;
    font-weight: 500;
    color: ${({ $active }) => ($active ? '#166534' : '#b91c1c')};
    background: ${({ $active }) => ($active ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)')};
`;

export const ProdutosKitComboPage: React.FC = () => {
    const [pesquisa, setPesquisa] = useState('');
    const [situacao, setSituacao] = useState<'A' | 'E'>('A');
    const [nomeKit, setNomeKit] = useState('');
    const [codigoBarrasKit, setCodigoBarrasKit] = useState('');
    const [kits, setKits] = useState<KitCombo[]>(kitsMockData);
    const [selectedKit, setSelectedKit] = useState<KitCombo | null>(null);

    const secoes = useMemo(() => buildProdutosMenuSections({}), []);

    const kitsFiltrados = useMemo(() => {
        const termo = pesquisa.trim().toLowerCase();

        return kits.filter((kit) => {
            const matchesStatus = situacao === 'A' ? kit.ativo : !kit.ativo;
            const matchesSearch = !termo || [
                kit.nome,
                kit.codigoBarras,
            ].some((field) => field.toLowerCase().includes(termo));

            return matchesStatus && matchesSearch;
        });
    }, [kits, pesquisa, situacao]);

    const tableFields = useMemo<TableField<KitCombo>[]>(() => [
        { id: 'nome', header: 'Kit / Combo', accessorKey: 'nome', defaultVisible: true },
        { id: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras', defaultVisible: true },
        {
            id: 'valorOriginal',
            header: 'Valor Original',
            accessorKey: 'valorOriginal',
            defaultVisible: true,
            align: 'right',
            cell: (value) => moedaBRL.format(Number(value ?? 0)),
        },
        {
            id: 'valorPromocional',
            header: 'Valor Kit / Combo',
            accessorKey: 'valorPromocional',
            defaultVisible: true,
            align: 'right',
            cell: (value) => moedaBRL.format(Number(value ?? 0)),
        },
        {
            id: 'ativo',
            header: 'Ativo',
            defaultVisible: true,
            cell: (_, row) => <StatusPill $active={row.ativo}>{row.ativo ? 'Ativo' : 'Inativo'}</StatusPill>,
        },
        {
            id: 'acoes',
            header: 'Ações',
            defaultVisible: true,
            align: 'center',
            cell: (_, row) => (
                <RowActions>
                    <ButtonTableAction
                        title={`Abrir ${row.nome}`}
                        onClick={() => setSelectedKit(row)}
                    >
                        <FiEdit2 />
                    </ButtonTableAction>

                    {row.ativo ? (
                        <ButtonTableAction
                            title={`Inativar ${row.nome}`}
                            variant="danger"
                            onClick={() => setKits((current) => current.map((item) => (
                                item.id === row.id ? { ...item, ativo: false } : item
                            )))}
                        >
                            <FiTrash2 />
                        </ButtonTableAction>
                    ) : (
                        <ButtonTableAction
                            title={`Reativar ${row.nome}`}
                            variant="success"
                            onClick={() => setKits((current) => current.map((item) => (
                                item.id === row.id ? { ...item, ativo: true } : item
                            )))}
                        >
                            <FiRefreshCw />
                        </ButtonTableAction>
                    )}
                </RowActions>
            ),
        },
    ], []);

    const excelColumns = useMemo<ExcelColumn<KitCombo>[]>(() => [
        { key: 'nome', header: 'Kit / Combo', accessorKey: 'nome' },
        { key: 'codigoBarras', header: 'Código de Barras', accessorKey: 'codigoBarras' },
        { key: 'valorOriginal', header: 'Valor Original', valueFormatter: (value) => moedaBRL.format(Number(value ?? 0)) },
        { key: 'valorPromocional', header: 'Valor Kit / Combo', valueFormatter: (value) => moedaBRL.format(Number(value ?? 0)) },
        { key: 'ativo', header: 'Ativo', valueFormatter: (_, row) => (row.ativo ? 'Ativo' : 'Inativo') },
    ], []);

    const handleAdicionarKit = async () => {
        const nome = nomeKit.trim().toUpperCase();
        const codigo = codigoBarrasKit.trim();

        if (!nome || !codigo) {
            await Swal.fire('Campos obrigatórios', 'Informe o nome e o código de barras do kit / combo.', 'warning');
            return;
        }

        setKits((current) => [
            {
                id: Date.now(),
                nome,
                codigoBarras: codigo,
                valorOriginal: 0,
                valorPromocional: 0,
                ativo: true,
                exibeComanda: false,
                itens: [],
            },
            ...current,
        ]);
        setNomeKit('');
        setCodigoBarrasKit('');
    };

    return (
        <>
            <ListagemTemplate
                titulo="Kit / Combo"
                secoes={secoes}
                tituloTabela="Kits e combos cadastrados"
                descricaoTabela="Gerencie kits, monte combinações de produtos e controle a exibição na comanda."
                dados={kitsFiltrados}
                campos={tableFields}
                colunasExcel={excelColumns}
                arquivoExcel="kit_combo_produtos"
                mensagemVazia="Nenhum kit / combo encontrado para o filtro informado."
                exibirBusca={false}
                conteudoAdicionalToolbar={(
                    <ToolbarRow>
                        <InlineForm>
                            <InlineInput
                                value={nomeKit}
                                onChange={(event) => setNomeKit(event.target.value)}
                                placeholder="Nome Kit / Combo"
                            />
                            <InlineInput
                                value={codigoBarrasKit}
                                onChange={(event) => setCodigoBarrasKit(event.target.value)}
                                placeholder="Código de Barras para o Kit / Combo"
                            />
                            <Botao nome="Adicionar" action={() => { void handleAdicionarKit(); }} />
                        </InlineForm>

                        <SearchWrapper>
                            <BuscaSimples pesquisa={pesquisa} onChange={setPesquisa} placeholder="Buscar kit / combo" />
                        </SearchWrapper>

                        <StatusSelect value={situacao} onChange={(event) => setSituacao(event.target.value as 'A' | 'E')}>
                            <option value="A">Ativo</option>
                            <option value="E">Inativo</option>
                        </StatusSelect>
                    </ToolbarRow>
                )}
                modaisAbertos={Boolean(selectedKit)}
                configurarColunas={false}
            />

            {selectedKit && (
                <KitComboModal
                    kit={selectedKit}
                    onClose={() => setSelectedKit(null)}
                    onUpdate={(updatedKit) => {
                        setKits((current) => current.map((item) => (
                            item.id === updatedKit.id ? updatedKit : item
                        )));
                        setSelectedKit(updatedKit);
                    }}
                />
            )}
        </>
    );
};
