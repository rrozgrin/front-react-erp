import { ReactElement } from 'react';
import { Badge as BadgeBS } from 'react-bootstrap';
import { BadgeEnum } from '../../../enums/badge.enum';

type Props = {
  badge: BadgeEnum;
  className?: string;
};

export const Badge = ({ badge, className }: Props): ReactElement => {
  switch (badge) {
    case BadgeEnum.New:
      return (
        <BadgeBS className={className} bg="success">
          Novo
        </BadgeBS>
      );
    case BadgeEnum.Soon:
      return (
        <BadgeBS className={className} bg="warning">
          Em Breve
        </BadgeBS>
      );
    case BadgeEnum.Testing:
      return (
        <BadgeBS className={className} bg="danger">
          Em Testes
        </BadgeBS>
      );
  }
};
