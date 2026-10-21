import { ReactElement, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import {
    LayoutShell,
    MainDefault,
    RouteTransitionOverlay,
    RouteTransitionSpinner,
} from './styled';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Navigation } from '../Navigation';

export const Layout = (): ReactElement => {
  const navigation = useNavigation();
  const location = useLocation();
  const isNavigating = navigation.state !== 'idle';
  const isOperacaoFullscreen = [
    '/frente-caixa',
    '/pedido',
    '/orcamentos',
    '/ordemdeservico',
  ].some((path) => location.pathname.startsWith(path));
  const [openMenu, setOpenMenu] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const transitionFallbackRef = useRef<number | undefined>(undefined);
  const paintFrameRef = useRef<number | undefined>(undefined);
  const readyFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isNavigating) {
      setShowTransition(true);
    }
  }, [isNavigating]);

  useEffect(() => {
    const handleManualStart = () => {
      if (transitionFallbackRef.current) {
        window.clearTimeout(transitionFallbackRef.current);
      }

      setShowTransition(true);
      transitionFallbackRef.current = window.setTimeout(() => {
        setShowTransition(false);
      }, 10000);
    };

    const handleRouteReady = () => {
      if (transitionFallbackRef.current) {
        window.clearTimeout(transitionFallbackRef.current);
        transitionFallbackRef.current = undefined;
      }

      paintFrameRef.current = window.requestAnimationFrame(() => {
        readyFrameRef.current = window.requestAnimationFrame(() => {
          setShowTransition(false);
        });
      });
    };

    window.addEventListener('app:navigation:start', handleManualStart);
    window.addEventListener('app:navigation:ready', handleRouteReady);

    return () => {
      window.removeEventListener('app:navigation:start', handleManualStart);
      window.removeEventListener('app:navigation:ready', handleRouteReady);

      if (transitionFallbackRef.current) {
        window.clearTimeout(transitionFallbackRef.current);
      }
      if (paintFrameRef.current) {
        window.cancelAnimationFrame(paintFrameRef.current);
      }
      if (readyFrameRef.current) {
        window.cancelAnimationFrame(readyFrameRef.current);
      }
    };
  }, []);

  return (
    <LayoutShell>
      {!isOperacaoFullscreen && <Header onHomeClick={() => setOpenMenu(false)} />}
      <Navigation openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <MainDefault $fullscreen={isOperacaoFullscreen}>
        <Outlet />
      </MainDefault>
      {!isOperacaoFullscreen && <Footer />}
      {showTransition && (
        <RouteTransitionOverlay aria-label="Carregando página">
          <RouteTransitionSpinner />
        </RouteTransitionOverlay>
      )}
    </LayoutShell>
  );
};
