import styled, { css, keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: 0.35;
  }
`;

const alertAnimation = css`
  animation: ${blink} 1s infinite;
`;

const sharedAlertStyles = css`
  color: var(--color-main, var(--bs-primary)) !important;
  font-weight: 500;
  ${alertAnimation}
`;

type AlertProps = {
    $activeAlert: boolean;
};

const MenuAlertItem = styled.li`
  list-style: none;
  font-size: 0.8rem;
  margin-bottom: 0.15rem;
`;

const MenuAlertButton = styled.button<AlertProps>`
  text-decoration: none !important;
  display: flex;
  align-items: center;
  color: ${({ $activeAlert }) => ($activeAlert ? 'var(--color-main, var(--bs-primary))' : 'var(--bs-gray-900)')} !important;
  font-weight: ${({ $activeAlert }) => ($activeAlert ? 500 : 400)};
  transition: 0.2s ease;
  font-size: 0.82rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  ${({ $activeAlert }) => ($activeAlert ? sharedAlertStyles : '')}

  &:hover,
  &:visited,
  &:active,
  &:focus {
    color: ${({ $activeAlert }) => ($activeAlert ? 'var(--color-secondary, var(--bs-secondary))' : 'var(--color-tertiary)')} !important;
    text-decoration: none !important;
  }
`;

const FavoriteAlertWrapper = styled.div`
  list-style: none;
  margin-bottom: 6px;
  padding: 0;
  width: 100%;
  text-decoration: none;
  border: none;
  background: none;
  height: 100%;
`;

const FavoriteAlertButton = styled.button<AlertProps>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ $activeAlert }) => ($activeAlert ? 'var(--theme-border, rgba(var(--bs-primary-rgb), 0.35))' : 'var(--home-border, var(--bs-gray-300))')};
  border-radius: var(--radius-lg);
  font-size: 0.7rem;
  font-weight: ${({ $activeAlert }) => ($activeAlert ? 500 : 400)};
  color: ${({ $activeAlert }) => ($activeAlert ? 'var(--color-main, var(--bs-primary))' : 'inherit')};
  transition: 0.2s;
  ${({ $activeAlert }) => ($activeAlert ? alertAnimation : '')}

  svg {
    color: ${({ $activeAlert }) => ($activeAlert ? 'var(--color-main, var(--bs-primary))' : 'var(--color-secondary, var(--bs-secondary))')};
    font-size: 1.6rem;
    margin-bottom: 5px;
    transition: 0.2s;
  }

  &:hover {
    border-color: var(--color-main, var(--bs-primary));
    background-color: var(--color-main, var(--bs-primary));
    color: #fff !important;

    svg {
      color: #fff;
    }
  }
`;

export { FavoriteAlertButton, FavoriteAlertWrapper, MenuAlertButton, MenuAlertItem };
