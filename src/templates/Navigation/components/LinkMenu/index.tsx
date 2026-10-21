import { memo, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconBI, type IconBIName } from '@/common/components/Icons/IconBI';
import { IconFA } from '@/common/components/Icons/IconFA';
import { IconGF } from '@/common/components/Icons/IconGF';
import { BadgeEnum } from '@/common/enums/badge.enum';
import { Badge } from '@/common/components/Templates/Badge';
import { IconImage, IconSlot, LinkButton, TitleText } from './styled';

type Props = {
  to: string;
  title: string;
  tag?: BadgeEnum;
  iconBi?: IconBIName;
  iconFa?: string;
  iconGf?: string;
  iconSrc?: string;
  setOpenMenu?: (param: boolean) => void;

  exigirModuloLoja?: boolean;
  moduloLoja?: {
    verificarLiberacao: (url: string) => void;
  };
};

export const LinkMenu = memo(({
  to,
  title,
  iconBi,
  iconFa,
  iconGf,
  iconSrc,
  tag,
  setOpenMenu,
  exigirModuloLoja,
  moduloLoja,
}: Props): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const content = (
    <>
      <IconSlot>
        {iconSrc && <IconImage src={iconSrc} alt="" aria-hidden="true" />}
        {iconFa && <IconFA iconName={iconFa} size="2xs" />}
        {iconBi && <IconBI iconName={iconBi} />}
        {iconGf && <IconGF iconName={iconGf} iconSize={15} />}
      </IconSlot>
      <TitleText>{title}</TitleText>
      {tag && <Badge badge={tag} />}
    </>
  );

  function handleClick() {
    setOpenMenu?.(false);
    if (exigirModuloLoja && moduloLoja) {
      moduloLoja.verificarLiberacao(to);
      return;
    }

    if (/^https?:\/\//i.test(to)) {
      window.open(to, '_self');
      return;
    }

    const targetPath = to.startsWith('/') ? to : `/${to}`;

    if (location.pathname === targetPath) {
      return;
    }

    window.dispatchEvent(new Event('app:navigation:start'));
    navigate(targetPath);
  }

  return (
    <li>
      <LinkButton onClick={handleClick}>
        {content}
      </LinkButton>
    </li>
  );
});
