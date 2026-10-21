import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
    useNavigate,
} from 'react-router-dom';
import {
    PageLayout,
    type PageLayoutMenuSection,
} from '../../../../common/components/PageLayout';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { type TableField } from '../../../../common/components/Table';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { RelatorioTemplate } from '../../../../common/components/Templates/RelatorioTemplate';
import {
    ModalSimpleActionButton,
} from '../../../../common/components/ModalSimple';
import { Input, Radio, Select } from '../../../../common/components/Ui';

type PaymentKind = 'boleto' | 'crediario' | 'carne' | 'promissoria';
type PageMode = 'form' | 'excluidos' | 'relatorio';

interface PaymentConfig {
    kind: PaymentKind;
    title: string;
    plural: string;
    menuTitle: string;
    basePath: string;
    steps: Array<'venda' | 'banco' | 'consumidor'>;
    hasBankStep?: boolean;
    hasJurosAtraso?: boolean;
    actionLabel: string;
}

const configs: Record<PaymentKind, PaymentConfig> = {
    boleto: {
        kind: 'boleto',
        title: 'Gerar Boleto',
        plural: 'Boletos',
        menuTitle: 'Vendas no Boleto',
        basePath: '/financeiro/boleto',
        steps: ['venda', 'banco', 'consumidor'],
        hasBankStep: true,
        actionLabel: 'Gerar Boleto',
    },
    crediario: {
        kind: 'crediario',
        title: 'Gerar Crediário',
        plural: 'Crediários',
        menuTitle: 'Vendas no Crediário',
        basePath: '/financeiro/crediario',
        steps: ['venda', 'banco', 'consumidor'],
        hasBankStep: true,
        actionLabel: 'Gerar Crediário',
    },
    carne: {
        kind: 'carne',
        title: 'Gerar Carnê',
        plural: 'Carnês',
        menuTitle: 'Vendas no Carnê',
        basePath: '/financeiro/carne',
        steps: ['venda', 'consumidor'],
        actionLabel: 'Gerar Carnê',
    },
    promissoria: {
        kind: 'promissoria',
        title: 'Gerar Promissória',
        plural: 'Promissórias',
        menuTitle: 'Promissória',
        basePath: '/financeiro/promissoria',
        steps: ['venda', 'consumidor'],
        hasJurosAtraso: true,
        actionLabel: 'Gerar Promissória',
    },
};

const PageGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.78fr);
    gap: var(--space-md);

    @media (max-width: 1040px) {
        grid-template-columns: 1fr;
    }
`;

const Panel = styled.section`
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.28));
    background: var(--theme-surface, #fff);
    padding: 22px;
`;

const PanelTitle = styled.h3`
    margin: 0 0 18px;
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--theme-border, rgba(148, 163, 184, 0.35));
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 400;
`;

const Steps = styled.div`
    display: flex;
    gap: var(--space-2xs);
    margin-bottom: 0;
`;

const StepButton = styled.button<{ $active: boolean }>`
    min-height: 44px;
    padding: 0 18px;
    border: 1px solid ${({ $active }) => ($active ? 'var(--theme-border, #d8e2ef)' : 'transparent')};
    border-bottom-color: ${({ $active }) => ($active ? 'var(--theme-surface, #fff)' : 'transparent')};
    background: ${({ $active }) => ($active ? 'var(--theme-surface, #fff)' : 'transparent')};
    color: #000;
    font-weight: 400;
`;

const Form = styled.form`
    display: grid;
    gap: 18px;
`;

const Row = styled.label`
    display: grid;
    grid-template-columns: 210px minmax(0, 1fr);
    gap: var(--space-sm);
    align-items: center;
    color: #000;

    input,
    select,
    textarea {
        min-height: 36px;
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: 0.125rem;
        padding: 6px var(--space-xs);
    }

    @media (max-width: 680px) {
        grid-template-columns: 1fr;
    }
`;

const InlineOptions = styled.div`
    display: flex;
    gap: 18px;
    flex-wrap: wrap;

    label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }
`;

const ParcelsHeader = styled.div`
    display: grid;
    grid-template-columns: 80px repeat(4, minmax(0, 1fr));
    gap: var(--space-xs);
    padding: var(--space-xs);
    background: var(--theme-surface-muted, rgba(248, 250, 252, 0.95));
    color: #000;
    font-weight: 400;
`;

const ParcelRow = styled.div`
    display: grid;
    grid-template-columns: 80px repeat(4, minmax(0, 1fr));
    gap: var(--space-xs);
    align-items: center;

    input {
        min-height: 34px;
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: 0.125rem;
        padding: 6px var(--space-xs);
    }
`;

const Actions = styled.div`
    display: flex;
    justify-content: right;
    gap: var(--space-sm);
    padding-top: var(--space-sm);
`;

const HelpPanel = styled(Panel)`
    color: #000;

    h3 {
        margin: 0 0 18px;
        text-align: center;
        color: #000;
        font-size: var(--font-size-sm);
        font-weight: 500;
    }

    ul {
        margin: 0;
        padding-left: 18px;
        columns: 2;
        gap: 28px;
        font-size: var(--font-size-sm);
    }

    li {
        break-inside: avoid;
        margin-bottom: 10px;
    }

    strong {
        color: #000000;
        font-weight: 500;
    }

    @media (max-width: 680px) {
        ul {
            columns: 1;
        }
    }
`;

const BankChoice = styled.label`
    display: inline-grid;
    gap: var(--space-xs);
    justify-items: center;
    margin: 10px 0 var(--space-lg) 70px;
    color: #000;

    span {
        width: 60px;
        height: 60px;
        display: grid;
        place-items: center;
        border-radius: var(--radius-md);
        background: #d71920;
        color: #fff;
        font-weight: 400;
    }
`;

const Required = styled.span`
    color: #dc2626;
    font-weight: 400;
`;

const ReportFormPanel = styled(Panel)`
    width: min(760px, 100%);
    margin: 0 auto 22px;
`;

const ReportTitle = styled.h3`
    margin: 0 0 var(--space-sm);
    padding-bottom: 10px;
    border-bottom: 1px solid var(--theme-border, rgba(148, 163, 184, 0.35));
    text-align: center;
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 400;
`;

const ReportRow = styled.label`
    display: grid;
    grid-template-columns: 170px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;

    input,
    select {
        min-height: 34px;
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: 0.125rem;
        padding: 6px var(--space-xs);
    }

    @media (max-width: 680px) {
        grid-template-columns: 1fr;
    }
`;

const DateRange = styled.div`
    display: flex;
    gap: var(--space-xs);
    align-items: center;
    flex-wrap: wrap;

    input {
        min-width: 150px;
    }
`;

const excludedFields: TableField<PaymentRecord>[] = [
    { id: 'codigo', header: 'Código', accessorKey: 'codigo' },
    { id: 'cliente', header: 'Cliente', accessorKey: 'cliente' },
    { id: 'emissao', header: 'Emissão', accessorKey: 'emissao' },
    { id: 'valor', header: 'Valor', accessorKey: 'valor' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
];

const reportFields: TableField<PaymentRecord>[] = [
    { id: 'codigo', header: 'Código', accessorKey: 'codigo' },
    { id: 'cliente', header: 'Cliente', accessorKey: 'cliente' },
    { id: 'parcelas', header: 'Parcelas', accessorKey: 'parcelas' },
    { id: 'valor', header: 'Valor', accessorKey: 'valor' },
    { id: 'vencimento', header: 'Vencimento', accessorKey: 'vencimento' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
];

interface PaymentRecord {
    codigo: string;
    cliente: string;
    emissao: string;
    parcelas: string;
    valor: string;
    vencimento: string;
    status: string;
}

const records: PaymentRecord[] = [
    {
        codigo: '1001',
        cliente: 'Cliente Exemplo',
        emissao: '19/06/2026',
        parcelas: '3',
        valor: 'R$ 100,00',
        vencimento: '19/07/2026',
        status: 'Aberto',
    },
];

function fieldsToExcelColumns(fields: TableField<PaymentRecord>[]): ExcelColumn<PaymentRecord>[] {
    return fields.map((field) => ({
        key: field.id,
        header: field.header,
        accessorKey: field.accessorKey,
        accessorFn: field.accessorFn,
    }));
}

function buildMenu(config: PaymentConfig): PageLayoutMenuSection[] {
    return [
        {
            titulo: 'Vendas Parceladas',
            paginas: Object.values(configs).map((item) => ({
                titulo: item.menuTitle,
                href: item.basePath,
                children: [
                    { titulo: item.title, href: item.basePath },
                    { titulo: `${item.plural} Excluídos`, href: `${item.basePath}/excluidos` },
                    { titulo: `Relatório de ${item.plural}`, href: `${item.basePath}/relatorio` },
                ],
            })),
        },
        {
            titulo: config.plural,
            paginas: [
                { titulo: config.title, href: config.basePath },
                { titulo: `${config.plural} Excluídos`, href: `${config.basePath}/excluidos` },
                { titulo: `Relatório de ${config.plural}`, href: `${config.basePath}/relatorio` },
            ],
        },
    ];
}

function paymentAdvantages(config: PaymentConfig) {
    return (
        <HelpPanel>
            <h3>Conheça as vantagens de vender à vista ou parcelado no {config.plural.toLowerCase()}</h3>
            <ul>
                <li><strong>Faturamento mensal</strong> para estabilidade financeira.</li>
                <li><strong>Controle total</strong> das parcelas e relatórios.</li>
                <li><strong>Venda mais barato que a concorrência</strong> do seu segmento.</li>
                <li><strong>Fidelidade da carteira</strong> de consumidores.</li>
                <li><strong>Poder de barganha</strong> junto aos fornecedores.</li>
                <li><strong>Aumentar sua margem de lucro</strong> com parcelamento controlado.</li>
                <li><strong>Disponibilizar meios de pagar</strong> em bancos, lotéricas e caixas eletrônicos.</li>
                <li><strong>Cliente seletivo</strong> com análise cadastral antes da venda.</li>
            </ul>
        </HelpPanel>
    );
}

function VendaStep({ config, onNext }: { config: PaymentConfig; onNext: () => void }) {
    return (
        <Panel>
            <PanelTitle>Dados da Venda</PanelTitle>
            <Form onSubmit={(event) => { event.preventDefault(); onNext(); }}>
                <Row>
                    <span>{config.kind === 'boleto' || config.kind === 'crediario' ? 'Valor da Venda (R$):' : 'Valor Total Débito:'}</span>
                    <Input defaultValue="100,00" />
                </Row>
                <Row><span>Número de Parcelas:</span><Select defaultValue="1"><option>1</option><option>2</option><option>3</option><option>6</option><option>12</option></Select></Row>
                <Row><span>Índice de Juros no Parcelamento:</span><Select defaultValue="0"><option value="0">0%</option><option value="1">1%</option><option value="2">2%</option><option value="5">5%</option></Select></Row>
                <Row><span>Primeiro vencimento:</span><Input type="date" defaultValue="2026-07-19" /></Row>
                <ParcelsHeader>
                    <span>Parcela</span>
                    <span>Valor da Parcela</span>
                    <span>Vencimento</span>
                    <span>Multa por Atraso</span>
                    <span>{config.hasJurosAtraso ? 'Juros por Atraso' : ''}</span>
                </ParcelsHeader>
                <ParcelRow>
                    <span>Parcela 1</span>
                    <Input defaultValue="100,00" />
                    <Input defaultValue="19/07/2026" />
                    <Input defaultValue="2" />
                    {config.hasJurosAtraso ? <Input defaultValue="1%" /> : <span />}
                </ParcelRow>
                {(config.kind === 'boleto' || config.kind === 'crediario') && (
                    <>
                        <Row>
                            <span>Desconto até o Vencimento:</span>
                            <InlineOptions><label><Radio name="desconto" /> Sim</label><label><Radio name="desconto" defaultChecked /> Não</label></InlineOptions>
                        </Row>
                        <Row>
                            <span>Escrever Mensagem Personalizada:</span>
                            <InlineOptions><label><Radio name="mensagem" /> Sim</label><label><Radio name="mensagem" defaultChecked /> Não</label></InlineOptions>
                        </Row>
                    </>
                )}
                <Actions><ModalSimpleActionButton type="submit">Avançar</ModalSimpleActionButton></Actions>
            </Form>
        </Panel>
    );
}

function BancoStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
    return (
        <Panel>
            <PanelTitle>Banco para Emissão do Boleto</PanelTitle>
            <BankChoice>
                <Radio defaultChecked />
                <span>Bradesco</span>
            </BankChoice>
            <Actions>
                <ModalSimpleActionButton $variant="secondary" type="button" onClick={onBack}>Voltar</ModalSimpleActionButton>
                <ModalSimpleActionButton type="button" onClick={onNext}>Avançar</ModalSimpleActionButton>
            </Actions>
        </Panel>
    );
}

function ConsumidorStep({ config, onBack }: { config: PaymentConfig; onBack: () => void }) {
    return (
        <Panel>
            <PanelTitle>Dados do Consumidor</PanelTitle>
            <Form onSubmit={(event) => event.preventDefault()}>
                <Row><span>Nº Cliente</span><Input /></Row>
                <Row><span>CPF / CNPJ <Required>*</Required></span><Input /></Row>
                <Row><span>Nome <Required>*</Required></span><Input /></Row>
                <Row><span>CEP <Required>*</Required></span><Input /></Row>
                <Row><span>RG</span><Input /></Row>
                <Row><span>Tipo Endereço <Required>*</Required></span><Select><option>Selecione</option><option>Rua</option><option>Avenida</option></Select></Row>
                <Row><span>Endereço <Required>*</Required></span><Input /></Row>
                <Row><span>Número <Required>*</Required></span><Input /></Row>
                <Row><span>Complemento</span><Input /></Row>
                <Row><span>Bairro <Required>*</Required></span><Input /></Row>
                <Row><span>Cidade <Required>*</Required></span><Input /></Row>
                <Row><span>UF <Required>*</Required></span><Input /></Row>
                <Row><span>Fone Residencial</span><Input placeholder="DDD + Número" /></Row>
                {config.kind === 'boleto' && (
                    <>
                        <Row><span>Renda Aproximada</span><Input defaultValue="R$ 0,00" /></Row>
                        <Row><span>Empresa Onde Trabalha</span><Input /></Row>
                        <Row><span>Cargo</span><Input /></Row>
                    </>
                )}
                <Actions>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onBack}>Voltar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="submit">{config.actionLabel}</ModalSimpleActionButton>
                </Actions>
            </Form>
        </Panel>
    );
}

function RelatorioFilters({ config, onGenerate }: { config: PaymentConfig; onGenerate: () => void }) {
    return (
        <ReportFormPanel>
            <ReportTitle>Selecione os Dados para o Relatório</ReportTitle>
            <Form onSubmit={(event) => { event.preventDefault(); onGenerate(); }}>
                <ReportRow>
                    <span>Busca por Cliente:</span>
                    <Input placeholder="Buscar por Nome, CPF/CNPJ, RG, Etc." />
                </ReportRow>
                <ReportRow>
                    <span>Filtro:</span>
                    <Select defaultValue="emitidos">
                        <option value="emitidos">Todos os Emitidos</option>
                        <option value="pagos">Pagos</option>
                        <option value="abertos">Em aberto</option>
                        <option value="vencidos">Vencidos</option>
                    </Select>
                </ReportRow>
                <ReportRow>
                    <span>Período:</span>
                    <DateRange>
                        <Input type="date" />
                        <span>À</span>
                        <Input type="date" />
                    </DateRange>
                </ReportRow>
                {config.kind === 'carne' && (
                    <ReportRow>
                        <span>Número Contrato:</span>
                        <Input />
                    </ReportRow>
                )}
                {config.kind === 'promissoria' && (
                    <ReportRow>
                        <span>Tipo de Período:</span>
                        <InlineOptions>
                            <label><Radio name="tipoPeriodo" defaultChecked /> Data de cadastro</label>
                            <label><Radio name="tipoPeriodo" /> Data de vencimento</label>
                        </InlineOptions>
                    </ReportRow>
                )}
                <Actions>
                    <ModalSimpleActionButton type="submit">Gerar Relatório</ModalSimpleActionButton>
                </Actions>
            </Form>
        </ReportFormPanel>
    );
}

function PagamentoFormPage({ kind }: { kind: PaymentKind }) {
    const config = configs[kind];
    const [stepIndex, setStepIndex] = useState(0);
    const activeStep = config.steps[stepIndex];
    const sections = useMemo(() => buildMenu(config), [config]);

    return (
        <PageLayout
            title={config.title}
            sections={sections}
            toolbar={(
                <>
                    <Botao nome={`${config.plural} Excluídos`} action={() => window.location.assign(`${config.basePath}/excluidos`)} />
                    <Botao nome={`Relatório de ${config.plural}`} action={() => window.location.assign(`${config.basePath}/relatorio`)} />
                </>
            )}
        >
            <Steps>
                {config.steps.map((step, index) => (
                    <StepButton key={step} type="button" $active={index === stepIndex} onClick={() => setStepIndex(index)}>
                        PASSO {index + 1}
                    </StepButton>
                ))}
            </Steps>
            <PageGrid>
                {activeStep === 'venda' && <VendaStep config={config} onNext={() => setStepIndex((current) => Math.min(current + 1, config.steps.length - 1))} />}
                {activeStep === 'banco' && (
                    <BancoStep
                        onBack={() => setStepIndex((current) => Math.max(current - 1, 0))}
                        onNext={() => setStepIndex((current) => Math.min(current + 1, config.steps.length - 1))}
                    />
                )}
                {activeStep === 'consumidor' && <ConsumidorStep config={config} onBack={() => setStepIndex((current) => Math.max(current - 1, 0))} />}
                {paymentAdvantages(config)}
            </PageGrid>
        </PageLayout>
    );
}

function PagamentoListPage({ kind, mode }: { kind: PaymentKind; mode: Exclude<PageMode, 'form'> }) {
    const config = configs[kind];
    const sections = useMemo(() => buildMenu(config), [config]);
    const [reportGenerated, setReportGenerated] = useState(mode === 'excluidos');
    const fields = mode === 'excluidos' ? excludedFields : reportFields;
    const excelColumns = useMemo(() => fieldsToExcelColumns(fields), [fields]);

    return (
        <RelatorioTemplate
            titulo={mode === 'excluidos' ? `${config.plural} Excluídos` : `Relatório de ${config.plural}`}
            secoes={sections}
            tituloTabela={mode === 'excluidos' ? `${config.plural} excluídos` : `Relatório de ${config.plural}`}
            descricaoTabela="Use as colunas visíveis para definir os dados exibidos no relatório."
            dados={records}
            campos={fields}
            colunasExcel={excelColumns}
            arquivoExcel={mode === 'excluidos' ? `${config.kind}_excluidos` : `relatorio_${config.kind}`}
            mensagemVazia="Nenhum registro encontrado."
            painelFiltros={mode === 'relatorio' ? <RelatorioFilters config={config} onGenerate={() => setReportGenerated(true)} /> : undefined}
            exibirTabela={reportGenerated}
            configurarColunas="tabela"
            impressao={{ titulo: mode === 'excluidos' ? `${config.plural} Excluídos` : `Relatório de ${config.plural}`, orientacao: 'landscape' }}
        />
    );
}

export const PagamentoParceladoPage: React.FC<{ kind: PaymentKind; mode?: PageMode }> = ({ kind, mode = 'form' }) => {
    if (mode === 'form') {
        return <PagamentoFormPage kind={kind} />;
    }

    return <PagamentoListPage kind={kind} mode={mode} />;
};

export const PaymentRedirectButton: React.FC<{ kind: PaymentKind; label: string }> = ({ kind, label }) => {
    const navigate = useNavigate();
    return <Botao nome={label} action={() => navigate(configs[kind].basePath)} />;
};
