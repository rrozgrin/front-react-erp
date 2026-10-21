import type { ReactElement } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ContainerHeader, HeaderLogo } from './styled';
import ImgTop from '../../assets/img/img_home.svg';

type HeaderProps = {
    onHomeClick?: () => void;
};

export const Header = ({ onHomeClick }: HeaderProps): ReactElement => {
    return (
        <ContainerHeader as="header" className="container-fluid">
            <Row>
                <Col md={6} className="d-flex align-items-center logo-div">
                    <Link to="/home" id="logoMarcaLink" onClick={onHomeClick}>
                        <HeaderLogo
                            // src={
                            //   id
                            //     ? `${baseUrl}/logomarca/${id}/logomarca_${id}.jpg?${Date.now()}`
                            //     : '/webcontrol/view/images/logo-cliente.png?6563'
                            // }
                            src={'/logo-webcontrol.png'}
                            alt="Webcontrol empresas"
                            id="logoMarca"
                            // onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/webcontrol/view/images/logo-cliente.png?6563'; }}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = './logo-webcontrol.png'; }}
                        />
                    </Link>
                </Col>
                <Col md={6} className="d-flex justify-content-end img-div">
                    <Image src={ImgTop} alt="Webcontrol empresas" style={{ maxHeight: 80, width: 'auto' }} />
                </Col>
            </Row>
        </ContainerHeader>
    );
};
