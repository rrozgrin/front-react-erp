import React, { useEffect, useMemo, useState } from 'react';
import { ModalSimple } from '@/common/components/ModalSimple';
import { Table, type TableField } from '@/common/components/Table';
import {
    ControlsGrid,
    ControlGroup,
    TableWrap,
    moneyBRL,
} from './styled';
import { Botao } from '@/common/components/Buttons/Botao';
import { BuscaSimples } from '@/common/components/Inputs/BuscaSimples';

type PedidoFiltro = 'pedido' | 'cliente' | 'vendedor' | 'status';

interface PedidoLocalizado {
    pedido: string;
    data: string;
    cliente: string;
    vendedor: string;
    total: number;
    status: string;
}

interface LocalizarPedidoModalProps {
    open: boolean;
    onClose: () => void;
    onSelectPedido?: (pedido: PedidoLocalizado) => void;
}


const pedidosMock: PedidoLocalizado[] = [
    {
        pedido: '10023',
        data: '02/06/2026 10:14',
        cliente: 'CLIENTE BALCAO',
        vendedor: 'Funcionario MASTER',
        total: 120.5,
        status: 'Em aberto',
    },
    {
        pedido: '10024',
        data: '02/06/2026 10:46',
        cliente: 'JOAO DA SILVA',
        vendedor: 'Funcionario MASTER',
        total: 68.9,
        status: 'Finalizado',
    },
    {
        pedido: '10025',
        data: '02/06/2026 11:08',
        cliente: 'MARIA APARECIDA',
        vendedor: 'CAIXA 01',
        total: 31.2,
        status: 'Cancelado',
    },
];

export const LocalizarPedidoModal: React.FC<LocalizarPedidoModalProps> = ({ open, onClose, onSelectPedido }) => {
    const [filtro, setFiltro] = useState<PedidoFiltro>('pedido');
    const [buscaDigitada, setBuscaDigitada] = useState('');
    const [buscaAplicada, setBuscaAplicada] = useState('');

    const handlePesquisar = (value = buscaDigitada) => {
        setBuscaDigitada(value);
        setBuscaAplicada(value.trim());
    };

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
    }, [open, onClose]);

    const pedidosFiltrados = useMemo(() => {
        const termo = buscaAplicada.toLowerCase();

        if (!termo) {
            return pedidosMock;
        }

        return pedidosMock.filter((pedido) => {
            const valorBase = String(pedido[filtro]).toLowerCase();
            return valorBase.includes(termo);
        });
    }, [buscaAplicada, filtro]);

    const fields = useMemo<TableField<PedidoLocalizado>[]>(() => [
        {
            id: 'pedido',
            header: 'Pedido',
            accessorKey: 'pedido',
            align: 'center',
        },
        {
            id: 'data',
            header: 'Data',
            accessorKey: 'data',
        },
        {
            id: 'cliente',
            header: 'Cliente',
            accessorKey: 'cliente',
        },
        {
            id: 'vendedor',
            header: 'Vendedor',
            accessorKey: 'vendedor',
        },
        {
            id: 'total',
            header: 'Total',
            accessorKey: 'total',
            align: 'right',
            cell: (value) => moneyBRL.format(Number(value ?? 0)),
        },
        {
            id: 'status',
            header: 'Status',
            accessorKey: 'status',
            align: 'center',
        },
    ], []);

    if (!open) {
        return null;
    }

    return (
        <ModalSimple
            title="Localizar Pedido"
            onClose={onClose}
            size="xl"
            footer={(
                <Botao nome="Fechar" action={onClose} />
            )}
        >
            <ControlsGrid
                onSubmit={(event) => {
                    event.preventDefault();
                    handlePesquisar();
                }}
            >
                <ControlGroup>
                    <span>Filtro</span>
                    <select value={filtro} onChange={(event) => setFiltro(event.target.value as PedidoFiltro)}>
                        <option value="pedido">Pedido</option>
                        <option value="cliente">Cliente</option>
                        <option value="vendedor">Vendedor</option>
                        <option value="status">Status</option>
                    </select>
                </ControlGroup>

                <ControlGroup>
                    <span>Pesquisar</span>
                    <BuscaSimples
                        pesquisa={buscaDigitada}
                        onChange={setBuscaDigitada}
                        onSearch={handlePesquisar}
                        placeholder="Digite o que quiser"
                        ariaLabel="Pesquisar pedido"
                    />
                </ControlGroup>
            </ControlsGrid>

            <TableWrap>
                <Table<PedidoLocalizado>
                    data={pedidosFiltrados}
                    fields={fields}
                    emptyMessage="Nenhum pedido encontrado."
                    showHeader={false}
                    showColumnSelector={false}
                    compact
                    rowAction={{
                        label: 'Selecionar',
                        getTitle: (pedido) => `Selecionar pedido ${pedido.pedido}`,
                        onClick: (pedido) => {
                            onSelectPedido?.(pedido);
                            onClose();
                        },
                    }}
                />
            </TableWrap>
        </ModalSimple>
    );
};
