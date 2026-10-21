import { FaMoneyCheckAlt } from 'react-icons/fa';
import type { ConsultationPageConfig, ConsultationService } from '../pages/shared/types';

const extraMasterInfo = [
    'Base de Dados Banco Central CCF (Cadastro de Cheques sem Fundos).',
    'Cheques contra ordenados, sustados e cancelados a nível nacional',
    'Registro de Devedores fornecido por todos os segmentos empresariais associados.',
    'Registro de Devedores fornecido por outros convênios.',
    'Passagens comerciais em nível nacional',
    'Localização de telefone fixo e celular pós, e seu endereço pelo CPF/CNPJ (*)',
    'Confirmação de titular e endereço de telefone fixo e celular pós (*)',
    'Confirmação do Nome ou Razão Social do CPF ou CNPJ.',
    'Data de nascimento ou data de fundação, quando disponível.',
    'Contumácia: hábitos de sustar cheques no período dos últimos 6 meses solicitados pelo correntista.',
    'Últimos 5 telefones fornecidos pelo consumidor em outros estabelecimentos.',
    'Endereços vinculados ao CPF/CNPJ (*)',
    'Localização dos 6 vizinhos mais próximos (*)',
    'Telefones e endereços de parentes próximos (*)',
    'Telefones e endereços de pessoas de contato (*)',
    'Telefone e endereço comercial. (*)',
];

export const chequeServices: ConsultationService[] = [
    {
        id: 'extra-master',
        name: 'Extra Master',
        subtitle: 'Recomendado para análise de cheques',
        price: 'R$ 4,20',
        badge: 'Recomendado',
        description: 'Consulta completa para validar cheque, CMC7, dados do titular e histórico relacionado ao documento informado.',
        formKind: 'check',
        documentLabel: 'CPF/CNPJ',
        additionalOptions: [
            { label: 'Pesquisa Restritiva Pessoal (Somente CPF)', price: 'R$ 15,48' },
            { label: 'Quadro de Sócios e Administradores (Somente CNPJ)', price: 'R$ 9,30' },
            { label: 'Participações em Outras Empresas', price: 'R$ 9,30' },
        ],
        infoItems: extraMasterInfo,
        featured: true,
    },
];

export const consultaChequesConfig: ConsultationPageConfig = {
    title: 'Consulta Cheque',
    heading: 'Consulta para Cheques',
    description: 'Preencha os dados do cheque e acompanhe a prévia em tempo real antes de realizar a consulta Extra Master.',
    services: chequeServices,
    icon: <FaMoneyCheckAlt />,
};
