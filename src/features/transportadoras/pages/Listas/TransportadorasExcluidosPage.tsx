import React from 'react';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import {
    excludedTransportadorasExcelColumns,
    excludedTransportadorasTableFields,
    transportadorasExcluidosMockData,
    defaultTransportadoraSearchFields,
} from '../shared/transportadorasListConfig';
import { getTransportadoraReferenceDate } from '../shared/utils';
import { buildTransportadorasMenuSections } from '../shared/transportadorasMenuSections';

export const TransportadorasExcluidosPage: React.FC = () => {
    return (
        <ListagemTemplate
            titulo="Transportadoras Excluídas"
            secoes={buildTransportadorasMenuSections()}
            tituloTabela="Transportadoras excluídas"
            descricaoTabela="Pesquise transportadoras excluídas e acompanhe as principais informações do cadastro."
            mensagemVazia="Nenhum transportadora excluído encontrado para o filtro informado."
            arquivoExcel="transportadoras_excluidos"
            impressao={{ titulo: 'Transportadoras Excluidos', subtitulo: 'Relatório de transportadoras excluídas', orientacao: 'landscape' }}
            dados={transportadorasExcluidosMockData}
            campos={excludedTransportadorasTableFields}
            colunasExcel={excludedTransportadorasExcelColumns}
            camposPesquisa={defaultTransportadoraSearchFields}
            campoData={getTransportadoraReferenceDate}
            configurarColunas="tabela"
            exportarApenasColunasVisiveis={false}
            menuInicialAberto={false}
            agruparConteudo
        />
    );
};
