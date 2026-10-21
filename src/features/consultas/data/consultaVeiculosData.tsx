import { FaCar } from 'react-icons/fa';
import type { ConsultationPageConfig, ConsultationService } from '../pages/shared/types';

export const veiculoServices: ConsultationService[] = [
    {
        id: 'consulta-veiculos',
        name: 'Veículos',
        subtitle: 'Consulta por CRLV, chassi, motor, Renavam ou placa',
        price: '',
        badge: 'Veículos',
        description: 'Selecione as opções necessárias para montar a consulta veicular antes do envio.',
        formKind: 'vehicle',
        documentLabel: 'Placa',
        noticeTitle: 'Gravames',
        noticeItems: ['Registre aqui o Gravame da sua Revendedora'],
        additionalOptions: [
            { label: 'Busca de Veículos + Status Roubo/Furto', price: 'R$ 15,30' },
            { label: 'Busca de Débitos de Veículos (DPVAT)', price: 'R$ 7,02' },
            { label: 'Registro de Roubo / Furto - Detalhado', price: 'R$ 15,50' },
            { label: 'Gravames + BIN', price: 'R$ 21,96' },
            { label: 'Só Gravames', price: 'R$ 11,64' },
            { label: 'Leilão / Sinistro', price: 'R$ 27,90' },
            { label: 'Decodificador de Chassi', price: 'R$ 11,04' },
            { label: 'Bloqueios de CRV / CRLV', price: 'R$ 5,82' },
            { label: 'Precificador de Veículos', price: 'R$ 6,96' },
            { label: 'Localizador de Motor', price: 'R$ 12,68' },
        ],
        infoItems: ['Selecione ao menos uma opção.'],
        showInfoFootnote: false,
        featured: true,
    },
];

export const consultaVeiculosConfig: ConsultationPageConfig = {
    title: 'Consulta Veículos',
    heading: 'Consulta Veículos',
    description: 'Informe os dados disponíveis do veículo, selecione uma ou mais opções desejadas e revise os custos antes de realizar a consulta.',
    services: veiculoServices,
    icon: <FaCar />,
    defaultServiceId: 'consulta-veiculos',
    hideServiceSelector: true,
};
