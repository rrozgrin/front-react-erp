import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useAtivarModuloLojaMutation } from '@/hooks/lojaVirtual/useLojaVirtualMutations';

type LojaModalProps = {
  open: boolean;
  onClose: () => void;
  redirectTo: string;
  preco?: string;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalCard = styled.div`
  background: #fff;
  width: 100%;
  max-width: 520px;
  border-radius: 1rem;
  padding: 28px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from {
      transform: translateY(15px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
  }

  span {
    cursor: pointer;
    font-size: 1.6rem;
    line-height: 1;
    color: #777;

    &:hover {
      color: #000;
    }
  }
`;

const Benefits = styled.div`
  font-size: 0.9rem;
  color: #444;
  line-height: 1.7;
`;

const PriceBox = styled.div`
  text-align: center;
  margin-top: var(--space-lg);

  .old {
    text-decoration: line-through;
    color: #999;
    font-size: 0.9rem;
  }

  .new {
    font-size: 2rem;
    font-weight: 800;
    color: #2ecc71;
    margin: 6px 0;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  margin-top: 18px;
  padding: 14px 0;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: #fff;
  font-size: var(--font-size-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

export function ModalLojaVirtual({ open, onClose, redirectTo, preco }: LojaModalProps) {
  const { mutate: ativarModuloLoja } = useAtivarModuloLojaMutation();

  async function ativarModulo() {
    try {
      const data = await ativarModuloLoja();

      if (!data?.status) {
        throw new Error('Ativação falhou');
      }

      onClose();

      await Swal.fire({
        title: 'Sucesso!',
        text: 'Módulo ativo, redirecionando...',
        icon: 'success',
        timer: 1800,
        showConfirmButton: false,
      });

      if (redirectTo) {
        window.location.replace(redirectTo);
      }
    } catch {
      onClose();

      Swal.fire({
        title: 'Algo deu errado',
        text: 'Falha ao comunicar com o servidor.',
        icon: 'error',
        timer: 2000,
      });
    }
  }

  if (!open) return null;

  return (
    <Overlay>
      <ModalCard>
        <Header>
          <h2>Módulo de Loja Virtual - Ecommerce - Site Institucional - MarketPlaces</h2>
          <span onClick={onClose}>×</span>
        </Header>

        <Benefits>
          ✓ Produtos Ilimitados <br />
          ✓ Pedidos Ilimitados <br />
          ✓ Integrações com Marketplaces <br />
          ✓ Suporte incluso
        </Benefits>

        <PriceBox>
          <div className="old">De R$ 135,00</div>
          <div className="new">R$ {preco}</div>
        </PriceBox>

        <ActionButton onClick={ativarModulo}>
          Assinar agora
        </ActionButton>
      </ModalCard>
    </Overlay>
  );
}
