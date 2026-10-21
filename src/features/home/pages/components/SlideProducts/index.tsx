import { ReactElement } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { ContainerCarousel } from './styled';

export const SlideProducts = (): ReactElement => {
  return (
    <ContainerCarousel>
      <Carousel.Item>
        <a
          href="https://www.webcontrolloja.vfx.net.br/loja/produto/?/14748913/impressora-termica-i9-corte-automatico-usb-elgin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://www.webcontrolempresas.com.br/fotos_produtos/62735/tmp_62735-02d973f54661c544399b2799c5406ed6.png"
            width={64}
            height={58}
          />
          <Carousel.Caption>
            <h3 className="mb-0">Impressora Térmica Elgin</h3>
            <p className="mb-0 fs-5 fw-semibold">R$ 764,04</p>
            <p>6x de R$ 127,34 sem juros</p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
      <Carousel.Item>
        <a href="https://www.webcontrolloja.vfx.net.br/loja/produto/?/3162533" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://www.webcontrolempresas.com.br/fotos_produtos/62735/62735-90832960b61253b53b31159cba66327e.jpg"
            width={64}
            height={58}
          />
          <Carousel.Caption>
            <h3 className="mb-0">Leitor de código de barras Elgin</h3>
            <p className="mb-0 fs-5 fw-semibold">R$ 253,62</p>
            <p>6x de R$ 42,27 sem juros</p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
      <Carousel.Item>
        <a
          href="https://www.webcontrolloja.vfx.net.br/loja/produto/?/13786251/gaveta-de-dinheiro-elgin-eg-60b"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://www.webcontrolempresas.com.br/fotos_produtos/62735/62735-f2a044700b13b9e1d6126c99f966444f.jpg"
            width={64}
            height={58}
          />
          <Carousel.Caption>
            <h3 className="mb-0">Gaveta de Dinheiro ELGIN EG 60B</h3>
            <p className="mb-0 fs-5 fw-semibold">R$ 519,79</p>
            <p>6x de R$ 86,63 sem juros</p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
    </ContainerCarousel>
  );
};
