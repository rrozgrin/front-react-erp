import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { IoPersonAddSharp } from 'react-icons/io5';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import type { Funcionario } from '../../../../types/Funcionario';
import { ModalAddFuncionario } from './ModalAddFuncionario';
import {
    defaultFuncionarioSearchFields,
    defaultFuncionariosExcelColumns,
    defaultFuncionariosTableFields,
    funcionariosMockData,
} from '../../data/funcionariosListConfig';
import { buildFuncionariosMenuSections } from '../shared/funcionariosMenuSections';

export const FuncionariosPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showAddFuncionarioModal, setShowAddFuncionarioModal] = useState(false);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>(funcionariosMockData.filter((funcionario) => funcionario.ativo !== 'E'));

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get('modal') !== 'add-funcionario') {
            return;
        }

        params.delete('modal');
        setShowAddFuncionarioModal(true);
        navigate({
            pathname: location.pathname,
            search: params.toString() ? `?${params.toString()}` : '',
            hash: location.hash,
        }, { replace: true });
    }, [location.hash, location.pathname, location.search, navigate]);

    const secoes = useMemo(
        () => buildFuncionariosMenuSections({ onAddFuncionario: () => setShowAddFuncionarioModal(true) }),
        []
    );

    const handleAddFuncionario = useCallback((data: Funcionario) => {
        setFuncionarios((prev) => [{ ...data }, ...prev]);
    }, []);

    const handleDeleteFuncionario = useCallback((funcionario: Funcionario) => {
        setFuncionarios((prev) => prev.filter((item) => item.id_funcionario !== funcionario.id_funcionario));
    }, []);

    return (
        <>
            <ListagemTemplate
                titulo="Controle Funcionários"
                secoes={secoes}
                dados={funcionarios}
                campos={defaultFuncionariosTableFields}
                colunasExcel={defaultFuncionariosExcelColumns}
                camposPesquisa={defaultFuncionarioSearchFields}
                acoes={[
                    {
                        label: 'Visualizar',
                        icon: <FiSearch size={16} />,
                        getTitle: (row) => `Visualizar ${row.nome}`,
                        onClick: (row) => navigate(`/funcionarios/visualizar/${row.id_funcionario}`),
                    },
                    {
                        label: 'Excluir',
                        icon: <FaRegTrashAlt size={14} />,
                        variant: 'danger',
                        hidden: (row) => row.nome === 'FUNCIONARIO MASTER',
                        getTitle: (row) => `Excluir ${row.nome}`,
                        onClick: handleDeleteFuncionario,
                    },
                ]}
                botaoPrincipal={{
                    nome: 'Funcionários',
                    icone: <IoPersonAddSharp size={20} />,
                    action: () => setShowAddFuncionarioModal(true),
                }}
                arquivoExcel="funcionarios"
                tituloTabela="Funcionários cadastrados"
                descricaoTabela="Escolha quais colunas quer exibir e use a busca para filtrar os dados."
                mensagemVazia="Nenhum funcionário encontrado para o filtro informado."
                modaisAbertos={showAddFuncionarioModal}
                menuInicialAberto={false}
            />

            {showAddFuncionarioModal && (
                <ModalAddFuncionario
                    onClose={() => setShowAddFuncionarioModal(false)}
                    onSubmit={handleAddFuncionario}
                />
            )}
        </>
    );
};
