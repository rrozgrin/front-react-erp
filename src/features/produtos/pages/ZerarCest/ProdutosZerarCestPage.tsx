import { useMemo, useState } from 'react';
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import { type TableField } from '../../../../common/components/Table';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

interface ProdutoCest {
    id: number;
    codigoBarras: string;
    descricao: string;
    cest: string;
    status: 'pendente' | 'zerado';
}

const produtosCestMock: ProdutoCest[] = [
    { id: 2500108, codigoBarras: '7899565702107', descricao: 'Capa Banco Mod Orig Biz 125 2008', cest: '0100100', status: 'pendente' },
    { id: 2500106, codigoBarras: '7899565702084', descricao: 'Capa Banco Mod Orig Titan 150 2004/08', cest: '2803800', status: 'pendente' },
    { id: 5500190, codigoBarras: '7899565721764', descricao: 'Kit Pris Coroa Titan 150 Fan C/Porca', cest: '2104400', status: 'pendente' },
];

const WarningPanel = styled.section`
    border: 1px solid #fde68a;
    border-radius: 0.1875rem;
    background: #fffbeb;
    color: #92400e;
    padding: 22px;
    display: grid;
    gap: var(--space-sm);

    h3 {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 0;
        color: #92400e;
    }

    p {
        margin: 0;
    }
`;

const SuccessPanel = styled.section`
    border: 1px solid #bbf7d0;
    border-radius: 0.1875rem;
    background: #f0fdf4;
    color: #166534;
    padding: var(--space-md) 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
`;

const StatusText = styled.span<{ $done: boolean }>`
    color: ${({ $done }) => ($done ? '#166534' : '#92400e')};
    font-weight: 800;
`;

const fields: TableField<ProdutoCest>[] = [
    { id: 'id', header: 'Código', accessorKey: 'id', align: 'center', defaultVisible: true },
    { id: 'codigoBarras', header: 'Código Barras', accessorKey: 'codigoBarras', defaultVisible: true },
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao', defaultVisible: true },
    { id: 'cest', header: 'CEST Atual', accessorKey: 'cest', align: 'center', defaultVisible: true },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        align: 'center',
        defaultVisible: true,
        cell: (value) => <StatusText $done={value === 'zerado'}>{value === 'zerado' ? 'Zerado' : 'Pendente'}</StatusText>,
    },
];

export const ProdutosZerarCestPage = () => {
    const [produtos, setProdutos] = useState<ProdutoCest[]>(produtosCestMock);
    const pendentes = useMemo(() => produtos.filter((produto) => produto.status === 'pendente'), [produtos]);

    const zerarCest = async () => {
        const result = await Swal.fire({
            title: 'Atenção',
            html: 'Deseja <b>ZERAR</b> o CEST de <b>TODOS</b> os produtos cadastrados?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
        });

        if (!result.isConfirmed) return;

        setProdutos((current) =>
            current.map((produto) => ({
                ...produto,
                cest: '',
                status: 'zerado',
            }))
        );

        await Swal.fire('Sucesso', 'CEST dos produtos foram zerados.', 'success');
    };

    return (
        <ListagemTemplate
            titulo="Zerar CEST"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Produtos com CEST"
            descricaoTabela="Prévia dos produtos afetados pela rotina."
            dados={produtos}
            campos={fields}
            mensagemVazia="Nenhum produto encontrado."
            conteudoAntesTabela={(
                <>
                    <WarningPanel>
                        <h3><FiAlertTriangle /> Zerar CEST dos produtos</h3>
                        <p>Esta rotina remove o CEST de todos os produtos cadastrados.</p>
                        <p>{pendentes.length} produto(s) ainda possuem CEST informado.</p>
                        <div><Botao nome="Zerar CEST" action={() => void zerarCest()} /></div>
                    </WarningPanel>
                    {!pendentes.length && <SuccessPanel><FiCheckCircle />Todos os produtos listados estão com CEST zerado.</SuccessPanel>}
                </>
            )}
            agruparConteudo
            configurarColunas="tabela"
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
    );
};
