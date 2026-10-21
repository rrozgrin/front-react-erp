import React, { useCallback, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import {
    clientesMockData,
    defaultClienteExcelColumns,
    defaultClienteSearchFields,
    defaultClienteTableFields,
} from '../shared/clientesListConfig';
import type { Cliente } from '../../types/Cliente';
import { getClienteReferenceDate } from '../shared/utils';
import { buildClientesMenuSections } from '../shared/clientesMenuSections';

export const ClientesInativosPage: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>(clientesMockData);

    const handleReativar = useCallback(async (cliente: Cliente) => {
        const result = await Swal.fire({
            title: 'Reativar Cliente',
            text: `Deseja reativar "${cliente.nome}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Reativar',
            cancelButtonText: 'Cancelar',
        });

        if (!result.isConfirmed) {
            return;
        }

        setClientes((current) => current.filter((item) => item.id !== cliente.id));
        await Swal.fire('Cliente reativado', 'O cliente foi reativado com sucesso.', 'success');
    }, []);

    return (
        <ListagemTemplate
            titulo="Clientes Inativos"
            secoes={buildClientesMenuSections()}
            tituloTabela="Clientes inativos"
            descricaoTabela="Pesquise clientes inativos e acompanhe as principais informações do cadastro."
            mensagemVazia="Nenhum cliente inativo encontrado para o filtro informado."
            arquivoExcel="clientes_inativos"
            impressao={{ titulo: 'Clientes Inativos', subtitulo: 'Relatório de clientes inativos', orientacao: 'landscape' }}
            dados={clientes}
            campos={defaultClienteTableFields}
            acoes={[
                {
                    label: 'Reativar',
                    icon: <FiRefreshCw size={16} />,
                    variant: 'success',
                    getTitle: (cliente) => `Reativar ${cliente.nome}`,
                    onClick: (cliente) => {
                        void handleReativar(cliente);
                    },
                },
            ]}
            colunasExcel={defaultClienteExcelColumns}
            camposPesquisa={defaultClienteSearchFields}
            campoData={getClienteReferenceDate}
            exibirBusca={false}
            configurarColunas="tabela"
            exportarApenasColunasVisiveis={false}
            menuInicialAberto={false}
            agruparConteudo
        />
    );
};
