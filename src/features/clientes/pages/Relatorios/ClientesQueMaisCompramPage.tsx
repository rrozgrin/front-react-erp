import React from 'react';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import {
    clientesMockData,
    defaultClienteExcelColumns,
    defaultClienteSearchFields,
    defaultClienteTableFields,
} from '../shared/clientesListConfig';
import { getClienteReferenceDate } from '../shared/utils';
import { buildClientesMenuSections } from '../shared/clientesMenuSections';

export const ClientesQueMaisCompramPage: React.FC = () => {
    return (
        <RelatorioTemplate
            titulo="Clientes que mais compram"
            secoes={buildClientesMenuSections()}
            tituloTabela="Clientes que mais compram"
            descricaoTabela="Pesquise clientes que mais compram e acompanhe as principais informações do cadastro."
            mensagemVazia="Nenhum cliente que mais compra encontrado para o filtro informado."
            arquivoExcel="clientes_que_mais_compram"
            impressao={{ titulo: 'Clientes Que Mais Compram', subtitulo: 'Relatório de clientes que mais compram', orientacao: 'landscape' }}
            dados={clientesMockData}
            campos={defaultClienteTableFields}
            colunasExcel={defaultClienteExcelColumns}
            camposPesquisa={defaultClienteSearchFields}
            campoData={getClienteReferenceDate}
        />
    );
};
