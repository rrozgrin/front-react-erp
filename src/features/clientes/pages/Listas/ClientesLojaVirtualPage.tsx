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

export const ClientesLojaVirtualPage: React.FC = () => {
    return (
        <ListagemTemplate
            titulo="Clientes Loja Virtual"
            secoes={buildClientesMenuSections()}
            tituloTabela="Clientes Loja Virtual"
            descricaoTabela="Pesquise clientes da loja virtual e acompanhe as principais informações do cadastro."
            mensagemVazia="Nenhum cliente da loja virtual encontrado para o filtro informado."
            arquivoExcel="clientes_loja_virtual"
            impressao={{ titulo: 'Clientes Loja Virtual', subtitulo: 'Relatório de clientes da loja virtual', orientacao: 'landscape' }}
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
