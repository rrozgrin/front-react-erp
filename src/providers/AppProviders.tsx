import { ReactElement, ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '../context/ThemeContext';
import { UsuarioProvider } from '../context/UsuarioContext';
import { PermissoesProvider } from '../context/PermissoesContext';
import { FavoritosProvider } from '../context/FavoritosContext';
import { CertificadoProvider } from '../context/CertificadoContext';

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps): ReactElement => {
  return (
    <ThemeProvider>
      <CookiesProvider>
        <UsuarioProvider>
          <PermissoesProvider>
            <FavoritosProvider>
              <CertificadoProvider>{children}</CertificadoProvider>
            </FavoritosProvider>
          </PermissoesProvider>
        </UsuarioProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
};
