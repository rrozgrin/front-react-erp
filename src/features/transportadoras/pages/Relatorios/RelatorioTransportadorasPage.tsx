import React from 'react';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import { PeriodoInput } from '../../../../common/components/Inputs/PeriodoInput';
import { buildTransportadorasMenuSections } from '../shared/transportadorasMenuSections';

export const RelatorioTransportadorasPage: React.FC = () => {
    const handleSearch = (inicio: string, fim: string) => {
        console.log('Pesquisar fornecedores de', inicio, 'até', fim);
    };

    return (
        <RelatorioTemplate
            titulo="Relatório de Transportadoras"
            secoes={buildTransportadorasMenuSections()}
            tituloTabela="Transportadoras"
            dados={[]}
            campos={[]}
            mensagemVazia="Nenhuma transportadora encontrada."
            filtros={<PeriodoInput larguraTotal onChange={handleSearch} />}
            exibirTabela={false}
            configurarColunas={false}
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
    );
};
