import { ReactElement } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { IconBI } from '@/common/components/Icons/IconBI';

type Props = {
    open: boolean;
    setOpen: (param: boolean) => void;
};

export const ButtonMenu = ({ setOpen, open }: Props): ReactElement => {
    const label = open ? 'Fechar' : 'Menu';

    return (
        <MenuButton
            onClick={() => setOpen(!open)}
            aria-controls="menu-collapse"
            aria-expanded={open}
            aria-label={label}
            data-active={open}
            translate="no"
        >
            <IconBI
                iconName={open ? 'XLg' : 'List'}
                className={open ? undefined : 'menu-button-list-icon'}
            />
            <MenuButtonLabel>{label}</MenuButtonLabel>
        </MenuButton>
    );
};

const MenuButtonLabel = styled.span`
  display: inline-block;
`;

const MenuButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  height: 40px;
  padding: 0 var(--space-lg);
  border: 0;
  border-radius: 0;
  color: var(--color-font, #fff);
  background-color: var(--color-secondary, var(--bs-primary));
  font-size: var(--font-size-sm + 4px);
  font-weight: 500;

  svg {
    font-size: var(--font-size-lg);
  }

  .menu-button-list-icon {
    font-size: calc(var(--font-size-lg) + 4px);
  }

  &:hover,
  &:focus,
  &:active,
  &[data-active='true'],
  &.btn:first-child:active,
  &:focus-visible {
    color: var(--color-font, #fff) !important;
    background-color: var(--color-secondary, var(--bs-primary)) !important;
    border-color: var(--color-secondary, var(--bs-primary)) !important;
    box-shadow: inset 0 -3px 0 color-mix(in srgb, var(--color-font, #fff) 38%, transparent) !important;
  }
`;
