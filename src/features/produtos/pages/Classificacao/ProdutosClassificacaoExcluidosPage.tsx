import React, { useMemo, useState } from 'react';
import { FiCheck, FiRefreshCw, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { ButtonTableAction } from '../../../../common/components/Buttons/ButtonTableAction';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import type { TableField } from '../../../../common/components/Table';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

interface ProdutoClassificacaoExcluida {
    id: number;
    nome: string;
    subClassificacao: string;
    lojaVirtual: boolean;
    catalogo: boolean;
    mercadoLivre: string;
}

const classificacoesExcluidasMockData: ProdutoClassificacaoExcluida[] = [
    { id: 1, nome: '', subClassificacao: '- Principal -', lojaVirtual: false, catalogo: true, mercadoLivre: 'Não Vinculada' },
    { id: 2, nome: 'AB', subClassificacao: 'AB', lojaVirtual: false, catalogo: true, mercadoLivre: 'Não Vinculada' },
    { id: 3, nome: 'abc', subClassificacao: '- Principal -', lojaVirtual: false, catalogo: true, mercadoLivre: 'Não Vinculada' },
    { id: 4, nome: 'ABC', subClassificacao: 'ABC', lojaVirtual: false, catalogo: true, mercadoLivre: 'Não Vinculada' },
    { id: 5, nome: 'ADESIVO', subClassificacao: 'AB', lojaVirtual: false, catalogo: true, mercadoLivre: 'Não Vinculada' },
    { id: 6, nome: 'TESTE GUSS', subClassificacao: '- Principal -', lojaVirtual: false, catalogo: false, mercadoLivre: 'Não Vinculada' },
];

const StatusText = styled.span<{ $positive: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${({ $positive }) => ($positive ? '#166534' : '#b91c1c')};
    font-weight: 600;
`;

const renderBooleanStatus = (enabled: boolean, enabledLabel = 'Habilitado', disabledLabel = 'Desabilitado') => (
    <StatusText $positive={enabled}>
        {enabled ? <FiCheck /> : <FiX />}
        {enabled ? enabledLabel : disabledLabel}
    </StatusText>
);

export const ProdutosClassificacaoExcluidosPage: React.FC = () => {
    const [classificacoes, setClassificacoes] = useState(classificacoesExcluidasMockData);

    const tableFields = useMemo<TableField<ProdutoClassificacaoExcluida>[]>(() => [
        { id: 'nome', header: 'Nome Classificação', accessorKey: 'nome', defaultVisible: true },
        { id: 'subClassificacao', header: 'SubClassificação', accessorKey: 'subClassificacao', defaultVisible: true },
        {
            id: 'situacao',
            header: 'Situação',
            defaultVisible: true,
            cell: () => renderBooleanStatus(false, 'Ativo', 'Inativo'),
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
            id: 'opcoes',
            header: 'Opções',
            align: 'center',
            defaultVisible: true,
            cell: (_, row) => (
                <ButtonTableAction
                    title={`Restaurar ${row.nome || row.subClassificacao}`}
                    onClick={() => setClassificacoes((current) => current.filter((item) => item.id !== row.id))}
                >
                    <FiRefreshCw />
                </ButtonTableAction>
            ),
        },
    ], []);

    const excelColumns = useMemo<ExcelColumn<ProdutoClassificacaoExcluida>[]>(() => [
        { key: 'nome', header: 'Nome Classificação', accessorKey: 'nome' },
        { key: 'subClassificacao', header: 'SubClassificação', accessorKey: 'subClassificacao' },
        { key: 'situacao', header: 'Situação', valueFormatter: () => 'Inativo' },
        { key: 'lojaVirtual', header: 'Loja Virtual', valueFormatter: (_, row) => (row.lojaVirtual ? 'Habilitado' : 'Desabilitado') },
        { key: 'catalogo', header: 'Catálogo', valueFormatter: (_, row) => (row.catalogo ? 'Habilitado' : 'Desabilitado') },
        { key: 'mercadoLivre', header: 'Mercado Livre', accessorKey: 'mercadoLivre' },
    ], []);
    const menuSections = useMemo(() => buildProdutosMenuSections({}), []);

    return (
        <ListagemTemplate
            titulo="Classificação Excluídos"
            secoes={menuSections}
            tituloTabela="Classificações excluídas"
            descricaoTabela="Pesquise classificações removidas e restaure quando necessário."
            dados={classificacoes}
            campos={tableFields}
            mensagemVazia="Nenhuma classificação excluída encontrada para o filtro informado."
            camposPesquisa={(classificacao) => [
                classificacao.nome,
                classificacao.subClassificacao,
                classificacao.lojaVirtual ? 'habilitado' : 'desabilitado',
                classificacao.catalogo ? 'habilitado' : 'desabilitado',
                classificacao.mercadoLivre,
            ]}
            placeholderPesquisa="Busca Avançada"
            arquivoExcel="classificacao_excluidos"
            colunasExcel={excelColumns}
            impressao={{}}
            configurarColunas={false}
            exportarApenasColunasVisiveis={false}
        />
    );
};
