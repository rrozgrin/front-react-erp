import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { type PageLayoutMenuSection } from '../../common/components/PageLayout';
import { Botao } from '../../common/components/Buttons/Botao';
import { type TableField } from '../../common/components/Table';
import { ListagemTemplate } from '../../common/components/Templates/ListagemTemplate';
import type { ExcelColumn } from '../../common/components/Actions/GerarExcel';
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../common/components/ModalSimple';
import { Input, Radio, Select } from '../../common/components/Ui';

type DataMode = 'negativados' | 'excluidos';

interface RegistroRecord {
    cpfcnpj: string;
    nome: string;
    documento: string;
    inclusao: string;
    vencimento: string;
    valor: string;
    protocolo: string;
    local: string;
    status: string;
}

const menuSections: PageLayoutMenuSection[] = [
    {
        titulo: 'Negativar e Receber',
        paginas: [
            { titulo: 'Parcelar Débitos', href: '/recupere' },
            { titulo: 'Localizar Pessoas', href: '/localizamax' },
            { titulo: 'Negativar Devedores', href: '/registro' },
            { titulo: 'Encaminhar para Protesto', href: '/protesto' },
            { titulo: 'Não Recomendar', href: '/recomendo' },
        ],
    },
];

const Warning = styled.div`
    margin-bottom: 18px;
    border: 1px solid #fcd34d;
    background: #fffbeb;
    color: #92400e;
    padding: 14px var(--space-md);
    font-size: 0.86rem;
    line-height: 1.45;
    text-transform: uppercase;
    font-weight: 500;
`;

const FilterPanel = styled.section`
    display: grid;
    gap: var(--space-md);
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.28));
    background: var(--theme-surface, #fff);
    padding: 22px;
    margin-bottom: 18px;
`;

const ActionsBar = styled.div`
    display: flex;
    justify-content: space-between;
    gap: var(--space-sm);
    align-items: center;
    flex-wrap: wrap;
`;

const FormGrid = styled.form`
    display: grid;
    gap: 14px;
`;

const Row = styled.label`
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: var(--space-sm);
    align-items: center;

    input,
    select {
        min-height: 38px;
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: 0.125rem;
        padding: 6px var(--space-xs);
    }

    @media (max-width: 45rem) {
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

const DateRange = styled.div`
    display: flex;
    gap: var(--space-xs);
    align-items: center;
    flex-wrap: wrap;
`;

const TypeList = styled.div`
    border: 1px solid var(--theme-border, #cbd5e1);
    background: #fff;
`;

const TypeOption = styled.button`
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 120px;
    gap: var(--space-sm);
    align-items: center;
    border: 0;
    border-bottom: 1px solid var(--theme-border, #cbd5e1);
    background: transparent;
    padding: var(--space-sm) var(--space-md);
    text-align: left;
    color: var(--theme-text, #0f172a);

    &:last-child {
        border-bottom: 0;
    }
`;

const records: RegistroRecord[] = [
    {
        cpfcnpj: '123.456.789-00',
        nome: 'Cliente Exemplo',
        documento: 'NP-1001',
        inclusao: '22/06/2026',
        vencimento: '10/06/2026',
        valor: 'R$ 320,00',
        protocolo: '45871',
        local: 'Web Control',
        status: 'Ativo',
    },
];

const fields: TableField<RegistroRecord>[] = [
    { id: 'cpfcnpj', header: 'CPF / CNPJ', accessorKey: 'cpfcnpj' },
    { id: 'nome', header: 'Nome', accessorKey: 'nome' },
    { id: 'documento', header: 'Documento', accessorKey: 'documento' },
    { id: 'inclusao', header: 'Data da Inclusão', accessorKey: 'inclusao' },
    { id: 'vencimento', header: 'Vencimento', accessorKey: 'vencimento' },
    { id: 'valor', header: 'Valor', accessorKey: 'valor' },
    { id: 'protocolo', header: 'Protocolo', accessorKey: 'protocolo' },
    { id: 'local', header: 'Local Negativação', accessorKey: 'local' },
    { id: 'status', header: 'Status Negativação', accessorKey: 'status' },
];

function fieldsToExcelColumns(source: TableField<RegistroRecord>[]): ExcelColumn<RegistroRecord>[] {
    return source.map((field) => ({
        key: field.id,
        header: field.header,
        accessorKey: field.accessorKey,
        accessorFn: field.accessorFn,
    }));
}

function TipoNegativacaoModal({
    onClose,
    onSelect,
}: {
    onClose: () => void;
    onSelect: () => void;
}) {
    return (
        <ModalSimple title="Tipo de Negativação" size="md" onClose={onClose}>
            <TypeList>
                <TypeOption type="button" onClick={onSelect}>
                    <span>Negativar em Outros Convênios</span>
                    <span>R$ 11,76</span>
                </TypeOption>
            </TypeList>
        </ModalSimple>
    );
}

function CadastroModal({ onClose }: { onClose: () => void }) {
    const [natureza, setNatureza] = useState('26');

    return (
        <ModalSimple
            title="Negativar Novo Devedor em Outros Convênios"
            size="lg"
            onClose={onClose}
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Fechar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button">Confirmar</ModalSimpleActionButton>
                </>
            )}
        >
            <FormGrid>
                <Row><span>CPF/CNPJ do Devedor:</span><Input /></Row>
                <Row><span>Nome do Devedor:</span><Input /></Row>
                <Row><span>Data de Nascimento/Fundação:</span><Input type="date" /></Row>
                <Row><span>CEP:</span><Input /></Row>
                <Row><span>Tipo Endereço:</span><Select><option>Rua</option><option>Avenida</option></Select></Row>
                <Row><span>Endereço:</span><Input /></Row>
                <Row><span>Número:</span><Input /></Row>
                <Row><span>Complemento:</span><Input /></Row>
                <Row><span>Bairro:</span><Input /></Row>
                <Row><span>Cidade:</span><Input /></Row>
                <Row><span>UF:</span><Select><option>PR</option><option>SP</option><option>SC</option></Select></Row>
                <Row>
                    <span>Natureza da Dívida:</span>
                    <Select value={natureza} onChange={(event) => setNatureza(event.target.value)}>
                        <option value="21">Cheque</option>
                        <option value="22">Duplicata</option>
                        <option value="23">Nota Promissória</option>
                        <option value="24">Triplicata</option>
                        <option value="25">Crediário</option>
                        <option value="26">Outros</option>
                    </Select>
                </Row>
                {natureza === '21' && (
                    <>
                        <Row><span>Banco:</span><Input /></Row>
                        <Row><span>Agência:</span><Input /></Row>
                        <Row><span>Conta Corrente:</span><Input /></Row>
                        <Row><span>Número + C3:</span><Input /></Row>
                        <Row><span>Vencimento:</span><Input type="date" /></Row>
                        <Row><span>Valor:</span><Input /></Row>
                        <Row>
                            <span>Motivo:</span>
                            <Select>
                                <option>11 - Insuficiência de Fundos - 1a Apresentação</option>
                                <option>12 - Insuficiência de Fundos - 2a Apresentação</option>
                                <option>13 - Conta Encerrada</option>
                            </Select>
                        </Row>
                    </>
                )}
            </FormGrid>
        </ModalSimple>
    );
}

export const RegistroPage: React.FC = () => {
    const [openTypeModal, setOpenTypeModal] = useState(false);
    const [openCadastroModal, setOpenCadastroModal] = useState(false);
    const [mode, setMode] = useState<DataMode>('negativados');
    const excelColumns = useMemo(() => fieldsToExcelColumns(fields), []);

    return (
        <>
        <ListagemTemplate
            titulo="Negativar Devedores"
            secoes={menuSections}
            tituloTabela={mode === 'negativados' ? 'Negativados' : 'Excluídos'}
            descricaoTabela="Listagem inspirada no legado de negativação."
            dados={records}
            campos={fields}
            colunasExcel={excelColumns}
            arquivoExcel="negativar_devedores"
            mensagemVazia="Nenhum devedor encontrado."
            conteudoAntesTabela={<>
            <Warning>
                Negativações que completarem 5 anos da dívida serão automaticamente baixadas e passarão para clientes excluídos.
            </Warning>

            <FilterPanel>
                <ActionsBar>
                    <Botao nome="Negativar Novo Devedor" action={() => setOpenTypeModal(true)} />
                    <Botao nome="Imprimir Relatório" variant="secondary" action={() => undefined} />
                </ActionsBar>

                <FormGrid>
                    <Row>
                        <span>Tipo de dados:</span>
                        <InlineOptions>
                            <label>
                                <Radio name="tipoDado" checked={mode === 'negativados'} onChange={() => setMode('negativados')} />
                                Negativados
                            </label>
                            <label>
                                <Radio name="tipoDado" checked={mode === 'excluidos'} onChange={() => setMode('excluidos')} />
                                Excluídos
                            </label>
                        </InlineOptions>
                    </Row>
                    <Row>
                        <span>Período de Inclusão:</span>
                        <DateRange>
                            <Input type="date" defaultValue="2026-06-01" />
                            <span>à</span>
                            <Input type="date" defaultValue="2026-06-22" />
                        </DateRange>
                    </Row>
                    <Row>
                        <span>Busca por CPF/CNPJ:</span>
                        <Input placeholder="Digite o CPF ou CNPJ" />
                    </Row>
                    <ActionsBar>
                        <Botao nome="Pesquisar" action={() => undefined} />
                    </ActionsBar>
                </FormGrid>
            </FilterPanel>
            </>}
            modaisAbertos={openTypeModal || openCadastroModal}
            configurarColunas="tabela"
            impressao={{ titulo: 'Negativar Devedores', orientacao: 'landscape' }}
        />
            {openTypeModal ? (
                <TipoNegativacaoModal
                    onClose={() => setOpenTypeModal(false)}
                    onSelect={() => {
                        setOpenTypeModal(false);
                        setOpenCadastroModal(true);
                    }}
                />
            ) : null}
            {openCadastroModal ? <CadastroModal onClose={() => setOpenCadastroModal(false)} /> : null}
        </>
    );
};
