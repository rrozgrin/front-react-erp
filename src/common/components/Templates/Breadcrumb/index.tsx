import { ReactElement } from 'react';
import { useMatches } from 'react-router-dom';
import { BackDefault } from '../BackDefault';
import { UlBreadcrumb } from './styled';

type CrumbFunction = (data: unknown) => ReactElement | string;

interface CustomMatch {
  handle?: {
    crumb?: CrumbFunction;
  };
  data?: unknown;
}

export const Breadcrumbs = (): ReactElement => {
  const matches = useMatches() as CustomMatch[];
  const crumbs = matches.filter(match => Boolean(match.handle?.crumb)).map(match => match.handle!.crumb!(match.data));

  return (
    <BackDefault>
      <UlBreadcrumb>
        {crumbs.map((crumb, index) => (
          <li key={index}>{crumb}</li>
        ))}
      </UlBreadcrumb>
    </BackDefault>
  );
};
