import type { Parceiro } from '../../parceiros/types/Parceiro';

export interface Fornecedores extends Parceiro {
    idCadastro?: number;
    idUsuario?: number;
    ativo?: boolean;
    dataCadastro?: string;
    idTipoLog?: number;
    tipoCadastro?: string;
    idFornecedorServico?: number;
    idTmp?: number;
    foneTmp?: string;
    idFormMaster?: number;
    idImportacao?: number;
    isentoIcms?: boolean;
    dataAlteracao?: string;
    dataSincronismo?: string;
    idOff?: number;
    idPais?: number;
}
