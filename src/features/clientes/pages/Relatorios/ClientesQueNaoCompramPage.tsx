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

export const ClientesQueNaoCompramPage: React.FC = () => {
    return (
        <RelatorioTemplate
            titulo="Clientes que não compram"
            secoes={buildClientesMenuSections()}
            tituloTabela="Clientes que não compram"
            descricaoTabela="Pesquise clientes que não compram e acompanhe as principais informações do cadastro."
            mensagemVazia="Nenhum cliente que não compra encontrado para o filtro informado."
            arquivoExcel="clientes_que_nao_compram"
            impressao={{ titulo: 'Clientes Que Não Compram', subtitulo: 'Relatório de clientes que não compram', orientacao: 'landscape' }}
            dados={clientesMockData}
            campos={defaultClienteTableFields}
            colunasExcel={defaultClienteExcelColumns}
            camposPesquisa={defaultClienteSearchFields}
            campoData={getClienteReferenceDate}
        />
    );
};
