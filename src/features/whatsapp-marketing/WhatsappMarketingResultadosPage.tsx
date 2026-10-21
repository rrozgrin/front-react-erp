import { useMemo, useState } from 'react';
import { FiDownload, FiEdit3, FiEye, FiFilter, FiMessageCircle, FiMoreHorizontal, FiRefreshCw, FiSend } from 'react-icons/fi';
import { Table, type TableField } from '../../common/components/Table';
import { CampaignStatusBadge, SummaryCard, WhatsappMarketingPage } from './components';
import {
    campaignStatusLabels,
    campaigns,
    formatNumber,
    type Campaign,
    type CampaignStatus,
} from './whatsappMarketingData';
import {
    Field,
    FiltersCard,
    FiltersGrid,
    Grid,
    PrimaryButton,
    SecondaryButton,
    TableName,
    ToolbarActions,
} from './styled';
import { Input, Select } from '../../common/components/Ui';

const normalizeText = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const resultFields: TableField<Campaign>[] = [
    {
        id: 'sentAt',
        header: 'Data / Hora',
        accessorFn: (row) => `${row.sentAt} ${row.sentHour}`,
        defaultVisible: true,
    },
    {
        id: 'name',
        header: 'Nome da campanha',
        accessorKey: 'name',
        defaultVisible: true,
        cell: (_value, row) => (
            <TableName>
                <strong>{row.name}</strong>
                <span>{row.listName}</span>
            </TableName>
        ),
    },
    {
        id: 'messageTitle',
        header: 'Título da mensagem',
        accessorKey: 'messageTitle',
        defaultVisible: true,
    },
    {
        id: 'messages',
        header: 'Mensagens',
        accessorKey: 'messages',
        align: 'center',
        defaultVisible: true,
        cell: (value) => formatNumber(Number(value)),
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        align: 'center',
        defaultVisible: true,
        cell: (value) => <CampaignStatusBadge status={value as CampaignStatus} />,
    },
    {
        id: 'cost',
        header: 'Custo',
        accessorKey: 'cost',
        align: 'right',
        defaultVisible: true,
    },
];

export const WhatsappMarketingResultadosPage = () => {
    const [status, setStatus] = useState<'all' | CampaignStatus>('all');
    const [campaignName, setCampaignName] = useState('');

    const filteredCampaigns = useMemo(() => {
        const term = normalizeText(campaignName);

        return campaigns.filter((campaign) => {
            const matchesName = !term || normalizeText(`${campaign.name} ${campaign.messageTitle}`).includes(term);
            const matchesStatus = status === 'all' || campaign.status === status;

            return matchesName && matchesStatus;
        });
    }, [campaignName, status]);

    const sent = campaigns.reduce((total, campaign) => total + campaign.messages, 0);
    const delivered = campaigns.reduce((total, campaign) => total + campaign.delivered, 0);
    const read = campaigns.reduce((total, campaign) => total + campaign.read, 0);
    const replies = campaigns.reduce((total, campaign) => total + campaign.replies, 0);
    const errors = campaigns.filter((campaign) => campaign.status === 'error').length;

    return (
        <WhatsappMarketingPage
            title="3º passo: Acompanhar Resultados"
            toolbar={(
                <SecondaryButton type="button">
                    <FiDownload size={16} />
                    Exportar relatório
                </SecondaryButton>
            )}
        >
            <FiltersCard>
                <FiltersGrid $columns="1fr 1fr 1fr 1.2fr auto auto">
                    <Field>
                        Período inicial
                        <Input type="date" defaultValue="2026-05-01" />
                    </Field>
                    <Field>
                        Período final
                        <Input type="date" defaultValue="2026-05-27" />
                    </Field>
                    <Field>
                        Status
                        <Select value={status} onChange={(event) => setStatus(event.target.value as 'all' | CampaignStatus)}>
                            <option value="all">Todos</option>
                            {Object.entries(campaignStatusLabels).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </Select>
                    </Field>
                    <Field>
                        Nome da campanha
                        <Input
                            value={campaignName}
                            onChange={(event) => setCampaignName(event.target.value)}
                            placeholder="Buscar campanha..."
                        />
                    </Field>
                    <ToolbarActions>
                        <PrimaryButton type="button">
                            <FiFilter size={16} />
                            Filtrar
                        </PrimaryButton>
                    </ToolbarActions>
                    <ToolbarActions>
                        <SecondaryButton type="button" onClick={() => {
                            setCampaignName('');
                            setStatus('all');
                        }}>
                            <FiRefreshCw size={16} />
                            Limpar
                        </SecondaryButton>
                    </ToolbarActions>
                </FiltersGrid>
            </FiltersCard>

            <Grid>
                <SummaryCard label="Campanhas enviadas" value="316" helper="total no período" tone="blue" icon={<FiSend size={22} />} />
                <SummaryCard label="Mensagens enviadas" value={formatNumber(sent)} helper="total no período" icon={<FiMessageCircle size={22} />} />
                <SummaryCard label="Entregues" value={formatNumber(delivered)} helper="96,7% do total" tone="green" icon={<FiSend size={22} />} />
                <SummaryCard label="Lidas" value={formatNumber(read)} helper="62,5% entregues" tone="purple" icon={<FiEye size={22} />} />
                <SummaryCard label="Respostas" value={formatNumber(replies)} helper="interações recebidas" tone="orange" icon={<FiMessageCircle size={22} />} />
                <SummaryCard label="Erros" value={String(errors)} helper="campanhas com falha" tone="red" icon={<FiMoreHorizontal size={22} />} />
            </Grid>

            <Table
                title="Campanhas"
                description="Acompanhe status, entregas e custo de cada campanha de marketing."
                data={filteredCampaigns}
                fields={resultFields}
                showColumnSelector={false}
                emptyMessage="Nenhuma campanha encontrada."
                rowActions={[
                    {
                        label: 'Visualizar',
                        icon: <FiEye size={16} />,
                        onClick: () => undefined,
                    },
                    {
                        label: 'Editar',
                        icon: <FiEdit3 size={16} />,
                        variant: 'muted',
                        onClick: () => undefined,
                    },
                    {
                        label: 'Mais ações',
                        icon: <FiMoreHorizontal size={16} />,
                        variant: 'muted',
                        onClick: () => undefined,
                    },
                ]}
            />
        </WhatsappMarketingPage>
    );
};
