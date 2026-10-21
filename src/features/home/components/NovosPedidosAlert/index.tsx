import { ReactElement } from 'react';
import { useNovosPedidosQuery } from '@/hooks/pedidos/useNovosPedidosQuery';
import { IconFA } from '@/common/components/Icons/IconFA';
import {
    FavoriteAlertButton,
    FavoriteAlertWrapper,
    MenuAlertButton,
    MenuAlertItem,
} from './styled';

export const NOVOS_PEDIDOS_FAVORITO_ID = '58';
export const NOVOS_PEDIDOS_RELATORIO_PATH = '/view/webcontrol/res-relatoriosNovosPedidosloja_view.php';
export const NOVOS_PEDIDOS_ENDPOINT_PATH = '/apoio/novo_inicio/NovosPedidos.php';

type Variant = 'menu' | 'favorite';

type Props = {
  baseUrl: string;
  to?: string;
  endpoint?: string;
  title?: string;
  variant?: Variant;
  onNavigate?: () => void;
};

export const NovosPedidosAlert = ({
  baseUrl,
  to = `${baseUrl}${NOVOS_PEDIDOS_RELATORIO_PATH}`,
  endpoint = `${baseUrl}${NOVOS_PEDIDOS_ENDPOINT_PATH}`,
  title = 'Novos Pedidos',
  variant = 'menu',
  onNavigate,
}: Props): ReactElement | null => {
  const { data: novosPedidos, isLoading } = useNovosPedidosQuery(endpoint);

  if (isLoading) {
    return null;
  }

  const hasAlert = novosPedidos > 0;

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate();
      return;
    }

    window.open(to, '_self');
  };

  const content = (
    <>
      <IconFA iconName="fa-solid fa-cart-shopping" className="me-1" size="sm" />
      {title}
    </>
  );

  if (variant === 'favorite') {
    return (
      <FavoriteAlertWrapper>
        <FavoriteAlertButton $activeAlert={hasAlert} onClick={handleNavigate} aria-label={title}>
          <IconFA iconName="fa-solid fa-cart-shopping" />
          {title}
        </FavoriteAlertButton>
      </FavoriteAlertWrapper>
    );
  }

  return (
    <MenuAlertItem>
      <MenuAlertButton $activeAlert={hasAlert} onClick={handleNavigate} aria-label={title}>
        {content}
      </MenuAlertButton>
    </MenuAlertItem>
  );
};
