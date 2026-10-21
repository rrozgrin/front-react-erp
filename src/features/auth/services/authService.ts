import { webcontrolApi } from '../../../services/apiClients';
import { persistToken, type TokenJWT } from '../../../services/authSession';

export const authService = {
  login: async (login: string, senha: string) => {
    const token = await webcontrolApi.post<TokenJWT>('/api/v1/login', { login, senha }, { auth: false });
    persistToken(token);
    return token;
  },
};
