import { lazy, ReactElement, Suspense, useEffect, useMemo, useState } from 'react';
import {
    Button,
    Col,
    Container,
    Row,
} from 'react-bootstrap';
import { BackDefault } from '../../../common/components/Templates/BackDefault';
import { Botao } from '../../../common/components/Buttons/Botao';
import { IconFA } from '../../../common/components/Icons/IconFA';
import {
    FavoritesEmpty,
    HomePage,
    InfoHome,
    KpiCard,
    ProductKpiCard,
} from './styled';
import { FavoritosGrid } from './components/FavoritosGrid';
import { useFavoritos } from '../../../context/FavoritosContext';
import { useUsuario } from '../../../context/UsuarioContext';
import { useCertificado } from '../../../context/CertificadoContext';
import { ChartCard } from './components/ChartCard';
import { CardInformacoes } from './components/CardInformacoes';
import { PeriodoInput } from '../../../common/components/Inputs/PeriodoInput';
import { Checkbox } from '../../../common/components/Ui';
import useBaseUrl from '../../../hooks/useBaseUrl';
import {
    useClientesQueMaisCompramQuery,
    useNotasFiscaisQuery,
    useProdutosMaisVendidosQuery,
    useQuantidadeConsultasQuery,
    useQuantidadePedidosQuery,
    useReceitaBrutaEDescontosQuery,
    useTicketMedioQuery,
    useVendasPorPeriodoQuery,
} from '../hooks/useHomeGraficos';
import type { HomeGraficosPeriodo } from '../services/homeService';

import { ReceitaBrutaGrafico } from './components/ReceitaBrutaGrafico';
import { ProdutosMaisVendidosGrafico } from './components/ProdutosMaisVendidosGrafico';
import { VendasPeriodoGrafico } from './components/VendasPeriodoGrafico';
import { ClientesMaisCompramGrafico } from './components/ClientesMaisCompramGrafico';
import { NotasFiscaisGrafico } from './components/NotasFiscaisGrafico';
import { PedidosGrafico } from './components/PedidosGrafico';
import { ConsultasGrafico } from './components/ConsultasGrafico';
import { GraficoComPermissao } from './components/GraficoComPermissao';
import { SlideProducts } from './components/SlideProducts';

const ModalFavoritos = lazy(() => import('./components/ModalFavoritos').then(({ ModalFavoritos: Component }) => ({ default: Component })));
const ModalIndiqueAmigo = lazy(() => import('./components/ModalIndiqueAmigo').then(({ ModalIndiqueAmigo: Component }) => ({ default: Component })));
const CertificadoModal = lazy(() => import('./components/ModalRenovaCertificado'));

type WidgetId =
    | 'favoritos'
    | 'alertas'
    | 'receita-chart'
    | 'notas-chart'
    | 'pedidos-chart'
    | 'consultas-chart'
    | 'produtos-chart'
    | 'vendas-chart'
    | 'clientes-chart';

type DashboardWidgetDefinition = {
    id: WidgetId;
    title: string;
    size: 'small' | 'normal';
    hideable?: boolean;
};

type StoredDashboardLayout = {
    order: WidgetId[];
    hidden: WidgetId[];
};

const DASHBOARD_LAYOUT_STORAGE_KEY = 'home-dashboard-layout-v3';

const DASHBOARD_WIDGETS: DashboardWidgetDefinition[] = [
    { id: 'favoritos', title: 'Favoritos', size: 'normal' },
    { id: 'alertas', title: 'Alertas e Pendências', size: 'normal', hideable: false },
    { id: 'receita-chart', title: 'Receita Bruta e Descontos', size: 'normal' },
    { id: 'notas-chart', title: 'Notas Fiscais', size: 'normal' },
    { id: 'pedidos-chart', title: 'Pedidos por Tipo', size: 'normal' },
    { id: 'consultas-chart', title: 'Consultas', size: 'normal' },
    { id: 'produtos-chart', title: 'Produtos Mais Vendidos', size: 'normal' },
    { id: 'vendas-chart', title: 'Vendas por Período', size: 'normal' },
    { id: 'clientes-chart', title: 'Clientes que mais Compram', size: 'normal' },
];

const DEFAULT_WIDGET_ORDER = DASHBOARD_WIDGETS.map((widget) => widget.id);
const REQUIRED_WIDGET_IDS = DASHBOARD_WIDGETS
    .filter((widget) => widget.hideable === false)
    .map((widget) => widget.id);

const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value || 0);

const sumBy = <T,>(items: T[] | undefined, getValue: (item: T) => number): number =>
    (items || []).reduce((total, item) => total + getValue(item), 0);

const addMonths = (date: Date, months: number): Date => {
    const result = new Date(date);
    const day = result.getDate();

    result.setMonth(result.getMonth() + months);

    if (result.getDate() !== day) {
        result.setDate(0);
    }

    return result;
};

const formatDateBR = (value: string): string => {
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
};

const uniqueKnownWidgetIds = (ids: unknown): WidgetId[] => {
    if (!Array.isArray(ids)) return [];

    return ids.filter((id): id is WidgetId =>
        typeof id === 'string' && DEFAULT_WIDGET_ORDER.includes(id as WidgetId),
    );
};

const getInitialDashboardLayout = (): StoredDashboardLayout => {
    if (typeof window === 'undefined') {
        return { order: DEFAULT_WIDGET_ORDER, hidden: [] };
    }

    try {
        const stored = window.localStorage.getItem(DASHBOARD_LAYOUT_STORAGE_KEY);
        if (!stored) return { order: DEFAULT_WIDGET_ORDER, hidden: [] };

        const parsed = JSON.parse(stored) as Partial<StoredDashboardLayout>;
        const storedOrder = uniqueKnownWidgetIds(parsed.order);
        const storedHidden = uniqueKnownWidgetIds(parsed.hidden);
        const missingWidgets = DEFAULT_WIDGET_ORDER.filter((id) => !storedOrder.includes(id));

        return {
            order: [...storedOrder, ...missingWidgets],
            hidden: storedHidden.filter((id) => !REQUIRED_WIDGET_IDS.includes(id)),
        };
    } catch {
        return { order: DEFAULT_WIDGET_ORDER, hidden: [] };
    }
};

export const Home = (): ReactElement => {
    const baseUrl = useBaseUrl();
    const { usuario } = useUsuario();
    const { notCertificado } = useCertificado();
    const { favoritos } = useFavoritos();

    const [openFavoritos, setOpenFavoritos] = useState(false);
    const [modalAmigo, setShowModalAmigo] = useState(false);
    const [periodoGraficos, setPeriodoGraficos] = useState<HomeGraficosPeriodo | undefined>();
    const [periodoErro, setPeriodoErro] = useState('');
    const [dashboardConfigOpen, setDashboardConfigOpen] = useState(false);
    const [dashboardLayout, setDashboardLayout] = useState<StoredDashboardLayout>(getInitialDashboardLayout);
    const [draggingWidgetId, setDraggingWidgetId] = useState<WidgetId | null>(null);

    const { data: dadosTicketMedio } = useTicketMedioQuery(periodoGraficos);
    const { data: dadosReceita } = useReceitaBrutaEDescontosQuery(periodoGraficos);
    const { data: dadosProdutos } = useProdutosMaisVendidosQuery(periodoGraficos);
    const { data: dadosVendas } = useVendasPorPeriodoQuery(periodoGraficos);
    const { data: dadosClientes } = useClientesQueMaisCompramQuery(periodoGraficos);
    const { data: dadosNotas } = useNotasFiscaisQuery(periodoGraficos);
    const { data: dadosPedidos } = useQuantidadePedidosQuery(periodoGraficos);
    const { data: dadosConsultas } = useQuantidadeConsultasQuery(periodoGraficos);

    useEffect(() => {
        window.localStorage.setItem(DASHBOARD_LAYOUT_STORAGE_KEY, JSON.stringify(dashboardLayout));
    }, [dashboardLayout]);

    const widgetDefinitionsById = useMemo(
        () => new Map(DASHBOARD_WIDGETS.map((widget) => [widget.id, widget])),
        [],
    );
    const hiddenWidgetIds = dashboardLayout.hidden;
    const visibleWidgetIds = dashboardLayout.order.filter((id) => !hiddenWidgetIds.includes(id));

    const foneDisplay = [usuario?.fone_franquia1, usuario?.fone_franquia3]
        .filter(Boolean)
        .join(' / ');
    const receitaAtual = dadosReceita?.at(-1)?.receita_bruta ?? 0;
    const receitaAnterior = dadosReceita && dadosReceita.length > 1 ? dadosReceita.at(-2)?.receita_bruta ?? 0 : 0;
    const receitaTrend = receitaAnterior ? ((receitaAtual - receitaAnterior) / receitaAnterior) * 100 : 0;
    const totalPedidos = sumBy(dadosPedidos, (item) => item.qtd);
    const ultimoTicket = dadosTicketMedio?.at(-1);
    const ticketMedio = ultimoTicket?.pedidos ? ultimoTicket.receita_bruta / ultimoTicket.pedidos : 0;
    const periodoDescricao = periodoGraficos?.dataInicio && periodoGraficos?.dataFim
        ? `${formatDateBR(periodoGraficos.dataInicio)} ate ${formatDateBR(periodoGraficos.dataFim)}`
        : '';

    const handlePeriodoChange = (dataInicio: string, dataFim: string) => {
        if (!dataInicio || !dataFim) {
            setPeriodoErro('');
            return;
        }

        const inicio = new Date(`${dataInicio}T00:00:00`);
        const fim = new Date(`${dataFim}T00:00:00`);

        if (fim < inicio) {
            setPeriodoErro('A data final deve ser maior que a inicial.');
            return;
        }

        if (fim > addMonths(inicio, 4)) {
            setPeriodoErro('Selecione no maximo 4 meses.');
            return;
        }

        setPeriodoErro('');
        setPeriodoGraficos({ dataInicio, dataFim });
    };

    const hideWidget = (id: WidgetId) => {
        const widget = widgetDefinitionsById.get(id);
        if (widget?.hideable === false) return;

        setDashboardLayout((current) => ({
            ...current,
            hidden: current.hidden.includes(id) ? current.hidden : [...current.hidden, id],
        }));
    };

    const toggleWidget = (id: WidgetId) => {
        const widget = widgetDefinitionsById.get(id);
        if (widget?.hideable === false) return;

        setDashboardLayout((current) => ({
            ...current,
            hidden: current.hidden.includes(id)
                ? current.hidden.filter((hiddenId) => hiddenId !== id)
                : [...current.hidden, id],
        }));
    };

    const resetDashboardLayout = () => {
        setDashboardLayout({ order: DEFAULT_WIDGET_ORDER, hidden: [] });
    };

    const moveWidget = (sourceId: WidgetId, targetId: WidgetId) => {
        if (sourceId === targetId) return;

        setDashboardLayout((current) => {
            const nextOrder = [...current.order];
            const sourceIndex = nextOrder.indexOf(sourceId);
            const targetIndex = nextOrder.indexOf(targetId);

            if (sourceIndex < 0 || targetIndex < 0) return current;

            nextOrder.splice(sourceIndex, 1);
            nextOrder.splice(targetIndex, 0, sourceId);

            return {
                ...current,
                order: nextOrder,
            };
        });
    };

    const renderWidgetContent = (id: WidgetId) => {
        switch (id) {
            case 'favoritos':
                return (
                    <BackDefault className="home-favorites-panel p-3 px-3 mb-3">
                        <div className="home-favorites-header pb-3 mb-4 border-bottom">
                            <h3 className="h5 m-0 d-flex align-items-center" data-app-font-exception="home-dashboard-title">
                                <IconFA iconName="fa-solid fa-star" className="me-2" />
                                Favoritos
                            </h3>
                            <Button
                                variant="primary"
                                size="sm"
                                className="home-favorites-config-button d-flex align-items-center justify-content-center"
                                style={{
                                    width: 30,
                                    height: 30,
                                    minWidth: 30,
                                    minHeight: 30,
                                    padding: 0,
                                    borderRadius: 3,
                                    border: 'none',
                                    backgroundColor: ' var(--color-secondary, var(--bs-secondary))',
                                }}
                                onClick={() => setOpenFavoritos(true)}
                            >
                                <IconFA iconName="fa-solid fa-gear" style={{ color: '#fff' }} />
                            </Button>
                        </div>
                        {favoritos.length > 0 ? (
                            <FavoritosGrid favoritos={favoritos} baseUrl={baseUrl} />
                        ) : (
                            <FavoritesEmpty>
                                <IconFA iconName="fa-solid fa-gear" className="me-2" />
                                <span>Clique na engrenagem para adicionar os favoritos</span>
                            </FavoritesEmpty>
                        )}
                    </BackDefault>
                );

            case 'alertas':
                return <CardInformacoes />;

            case 'receita-chart':
                return (
                    <GraficoComPermissao permissaoId="151" titulo="Receita Bruta e Descontos" icon="fa-solid fa-coins">
                        <ChartCard titulo="Receita Bruta e Descontos" icon="fa-solid fa-coins" dados={dadosReceita}>
                            <ReceitaBrutaGrafico dados={dadosReceita} />
                        </ChartCard>
                    </GraficoComPermissao>
                );

            case 'notas-chart':
                return (
                    <GraficoComPermissao permissaoId="151" titulo="Notas Fiscais" icon="fa-solid fa-file-invoice">
                        <ChartCard titulo="Notas Fiscais" icon="fa-solid fa-file-invoice" dados={dadosNotas}>
                            <NotasFiscaisGrafico notas={dadosNotas} />
                        </ChartCard>
                    </GraficoComPermissao>
                );

            case 'pedidos-chart':
                return (
                    <GraficoComPermissao permissaoId="151" titulo="Pedidos" icon="fa-solid fa-receipt">
                        <ChartCard titulo="Pedidos" icon="fa-solid fa-receipt" dados={dadosPedidos}>
                            <PedidosGrafico pedidos={dadosPedidos} />
                        </ChartCard>
                    </GraficoComPermissao>
                );

            case 'consultas-chart':
                return (
                    <GraficoComPermissao permissaoId="151" titulo="Consultas" icon="fa-solid fa-magnifying-glass-chart">
                        <ChartCard titulo="Consultas" icon="fa-solid fa-magnifying-glass-chart" dados={dadosConsultas}>
                            <ConsultasGrafico consultas={dadosConsultas} />
                        </ChartCard>
                    </GraficoComPermissao>
                );

            case 'produtos-chart':
                return (
                    <GraficoComPermissao permissaoId="151" titulo="Produtos Mais Vendidos" icon="fa-solid fa-box-archive">
                        <ChartCard titulo="Produtos Mais Vendidos" icon="fa-solid fa-box-archive" dados={dadosProdutos}>
                            <ProdutosMaisVendidosGrafico produtos={dadosProdutos} />
                        </ChartCard>
                    </GraficoComPermissao>
                );

            case 'vendas-chart':
                return (
                    <GraficoComPermissao permissaoId="151" titulo="Vendas por Periodo" icon="fa-solid fa-chart-line">
                        <ChartCard titulo="Vendas por Periodo" icon="fa-solid fa-chart-line" dados={dadosVendas}>
                            <VendasPeriodoGrafico vendas={dadosVendas} />
                        </ChartCard>
                    </GraficoComPermissao>
                );

            case 'clientes-chart':
                return (
                    <GraficoComPermissao permissaoId="151" titulo="Clientes que mais Compram" icon="fa-solid fa-user">
                        <ChartCard titulo="Clientes que mais Compram" icon="fa-solid fa-user" dados={dadosClientes}>
                            <ClientesMaisCompramGrafico clientes={dadosClientes} />
                        </ChartCard>
                    </GraficoComPermissao>
                );

            default:
                return null;
        }
    };

    return (
        <HomePage>
            <Container fluid>
                <section className="home-kpi-row">
                    <KpiCard $accent="#28b463">
                        <div className="kpi-icon">
                            <IconFA iconName="fa-solid fa-dollar-sign" />
                        </div>
                        <div className="kpi-content">
                            <p className="kpi-label">Receita Bruta</p>
                            <p className="kpi-value">{formatCurrency(receitaAtual)}</p>
                            <span className={`kpi-trend ${receitaTrend < 0 ? 'negative' : ''}`}>
                                <IconFA iconName={receitaTrend < 0 ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-up'} />
                                {Math.abs(receitaTrend).toFixed(1)}% vs mes anterior
                            </span>
                        </div>
                    </KpiCard>

                    <KpiCard $accent="#2f80ed">
                        <div className="kpi-icon">
                            <IconFA iconName="fa-solid fa-bag-shopping" />
                        </div>
                        <div className="kpi-content">
                            <p className="kpi-label">Pedidos</p>
                            <p className="kpi-value">{totalPedidos.toLocaleString('pt-BR')}</p>
                            <span className="kpi-trend">
                                <IconFA iconName="fa-solid fa-arrow-up" />
                                Total do periodo
                            </span>
                        </div>
                    </KpiCard>

                    <KpiCard $accent="#7048e8">
                        <div className="kpi-icon">
                            <IconFA iconName="fa-solid fa-ticket" />
                        </div>
                        <div className="kpi-content">
                            <p className="kpi-label">Ticket Medio</p>
                            <p className="kpi-value">{formatCurrency(ticketMedio)}</p>
                            <span className="kpi-trend">
                                <IconFA iconName="fa-solid fa-chart-line" />
                                Ultimo mes
                            </span>
                        </div>
                    </KpiCard>

                    <ProductKpiCard>
                        <SlideProducts />
                    </ProductKpiCard>
                </section>

                <section className="home-date-filter">
                    <div className="home-date-filter-title">
                        <IconFA iconName="fa-solid fa-calendar-days" />
                        <span>Período dos gráficos</span>
                    </div>
                    <PeriodoInput larguraTotal onChange={handlePeriodoChange} />
                    {(periodoErro || periodoDescricao) && (
                        <small className={periodoErro ? 'home-date-status is-error' : 'home-date-status'}>
                            {periodoErro || periodoDescricao}
                        </small>
                    )}
                    <div className="home-dashboard-actions">
                        <Botao
                            type="button"
                            nome="Configurar"
                            icone={<IconFA iconName="fa-solid fa-sliders" />}
                            action={() => setDashboardConfigOpen((isOpen) => !isOpen)}
                        />

                        {dashboardConfigOpen && (
                            <div className="home-config-panel">
                                <div className="home-config-panel-header">
                                    <strong>Itens da Home</strong>
                                    <button type="button" onClick={resetDashboardLayout}>Restaurar</button>
                                </div>
                                <div className="home-config-panel-list">
                                    {DASHBOARD_WIDGETS.map((widget) => (
                                        <label key={widget.id}>
                                            <Checkbox
                                                checked={!hiddenWidgetIds.includes(widget.id)}
                                                disabled={widget.hideable === false}
                                                onChange={() => toggleWidget(widget.id)}
                                            />
                                            <span>{widget.title}</span>
                                            {widget.hideable === false && <em>fixo</em>}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="home-dashboard-grid">
                    {visibleWidgetIds.map((id) => {
                        const widget = widgetDefinitionsById.get(id);
                        if (!widget) return null;

                        return (
                            <div
                                key={id}
                                className={`dashboard-widget ${draggingWidgetId === id ? 'is-dragging' : ''}`}
                                data-size={widget.size}
                                onDragOver={(event) => {
                                    event.preventDefault();
                                    event.dataTransfer.dropEffect = 'move';
                                }}
                                onDrop={(event) => {
                                    event.preventDefault();
                                    const sourceId = event.dataTransfer.getData('text/plain') as WidgetId;
                                    if (sourceId) moveWidget(sourceId, id);
                                    setDraggingWidgetId(null);
                                }}
                            >
                                <div className="dashboard-widget-controls">
                                    <button
                                        type="button"
                                        className="dashboard-widget-control dashboard-widget-drag-handle"
                                        title="Arrastar"
                                        draggable
                                        onDragStart={(event) => {
                                            event.dataTransfer.effectAllowed = 'move';
                                            event.dataTransfer.setData('text/plain', id);
                                            setDraggingWidgetId(id);
                                        }}
                                        onDragEnd={() => setDraggingWidgetId(null)}
                                    >
                                        <IconFA iconName="fa-solid fa-grip-vertical" />
                                    </button>
                                    {widget.hideable !== false && (
                                        <button
                                            type="button"
                                            className="dashboard-widget-control"
                                            title="Ocultar"
                                            onClick={() => hideWidget(id)}
                                        >
                                            <IconFA iconName="fa-solid fa-xmark" />
                                        </button>
                                    )}
                                </div>
                                <div className="dashboard-widget-content">
                                    {renderWidgetContent(id)}
                                </div>
                            </div>
                        );
                    })}
                </section>

                <BackDefault>
                    <InfoHome className="py-3" fluid>
                        <Row>
                            <Col xs={12} md={4} className="d-flex justify-content-center info-bottom">
                                <button onClick={() => setShowModalAmigo(true)}>
                                    <h3 className="h6">
                                        <IconFA iconName="fa-solid fa-user-group" className="me-2" style={{ backgroundColor: 'var(--color-secondary, var(--bs-secondary))' }} />
                                        Indique um amigo e ganhe R$ 100 ou uma mensalidade
                                    </h3>
                                </button>
                            </Col>
                            <Col xs={12} md={4} className="d-flex justify-content-center info-bottom">
                                <button onClick={() => window.open('https://www.instagram.com/webcontrolempresasoficial/', '_blank', 'noopener noreferrer')}>
                                    <h3 className="h6">
                                        <IconFA iconName="fa-brands fa-instagram" className="me-2" style={{ backgroundColor: 'var(--color-secondary, var(--bs-secondary))' }} />
                                        Siga Nosso Instagram Oficial!
                                    </h3>
                                </button>
                            </Col>
                            <Col xs={12} md={4} className="d-flex justify-content-center info-bottom">
                                <button>
                                    <h3 className="h6">
                                        <IconFA iconName="fa-solid fa-phone" className="me-2" style={{ backgroundColor: 'var(--color-secondary, var(--bs-secondary))' }} />
                                        Atendimento: {foneDisplay}
                                    </h3>
                                </button>
                            </Col>
                        </Row>
                    </InfoHome>
                </BackDefault>

                {openFavoritos && <Suspense fallback={null}><ModalFavoritos show={openFavoritos} handleClose={() => setOpenFavoritos(false)} /></Suspense>}
                {modalAmigo && <Suspense fallback={null}><ModalIndiqueAmigo show={modalAmigo} handleClose={() => setShowModalAmigo(false)} /></Suspense>}
                {usuario && notCertificado === 1 && (
                    <Suspense fallback={null}><CertificadoModal idCadastro={usuario.id_cadastro} cnpj={usuario.insc} /></Suspense>
                )}
            </Container>
        </HomePage>
    );
};
