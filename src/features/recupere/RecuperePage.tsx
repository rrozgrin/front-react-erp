import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
    PageLayout,
    type PageLayoutMenuSection,
} from '../../common/components/PageLayout';
import { Botao } from '../../common/components/Buttons/Botao';
import { type TableField } from '../../common/components/Table';
import type { ExcelColumn } from '../../common/components/Actions/GerarExcel';
import { RelatorioTemplate } from '../../common/components/Templates/RelatorioTemplate';
import {
    ModalSimpleActionButton,
} from '../../common/components/ModalSimple';
import { Input, Radio, Select, Textarea } from '../../common/components/Ui';

type RecupereMode = 'form' | 'excluidos' | 'relatorio';
type NotificationLevel = '1' | '2' | '3';

interface RecupereRecord {
    codigo: string;
    cliente: string;
    emissao: string;
    parcelas: string;
    valor: string;
    vencimento: string;
    status: string;
}

const menuSections: PageLayoutMenuSection[] = [
    {
        titulo: 'Parcelar Débitos',
        paginas: [
            { titulo: 'Parcelar Débitos', href: '/recupere' },
            { titulo: 'Parcelamentos de Débitos Excluídos', href: '/recupere/excluidos' },
            { titulo: 'Relatório Parcelar Débitos', href: '/recupere/relatorio' },
        ],
    },
];

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
    color: var(--theme-text-soft, #475569);
    font-size: var(--font-size-md);
    font-weight: 500;
`;

const Steps = styled.div`
    display: flex;
    gap: var(--space-2xs);
`;

const StepButton = styled.button<{ $active: boolean }>`
    min-height: 44px;
    padding: 0 18px;
    border: 1px solid ${({ $active }) => ($active ? 'var(--theme-border, #d8e2ef)' : 'transparent')};
    border-bottom-color: ${({ $active }) => ($active ? 'var(--theme-surface, #fff)' : 'transparent')};
    background: ${({ $active }) => ($active ? 'var(--theme-surface, #fff)' : 'transparent')};
    color: var(--color-main, var(--bs-primary));
    font-weight: 500;
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
    color: var(--theme-text-soft, #475569);

    input,
    select,
    textarea {
        min-height: 36px;
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: 0.125rem;
        padding: 6px var(--space-xs);
    }

    textarea {
        min-height: 96px;
        resize: vertical;
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

const NotificationOptions = styled.div`
    display: grid;
    gap: 14px;

    label {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 10px;
        align-items: start;
        color: var(--theme-text, #0f172a);
    }

    strong {
        color: var(--color-main, var(--bs-primary));
    }
`;

const ParcelTable = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

const ParcelHeader = styled.div`
    display: grid;
    grid-template-columns: 110px repeat(3, minmax(0, 1fr));
    gap: var(--space-xs);
    padding: var(--space-xs);
    background: var(--theme-surface-muted, rgba(248, 250, 252, 0.95));
    color: var(--color-main, var(--bs-primary));
    font-weight: 500;

    @media (max-width: 760px) {
        display: none;
    }
`;

const ParcelRow = styled.div`
    display: grid;
    grid-template-columns: 110px repeat(3, minmax(0, 1fr));
    gap: var(--space-xs);
    align-items: center;

    input {
        min-height: 34px;
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: 0.125rem;
        padding: 6px var(--space-xs);
    }

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

const Actions = styled.div`
    display: flex;
    justify-content: center;
    gap: var(--space-sm);
    padding-top: var(--space-sm);
`;

const HelpPanel = styled(Panel)`
    color: var(--theme-text, #0f172a);

    h3 {
        margin: 0 0 18px;
        text-align: center;
        color: #005eea;
        font-size: 1.2rem;
        font-weight: 800;
    }

    ul {
        margin: 0;
        padding-left: 18px;
        columns: 2;
        gap: 28px;
    }

    li {
        break-inside: avoid;
        margin-bottom: 10px;
    }

    strong {
        color: #005eea;
    }

    @media (max-width: 680px) {
        ul {
            columns: 1;
        }
    }
`;

const Required = styled.span`
    color: #dc2626;
    font-weight: 500;
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
    color: var(--theme-text-soft, #475569);
    font-size: var(--font-size-md);
    font-weight: 800;
`;

const ReportRow = styled.label`
    display: grid;
    grid-template-columns: 170px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;

    input,
    select {
        min-height: 36px;
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

const records: RecupereRecord[] = [
    {
        codigo: '2001',
        cliente: 'Cliente Exemplo',
        emissao: '22/06/2026',
        parcelas: '3',
        valor: 'R$ 480,00',
        vencimento: '22/07/2026',
        status: 'Em aberto',
    },
];

const excludedFields: TableField<RecupereRecord>[] = [
    { id: 'codigo', header: 'Código', accessorKey: 'codigo' },
    { id: 'cliente', header: 'Cliente', accessorKey: 'cliente' },
    { id: 'emissao', header: 'Emissão', accessorKey: 'emissao' },
    { id: 'valor', header: 'Valor', accessorKey: 'valor' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
];

const reportFields: TableField<RecupereRecord>[] = [
    { id: 'codigo', header: 'Código', accessorKey: 'codigo' },
    { id: 'cliente', header: 'Cliente', accessorKey: 'cliente' },
    { id: 'parcelas', header: 'Parcelas', accessorKey: 'parcelas' },
    { id: 'valor', header: 'Valor', accessorKey: 'valor' },
    { id: 'vencimento', header: 'Vencimento', accessorKey: 'vencimento' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
];

function fieldsToExcelColumns(fields: TableField<RecupereRecord>[]): ExcelColumn<RecupereRecord>[] {
    return fields.map((field) => ({
        key: field.id,
        header: field.header,
        accessorKey: field.accessorKey,
        accessorFn: field.accessorFn,
    }));
}

function RecupereHelp() {
    return (
        <HelpPanel>
            <h3>Parcelamento de débitos com acompanhamento centralizado</h3>
            <ul>
                <li><strong>Negociação organizada</strong> para acordos à vista e parcelados.</li>
                <li><strong>Controle de parcelas</strong> com vencimentos e multa por atraso.</li>
                <li><strong>Abordagens diferentes</strong> para acordo amigável, notificação e proposta.</li>
                <li><strong>Histórico consolidado</strong> de parcelamentos emitidos.</li>
                <li><strong>Relatórios rápidos</strong> para acompanhamento operacional.</li>
                <li><strong>Cadastro do devedor</strong> no mesmo fluxo da negociação.</li>
            </ul>
        </HelpPanel>
    );
}

function TipoParcelamentoStep({
    level,
    onChange,
    onNext,
}: {
    level: NotificationLevel;
    onChange: (value: NotificationLevel) => void;
    onNext: () => void;
}) {
    return (
        <Panel>
            <PanelTitle>Tipo de Parcelamento</PanelTitle>
            <Form onSubmit={(event) => { event.preventDefault(); onNext(); }}>
                <NotificationOptions>
                    <label>
                        <Radio name="tipo_notificacao" checked={level === '1'} onChange={() => onChange('1')} />
                        <span><strong>1º. Nível:</strong> Acordo amigável para pagamento à vista ou parcelado com boletos.</span>
                    </label>
                    <label>
                        <Radio name="tipo_notificacao" checked={level === '2'} onChange={() => onChange('2')} />
                        <span><strong>2º. Nível:</strong> Notificação extra-judicial com boletos.</span>
                    </label>
                    <label>
                        <Radio name="tipo_notificacao" checked={level === '3'} onChange={() => onChange('3')} />
                        <span><strong>3º. Nível:</strong> Proposta de descontos à vista e a prazo para devedores.</span>
                    </label>
                </NotificationOptions>
                <Actions>
                    <ModalSimpleActionButton type="submit">Avançar</ModalSimpleActionButton>
                </Actions>
            </Form>
        </Panel>
    );
}

function DadosDividaStep({
    level,
    onBack,
    onNext,
}: {
    level: NotificationLevel;
    onBack: () => void;
    onNext: () => void;
}) {
    const parcelas = [
        { parcela: 'Parcela 1', valor: '160,00', vencimento: '22/07/2026', multa: '2%' },
        { parcela: 'Parcela 2', valor: '160,00', vencimento: '22/08/2026', multa: '2%' },
        { parcela: 'Parcela 3', valor: '160,00', vencimento: '22/09/2026', multa: '2%' },
    ];

    return (
        <Panel>
            <PanelTitle>Dados da Dívida</PanelTitle>
            <Form onSubmit={(event) => { event.preventDefault(); onNext(); }}>
                <Row>
                    <span>Valor do Débito (R$):</span>
                    <Input defaultValue="480,00" />
                </Row>
                {level === '3' && (
                    <>
                        <Row>
                            <span>Desconto p/ Pagamento À Vista:</span>
                            <Input defaultValue="10" />
                        </Row>
                        <Row>
                            <span>Desconto p/ Pagamento Parcelado:</span>
                            <Input defaultValue="5" />
                        </Row>
                    </>
                )}
                <Row>
                    <span>Número de Parcelas:</span>
                    <Select defaultValue="3">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                    </Select>
                </Row>
                <Row>
                    <span>Primeiro vencimento:</span>
                    <Input type="date" defaultValue="2026-07-22" />
                </Row>
                <ParcelTable>
                    <ParcelHeader>
                        <span>Parcela</span>
                        <span>Valor</span>
                        <span>Vencimento</span>
                        <span>Multa por Atraso</span>
                    </ParcelHeader>
                    {parcelas.map((item) => (
                        <ParcelRow key={item.parcela}>
                            <span>{item.parcela}</span>
                            <Input defaultValue={item.valor} />
                            <Input defaultValue={item.vencimento} />
                            <Input defaultValue={item.multa} />
                        </ParcelRow>
                    ))}
                </ParcelTable>
                <Row>
                    <span>Desconto Até o Vencimento:</span>
                    <InlineOptions>
                        <label><Radio name="desconto_vencimento" /> Sim</label>
                        <label><Radio name="desconto_vencimento" defaultChecked /> Não</label>
                    </InlineOptions>
                </Row>
                <Row>
                    <span>Escrever Mensagem Personalizada:</span>
                    <InlineOptions>
                        <label><Radio name="mensagem_personalizada" /> Sim</label>
                        <label><Radio name="mensagem_personalizada" defaultChecked /> Não</label>
                    </InlineOptions>
                </Row>
                <Row>
                    <span>Mensagem:</span>
                    <Textarea defaultValue="Proposta sujeita ao pagamento até o vencimento indicado em cada parcela." />
                </Row>
                <Row>
                    <span>Banco:</span>
                    <InlineOptions>
                        <label><Radio name="banco" defaultChecked /> Bradesco</label>
                    </InlineOptions>
                </Row>
                <Actions>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onBack}>Voltar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="submit">Avançar</ModalSimpleActionButton>
                </Actions>
            </Form>
        </Panel>
    );
}

function ConsumidorStep({ onBack }: { onBack: () => void }) {
    return (
        <Panel>
            <PanelTitle>Dados do Consumidor</PanelTitle>
            <Form onSubmit={(event) => event.preventDefault()}>
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
                <Actions>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onBack}>Voltar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="submit">Parcelar Débitos</ModalSimpleActionButton>
                </Actions>
            </Form>
        </Panel>
    );
}

function RelatorioFilters({ onGenerate }: { onGenerate: () => void }) {
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
                        <option value="abertos">Em aberto</option>
                        <option value="vencidos">Vencidos</option>
                        <option value="pagos">Pagos</option>
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
                <Actions>
                    <ModalSimpleActionButton type="submit">Gerar Relatório</ModalSimpleActionButton>
                </Actions>
            </Form>
        </ReportFormPanel>
    );
}

function RecupereFormPage() {
    const [stepIndex, setStepIndex] = useState(0);
    const [level, setLevel] = useState<NotificationLevel>('1');

    return (
        <PageLayout
            title="Parcelar Débitos"
            sections={menuSections}
            toolbar={(
                <>
                    <Botao nome="Parcelamentos de Débitos Excluídos" action={() => window.location.assign('/recupere/excluidos')} />
                    <Botao nome="Relatório Parcelar Débitos" action={() => window.location.assign('/recupere/relatorio')} />
                </>
            )}
        >
            <Steps>
                {['Passo 1', 'Passo 2', 'Passo 3'].map((label, index) => (
                    <StepButton key={label} type="button" $active={index === stepIndex} onClick={() => setStepIndex(index)}>
                        {label.toUpperCase()}
                    </StepButton>
                ))}
            </Steps>
            <PageGrid>
                {stepIndex === 0 && <TipoParcelamentoStep level={level} onChange={setLevel} onNext={() => setStepIndex(1)} />}
                {stepIndex === 1 && <DadosDividaStep level={level} onBack={() => setStepIndex(0)} onNext={() => setStepIndex(2)} />}
                {stepIndex === 2 && <ConsumidorStep onBack={() => setStepIndex(1)} />}
                <RecupereHelp />
            </PageGrid>
        </PageLayout>
    );
}

function RecupereListPage({ mode }: { mode: Exclude<RecupereMode, 'form'> }) {
    const [reportGenerated, setReportGenerated] = useState(mode === 'excluidos');
    const fields = mode === 'excluidos' ? excludedFields : reportFields;
    const excelColumns = useMemo(() => fieldsToExcelColumns(fields), [fields]);

    return (
        <RelatorioTemplate
            titulo={mode === 'excluidos' ? 'Parcelamentos de Débitos Excluídos' : 'Relatório Parcelar Débitos'}
            secoes={menuSections}
            tituloTabela={mode === 'excluidos' ? 'Parcelamentos de Débitos Excluídos' : 'Relatório Parcelar Débitos'}
            descricaoTabela="Use as colunas visíveis para definir os dados exibidos no relatório."
            dados={records}
            campos={fields}
            colunasExcel={excelColumns}
            arquivoExcel={mode === 'excluidos' ? 'parcelamentos_debitos_excluidos' : 'relatorio_parcelar_debitos'}
            mensagemVazia="Nenhum parcelamento encontrado."
            painelFiltros={mode === 'relatorio' ? <RelatorioFilters onGenerate={() => setReportGenerated(true)} /> : undefined}
            exibirTabela={reportGenerated}
            configurarColunas="tabela"
            impressao={{ titulo: mode === 'excluidos' ? 'Parcelamentos de Débitos Excluídos' : 'Relatório Parcelar Débitos', orientacao: 'landscape' }}
        />
    );
}

export const RecuperePage: React.FC<{ mode?: RecupereMode }> = ({ mode = 'form' }) => {
    if (mode === 'form') {
        return <RecupereFormPage />;
    }

    return <RecupereListPage mode={mode} />;
};
