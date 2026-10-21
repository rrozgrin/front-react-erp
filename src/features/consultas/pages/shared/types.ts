import type { ReactNode } from 'react';

export type ConsultationFormKind = 'localiza' | 'credit' | 'check' | 'vehicle';

export interface ConsultationAdditionalOption {
    label: string;
    price: string;
}

export interface ConsultationService {
    id: string;
    name: string;
    subtitle: string;
    price: string;
    badge: string;
    description: string;
    formKind: ConsultationFormKind;
    documentLabel: string;
    showRg?: boolean;
    showConfirmationTitle?: boolean;
    phoneFields?: string[];
    allowsCmc7?: boolean;
    showNeighborSearch?: boolean;
    additionalOptions?: ConsultationAdditionalOption[];
    noticeTitle?: string;
    noticeItems?: string[];
    infoItems: string[];
    showInfoFootnote?: boolean;
    featured?: boolean;
}

export interface ConsultationPageConfig {
    title: string;
    heading: string;
    description: string;
    services: ConsultationService[];
    icon: ReactNode;
    defaultServiceId?: string;
    hideServiceSelector?: boolean;
}
