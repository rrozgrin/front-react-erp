import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoPersonAddSharp } from 'react-icons/io5';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import { ModalAddFornecedores } from './ModalAddFornecedores';
import {
    defaultFornecedorSearchFields,
    defaultFornecedoresExcelColumns,
    defaultFornecedoresTableFields,
    fornecedoresMockData,
} from '../shared/fornecedoresListConfig';
import { MalaDiretaModal } from '@/features/mala-direta';
import { ImportarDadosModal } from '../../../../common/components/ImportarDadosModal';
import type { Fornecedores } from '../../types/Fornecedores';
import { buildFornecedoresMenuSections } from '../shared/fornecedoresMenuSections';

export const FornecedoresPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openMalaDireta, setOpenMalaDireta] = useState(false);
    const [openImportarDados, setOpenImportarDados] = useState(false);
    const [showAddFornecedorModal, setShowAddFornecedorModal] = useState(false);
    const [fornecedores, setFornecedores] = useState<Fornecedores[]>(fornecedoresMockData);

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get('modal') !== 'add-fornecedor') {
            return;
        }

        params.delete('modal');
        setShowAddFornecedorModal(true);
        navigate({
            pathname: location.pathname,
            search: params.toString() ? `?${params.toString()}` : '',
            hash: location.hash,
        }, { replace: true });
    }, [location.hash, location.pathname, location.search, navigate]);

    const secoes = useMemo(
        () => buildFornecedoresMenuSections({
            onAddFornecedor: () => setShowAddFornecedorModal(true),
            onOpenImportarDados: () => setOpenImportarDados(true),
        }),
        []
    );

    const handleAddFornecedor = useCallback((data: Fornecedores) => {
        setFornecedores((prev) => [{ ...data }, ...prev]);
    }, []);

    return (
        <>
            <ListagemTemplate
                titulo="Gestão de Fornecedores"
                secoes={secoes}
                dados={fornecedores}
                campos={defaultFornecedoresTableFields}
                colunasExcel={defaultFornecedoresExcelColumns}
                camposPesquisa={defaultFornecedorSearchFields}
                botaoPrincipal={{
                    nome: 'Fornecedor',
                    icone: <IoPersonAddSharp size={20} />,
                    action: () => setShowAddFornecedorModal(true),
                }}
                arquivoExcel="fornecedores"
                tituloTabela="Fornecedores cadastrados"
                descricaoTabela="Escolha quais colunas quer exibir e use a busca para filtrar os dados."
                mensagemVazia="Nenhum fornecedor encontrado para o filtro informado."
                modaisAbertos={showAddFornecedorModal || openMalaDireta || openImportarDados}
            />

            <MalaDiretaModal
                open={openMalaDireta}
                onClose={() => setOpenMalaDireta(false)}
                onPrint={() => console.log('Imprimir')}
                entidadePlural="Fornecedores"
            />

            <ModalAddFornecedores
                show={showAddFornecedorModal}
                onClose={() => setShowAddFornecedorModal(false)}
                onSubmit={handleAddFornecedor}
            />

            <ImportarDadosModal
                show={openImportarDados}
                onClose={() => setOpenImportarDados(false)}
                entidadePlural="fornecedores"
                nomeEntidade="Fornecedores"
            />
        </>
    );
};
