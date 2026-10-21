export type AssistenciaStatus =
    | 'aberta'
    | 'em_andamento'
    | 'aguardando_peca'
    | 'concluida'
    | 'cancelada'
    | 'desativada'
    | 'excluida';

export interface AssistenciaTecnica {
    id: number;
    numero: string;
    data: string;
    cliente: string;
    equipamentoServico: string;
    tecnico: string;
    entrada: string;
    status: AssistenciaStatus;
    prazoEntrega: string;
    serie: string;
    aparelho: string;
    marca: string;
    modelo: string;
    voltagem: string;
    tipoServico: string;
    acessorios: string;
    defeitosRelatados: string;
    nomeTecnico: string;
    entradaOs: string;
    dataEntrada: string;
    previsaoConclusao: string;
    garantia: string;
}

export const assistenciasMockData: AssistenciaTecnica[] = [
    {
        id: 1,
        numero: 'AT-2024-0152',
        data: '22/05/2024 14:30',
        cliente: 'Carlos Alberto Silva',
        equipamentoServico: 'TV Samsung 55" QLED - Sem imagem',
        tecnico: 'João da Silva MASTER',
        entrada: '22/05/2024 14:30',
        status: 'aberta',
        prazoEntrega: '27/05/2024 18:00',
        serie: 'QN55Q80TAGXZD-9921',
        aparelho: 'Televisor',
        marca: 'Samsung',
        modelo: '55" QLED',
        voltagem: '110 V',
        tipoServico: 'Diagnóstico técnico',
        acessorios: 'Controle remoto e cabo de energia',
        defeitosRelatados: 'Cliente informa que a TV liga, mas não exibe imagem.',
        nomeTecnico: 'João da Silva',
        entradaOs: 'OS-2024-2198',
        dataEntrada: '2024-05-22',
        previsaoConclusao: '2024-05-27',
        garantia: 'Sem Garantia',
    },
    {
        id: 2,
        numero: 'AT-2024-0151',
        data: '21/05/2024 10:15',
        cliente: 'Mariana Costa',
        equipamentoServico: 'Microondas Electrolux ME41 - Aquecendo pouco',
        tecnico: 'Lucas Pereira MASTER',
        entrada: '21/05/2024 10:15',
        status: 'em_andamento',
        prazoEntrega: '28/05/2024 18:00',
        serie: 'ME41X-8742',
        aparelho: 'Microondas',
        marca: 'Electrolux',
        modelo: 'ME41X',
        voltagem: '220 V',
        tipoServico: 'Manutenção corretiva',
        acessorios: 'Prato giratório',
        defeitosRelatados: 'Aparelho aquece abaixo do normal e apresenta ruído.',
        nomeTecnico: 'Lucas Pereira',
        entradaOs: 'OS-2024-2191',
        dataEntrada: '2024-05-21',
        previsaoConclusao: '2024-05-28',
        garantia: 'Garantia de 90 dias',
    },
    {
        id: 3,
        numero: 'AT-2024-0150',
        data: '20/05/2024 16:45',
        cliente: 'Roberto Lima',
        equipamentoServico: 'Geladeira Brastemp BRM56 - Vazamento de água',
        tecnico: 'João da Silva MASTER',
        entrada: '20/05/2024 16:45',
        status: 'aguardando_peca',
        prazoEntrega: '30/05/2024 18:00',
        serie: 'BRM56AB-4420',
        aparelho: 'Geladeira',
        marca: 'Brastemp',
        modelo: 'BRM56',
        voltagem: '110 V',
        tipoServico: 'Troca de componente',
        acessorios: 'Sem acessórios',
        defeitosRelatados: 'Vazamento próximo ao reservatório interno.',
        nomeTecnico: 'João da Silva',
        entradaOs: 'OS-2024-2184',
        dataEntrada: '2024-05-20',
        previsaoConclusao: '2024-05-30',
        garantia: 'Sem Garantia',
    },
    {
        id: 4,
        numero: 'AT-2024-0149',
        data: '19/05/2024 09:20',
        cliente: 'Fernanda Souza',
        equipamentoServico: 'Ar Condicionado LG Dual Inverter - Não gelando',
        tecnico: 'Lucas Pereira MASTER',
        entrada: '19/05/2024 09:20',
        status: 'concluida',
        prazoEntrega: '22/05/2024 18:00',
        serie: 'LGDI12000-1108',
        aparelho: 'Ar Condicionado',
        marca: 'LG',
        modelo: 'Dual Inverter',
        voltagem: '220 V',
        tipoServico: 'Limpeza e carga de gás',
        acessorios: 'Controle remoto',
        defeitosRelatados: 'Equipamento liga normalmente, mas não refrigera.',
        nomeTecnico: 'Lucas Pereira',
        entradaOs: 'OS-2024-2173',
        dataEntrada: '2024-05-19',
        previsaoConclusao: '2024-05-22',
        garantia: 'Garantia de 90 dias',
    },
    {
        id: 5,
        numero: 'AT-2024-0148',
        data: '18/05/2024 11:05',
        cliente: 'José Oliveira',
        equipamentoServico: 'Lavadora Samsung WW11J - Não centrifuga',
        tecnico: 'Ana Paula MASTER',
        entrada: '18/05/2024 11:05',
        status: 'cancelada',
        prazoEntrega: '--',
        serie: 'WW11J4473PX-3049',
        aparelho: 'Lavadora',
        marca: 'Samsung',
        modelo: 'WW11J',
        voltagem: '110 V',
        tipoServico: 'Diagnóstico técnico',
        acessorios: 'Mangueira de entrada',
        defeitosRelatados: 'Cliente cancelou o reparo após orçamento.',
        nomeTecnico: 'Ana Paula',
        entradaOs: 'OS-2024-2166',
        dataEntrada: '2024-05-18',
        previsaoConclusao: '',
        garantia: 'Sem Garantia',
    },
    {
        id: 6,
        numero: 'AT-2024-0147',
        data: '17/05/2024 08:40',
        cliente: 'Paulo Mendes',
        equipamentoServico: 'Notebook Dell Inspiron - Tela piscando',
        tecnico: 'Ana Paula MASTER',
        entrada: '17/05/2024 08:40',
        status: 'desativada',
        prazoEntrega: '--',
        serie: 'DLINSP15-7755',
        aparelho: 'Notebook',
        marca: 'Dell',
        modelo: 'Inspiron 15',
        voltagem: 'Bivolt',
        tipoServico: 'Análise de hardware',
        acessorios: 'Fonte original',
        defeitosRelatados: 'Registro desativado para conferência cadastral.',
        nomeTecnico: 'Ana Paula',
        entradaOs: 'OS-2024-2158',
        dataEntrada: '2024-05-17',
        previsaoConclusao: '',
        garantia: 'Sem Garantia',
    },
    {
        id: 7,
        numero: 'AT-2024-0146',
        data: '16/05/2024 13:25',
        cliente: 'Beatriz Rocha',
        equipamentoServico: 'Soundbar JBL 2.1 - Sem som',
        tecnico: 'João da Silva MASTER',
        entrada: '16/05/2024 13:25',
        status: 'excluida',
        prazoEntrega: '--',
        serie: 'JBL21SB-6510',
        aparelho: 'Soundbar',
        marca: 'JBL',
        modelo: 'Bar 2.1',
        voltagem: 'Bivolt',
        tipoServico: 'Diagnóstico técnico',
        acessorios: 'Controle remoto',
        defeitosRelatados: 'Cadastro duplicado removido da listagem principal.',
        nomeTecnico: 'João da Silva',
        entradaOs: 'OS-2024-2150',
        dataEntrada: '2024-05-16',
        previsaoConclusao: '',
        garantia: 'Sem Garantia',
    },
];

export const statusLabels: Record<AssistenciaStatus, string> = {
    aberta: 'Aberta',
    em_andamento: 'Em andamento',
    aguardando_peca: 'Aguardando peça',
    concluida: 'Concluída',
    cancelada: 'Cancelada',
    desativada: 'Desativada',
    excluida: 'Excluída',
};

export const normalizeAssistenciaText = (value: unknown) =>
    String(value ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

export const formatDateToDisplay = (value: string) => {
    if (!value) {
        return '--';
    }

    const [year, month, day] = value.split('-');

    if (!year || !month || !day) {
        return value;
    }

    return `${day}/${month}/${year}`;
};
