export type CupomStatus = 'active' | 'paused' | 'expired';

export interface CouponReport {
    id: number;
    code: string;
    validUntil: string;
    ownCustomersPercent: string;
    otherCompaniesPercent: string;
    saleValue: string;
    generatedAt: string;
    status: CupomStatus;
}

export const couponReports: CouponReport[] = [
    {
        id: 1,
        code: '98454733',
        validUntil: '14/08/2025',
        ownCustomersPercent: '10,00%',
        otherCompaniesPercent: '5,00%',
        saleValue: 'R$ 2.510,40',
        generatedAt: '16/05/2026',
        status: 'active',
    },
    {
        id: 2,
        code: '92744773',
        validUntil: '14/07/2025',
        ownCustomersPercent: '10,00%',
        otherCompaniesPercent: '5,00%',
        saleValue: 'R$ 25.884,28',
        generatedAt: '16/05/2026',
        status: 'active',
    },
    {
        id: 3,
        code: '92744443',
        validUntil: '13/07/2025',
        ownCustomersPercent: '10,00%',
        otherCompaniesPercent: '5,00%',
        saleValue: 'R$ 25.845,13',
        generatedAt: '15/05/2026',
        status: 'active',
    },
    {
        id: 4,
        code: '47698793',
        validUntil: '13/08/2025',
        ownCustomersPercent: '10,00%',
        otherCompaniesPercent: '5,00%',
        saleValue: 'R$ 25.792,31',
        generatedAt: '15/05/2026',
        status: 'active',
    },
    {
        id: 5,
        code: '53676873',
        validUntil: '13/08/2025',
        ownCustomersPercent: '10,00%',
        otherCompaniesPercent: '5,00%',
        saleValue: 'R$ 25.793,03',
        generatedAt: '15/05/2026',
        status: 'active',
    },
];

export const couponStatusLabels: Record<CupomStatus, string> = {
    active: 'Ativo',
    paused: 'Pausado',
    expired: 'Expirado',
};
