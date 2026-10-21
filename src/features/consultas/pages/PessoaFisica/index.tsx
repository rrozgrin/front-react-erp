import React from 'react';
import { PageLayout } from '../../../../common/components/PageLayout';
import { ConsultationPage } from '../shared/components';
import { pessoaFisicaConsultaConfig } from '../../data/consultaPessoaFisicaData';

export const ConsultaPessoaFisicaPage: React.FC = () => (
    <PageLayout title={pessoaFisicaConsultaConfig.title}>
        <ConsultationPage config={pessoaFisicaConsultaConfig} />
    </PageLayout>
);
