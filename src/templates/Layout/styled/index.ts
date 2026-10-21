import styled from 'styled-components';

const LayoutShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainDefault = styled.main<{ $fullscreen?: boolean }>`
  --layout-main-padding: 0.8rem;
  background-color: rgba(var(--bs-black-rgb), 0.03);
  flex: 1;
  padding: ${({ $fullscreen }) => ($fullscreen ? '0' : 'var(--layout-main-padding)')};
  overflow: ${({ $fullscreen }) => ($fullscreen ? 'hidden' : 'visible')};
`;

const RouteTransitionOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  background: rgba(var(--bs-white-rgb, 255, 255, 255), 0.45);
  pointer-events: none;
`;

const RouteTransitionSpinner = styled.div`
  width: var(--control-height-sm);
  height: var(--control-height-sm);
  border: 4px solid var(--theme-border, var(--bs-border-color));
  border-top-color: var(--color-main, var(--bs-primary));
  border-radius: 50%;
  animation: spin-route-transition 0.8s linear infinite;

  @keyframes spin-route-transition {
    to {
      transform: rotate(360deg);
    }
  }
`;

export { LayoutShell, MainDefault, RouteTransitionOverlay, RouteTransitionSpinner };
