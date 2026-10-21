import type { Funcionario } from '../../../../types/Funcionario';
import { criarFiltroPeriodo } from '../../../../common/components/Templates/listagemUtils';

export const matchesFuncionarioDateRange = criarFiltroPeriodo(
    (funcionario: Funcionario) => funcionario.dataContratacao ?? funcionario.dataDemissao
);
