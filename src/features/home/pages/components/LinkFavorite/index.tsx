import { ReactElement } from 'react';
import { IconGF } from '../../../../../common/components/Icons/IconGF';
import { LiFavorite } from './styled';

type Props = {
  iconName: string;
  title: string;
  to: string;
};

export const LinkFavorite = ({ to, iconName, title }: Props): ReactElement => {
  const handleClick = () => {
    window.location.href = to;
  };

  return (
    <LiFavorite>
      <button onClick={handleClick}>
        <IconGF iconName={iconName} /> {title}
      </button>
    </LiFavorite>
  );
};
