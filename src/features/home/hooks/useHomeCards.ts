import { useAsyncQuery } from '../../../hooks/useAsyncQuery';
import { homeService } from '../services/homeService';

export type Compromisso = {
  funcionario: string;
  descricao: string;
  inicio: string;
  fim: string;
};

export type MinhasContasPagar = {
  data_venc: string;
  nome: string;
};

export type Promissoria = {
  data_venc: string;
  nome: string;
  parcela: string;
  valor: string;
};

export type Locacao = {
  data_venc: string;
  nome_cli: string;
};

export function useCompromissosQuery(idCadastro: string) {
  return useAsyncQuery<Compromisso[]>(
    async () => {
      const data = await homeService.buscarCompromissos(idCadastro);
      if (!data?.compromissosHoje) return [];

      const compromissos: Compromisso[] = [];
      const regex = /<a[^>]*class=['"]btnIrAgenda['"][^>]*>(.*?)<\/a>/gs;
      let match;

      while ((match = regex.exec(data.compromissosHoje)) !== null) {
        const content = match[1].replace(/\s+/g, ' ').trim();
        const [cabecalho, detalhes] = content.split('---');
        const [funcionario, descricao] = cabecalho.split('|').map((s) => s.trim());
        const inicioMatch = detalhes?.match(/[IÍií]n[ií]cio:\s*([0-9/ :]+)/);
        const fimMatch = detalhes?.match(/Fim:\s*([0-9/ :]+)/i);

        compromissos.push({
          funcionario: funcionario || '',
          descricao: descricao || '',
          inicio: inicioMatch ? inicioMatch[1] : '',
          fim: fimMatch ? fimMatch[1] : '',
        });
      }

      return compromissos;
    },
    [idCadastro],
    { initialData: [], enabled: Boolean(idCadastro) },
  );
}

export function useContasPagarSemanaQuery(idCadastro: string) {
  return useAsyncQuery<MinhasContasPagar[]>(
    async () => {
      const data = await homeService.buscarContasPagarSemana(idCadastro);
      if (!data?.html) return [];

      const regexLinha = /<tr[^>]*>(.*?)<\/tr>/gs;
      const regexColuna = /<td[^>]*>(.*?)<\/td>/gs;
      const contas: MinhasContasPagar[] = [];
      let linhaMatch;

      while ((linhaMatch = regexLinha.exec(data.html)) !== null) {
        const linha = linhaMatch[1];
        const colunas = [...linha.matchAll(regexColuna)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());

        if (colunas.length >= 2) {
          contas.push({
            data_venc: colunas[0],
            nome: colunas[1],
          });
        }
      }

      return contas;
    },
    [idCadastro],
    { initialData: [], enabled: Boolean(idCadastro) },
  );
}

export function usePromissoriasQuery(idCadastro: string) {
  return useAsyncQuery<Promissoria[]>(
    async () => {
      const html = await homeService.buscarPromissorias(idCadastro);
      const regexLinha = /<tr[^>]*>(.*?)<\/tr>/gs;
      const regexColuna = /<td[^>]*>(.*?)<\/td>/gs;
      const promissorias: Promissoria[] = [];
      let linhaMatch;

      while ((linhaMatch = regexLinha.exec(html)) !== null) {
        const linha = linhaMatch[1];
        const colunas = [...linha.matchAll(regexColuna)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());

        if (colunas.length >= 4 && colunas[0] !== 'Vencimento') {
          promissorias.push({
            data_venc: colunas[0],
            nome: colunas[1],
            parcela: colunas[2],
            valor: colunas[3],
          });
        }
      }

      return promissorias;
    },
    [idCadastro],
    { initialData: [], enabled: Boolean(idCadastro) },
  );
}

export function useLocacoesQuery(idCadastro: string) {
  return useAsyncQuery<Locacao[]>(
    async () => {
      const data = await homeService.buscarLocacoes(idCadastro);
      if (!Array.isArray(data)) return [];

      return data.map((item) => ({
        data_venc: item.data_fim,
        nome_cli: item.nome,
      }));
    },
    [idCadastro],
    { initialData: [], enabled: Boolean(idCadastro) },
  );
}
