import React, { useMemo, useRef, useState } from 'react';
import {
    useNavigate,
    useParams,
} from 'react-router-dom';
import { BsTelephoneFill } from 'react-icons/bs';
import {
    FaBriefcase,
    FaClock,
    FaFileAlt,
    FaLock,
    FaPen,
    FaUser,
} from 'react-icons/fa';
import { IoBusiness } from 'react-icons/io5';
import styled from 'styled-components';
import {
    PageLayout,
    type PageLayoutMenuSection,
} from '../../../../common/components/PageLayout';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { FloatingActions } from '../../../../common/components/Buttons/FloatingActions';
import { Input, Radio, Select } from '../../../../common/components/Ui';
import {
    ModalSimple,
    ModalSimpleFooter,
    ModalSimpleFormRow,
    ModalSimpleInlineOptions,
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import type { Funcionario } from '../../../../types/Funcionario';
import {
    funcionariosMockData,
    getFuncionarioStatusLabel,
} from '../../data/funcionariosListConfig';
import { ModalAddFuncionario } from './ModalAddFuncionario';
import {
    DetailProfileCard,
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

const ModalSectionTitle = styled.h4`
    margin: 10px 0 0;
    padding-bottom: var(--space-xs);
    border-bottom: 1px solid var(--theme-border, #d8e2ef);
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-md);
    font-weight: 500;
`;

const ServiceList = styled.div`
    display: grid;
    border: 1px solid var(--theme-border, #d8e2ef);
`;

const ServiceButton = styled.button`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-sm);
    align-items: center;
    min-height: 36px;
    padding: var(--space-xs) var(--space-sm);
    border: 0;
    border-bottom: 1px solid var(--theme-border, #d8e2ef);
    background: var(--theme-surface, #fff);
    color: var(--theme-text, #0f172a);
    text-align: left;

    &:last-child {
        border-bottom: 0;
    }
`;

const InlinePercent = styled.div`
    display: grid;
    grid-template-columns: minmax(110px, 170px) auto;
    gap: 6px;
    align-items: center;
`;

interface DisplayField {
    label: string;
    value: string;
}

interface Section {
    title: string;
    icon: React.ReactNode;
    fields: DisplayField[];
}

function nv(value: unknown): string {
    if (value === null || value === undefined || value === '') {
        return '--';
    }

    return String(value);
}

function buildFuncionarioFromId(id?: string): Funcionario | undefined {
    if (!id) {
        return undefined;
    }

    return funcionariosMockData.find((funcionario) => String(funcionario.id_funcionario) === id) ?? {
        id_funcionario: Number(id),
        nome: `Funcionário ${id}`,
        cpf: '',
        ativo: 'A',
    };
}

function buildMenuSections(
    funcionario: Funcionario | undefined,
    openEditModal: () => void,
    openConfidentialModal: () => void,
    openCreditModal: () => void,
    openBillingModal: () => void
): PageLayoutMenuSection[] {
    const id = funcionario?.id_funcionario;
    const nome = encodeURIComponent(funcionario?.nome ?? '');

    return [
        {
            titulo: 'Dados do Funcionário',
            paginas: [
                { titulo: 'Alterar Dados', action: openEditModal },
                { titulo: 'Informações Confidenciais', action: openConfidentialModal },
            ],
        },
        {
            titulo: 'Relatórios',
            paginas: [
                { titulo: 'Relatório de Comissão', href: id ? `/funcionarios/relatorio-comissao?id_funcionario=${id}&nome_funcionario=${nome}` : '' },
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
                { titulo: 'Consulta Crédito', action: openCreditModal },
                { titulo: 'Gerar Boleto / Crediário / Promissória', action: openBillingModal },
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

function buildSections(funcionario: Funcionario): Section[] {
    return [
        {
            title: 'Dados do Funcionário',
            icon: <FaUser />,
            fields: [
                { label: 'Código do Funcionário', value: nv(funcionario.id_funcionario) },
                { label: 'Nome Funcionário', value: nv(funcionario.nome) },
                { label: 'Função', value: nv(funcionario.funcao) },
                { label: 'Data de Nascimento', value: nv(funcionario.dataNascimento) },
                { label: 'Sexo', value: funcionario.sexo === 'F' ? 'FEMININO' : funcionario.sexo === 'M' ? 'MASCULINO' : '--' },
                { label: 'Nome do Pai', value: nv((funcionario as any).nomePai) },
                { label: 'Nome da Mãe', value: nv((funcionario as any).nomeMae) },
                { label: 'Naturalidade', value: nv((funcionario as any).naturalidade) },
                { label: 'UF Naturalidade', value: nv((funcionario as any).ufNaturalidade) },
                { label: 'Nacionalidade', value: nv((funcionario as any).nacionalidade) },
                { label: 'Estado Civil', value: nv((funcionario as any).estadoCivil) },
                { label: 'Instrução', value: nv((funcionario as any).instrucao) },
                { label: 'Filhos', value: nv((funcionario as any).filhos) },
                { label: 'Situação', value: getFuncionarioStatusLabel(funcionario.ativo) },
            ],
        },
        {
            title: 'Documentos',
            icon: <FaFileAlt />,
            fields: [
                { label: 'CPF', value: nv(funcionario.cpf) },
                { label: 'RG', value: nv((funcionario as any).rg) },
                { label: 'Orgão Expedidor', value: nv((funcionario as any).orgaoExpedidor) },
                { label: 'PIS', value: nv((funcionario as any).pis) },
                { label: 'Data de Admissão', value: nv(funcionario.dataContratacao) },
                { label: 'Data de Demissão', value: nv(funcionario.dataDemissao) },
            ],
        },
        {
            title: 'Contato',
            icon: <BsTelephoneFill />,
            fields: [
                { label: 'Telefone', value: nv(funcionario.telefoneFixo) },
                { label: 'Celular', value: nv(funcionario.celular) },
                { label: 'Pessoa Recado 1', value: nv((funcionario as any).pessoaRecado1) },
                { label: 'Fone Recado 1', value: nv((funcionario as any).foneRecado1) },
                { label: 'Pessoa Recado 2', value: nv((funcionario as any).pessoaRecado2) },
                { label: 'Fone Recado 2', value: nv((funcionario as any).foneRecado2) },
                { label: 'E-mail', value: nv((funcionario as any).email) },
            ],
        },
        {
            title: 'Endereço',
            icon: <IoBusiness />,
            fields: [
                { label: 'CEP', value: nv((funcionario as any).cep) },
                { label: 'Tipo Endereço', value: nv((funcionario as any).tipoEndereco) },
                { label: 'Endereço', value: nv((funcionario as any).endereco) },
                { label: 'Número', value: nv((funcionario as any).numero) },
                { label: 'Complemento', value: nv((funcionario as any).complemento) },
                { label: 'Bairro', value: nv((funcionario as any).bairro) },
                { label: 'Cidade', value: nv((funcionario as any).cidade) },
                { label: 'Estado', value: nv((funcionario as any).estado) },
            ],
        },
        {
            title: 'Informações Adicionais',
            icon: <FaBriefcase />,
            fields: [
                { label: 'Setor', value: nv(funcionario.setor) },
                { label: 'Cargo', value: nv(funcionario.cargo) },
                { label: 'Observações', value: nv((funcionario as any).informacoesAdicionais) },
            ],
        },
    ];
}

const horarios = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
    'Feriado',
].map((dia) => ({
    dia,
    entrada1: '--',
    saida1: '--',
    entrada2: '--',
    saida2: '--',
}));

export const VisualizarFuncionarioPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const printRef = useRef<HTMLDivElement>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfidentialModal, setShowConfidentialModal] = useState(false);
    const [showCreditModal, setShowCreditModal] = useState(false);
    const [showBillingModal, setShowBillingModal] = useState(false);
    const [funcionarioAtual, setFuncionarioAtual] = useState<Funcionario | undefined>(() => buildFuncionarioFromId(id));

    const funcionario = funcionarioAtual;
    const sections = useMemo(() => (funcionario ? buildSections(funcionario) : []), [funcionario]);
    const menuSections = useMemo(
        () => buildMenuSections(
            funcionario,
            () => setShowEditModal(true),
            () => setShowConfidentialModal(true),
            () => setShowCreditModal(true),
            () => setShowBillingModal(true)
        ),
        [funcionario]
    );

    const quickInfo = useMemo<DisplayField[]>(() => funcionario ? [
        { label: 'Código', value: nv(funcionario.id_funcionario) },
        { label: 'Função', value: nv(funcionario.funcao) },
        { label: 'Situação', value: getFuncionarioStatusLabel(funcionario.ativo) },
        { label: 'Setor', value: nv(funcionario.setor) },
    ] : [], [funcionario]);

    const handleUpdateFuncionario = (data: Funcionario) => {
        setFuncionarioAtual((current) => ({
            ...current,
            ...data,
            id_funcionario: current?.id_funcionario ?? data.id_funcionario,
        }));
        setShowEditModal(false);
    };

    return (
        <PageLayout
            title="Visualização de Funcionário"
            sections={menuSections}
        >
            {funcionario ? (
                <MainCard ref={printRef}>
                    <TopGrid>
                        <FotoColumn>
                            <DetailProfileCard
                                name={funcionario.nome || 'Funcionário sem nome'}
                                badges={[
                                    { icon: <FaUser aria-hidden="true" />, label: getFuncionarioStatusLabel(funcionario.ativo) },
                                    { icon: <FaBriefcase aria-hidden="true" />, label: funcionario.setor || 'Sem setor' },
                                ]}
                            />
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
                                        {section.title === 'Dados do Funcionário' && (
                                            <HeaderActions>
                                                <Botao
                                                    nome="Alterar Dados"
                                                    icone={<FaPen size={16} />}
                                                    action={() => setShowEditModal(true)}
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

                            <SectionBlock>
                                <SectionHeader>
                                    <span className="icon"><FaClock /></span>
                                    <h3>Horário de Trabalho</h3>
                                </SectionHeader>
                                <FieldsGrid>
                                    {horarios.map((horario) => (
                                        <FieldCard key={horario.dia}>
                                            <dt>{horario.dia}</dt>
                                            <dd>{horario.entrada1} às {horario.saida1} / {horario.entrada2} às {horario.saida2}</dd>
                                        </FieldCard>
                                    ))}
                                </FieldsGrid>
                            </SectionBlock>
                        </SectionsColumn>
                    </TopGrid>
                </MainCard>
            ) : (
                <EmptyState>Não foi possível carregar os dados do funcionário.</EmptyState>
            )}

            {showEditModal && (
                <ModalAddFuncionario
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleUpdateFuncionario}
                    initialData={funcionario}
                    mode="edit"
                />
            )}

            {showConfidentialModal && (
                <ModalSimple
                    title="Atualizar Dados Confidenciais"
                    subtitle={funcionario?.nome}
                    size="lg"
                    onClose={() => setShowConfidentialModal(false)}
                    footer={(
                        <ModalSimpleFooter>
                            <ModalSimpleActionButton $variant="secondary" type="button" onClick={() => setShowConfidentialModal(false)}>Fechar</ModalSimpleActionButton>
                            <ModalSimpleActionButton type="button" onClick={() => setShowConfidentialModal(false)}>Gravar</ModalSimpleActionButton>
                        </ModalSimpleFooter>
                    )}
                >
                    <ModalSimpleFormRow>
                        <label><FaLock /> Salário:</label>
                        <Input defaultValue={(funcionario as any)?.salario ?? '0,00'} />
                    </ModalSimpleFormRow>
                    <ModalSectionTitle>Comissão</ModalSectionTitle>
                    <ModalSimpleFormRow>
                        <label>Tipo de Comissão:</label>
                        <ModalSimpleInlineOptions>
                            <label><Radio name="tipoComissao" defaultChecked /> Bruta</label>
                            <label><Radio name="tipoComissao" /> Líquida (por desconto)</label>
                            <label><Radio name="tipoComissao" /> Lucro (por custo)</label>
                        </ModalSimpleInlineOptions>
                    </ModalSimpleFormRow>
                    <ModalSimpleFormRow>
                        <label>Tipo para Produto:</label>
                        <ModalSimpleInlineOptions>
                            <label><Radio name="tipoProduto" /> Reais</label>
                            <label><Radio name="tipoProduto" defaultChecked /> Percentual</label>
                        </ModalSimpleInlineOptions>
                    </ModalSimpleFormRow>
                    <ModalSimpleFormRow>
                        <label>Porcentagem de Venda - Produto:</label>
                        <InlinePercent><Input defaultValue="10,00" /><span>%</span></InlinePercent>
                    </ModalSimpleFormRow>
                    <ModalSimpleFormRow>
                        <label>Tipo para Serviço:</label>
                        <ModalSimpleInlineOptions>
                            <label><Radio name="tipoServico" /> Reais</label>
                            <label><Radio name="tipoServico" defaultChecked /> Percentual</label>
                        </ModalSimpleInlineOptions>
                    </ModalSimpleFormRow>
                    <ModalSimpleFormRow>
                        <label>Porcentagem de Venda - Serviço:</label>
                        <InlinePercent><Input defaultValue="10,00" /><span>%</span></InlinePercent>
                    </ModalSimpleFormRow>
                    <ModalSectionTitle>Dados Bancários</ModalSectionTitle>
                    <ModalSimpleFormRow>
                        <label>Tipo de Conta:</label>
                        <ModalSimpleInlineOptions>
                            <label><Radio name="tipoConta" defaultChecked /> Conta Corrente</label>
                            <label><Radio name="tipoConta" /> Conta Poupança</label>
                        </ModalSimpleInlineOptions>
                    </ModalSimpleFormRow>
                    <ModalSimpleFormRow>
                        <label>Banco:</label>
                        <Select defaultValue="001">
                            <option value="001">001 - BANCO DO BRASIL</option>
                            <option value="104">104 - CAIXA ECONÔMICA FEDERAL</option>
                            <option value="237">237 - BRADESCO</option>
                            <option value="341">341 - ITAÚ</option>
                        </Select>
                    </ModalSimpleFormRow>
                    <ModalSimpleFormRow><label>Agência + DV:</label><Input /></ModalSimpleFormRow>
                    <ModalSimpleFormRow><label>Conta + DV:</label><Input /></ModalSimpleFormRow>
                    <ModalSimpleFormRow><label>Nome Titular:</label><Input /></ModalSimpleFormRow>
                    <ModalSimpleFormRow><label>CPF do Titular:</label><Input /></ModalSimpleFormRow>
                </ModalSimple>
            )}

            {showCreditModal && (
                <ModalSimple
                    title="Escolha a Consulta"
                    subtitle="Qual consulta você deseja realizar para o funcionário?"
                    size="lg"
                    onClose={() => setShowCreditModal(false)}
                >
                    <ModalSectionTitle>Análise de Crédito para CPF</ModalSectionTitle>
                    <ServiceList>
                        {[
                            ['Localiza Max', 'R$ 0,99'],
                            ['Master', 'R$ 1,48'],
                            ['Protesto Nacional', 'R$ 4,85'],
                            ['Crediário Nacional', 'R$ 5,45'],
                            ['Personnalité', 'R$ 15,89'],
                            ['Restritiva Pessoal', 'R$ 5,45'],
                        ].map(([label, price]) => (
                            <ServiceButton type="button" key={label} onClick={() => setShowCreditModal(false)}>
                                <span>{label}</span><strong>{price}</strong>
                            </ServiceButton>
                        ))}
                    </ServiceList>
                    <ModalSectionTitle>Análise de Cheques</ModalSectionTitle>
                    <ServiceList>
                        {[
                            ['Master', 'R$ 1,48'],
                            ['Extra Master (Recomendado)', 'R$ 1,58'],
                        ].map(([label, price]) => (
                            <ServiceButton type="button" key={label} onClick={() => setShowCreditModal(false)}>
                                <span>{label}</span><strong>{price}</strong>
                            </ServiceButton>
                        ))}
                    </ServiceList>
                </ModalSimple>
            )}

            {showBillingModal && (
                <ModalSimple
                    title="Gerar Boleto, Crediário ou Promissória"
                    subtitle="Escolha uma opção abaixo:"
                    size="md"
                    onClose={() => setShowBillingModal(false)}
                >
                    <ServiceList>
                        {[
                            ['Gerar BOLETO', '/financeiro/boleto'],
                            ['Gerar CREDIÁRIO', '/financeiro/crediario'],
                            ['Gerar CARNÊ', '/financeiro/carne'],
                            ['Gerar PROMISSÓRIA', '/financeiro/promissoria'],
                        ].map(([label, href]) => (
                            <ServiceButton
                                type="button"
                                key={label}
                                onClick={() => {
                                    setShowBillingModal(false);
                                    navigate(href);
                                }}
                            >
                                <span>{label}</span><strong>›</strong>
                            </ServiceButton>
                        ))}
                    </ServiceList>
                </ModalSimple>
            )}

            {funcionario && !showEditModal && !showConfidentialModal && !showCreditModal && !showBillingModal && (
                <FloatingActions
                    actions={['print']}
                    labels={{ print: 'Imprimir funcionário' }}
                    printTargetRef={printRef}
                />
            )}
        </PageLayout>
    );
};
