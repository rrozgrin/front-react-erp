import React from 'react';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import {
    excludedFornecedoresExcelColumns,
    excludedFornecedoresTableFields,
    fornecedoresExcluidosMockData,
    defaultFornecedorSearchFields,
} from '../shared/fornecedoresListConfig';
import { getFornecedorReferenceDate } from '../shared/utils';
import { buildFornecedoresMenuSections } from '../shared/fornecedoresMenuSections';

export const FornecedoresExcluidosPage: React.FC = () => {
    return (
        <ListagemTemplate
            titulo="Fornecedores Excluídos"
            secoes={buildFornecedoresMenuSections()}
            tituloTabela="Fornecedores excluídos"
            descricaoTabela="Pesquise fornecedores excluídos e acompanhe as principais informações do cadastro."
            mensagemVazia="Nenhum fornecedor excluído encontrado para o filtro informado."
            arquivoExcel="fornecedores_excluidos"
            impressao={{ titulo: 'Fornecedores Excluidos', subtitulo: 'Relatório de fornecedores excluídos', orientacao: 'landscape' }}
            dados={fornecedoresExcluidosMockData}
            campos={excludedFornecedoresTableFields}
            colunasExcel={excludedFornecedoresExcelColumns}
            camposPesquisa={defaultFornecedorSearchFields}
            campoData={getFornecedorReferenceDate}
            configurarColunas="tabela"
            exportarApenasColunasVisiveis={false}
            menuInicialAberto={false}
            agruparConteudo
        />
    );
};
