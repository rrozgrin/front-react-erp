import { formatarDataBR } from '@/types/Data';
import { formatarMoedaBRL } from '@/utils/formatadores';
import type {
    Food99Categoria,
    Food99ItemCatalogo,
    Food99Menu,
} from '../../../hooks/useFood99Catalog';

export type StatusItem = 'Publicado' | 'Rascunho' | 'Na fila' | 'Inativo';

export interface EstadoFormularioItem {
    menuAppId: string;
    categoriaAppId: string;
    nomeItem: string;
    descricaoCurta: string;
    valorPreco: string;
    ativo: boolean;
}

export interface VisualizacaoItemCatalogo {
    id: string;
    origem: Food99ItemCatalogo;
    nome: string;
    categoria: string;
    cardapio: string;
    preco: string;
    status: StatusItem;
    ultimaPublicacao: string;
    ativo: boolean;
    tomMiniatura: string;
}

export const formularioItemVazio: EstadoFormularioItem = {
    menuAppId: '',
    categoriaAppId: '',
    nomeItem: '',
    descricaoCurta: '',
    valorPreco: '',
    ativo: true,
};

export const estaPublicadoOuNaFila = (item: Food99ItemCatalogo): boolean =>
    item.statusPublicacao === 'published' || item.statusPublicacao === 'queued';

export const montarItensCatalogo = (
    itens: Food99ItemCatalogo[],
    categorias: Food99Categoria[],
    menus: Food99Menu[],
): VisualizacaoItemCatalogo[] => {
    void categorias;
    void menus;

    const obterChaveNegocio = (item: Food99ItemCatalogo): string =>
        `${item.produtoId}:${item.gradeId ?? 'null'}`;
    const obterPrioridadeStatus = (item: Food99ItemCatalogo): number => {
        if (item.statusPublicacao === 'published') return 3;
        if (item.statusPublicacao === 'queued') return 2;
        if (item.statusPublicacao === 'draft') return 1;
        return 0;
    };
    const obterStatus = (item: Food99ItemCatalogo): StatusItem => {
        if (!item.ativo) return 'Inativo';
        if (item.statusPublicacao === 'queued') return 'Na fila';
        return item.statusPublicacao === 'published' ? 'Publicado' : 'Rascunho';
    };

    const itensSemDuplicidade = itens.reduce<Food99ItemCatalogo[]>((acumulador, item) => {
        const indice = acumulador.findIndex(
            (atual) => obterChaveNegocio(atual) === obterChaveNegocio(item),
        );

        if (indice === -1) {
            acumulador.push(item);
            return acumulador;
        }

        const atual = acumulador[indice];
        const atualAlteradoEm = atual.alteradoEm ?? atual.criadoEm ?? '';
        const proximoAlteradoEm = item.alteradoEm ?? item.criadoEm ?? '';

        if (
            obterPrioridadeStatus(item) > obterPrioridadeStatus(atual)
            || (obterPrioridadeStatus(item) === obterPrioridadeStatus(atual)
                && proximoAlteradoEm > atualAlteradoEm)
        ) {
            acumulador[indice] = item;
        }

        return acumulador;
    }, []);

    return itensSemDuplicidade.map((item) => ({
        id: obterChaveNegocio(item),
        origem: item,
        nome: item.nome,
        categoria: item.nomeCategoria ?? '-',
        cardapio: item.nomeMenu ?? '-',
        preco: formatarMoedaBRL(item.valorPreco, item.precoCentavos),
        status: obterStatus(item),
        ultimaPublicacao: formatarDataBR(item.ultimaPublicacaoEm),
        ativo: item.ativo,
        tomMiniatura: item.imagemPrincipal
            ? `url("${item.imagemPrincipal}") center / cover`
            : 'linear-gradient(135deg, #f59e0b, #fde68a)',
    }));
};
