import { ReactNode } from 'react';
import {
    SummaryCard,
    SummaryGrid,
    SummaryIconWrap,
    SummaryInfo,
} from './styled';

export type FinanceiroSummaryCardItem = {
    label: string;
    value: string;
    icon: ReactNode;
};

type Props = {
    items: FinanceiroSummaryCardItem[];
};

export const FinanceiroSummaryCards = ({ items }: Props) => {
    return (
        <SummaryGrid>
            {items.map((item) => (
                <SummaryCard key={item.label}>
                    <SummaryIconWrap>{item.icon}</SummaryIconWrap>
                    <SummaryInfo>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                    </SummaryInfo>
                </SummaryCard>
            ))}
        </SummaryGrid>
    );
};
