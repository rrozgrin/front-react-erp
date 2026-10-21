import React from 'react';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import {
    defaultFuncionariosTableFields,
    funcionariosMockData,
} from '../../data/funcionariosListConfig';

export const RelatorioFuncionariosImpressaoPage: React.FC = () => (
    <RelatorioTemplate
        titulo="Impressão do Relatório de Funcionários"
        tituloTabela="Relatório de Funcionários"
        descricaoTabela="Resultado do relatório gerado."
        dados={funcionariosMockData}
        campos={defaultFuncionariosTableFields}
        mensagemVazia="Nenhum funcionário encontrado."
        configurarColunas={false}
        impressao={false}
        exibirAcoesFlutuantes={false}
    />
);
