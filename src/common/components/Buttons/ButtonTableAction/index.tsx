import { ReactElement, ReactNode } from 'react';
import { ButtonTableStyled } from './styled';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  title: string;
  variant?: string;
  fontSize?: number;
};

export const ButtonTableAction = ({ children, onClick, title, variant, fontSize }: Props): ReactElement => {
  return (
    <ButtonTableStyled
      $variant={variant}
      $fontSize={fontSize}
      aria-label={title}
      title={title}
      type="button"
      onClick={onClick}
    >
      {children}
    </ButtonTableStyled>
  );
};
