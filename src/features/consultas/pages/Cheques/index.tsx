import React from 'react';
import { PageLayout } from '../../../../common/components/PageLayout';
import { ConsultationPage } from '../shared/components';
import { consultaChequesConfig } from '../../data/consultaChequesData';

export const ConsultaChequesPage: React.FC = () => (
    <PageLayout title={consultaChequesConfig.title}>
        <ConsultationPage config={consultaChequesConfig} />
    </PageLayout>
);
