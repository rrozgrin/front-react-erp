import React from 'react';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import {
    clientesMockData,
    defaultClienteExcelColumns,
    defaultClienteSearchFields,
    defaultClienteTableFields,
} from '../shared/clientesListConfig';
import { getClienteReferenceDate } from '../shared/utils';
import { buildClientesMenuSections } from '../shared/clientesMenuSections';

export const ClientesPorLotePage: React.FC = () => {
    return (
        <ListagemTemplate
            titulo="Clientes Por Lote"
            secoes={buildClientesMenuSections()}
            tituloTabela="Clientes Por Lote"
            descricaoTabela="Pesquise clientes por lote e acompanhe as principais informações do cadastro."
            mensagemVazia="Nenhum cliente por lote encontrado para o filtro informado."
            arquivoExcel="clientes_por_lote"
            impressao={{ titulo: 'Clientes Por Lote', subtitulo: 'Relatório de clientes por lote', orientacao: 'landscape' }}
            dados={clientesMockData}
            campos={defaultClienteTableFields}
            colunasExcel={defaultClienteExcelColumns}
            camposPesquisa={defaultClienteSearchFields}
            campoData={getClienteReferenceDate}
            configurarColunas="tabela"
            exportarApenasColunasVisiveis={false}
            menuInicialAberto={false}
            agruparConteudo
        />
    );
};
