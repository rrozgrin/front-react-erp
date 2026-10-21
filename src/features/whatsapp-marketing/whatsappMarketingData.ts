export type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'error';

export interface ContactList {
    id: number;
    name: string;
    description: string;
    contacts: number;
    createdAt: string;
    status: 'active' | 'processing';
}

export interface Campaign {
    id: number;
    name: string;
    messageTitle: string;
    listName: string;
    sentAt: string;
    sentHour: string;
    status: CampaignStatus;
    messages: number;
    delivered: number;
    read: number;
    replies: number;
    cost: string;
}

export const contactLists: ContactList[] = [
    {
        id: 1,
        name: 'Lista dos Meus Clientes',
        description: 'Clientes ativos com consentimento para campanhas',
        contacts: 4250,
        createdAt: '27/05/2026 10:45',
        status: 'active',
    },
    {
        id: 2,
        name: 'Leads Qualificados',
        description: 'Leads captados no site e em formulários',
        contacts: 2531,
        createdAt: '26/05/2026 16:20',
        status: 'active',
    },
    {
        id: 3,
        name: 'Clientes Inativos',
        description: 'Clientes sem compra nos últimos 90 dias',
        contacts: 1842,
        createdAt: '25/05/2026 14:15',
        status: 'processing',
    },
    {
        id: 4,
        name: 'Aniversariantes do Dia',
        description: 'Lista automática para felicitações',
        contacts: 128,
        createdAt: '27/05/2026 08:30',
        status: 'active',
    },
    {
        id: 5,
        name: 'Promoção Anterior',
        description: 'Contatos que interagiram com a última campanha',
        contacts: 1126,
        createdAt: '22/05/2026 11:05',
        status: 'active',
    },
];

export const campaigns: Campaign[] = [
    {
        id: 1,
        name: 'Promoção de Inverno 2026',
        messageTitle: 'Promoção especial de inverno',
        listName: 'Lista dos Meus Clientes',
        sentAt: '27/05/2026',
        sentHour: '11:56',
        status: 'sending',
        messages: 4250,
        delivered: 3870,
        read: 2490,
        replies: 432,
        cost: 'R$ 42,50',
    },
    {
        id: 2,
        name: 'Oferta Relâmpago',
        messageTitle: 'Oferta por tempo limitado',
        listName: 'Leads Qualificados',
        sentAt: '27/05/2026',
        sentHour: '11:54',
        status: 'sending',
        messages: 2531,
        delivered: 2260,
        read: 1390,
        replies: 211,
        cost: 'R$ 25,31',
    },
    {
        id: 3,
        name: 'Novidades da Loja',
        messageTitle: 'Chegaram novidades!',
        listName: 'Clientes Inativos',
        sentAt: '27/05/2026',
        sentHour: '09:15',
        status: 'sent',
        messages: 1842,
        delivered: 1760,
        read: 1118,
        replies: 164,
        cost: 'R$ 18,42',
    },
    {
        id: 4,
        name: 'Campanha de Reativação',
        messageTitle: 'Sentimos sua falta!',
        listName: 'Promoção Anterior',
        sentAt: '26/05/2026',
        sentHour: '16:20',
        status: 'sent',
        messages: 1126,
        delivered: 1085,
        read: 692,
        replies: 75,
        cost: 'R$ 11,26',
    },
    {
        id: 5,
        name: 'Pesquisa de Satisfação',
        messageTitle: 'Sua opinião é importante',
        listName: 'Lista dos Meus Clientes',
        sentAt: '24/05/2026',
        sentHour: '10:30',
        status: 'error',
        messages: 980,
        delivered: 814,
        read: 520,
        replies: 0,
        cost: 'R$ 9,80',
    },
];

export const messageTemplates = [
    {
        id: 'winter',
        label: 'Modelo 1',
        text: '*ATENÇÃO!*\n\nChegou a Promoção de Inverno 2026 com descontos imperdíveis.\n\nAproveite nossas ofertas especiais por tempo limitado.\n\nVisite nossa loja ou compre pelo WhatsApp!',
    },
    {
        id: 'flash',
        label: 'Modelo 2',
        text: 'Oferta relâmpago para você!\n\nSeparei uma condição especial válida somente hoje. Posso te mandar os detalhes?',
    },
    {
        id: 'reactivation',
        label: 'Modelo 3',
        text: 'Sentimos sua falta por aqui.\n\nTem novidade esperando por você e uma oferta especial para voltar a comprar com a gente.',
    },
    {
        id: 'birthday',
        label: 'Modelo 4',
        text: 'Feliz aniversário!\n\nPreparamos um presente especial para você comemorar essa data com a gente.',
    },
];

export const campaignStatusLabels: Record<CampaignStatus, string> = {
    draft: 'Rascunho',
    scheduled: 'Agendada',
    sending: 'Enviando',
    sent: 'Enviada',
    error: 'Erro',
};

export const formatNumber = (value: number) => value.toLocaleString('pt-BR');
