import React from 'react';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import { PeriodoInput } from '../../../../common/components/Inputs/PeriodoInput';
import { buildClientesMenuSections } from '../shared/clientesMenuSections';

export const RelatorioOcorrencias: React.FC = () => {
    const handleSearch = (inicio: string, fim: string) => {
        console.log('Pesquisar ocorrências de', inicio, 'até', fim);
    };

    return (
        <RelatorioTemplate
            titulo="Relatório de Ocorrências"
            secoes={buildClientesMenuSections()}
            tituloTabela="Ocorrências"
            dados={[]}
            campos={[]}
            mensagemVazia="Nenhuma ocorrência encontrada."
            filtros={<PeriodoInput larguraTotal onChange={handleSearch} />}
            exibirTabela={false}
            configurarColunas={false}
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
    );
};
