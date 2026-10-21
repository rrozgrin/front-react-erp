import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
    ModalSimple,
    ModalSimpleActionButton,
    ModalSimpleActions,
    ModalSimpleForm,
} from "../../../../common/components/ModalSimple";
import { ListagemTemplate } from "../../../../common/components/Templates/ListagemTemplate";
import { CadastroAuxiliarTemplate } from "../../../../common/components/Templates/CadastroAuxiliarTemplate";
import { RelatorioTemplate } from "../../../../common/components/Templates/RelatorioTemplate";
import { type TableField } from "../../../../common/components/Table";
import {
    CampoFormulario,
    IndicadorStatus,
    Input,
    Select,
    Textarea,
    type UiStatusTone,
} from "../../../../common/components/Ui";
import {
    assistenciasMockData,
    statusLabels,
    type AssistenciaStatus,
    type AssistenciaTecnica,
} from "./assistenciaData";
import { assistenciaTecnicaMenuSections } from "./assistenciaMenuSections";

interface ObservacaoPadrao {
    id: number;
    titulo: string;
    texto: string;
    tipo: string;
}

const statusTone: Record<AssistenciaStatus, UiStatusTone> = {
    aberta: "info",
    concluida: "success",
    excluida: "danger",
    desativada: "neutral",
    cancelada: "neutral",
    aguardando_peca: "warning",
    em_andamento: "primary",
};

const assistenciaFields: TableField<AssistenciaTecnica>[] = [
    { id: "numero", header: "Nº", accessorKey: "numero", defaultVisible: true },
    { id: "data", header: "Data", accessorKey: "data", defaultVisible: true },
    {
        id: "cliente",
        header: "Cliente",
        accessorKey: "cliente",
        defaultVisible: true,
    },
    {
        id: "equipamentoServico",
        header: "Equipamento / Serviço",
        accessorKey: "equipamentoServico",
        defaultVisible: true,
    },
    {
        id: "serie",
        header: "Nº Série",
        accessorKey: "serie",
        defaultVisible: true,
    },
    {
        id: "tecnico",
        header: "Técnico",
        accessorKey: "tecnico",
        defaultVisible: true,
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        align: "center",
        defaultVisible: true,
        cell: (value) => {
            const status = value as AssistenciaStatus;
            return (
                <IndicadorStatus tom={statusTone[status]}>
                    {statusLabels[status]}
                </IndicadorStatus>
            );
        },
    },
    {
        id: "prazoEntrega",
        header: "Prazo de entrega",
        accessorKey: "prazoEntrega",
        defaultVisible: true,
    },
];

const observacaoFields: TableField<ObservacaoPadrao>[] = [
    {
        id: "titulo",
        header: "Título",
        accessorKey: "titulo",
        defaultVisible: true,
    },
    { id: "tipo", header: "Tipo", accessorKey: "tipo", defaultVisible: true },
    {
        id: "texto",
        header: "Observação",
        accessorKey: "texto",
        defaultVisible: true,
    },
];

const initialObservacoes: ObservacaoPadrao[] = [
    {
        id: 1,
        titulo: "Sem acessórios",
        tipo: "Entrada",
        texto: "Equipamento recebido sem acessórios adicionais.",
    },
    {
        id: 2,
        titulo: "Aguardando aprovação",
        tipo: "Orçamento",
        texto: "Cliente deve aprovar o orçamento antes do início do reparo.",
    },
    {
        id: 3,
        titulo: "Teste final",
        tipo: "Conclusão",
        texto: "Serviço concluído e equipamento testado em bancada.",
    },
];

const AssistenciaTecnicaListPage = ({
    emptyMessage,
    statuses,
    title,
    tableTitle,
}: {
    emptyMessage: string;
    statuses?: AssistenciaStatus[];
    title: string;
    tableTitle: string;
}) => {
    const rows = useMemo(() => {
        if (!statuses?.length) {
            return assistenciasMockData;
        }

        return assistenciasMockData.filter((assistencia) =>
            statuses.includes(assistencia.status),
        );
    }, [statuses]);

    return (
        <ListagemTemplate
            titulo={title}
            secoes={assistenciaTecnicaMenuSections}
            tituloTabela={tableTitle}
            descricaoTabela="Registros de assistência técnica encontrados para esta consulta."
            dados={rows}
            campos={assistenciaFields}
            mensagemVazia={emptyMessage}
            impressao={false}
            exibirAcoesFlutuantes={false}
            configurarColunas="tabela"
        />
    );
};

export const AssistenciaTecnicaRelatorioPage = () => (
    <AssistenciaTecnicaListPage
        title="Relatório de Assistência Técnica"
        tableTitle="Relatório"
        emptyMessage="Nenhuma assistência localizada para o relatório."
    />
);

export const AssistenciaTecnicaDesativadosPage = () => (
    <AssistenciaTecnicaListPage
        title="Assistências Desativadas"
        tableTitle="Listar Desativados"
        statuses={["desativada"]}
        emptyMessage="Nenhuma assistência desativada encontrada."
    />
);

export const AssistenciaTecnicaConcluidosPage = () => (
    <AssistenciaTecnicaListPage
        title="Assistências Concluídas"
        tableTitle="Listar Concluídos"
        statuses={["concluida"]}
        emptyMessage="Nenhuma assistência concluída encontrada."
    />
);

export const AssistenciaTecnicaExcluidosPage = () => (
    <AssistenciaTecnicaListPage
        title="Assistências Excluídas"
        tableTitle="Listar excluídos"
        statuses={["excluida"]}
        emptyMessage="Nenhuma assistência excluída encontrada."
    />
);

export const AssistenciaTecnicaHistoricoSeriePage = () => {
    const [serie, setSerie] = useState("");

    return (
        <RelatorioTemplate
            titulo="Histórico por nº de série"
            secoes={assistenciaTecnicaMenuSections}
            tituloTabela="Histórico por nº de série"
            descricaoTabela="Consulte todas as passagens do equipamento pela assistência técnica."
            dados={assistenciasMockData}
            campos={assistenciaFields}
            camposPesquisa={(assistencia) => [assistencia.serie]}
            valorPesquisa={serie}
            onPesquisaChange={setSerie}
            placeholderPesquisa="Digite o nº de série do equipamento..."
            mensagemVazia="Nenhum histórico encontrado para este nº de série."
            configurarColunas="tabela"
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
    );
};

export const AssistenciaTecnicaObservacoesPadraoPage = () => {
    const [observacoes, setObservacoes] = useState(initialObservacoes);
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({
        titulo: "",
        tipo: "Entrada",
        texto: "",
    });

    const closeModal = () => {
        setShowModal(false);
        setFormValues({ titulo: "", tipo: "Entrada", texto: "" });
    };

    const submitObservacao = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formValues.titulo.trim() || !formValues.texto.trim()) {
            return;
        }

        setObservacoes((current) => [
            {
                id:
                    Math.max(...current.map((observacao) => observacao.id), 0) +
                    1,
                ...formValues,
            },
            ...current,
        ]);
        closeModal();
    };

    return (
        <>
            <CadastroAuxiliarTemplate
                titulo="Observações Padrão"
                secoes={assistenciaTecnicaMenuSections}
                tituloTabela="Observações Padrão"
                descricaoTabela="Textos reutilizáveis para entradas, orçamentos e conclusões."
                dados={observacoes}
                campos={observacaoFields}
                mensagemVazia="Nenhuma observação padrão cadastrada."
                cadastro={{
                    nome: "Nova observação padrão",
                    action: () => setShowModal(true),
                    icone: <FiPlus />,
                }}
                modalAberto={showModal}
                configurarColunas="tabela"
                impressao={false}
                exibirAcoesFlutuantes={false}
            />

            {showModal ? (
                <ModalSimple
                    title="Nova Observação Padrão"
                    subtitle="Cadastre um texto reutilizável para a assistência técnica."
                    size="md"
                    onClose={closeModal}
                    footer={
                        <ModalSimpleActions>
                            <ModalSimpleActionButton
                                $variant="secondary"
                                type="button"
                                onClick={closeModal}
                            >
                                Cancelar
                            </ModalSimpleActionButton>
                            <ModalSimpleActionButton
                                type="submit"
                                form="observacao-padrao-form"
                            >
                                Salvar observação
                            </ModalSimpleActionButton>
                        </ModalSimpleActions>
                    }
                >
                    <ModalSimpleForm
                        id="observacao-padrao-form"
                        onSubmit={submitObservacao}
                    >
                        <CampoFormulario rotulo="Título">
                            <Input
                                value={formValues.titulo}
                                onChange={(event) =>
                                    setFormValues((current) => ({
                                        ...current,
                                        titulo: event.target.value,
                                    }))
                                }
                                placeholder="Ex.: Equipamento sem acessórios"
                            />
                        </CampoFormulario>
                        <CampoFormulario rotulo="Tipo">
                            <Select
                                value={formValues.tipo}
                                onChange={(event) =>
                                    setFormValues((current) => ({
                                        ...current,
                                        tipo: event.target.value,
                                    }))
                                }
                            >
                                <option value="Entrada">Entrada</option>
                                <option value="Orçamento">Orçamento</option>
                                <option value="Conclusão">Conclusão</option>
                                <option value="Interna">Interna</option>
                            </Select>
                        </CampoFormulario>
                        <CampoFormulario rotulo="Observação">
                            <Textarea
                                value={formValues.texto}
                                onChange={(event) =>
                                    setFormValues((current) => ({
                                        ...current,
                                        texto: event.target.value,
                                    }))
                                }
                                placeholder="Digite a observação padrão..."
                            />
                        </CampoFormulario>
                    </ModalSimpleForm>
                </ModalSimple>
            ) : null}
        </>
    );
};
