import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PageLayout, type PageLayoutMenuSection } from '../../../../common/components/PageLayout';
import { ModalSimpleActionButton } from '../../../../common/components/ModalSimple';
import { Table, type TableField } from '../../../../common/components/Table';
import { Input, Panel, Select, Textarea } from '../../../../common/components/Ui';
import { funcionariosMockData } from '../../data/funcionariosListConfig';

type SupportPageType =
    | 'ocorrencias'
    | 'documentos'
    | 'consultaCredito'
    | 'boleto'
    | 'clientes'
    | 'valeCompra'
    | 'comissaoProdutos'
    | 'agendamentos';

interface VisualizarFuncionarioSupportPageProps {
    type: SupportPageType;
}

const FormCard = styled(Panel).attrs({ as: 'form' })`
    width: min(780px, 100%);
    display: grid;
    gap: var(--space-md);
`;

const Row = styled.label`
    display: grid;
    gap: 6px;

    input,
    select,
    textarea {
        min-height: 38px;
        border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.45));
        border-radius: 0.1875rem;
        padding: 6px 10px;
    }
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Grid = styled.div`
    display: grid;
    gap: 20px;
`;

const clienteFields: TableField<{ codigo: number; nome: string; telefone: string; ultimaCompra: string }>[] = [
    { id: 'codigo', header: 'Código', accessorKey: 'codigo' },
    { id: 'nome', header: 'Nome', accessorKey: 'nome' },
    { id: 'telefone', header: 'Telefone', accessorKey: 'telefone' },
    { id: 'ultimaCompra', header: 'Última compra', accessorKey: 'ultimaCompra' },
];

const ocorrenciaFields: TableField<{ data: string; tipo: string; descricao: string }>[] = [
    { id: 'data', header: 'Data', accessorKey: 'data' },
    { id: 'tipo', header: 'Tipo', accessorKey: 'tipo' },
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao' },
];

const documentoFields: TableField<{ data: string; documento: string; status: string }>[] = [
    { id: 'data', header: 'Data', accessorKey: 'data' },
    { id: 'documento', header: 'Documento', accessorKey: 'documento' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
];

const comissaoProdutoFields: TableField<{ produto: string; percentual: string; valor: string }>[] = [
    { id: 'produto', header: 'Produto', accessorKey: 'produto' },
    { id: 'percentual', header: 'Percentual', accessorKey: 'percentual' },
    { id: 'valor', header: 'Valor', accessorKey: 'valor' },
];

const agendamentoFields: TableField<{ data: string; horario: string; cliente: string; status: string }>[] = [
    { id: 'data', header: 'Data', accessorKey: 'data' },
    { id: 'horario', header: 'Horário', accessorKey: 'horario' },
    { id: 'cliente', header: 'Cliente', accessorKey: 'cliente' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
];

const pageTitles: Record<SupportPageType, string> = {
    ocorrencias: 'Ocorrências do Funcionário',
    documentos: 'Documentos Administrativos',
    consultaCredito: 'Consulta Crédito',
    boleto: 'Gerar Boleto / Crediário / Promissória',
    clientes: 'Lista de Clientes',
    valeCompra: 'Vale Compra Funcionários',
    comissaoProdutos: 'Comissão Produtos',
    agendamentos: 'Agendamentos',
};

function buildMenuSections(id?: string, nome?: string): PageLayoutMenuSection[] {
    const nomeParam = encodeURIComponent(nome ?? '');

    return [
        {
            titulo: 'Dados do Funcionário',
            paginas: [
                { titulo: 'Alterar Dados', href: id ? `/funcionarios/visualizar/${id}` : '' },
                { titulo: 'Informações Confidenciais', href: id ? `/funcionarios/visualizar/${id}` : '' },
            ],
        },
        {
            titulo: 'Relatórios',
            paginas: [
                { titulo: 'Relatório de Comissão', href: id ? `/funcionarios/relatorio-comissao?id_funcionario=${id}&nome_funcionario=${nomeParam}` : '' },
                { titulo: 'Relatório de Comissão Auxiliares', href: id ? `/funcionarios/relatorio-comissao-auxiliares?id_funcionario=${id}` : '' },
            ],
        },
        {
            titulo: 'Atendimento e Controle',
            paginas: [
                { titulo: 'Ocorrências', href: id ? `/funcionarios/visualizar/${id}/ocorrencias` : '' },
                { titulo: 'Lista de Clientes', href: id ? `/funcionarios/visualizar/${id}/clientes` : '' },
                { titulo: 'Agendamentos', href: id ? `/funcionarios/visualizar/${id}/agendamentos` : '' },
            ],
        },
        {
            titulo: 'Financeiro',
            paginas: [
                { titulo: 'Consulta Crédito', href: id ? `/funcionarios/visualizar/${id}` : '' },
                { titulo: 'Gerar Boleto / Crediário / Promissória', href: id ? `/funcionarios/visualizar/${id}` : '' },
                { titulo: 'Vale Compra Funcionários', href: id ? `/funcionarios/visualizar/${id}/vale-compra` : '' },
                { titulo: 'Comissão Produtos', href: id ? `/funcionarios/visualizar/${id}/comissao-produtos` : '' },
            ],
        },
        {
            titulo: 'Documentos',
            paginas: [
                { titulo: 'Documentos Administrativos', href: id ? `/funcionarios/visualizar/${id}/documentos` : '' },
            ],
        },
    ];
}

export const VisualizarFuncionarioSupportPage: React.FC<VisualizarFuncionarioSupportPageProps> = ({ type }) => {
    const { id } = useParams();
    const funcionario = funcionariosMockData.find((item) => String(item.id_funcionario) === id);
    const sections = useMemo(() => buildMenuSections(id, funcionario?.nome), [id, funcionario?.nome]);

    const renderContent = () => {
        if (type === 'ocorrencias') {
            return (
                <Grid>
                    <FormCard onSubmit={(event) => event.preventDefault()}>
                        <Row>Tipo<Select><option>Atendimento</option><option>Financeiro</option><option>Administrativo</option></Select></Row>
                        <Row>Descrição<Textarea rows={4} /></Row>
                        <Actions><ModalSimpleActionButton type="submit">Salvar Ocorrência</ModalSimpleActionButton></Actions>
                    </FormCard>
                    <Table title="Ocorrências" data={[{ data: '19/06/2026', tipo: 'Atendimento', descricao: 'Registro de acompanhamento.' }]} fields={ocorrenciaFields} showColumnSelector={false} />
                </Grid>
            );
        }

        if (type === 'documentos') {
            return (
                <Grid>
                    <FormCard onSubmit={(event) => event.preventDefault()}>
                        <Row>Documento<Input /></Row>
                        <Row>Arquivo<Input type="file" /></Row>
                        <Actions><ModalSimpleActionButton type="submit">Salvar Documento</ModalSimpleActionButton></Actions>
                    </FormCard>
                    <Table title="Documentos" data={[{ data: '19/06/2026', documento: 'Contrato de admissão', status: 'Pendente' }]} fields={documentoFields} showColumnSelector={false} />
                </Grid>
            );
        }

        if (type === 'consultaCredito') {
            return (
                <FormCard onSubmit={(event) => event.preventDefault()}>
                    <Row>CPF<Input defaultValue={funcionario?.cpf} /></Row>
                    <Row>Serviço<Select><option>Consulta CPF</option><option>Consulta completa</option></Select></Row>
                    <Actions><ModalSimpleActionButton type="submit">Consultar</ModalSimpleActionButton></Actions>
                </FormCard>
            );
        }

        if (type === 'boleto') {
            return (
                <FormCard onSubmit={(event) => event.preventDefault()}>
                    <Row>Tipo<Select><option>Boleto</option><option>Crediário</option><option>Promissória</option></Select></Row>
                    <Row>Valor<Input type="number" step="0.01" /></Row>
                    <Row>Vencimento<Input type="date" /></Row>
                    <Actions><ModalSimpleActionButton type="submit">Gerar</ModalSimpleActionButton></Actions>
                </FormCard>
            );
        }

        if (type === 'clientes') {
            return (
                <Table
                    title="Clientes do Funcionário"
                    data={[
                        { codigo: 1001, nome: 'Cliente Exemplo', telefone: '(41) 99999-0000', ultimaCompra: '19/06/2026' },
                    ]}
                    fields={clienteFields}
                    showColumnSelector={false}
                />
            );
        }

        if (type === 'valeCompra') {
            return (
                <FormCard onSubmit={(event) => event.preventDefault()}>
                    <Row>Limite de compra<Input type="number" step="0.01" /></Row>
                    <Row>Observação<Textarea rows={4} /></Row>
                    <Actions><ModalSimpleActionButton type="submit">Salvar Limite</ModalSimpleActionButton></Actions>
                </FormCard>
            );
        }

        if (type === 'comissaoProdutos') {
            return (
                <Grid>
                    <FormCard onSubmit={(event) => event.preventDefault()}>
                        <Row>Produto<Input /></Row>
                        <Row>Comissão<Input type="number" step="0.01" /></Row>
                        <Actions><ModalSimpleActionButton type="submit">Adicionar Comissão</ModalSimpleActionButton></Actions>
                    </FormCard>
                    <Table title="Comissões por Produto" data={[{ produto: 'Produto Exemplo', percentual: '5%', valor: 'R$ 0,00' }]} fields={comissaoProdutoFields} showColumnSelector={false} />
                </Grid>
            );
        }

        return (
            <Grid>
                <FormCard onSubmit={(event) => event.preventDefault()}>
                    <Row>Data<Input type="date" /></Row>
                    <Row>Horário<Input type="time" /></Row>
                    <Row>Cliente<Input /></Row>
                    <Actions><ModalSimpleActionButton type="submit">Salvar Agendamento</ModalSimpleActionButton></Actions>
                </FormCard>
                <Table title="Agendamentos" data={[{ data: '19/06/2026', horario: '09:00', cliente: 'Cliente Exemplo', status: 'Agendado' }]} fields={agendamentoFields} showColumnSelector={false} />
            </Grid>
        );
    };

    return (
        <PageLayout
            title={pageTitles[type]}
            sections={sections}
        >
            {renderContent()}
        </PageLayout>
    );
};
