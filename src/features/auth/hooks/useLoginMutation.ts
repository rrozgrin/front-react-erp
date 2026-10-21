import { useAsyncMutation } from '../../../hooks/useAsyncMutation';
import { authService } from '../services/authService';

export type LoginPayload = {
  codigo: string;
  senha: string;
};

export function useLoginMutation() {
  return useAsyncMutation<LoginPayload, Awaited<ReturnType<typeof authService.login>>>(({ codigo, senha }) => authService.login(codigo, senha));
}
