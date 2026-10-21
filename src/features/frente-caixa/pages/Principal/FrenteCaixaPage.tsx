import React, { lazy, Suspense, useState } from 'react';
import { OperacaoComercialPage, frenteCaixaConfig, type OperacaoComercialFinalizacaoProps } from '@/features/operacao-comercial';
import { buscarProdutoPorCodigo } from '@/features/operacao-comercial/data/produtosMock';
import { formatarTotalCompra, frenteCaixaDraftInicial, incluirProdutoNoRascunho } from './frenteCaixaDraft';

const FinalFrenteCaixaModal = lazy(() => import('../Final/FinalFrenteCaixaModal').then(({ FinalFrenteCaixaModal: Component }) => ({ default: Component })));

const renderFinalizacao = (props: OperacaoComercialFinalizacaoProps) => (
    <Suspense fallback={null}>
        <FinalFrenteCaixaModal open {...props} />
    </Suspense>
);

export const FrenteCaixaPage: React.FC = () => {
    const [draft, setDraft] = useState(frenteCaixaDraftInicial);

    return (
        <OperacaoComercialPage
            config={{
                ...frenteCaixaConfig,
                imageSrc: null,
                items: draft.items,
                product: draft.product,
                totalCompra: formatarTotalCompra(draft),
            }}
            onSearchProduto={(codigo) => {
                const produto = buscarProdutoPorCodigo(codigo);
                if (!produto) return false;
                setDraft((current) => incluirProdutoNoRascunho(current, produto));
                return true;
            }}
            onSelectProduto={(produto) => setDraft((current) => incluirProdutoNoRascunho(current, produto))}
            renderFinalizacao={renderFinalizacao}
        />
    );
};
