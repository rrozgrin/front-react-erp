import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import type { Funcionario } from '../../../../types/Funcionario';
import {
    defaultFuncionarioSearchFields,
    defaultFuncionariosExcelColumns,
    defaultFuncionariosTableFields,
    funcionariosExcluidosMockData,
} from '../../data/funcionariosListConfig';
import { buildFuncionariosMenuSections } from '../shared/funcionariosMenuSections';

export const FuncionariosExcluidosPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <ListagemTemplate<Funcionario>
            titulo="Funcionários Excluídos"
            secoes={buildFuncionariosMenuSections()}
            tituloTabela="Funcionários excluídos"
            descricaoTabela="Pesquise funcionários excluídos e acompanhe as principais informações do cadastro."
            mensagemVazia="Nenhum funcionário excluído encontrado para o filtro informado."
            arquivoExcel="funcionarios_excluidos"
            impressao={{ titulo: 'Funcionários Excluídos', subtitulo: 'Relatório de funcionários excluídos', orientacao: 'landscape' }}
            dados={funcionariosExcluidosMockData}
            campos={defaultFuncionariosTableFields}
            acoes={[
                {
                    label: 'Visualizar',
                    icon: <FiSearch size={16} />,
                    onClick: (row) => navigate(`/funcionarios/visualizar/${row.id_funcionario}`),
                },
            ]}
            colunasExcel={defaultFuncionariosExcelColumns}
            camposPesquisa={defaultFuncionarioSearchFields}
            campoData={(funcionario) => funcionario.dataContratacao ?? funcionario.dataDemissao}
            configurarColunas="tabela"
            exportarApenasColunasVisiveis={false}
            menuInicialAberto={false}
            agruparConteudo
        />
    );
};
