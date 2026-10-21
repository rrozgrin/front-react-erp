import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { AniversariantesCard } from '../AniversariantesCard';
import { BoletosCard } from '../BoletosCard';
import { ContasPagarCard } from '../ContasPagarCard';
import { CompromissosCard } from '../CompromissosCard';
import { LocacoesCard } from '../LocacoesCard';
import { PromissoriasCard } from '../PromissoriasCard';
import { IconFA } from '../../../../../common/components/Icons/IconFA';
import { AlertsCard } from '../../styled';

export const CardInformacoes: React.FC = () => {
    return (
        <AlertsCard className="home-alert-panel mb-3">
            <div className="alerts-header pb-3 mb-4 border-bottom">
                <h3 className="h5" data-app-font-exception="home-dashboard-title">
                    <IconFA iconName="fa-solid fa-bell" className="me-2" />
                    Alertas e Pendências
                </h3>
            </div>
            <Row className="alerts-content">
                <Col md={6}>
                    <ul className="alerts-list">
                        <BoletosCard baseUrl={'/webcontrol'} />
                        <PromissoriasCard baseUrl={'/webcontrol'} />
                        <ContasPagarCard baseUrl={'/webcontrol'} />
                    </ul>
                </Col>
                <Col md={6}>
                    <ul className="alerts-list">
                        <CompromissosCard baseUrl={'/webcontrol'} />
                        <LocacoesCard baseUrl={'/webcontrol'} />
                        <AniversariantesCard baseUrl={'/webcontrol'} />
                    </ul>
                </Col>
            </Row>
        </AlertsCard>
    );
}
