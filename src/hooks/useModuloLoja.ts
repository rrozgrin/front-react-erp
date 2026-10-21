import { useState } from 'react';
import { useVerificarLiberacaoLojaMutation } from './lojaVirtual/useLojaVirtualMutations';

export function useModuloLoja() {
  const [open, setOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');
  const [preco, setPreco] = useState<string>('');
  const { mutate: verificarLiberacaoModulo } = useVerificarLiberacaoLojaMutation();

  async function verificarLiberacao(url: string) {
    try {
      const data = await verificarLiberacaoModulo();

      if (!data.status) {
        setPreco(data.preco ?? '');
        setRedirectTo(url);
        setOpen(true);
        return;
      }

      window.location.href = url;
    } catch (err) {
      console.error('Erro ao verificar liberação:', err);
      alert('Erro ao comunicar com o servidor.');
    }
  }

  return {
    open,
    setOpen,
    redirectTo,
    verificarLiberacao,
    preco,
  };
}
