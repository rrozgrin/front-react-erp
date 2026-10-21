import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
    FiGrid,
    FiPlus,
    FiShoppingBag,
    FiUploadCloud,
} from "react-icons/fi";
import { formatarDataBR, formatarDataHoraBR } from '@/types/Data';
import { exibirAlertaErroApi } from '@/services/alertas';
import { obterMensagemErroApi } from '@/services/errosApi';
import { converterMoedaBRLParaNumero, formatarMoedaBRL } from '@/utils/formatadores';
import {
    useFood99Lojas,
} from "../../../hooks/useFood99Auth";
import {
    useFood99AddProdutosLocais,
    useFood99ItensCatalogo,
    useFood99Categorias,
    useFood99ConfigurarItem,
    useFood99ProdutosLocaisNaoVinculados,
    useFood99Menus,
    useFood99PublicarCatalogo,
} from "../../../hooks/useFood99Catalog";
import { Food99Shell } from "../../../shared/Food99Shell";
import {
    InlineMessage,
    ActionButton,
    TopActionRow,
} from "./styled";
import {
    estaPublicadoOuNaFila,
    formularioItemVazio,
    type EstadoFormularioItem,
    type StatusItem,
    type VisualizacaoItemCatalogo,
} from './itemCatalogoUtils';
import { ItensCatalogoFiltros } from './ItensCatalogoFiltros';
import { ItensCatalogoMetricas } from './ItensCatalogoMetricas';
import { ItensCatalogoTabela } from './ItensCatalogoTabela';
import { ItemCatalogoModal } from './ItemCatalogoModal';
import { ProdutosLocaisModal } from './ProdutosLocaisModal';
import { useItensCatalogoView } from './useItensCatalogoView';

export const Food99ItensCatalogoPage: React.FC = () => {
    const lojasQuery = useFood99Lojas();
    const loja = lojasQuery.dados?.lojas[0] ?? null;
    const menusQuery = useFood99Menus(loja?.lojaAppId);
    const categoriasQuery = useFood99Categorias(loja?.lojaAppId);
    const itensQuery = useFood99ItensCatalogo(loja?.lojaAppId);
    const configurarItem = useFood99ConfigurarItem();
    const publicar = useFood99PublicarCatalogo();
    const adicionarProdutosLocais = useFood99AddProdutosLocais();
    const [menuSelecionado, setMenuSelecionado] = useState("Todos os cardápios");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(
        "Todas as categorias",
    );
    const [statusSelecionado, setStatusSelecionado] = useState<
        "Todos os status" | StatusItem
    >("Todos os status");
    const [ordenacao, setOrdenacao] = useState("Mais recentes");
    const [busca, setBusca] = useState("");
    const menus = useMemo(() => menusQuery.dados?.menus ?? [], [menusQuery.dados]);
    const categorias = useMemo(() => categoriasQuery.dados?.categorias ?? [], [categoriasQuery.dados]);
    const itens = useMemo(() => itensQuery.dados?.itens ?? [], [itensQuery.dados]);
    const [dadosFormulario, setDadosFormulario] = useState<EstadoFormularioItem>(formularioItemVazio);
    const [itemSelecionado, setItemSelecionado] = useState<VisualizacaoItemCatalogo | null>(
        null,
    );
    const carregando = lojasQuery.carregando || menusQuery.carregando || categoriasQuery.carregando || itensQuery.carregando;
    const salvando = configurarItem.carregando || publicar.carregando;
    const publicando = publicar.carregando ? 'active' : null;
    const [mensagemErro, setMensagemErro] = useState("");
    const [modalProdutosLocaisAberto, setModalProdutosLocaisAberto] = useState(false);
    const [categoriaLocalId, setCategoriaLocalId] = useState("");
    const [buscaLocal, setBuscaLocal] = useState("");
    const [buscaConsultaLocal, setBuscaConsultaLocal] = useState("");
    const [paginaLocal, setPaginaLocal] = useState(1);
    const [idsProdutosLocaisSelecionados, setIdsProdutosLocaisSelecionados] = useState<number[]>([]);
    const produtosLocaisQuery = useFood99ProdutosLocaisNaoVinculados(loja ? {
        app_shop_id: loja.lojaAppId,
        page: paginaLocal,
        per_page: 20,
        search: buscaConsultaLocal || undefined,
        category_id: categoriaLocalId ? Number(categoriaLocalId) : undefined,
    } : undefined, modalProdutosLocaisAberto);
    const produtosLocais = useMemo(() => produtosLocaisQuery.dados?.itens ?? [], [produtosLocaisQuery.dados]);
    const categoriasLocais = useMemo(() => produtosLocaisQuery.dados?.categorias ?? [], [produtosLocaisQuery.dados]);
    const ultimaPaginaLocal = produtosLocaisQuery.dados?.paginacao.ultimaPagina ?? 1;
    const totalLocal = produtosLocaisQuery.dados?.paginacao.total ?? 0;
    const carregandoProdutosLocais = produtosLocaisQuery.carregando || produtosLocaisQuery.atualizando;
    const salvandoProdutosLocais = adicionarProdutosLocais.carregando;
    const erroConsulta = lojasQuery.erro ?? menusQuery.erro ?? categoriasQuery.erro ?? itensQuery.erro
        ?? produtosLocaisQuery.erro ?? configurarItem.erro ?? publicar.erro ?? adicionarProdutosLocais.erro;

    const {
        itensFiltrados,
        categoriasDoMenu,
        ultimaPublicacaoEm,
        quantidadePublicados,
        quantidadeRascunhos,
        quantidadeInativos,
    } = useItensCatalogoView({
        itens,
        categorias,
        menus,
        busca,
        menuSelecionado,
        categoriaSelecionada,
        statusSelecionado,
        ordenacao,
        menuFormularioId: dadosFormulario.menuAppId,
    });

    const editarItem = (item: VisualizacaoItemCatalogo) => {
        const categoriaAppId = item.origem.categoriaAppId ?? "";
        const menuAppId =
            item.origem.menuAppId ?? menus[0]?.menuAppId ?? "";

        setItemSelecionado(item);
        setDadosFormulario({
            menuAppId,
            categoriaAppId,
            nomeItem: item.origem.nome,
            descricaoCurta: item.origem.descricaoCurta ?? "",
            valorPreco: formatarMoedaBRL(
                item.origem.valorPreco,
                item.origem.precoCentavos,
            ),
            ativo: item.origem.ativo,
        });
        setMensagemErro("");
    };

    const fecharModalItem = () => {
        setItemSelecionado(null);
        setDadosFormulario(formularioItemVazio);
    };

    const carregarProdutosLocais = (pagina = paginaLocal, categoriaId = categoriaLocalId) => {
        setPaginaLocal(pagina);
        setCategoriaLocalId(categoriaId);
        setBuscaConsultaLocal(buscaLocal.trim());
    };

    const abrirModalProdutosLocais = async () => {
        if (!loja) {
            setMensagemErro("Nenhuma loja 99Food vinculada ao usuário logado.");
            return;
        }
        setIdsProdutosLocaisSelecionados([]);
        setBuscaLocal("");
        setBuscaConsultaLocal("");
        setCategoriaLocalId("");
        setPaginaLocal(1);
        setModalProdutosLocaisAberto(true);
    };

    const alternarProdutoLocal = (produtoId: number) => {
        setIdsProdutosLocaisSelecionados((atuais) => atuais.includes(produtoId)
            ? atuais.filter((id) => id !== produtoId)
            : [...atuais, produtoId]);
    };

    const salvarProdutosLocais = async () => {
        if (!loja || idsProdutosLocaisSelecionados.length === 0) return;
        try {
            const resposta = await adicionarProdutosLocais.executar({
                app_shop_id: loja.lojaAppId,
                product_ids: idsProdutosLocaisSelecionados,
            });
            await Swal.fire({ icon: "success", title: "Produtos adicionados", text: `${resposta.adicionados} adicionado(s) e ${resposta.ignorados} ignorado(s).`, confirmButtonText: "OK" });
            setModalProdutosLocaisAberto(false);
            await Promise.all([menusQuery.recarregar(), categoriasQuery.recarregar(), itensQuery.recarregar()]);
        } catch (erro) {
            await exibirAlertaErroApi(erro, {
                mensagemPadrao: 'Não foi possível adicionar os produtos à 99Food.',
                detalhar: true,
            });
        }
    };

    const salvarFormularioItem = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!loja || !itemSelecionado) {
            setMensagemErro("Nenhuma loja 99Food vinculada ao usuário logado.");
            return;
        }

        const valorPreco = converterMoedaBRLParaNumero(dadosFormulario.valorPreco);
        const nomeItem = dadosFormulario.nomeItem.trim();

        if (
            !dadosFormulario.menuAppId ||
            !dadosFormulario.categoriaAppId ||
            !nomeItem ||
            valorPreco < 0
        ) {
            setMensagemErro("Informe cardápio, categoria, nome e preço.");
            return;
        }

        try {
            setMensagemErro("");

            const item = await configurarItem.executar({
                app_shop_id: loja.lojaAppId,
                app_item_id: itemSelecionado.origem.itemAppId,
                app_menu_id: dadosFormulario.menuAppId,
                app_category_id: dadosFormulario.categoriaAppId,
                id_produto: itemSelecionado.origem.produtoId,
                id_grade: itemSelecionado.origem.gradeId ?? undefined,
                item_name: nomeItem.slice(0, 50),
                short_desc: dadosFormulario.descricaoCurta.trim() || undefined,
                price_amount: valorPreco,
                is_active: dadosFormulario.ativo,
            });

            await publicar.executar({
                app_shop_id: loja.lojaAppId,
                app_item_ids: [item.itemAppId],
            });

            await Swal.fire({
                icon: "success",
                title: estaPublicadoOuNaFila(itemSelecionado.origem)
                    ? "Item atualizado"
                    : "Item cadastrado",
                text: `${item.nome}.`,
                timer: 2500,
                timerProgressBar: true,
                showConfirmButton: true,
                confirmButtonText: "OK",
            });

            fecharModalItem();
            await Promise.all([menusQuery.recarregar(), categoriasQuery.recarregar(), itensQuery.recarregar()]);
        } catch (erro) {
            setMensagemErro(obterMensagemErroApi(
                erro,
                'Não foi possível salvar o item na 99Food.',
                { detalhar: true },
            ));
            await exibirAlertaErroApi(erro, {
                mensagemPadrao: 'Não foi possível salvar o item na 99Food.',
                detalhar: true,
            });
        }
    };

    return (
        <Food99Shell
            pageTitle="Itens do catálogo"
            pageDescription="Gerencie os itens do catálogo de forma global."
            topCards={[
                {
                    title: "Conectado a 99Food",
                    value: loja?.tokenEncontrado
                        ? `Token válido até ${formatarDataBR(loja.tokenExpiraEm)}`
                        : "Token não encontrado",
                    icon: <FiGrid />,
                },
                {
                    title: "Loja",
                    value: loja?.lojaAppId ?? "-----",
                    icon: <FiShoppingBag />,
                },
                {
                    title: "Última publicação",
                    value: formatarDataHoraBR(ultimaPublicacaoEm),
                    icon: <FiUploadCloud />,
                },
            ]}
        >
            <TopActionRow>
                <div />
                <div>
                    <ActionButton type="button" onClick={() => void abrirModalProdutosLocais()} disabled={carregando || !loja}>
                        <FiPlus /> Adicionar produtos
                    </ActionButton>
                </div>
            </TopActionRow>
            <ItensCatalogoFiltros
                menus={menus}
                categorias={categorias}
                menuSelecionado={menuSelecionado}
                categoriaSelecionada={categoriaSelecionada}
                statusSelecionado={statusSelecionado}
                busca={busca}
                ordenacao={ordenacao}
                onMenuChange={setMenuSelecionado}
                onCategoriaChange={setCategoriaSelecionada}
                onStatusChange={setStatusSelecionado}
                onBuscaChange={setBusca}
                onOrdenacaoChange={setOrdenacao}
            />

            {mensagemErro || erroConsulta ? (
                <InlineMessage $tone="error">{mensagemErro || obterMensagemErroApi(erroConsulta, 'Não foi possível carregar o catálogo da 99Food.')}</InlineMessage>
            ) : null}

            <ItensCatalogoTabela
                itens={itensFiltrados}
                carregando={carregando}
                publicando={publicando !== null}
                onEditar={editarItem}
            />
            <ItensCatalogoMetricas
                total={itensFiltrados.length}
                publicados={quantidadePublicados}
                rascunhos={quantidadeRascunhos}
                inativos={quantidadeInativos}
            />

            {itemSelecionado ? (
                <ItemCatalogoModal
                    item={itemSelecionado}
                    dados={dadosFormulario}
                    menus={menus}
                    categorias={categorias}
                    categoriasDoMenu={categoriasDoMenu}
                    salvando={salvando}
                    onDadosChange={setDadosFormulario}
                    onClose={fecharModalItem}
                    onSubmit={salvarFormularioItem}
                />
            ) : null}

            {modalProdutosLocaisAberto ? (
                <ProdutosLocaisModal
                    produtos={produtosLocais}
                    categorias={categoriasLocais}
                    idsSelecionados={idsProdutosLocaisSelecionados}
                    categoriaId={categoriaLocalId}
                    busca={buscaLocal}
                    pagina={paginaLocal}
                    ultimaPagina={ultimaPaginaLocal}
                    total={totalLocal}
                    carregando={carregandoProdutosLocais}
                    salvando={salvandoProdutosLocais}
                    onClose={() => setModalProdutosLocaisAberto(false)}
                    onSalvar={() => void salvarProdutosLocais()}
                    onCategoriaChange={(valor) => {
                        setCategoriaLocalId(valor);
                        setPaginaLocal(1);
                        carregarProdutosLocais(1, valor);
                    }}
                    onBuscaChange={setBuscaLocal}
                    onBuscar={() => carregarProdutosLocais(1)}
                    onPaginaChange={carregarProdutosLocais}
                    onAlternarProduto={alternarProdutoLocal}
                    onSelecionarIds={setIdsProdutosLocaisSelecionados}
                />
            ) : null}
        </Food99Shell>
    );
};
