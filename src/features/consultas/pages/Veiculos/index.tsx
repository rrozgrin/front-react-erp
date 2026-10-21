import React from 'react';
import { PageLayout } from '../../../../common/components/PageLayout';
import { ConsultationPage } from '../shared/components';
import { consultaVeiculosConfig } from '../../data/consultaVeiculosData';

export const ConsultaVeiculosPage: React.FC = () => (
    <PageLayout title={consultaVeiculosConfig.title}>
        <ConsultationPage config={consultaVeiculosConfig} />
    </PageLayout>
);
