import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type QueryKeyPart = string | number | boolean | null | undefined;
export type ConsultaApiKey = readonly QueryKeyPart[];

export interface ConsultaApiContexto {
    signal: AbortSignal;
}

export interface UseConsultaApiOptions<TData> {
    chave: ConsultaApiKey;
    consultar: (contexto: ConsultaApiContexto) => Promise<TData>;
    habilitada?: boolean;
    tempoValidade?: number;
    intervaloAtualizacao?: number;
    manterDadosAnteriores?: boolean;
}

export interface ResultadoConsultaApi<TData> {
    dados: TData | undefined;
    carregando: boolean;
    atualizando: boolean;
    erro: unknown | null;
    recarregar: () => Promise<TData | undefined>;
}

type CacheEntry<TData> = { dados: TData; atualizadoEm: number };
type RequisicaoEmAndamento<TData> = {
    controller: AbortController;
    consumidores: number;
    promise: Promise<TData>;
    cancelamentoAgendado?: ReturnType<typeof setTimeout>;
};

const cache = new Map<string, CacheEntry<unknown>>();
const requisicoes = new Map<string, RequisicaoEmAndamento<unknown>>();

const serializarChave = (chave: ConsultaApiKey) => JSON.stringify(chave);

function obterConsulta<TData>(
    chave: string,
    consultar: (contexto: ConsultaApiContexto) => Promise<TData>,
): { promise: Promise<TData>; liberar: () => void } {
    let requisicao = requisicoes.get(chave) as RequisicaoEmAndamento<TData> | undefined;

    if (!requisicao) {
        const controller = new AbortController();
        let novaRequisicao: RequisicaoEmAndamento<TData>;
        const promise = consultar({ signal: controller.signal }).then((dados) => {
            cache.set(chave, { dados, atualizadoEm: Date.now() });
            return dados;
        }).finally(() => {
            if (requisicoes.get(chave) === novaRequisicao) {
                requisicoes.delete(chave);
            }
        });
        novaRequisicao = { controller, consumidores: 0, promise };
        requisicoes.set(chave, novaRequisicao);
        requisicao = novaRequisicao;
    }

    requisicao.consumidores += 1;
    if (requisicao.cancelamentoAgendado) {
        clearTimeout(requisicao.cancelamentoAgendado);
        requisicao.cancelamentoAgendado = undefined;
    }
    let liberada = false;

    return {
        promise: requisicao.promise,
        liberar: () => {
            if (liberada) return;
            liberada = true;
            requisicao.consumidores -= 1;
            if (requisicao.consumidores === 0 && requisicoes.get(chave) === requisicao) {
                requisicao.cancelamentoAgendado = setTimeout(() => {
                    if (requisicao.consumidores === 0 && requisicoes.get(chave) === requisicao) {
                        requisicao.controller.abort();
                    }
                }, 0);
            }
        },
    };
}

export function invalidarConsultaApi(chave?: ConsultaApiKey): void {
    if (!chave) {
        cache.clear();
        requisicoes.forEach((requisicao) => {
            if (requisicao.cancelamentoAgendado) clearTimeout(requisicao.cancelamentoAgendado);
            requisicao.controller.abort();
        });
        requisicoes.clear();
        return;
    }

    const chaveSerializada = serializarChave(chave);
    const prefixo = `${chaveSerializada.slice(0, -1)},`;
    cache.forEach((_, chaveCache) => {
        if (chaveCache === chaveSerializada || chaveCache.startsWith(prefixo)) {
            cache.delete(chaveCache);
        }
    });
    requisicoes.forEach((requisicao, chaveRequisicao) => {
        if (chaveRequisicao === chaveSerializada || chaveRequisicao.startsWith(prefixo)) {
            if (requisicao.cancelamentoAgendado) clearTimeout(requisicao.cancelamentoAgendado);
            requisicao.controller.abort();
            requisicoes.delete(chaveRequisicao);
        }
    });
}

export function useConsultaApi<TData>({
    chave,
    consultar,
    habilitada = true,
    tempoValidade = 0,
    intervaloAtualizacao,
    manterDadosAnteriores = true,
}: UseConsultaApiOptions<TData>): ResultadoConsultaApi<TData> {
    const chaveSerializada = useMemo(() => serializarChave(chave), [chave]);
    const consultarRef = useRef(consultar);
    const versaoRef = useRef(0);
    const liberacoesRef = useRef(new Set<() => void>());
    const [estado, setEstado] = useState<ResultadoConsultaApi<TData>>({
        dados: undefined,
        carregando: habilitada,
        atualizando: false,
        erro: null,
        recarregar: async (): Promise<TData | undefined> => undefined,
    });

    consultarRef.current = consultar;

    const executar = useCallback(async (forcar = false): Promise<TData | undefined> => {
        if (!habilitada) return undefined;

        const itemCache = cache.get(chaveSerializada) as CacheEntry<TData> | undefined;
        const cacheValido = itemCache && !forcar && Date.now() - itemCache.atualizadoEm < tempoValidade;
        if (cacheValido) {
            setEstado((atual) => ({ ...atual, dados: itemCache.dados, carregando: false, atualizando: false, erro: null }));
            return itemCache.dados;
        }

        const versao = ++versaoRef.current;
        setEstado((atual) => ({
            ...atual,
            dados: manterDadosAnteriores ? atual.dados ?? itemCache?.dados : undefined,
            carregando: !atual.dados && !itemCache?.dados,
            atualizando: Boolean(atual.dados ?? itemCache?.dados),
            erro: null,
        }));

        const { promise, liberar } = obterConsulta(chaveSerializada, consultarRef.current);
        liberacoesRef.current.add(liberar);
        try {
            const dados = await promise;
            if (versao === versaoRef.current) {
                setEstado((atual) => ({ ...atual, dados, carregando: false, atualizando: false, erro: null }));
            }
            return dados;
        } catch (erro) {
            if (versao === versaoRef.current && (erro as { name?: string }).name !== 'AbortError') {
                setEstado((atual) => ({ ...atual, carregando: false, atualizando: false, erro }));
            }
            return undefined;
        } finally {
            liberacoesRef.current.delete(liberar);
            liberar();
        }
    }, [chaveSerializada, habilitada, manterDadosAnteriores, tempoValidade]);

    useEffect(() => {
        if (!habilitada) {
            setEstado((atual) => ({ ...atual, carregando: false, atualizando: false }));
            return undefined;
        }
        void executar();
        return () => {
            versaoRef.current += 1;
            liberacoesRef.current.forEach((liberar) => liberar());
            liberacoesRef.current.clear();
        };
    }, [executar, habilitada]);

    useEffect(() => {
        if (!habilitada || !intervaloAtualizacao) return undefined;
        const intervalo = window.setInterval(() => {
            if (!document.hidden) void executar(true);
        }, intervaloAtualizacao);
        return () => window.clearInterval(intervalo);
    }, [executar, habilitada, intervaloAtualizacao]);

    return useMemo(() => ({ ...estado, recarregar: () => executar(true) }), [estado, executar]);
}
