import React, { useMemo, useState } from "react";
import styled from "styled-components";
import {
    FaEye,
    FaEyeSlash,
    FaPlus,
    FaTrash,
    FaTrashRestore,
} from "react-icons/fa";
import { Botao } from "../../../../common/components/Buttons/Botao";
import {
    ModalTipoDesconto,
    type TipoDescontoFormData,
} from "./TipoDescontoModal";
import { CadastroAuxiliarTemplate } from "../../../../common/components/Templates/CadastroAuxiliarTemplate";
import { buildClientesMenuSections } from "../shared/clientesMenuSections";
import type { TableField } from "../../../../common/components/Table";
import { ActionsRow } from "../../../../common/components/Ui";

type TipoDescontoItem = {
    id: number;
    descricao: string;
    desconto: string;
    ativo: boolean;
};

const SectionTitle = styled.h2`
    margin: 0;
    text-align: center;
    font-size: var(--font-size-md);
    color: #000;
    font-weight: 500;
`;

const ToggleGroup = styled(ActionsRow).attrs({ $align: "center" })``;

const initialData: TipoDescontoItem[] = [
    { id: 1, descricao: "Basic", desconto: "10%", ativo: true },
    { id: 2, descricao: "Master", desconto: "15%", ativo: true },
    { id: 3, descricao: "Premium", desconto: "20%", ativo: true },
];

export const TiposDesconto: React.FC = () => {
    const [tipos, setTipos] = useState<TipoDescontoItem[]>(initialData);
    const [showAtivos, setShowAtivos] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const secoes = useMemo(() => buildClientesMenuSections(), []);

    const tiposVisiveis = useMemo(() => {
        return tipos.filter((item) => (showAtivos ? item.ativo : !item.ativo));
    }, [showAtivos, tipos]);

    const editingItem = useMemo(() => {
        return tipos.find((item) => item.id === editingId) ?? null;
    }, [editingId, tipos]);

    const tableFields = useMemo<TableField<TipoDescontoItem>[]>(
        () => [
            {
                id: "descricao",
                header: "Descrição",
                accessorKey: "descricao",
                defaultVisible: true,
            },
            {
                id: "desconto",
                header: "Desconto (%)",
                accessorKey: "desconto",
                width: "160px",
                defaultVisible: true,
            },
            {
                id: "acoes",
                header: "Ações",
                width: "160px",
                align: "center",
                defaultVisible: true,
                cell: (_, item) => (
                    <Botao
                        nome={item.ativo ? "Inativar" : "Ativar"}
                        color="close"
                        action={() => handleToggleStatus(item.id)}
                        icone={item.ativo ? <FaTrash /> : <FaTrashRestore />}
                    />
                ),
            },
        ],
        [tipos],
    );

    const handleOpenCreate = () => {
        setEditingId(null);
        setShowModal(true);
    };

    const handleSave = (data: TipoDescontoFormData) => {
        if (editingId != null) {
            setTipos((prev) =>
                prev.map((item) => {
                    if (item.id !== editingId) {
                        return item;
                    }

                    return {
                        ...item,
                        descricao: data.descricao,
                        desconto: `${data.desconto.replace("%", "")}%`,
                    };
                }),
            );
        } else {
            const nextId = tipos.length
                ? Math.max(...tipos.map((item) => item.id)) + 1
                : 1;
            setTipos((prev) => [
                ...prev,
                {
                    id: nextId,
                    descricao: data.descricao,
                    desconto: `${data.desconto.replace("%", "")}%`,
                    ativo: true,
                },
            ]);
        }

        setShowModal(false);
        setEditingId(null);
    };

    const handleToggleStatus = (id: number) => {
        setTipos((prev) =>
            prev.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                return {
                    ...item,
                    ativo: !item.ativo,
                };
            }),
        );
    };

    return (
        <>
            <CadastroAuxiliarTemplate
                titulo="Tipos de Desconto"
                secoes={secoes}
                tituloTabela={showAtivos ? "Tipos ativos" : "Tipos inativos"}
                descricaoTabela="Gerencie os tipos de desconto cadastrados."
                dados={tiposVisiveis}
                campos={tableFields}
                mensagemVazia="Nenhum tipo de desconto encontrado."
                cadastro={{
                    nome: "Novo",
                    color: "add",
                    icone: <FaPlus size={14} />,
                    action: handleOpenCreate,
                }}
                modalAberto={showModal}
                exibirBusca={false}
                impressao={false}
                exibirAcoesFlutuantes={false}
                configurarColunas="tabela"
                agruparConteudo
                conteudoAntesTabela={
                    <>
                        <SectionTitle>
                            Cadastro e edição de Tipos de Desconto
                        </SectionTitle>

                        <ToggleGroup>
                            <Botao
                                nome="Exibir Ativos"
                                icone={<FaEye />}
                                action={() => setShowAtivos(true)}
                            />
                            <Botao
                                nome="Exibir Inativos"
                                icone={<FaEyeSlash />}
                                action={() => setShowAtivos(false)}
                            />
                        </ToggleGroup>
                    </>
                }
            />

            <ModalTipoDesconto
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingId(null);
                }}
                onSave={handleSave}
                initialData={
                    editingItem
                        ? {
                              descricao: editingItem.descricao,
                              desconto: editingItem.desconto.replace("%", ""),
                          }
                        : null
                }
            />
        </>
    );
};
