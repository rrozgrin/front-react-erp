import { useMemo, useRef } from 'react';
import { FaCheckCircle, FaTag, FaTools } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { FloatingActions } from '../../../../common/components/Buttons/FloatingActions';
import {
    DetailProfileCard,
    EmptyState,
    FieldCard,
    FieldsGrid,
    FotoColumn,
    MainCard,
    QuickInfo,
    QuickItem,
    SectionBlock,
    SectionHeader,
    SectionsColumn,
    TopGrid,
} from '../../../../common/components/DetailView';
import { PageLayout } from '../../../../common/components/PageLayout';
import { buildCatalogoMenuSections, type CatalogoConfig } from './catalogoConfig';
import { catalogoItemsMockData, formatCurrency } from './catalogoData';

interface CatalogoVisualizarPageProps {
    config: CatalogoConfig;
}

interface DetailField {
    label: string;
    value: string;
}

export const CatalogoVisualizarPage = ({ config }: CatalogoVisualizarPageProps) => {
    const { id } = useParams();
    const printRef = useRef<HTMLDivElement>(null);
    const item = useMemo(
        () => catalogoItemsMockData.find((current) => String(current.id) === id && current.prodServ === config.prodServ),
        [config.prodServ, id]
    );

    const quickInfo: DetailField[] = item ? [
        { label: config.labels.code, value: item.codigo },
        { label: 'Unidade', value: item.unidade },
        { label: 'Valor de Venda', value: formatCurrency(item.venda) },
        { label: 'Situação', value: item.status === 'ativo' ? 'Ativo' : 'Excluído' },
    ] : [];

    const fields: DetailField[] = item ? [
        { label: 'Código', value: String(item.id) },
        { label: config.labels.code, value: item.codigo },
        { label: config.labels.name, value: item.nome },
        { label: 'Classificação', value: item.classificacao },
        { label: 'Fornecedor', value: item.fornecedor },
        { label: 'Unidade', value: item.unidade },
        { label: 'Valor de Custo', value: formatCurrency(item.custo) },
        { label: config.labels.saleValue, value: formatCurrency(item.venda) },
        { label: 'Status', value: item.status === 'ativo' ? 'Ativo' : 'Excluído' },
    ] : [];

    return (
        <PageLayout
            title={`Visualização de ${config.labels.singular}`}
            sections={buildCatalogoMenuSections(config)}
        >
            {item ? (
                <MainCard ref={printRef}>
                    <TopGrid>
                        <FotoColumn>
                            <DetailProfileCard
                                name={item.nome}
                                badges={[
                                    { icon: <FaCheckCircle aria-hidden="true" />, label: item.status === 'ativo' ? 'ATIVO' : 'EXCLUÍDO' },
                                    { icon: <FaTag aria-hidden="true" />, label: item.classificacao },
                                ]}
                            />
                            <QuickInfo>
                                {quickInfo.map((field) => (
                                    <QuickItem key={field.label}>
                                        <dt>{field.label}</dt>
                                        <dd>{field.value}</dd>
                                    </QuickItem>
                                ))}
                            </QuickInfo>
                        </FotoColumn>

                        <SectionsColumn>
                            <SectionBlock>
                                <SectionHeader>
                                    <FaTools />
                                    <h3>Dados do {config.labels.singular}</h3>
                                </SectionHeader>
                                <FieldsGrid>
                                    {fields.map((field) => (
                                        <FieldCard key={field.label}>
                                            <dt>{field.label}</dt>
                                            <dd>{field.value}</dd>
                                        </FieldCard>
                                    ))}
                                </FieldsGrid>
                            </SectionBlock>
                        </SectionsColumn>
                    </TopGrid>
                </MainCard>
            ) : (
                <EmptyState>{config.labels.singular} não encontrado.</EmptyState>
            )}

            {item && (
                <FloatingActions
                    actions={['print']}
                    labels={{ print: `Imprimir ${config.labels.singular.toLowerCase()}` }}
                    printTargetRef={printRef}
                />
            )}
        </PageLayout>
    );
};
