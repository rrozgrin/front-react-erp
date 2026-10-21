import React, { useMemo, useState } from 'react';
import {
    FiCalendar,
    FiEye,
    FiGrid,
    FiRefreshCw,
    FiSearch,
    FiShoppingBag,
    FiUploadCloud,
} from 'react-icons/fi';
import { obterMensagemErroApi } from '@/services/errosApi';
import { formatarMoedaBRLDeCentavos } from '@/utils/formatadores';
import { Table, type TableField } from '@/common/components/Table';
import { Input } from '@/common/components/Ui';
import { formatarDataHoraBR } from '@/types/Data';
import {
    useFood99PedidosMutations,
    useFood99Pedidos,
    type Food99Pedido,
    type Food99StatusSincronizacaoPedido,
} from '../../hooks/useFood99Orders';
import { Food99Shell } from '../../shared/Food99Shell';
import {
    ActionButton,
    DateField,
    DateFieldGroup,
    FiltersCard,
    FiltersGrid,
    SearchField,
    SearchFieldWrapper,
    SelectField,
    StatusPill,
} from './styled';

type StatusPedido = 'Novo pedido' | 'Pendente ERP' | 'Sincronizado' | 'Cancelado';
type FiltroStatus = 'Todos os status' | StatusPedido;

const opcoesStatus: FiltroStatus[] = [
    'Todos os status',
    'Novo pedido',
    'Pendente ERP',
    'Sincronizado',
    'Cancelado',
];

const rotulosStatus: Record<Food99StatusSincronizacaoPedido, StatusPedido> = {
    new_order: 'Novo pedido',
    pending_sync: 'Pendente ERP',
    synced: 'Sincronizado',
    canceled: 'Cancelado',
};

const calcularTotalPedido = (pedido: Food99Pedido): number | null => {
    if (!pedido.itens.length) return null;

    return pedido.itens.reduce((total, item) => total + (item.precoTotal ?? item.precoReal ?? item.precoUnitario ?? 0), 0);
};

const camposPedidos: TableField<Food99Pedido>[] = [
    { id: 'pedido', header: 'Pedido', accessorFn: (pedido) => `#${pedido.pedidoId}` },
    { id: 'venda', header: 'Venda', accessorFn: (pedido) => pedido.vendaId ?? pedido.vendaErpId ?? '-----' },
    { id: 'cliente', header: 'Cliente', accessorFn: (pedido) => pedido.nomeCliente || 'Cliente 99Food' },
    { id: 'valor', header: 'Valor', accessorFn: (pedido) => formatarMoedaBRLDeCentavos(calcularTotalPedido(pedido)) },
    { id: 'data', header: 'Data do pedido', accessorFn: (pedido) => formatarDataHoraBR(pedido.criadoEm, '-----') },
    {
        id: 'status',
        header: 'Status',
        cell: (_valor, pedido) => {
            const rotulo = rotulosStatus[pedido.statusSincronizacao] ?? 'Pendente ERP';
            return <StatusPill $status={rotulo}>{rotulo}</StatusPill>;
        },
    },
];

export const Food99PedidosPage: React.FC = () => {
    const { reprocess } = useFood99PedidosMutations();
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [status, setStatus] = useState<FiltroStatus>('Todos os status');
    const [busca, setBusca] = useState('');
    const [tamanhoPagina, setTamanhoPagina] = useState('20');
    const [idReprocessando, setIdReprocessando] = useState<number | null>(null);
    const [idsSelecionados, setIdsSelecionados] = useState<number[]>([]);
    const [mensagemErro, setMensagemErro] = useState('');
    const consulta = useFood99Pedidos({ limit: Number(tamanhoPagina) });
    const pedidos: Food99Pedido[] = consulta.dados?.pedidos ?? [];
    const carregando = consulta.carregando;
    const mensagemErroConsulta = consulta.erro ? obterMensagemErroApi(consulta.erro, 'Não foi possível carregar os pedidos da 99Food.') : '';
    const possuiPedidoNovo = pedidos.some((pedido) => pedido.statusSincronizacao === 'new_order');
    const quantidadePedidosNovos = pedidos.filter((pedido) => pedido.statusSincronizacao === 'new_order').length;

    const pedidosFiltrados = useMemo(() => {
        const termo = busca.trim().toLowerCase();
        const inicioPeriodo = dataInicial ? new Date(`${dataInicial}T00:00:00`).getTime() : null;
        const fimPeriodo = dataFinal ? new Date(`${dataFinal}T23:59:59`).getTime() : null;

        return pedidos.filter((pedido) => {
            const rotulo = rotulosStatus[pedido.statusSincronizacao] ?? 'Pendente ERP';
            const dataPedido = pedido.criadoEm ? new Date(pedido.criadoEm).getTime() : null;
            const correspondeStatus = status === 'Todos os status' || rotulo === status;
            const correspondeBusca = !termo || [
                pedido.pedidoId,
                pedido.vendaErpId,
                pedido.nomeCliente,
                pedido.telefoneCliente,
                pedido.lojaAppId,
            ].some((campo) => String(campo ?? '').toLowerCase().includes(termo));
            const correspondeInicio = inicioPeriodo === null || dataPedido === null || dataPedido >= inicioPeriodo;
            const correspondeFim = fimPeriodo === null || dataPedido === null || dataPedido <= fimPeriodo;

            return correspondeStatus && correspondeBusca && correspondeInicio && correspondeFim;
        });
    }, [busca, dataFinal, dataInicial, pedidos, status]);

    const reprocessarPedido = async (pedidoId: number) => {
        try {
            setIdReprocessando(pedidoId);
            setMensagemErro('');

            await reprocess(pedidoId);
            await consulta.recarregar();
        } catch (erro) {
            setMensagemErro(obterMensagemErroApi(erro, 'Não foi possível reprocessar o pedido da 99Food.'));
        } finally {
            setIdReprocessando(null);
        }
    };

    return (
        <Food99Shell
            pageTitle="Pedidos 99Food"
            pageDescription="Acompanhe, filtre e sincronize os pedidos recebidos pela 99Food."
            topCards={[
                {
                    title: 'Pedidos Novos',
                    value: '',
                    caption: possuiPedidoNovo ? `${quantidadePedidosNovos} pedido(s) novo(s) aguardando tratamento` : 'Nenhum pedido novo no momento',
                    icon: <FiGrid />,
                    highlight: possuiPedidoNovo,
                },
                {
                    title: 'Loja',
                    value: pedidos[0]?.lojaAppId ?? '-----',
                    icon: <FiShoppingBag />,
                },
                {
                    title: 'Última consulta',
                    value: carregando || consulta.atualizando ? 'Atualizando...' : formatarDataHoraBR(new Date()),
                    icon: <FiUploadCloud />,
                },
            ]}
        >
            <FiltersCard>
                <FiltersGrid>
                    <DateFieldGroup>
                        <span>Período de</span>
                        <DateField>
                            <Input type="date" value={dataInicial} onChange={(event) => setDataInicial(event.target.value)} />
                            <FiCalendar />
                        </DateField>
                    </DateFieldGroup>

                    <DateFieldGroup>
                        <span>até</span>
                        <DateField>
                            <Input type="date" value={dataFinal} onChange={(event) => setDataFinal(event.target.value)} />
                            <FiCalendar />
                        </DateField>
                    </DateFieldGroup>

                    <div>
                        <span>Status</span>
                        <SelectField value={status} onChange={(event) => setStatus(event.target.value as FiltroStatus)}>
                            {opcoesStatus.map((opcao) => (
                                <option key={opcao}>{opcao}</option>
                            ))}
                        </SelectField>
                    </div>

                    <SearchFieldWrapper>
                        <SearchField
                            value={busca}
                            onChange={(event) => setBusca(event.target.value)}
                            placeholder="Buscar pedido, cliente ou loja"
                        />
                        <FiSearch />
                    </SearchFieldWrapper>

                    <SelectField value={tamanhoPagina} onChange={(event) => setTamanhoPagina(event.target.value)}>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                    </SelectField>

                    <ActionButton type="button" onClick={() => void consulta.recarregar()} disabled={carregando || consulta.atualizando}>
                        <FiRefreshCw />
                        {carregando || consulta.atualizando ? 'Atualizando...' : 'Atualizar'}
                    </ActionButton>
                </FiltersGrid>
            </FiltersCard>

            {mensagemErro || mensagemErroConsulta ? <FiltersCard>{mensagemErro || mensagemErroConsulta}</FiltersCard> : null}

            <FiltersCard>
                <Table
                    data={pedidosFiltrados}
                    fields={camposPedidos}
                    title={`Exibindo ${pedidosFiltrados.length} pedidos`}
                    description="Pedidos recebidos pela integração com a 99Food."
                    showColumnSelector={false}
                    selectable
                    allRowsSelected={pedidosFiltrados.length > 0 && pedidosFiltrados.every((pedido) => idsSelecionados.includes(pedido.id))}
                    isRowSelected={(pedido) => idsSelecionados.includes(pedido.id)}
                    onToggleRowSelection={(pedido) => setIdsSelecionados((atuais) => atuais.includes(pedido.id)
                        ? atuais.filter((id) => id !== pedido.id)
                        : [...atuais, pedido.id])}
                    onToggleAllRows={(selecionar) => setIdsSelecionados(selecionar ? pedidosFiltrados.map((pedido) => pedido.id) : [])}
                    emptyMessage={carregando ? 'Carregando pedidos...' : 'Nenhum pedido encontrado.'}
                    rowActions={[
                        {
                            label: 'Detalhes',
                            icon: <FiEye />,
                            getTitle: (pedido) => pedido.mensagemErro || `Detalhes do pedido ${pedido.pedidoId}`,
                            onClick: () => undefined,
                        },
                        {
                            label: 'Sincronizar',
                            icon: <FiRefreshCw />,
                            hidden: (pedido) => pedido.statusSincronizacao !== 'pending_sync',
                            disabled: (pedido) => idReprocessando === pedido.id,
                            getTitle: (pedido) => `Sincronizar pedido ${pedido.pedidoId}`,
                            onClick: (pedido) => void reprocessarPedido(pedido.id),
                        },
                    ]}
                />
            </FiltersCard>
        </Food99Shell>
    );
};
