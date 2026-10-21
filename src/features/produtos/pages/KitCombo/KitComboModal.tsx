import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { ButtonTableAction } from '../../../../common/components/Buttons/ButtonTableAction';
import { Table, type TableField } from '../../../../common/components/Table';
import { Checkbox, Input, Select } from '../../../../common/components/Ui';
import type { KitCombo, KitComboItem } from './types';

interface KitComboModalProps {
    kit: KitCombo;
    onClose: () => void;
    onUpdate: (kit: KitCombo) => void;
}

const moedaBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const produtosDisponiveis = [
    'Capa Banco Mod Orig Biz 125 2008',
    'Suporte Universal',
    'Lubrificante Spray',
    'Pano Microfibra',
    'Escova de Limpeza',
];

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

const InlineSelect = styled(Select)`
    min-height: var(--control-height-sm);
    border-radius: 0.125rem;
    padding: var(--space-xs) 10px;
`;

const RowActions = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;

`;

const KitInfoGrid = styled.div`
    display: grid;
    gap: 14px;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

const InfoCard = styled.div`
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: var(--radius-sm);
    padding: 14px;
    background: #f8fbff;

    strong {
        display: block;
        margin-bottom: 6px;
        color: var(--theme-text, #0f172a);
    }

    span {
        color: var(--theme-text-soft, #475569);
    }
`;

const InlineCheckbox = styled.label`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--theme-text-soft, #475569);
`;

const SectionTitle = styled.h4`
    margin: 0;
    color: var(--theme-text, #0f172a);
    font-size: var(--font-size-md);
`;

export const KitComboModal = ({ kit, onClose, onUpdate }: KitComboModalProps) => {
    const [draft, setDraft] = useState<KitCombo>(kit);
    const [novoProduto, setNovoProduto] = useState(produtosDisponiveis[0]);
    const [novaQuantidade, setNovaQuantidade] = useState('1');
    const [novoValorKit, setNovoValorKit] = useState('');

    const handleAdicionarItem = () => {
        const quantidade = Number(novaQuantidade || 1);
        const valorBase = 19.9 + quantidade;
        const valorKit = Number(novoValorKit.replace(',', '.')) || valorBase;

        setDraft((current) => ({
            ...current,
            itens: [
                ...current.itens,
                {
                    id: Date.now(),
                    produto: novoProduto,
                    quantidade,
                    valorProduto: valorBase,
                    valorKitCombo: valorKit,
                },
            ],
        }));
        setNovaQuantidade('1');
        setNovoValorKit('');
    };

    const handleSalvar = () => {
        const valorOriginal = draft.itens.reduce((total, item) => total + (item.valorProduto * item.quantidade), 0);
        const valorPromocional = draft.itens.reduce((total, item) => total + (item.valorKitCombo * item.quantidade), 0);

        onUpdate({
            ...draft,
            valorOriginal,
            valorPromocional,
        });
        onClose();
    };

    const itemFields = useMemo<TableField<KitComboItem>[]>(() => [
        { id: 'produto', header: 'Produto', accessorKey: 'produto', defaultVisible: true },
        {
            id: 'quantidade',
            header: 'Quantidade',
            accessorKey: 'quantidade',
            align: 'center',
            defaultVisible: true,
        },
        {
            id: 'valorProduto',
            header: 'Valor do Produto',
            accessorKey: 'valorProduto',
            align: 'right',
            defaultVisible: true,
            cell: (value) => moedaBRL.format(Number(value ?? 0)),
        },
        {
            id: 'valorKitCombo',
            header: 'Valor Kit / Combo',
            accessorKey: 'valorKitCombo',
            align: 'right',
            defaultVisible: true,
            cell: (value) => moedaBRL.format(Number(value ?? 0)),
        },
        {
            id: 'acoes',
            header: 'Ações',
            align: 'center',
            defaultVisible: true,
            cell: (_, item) => (
                <RowActions>
                    <ButtonTableAction
                        title={`Remover ${item.produto}`}
                        variant="danger"
                        onClick={() => setDraft((current) => ({
                            ...current,
                            itens: current.itens.filter((draftItem) => draftItem.id !== item.id),
                        }))}
                    >
                        <FiTrash2 />
                    </ButtonTableAction>
                </RowActions>
            ),
        },
    ], []);

    return (
        <ModalSimple
            title={`Kit / Combo: ${draft.nome}`}
            onClose={onClose}
            size="xl"
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Fechar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button" onClick={handleSalvar}>Salvar</ModalSimpleActionButton>
                </>
            )}
        >
            <KitInfoGrid>
                <InfoCard>
                    <strong>Código de Barras</strong>
                    <span>{draft.codigoBarras}</span>
                </InfoCard>

                <InfoCard>
                    <strong>Exibir na Comanda</strong>
                    <InlineCheckbox>
                        <Checkbox
                            checked={draft.exibeComanda}
                            onChange={(event) => setDraft((current) => ({ ...current, exibeComanda: event.target.checked }))}
                        />
                        Exibir este kit na comanda
                    </InlineCheckbox>
                </InfoCard>
            </KitInfoGrid>

            <SectionTitle>Adicionar Produto Para o Kit / Combo</SectionTitle>
            <InlineForm>
                <InlineSelect value={novoProduto} onChange={(event) => setNovoProduto(event.target.value)}>
                    {produtosDisponiveis.map((produto) => (
                        <option key={produto} value={produto}>
                            {produto}
                        </option>
                    ))}
                </InlineSelect>
                <InlineInput
                    type="number"
                    min="1"
                    value={novaQuantidade}
                    onChange={(event) => setNovaQuantidade(event.target.value)}
                    placeholder="Quantidade"
                />
                <InlineInput
                    value={novoValorKit}
                    onChange={(event) => setNovoValorKit(event.target.value)}
                    placeholder="Valor do Produto no Kit / Combo"
                />
                <Botao nome="Adicionar Produto" action={handleAdicionarItem} />
            </InlineForm>

            <Table
                data={draft.itens}
                fields={itemFields}
                emptyMessage="Nenhum produto adicionado ao kit / combo."
                showHeader={false}
                showColumnSelector={false}
                compact
            />
        </ModalSimple>
    );
};
