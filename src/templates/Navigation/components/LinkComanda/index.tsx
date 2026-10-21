import { memo, ReactElement } from 'react';
import { IconBI, type IconBIName } from '@/common/components/Icons/IconBI';
import { IconFA } from '@/common/components/Icons/IconFA';
import { IconGF } from '@/common/components/Icons/IconGF';
import { BadgeEnum } from '@/common/enums/badge.enum';
import { Badge } from '@/common/components/Templates/Badge';
import { useUsuario } from '@/context/UsuarioContext';
import { openComandaAPPReact } from '@/utils/openComanda';
import { ComandaButton, IconSlot, TitleText } from './styled';

type Props = {
  to: string;
  title: string;
  tag?: BadgeEnum;
  iconBi?: IconBIName;
  iconFa?: string;
  iconGf?: string;
  setOpenMenu?: (param: boolean) => void;
};

export const LinkComanda = memo(({ to, title, iconBi, iconFa, iconGf, tag, setOpenMenu }: Props): ReactElement => {

  const { usuario } = useUsuario();

  const handleClick = () => {
    setOpenMenu?.(false);
    if (to.includes("comanda.webcontrolempresas.com.br")) {
      openComandaAPPReact(usuario);
      return;
    }
    window.open(to, "_self");
  };

  const content = (
    <>
      <IconSlot>
        {iconFa && <IconFA iconName={iconFa} size="2xs" />}
        {iconBi && <IconBI iconName={iconBi} />}
        {iconGf && <IconGF iconName={iconGf} iconSize={15} />}
      </IconSlot>
      <TitleText>{title}</TitleText>
      {tag && <Badge badge={tag} />}
    </>
  );

  return (
    <li>
      <ComandaButton onClick={handleClick}>
        {content}
      </ComandaButton>
    </li>
  );
});
