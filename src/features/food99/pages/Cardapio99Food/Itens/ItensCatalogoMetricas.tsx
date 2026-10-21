import React from 'react';
import { FiPackage } from 'react-icons/fi';
import { MetricCard, MetricsGrid } from './styled';

interface ItensCatalogoMetricasProps {
    total: number;
    publicados: number;
    rascunhos: number;
    inativos: number;
}

export const ItensCatalogoMetricas: React.FC<ItensCatalogoMetricasProps> = ({
    total,
    publicados,
    rascunhos,
    inativos,
}) => (
    <MetricsGrid>
        <MetricCard>
            <FiPackage />
            <div><strong>{total}</strong><span>Total de itens</span><small>itens cadastrados</small></div>
        </MetricCard>
        <MetricCard>
            <span className="dot published" />
            <div><strong>{publicados}</strong><span>Publicados</span><small>itens publicados</small></div>
        </MetricCard>
        <MetricCard>
            <span className="dot draft" />
            <div><strong>{rascunhos}</strong><span>Rascunhos</span><small>itens não publicados</small></div>
        </MetricCard>
        <MetricCard>
            <span className="dot inactive" />
            <div><strong>{inativos}</strong><span>Inativos</span><small>itens inativos</small></div>
        </MetricCard>
    </MetricsGrid>
);
