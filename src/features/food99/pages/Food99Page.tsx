import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../common/components/Actions/Loading';
import { useFood99Lojas } from '../hooks/useFood99Auth';

export const Food99: React.FC = () => {
    const navigate = useNavigate();
    const lojasQuery = useFood99Lojas();

    useEffect(() => {
        if (lojasQuery.carregando) return;
        const possuiLojaVinculada = lojasQuery.dados?.lojas.some((loja) => Boolean(loja.lojaFood99Id));
        navigate(possuiLojaVinculada ? '/food99/pedidos' : '/food99/autenticacao', { replace: true });
    }, [navigate, lojasQuery.carregando, lojasQuery.dados]);

    return <Loading />;
};
