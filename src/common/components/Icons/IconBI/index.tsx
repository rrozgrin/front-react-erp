import {
  List,
  PersonFill,
  XLg,
  type IconProps,
  type Icon as BootstrapIcon,
} from 'react-bootstrap-icons';

export type IconBIName = 'List' | 'PersonFill' | 'XLg';

interface IconBIProps extends IconProps {
  // Cannot use "name" as it is a valid SVG attribute
  // "iconName", "filename", "icon" will do it instead
  iconName: IconBIName;
}

const iconMap: Record<IconBIName, BootstrapIcon> = {
  List,
  PersonFill,
  XLg,
};

export const IconBI = ({ iconName, ...props }: IconBIProps) => {
  const Icon = iconMap[iconName];
  return <Icon {...props} />;
};
