import React from 'react';
import { PageLayout } from '../../../../common/components/PageLayout';
import { ConsultationPage } from '../shared/components';
import { pessoaJuridicaConsultaConfig } from '../../data/consultaPessoaJuridicaData';

export const ConsultaPessoaJuridicaPage: React.FC = () => (
    <PageLayout title={pessoaJuridicaConsultaConfig.title}>
        <ConsultationPage config={pessoaJuridicaConsultaConfig} />
    </PageLayout>
);
