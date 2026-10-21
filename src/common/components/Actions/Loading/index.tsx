import { ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingShell = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--theme-surface, var(--bs-white));
`;

const Spinner = styled.div`
  width: var(--control-height-sm);
  height: var(--control-height-sm);
  border: 4px solid var(--theme-border, var(--bs-border-color));
  border-top-color: var(--color-main, var(--bs-primary));
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const Loading = (): ReactElement => {
  return (
    <LoadingShell aria-label="Carregando">
      <Spinner />
    </LoadingShell>
  );
};
