import React, { useState } from 'react';
import styled from 'styled-components';
import {
    FaPen,
    FaTrash,
    FaUser,
    FaUsers,
} from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { IoIosArrowDown } from "react-icons/io";
import {
    Container,
    TopBar,
    OrderInfo,
    InfoRow,
    TableHeader,
    ScrollArea,
    TableRow,
    ProductName,
    Money,
    Actions,
    BottomBar,
    Buttons,
    Button,
    TotalBox,
    ResponsiveTableWrapper,
    MobileList,
    MobileTableHead,
    MobileRow,
    MobileRowSummary,
    MobileRowCell,
    MobileRowButton,
    MobileExpandButton,
    MobileDetails,
    MobileDetailGrid,
    MobileDetail,
    MobileDetailLabel,
    MobileDetailValue,
    MobileActions,
    MobileActionButton,
    MobileActionsToggle,
    MobileActionsPanel,
    MobileActionsGroup,
    MobileActionsGroupTitle,
    ShortcutButton,
    ShortcutBadge,
} from './styled';

export interface CouponTableItem {
    item: string;
    codigo: string;
    nome: string;
    un: string;
    qtd: string;
    unit: string;
    desc: string;
    acres: string;
    total: string;
}

interface CouponTableProps {
    onOpenVendedor?: () => void;
    onOpenCliente?: () => void;
    onOpenLocalizarPedido?: () => void;
    onOpenDesconto?: () => void;
    onFinalizar?: () => void;
    onOpenAlterarItem?: (item: {
        item: string;
        codigo: string;
        descricao: string;
        quantidade: string;
        valorUnitario: string;
    }) => void;
    actionButtons?: {
        label: string;
        onClick?: () => void;
    }[];
    clienteNome?: string;
    documentoData?: string;
    documentoLabel?: string;
    documentoNumero?: string;
    finalizarLabel?: string;
    finalizarShortcut?: string;
    items?: CouponTableItem[];
    localizarLabel?: string;
    totalCompra?: string;
    totalLabel?: string;
    vendedorNome?: string;
}

const ClientInfoButton = styled.button`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    text-align: left;
`;

export const CouponTable: React.FC<CouponTableProps> = ({
    actionButtons,
    clienteNome = 'CLIENTE BALCAO',
    documentoData = '08/05/2026 12:48',
    documentoLabel = 'PEDIDO',
    documentoNumero = '3',
    finalizarLabel = 'Finalizar Venda',
    finalizarShortcut = 'F10',
    items = [
        {
            item: '1',
            codigo: '8001',
            nome: 'TORTA DE LIMAO - TRADICIONAL CARAMELO QUEIMADO, TAMANHO 55 CM KG',
            un: 'KG',
            qtd: '0.202',
            unit: '50.50',
            desc: '0.00',
            acres: '0.00',
            total: '10.20',
        },
        {
            item: '2',
            codigo: '100',
            nome: 'HAMBURGUER ARTESANAL 01',
            un: 'UN',
            qtd: '1.000',
            unit: '20.00',
            desc: '0.00',
            acres: '0.00',
            total: '20.00',
        },
    ],
    localizarLabel = 'Localizar Pedido',
    onOpenVendedor,
    onOpenCliente,
    onOpenLocalizarPedido,
    onOpenDesconto,
    onFinalizar,
    onOpenAlterarItem,
    totalCompra = 'R$ 30,20',
    totalLabel = 'TOTAL DA COMPRA',
    vendedorNome = 'Funcionario MASTER',
}) => {
    const [openRow, setOpenRow] = useState<string | null>(null);
    const [isActionsOpen, setIsActionsOpen] = useState(false);

    const quickActions = actionButtons ?? [
        { label: 'Vendas Realizadas' },
        { label: 'Pesquisar Produto' },
        { label: 'Desconto', onClick: onOpenDesconto },
        { label: 'Nova Venda' },
        { label: localizarLabel, onClick: onOpenLocalizarPedido },
        { label: 'Sangria' },
        { label: 'Fechar Caixa' },
        { label: finalizarLabel, onClick: onFinalizar },
    ];

    const toggleRow = (itemId: string) => {
        setOpenRow((current) => (current === itemId ? null : itemId));
    };

    return (
        <Container>
            <TopBar>
                <OrderInfo>
                    <div>{documentoLabel} N.: {documentoNumero}</div>
                    <div>{documentoData}</div>
                </OrderInfo>

                <InfoRow>
                    <ClientInfoButton type="button" onClick={onOpenCliente} aria-label="Buscar cliente">
                        <FaUsers />
                        <span>
                            <strong>Cliente (F2):</strong> {clienteNome}
                        </span>
                    </ClientInfoButton>
                    <ClientInfoButton type="button" onClick={onOpenVendedor} aria-label="Selecionar vendedor">
                        <FaUser />
                        <span>
                            <strong>Vendedor (F1):</strong> {vendedorNome}
                        </span>
                    </ClientInfoButton>
                </InfoRow>
            </TopBar>

            <ScrollArea>
                <ResponsiveTableWrapper>
                    <TableHeader>
                        <div>Item</div>
                        <div>Cod.Barra</div>
                        <div>Nome Produto</div>
                        <div>Un.</div>
                        <div>Qtd.</div>
                        <div>Unit.</div>
                        <div>Desc.</div>
                        <div>Acres.</div>
                        <div>Total</div>
                        <div>Acoes</div>
                    </TableHeader>

                    {items.map((item) => (
                        <TableRow key={item.item}>
                            <div>{item.item}</div>
                            <div>{item.codigo}</div>
                            <ProductName>{item.nome}</ProductName>
                            <div>{item.un}</div>
                            <div>{item.qtd}</div>
                            <Money>{item.unit}</Money>
                            <Money $color="#e53935">{item.desc}</Money>
                            <Money $color="#11834a">{item.acres}</Money>
                            <Money>{item.total}</Money>

                            <Actions>
                                <button
                                    type="button"
                                    onClick={() => onOpenAlterarItem?.({
                                        item: item.item,
                                        codigo: item.codigo,
                                        descricao: item.nome,
                                        quantidade: item.qtd,
                                        valorUnitario: item.unit,
                                    })}
                                    aria-label={`Alterar item ${item.item}`}
                                >
                                    <FaPen />
                                </button>
                                <FaTrash color="#e53935" />
                            </Actions>
                        </TableRow>
                    ))}
                </ResponsiveTableWrapper>

                <MobileList>
                    <MobileTableHead>
                        <div>Cod.</div>
                        <div>Produto</div>
                        <div>Qtd.</div>
                        <div>Ação</div>
                    </MobileTableHead>

                    {items.map((item) => (
                        <MobileRow key={item.item}>
                            <MobileRowSummary>
                                <MobileRowCell $muted>{item.codigo}</MobileRowCell>
                                <MobileRowCell>{item.nome}</MobileRowCell>
                                <MobileRowCell>{item.qtd}</MobileRowCell>
                                <MobileRowButton>
                                    <MobileExpandButton
                                        type="button"
                                        $open={openRow === item.item}
                                        onClick={() => toggleRow(item.item)}
                                        aria-expanded={openRow === item.item}
                                        aria-label={`Expandir item ${item.item}`}
                                    >
                                        {openRow === item.item ? <FiX size={16} /> : <IoIosArrowDown size={16} />}
                                    </MobileExpandButton>
                                </MobileRowButton>
                            </MobileRowSummary>

                            {openRow === item.item ? (
                                <MobileDetails>
                                    <MobileDetailGrid>
                                        <MobileDetail>
                                            <MobileDetailLabel>Item</MobileDetailLabel>
                                            <MobileDetailValue>{item.item}</MobileDetailValue>
                                        </MobileDetail>
                                        <MobileDetail>
                                            <MobileDetailLabel>Cod. Barra</MobileDetailLabel>
                                            <MobileDetailValue>{item.codigo}</MobileDetailValue>
                                        </MobileDetail>
                                        <MobileDetail>
                                            <MobileDetailLabel>Un.</MobileDetailLabel>
                                            <MobileDetailValue>{item.un}</MobileDetailValue>
                                        </MobileDetail>
                                        <MobileDetail>
                                            <MobileDetailLabel>Qtd.</MobileDetailLabel>
                                            <MobileDetailValue>{item.qtd}</MobileDetailValue>
                                        </MobileDetail>
                                        <MobileDetail>
                                            <MobileDetailLabel>Unit.</MobileDetailLabel>
                                            <MobileDetailValue>R$ {item.unit}</MobileDetailValue>
                                        </MobileDetail>
                                        <MobileDetail>
                                            <MobileDetailLabel>Total</MobileDetailLabel>
                                            <MobileDetailValue>R$ {item.total}</MobileDetailValue>
                                        </MobileDetail>
                                    </MobileDetailGrid>

                                    <MobileActions>
                                        <MobileActionButton
                                            type="button"
                                            aria-label={`Editar item ${item.item}`}
                                            onClick={() => onOpenAlterarItem?.({
                                                item: item.item,
                                                codigo: item.codigo,
                                                descricao: item.nome,
                                                quantidade: item.qtd,
                                                valorUnitario: item.unit,
                                            })}
                                        >
                                            <FaPen />
                                        </MobileActionButton>
                                        <MobileActionButton type="button" $danger aria-label={`Excluir item ${item.item}`}>
                                            <FaTrash />
                                        </MobileActionButton>
                                    </MobileActions>
                                </MobileDetails>
                            ) : null}
                        </MobileRow>
                    ))}
                </MobileList>
            </ScrollArea>

            <BottomBar>
                <MobileActionsToggle
                    type="button"
                    onClick={() => setIsActionsOpen((current) => !current)}
                    aria-expanded={isActionsOpen}
                    aria-label="Abrir ações rápidas"
                >
                    Ações rápidas
                    <IoIosArrowDown />
                </MobileActionsToggle>

                <MobileActionsPanel $open={isActionsOpen}>
                    <MobileActionsGroup>
                        <MobileActionsGroupTitle>Ações rápidas</MobileActionsGroupTitle>
                        <Buttons>
                            {quickActions.map((action) => (
                                <Button key={action.label} type="button" onClick={action.onClick}>
                                    {action.label}
                                </Button>
                            ))}
                        </Buttons>
                    </MobileActionsGroup>

                    <MobileActionsGroup data-app-font-exception="frente-caixa-shortcuts">
                        <MobileActionsGroupTitle>Atalhos</MobileActionsGroupTitle>
                        <Buttons>
                            <ShortcutButton type="button" onClick={onOpenVendedor} aria-label="Abrir vendedor">
                                <span>Vendedor</span>
                                <ShortcutBadge>F1</ShortcutBadge>
                            </ShortcutButton>
                            <ShortcutButton type="button" onClick={onOpenCliente} aria-label="Abrir cliente">
                                <span>Cliente</span>
                                <ShortcutBadge>F2</ShortcutBadge>
                            </ShortcutButton>
                            <ShortcutButton type="button" onClick={onOpenLocalizarPedido} aria-label={`Abrir ${localizarLabel.toLowerCase()}`}>
                                <span>{localizarLabel}</span>
                                <ShortcutBadge>F5</ShortcutBadge>
                            </ShortcutButton>
                            <ShortcutButton type="button" onClick={onOpenDesconto} aria-label="Abrir desconto">
                                <span>Desconto</span>
                                <ShortcutBadge>F6</ShortcutBadge>
                            </ShortcutButton>
                            <ShortcutButton type="button" onClick={onFinalizar} aria-label={finalizarLabel}>
                                <span>{finalizarLabel}</span>
                                <ShortcutBadge>{finalizarShortcut}</ShortcutBadge>
                            </ShortcutButton>
                        </Buttons>
                    </MobileActionsGroup>
                </MobileActionsPanel>

                <Buttons>
                    {quickActions.map((action) => (
                        <Button key={action.label} type="button" onClick={action.onClick}>
                            {action.label}
                        </Button>
                    ))}
                </Buttons>

                <TotalBox>
                    <h3>{totalLabel}</h3>
                    <span>{totalCompra}</span>
                </TotalBox>
            </BottomBar>
        </Container>
    );
};
