import type { OperacaoComercialConfig } from './pages/OperacaoComercialPage';

const defaultImage = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=420&q=80';

export const frenteCaixaConfig: OperacaoComercialConfig = {
    documentoLabel: 'VENDA',
    documentoNumero: '3',
    documentoData: '08/05/2026 12:48',
    localizarLabel: 'Localizar Pedido',
    finalizarLabel: 'Finalizar Venda',
    totalLabel: 'TOTAL DA COMPRA',
    totalCompra: 'R$ 1.530,29',
    imageSrc: defaultImage,
    f10: {
        type: 'modal',
    },
};

export const pedidoConfig: OperacaoComercialConfig = {
    documentoLabel: 'PEDIDO',
    documentoNumero: '3',
    documentoData: '08/05/2026 12:48',
    localizarLabel: 'Localizar Pedido',
    finalizarLabel: 'Finalizar Pedido',
    totalLabel: 'TOTAL DO PEDIDO',
    totalCompra: 'R$ 30,20',
    imageSrc: defaultImage,
    searchPlaceholder: 'Busque produto para o pedido (F3)...',
    actionButtons: [
        { label: 'Pedidos Realizados' },
        { label: 'Pesquisar Produto', action: 'produto' },
        { label: 'Desconto', action: 'desconto' },
        { label: 'Novo Pedido' },
        { label: 'Localizar Pedido', action: 'localizar' },
        { label: 'Duplicar Pedido' },
        { label: 'Imprimir' },
        { label: 'Finalizar Pedido', action: 'finalizar' },
    ],
    f10: {
        type: 'confirm',
        title: 'Finalizar Pedido',
        message: 'F10 finaliza o pedido sem abrir a tela de pagamento da frente de caixa.',
        confirmLabel: 'Finalizar Pedido',
    },
};

export const orcamentosConfig: OperacaoComercialConfig = {
    documentoLabel: 'ORCAMENTO',
    documentoNumero: '12',
    documentoData: '08/05/2026 12:48',
    localizarLabel: 'Localizar Orcamento',
    finalizarLabel: 'Gerar Orcamento',
    totalLabel: 'TOTAL DO ORCAMENTO',
    totalCompra: 'R$ 30,20',
    imageSrc: defaultImage,
    searchPlaceholder: 'Busque produto para o orcamento (F3)...',
    actionButtons: [
        { label: 'Orcamentos' },
        { label: 'Pesquisar Produto', action: 'produto' },
        { label: 'Desconto', action: 'desconto' },
        { label: 'Novo Orcamento' },
        { label: 'Localizar Orcamento', action: 'localizar' },
        { label: 'Converter Pedido' },
        { label: 'Imprimir' },
        { label: 'Gerar Orcamento', action: 'finalizar' },
    ],
    f10: {
        type: 'confirm',
        title: 'Gerar Orcamento',
        message: 'F10 gera o orcamento e permanece no fluxo comercial, sem ir para o fechamento do caixa.',
        confirmLabel: 'Gerar Orcamento',
    },
};

export const ordemServicoConfig: OperacaoComercialConfig = {
    documentoLabel: 'ORDEM DE SERVICO',
    documentoNumero: 'OS-42',
    documentoData: '08/05/2026 12:48',
    localizarLabel: 'Localizar OS',
    finalizarLabel: 'Salvar OS',
    totalLabel: 'TOTAL DA OS',
    totalCompra: 'R$ 30,20',
    imageSrc: defaultImage,
    searchPlaceholder: 'Busque produto ou servico da OS (F3)...',
    searchShortcutLabel: 'Busca de produtos/servicos',
    actionButtons: [
        { label: 'Ordens' },
        { label: 'Pesquisar Item', action: 'produto' },
        { label: 'Desconto', action: 'desconto' },
        { label: 'Nova OS' },
        { label: 'Localizar OS', action: 'localizar' },
        { label: 'Tecnico' },
        { label: 'Imprimir' },
        { label: 'Salvar OS', action: 'finalizar' },
    ],
    f10: {
        type: 'confirm',
        title: 'Salvar Ordem de Servico',
        message: 'F10 salva a ordem de servico sem seguir para a finalizacao da frente de caixa.',
        confirmLabel: 'Salvar OS',
    },
};

export const vendaConsignadaConfig: OperacaoComercialConfig = {
    documentoLabel: 'VENDA CONSIGNADA',
    documentoNumero: '3',
    documentoData: '08/05/2026 12:48',
    localizarLabel: 'Localizar Pedido',
    finalizarLabel: 'Finalizar Pedido',
    totalLabel: 'TOTAL DO PEDIDO',
    totalCompra: 'R$ 30,20',
    imageSrc: defaultImage,
    searchPlaceholder: 'Busque produto para a venda consignada (F3)...',
    actionButtons: [
        { label: 'Pedidos Realizados' },
        { label: 'Pesquisar Produto', action: 'produto' },
        { label: 'Desconto', action: 'desconto' },
        { label: 'Novo Pedido' },
        { label: 'Localizar Pedido', action: 'localizar' },
        { label: 'Duplicar Pedido' },
        { label: 'Imprimir' },
        { label: 'Finalizar Pedido', action: 'finalizar' },
    ],
    f10: {
        type: 'confirm',
        title: 'Finalizar Pedido',
        message: 'F10 finaliza o pedido sem abrir a tela de pagamento da frente de caixa.',
        confirmLabel: 'Finalizar Pedido',
    },
};
