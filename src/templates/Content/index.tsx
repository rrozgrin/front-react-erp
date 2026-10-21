import { ReactElement, ReactNode } from 'react';
import { Breadcrumbs } from '../../common/components/Templates/Breadcrumb';

type Props = {
  children: ReactNode;
  breadcrumb?: boolean;
};

export const Content = ({ children, breadcrumb }: Props): ReactElement => {
  return (
    <>
      {breadcrumb && <Breadcrumbs />}
      {children}
    </>
  );
};
