import React, { useEffect, useMemo, useState } from "react";
import {
    FiFolder,
    FiGrid,
    FiUploadCloud,
} from "react-icons/fi";
import { formatarDataHoraBR } from '@/types/Data';
import { obterMensagemErroApi } from '@/services/errosApi';
import { normalizarSlug } from '@/utils/texto';
import {
    useFood99Lojas,
} from "../../../hooks/useFood99Auth";
import {
    useFood99ItensCatalogo,
    useFood99Categorias,
    useFood99Menus,
    useFood99UpsertCategoria,
    type Food99Categoria,
} from "../../../hooks/useFood99Catalog";
import { Food99Shell } from "../../../shared/Food99Shell";
import { InlineMessage } from "./styled";
import { CatalogoFiltros } from './CatalogoFiltros';
import { CategoriasCatalogoLista } from './CategoriasCatalogoLista';
import { CategoriaFormularioModal } from './CategoriaFormularioModal';
import {
    formularioCategoriaVazio,
    type EstadoFormularioCategoria,
    type StatusCatalogo,
} from './catalogoUtils';
import { useCategoriasCatalogoView } from './useCategoriasCatalogoView';

export const Food99CatalogoPage: React.FC = () => {
    const lojasQuery = useFood99Lojas();
    const loja = lojasQuery.dados?.lojas[0] ?? null;
    const menusQuery = useFood99Menus(loja?.lojaAppId);
    const categoriasQuery = useFood99Categorias(loja?.lojaAppId);
    const itensQuery = useFood99ItensCatalogo(loja?.lojaAppId);
    const salvarCategoria = useFood99UpsertCategoria();
    const [menuSelecionado, setMenuSelecionado] = useState("Todos os cardápios");
    const [busca, setBusca] = useState("");
    const [status, setStatus] = useState<"Todos os status" | StatusCatalogo>(
        "Todos os status",
    );
    const [ordenacao, setOrdenacao] = useState("Ordenar por ordem");
    const [idsExpandidos, setIdsExpandidos] = useState<Set<string>>(new Set());
    const menus = useMemo(() => menusQuery.dados?.menus ?? [], [menusQuery.dados]);
    const categorias = useMemo(() => categoriasQuery.dados?.categorias ?? [], [categoriasQuery.dados]);
    const itens = useMemo(() => itensQuery.dados?.itens ?? [], [itensQuery.dados]);
    const [dadosFormulario, setDadosFormulario] = useState<EstadoFormularioCategoria>(formularioCategoriaVazio);
    const [categoriaIdEmEdicao, setCategoriaIdEmEdicao] = useState<string | null>(
        null,
    );
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const carregando = lojasQuery.carregando || menusQuery.carregando || categoriasQuery.carregando || itensQuery.carregando;
    const salvando = salvarCategoria.carregando;
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");

    const erroConsulta = lojasQuery.erro ?? menusQuery.erro ?? categoriasQuery.erro ?? itensQuery.erro ?? salvarCategoria.erro;

    useEffect(() => {
        setIdsExpandidos((atuais) => atuais.size
            ? atuais
            : new Set(categorias.map((categoria) => categoria.categoriaAppId)));
    }, [categorias]);

    const primeiroMenu = menus[0] ?? null;
    const { categoriasFiltradas, ultimaPublicacaoEm } = useCategoriasCatalogoView({
        categorias,
        itens,
        idsExpandidos,
        busca,
        menuSelecionado,
        status,
        ordenacao,
    });

    const alternarCategoria = (categoriaId: string) => {
        setIdsExpandidos((atuais) => {
            const proximos = new Set(atuais);
            if (proximos.has(categoriaId)) {
                proximos.delete(categoriaId);
            } else {
                proximos.add(categoriaId);
            }
            return proximos;
        });
    };

    const criarCategoria = () => {
        setCategoriaIdEmEdicao(null);
        setDadosFormulario({ ...formularioCategoriaVazio, menuAppId: primeiroMenu?.menuAppId ?? "" });
        setExibirFormulario(true);
        setMensagemErro("");
        setMensagemSucesso("");
    };

    const editarCategoria = (categoria: Food99Categoria) => {
        setCategoriaIdEmEdicao(categoria.categoriaAppId);
        setDadosFormulario({
            menuAppId: categoria.menuAppId ?? primeiroMenu?.menuAppId ?? "",
            categoriaAppId: categoria.categoriaAppId,
            nomeCategoria: categoria.nome,
            ordem: String(categoria.ordem),
            ativo: categoria.ativo,
        });
        setExibirFormulario(true);
        setMensagemErro("");
        setMensagemSucesso("");
    };

    const salvarFormularioCategoria = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!loja) {
            setMensagemErro("Nenhuma loja 99Food vinculada ao usuário logado.");
            return;
        }

        const nomeCategoria = dadosFormulario.nomeCategoria.trim();
        const categoriaAppId = (
            dadosFormulario.categoriaAppId.trim() || normalizarSlug(nomeCategoria)
        ).slice(0, 100);

        if (!dadosFormulario.menuAppId || !nomeCategoria || !categoriaAppId) {
            setMensagemErro("Informe cardápio, nome e ID da categoria.");
            return;
        }

        try {
            setMensagemErro("");
            setMensagemSucesso("");

            const categoria = await salvarCategoria.executar({
                app_shop_id: loja.lojaAppId,
                app_menu_id: dadosFormulario.menuAppId,
                app_category_id: categoriaAppId,
                category_name: nomeCategoria,
                sort_order: Number(dadosFormulario.ordem) || 0,
                is_active: dadosFormulario.ativo,
            });

            setIdsExpandidos(
                (atuais) => new Set([...atuais, categoria.categoriaAppId]),
            );
            setExibirFormulario(false);
            setCategoriaIdEmEdicao(null);
            setDadosFormulario(formularioCategoriaVazio);
            setMensagemSucesso(
                categoriaIdEmEdicao
                    ? "Categoria atualizada."
                    : "Categoria cadastrada.",
            );
            await Promise.all([menusQuery.recarregar(), categoriasQuery.recarregar(), itensQuery.recarregar()]);
        } catch (erro) {
            setMensagemErro(obterMensagemErroApi(erro, 'Não foi possível salvar a categoria na 99Food.'));
        }
    };

    return (
        <Food99Shell
            pageTitle="Catálogo"
            pageDescription="Gerencie categorias e itens do seu cardápio na 99Food."
            topCards={[
                {
                    title: "Conectado a 99Food",
                    value: loja?.tokenEncontrado
                        ? `Token válido até ${formatarDataHoraBR(loja.tokenExpiraEm)}`
                        : "Token não encontrado",
                    icon: <FiGrid />,
                },
                {
                    title: "Loja",
                    value: loja?.lojaAppId ?? "-----",
                    icon: <FiFolder />,
                },
                {
                    title: "Última publicação",
                    value: formatarDataHoraBR(ultimaPublicacaoEm),
                    icon: <FiUploadCloud />,
                },
            ]}
        >
            <CatalogoFiltros
                menus={menus}
                menuSelecionado={menuSelecionado}
                busca={busca}
                status={status}
                ordenacao={ordenacao}
                desabilitado={carregando || salvando || !menus.length}
                onMenuChange={setMenuSelecionado}
                onBuscaChange={setBusca}
                onStatusChange={setStatus}
                onOrdenacaoChange={setOrdenacao}
                onNovaCategoria={criarCategoria}
            />

            {mensagemErro || erroConsulta ? (
                <InlineMessage $tone="error">{mensagemErro || obterMensagemErroApi(erroConsulta, 'Não foi possível carregar o catálogo da 99Food.')}</InlineMessage>
            ) : null}
            {mensagemSucesso ? (
                <InlineMessage $tone="success">{mensagemSucesso}</InlineMessage>
            ) : null}

            <CategoriasCatalogoLista
                categorias={categoriasFiltradas}
                carregando={carregando}
                onAlternar={alternarCategoria}
                onEditar={editarCategoria}
            />

            {exibirFormulario ? (
                <CategoriaFormularioModal
                    dados={dadosFormulario}
                    menus={menus}
                    editando={Boolean(categoriaIdEmEdicao)}
                    salvando={salvando}
                    onDadosChange={setDadosFormulario}
                    onClose={() => setExibirFormulario(false)}
                    onSubmit={salvarFormularioCategoria}
                />
            ) : null}
        </Food99Shell>
    );
};
