import styled from 'styled-components';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { criarColunasExcel } from '../../../common/components/Templates/listagemUtils';
import type { TableField } from '../../../common/components/Table';
import type { Funcionario } from '../../../types/Funcionario';

const FuncionarioStatusCell = styled.span`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
`;

export const funcionariosMockData: Funcionario[] = [
    { id_funcionario: 328990, nome: 'FUNCIONARIO MASTER', cpf: '923.795.750-53', ativo: 'A', funcao: 'Administrador', setor: 'Gestão', cargo: 'Master', sexo: 'M', dataContratacao: '2024-01-02' },
    { id_funcionario: 337308, nome: 'TESTE', cpf: '496.282.270-50', ativo: 'A', funcao: 'Atendimento', setor: 'Vendas', cargo: 'Vendedor', sexo: 'M', dataContratacao: '2024-02-12' },
    { id_funcionario: 337522, nome: 'PETER ANCAPSU', cpf: '575.232.670-25', ativo: 'A', funcao: 'Auxiliar', setor: 'Vendas', cargo: 'Auxiliar', sexo: 'M', dataContratacao: '2024-03-18' },
    { id_funcionario: 338411, nome: 'WALLACE RIBEIRO CLEMENTE', cpf: '071.308.707-11', ativo: 'A', funcao: 'Operador', setor: 'Caixa', cargo: 'Operador', sexo: 'M', dataContratacao: '2024-05-02' },
    { id_funcionario: 338464, nome: 'WALLACE TESTE', cpf: '466.726.509-46', ativo: 'A', funcao: 'Atendimento', setor: 'Vendas', cargo: 'Vendedor', sexo: 'M', dataContratacao: '2024-05-10' },
    { id_funcionario: 338488, nome: 'TESTE PROMISSORIA', cpf: '089.710.479-09', ativo: 'A', funcao: 'Financeiro', setor: 'Administração', cargo: 'Analista', sexo: 'F', dataContratacao: '2024-06-01' },
    { id_funcionario: 338530, nome: 'WALLACE TESTE 2', cpf: '615.901.729-22', ativo: 'A', funcao: 'Auxiliar', setor: 'Estoque', cargo: 'Auxiliar', sexo: 'M', dataContratacao: '2024-06-05' },
    { id_funcionario: 338856, nome: 'LUCAS PEREIRA', cpf: '108.901.009-50', ativo: 'A', funcao: 'Atendimento', setor: 'Vendas', cargo: 'Vendedor', sexo: 'M', dataContratacao: '2024-06-17' },
    { id_funcionario: 338900, nome: 'FUNCIONÁRIO EXCLUÍDO', cpf: '000.000.000-00', ativo: 'E', funcao: 'Auxiliar', setor: 'Vendas', cargo: 'Auxiliar', sexo: 'F', dataContratacao: '2023-01-10', dataDemissao: '2024-01-10' },
];

export const funcionariosExcluidosMockData = funcionariosMockData.filter((funcionario) => funcionario.ativo === 'E');

export const getFuncionarioStatusLabel = (status: Funcionario['ativo']) => {
    if (status === 'A') {
        return 'ATIVO';
    }

    if (status === 'I') {
        return 'INATIVO';
    }

    return 'EXCLUÍDO';
};

export const defaultFuncionarioSearchFields = (funcionario: Funcionario): string[] => [
    String(funcionario.id_funcionario),
    funcionario.nome,
    funcionario.cpf,
    funcionario.telefoneFixo ?? '',
    funcionario.celular ?? '',
    funcionario.funcao ?? '',
    funcionario.setor ?? '',
    funcionario.cargo ?? '',
    getFuncionarioStatusLabel(funcionario.ativo),
];

export const defaultFuncionariosTableFields: TableField<Funcionario>[] = [
    { id: 'codigo', header: 'Código', accessorKey: 'id_funcionario', width: '110px', defaultVisible: true },
    { id: 'nome', header: 'Nome', accessorKey: 'nome', defaultVisible: true },
    { id: 'cpf', header: 'CPF', accessorKey: 'cpf', width: '160px', defaultVisible: true },
    { id: 'telefoneFixo', header: 'Telefone Fixo', accessorKey: 'telefoneFixo', width: '160px', defaultVisible: true },
    { id: 'celular', header: 'Celular', accessorKey: 'celular', width: '150px', defaultVisible: true },
    {
        id: 'situacao',
        header: 'Situação',
        accessorKey: 'ativo',
        width: '130px',
        defaultVisible: true,
        cell: (value) => (
            <FuncionarioStatusCell>
                {value === 'A' ? <FaCheck color="#3a8b00" /> : <FaTimes color="#c62828" />}
                {getFuncionarioStatusLabel(value as Funcionario['ativo'])}
            </FuncionarioStatusCell>
        ),
    },
];

export const defaultFuncionariosExcelColumns = criarColunasExcel(defaultFuncionariosTableFields, {
    situacao: { valueFormatter: (_, row) => getFuncionarioStatusLabel(row.ativo) },
});
