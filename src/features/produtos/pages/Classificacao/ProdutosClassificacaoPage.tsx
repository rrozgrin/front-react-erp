import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { CadastroAuxiliarTemplate } from '../../../../common/components/Templates/CadastroAuxiliarTemplate';
import type { TableField } from '../../../../common/components/Table';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { Checkbox } from '../../../../common/components/Ui';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';
import { ClassificacaoModal } from './ClassificacaoModal';
import { PainelPdvModal } from './PainelPdvModal';
import type { ClassificacaoFormValues, ProdutoClassificacao, ProdutoClassificacaoModal } from './types';

const classificacoesMockData: ProdutoClassificacao[] = [
    { id: 1, nome: 'ADAPTADORES', subClassificacao: '- Principal -', status: 'ativo', lojaVirtual: false, catalogo: false, mercadoLivre: 'Não Vinculada', marcado: false },
    { id: 2, nome: 'ADESIVO', subClassificacao: '- Principal -', status: 'ativo', lojaVirtual: false, catalogo: false, mercadoLivre: 'Não Vinculada', marcado: false },
    { id: 3, nome: 'ADICIONAIS', subClassificacao: '- Principal -', status: 'ativo', lojaVirtual: false, catalogo: true, mercadoLivre: 'Não Vinculada', marcado: false },
    { id: 4, nome: 'ALCOOL EM GEL', subClassificacao: '- Principal -', status: 'ativo', lojaVirtual: false, catalogo: false, mercadoLivre: 'Não Vinculada', marcado: false },
    { id: 5, nome: 'Alimentos Básicos', subClassificacao: '- Principal -', status: 'ativo', lojaVirtual: false, catalogo: true, mercadoLivre: 'Não Vinculada', marcado: false },
    { id: 6, nome: 'ALIMENTOS E BEBIDAS', subClassificacao: '- Principal -', status: 'ativo', lojaVirtual: true, catalogo: true, mercadoLivre: 'Alimentos e Bebidas', marcado: false },
    { id: 7, nome: 'ALIMENTOS E BEBIDAS', subClassificacao: 'MERCEARIA | FARINHAS', status: 'ativo', lojaVirtual: false, catalogo: true, mercadoLivre: 'Alimentos e Bebidas / Mercearia / Farinha', marcado: false },
];

const StatusText = styled.span<{ $positive: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${({ $positive }) => ($positive ? '#166534' : '#b91c1c')};
    font-weight: 600;

    svg {
        stroke-width: 3;
    }
`;

const renderBooleanStatus = (enabled: boolean, enabledLabel = 'Habilitado', disabledLabel = 'Desabilitado') => (
    <StatusText $positive={enabled}>
        {enabled ? enabledLabel : disabledLabel}
    </StatusText>
);

const getSearchFields = (classificacao: ProdutoClassificacao) => [
    classificacao.nome,
    classificacao.subClassificacao,
    classificacao.status,
    classificacao.lojaVirtual ? 'habilitado' : 'desabilitado',
    classificacao.catalogo ? 'habilitado' : 'desabilitado',
    classificacao.mercadoLivre,
];

export const ProdutosClassificacaoPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [classificacoes, setClassificacoes] = useState<ProdutoClassificacao[]>(classificacoesMockData);
    const [activeModal, setActiveModal] = useState<ProdutoClassificacaoModal>(null);
    const [editingClassificacao, setEditingClassificacao] = useState<ProdutoClassificacao | undefined>();
    const [painelPdv, setPainelPdv] = useState('LANCHES');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const modal = params.get('modal');

        if (modal !== 'add-classificacao' && modal !== 'add-subclassificacao') {
            return;
        }

        params.delete('modal');
        setEditingClassificacao(undefined);
        setActiveModal(modal === 'add-subclassificacao' ? 'subclassificacao' : 'classificacao');
        navigate({
            pathname: location.pathname,
            search: params.toString() ? `?${params.toString()}` : '',
            hash: location.hash,
        }, { replace: true });
    }, [location.hash, location.pathname, location.search, navigate]);

    const handleSaveClassificacao = useCallback((values: ClassificacaoFormValues) => {
        if (editingClassificacao) {
            setClassificacoes((current) => current.map((classificacao) =>
                classificacao.id === editingClassificacao.id
                    ? {
                        ...classificacao,
                        nome: values.nome || classificacao.nome,
                        subClassificacao: values.classificacaoPrincipal || '- Principal -',
                        status: values.ativo ? 'ativo' : 'inativo',
                        lojaVirtual: values.lojaVirtual,
                        catalogo: values.catalogo,
                        mercadoLivre: values.mercadoLivre || 'Não Vinculada',
                    }
                    : classificacao
            ));
            setEditingClassificacao(undefined);
            return;
        }

        setClassificacoes((current) => [
            {
                id: Date.now(),
                nome: values.nome || 'NOVA CLASSIFICAÇÃO',
                subClassificacao: values.classificacaoPrincipal ? values.nome || '- Sem nome -' : '- Principal -',
                status: values.ativo ? 'ativo' : 'inativo',
                lojaVirtual: values.lojaVirtual,
                catalogo: values.catalogo,
                mercadoLivre: values.mercadoLivre || 'Não Vinculada',
                marcado: false,
            },
            ...current,
        ]);
    }, [editingClassificacao]);

    const menuSections = useMemo(
        () => buildProdutosMenuSections({
            onAddClassificacao: () => {
                setEditingClassificacao(undefined);
                setActiveModal('classificacao');
            },
            onAddSubClassificacao: () => {
                setEditingClassificacao(undefined);
                setActiveModal('subclassificacao');
            },
            onOpenPainelPdv: () => setActiveModal('painelPdv'),
        }),
        []
    );

    const tableFields = useMemo<TableField<ProdutoClassificacao>[]>(() => [
        { id: 'nome', header: 'Nome Classificação', accessorKey: 'nome', defaultVisible: true },
        { id: 'subClassificacao', header: 'SubClassificação', accessorKey: 'subClassificacao', defaultVisible: true },
        {
            id: 'status',
            header: 'Situação',
            defaultVisible: true,
            cell: (_, row) => renderBooleanStatus(row.status === 'ativo', 'Ativo', 'Inativo'),
        },
        {
            id: 'lojaVirtual',
            header: 'Loja Virtual',
            defaultVisible: true,
            cell: (_, row) => renderBooleanStatus(row.lojaVirtual),
        },
        {
            id: 'catalogo',
            header: 'Catálogo',
            defaultVisible: true,
            cell: (_, row) => renderBooleanStatus(row.catalogo),
        },
        { id: 'mercadoLivre', header: 'Mercado Livre', accessorKey: 'mercadoLivre', defaultVisible: true },
        {
            id: 'marca',
            header: 'Marca',
            align: 'center',
            defaultVisible: true,
            cell: (_, row) => (
                <Checkbox
                    checked={row.marcado}
                    onChange={(event) => {
                        const checked = event.target.checked;
                        setClassificacoes((current) =>
                            current.map((classificacao) =>
                                classificacao.id === row.id ? { ...classificacao, marcado: checked } : classificacao
                            )
                        );
                    }}
                />
            ),
        },
    ], []);

    const excelColumns = useMemo<ExcelColumn<ProdutoClassificacao>[]>(() => [
        { key: 'nome', header: 'Nome Classificação', accessorKey: 'nome' },
        { key: 'subClassificacao', header: 'SubClassificação', accessorKey: 'subClassificacao' },
        { key: 'status', header: 'Situação', accessorKey: 'status' },
        { key: 'lojaVirtual', header: 'Loja Virtual', valueFormatter: (_, row) => (row.lojaVirtual ? 'Habilitado' : 'Desabilitado') },
        { key: 'catalogo', header: 'Catálogo', valueFormatter: (_, row) => (row.catalogo ? 'Habilitado' : 'Desabilitado') },
        { key: 'mercadoLivre', header: 'Mercado Livre', accessorKey: 'mercadoLivre' },
    ], []);

    const handleExcluirMarcados = useCallback(() => {
        setClassificacoes((current) => current.filter((classificacao) => !classificacao.marcado));
    }, []);

    return (
        <>
            <CadastroAuxiliarTemplate
                titulo="Controle Estoque - Classificação de Produtos"
                secoes={menuSections}
                tituloTabela="Classificações cadastradas"
                descricaoTabela={`Painel principal atual do Tablet PDV: ${painelPdv}`}
                dados={classificacoes}
                campos={tableFields}
                camposPesquisa={getSearchFields}
                acoes={[
                    {
                        label: 'Editar',
                        icon: <FiEdit2 size={16} />,
                        getTitle: (classificacao) => `Editar ${classificacao.nome}`,
                        onClick: (classificacao) => {
                            setEditingClassificacao(classificacao);
                            setActiveModal(classificacao.subClassificacao === '- Principal -' ? 'classificacao' : 'subclassificacao');
                        },
                    },
                    {
                        label: 'Excluir',
                        icon: <FiTrash2 size={16} />,
                        variant: 'danger',
                        getTitle: (classificacao) => `Excluir ${classificacao.nome}`,
                        onClick: (classificacao) => {
                            setClassificacoes((current) => current.filter((item) => item.id !== classificacao.id));
                        },
                    },
                ]}
                mensagemVazia="Nenhuma classificação encontrada para o filtro informado."
                arquivoExcel="classificacao_produtos"
                colunasExcel={excelColumns}
                impressao={{}}
                modalAberto={activeModal !== null}
                acoesAdicionais={(
                    <Botao
                        nome="Excluir Marcados"
                        icone={<FiTrash2 size={18} />}
                        action={handleExcluirMarcados}
                    />
                )}
            />

            {activeModal === 'classificacao' && (
                <ClassificacaoModal
                    title="Adicionar Nova Classificação"
                    mode="classificacao"
                    classificacoes={classificacoes}
                    initialData={editingClassificacao}
                    onClose={() => {
                        setActiveModal(null);
                        setEditingClassificacao(undefined);
                    }}
                    onSave={handleSaveClassificacao}
                />
            )}

            {activeModal === 'subclassificacao' && (
                <ClassificacaoModal
                    title="Adicionar Nova SubClassificação"
                    mode="subclassificacao"
                    classificacoes={classificacoes}
                    initialData={editingClassificacao}
                    onClose={() => {
                        setActiveModal(null);
                        setEditingClassificacao(undefined);
                    }}
                    onSave={handleSaveClassificacao}
                />
            )}

            {activeModal === 'painelPdv' && (
                <PainelPdvModal
                    value={painelPdv}
                    onClose={() => setActiveModal(null)}
                    onSave={setPainelPdv}
                />
            )}
        </>
    );
};
