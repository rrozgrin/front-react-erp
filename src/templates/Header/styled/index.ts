import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const ContainerHeader = styled(Container)`
  .logo-div {
    img {
      max-width: 200px;
    }
  }

  .img-div {
    img {
      max-height: 80px;
      max-width: 100%;
    }
  }

  @media screen and (max-width: 765px) {
    .logo-div,
    .img-div {
      justify-content: center !important;
    }
  }
`;

const HeaderLogo = styled.img`
  width: auto;
  max-height: 80px;
  height: auto;
`;

export { ContainerHeader, HeaderLogo };
