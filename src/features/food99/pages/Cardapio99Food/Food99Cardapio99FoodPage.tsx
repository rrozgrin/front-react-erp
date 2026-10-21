import React, { useEffect, useMemo, useState } from "react";
import {
    FiFolder,
    FiGrid,
} from "react-icons/fi";
import { formatarDataHoraBR } from '@/types/Data';
import { obterMensagemErroApi } from '@/services/errosApi';
import { normalizarSlug } from '@/utils/texto';
import {
    useFood99Lojas,
} from "../../hooks/useFood99Auth";
import {
    useFood99ItensCatalogo,
    useFood99Categorias,
    useFood99Menus,
    useFood99UpsertMenu,
} from "../../hooks/useFood99Catalog";
import { Food99Shell } from "../../shared/Food99Shell";
import { InlineMessage } from "./styled";
import { CardapiosFiltros } from './CardapiosFiltros';
import { CardapiosTabela } from './CardapiosTabela';
import { CardapioResumo } from './CardapioResumo';
import { MenuFormularioModal } from './MenuFormularioModal';
import {
    formularioMenuVazio,
    type CardapioItem,
    type EstadoFormularioMenu,
    type StatusCardapio,
} from './cardapioUtils';
import { useCardapiosView } from './useCardapiosView';

export const Food99Cardapio99FoodPage: React.FC = () => {
    const lojasQuery = useFood99Lojas();
    const loja = lojasQuery.dados?.lojas[0] ?? null;
    const menusQuery = useFood99Menus(loja?.lojaAppId);
    const categoriasQuery = useFood99Categorias(loja?.lojaAppId);
    const itensQuery = useFood99ItensCatalogo(loja?.lojaAppId);
    const salvarMenu = useFood99UpsertMenu();
    const [busca, setBusca] = useState("");
    const [status, setStatus] = useState<"Todos os status" | StatusCardapio>(
        "Todos os status",
    );
    const [ordem, setOrdem] = useState<"Ordenar por ordem" | "Nome A-Z">(
        "Ordenar por ordem",
    );
    const [idSelecionado, setIdSelecionado] = useState("");
    const menus = useMemo(() => menusQuery.dados?.menus ?? [], [menusQuery.dados]);
    const categorias = useMemo(() => categoriasQuery.dados?.categorias ?? [], [categoriasQuery.dados]);
    const itensCatalogo = useMemo(() => itensQuery.dados?.itens ?? [], [itensQuery.dados]);
    const [dadosFormulario, setDadosFormulario] = useState<EstadoFormularioMenu>(formularioMenuVazio);
    const [menuIdEmEdicao, setMenuIdEmEdicao] = useState<string | null>(null);
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const carregando = lojasQuery.carregando || menusQuery.carregando || categoriasQuery.carregando || itensQuery.carregando;
    const salvando = salvarMenu.carregando;
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");

    const erroConsulta = lojasQuery.erro ?? menusQuery.erro ?? categoriasQuery.erro ?? itensQuery.erro ?? salvarMenu.erro;

    const {
        itensFiltrados,
        cardapioSelecionado,
        quantidadeAtivos,
        quantidadeInativos,
    } = useCardapiosView({
        menus,
        categorias,
        itensCatalogo,
        busca,
        status,
        ordem,
        idSelecionado,
    });

    useEffect(() => {
        if (!cardapioSelecionado) {
            setIdSelecionado("");
            return;
        }

        setIdSelecionado((atual) =>
            atual === cardapioSelecionado.id ? atual : cardapioSelecionado.id,
        );
    }, [cardapioSelecionado]);

    const criarMenu = () => {
        setMenuIdEmEdicao(null);
        setDadosFormulario(formularioMenuVazio);
        setExibirFormulario(true);
        setMensagemSucesso("");
        setMensagemErro("");
    };

    const editarMenu = (item: CardapioItem) => {
        setMenuIdEmEdicao(item.menuAppId);
        setDadosFormulario({
            menuAppId: item.menuAppId,
            nomeMenu: item.nome,
            ordem: String(item.ordem),
            ativo: item.ativo,
        });
        setExibirFormulario(true);
        setMensagemSucesso("");
        setMensagemErro("");
    };

    const cancelarFormulario = () => {
        setExibirFormulario(false);
        setMenuIdEmEdicao(null);
        setDadosFormulario(formularioMenuVazio);
    };

    const salvarFormularioMenu = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!loja) {
            setMensagemErro("Nenhuma loja 99Food vinculada ao usuário logado.");
            return;
        }

        const nomeMenu = dadosFormulario.nomeMenu.trim();
        const menuAppId = (
            dadosFormulario.menuAppId.trim() || normalizarSlug(nomeMenu)
        ).slice(0, 100);

        if (!nomeMenu || !menuAppId) {
            setMensagemErro("Informe o nome do cardápio.");
            return;
        }

        try {
            setMensagemErro("");
            setMensagemSucesso("");

            const menu = await salvarMenu.executar({
                app_shop_id: loja.lojaAppId,
                app_menu_id: menuAppId,
                menu_name: nomeMenu,
                sort_order: Number(dadosFormulario.ordem) || 0,
                is_active: dadosFormulario.ativo,
            });

            setIdSelecionado(menu.menuAppId);
            setExibirFormulario(false);
            setMenuIdEmEdicao(null);
            setDadosFormulario(formularioMenuVazio);
            setMensagemSucesso(
                menuIdEmEdicao ? "Cardápio atualizado." : "Cardápio cadastrado.",
            );
            await Promise.all([menusQuery.recarregar(), categoriasQuery.recarregar(), itensQuery.recarregar()]);
        } catch (erro) {
            setMensagemErro(obterMensagemErroApi(erro, 'Não foi possível salvar o cardápio da 99Food.'));
        }
    };

    return (
        <Food99Shell
            pageTitle="Cardápio 99Food"
            pageDescription="Gerencie os cardápios da loja e organize as categorias do catálogo."
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
            ]}
        >
            <CardapiosFiltros
                busca={busca}
                status={status}
                ordem={ordem}
                desabilitado={carregando || salvando}
                onBuscaChange={setBusca}
                onStatusChange={setStatus}
                onOrdemChange={setOrdem}
                onNovo={criarMenu}
            />

            {mensagemErro || erroConsulta ? (
                <InlineMessage $tone="error">{mensagemErro || obterMensagemErroApi(erroConsulta, 'Não foi possível carregar os cardápios da 99Food.')}</InlineMessage>
            ) : null}
            {mensagemSucesso ? (
                <InlineMessage $tone="success">{mensagemSucesso}</InlineMessage>
            ) : null}

            <CardapiosTabela
                itens={itensFiltrados}
                carregando={carregando}
                onSelecionar={setIdSelecionado}
                onEditar={editarMenu}
            />

            {cardapioSelecionado ? (
                <CardapioResumo
                    cardapio={cardapioSelecionado}
                    quantidadeAtivos={quantidadeAtivos}
                    quantidadeInativos={quantidadeInativos}
                />
            ) : null}

            {exibirFormulario ? (
                <MenuFormularioModal
                    dados={dadosFormulario}
                    editando={Boolean(menuIdEmEdicao)}
                    salvando={salvando}
                    onDadosChange={setDadosFormulario}
                    onClose={cancelarFormulario}
                    onSubmit={salvarFormularioMenu}
                />
            ) : null}
        </Food99Shell>
    );
};
