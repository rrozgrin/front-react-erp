import { useState } from 'react';
import Swal from 'sweetalert2';
import { FiTrash2 } from 'react-icons/fi';
import { CadastroAuxiliarTemplate } from '../../../../common/components/Templates/CadastroAuxiliarTemplate';
import type { TableField } from '../../../../common/components/Table';
import { buildCatalogoMenuSections, type CatalogoConfig } from './catalogoConfig';
import { catalogoClassificacoesMockData, type CatalogoClassificacao } from './catalogoData';

interface CatalogoClassificacaoPageProps {
    config: CatalogoConfig;
}

const fields: TableField<CatalogoClassificacao>[] = [
    { id: 'nome', header: 'Nome Classificação', accessorKey: 'nome', defaultVisible: true },
    { id: 'subClassificacao', header: 'SubClassificação', accessorKey: 'subClassificacao', defaultVisible: true },
    { id: 'status', header: 'Situação', accessorKey: 'status', defaultVisible: true },
];

export const CatalogoClassificacaoPage = ({ config }: CatalogoClassificacaoPageProps) => {
    const [rows, setRows] = useState(() => catalogoClassificacoesMockData.filter((row) => row.prodServ === config.prodServ));

    const adicionar = async () => {
        const result = await Swal.fire<string>({
            title: 'Cadastrar Classificação',
            input: 'text',
            inputPlaceholder: 'Nome da classificação',
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => value.trim() ? undefined : 'Informe o nome da classificação.',
        });

        if (!result.isConfirmed || !result.value) return;
        const nome = result.value;

        setRows((current) => [{ id: Date.now(), nome, subClassificacao: '- Principal -', status: 'ativo' }, ...current]);
    };

    return (
        <CadastroAuxiliarTemplate
            titulo={`Classificação de ${config.labels.plural}`}
            secoes={buildCatalogoMenuSections(config)}
            tituloTabela="Classificações"
            dados={rows}
            campos={fields}
            camposPesquisa={(row) => [row.nome, row.subClassificacao, row.status]}
            mensagemVazia="Nenhuma classificação encontrada."
            acoes={[{ label: 'Excluir', icon: <FiTrash2 />, variant: 'danger', onClick: (row) => setRows((current) => current.filter((item) => item.id !== row.id)) }]}
            cadastro={{ nome: 'Adicionar Nova Classificação', action: () => void adicionar() }}
            impressao={false}
            exibirAcoesFlutuantes={false}
            configurarColunas="tabela"
        />
    );
};
