import styled from 'styled-components';

type Props = {
  $variant?: string;
  $fontSize?: number;
};

const ButtonTableStyled = styled.button<Props>`
  color: var(--color-secondary, var(--bs-secondary));
  background: none;
  border: none;
  ${props => props.$fontSize && `font-size: calc(${props.$fontSize} / 16 * 1rem);`}

  &:hover {
    color: ${props => (props.$variant ? `var(--bs-${props.$variant})` : 'var(--color-main, var(--bs-primary))')};
  }
`;

export { ButtonTableStyled };
