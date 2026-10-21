import { memo, ReactElement } from 'react';
import { IconFA } from '@/common/components/Icons/IconFA';
import { ContainerTitle } from './styled/styled';

type Props = {
  title: string;
  iconFa?: string;
};

export const TitleMenu = memo(({ title, iconFa }: Props): ReactElement => {
  return (
    <ContainerTitle>
      {iconFa && <IconFA className="iconTitle" iconName={iconFa} />}
      <h3>{title}</h3>
    </ContainerTitle>
  );
});
