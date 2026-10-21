import React, { useEffect, useState } from 'react';
import { FiCopy, FiExternalLink, FiLink, FiRefreshCw, FiShoppingBag } from 'react-icons/fi';
import { Food99Shell } from '../../shared/Food99Shell';
import { obterMensagemErroApi } from '@/services/errosApi';
import {
    useFood99GerarUrlAutorizacao,
    useFood99GetToken,
    useFood99TokenLocal,
    useFood99Lojas,
    type Food99Loja,
    type Food99UrlAutorizacaoResponse,
} from '../../hooks/useFood99Auth';
import {
    ActionButton,
    ActionsRow,
    AuthCard,
    AuthContent,
    AuthIcon,
    AuthLayout,
    Field,
    FieldGrid,
    FormInput,
    FormSelect,
    HelpCard,
    HelpStep,
    InfoNotice,
    LinkBox,
    LinkInput,
    LinkLabel,
    LinkPreviewBlock,
} from './styled';

export const Food99AutenticacaoPage: React.FC = () => {
    const lojasQuery = useFood99Lojas();
    const gerarUrlAutorizacao = useFood99GerarUrlAutorizacao();
    const obterToken = useFood99GetToken();
    const [copiado, setCopiado] = useState(false);
    const [lojaSelecionada, setLojaSelecionada] = useState<Food99Loja | null>(null);
    const [lojaAppId, setLojaAppId] = useState('');
    const [nomeLoja, setNomeLoja] = useState('');
    const [dadosAutorizacao, setDadosAutorizacao] = useState<Food99UrlAutorizacaoResponse | null>(null);
    const [mensagemErro, setMensagemErro] = useState('');
    const [inicializado, setInicializado] = useState(false);
    const tokenLocalQuery = useFood99TokenLocal(lojaSelecionada?.tokenEncontrado ? lojaAppId : undefined);
    const lojas = lojasQuery.dados?.lojas ?? [];
    const tokenLocal = tokenLocalQuery.dados ?? null;
    const carregando = lojasQuery.carregando || gerarUrlAutorizacao.carregando;
    const atualizando = obterToken.carregando;
    const erroConsulta = lojasQuery.erro ?? tokenLocalQuery.erro ?? gerarUrlAutorizacao.erro ?? obterToken.erro;

    const urlAutorizacaoAtual = dadosAutorizacao?.urlAutorizacao ?? '';
    const tokenEncontrado = Boolean(tokenLocal?.tokenEncontrado || lojaSelecionada?.tokenEncontrado);
    const possuiIdentificacaoLoja = Boolean(lojaAppId.trim() && nomeLoja.trim());
    const exibirGerarLink = inicializado && possuiIdentificacaoLoja;
    const exibirObterToken = Boolean(urlAutorizacaoAtual) && !tokenEncontrado;

    useEffect(() => {
        if (inicializado || lojasQuery.carregando) return;
        const primeiraLoja = lojas[0] ?? null;
        setLojaSelecionada(primeiraLoja);
        setLojaAppId(primeiraLoja?.lojaAppId ?? '');
        setNomeLoja(primeiraLoja?.nome ?? '');
        setInicializado(true);
    }, [inicializado, lojas, lojasQuery.carregando]);

    const alterarLoja = (valor: string) => {
        const loja = lojas.find((item) => item.lojaAppId === valor) ?? null;
        setDadosAutorizacao(null);
        setLojaSelecionada(loja);
        setLojaAppId(loja?.lojaAppId ?? '');
        setNomeLoja(loja?.nome ?? '');
    };

    const gerarLink = async () => {
        try {
            setMensagemErro('');
            const resposta = await gerarUrlAutorizacao.executar({ app_shop_id: lojaAppId, shop_name: nomeLoja });
            setDadosAutorizacao(resposta);
            setLojaSelecionada(resposta.loja);
            setLojaAppId(resposta.lojaAppId);
            setNomeLoja(resposta.loja?.nome ?? nomeLoja);
        } catch (erro) {
            setMensagemErro(obterMensagemErroApi(erro, 'Não foi possível gerar o link da 99Food.'));
        }
    };

    const atualizarStatus = async () => {
        try {
            setMensagemErro('');
            const token = await obterToken.executar(lojaAppId);
            setLojaSelecionada(token.loja ?? lojaSelecionada);
        } catch (erro) {
            setMensagemErro(obterMensagemErroApi(erro, 'Não foi possível obter o token da 99Food.'));
        }
    };

    const copiarLink = async () => {
        if (!urlAutorizacaoAtual) return;
        try {
            await navigator.clipboard.writeText(urlAutorizacaoAtual);
            setCopiado(true);
            window.setTimeout(() => setCopiado(false), 1800);
        } catch (erro) {
            console.error('Não foi possível copiar o link de autenticação.', erro);
        }
    };

    return (
        <Food99Shell pageTitle="Autenticação" pageDescription="Conecte sua loja à 99Food.">
            <AuthLayout>
                <AuthCard>
                    <AuthIcon><FiShoppingBag /></AuthIcon>
                    <AuthContent>
                        <h2>Conecte sua loja à 99Food</h2>
                        <p>Autorize a integração para enviar seu catálogo e receber pedidos diretamente no WebControl.</p>
                    </AuthContent>
                    <Field>
                        <label htmlFor="food99-shop">Loja vinculada</label>
                        <FormSelect id="food99-shop" value={lojaSelecionada?.lojaAppId ?? ''} onChange={(event) => alterarLoja(event.target.value)} disabled={carregando}>
                            <option value="">Nova loja</option>
                            {lojas.map((loja) => <option key={loja.lojaAppId} value={loja.lojaAppId}>{loja.nome || loja.lojaAppId}</option>)}
                        </FormSelect>
                    </Field>
                    <FieldGrid>
                        <Field>
                            <label htmlFor="food99-app-shop-id">Identificador da loja</label>
                        <FormInput id="food99-app-shop-id" value={lojaAppId} maxLength={255} disabled={carregando} onChange={(event) => { setDadosAutorizacao(null); setLojaAppId(event.target.value); }} />
                        </Field>
                        <Field>
                            <label htmlFor="food99-shop-name">Nome da loja</label>
                        <FormInput id="food99-shop-name" value={nomeLoja} maxLength={255} disabled={carregando} onChange={(event) => { setDadosAutorizacao(null); setNomeLoja(event.target.value); }} />
                        </Field>
                    </FieldGrid>
                    {exibirGerarLink ? (
                        <ActionsRow>
                            <ActionButton type="button" onClick={gerarLink} disabled={carregando}><FiLink />{carregando ? 'Gerando...' : 'Gerar link'}</ActionButton>
                            {exibirObterToken ? <ActionButton type="button" onClick={atualizarStatus} $variant="secondary" disabled={atualizando}><FiRefreshCw />{atualizando ? 'Obtendo...' : 'Obter token'}</ActionButton> : null}
                        </ActionsRow>
                    ) : null}
                    {!inicializado ? <InfoNotice>Validando acesso à integração...</InfoNotice> : null}
                    {mensagemErro || erroConsulta ? <InfoNotice $tone="error">{mensagemErro || obterMensagemErroApi(erroConsulta, 'Não foi possível comunicar com a API da 99Food.')}</InfoNotice> : null}
                    {tokenEncontrado ? <InfoNotice $tone="success">Token encontrado para esta loja.</InfoNotice> : null}
                    {urlAutorizacaoAtual ? (
                        <LinkPreviewBlock>
                            <LinkLabel>Link de autorização</LinkLabel>
                            <LinkBox>
                                <LinkInput>{urlAutorizacaoAtual}</LinkInput>
                                <ActionButton type="button" onClick={copiarLink} $variant="secondary"><FiCopy />{copiado ? 'Copiado' : 'Copiar'}</ActionButton>
                                <ActionButton type="button" onClick={() => window.open(urlAutorizacaoAtual, '_blank', 'noopener,noreferrer')} $variant="secondary"><FiExternalLink />Abrir</ActionButton>
                            </LinkBox>
                        </LinkPreviewBlock>
                    ) : null}
                </AuthCard>
                <HelpCard>
                    <h3>Como funciona</h3>
                    <HelpStep><span>1</span>Selecione a loja que deseja integrar.</HelpStep>
                    <HelpStep><span>2</span>Autorize o acesso na plataforma 99Food.</HelpStep>
                    <HelpStep><span>3</span>Configure e publique o seu catálogo.</HelpStep>
                </HelpCard>
            </AuthLayout>
        </Food99Shell>
    );
};
