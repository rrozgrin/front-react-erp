import React, { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ModalSimple, ModalSimpleActionButton } from '@/common/components/ModalSimple';
import { CouponTable, type CouponTableItem } from '@/features/operacao-comercial/components/CouponTable';
import { ItemSelector, type ItemSelectorProduct, type ItemSelectorShortcut } from '@/features/operacao-comercial/components/ItemSelector';
import type { AlterarItemFormValues, FrenteCaixaAlterarItem } from '@/features/operacao-comercial/components/AlterarItemModal';
import type { CancelarItemFormValues } from '@/features/operacao-comercial/components/CancelarItemModal';
import type { ProdutoItem } from '@/features/operacao-comercial/data/produtosMock';

const LocalizarPedidoModal = lazy(() => import('@/features/operacao-comercial/components/LocalizarPedidoModal').then(({ LocalizarPedidoModal: Component }) => ({ default: Component })));
const DescontoModal = lazy(() => import('@/features/operacao-comercial/components/DescontoModal').then(({ DescontoModal: Component }) => ({ default: Component })));
const SearchCliente = lazy(() => import('@/features/clientes').then(({ SearchCliente: Component }) => ({ default: Component })));
const SearchProduto = lazy(() => import('@/features/operacao-comercial/components/SearchProduto').then(({ SearchProduto: Component }) => ({ default: Component })));
const SelectVendedor = lazy(() => import('@/features/operacao-comercial/components/SelectVendedor').then(({ SelectVendedor: Component }) => ({ default: Component })));
const ModalAddClientes = lazy(() => import('@/features/clientes').then(({ ModalAddClientes: Component }) => ({ default: Component })));
const ModalAddProdutos = lazy(() => import('@/features/produtos').then(({ ModalAddProdutos: Component }) => ({ default: Component })));
const AlterarItemModal = lazy(() => import('@/features/operacao-comercial/components/AlterarItemModal').then(({ AlterarItemModal: Component }) => ({ default: Component })));
const CancelarItemModal = lazy(() => import('@/features/operacao-comercial/components/CancelarItemModal').then(({ CancelarItemModal: Component }) => ({ default: Component })));

const Container = styled.div`
    width: 100%;
    height: calc(100dvh - 40px);
    min-height: 0;
    display: flex;
    justify-content: flex-start;
    min-height: 0;
    align-items: flex-start;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;

    @media (max-width: 1023px) {
        height: auto;
        min-height: calc(100dvh - 40px);
        display: block;
        overflow: visible;
        -webkit-overflow-scrolling: touch;
    }
`;

const OperacaoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    min-height: 0;

    @media (max-width: 1023px) {
        flex-direction: column;
        height: auto;
        min-height: 0;
        overflow: visible;
        padding: 0;
    }
`;

const ConfirmationText = styled.div`
    display: grid;
    gap: var(--space-xs);
    color: #334155;
    font-size: 0.95rem;
    line-height: 1.45;
`;

export type OperacaoComercialF10 =
    | {
        type: 'navigate';
        path: string;
    }
    | {
        type: 'modal';
    }
    | {
        type: 'confirm';
        title: string;
        message: string;
        confirmLabel: string;
    };

export type OperacaoComercialConfig = {
    actionButtons?: {
        label: string;
        action?: OperacaoComercialAcao;
    }[];
    clienteNome?: string;
    documentoData?: string;
    documentoLabel: string;
    documentoNumero: string;
    f10: OperacaoComercialF10;
    finalizarLabel: string;
    imageSrc?: string | null;
    items?: CouponTableItem[];
    localizarLabel: string;
    product?: ItemSelectorProduct;
    searchPlaceholder?: string;
    searchShortcutLabel?: string;
    totalCompra?: string;
    totalLabel?: string;
};

export type OperacaoComercialAcao =
    | 'alterar'
    | 'cancelar'
    | 'cliente'
    | 'desconto'
    | 'finalizar'
    | 'localizar'
    | 'produto'
    | 'vendedor';

export type OperacaoComercialFinalizacaoProps = {
    clienteNome?: string;
    documentoData?: string;
    documentoLabel: string;
    documentoNumero: string;
    onClose: () => void;
    onFinalize: () => void;
    totalCompra?: string;
    totalLabel?: string;
    vendedorNome: string;
};

type OperacaoComercialPageProps = {
    config: OperacaoComercialConfig;
    onSearchProduto?: (codigo: string) => boolean;
    onSelectProduto?: (produto: ProdutoItem) => void;
    renderFinalizacao?: (props: OperacaoComercialFinalizacaoProps) => ReactNode;
};

export const OperacaoComercialPage: React.FC<OperacaoComercialPageProps> = ({ config, onSearchProduto, onSelectProduto, renderFinalizacao }) => {
    const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const [isLocalizarPedidoOpen, setIsLocalizarPedidoOpen] = useState(false);
    const [isDescontoOpen, setIsDescontoOpen] = useState(false);
    const [isSearchClienteOpen, setIsSearchClienteOpen] = useState(false);
    const [isSearchProdutoOpen, setIsSearchProdutoOpen] = useState(false);
    const [isAddClienteOpen, setIsAddClienteOpen] = useState(false);
    const [isAddProdutoOpen, setIsAddProdutoOpen] = useState(false);
    const [isSelectVendedorOpen, setIsSelectVendedorOpen] = useState(false);
    const [isAlterarItemOpen, setIsAlterarItemOpen] = useState(false);
    const [isCancelarItemOpen, setIsCancelarItemOpen] = useState(false);
    const [isFinalizacaoOpen, setIsFinalizacaoOpen] = useState(false);
    const [isF10ConfirmOpen, setIsF10ConfirmOpen] = useState(false);
    const [alterarItemInitial, setAlterarItemInitial] = useState<FrenteCaixaAlterarItem | null>(null);
    const [vendedorNome, setVendedorNome] = useState('Funcionario MASTER');

    const isAnyModalOpen = isLocalizarPedidoOpen
        || isDescontoOpen
        || isSearchClienteOpen
        || isSearchProdutoOpen
        || isAddClienteOpen
        || isAddProdutoOpen
        || isSelectVendedorOpen
        || isAlterarItemOpen
        || isCancelarItemOpen
        || isFinalizacaoOpen
        || isF10ConfirmOpen;

    const openLocalizarPedido = () => setIsLocalizarPedidoOpen(true);
    const openDesconto = () => setIsDescontoOpen(true);
    const openSearchCliente = () => setIsSearchClienteOpen(true);
    const openSearchProduto = () => setIsSearchProdutoOpen(true);
    const openSelectVendedor = () => setIsSelectVendedorOpen(true);
    const openCancelarItem = () => setIsCancelarItemOpen(true);
    const openAlterarItem = (item?: FrenteCaixaAlterarItem | null) => {
        setAlterarItemInitial(item ?? null);
        setIsAlterarItemOpen(true);
    };

    const handleFinalizar = useCallback(() => {
        if (config.f10.type === 'navigate') {
            navigate(config.f10.path);
            return;
        }

        if (config.f10.type === 'modal') {
            if (renderFinalizacao) {
                setIsFinalizacaoOpen(true);
            }
            return;
        }

        setIsF10ConfirmOpen(true);
    }, [config.f10, navigate, renderFinalizacao]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isAnyModalOpen) {
                if (['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F10'].includes(event.key)) {
                    event.preventDefault();
                }

                return;
            }

            if (event.key === 'F1') {
                event.preventDefault();
                openSelectVendedor();
                return;
            }

            if (event.key === 'F2') {
                event.preventDefault();
                openSearchCliente();
                return;
            }

            if (event.key === 'F5') {
                event.preventDefault();
                openLocalizarPedido();
                return;
            }

            if (event.key === 'F6') {
                event.preventDefault();
                openDesconto();
                return;
            }

            if (event.key === 'F7') {
                event.preventDefault();
                openAlterarItem();
                return;
            }

            if (event.key === 'F8') {
                event.preventDefault();
                openCancelarItem();
                return;
            }

            if (event.key === 'F10') {
                event.preventDefault();
                handleFinalizar();
                return;
            }

            if (event.key === 'F12') {
                event.preventDefault();
                navigate('/home');
                return;
            }

            if (event.key === 'F3') {
                event.preventDefault();
                searchInputRef.current?.focus();
                return;
            }

            if (event.key === 'F4') {
                event.preventDefault();
                openSearchProduto();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleFinalizar, isAnyModalOpen, navigate]);

    const primaryShortcuts: ItemSelectorShortcut[] = [
        { shortcut: 'F5', label: config.localizarLabel, onClick: openLocalizarPedido },
        { shortcut: 'F6', label: 'Desconto', onClick: openDesconto },
        { shortcut: 'F7', label: 'Alterar Item', onClick: () => openAlterarItem() },
        { shortcut: 'F8', label: 'Cancelar Item', onClick: openCancelarItem },
        { shortcut: 'F9', label: 'Consultar Precos' },
        { shortcut: 'F10', label: config.finalizarLabel, onClick: handleFinalizar },
        { shortcut: 'F11', label: `Cancelar ${config.documentoLabel}` },
        { shortcut: 'F12', label: 'Sair', onClick: () => navigate('/home') },
    ];

    const actionButtons = config.actionButtons?.map((action) => ({
        label: action.label,
        onClick: action.action === 'alterar'
            ? () => openAlterarItem()
            : action.action === 'cancelar'
                ? openCancelarItem
                : action.action === 'cliente'
                    ? openSearchCliente
                    : action.action === 'desconto'
                        ? openDesconto
                        : action.action === 'finalizar'
                            ? handleFinalizar
                            : action.action === 'localizar'
                                ? openLocalizarPedido
                                : action.action === 'produto'
                                    ? openSearchProduto
                                    : action.action === 'vendedor'
                                        ? openSelectVendedor
                                        : undefined,
    }));

    return (
        <Container>
            <OperacaoContainer>
                <ItemSelector
                    imageSrc={config.imageSrc}
                    product={config.product}
                    searchInputRef={searchInputRef}
                    searchPlaceholder={config.searchPlaceholder}
                    searchShortcutLabel={config.searchShortcutLabel}
                    primaryShortcuts={primaryShortcuts}
                    onSearchProduto={onSearchProduto}
                    onOpenSearchProduto={openSearchProduto}
                    onOpenAlterarItem={() => openAlterarItem()}
                    onOpenCancelarItem={openCancelarItem}
                    onExit={() => navigate('/home')}
                />
                <CouponTable
                    actionButtons={actionButtons}
                    clienteNome={config.clienteNome}
                    documentoData={config.documentoData}
                    documentoLabel={config.documentoLabel}
                    documentoNumero={config.documentoNumero}
                    finalizarLabel={config.finalizarLabel}
                    items={config.items}
                    localizarLabel={config.localizarLabel}
                    onOpenVendedor={openSelectVendedor}
                    onOpenCliente={openSearchCliente}
                    onOpenLocalizarPedido={openLocalizarPedido}
                    onOpenDesconto={openDesconto}
                    onOpenAlterarItem={(item) => openAlterarItem({
                        item: item.item,
                        codigo: item.codigo,
                        descricao: item.descricao,
                        quantidade: item.quantidade,
                        valorUnitario: item.valorUnitario,
                    })}
                    vendedorNome={vendedorNome}
                    onFinalizar={handleFinalizar}
                    totalCompra={config.totalCompra}
                    totalLabel={config.totalLabel}
                />
            </OperacaoContainer>

            {isLocalizarPedidoOpen && <Suspense fallback={null}><LocalizarPedidoModal
                open={isLocalizarPedidoOpen}
                onClose={() => setIsLocalizarPedidoOpen(false)}
            /></Suspense>}

            {isDescontoOpen && <Suspense fallback={null}><DescontoModal
                open={isDescontoOpen}
                onClose={() => setIsDescontoOpen(false)}
            /></Suspense>}

            {isSearchClienteOpen && <Suspense fallback={null}><SearchCliente
                open={isSearchClienteOpen}
                onClose={() => setIsSearchClienteOpen(false)}
                onOpenCreateCliente={() => setIsAddClienteOpen(true)}
            /></Suspense>}

            {isSearchProdutoOpen && <Suspense fallback={null}><SearchProduto
                open={isSearchProdutoOpen}
                onClose={() => setIsSearchProdutoOpen(false)}
                onOpenCreateProduto={() => setIsAddProdutoOpen(true)}
                onSelectProduto={onSelectProduto}
            /></Suspense>}

            {isAddClienteOpen && <Suspense fallback={null}><ModalAddClientes
                show={isAddClienteOpen}
                onClose={() => setIsAddClienteOpen(false)}
                onSubmit={() => setIsAddClienteOpen(false)}
            /></Suspense>}

            {isAddProdutoOpen && <Suspense fallback={null}><ModalAddProdutos
                show={isAddProdutoOpen}
                onClose={() => setIsAddProdutoOpen(false)}
                onSubmit={() => setIsAddProdutoOpen(false)}
            /></Suspense>}

            {isSelectVendedorOpen && <Suspense fallback={null}><SelectVendedor
                open={isSelectVendedorOpen}
                onClose={() => setIsSelectVendedorOpen(false)}
                onSelect={(vendedor) => {
                    setVendedorNome(vendedor.nome);
                    setIsSelectVendedorOpen(false);
                }}
            /></Suspense>}

            {isAlterarItemOpen && <Suspense fallback={null}><AlterarItemModal
                open={isAlterarItemOpen}
                initialItem={alterarItemInitial}
                onClose={() => {
                    setIsAlterarItemOpen(false);
                }}
                onSave={(item: AlterarItemFormValues) => {
                    setAlterarItemInitial({
                        item: item.item,
                        codigo: item.codigo,
                        descricao: item.descricao,
                        quantidade: item.quantidade,
                        valorUnitario: item.valorUnitario,
                    });
                }}
            /></Suspense>}

            {isCancelarItemOpen && <Suspense fallback={null}><CancelarItemModal
                open={isCancelarItemOpen}
                onClose={() => setIsCancelarItemOpen(false)}
                onCancelItem={(values: CancelarItemFormValues) => {
                    void values;
                }}
            /></Suspense>}

            {isFinalizacaoOpen && renderFinalizacao?.({
                clienteNome: config.clienteNome,
                documentoData: config.documentoData,
                documentoLabel: config.documentoLabel,
                documentoNumero: config.documentoNumero,
                totalCompra: config.totalCompra,
                totalLabel: config.totalLabel,
                vendedorNome,
                onClose: () => setIsFinalizacaoOpen(false),
                onFinalize: () => navigate('/frente-caixa/finalizadaFrenteCaixa'),
            })}

            {config.f10.type === 'confirm' && isF10ConfirmOpen ? (
                <ModalSimple
                    title={config.f10.title}
                    subtitle="Acao do atalho F10"
                    onClose={() => setIsF10ConfirmOpen(false)}
                    footer={(
                        <>
                            <ModalSimpleActionButton $variant="secondary" type="button" onClick={() => setIsF10ConfirmOpen(false)}>
                                Voltar
                            </ModalSimpleActionButton>
                            <ModalSimpleActionButton type="button" onClick={() => setIsF10ConfirmOpen(false)}>
                                {config.f10.confirmLabel}
                            </ModalSimpleActionButton>
                        </>
                    )}
                >
                    <ConfirmationText>
                        <span>{config.f10.message}</span>
                        <span>Este ponto fica pronto para conectar a regra especifica da tela.</span>
                    </ConfirmationText>
                </ModalSimple>
            ) : null}
        </Container>
    );
};
