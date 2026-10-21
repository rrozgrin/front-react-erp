export type FuncionarioStatus = 'A' | 'I' | 'E';

export interface Funcionario {
    id_funcionario: number;
    nome: string;
    cpf: string;
    telefoneFixo?: string;
    celular?: string;
    funcao?: string;
    setor?: string;
    cargo?: string;
    sexo?: 'M' | 'F';
    dataNascimento?: string;
    dataContratacao?: string;
    dataDemissao?: string;
    ativo: FuncionarioStatus;
}
