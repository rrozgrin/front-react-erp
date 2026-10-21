import { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
    FiCheck,
    FiEdit2,
    FiPlus,
    FiTrash2,
} from 'react-icons/fi';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import { type TableField } from '../../../../common/components/Table';
import { IndicadorStatus, type UiStatusTone } from '../../../../common/components/Ui';
import {
    assistenciasMockData,
    formatDateToDisplay,
    statusLabels,
    type AssistenciaStatus,
    type AssistenciaTecnica,
} from './assistenciaData';
import { assistenciaTecnicaMenuSections } from './assistenciaMenuSections';
import { AssistenciaTecnicaModal, type AssistenciaFormValues } from './AssistenciaTecnicaModal';

const CustomerCell = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 180px;
`;

const Avatar = styled.span`
    width: 28px;
    height: 28px;
    border-radius: var(--radius-pill);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    color: var(--color-main, var(--bs-primary));
    background: rgba(var(--bs-primary-rgb), 0.1);
    font-size: 0.78rem;
    font-weight: 800;
`;

const statusTone: Record<AssistenciaStatus, UiStatusTone> = {
    aberta: 'info',
    em_andamento: 'warning',
    aguardando_peca: 'primary',
    concluida: 'success',
    cancelada: 'neutral',
    desativada: 'neutral',
    excluida: 'danger',
};

const buildAssistenciaFromForm = (
    values: AssistenciaFormValues,
    id: number,
    current?: AssistenciaTecnica
): AssistenciaTecnica => {
    const numero = current?.numero || values.nfr || `AT-${new Date().getFullYear()}-${String(id).padStart(4, '0')}`;
    const data = current?.data || `${formatDateToDisplay(values.dataEntrada)} 09:00`;
    const prazoEntrega = values.previsaoConclusao ? `${formatDateToDisplay(values.previsaoConclusao)} 18:00` : '--';

    return {
        id,
        numero,
        data,
        cliente: values.cliente,
        equipamentoServico: `${values.aparelho} ${values.marca} ${values.modelo} - ${values.tipoServico}`,
        tecnico: values.tecnico,
        entrada: `${formatDateToDisplay(values.dataEntrada)} 09:00`,
        status: values.status,
        prazoEntrega,
        serie: values.serie,
        aparelho: values.aparelho,
        marca: values.marca,
        modelo: values.modelo,
        voltagem: values.voltagem,
        tipoServico: values.tipoServico,
        acessorios: values.acessorios,
        defeitosRelatados: values.defeitosRelatados,
        nomeTecnico: values.nomeTecnico,
        entradaOs: values.entradaOs,
        dataEntrada: values.dataEntrada,
        previsaoConclusao: values.previsaoConclusao,
        garantia: values.garantia,
    };
};

const getInitials = (name: string) =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

export const AssistenciaTecnicaPage = () => {
    const [pesquisa, setPesquisa] = useState('');
    const [assistencias, setAssistencias] = useState(assistenciasMockData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAssistencia, setEditingAssistencia] = useState<AssistenciaTecnica | null>(null);

    const fields = useMemo<TableField<AssistenciaTecnica>[]>(() => [
        { id: 'numero', header: 'Nº', accessorKey: 'numero', defaultVisible: true },
        { id: 'data', header: 'Data', accessorKey: 'data', defaultVisible: true },
        {
            id: 'cliente',
            header: 'Cliente',
            accessorKey: 'cliente',
            defaultVisible: true,
            cell: (value) => (
                <CustomerCell>
                    <Avatar>{getInitials(String(value))}</Avatar>
                    <span>{String(value)}</span>
                </CustomerCell>
            ),
        },
        { id: 'equipamentoServico', header: 'Equipamento / Serviço', accessorKey: 'equipamentoServico', defaultVisible: true },
        { id: 'tecnico', header: 'Técnico', accessorKey: 'tecnico', defaultVisible: true },
        { id: 'entrada', header: 'Entrada', accessorKey: 'entrada', defaultVisible: true },
        {
            id: 'status',
            header: 'Status',
            accessorKey: 'status',
            align: 'center',
            defaultVisible: true,
            cell: (value) => {
                const status = value as AssistenciaStatus;
                return <IndicadorStatus tom={statusTone[status]}>{statusLabels[status]}</IndicadorStatus>;
            },
        },
        { id: 'prazoEntrega', header: 'Prazo de entrega', accessorKey: 'prazoEntrega', defaultVisible: true },
        { id: 'serie', header: 'Nº Série', accessorKey: 'serie', defaultVisible: false },
        { id: 'garantia', header: 'Garantia', accessorKey: 'garantia', defaultVisible: false },
    ], []);

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAssistencia(null);
    };

    const handleSubmit = (values: AssistenciaFormValues) => {
        if (editingAssistencia) {
            setAssistencias((current) => current.map((assistencia) =>
                assistencia.id === editingAssistencia.id
                    ? buildAssistenciaFromForm(values, assistencia.id, assistencia)
                    : assistencia
            ));
            closeModal();
            return;
        }

        const nextId = Math.max(...assistencias.map((assistencia) => assistencia.id), 0) + 1;
        setAssistencias((current) => [buildAssistenciaFromForm(values, nextId), ...current]);
        closeModal();
    };

    const openCreateModal = () => {
        setEditingAssistencia(null);
        setIsModalOpen(true);
    };

    const openEditModal = (assistencia: AssistenciaTecnica) => {
        setEditingAssistencia(assistencia);
        setIsModalOpen(true);
    };

    return (
        <>
            <ListagemTemplate
                titulo="Assistência Técnica"
                secoes={assistenciaTecnicaMenuSections}
                tituloTabela="Últimas assistências cadastradas"
                descricaoTabela="Acompanhe os atendimentos técnicos mais recentes."
                dados={assistencias.filter((assistencia) => assistencia.status !== 'excluida' && assistencia.status !== 'desativada')}
                campos={fields}
                camposPesquisa={(assistencia) => [assistencia.numero, assistencia.cliente, assistencia.equipamentoServico, assistencia.tecnico, assistencia.serie, assistencia.status]}
                valorPesquisa={pesquisa}
                onPesquisaChange={setPesquisa}
                placeholderPesquisa="Buscar por cliente, nº série, serviço..."
                mensagemVazia="Nenhuma assistência técnica encontrada."
                botaoPrincipal={{ nome: 'Nova', color: 'add', action: openCreateModal, icone: <FiPlus /> }}
                acoes={[
                        {
                            label: 'Concluir',
                            icon: <FiCheck />,
                            variant: 'success',
                            hidden: (row) => row.status === 'concluida',
                            onClick: (row) => setAssistencias((current) => current.map((assistencia) =>
                                assistencia.id === row.id ? { ...assistencia, status: 'concluida' } : assistencia
                            )),
                        },
                        {
                            label: 'Editar',
                            icon: <FiEdit2 />,
                            onClick: openEditModal,
                        },
                        {
                            label: 'Excluir',
                            icon: <FiTrash2 />,
                            variant: 'danger',
                            onClick: (row) => setAssistencias((current) => current.map((assistencia) =>
                                assistencia.id === row.id ? { ...assistencia, status: 'excluida' } : assistencia
                            )),
                        },
                ]}
                modaisAbertos={isModalOpen}
                configurarColunas="tabela"
                impressao={false}
                exibirAcoesFlutuantes={false}
            />

            {isModalOpen ? (
                <AssistenciaTecnicaModal
                    initialData={editingAssistencia}
                    mode={editingAssistencia ? 'edit' : 'create'}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                />
            ) : null}
        </>
    );
};
