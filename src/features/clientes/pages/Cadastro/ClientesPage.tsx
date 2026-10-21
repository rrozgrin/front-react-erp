import React, { Suspense, lazy, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { IoPersonAddSharp } from 'react-icons/io5';
import { StatusBadge } from '../../../../common/components/PageLayout/styled';
import type { TableField } from '../../../../common/components/Table';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import type { Cliente } from '../../types/Cliente';
import { moedaBRL } from '../../../../types/Formatadores';
import { buildClientesMenuSections } from '../shared/clientesMenuSections';
import { clientesCadastroMockData } from '../../data/clientesMock';

const ModalAddClientes = lazy(async () => ({
    default: (await import('./ModalAddClientes')).ModalAddClientes,
}));

const MalaDiretaModal = lazy(async () => ({
    default: (await import('@/features/mala-direta')).MalaDiretaModal,
}));

const ImportarDadosModal = lazy(async () => ({
    default: (await import('../../../../common/components/ImportarDadosModal')).ImportarDadosModal,
}));

const MensagemAniversarioModal = lazy(async () => ({
    default: (await import('../../components/MensagemAniversarioModal')).MensagemAniversarioModal,
}));

const camposClientes: TableField<Cliente>[] = [
    { id: 'nome', header: 'Cliente', accessorKey: 'nome', defaultVisible: true },
    { id: 'email', header: 'E-mail', accessorKey: 'email', defaultVisible: true },
    { id: 'telefone', header: 'Telefone', accessorKey: 'telefone', defaultVisible: true },
    { id: 'cidade', header: 'Cidade', accessorKey: 'cidade', defaultVisible: false },
    { id: 'segmento', header: 'Segmento', accessorKey: 'segmento', defaultVisible: true },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        defaultVisible: true,
        align: 'center',
        cell: (value) => <StatusBadge $variant={value as Cliente['status']}>{String(value)}</StatusBadge>,
    },
    { id: 'ultimaCompra', header: 'Última compra', defaultVisible: true, align: 'center' },
    { id: 'tipoPessoa', header: 'Tipo de Pessoa', accessorKey: 'tipoPessoa', defaultVisible: true, align: 'center' },
    {
        id: 'totalCompras',
        header: 'Total em compras',
        defaultVisible: true,
        align: 'right',
        cell: (value) => moedaBRL.format(Number(value ?? 0)),
    },
];

const colunasExcelClientes: ExcelColumn<Cliente>[] = [
    { key: 'nome', header: 'Cliente', accessorKey: 'nome' },
    { key: 'email', header: 'E-mail', accessorKey: 'email' },
    { key: 'telefone', header: 'Telefone', accessorKey: 'telefone' },
    { key: 'cidade', header: 'Cidade', accessorKey: 'cidade' },
    { key: 'segmento', header: 'Segmento', accessorKey: 'segmento' },
    { key: 'status', header: 'Status', accessorKey: 'status' },
    { key: 'ultimaCompra', header: 'Última compra' },
    {
        key: 'totalCompras',
        header: 'Total em compras',
        valueFormatter: (value) => moedaBRL.format(Number(value ?? 0)),
    },
];

export const ClientesPage: React.FC = () => {
    const navigate = useNavigate();
    const [openMalaDireta, setOpenMalaDireta] = useState(false);
    const [openMensagemAniversario, setOpenMensagemAniversario] = useState(false);
    const [openImportarDados, setOpenImportarDados] = useState(false);
    const [showAddClienteModal, setShowAddClienteModal] = useState(false);
    const [clientes, setClientes] = useState<Cliente[]>(clientesCadastroMockData);

    const secoes = useMemo(
        () => buildClientesMenuSections({
            onOpenMalaDireta: () => setOpenMalaDireta(true),
            onOpenMensagemAniversario: () => setOpenMensagemAniversario(true),
            onOpenImportarDados: () => setOpenImportarDados(true),
        }),
        []
    );

    const handleAddCliente = useCallback((data: Cliente) => {
        setClientes((prev) => [{ ...data }, ...prev]);
    }, []);

    const handleOpenCliente = useCallback((cliente: Cliente) => {
        navigate(`/clientes/visualizar/${cliente.id}`, { state: { cliente } });
    }, [navigate]);

    return (
        <>
            <ListagemTemplate
                titulo="Gestão de Clientes"
                secoes={secoes}
                dados={clientes}
                campos={camposClientes}
                colunasExcel={colunasExcelClientes}
                camposPesquisa={(cliente) => [
                    cliente.nome,
                    cliente.email,
                    cliente.telefone,
                    cliente.cidade,
                    cliente.segmento,
                    cliente.status,
                ]}
                acoes={[
                    {
                        label: 'Visualizar',
                        icon: <FiSearch size={16} />,
                        getTitle: (cliente) => `Visualizar cliente ${String(cliente.nome ?? cliente.id)}`,
                        onClick: handleOpenCliente,
                    },
                ]}
                botaoPrincipal={{
                    nome: 'Cliente',
                    icone: <IoPersonAddSharp size={20} />,
                    action: () => setShowAddClienteModal(true),
                }}
                arquivoExcel="clientes"
                tituloTabela="Clientes cadastrados"
                descricaoTabela="Escolha quais colunas quer exibir e use a busca para filtrar os dados."
                mensagemVazia="Nenhum cliente encontrado para o filtro informado."
                modaisAbertos={showAddClienteModal || openMalaDireta || openMensagemAniversario || openImportarDados}
                menuInicialAberto={false}
            />

            <Suspense fallback={null}>
                {openMalaDireta ? (
                    <MalaDiretaModal
                        open={openMalaDireta}
                        onClose={() => setOpenMalaDireta(false)}
                        onPrint={() => console.log('Imprimir')}
                        entidadePlural="Clientes"
                    />
                ) : null}

                {openMensagemAniversario ? (
                    <MensagemAniversarioModal
                        open={openMensagemAniversario}
                        modo="editar"
                        onClose={() => setOpenMensagemAniversario(false)}
                        onSave={() => console.log('Salvar mensagem de aniversário')}
                    />
                ) : null}

                {showAddClienteModal ? (
                    <ModalAddClientes
                        show={showAddClienteModal}
                        onClose={() => setShowAddClienteModal(false)}
                        onSubmit={handleAddCliente}
                    />
                ) : null}

                {openImportarDados ? (
                    <ImportarDadosModal
                        show={openImportarDados}
                        onClose={() => setOpenImportarDados(false)}
                        entidadePlural="clientes"
                        nomeEntidade="Clientes"
                    />
                ) : null}
            </Suspense>
        </>
    );
};
