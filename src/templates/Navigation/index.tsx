import { IconBI } from '../../common/components/Icons/IconBI';
import { IconFA } from '../../common/components/Icons/IconFA';
import { ButtonMenu } from './components/ButtonMenu';
import {
  ContainerMenu,
  LogoutButton,
  LogoutText,
  RowMenu,
  Separator,
  UserActions,
  UserInfo,
} from './styled';
import { lazy, Suspense, useEffect, useState, type Dispatch, type SetStateAction } from 'react';

const Menu = lazy(() => import('./components/Menu').then(({ Menu: Component }) => ({ default: Component })));

type NavigationProps = {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
};

export const Navigation = ({ openMenu, setOpenMenu }: NavigationProps) => {
  const [menuMontado, setMenuMontado] = useState(false);

  useEffect(() => {
    if (openMenu) {
      setMenuMontado(true);
    }
  }, [openMenu]);

  return (
    <ContainerMenu>
      <RowMenu>
        <ButtonMenu open={openMenu} setOpen={setOpenMenu} />

        <UserActions>
          <UserInfo>
            <IconBI iconName="PersonFill" />
            Olá, Funcionário MASTER | WEBCONTROL EMPRESAS
          </UserInfo>
          <Separator>|</Separator>

          <LogoutButton type="button">
            <LogoutText>
              Sair {' '}
              <IconFA iconName="fa-solid fa-arrow-right-to-bracket" />
            </LogoutText>
          </LogoutButton>
        </UserActions>
      </RowMenu>

      {menuMontado && <Suspense fallback={null}><Menu open={openMenu} setOpen={setOpenMenu} /></Suspense>}
    </ContainerMenu>
  );
};
