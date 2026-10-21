import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import type { TableField } from "../../../../common/components/Table";
import type { ExcelColumn } from "../../../../common/components/Actions/GerarExcel";
import type { Cliente } from "../../types/Cliente";
import { Botao } from "../../../../common/components/Buttons/Botao";
import { PeriodoInput } from "../../../../common/components/Inputs/PeriodoInput";
import { RelatorioTemplate } from "../../../../common/components/Templates/RelatorioTemplate";
import { Panel, Select } from "../../../../common/components/Ui";
import { StatusBadge } from "../../../../common/components/PageLayout/styled";
import { buildClientesMenuSections } from "../shared/clientesMenuSections";
import { clientesRelatorioMockData } from "../../data/clientesMock";

// Styled Components
const FormContainer = styled(Panel)`
    background: linear-gradient(135deg, #f5f7fa 0%, #f9fafb 100%);
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-md);
    padding: var(--space-xl);
    margin-bottom: var(--space-lg);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    max-width: 100%;

    @media (max-width: 768px) {
        padding: var(--space-lg) var(--space-md);
    }
`;

const FormTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    margin: 0 0 var(--space-lg) 0;
    font-size: var(--font-size-md);
    font-weight: 600;
    color: #1f2937;

    &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 24px;
        background: linear-gradient(180deg, #3b82f6 0%, #1e40af 100%);
        border-radius: 0.125rem;
    }
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--space-lg);
    margin-bottom: var(--space-lg);

    @media (max-width: 1400px) {
        gap: 20px;
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-md);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: var(--space-sm);
    }
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    overflow: visible;

    label {
        font-size: var(--font-size-xs);
        font-weight: 500;
        color: #000;
        letter-spacing: 0.5px;
        line-height: 1.3;

        .required {
            color: #ef4444;
            margin-left: 2px;
        }
    }

    input {
        padding: 10px var(--space-sm);
        border: 2px solid #e5e7eb;
        border-radius: 0.125rem;
        font-size: var(--font-size-md);
        transition: all 0.2s ease;
        width: 100%;
        box-sizing: border-box;

        &:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
    }

    /* Container externo do seletor de período */
    & > div {
        width: 100%;
        overflow: visible;
    }
`;

const FormActions = styled.div`
    display: flex;
    gap: var(--space-sm);
    justify-content: flex-end;
    flex-wrap: wrap;
    padding-top: var(--space-sm);
    border-top: 1px solid #e5e7eb;

    @media (max-width: 768px) {
        flex-direction: column;

        button {
            width: 100%;
        }
    }
`;

const moedaBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

const camposClientes: TableField<Cliente>[] = [
    {
        id: "nome",
        header: "Cliente",
        accessorKey: "nome",
        defaultVisible: true,
    },
    {
        id: "email",
        header: "E-mail",
        accessorKey: "email",
        defaultVisible: true,
    },
    {
        id: "telefone",
        header: "Telefone",
        accessorKey: "telefone",
        defaultVisible: true,
    },
    {
        id: "cidade",
        header: "Cidade",
        accessorKey: "cidade",
        defaultVisible: false,
    },
    {
        id: "segmento",
        header: "Segmento",
        accessorKey: "segmento",
        defaultVisible: true,
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        defaultVisible: true,
        align: "center",
        cell: (value) => (
            <StatusBadge $variant={value as Cliente["status"]}>
                {String(value)}
            </StatusBadge>
        ),
    },
    {
        id: "ultimaCompra",
        header: "Última compra",
        defaultVisible: true,
        align: "center",
    },
    {
        id: "tipoPessoa",
        header: "Tipo de Pessoa",
        accessorKey: "tipoPessoa",
        defaultVisible: true,
        align: "center",
    },
    {
        id: "totalCompras",
        header: "Total em compras",
        defaultVisible: true,
        align: "right",
        cell: (value) => moedaBRL.format(Number(value ?? 0)),
    },
];

const colunasExcelClientes: ExcelColumn<Cliente>[] = [
    { key: "nome", header: "Cliente", accessorKey: "nome" },
    { key: "email", header: "E-mail", accessorKey: "email" },
    { key: "telefone", header: "Telefone", accessorKey: "telefone" },
    { key: "cidade", header: "Cidade", accessorKey: "cidade" },
    { key: "segmento", header: "Segmento", accessorKey: "segmento" },
    { key: "status", header: "Status", accessorKey: "status" },
    { key: "ultimaCompra", header: "Última compra" },
    {
        key: "totalCompras",
        header: "Total em compras",
        valueFormatter: (value) => moedaBRL.format(Number(value ?? 0)),
    },
];

interface FormFiltersState {
    dataInicio: string;
    dataFim: string;
    tipoPessoa: string;
    estado: string;
    cidade: string;
    bairro: string;
    statusCliente: string;
    tipoCliente: string;
    formatoImpressao: string;
    dataAniversarioInicio: string;
    dataAniversarioFim: string;
    funcionario: string;
}

const INITIAL_FILTERS: FormFiltersState = {
    dataInicio: "",
    dataFim: "",
    tipoPessoa: "",
    estado: "",
    cidade: "",
    bairro: "",
    statusCliente: "",
    tipoCliente: "",
    formatoImpressao: "retrato",
    dataAniversarioInicio: "",
    dataAniversarioFim: "",
    funcionario: "",
};

export const RelatorioClientesPage: React.FC = () => {
    const [pesquisa, setPesquisa] = useState("");

    // Form state
    const [filters, setFilters] = useState<FormFiltersState>(INITIAL_FILTERS);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Validação do formulário
    const isFormValid = useCallback(() => {
        return filters.dataInicio !== "";
    }, [filters]);

    const handleFilterChange = useCallback(
        (fieldName: keyof FormFiltersState, value: string) => {
            setFilters((prev) => ({
                ...prev,
                [fieldName]: value,
            }));
        },
        [],
    );

    const handleSubmitFilters = useCallback(() => {
        if (isFormValid()) {
            setFormSubmitted(true);
        }
    }, [isFormValid]);

    const handleResetFilters = useCallback(() => {
        setFilters(INITIAL_FILTERS);
        setFormSubmitted(false);
        setPesquisa("");
    }, []);

    const clientesFiltrados = useMemo(() => {
        if (!formSubmitted) return [];

        const termo = pesquisa.trim().toLowerCase();

        const filtered = clientesRelatorioMockData.filter((cliente) => {
            const matchesTerm = [
                cliente.nome,
                cliente.email,
                cliente.telefone,
                cliente.cidade,
                cliente.segmento,
                cliente.status,
            ].some((campo) => campo?.toLowerCase().includes(termo));

            return matchesTerm;
        });

        return filtered;
    }, [pesquisa, formSubmitted]);

    const secoes = useMemo(() => buildClientesMenuSections(), []);

    return (
        <RelatorioTemplate
            titulo="Relatório de Clientes"
            secoes={secoes}
            tituloTabela="Clientes cadastrados"
            descricaoTabela="Escolha quais colunas quer exibir e use a busca para filtrar os dados."
            dados={clientesFiltrados}
            campos={camposClientes}
            mensagemVazia="Nenhum cliente encontrado para o filtro informado."
            arquivoExcel="clientes"
            colunasExcel={colunasExcelClientes}
            impressao={{
                orientacao:
                    filters.formatoImpressao === "paisagem"
                        ? "landscape"
                        : "portrait",
            }}
            exibirTabela={formSubmitted}
            exibirAcoesFlutuantes={formSubmitted}
            configurarColunas={formSubmitted ? "toolbar" : false}
            painelFiltros={
                !formSubmitted ? (
                    <FormContainer>
                        <FormTitle>Filtros de Busca</FormTitle>

                        <FormGrid>
                            <FormField>
                                <label>
                                    Cliente cadastrado por período{" "}
                                    <span className="required">*</span>
                                </label>

                                <PeriodoInput
                                    larguraTotal
                                    onChange={(inicio, fim) => {
                                        handleFilterChange(
                                            "dataInicio",
                                            inicio,
                                        );
                                        handleFilterChange("dataFim", fim);
                                    }}
                                />
                            </FormField>

                            <FormField>
                                <label>Tipo de Pessoa</label>
                                <Select
                                    value={filters.tipoPessoa}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "tipoPessoa",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Ambos</option>
                                    <option value="f">Pessoa Física</option>
                                    <option value="j">Pessoa Jurídica</option>
                                </Select>
                            </FormField>

                            <FormField>
                                <label>Estados</label>
                                <Select
                                    value={filters.estado}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "estado",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Todos</option>
                                    <option value="sp">São Paulo</option>
                                    <option value="rj">Rio de Janeiro</option>
                                    <option value="mg">Minas Gerais</option>
                                    <option value="pr">Paraná</option>
                                    <option value="ba">Bahia</option>
                                </Select>
                            </FormField>

                            <FormField>
                                <label>Cidade</label>
                                <Select
                                    value={filters.cidade}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "cidade",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Todos</option>
                                    <option value="sp">São Paulo</option>
                                    <option value="rio">Rio de Janeiro</option>
                                    <option value="bh">Belo Horizonte</option>
                                    <option value="curitiba">Curitiba</option>
                                    <option value="salvador">Salvador</option>
                                </Select>
                            </FormField>

                            <FormField>
                                <label>Bairro</label>
                                <Select
                                    value={filters.bairro}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "bairro",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Todos os Bairros</option>
                                    <option value="centro">Centro</option>
                                    <option value="zona-norte">
                                        Zona Norte
                                    </option>
                                    <option value="zona-sul">Zona Sul</option>
                                </Select>
                            </FormField>

                            <FormField>
                                <label>Ativo / Inativo</label>
                                <Select
                                    value={filters.statusCliente}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "statusCliente",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Ambos</option>
                                    <option value="ativo">Ativo</option>
                                    <option value="inativo">Inativo</option>
                                </Select>
                            </FormField>

                            <FormField>
                                <label>Tipo cliente Atacado / Varejo</label>
                                <Select
                                    value={filters.tipoCliente}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "tipoCliente",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Ambos</option>
                                    <option value="atacado">Atacado</option>
                                    <option value="varejo">Varejo</option>
                                </Select>
                            </FormField>

                            <FormField>
                                <label>Formato de Impressão</label>
                                <Select
                                    value={filters.formatoImpressao}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "formatoImpressao",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="retrato">Retrato</option>
                                    <option value="paisagem">Paisagem</option>
                                </Select>
                            </FormField>

                            <FormField>
                                <label>Data de Aniversário (Período)</label>
                                <PeriodoInput
                                    larguraTotal
                                    onChange={(inicio, fim) => {
                                        handleFilterChange(
                                            "dataAniversarioInicio",
                                            inicio,
                                        );
                                        handleFilterChange(
                                            "dataAniversarioFim",
                                            fim,
                                        );
                                    }}
                                />
                            </FormField>

                            <FormField>
                                <label>Funcionário</label>
                                <Select
                                    value={filters.funcionario}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "funcionario",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Selecione...</option>
                                    <option value="func1">Funcionário 1</option>
                                    <option value="func2">Funcionário 2</option>
                                </Select>
                            </FormField>
                        </FormGrid>

                        <FormActions>
                            <Botao
                                nome="Limpar Filtros"
                                variant="secondary"
                                action={handleResetFilters}
                            />
                            <Botao
                                nome="Buscar Clientes"
                                action={handleSubmitFilters}
                                disabled={!isFormValid()}
                            />
                        </FormActions>
                    </FormContainer>
                ) : null
            }
            conteudoAntesTabela={
                formSubmitted ? (
                    <FormActions>
                        <Botao
                            nome="Refazer Filtros"
                            variant="secondary"
                            action={handleResetFilters}
                        />
                    </FormActions>
                ) : null
            }
        />
    );
};
