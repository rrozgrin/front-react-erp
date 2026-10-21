import React, { Suspense, lazy, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PageLayout } from '../../../../common/components/PageLayout';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { FloatingActions } from '../../../../common/components/Buttons/FloatingActions';
import type { Cliente } from '../../types/Cliente';
import { FotoClienteCard } from './FotoClienteCard';
import { FaMapMarkerAlt, FaPen, FaUserPlus } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import {
    EmptyState,
    FieldCard,
    FieldsGrid,
    FotoColumn,
    HeaderActions,
    MainCard,
    QuickInfo,
    QuickItem,
    SectionBlock,
    SectionHeader,
    SectionsColumn,
    TopGrid,
} from '../../../../common/components/DetailView';

interface ClienteLocationState {
    cliente?: Cliente;
}

interface DisplayField {
    label: string;
    value: string;
}

interface Section {
    title: string;
    icon: React.ReactNode;
    fields: DisplayField[];
}

interface SectionFieldConfig {
    label: string;
    getValue: (cliente: Cliente) => unknown;
}

interface SectionConfig {
    title: string;
    icon: React.ReactNode;
    fields: SectionFieldConfig[];
}

const RoundedEditButton = styled(Botao)`
    border-radius: 0.25rem;
`;

const ModalAddClientes = lazy(async () => ({
    default: (await import('./ModalAddClientes')).ModalAddClientes,
}));

const EnviarDadosEmailModal = lazy(async () => ({
    default: (await import('./EnviarDadosEmailModal')).EnviarDadosEmailModal,
}));

const AtendimentoComercialModal = lazy(async () => ({
    default: (await import('./AtendimentoComercialModal')).AtendimentoComercialModal,
}));

const ContaCorrenteModal = lazy(async () => ({
    default: (await import('../Financeiro/ContaCorrenteModal')).ContaCorrenteModal,
}));

const AnamneseClienteModal = lazy(async () => ({
    default: (await import('./AnamneseClienteModal')).AnamneseClienteModal,
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

function nv(value: unknown): string {
    if (value === null || value === undefined || value === '') {
        return '--';
    }

    return String(value);
}

function getTipoPessoaLabel(tipoPessoa?: Cliente['tipoPessoa']): string {
    if (tipoPessoa === 'f') {
        return 'Física';
    }

    if (tipoPessoa === 'j') {
        return 'Jurídica';
    }

    return nv(tipoPessoa);
}

function buildClienteFromId(id?: string): Cliente | undefined {
    if (!id) {
        return undefined;
    }

    return { id, nome: `Cliente ${id}`, tipoPessoa: 'f' };
}

function buildMenuSections(
    openEmailModal: () => void,
    openAtendimentoComercialModal: () => void,
    openAnamneseModal: () => void,
    clienteId?: string,
    onFinanceiro?: () => void,
    onContaCorrente?: () => void,
    onContaCorrenteCliente?: () => void,
) {
    return [
        {
            titulo: 'Dados / Atendimento',
            paginas: [
                { titulo: 'Enviar dados via e-mail', action: openEmailModal },
                { titulo: 'Atendimento Comercial', action: openAtendimentoComercialModal },
            ],
        },
        {
            titulo: 'Financeiro / Cobrança',
            paginas: [
                { titulo: 'Financeiro do Cliente', action: onFinanceiro, href: onFinanceiro ? undefined : '' },
                { titulo: 'Conta Corrente', action: onContaCorrente },
                { titulo: 'Conta Corrente Cliente', action: onContaCorrenteCliente, href: onContaCorrenteCliente ? undefined : '' },
                { titulo: 'Débitos Pendentes', href: clienteId ? `/clientes/visualizar/${clienteId}/debitos-pendentes` : '' },
                { titulo: 'Parcelar Débito', href: '' },
                { titulo: 'Nota de Crédito', href: '' },
            ],
        },
        {
            titulo: 'Crédito / Restrição',
            paginas: [
                { titulo: 'Consulta Crédito', href: '' },
                { titulo: 'Negativar / Excluir Negativação', href: '' },
                { titulo: 'Encaminhar para Protesto', href: '' },
            ],
        },
        {
            titulo: 'Documentos e Arquivos',
            paginas: [
                { titulo: 'Documentos Administrativos', href: '' },
                { titulo: 'Arquivos e Pastas', href: '' }
            ],
        },
        {
            titulo: 'Controle',
            paginas: [
                { titulo: 'Ocorrências', href: clienteId ? `/clientes/visualizar/${clienteId}/ocorrencias` : '' },
            ],
        },
        {
            titulo: 'Saúde / Atendimento Clínico',
            paginas: [
                { titulo: 'Anamnese Cliente', action: openAnamneseModal }
            ],
        },
    ];
}

const CLIENTE_SECTION_CONFIG: SectionConfig[] = [
    {
        title: 'Dados pessoais',
        icon: <FaUserPlus />,
        fields: [
            { label: 'Código', getValue: (cliente) => cliente.id },
            { label: 'Tipo de Pessoa', getValue: (cliente) => getTipoPessoaLabel(cliente.tipoPessoa) },
            { label: 'Documento (CPF / CNPJ)', getValue: (cliente) => cliente.documento },
            { label: 'Data de Nascimento', getValue: (cliente) => cliente.dataNascimento },
            { label: 'Estado Civil', getValue: (cliente) => cliente.estadoCivil },
            { label: 'CNH', getValue: (cliente) => cliente.cnh },
            { label: 'Nome do Pai', getValue: (cliente) => cliente.nomePai },
            { label: 'Nome da Mãe', getValue: (cliente) => cliente.nomeMae },
            { label: 'Status', getValue: (cliente) => cliente.status?.toUpperCase() },
        ],
    },
    {
        title: 'Contatos',
        icon: <BsTelephoneFill />,
        fields: [
            { label: 'E-mail', getValue: (cliente) => cliente.email },
            { label: 'Telefone', getValue: (cliente) => cliente.telefone },
            { label: 'Celular', getValue: (cliente) => cliente.celular },
            { label: 'Tel. do Pai', getValue: (cliente) => cliente.telefonePai },
            { label: 'Tel. da Mãe', getValue: (cliente) => cliente.telefoneMae },
        ],
    },
    {
        title: 'Endereço',
        icon: <FaMapMarkerAlt />,
        fields: [
            { label: 'Localidade', getValue: (cliente) => cliente.endereco },
            { label: 'Número', getValue: (cliente) => cliente.numero },
            { label: 'Complemento', getValue: (cliente) => cliente.complemento },
            { label: 'Cidade', getValue: (cliente) => cliente.cidade },
            { label: 'Estado (UF)', getValue: (cliente) => cliente.estado },
            { label: 'CEP', getValue: (cliente) => cliente.cep },
        ],
    },
];

function buildSections(cliente: Cliente): Section[] {
    return CLIENTE_SECTION_CONFIG.map((section) => ({
        title: section.title,
        icon: section.icon,
        fields: section.fields.map((field) => ({
            label: field.label,
            value: nv(field.getValue(cliente)),
        })),
    }));
}

function buildQuickInfo(cliente: Cliente): DisplayField[] {
    return [
        { label: 'Código', value: nv(cliente.id) },
        { label: 'Tipo de Pessoa', value: getTipoPessoaLabel(cliente.tipoPessoa) },
        { label: 'Status', value: nv(cliente.status).toUpperCase() },
        { label: 'Segmento', value: nv(cliente.segmento) },
    ];
}

// ─── Component ───────────────────────────────────────────────────────────────

export const VisualizarClientesPage: React.FC = () => {
    const [showEditClienteModal, setShowEditClienteModal] = useState(false);
    const [showEnviarEmailModal, setShowEnviarEmailModal] = useState(false);
    const [showAtendimentoComercialModal, setShowAtendimentoComercialModal] = useState(false);
    const [showContaCorrenteModal, setShowContaCorrenteModal] = useState(false);
    const [showAnamneseModal, setShowAnamneseModal] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    const state = location.state as ClienteLocationState | null;
    const printRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const [clienteAtual, setClienteAtual] = useState<Cliente | undefined>(() => state?.cliente ?? buildClienteFromId(id));

    const cliente = clienteAtual;
    const quickInfo = useMemo(() => (cliente ? buildQuickInfo(cliente) : []), [cliente]);
    const menuSections = useMemo(
        () => buildMenuSections(
            () => setShowEnviarEmailModal(true),
            () => setShowAtendimentoComercialModal(true),
            () => setShowAnamneseModal(true),
            id,
            id ? () => navigate(`/clientes/visualizar/${id}/financeiro`, { state: { cliente: clienteAtual } }) : undefined,
            () => setShowContaCorrenteModal(true),
            id ? () => navigate(`/clientes/visualizar/${id}/conta-corrente`, { state: { cliente: clienteAtual } }) : undefined,
        ),
        [id, clienteAtual, navigate]
    );

    const handleUpdateCliente = (data: Cliente) => {
        setClienteAtual((prev) => ({
            ...prev,
            ...data,
            id: prev?.id ?? data.id,
        }));
        setShowEditClienteModal(false);
    };

    const sections = useMemo<Section[]>(() => {
        if (!cliente) {
            return [];
        }

        return buildSections(cliente);
    }, [cliente]);

    return (
        <PageLayout
            title="Visualização de Cliente"
            sections={menuSections}
        >


            {cliente ? (
                <MainCard ref={printRef}>
                    <TopGrid>
                        <FotoColumn>
                            <FotoClienteCard cliente={cliente} />

                            <QuickInfo>
                                {quickInfo.map((item) => (
                                    <QuickItem key={item.label}>
                                        <dt>{item.label}</dt>
                                        <dd>{item.value}</dd>
                                    </QuickItem>
                                ))}
                            </QuickInfo>
                        </FotoColumn>

                        <SectionsColumn>
                            {sections.map((section) => (
                                <SectionBlock key={section.title}>
                                    <SectionHeader>
                                        <span className="icon">{section.icon}</span>
                                        <h3>{section.title}</h3>
                                        {section.title === 'Dados pessoais' && (
                                            <HeaderActions>
                                                <RoundedEditButton
                                                    nome="Editar"
                                                    icone={<FaPen size={16} />}
                                                    action={() => setShowEditClienteModal(true)}
                                                />
                                            </HeaderActions>
                                        )}
                                    </SectionHeader>

                                    <FieldsGrid>
                                        {section.fields.map((field) => (
                                            <FieldCard key={field.label}>
                                                <dt>{field.label}</dt>
                                                <dd>{field.value}</dd>
                                            </FieldCard>
                                        ))}
                                    </FieldsGrid>
                                </SectionBlock>
                            ))}
                        </SectionsColumn>
                    </TopGrid>
                </MainCard>
            ) : (
                <EmptyState>Não foi possível carregar os dados do cliente.</EmptyState>
            )}

            <Suspense fallback={null}>
                {showEditClienteModal ? (
                    <ModalAddClientes
                        show={showEditClienteModal}
                        onClose={() => setShowEditClienteModal(false)}
                        onSubmit={handleUpdateCliente}
                        initialData={cliente}
                        mode="edit"
                    />
                ) : null}

                {showEnviarEmailModal ? (
                    <EnviarDadosEmailModal
                        open={showEnviarEmailModal}
                        onClose={() => setShowEnviarEmailModal(false)}
                        initialEmail={cliente?.email}
                    />
                ) : null}

                {showAtendimentoComercialModal ? (
                    <AtendimentoComercialModal
                        open={showAtendimentoComercialModal}
                        onClose={() => setShowAtendimentoComercialModal(false)}
                    />
                ) : null}

                {showContaCorrenteModal ? (
                    <ContaCorrenteModal
                        open={showContaCorrenteModal}
                        clienteNome={cliente?.nome}
                        onClose={() => setShowContaCorrenteModal(false)}
                    />
                ) : null}

                {showAnamneseModal ? (
                    <AnamneseClienteModal
                        open={showAnamneseModal}
                        clienteNome={cliente?.nome}
                        onClose={() => setShowAnamneseModal(false)}
                    />
                ) : null}
            </Suspense>

            {cliente && !showEditClienteModal && (
                <FloatingActions
                    actions={['print']}
                    labels={{ print: 'Imprimir cliente' }}
                    printTargetRef={printRef}
                />
            )}
        </PageLayout>
    );
};
