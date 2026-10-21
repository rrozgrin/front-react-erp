import React from 'react';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import { PeriodoInput } from '../../../../common/components/Inputs/PeriodoInput';
import { buildFornecedoresMenuSections } from '../shared/fornecedoresMenuSections';

export const RelatorioFornecedoresPage: React.FC = () => {
    const handleSearch = (inicio: string, fim: string) => {
        console.log('Pesquisar fornecedores de', inicio, 'até', fim);
    };

    return (
        <RelatorioTemplate
            titulo="Relatório de Fornecedores"
            secoes={buildFornecedoresMenuSections()}
            tituloTabela="Fornecedores"
            dados={[]}
            campos={[]}
            mensagemVazia="Nenhum fornecedor encontrado."
            filtros={<PeriodoInput larguraTotal onChange={handleSearch} />}
            exibirTabela={false}
            configurarColunas={false}
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
    );
};
