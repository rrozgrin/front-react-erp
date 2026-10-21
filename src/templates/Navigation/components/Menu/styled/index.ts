import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const NavMenu = styled.nav<{ $open: boolean }>`
  width: 100%;
  background-color: var(--theme-surface, white);
  border-bottom: 2px solid color-mix(in srgb, var(--color-secondary, var(--bs-primary)) 28%, transparent);
  box-shadow: 0px 0px 10px 3px rgba(var(--bs-black-rgb), 0.15);
  display: flex;
  flex-wrap: wrap;
  margin-right: 0;
  margin-left: 0;
  position: absolute;
  z-index: 3;
  transform: ${({ $open }) => ($open ? 'translate3d(0, 0, 0)' : 'translate3d(0, -10px, 0)')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition:
    transform 180ms ease-out,
    opacity 150ms ease-out,
    visibility 0s ${({ $open }) => ($open ? '0s' : '180ms')};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const MenuColumn = styled(Col)`
  border-right: 1px solid var(--bs-gray-300);
  padding-top: var(--space-lg);
  padding-bottom: var(--space-lg);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: color-mix(in srgb, var(--color-secondary, var(--bs-primary)) 8%, var(--theme-surface, white));
    cursor: pointer;
  }
`;

const MenuList = styled.ul`
  padding-left: var(--space-xs);
  margin: 0;

  li {
    list-style: none;
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-2xs);
  }
`;

export { MenuColumn, MenuList, NavMenu };
