import React, { useCallback, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { FiRefreshCw, FiXCircle } from 'react-icons/fi';
import styled from 'styled-components';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import type { TableField } from '../../../../common/components/Table';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { formatarDataHoraBR } from '../../../../types/Data';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

interface ProdutoExcluido {
    id: number;
    nome: string;
    codigoBarras: string;
    codigoInterno: string;
    classificacao: string;
    valorCusto: number;
    valorVenda: number;
    fabricante: string;
    dataExclusao: string;
    situacao: 'EXCLUIDO';
}

const produtosExcluidosMockData: ProdutoExcluido[] = [
    {
        id: 1,
        nome: 'Capa Banco Mod Orig Biz 125 2008',
        codigoBarras: '7899565702107',
        codigoInterno: '2500108',
        classificacao: 'Celulares e Smartphones',
        valorCusto: 10,
        valorVenda: 20,
        fabricante: 'BEMATECH',
        dataExclusao: '2026-05-26T14:30:00',
        situacao: 'EXCLUIDO',
    },
    {
        id: 2,
        nome: 'Capa Banco Mod Orig Biz 125 2008 Premium',
        codigoBarras: '17951372',
        codigoInterno: '2500107',
        classificacao: 'Importado XML',
        valorCusto: 10,
        valorVenda: 20,
        fabricante: 'ORBITAL',
        dataExclusao: '2026-05-21T09:15:00',
        situacao: 'EXCLUIDO',
    },
    {
        id: 3,
        nome: 'Capa Banco Mod Titan 2000',
        codigoBarras: '7899565702060',
        codigoInterno: '2500105',
        classificacao: 'Acessórios',
        valorCusto: 17.28,
        valorVenda: 22.46,
        fabricante: 'MOTOCAPAS',
        dataExclusao: '2026-05-11T17:40:00',
        situacao: 'EXCLUIDO',
    },
];

const moedaBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const StatusText = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #b91c1c;
    font-weight: 600;
`;

export const ProdutosExcluidosPage: React.FC = () => {
    const [produtos, setProdutos] = useState<ProdutoExcluido[]>(produtosExcluidosMockData);

    const handleReativar = useCallback(async (produto: ProdutoExcluido) => {
        const result = await Swal.fire({
            title: 'Reativar Produto',
            text: `Deseja reativar "${produto.nome}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Reativar',
            cancelButtonText: 'Cancelar',
        });

        if (!result.isConfirmed) {
            return;
        }

        setProdutos((current) => current.filter((item) => item.id !== produto.id));

        await Swal.fire('Produto reativado', 'O produto foi reativado com sucesso.', 'success');
    }, []);

    const fields = useMemo<TableField<ProdutoExcluido>[]>(() => [
        { id: 'nome', header: 'Nome do Produto', accessorKey: 'nome', defaultVisible: true },
        { id: 'codigoBarras', header: 'Código de Barra', accessorKey: 'codigoBarras', defaultVisible: true },
        { id: 'codigoInterno', header: 'Código Interno', accessorKey: 'codigoInterno', defaultVisible: false },
        { id: 'classificacao', header: 'Classificação', accessorKey: 'classificacao', defaultVisible: true },
        {
            id: 'valorCusto',
            header: 'Valor Custo',
            accessorKey: 'valorCusto',
            defaultVisible: true,
            align: 'right',
            cell: (value) => moedaBRL.format(Number(value ?? 0)),
        },
        {
            id: 'valorVenda',
            header: 'Valor Venda',
            accessorKey: 'valorVenda',
            defaultVisible: true,
            align: 'right',
            cell: (value) => moedaBRL.format(Number(value ?? 0)),
        },
        { id: 'fabricante', header: 'Fabricante', accessorKey: 'fabricante', defaultVisible: true },
        {
            id: 'dataExclusao',
            header: 'Data',
            accessorKey: 'dataExclusao',
            defaultVisible: true,
            cell: (value) => formatarDataHoraBR(String(value ?? '')),
        },
        {
            id: 'situacao',
            header: 'Situação',
            defaultVisible: true,
            cell: () => (
                <StatusText>
                    <FiXCircle />
                    EXCLUÍDO
                </StatusText>
            ),
        },
    ], []);

    const excelColumns = useMemo<ExcelColumn<ProdutoExcluido>[]>(() => [
        { key: 'nome', header: 'Nome do Produto', accessorKey: 'nome' },
        { key: 'codigoBarras', header: 'Código de Barra', accessorKey: 'codigoBarras' },
        { key: 'codigoInterno', header: 'Código Interno', accessorKey: 'codigoInterno' },
        { key: 'classificacao', header: 'Classificação', accessorKey: 'classificacao' },
        { key: 'valorCusto', header: 'Valor Custo', valueFormatter: (value) => moedaBRL.format(Number(value ?? 0)) },
        { key: 'valorVenda', header: 'Valor Venda', valueFormatter: (value) => moedaBRL.format(Number(value ?? 0)) },
        { key: 'fabricante', header: 'Fabricante', accessorKey: 'fabricante' },
        { key: 'dataExclusao', header: 'Data', valueFormatter: (value) => formatarDataHoraBR(String(value ?? '')) },
        { key: 'situacao', header: 'Situação', accessorKey: 'situacao' },
    ], []);

    const searchFields = useCallback((item: ProdutoExcluido) => [
        item.nome,
        item.codigoBarras,
        item.codigoInterno,
        item.classificacao,
        item.fabricante,
        item.situacao,
    ], []);

    return (
        <ListagemTemplate
            titulo="Produtos Excluídos"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Produtos excluídos"
            descricaoTabela="Filtre por período ou busca avançada e reative produtos quando necessário."
            mensagemVazia="Nenhum produto excluído encontrado para o filtro informado."
            arquivoExcel="produtos_excluidos"
            impressao={{ titulo: 'Produtos Excluídos', subtitulo: 'Consulta de produtos excluídos', orientacao: 'landscape' }}
            dados={produtos}
            campos={fields}
            acoes={[
                {
                    label: 'Reativar',
                    icon: <FiRefreshCw size={16} />,
                    variant: 'success',
                    getTitle: (produto) => `Reativar ${produto.nome}`,
                    onClick: (produto) => {
                        void handleReativar(produto);
                    },
                },
            ]}
            colunasExcel={excelColumns}
            camposPesquisa={searchFields}
            campoData={(produto) => produto.dataExclusao}
            configurarColunas="tabela"
            exportarApenasColunasVisiveis={false}
            menuInicialAberto={false}
            agruparConteudo
        />
    );
};
