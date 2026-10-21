import type { ReactNode } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { PageLayout } from '../../common/components/PageLayout';
import { campaignStatusLabels, type CampaignStatus } from './whatsappMarketingData';
import { whatsappMarketingMenuSections } from './whatsappMarketingMenuSections';
import {
    BubbleTime,
    IconBubble,
    MessageBubble,
    MetricCard,
    MetricInfo,
    ModuleTheme,
    PhoneAvatar,
    PhoneBody,
    PhoneComposer,
    PhoneFrame,
    PhoneTopBar,
    PreviewAside,
    StatusPill,
} from './styled';

interface WhatsappMarketingPageProps {
    title: string;
    toolbar?: ReactNode;
    children: ReactNode;
}

export const WhatsappMarketingPage = ({ title, toolbar, children }: WhatsappMarketingPageProps) => (
    <ModuleTheme>
        <PageLayout title={title} sections={whatsappMarketingMenuSections} toolbar={toolbar}>
            {children}
        </PageLayout>
    </ModuleTheme>
);

interface SummaryCardProps {
    label: string;
    value: string;
    helper: string;
    tone?: 'green' | 'blue' | 'orange' | 'red' | 'purple';
    icon: ReactNode;
}

export const SummaryCard = ({ label, value, helper, tone = 'green', icon }: SummaryCardProps) => (
    <MetricCard>
        <MetricInfo>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{helper}</small>
        </MetricInfo>
        <IconBubble $tone={tone}>{icon}</IconBubble>
    </MetricCard>
);

export const CampaignStatusBadge = ({ status }: { status: CampaignStatus }) => (
    <StatusPill $status={status}>{campaignStatusLabels[status]}</StatusPill>
);

export const ListStatusBadge = ({ status }: { status: 'active' | 'processing' }) => (
    <StatusPill $status={status}>{status === 'active' ? 'Ativa' : 'Processando'}</StatusPill>
);

export const WhatsappPreview = ({
    message,
    campaignName,
}: {
    message: string;
    campaignName: string;
}) => (
    <PreviewAside>
        <PhoneFrame aria-label="Preview de WhatsApp">
            <PhoneTopBar>
                <PhoneAvatar>
                    <FaWhatsapp size={20} />
                </PhoneAvatar>
                <div>
                    <strong>{campaignName || 'Sua campanha'}</strong>
                    <span>online</span>
                </div>
            </PhoneTopBar>
            <PhoneBody>
                <MessageBubble>
                    {message.trim() || 'Digite sua mensagem para visualizar o preview aqui.'}
                    <BubbleTime>11:30 ✓✓</BubbleTime>
                </MessageBubble>
            </PhoneBody>
            <PhoneComposer>
                <span>Mensagem</span>
                <button type="button" aria-label="Enviar preview">
                    <FiSend size={18} />
                </button>
            </PhoneComposer>
        </PhoneFrame>
    </PreviewAside>
);
