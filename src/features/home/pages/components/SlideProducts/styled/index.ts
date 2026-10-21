import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';

const ContainerCarousel = styled(Carousel)`
  height: 100%;

  .carousel-indicators {
    display: none;
  }

  .carousel-control-prev,
  .carousel-control-next {
    display: none;
  }

  .carousel-inner {
    height: 100%;
    min-height: 64px;
  }

  .carousel-item {
    height: 100%;

    a {
      display: grid;
      grid-template-columns: 64px minmax(0, 1fr);
      gap: 0.85rem;
      align-items: center;
      min-height: 64px;
      height: 100%;
      color: inherit;
      text-decoration: none;
    }

    img {
      display: block;
      width: 64px;
      height: 58px;
      object-fit: contain;
      object-position: center;
    }

    .carousel-caption {
      position: static;
      inset: auto;
      width: auto;
      min-width: 0;
      min-height: 52px;
      padding: 0;
      color: var(--home-text, var(--bs-dark));
      text-align: left;

      h3 {
        display: -webkit-box;
        margin-bottom: 0.18rem !important;
        overflow: hidden;
        color: var(--color-secondary, var(--bs-primary)) !important;
        font-size: var(--font-size-xs);
        font-weight: 500;
        line-height: 1.25;
        overflow-wrap: anywhere;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        min-height: 1.95rem;
      }

      p {
        margin-bottom: 0.15rem !important;
        color: var(--bs-dark);
        font-size: 0.68rem;
        line-height: 1.2;
        overflow-wrap: anywhere;
      }

      p.fs-5 {
        font-size: 0.98rem !important;
        font-weight: 800 !important;
      }
    }
  }

  @media screen and (max-width: 575px) {
    .carousel-item a {
      grid-template-columns: 58px minmax(0, 1fr);
    }

    .carousel-item img {
      width: 58px;
      height: 52px;
    }

    .carousel-inner,
    .carousel-item a {
      min-height: 58px;
    }
  }
`;

export { ContainerCarousel };
