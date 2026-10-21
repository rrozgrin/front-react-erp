import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    faArrowDown,
    faArrowRight,
    faArrowRightToBracket,
    faArrowUp,
    faBagShopping,
    faBell,
    faBoxArchive,
    faCakeCandles,
    faCalendarCheck,
    faCalendarDays,
    faCartShopping,
    faCashRegister,
    faChartLine,
    faChartSimple,
    faCircleExclamation,
    faClipboardUser,
    faCoins,
    faDollarSign,
    faFaceFrown,
    faFileInvoice,
    faFileInvoiceDollar,
    faGear,
    faGripVertical,
    faKey,
    faLock,
    faMagnifyingGlassChart,
    faMobileScreenButton,
    faMoneyCheckDollar,
    faPenClip,
    faPeopleArrows,
    faPhone,
    faReceipt,
    faSliders,
    faSpinner,
    faStar,
    faTicket,
    faUser,
    faUserGroup,
    faUserTie,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';

interface IconProps extends Partial<FontAwesomeIconProps> {
  iconName: IconProp | string;
}

const iconMap: Record<string, IconDefinition> = {
  'fa-brands fa-instagram': faInstagram,
  'fa-solid fa-arrow-down': faArrowDown,
  'fa-solid fa-arrow-right': faArrowRight,
  'fa-solid fa-arrow-right-to-bracket': faArrowRightToBracket,
  'fa-solid fa-arrow-up': faArrowUp,
  'fa-solid fa-bag-shopping': faBagShopping,
  'fa-solid fa-bell': faBell,
  'fa-solid fa-box-archive': faBoxArchive,
  'fa-solid fa-cake-candles': faCakeCandles,
  'fa-solid fa-calendar-check': faCalendarCheck,
  'fa-solid fa-calendar-days': faCalendarDays,
  'fa-solid fa-cart-shopping': faCartShopping,
  'fa-solid fa-cash-register': faCashRegister,
  'fa-solid fa-chart-line': faChartLine,
  'fa-solid fa-chart-simple': faChartSimple,
  'fa-solid fa-circle-exclamation': faCircleExclamation,
  'fa-solid fa-clipboard-user': faClipboardUser,
  'fa-solid fa-coins': faCoins,
  'fa-solid fa-dollar-sign': faDollarSign,
  'fa-solid fa-face-frown': faFaceFrown,
  'fa-solid fa-file-invoice': faFileInvoice,
  'fa-solid fa-file-invoice-dollar': faFileInvoiceDollar,
  'fa-solid fa-gear': faGear,
  'fa-solid fa-grip-vertical': faGripVertical,
  'fa-solid fa-key': faKey,
  'fa-solid fa-lock': faLock,
  'fa-solid fa-magnifying-glass-chart': faMagnifyingGlassChart,
  'fa-solid fa-mobile-screen-button': faMobileScreenButton,
  'fa-solid fa-money-check-dollar': faMoneyCheckDollar,
  'fa-solid fa-pen-clip': faPenClip,
  'fa-solid fa-people-arrows': faPeopleArrows,
  'fa-solid fa-phone': faPhone,
  'fa-solid fa-receipt': faReceipt,
  'fa-solid fa-sliders': faSliders,
  'fa-solid fa-spinner': faSpinner,
  'fa-solid fa-star': faStar,
  'fa-solid fa-ticket': faTicket,
  'fa-solid fa-user': faUser,
  'fa-solid fa-user-group': faUserGroup,
  'fa-solid fa-user-tie': faUserTie,
  'fa-solid fa-xmark': faXmark,
};

const resolveIcon = (iconName: IconProp | string): IconProp => {
  if (typeof iconName !== 'string') {
    return iconName;
  }

  return iconMap[iconName] ?? (iconName as IconProp);
};

export const IconFA = ({ iconName, style, ...props }: IconProps) => {
  const mergedStyle = {
    ...style,
  };
  return <FontAwesomeIcon {...props} icon={resolveIcon(iconName)} style={mergedStyle} />;
};
