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

interface ProtestoRecord {
    cpfcnpj: string;
    nome: string;
    documento: string;
    inclusao: string;
    vencimento: string;
    valor: string;
    protocolo: string;
    cartorio: string;
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

const SearchBox = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 280px) auto;
    gap: 10px;

    input {
        min-height: 38px;
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: 0.125rem;
        padding: 6px var(--space-xs);
    }

    @media (max-width: 45rem) {
        grid-template-columns: 1fr;
    }
`;

const TwoColumns = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 18px;

    @media (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`;

const SidePanel = styled.aside`
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.28));
    background: var(--theme-surface, #fff);
    padding: 18px;

    h3 {
        margin: 0 0 10px;
        font-size: 0.95rem;
    }

    ul {
        margin: 0;
        padding-left: 18px;
    }

    li {
        margin-bottom: 10px;
    }
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

const PreviewCard = styled.div`
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.28));
    background: #fff;
    padding: 18px;
    margin-top: var(--space-sm);

    h4 {
        margin: 0 0 var(--space-sm);
        text-align: center;
    }

    p {
        margin: 0 0 var(--space-xs);
    }
`;

const records: ProtestoRecord[] = [
    {
        cpfcnpj: '123.456.789-00',
        nome: 'Cliente Exemplo',
        documento: 'DOC-874',
        inclusao: '22/06/2026',
        vencimento: '15/06/2026',
        valor: 'R$ 870,00',
        protocolo: '3001',
        cartorio: '1º Tabelionato de Protesto',
    },
];

const fields: TableField<ProtestoRecord>[] = [
    { id: 'cpfcnpj', header: 'CPF / CNPJ', accessorKey: 'cpfcnpj' },
    { id: 'nome', header: 'Nome', accessorKey: 'nome' },
    { id: 'documento', header: 'Documento', accessorKey: 'documento' },
    { id: 'inclusao', header: 'Data da Inclusão', accessorKey: 'inclusao' },
    { id: 'vencimento', header: 'Vencimento', accessorKey: 'vencimento' },
    { id: 'valor', header: 'Valor', accessorKey: 'valor' },
    { id: 'protocolo', header: 'Protocolo', accessorKey: 'protocolo' },
    { id: 'cartorio', header: 'Cartório', accessorKey: 'cartorio' },
];

function fieldsToExcelColumns(source: TableField<ProtestoRecord>[]): ExcelColumn<ProtestoRecord>[] {
    return source.map((field) => ({
        key: field.id,
        header: field.header,
        accessorKey: field.accessorKey,
        accessorFn: field.accessorFn,
    }));
}

function ProtestoModal({ onClose }: { onClose: () => void }) {
    const [natureza, setNatureza] = useState('26');
    const [step, setStep] = useState<1 | 2>(1);

    return (
        <ModalSimple
            title="Encaminhamento para Protesto em Cartório"
            size="lg"
            onClose={onClose}
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Fechar</ModalSimpleActionButton>
                    {step === 1 ? (
                        <ModalSimpleActionButton type="button" onClick={() => setStep(2)}>Continuar</ModalSimpleActionButton>
                    ) : (
                        <ModalSimpleActionButton type="button">Confirmar</ModalSimpleActionButton>
                    )}
                </>
            )}
        >
            {step === 1 ? (
                <FormGrid>
                    <Row><span>CPF/CNPJ do Devedor:</span><Input /></Row>
                    <Row><span>Nome do Devedor:</span><Input /></Row>
                    <Row><span>Data de Nascimento/Fundação:</span><Input type="date" /></Row>
                    <Row><span>CEP:</span><Input /></Row>
                    <Row><span>Tipo Endereço:</span><Select><option>Selecione</option><option>Rua</option><option>Avenida</option></Select></Row>
                    <Row><span>Endereço:</span><Input /></Row>
                    <Row><span>Número:</span><Input /></Row>
                    <Row><span>Complemento:</span><Input /></Row>
                    <Row><span>Bairro:</span><Input /></Row>
                    <Row><span>UF:</span><Select><option>Selecione</option><option>PR</option><option>SP</option></Select></Row>
                    <Row><span>Cidade:</span><Input /></Row>
                    <Row><span>Cartório:</span><Select><option>Selecione um Cartório</option><option>1º Tabelionato de Protesto</option></Select></Row>
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
                    {natureza === '21' ? (
                        <>
                            <Row><span>Número do Banco:</span><Input /></Row>
                            <Row><span>Número da Agência:</span><Input /></Row>
                            <Row><span>Número da Conta Corrente:</span><Input /></Row>
                            <Row><span>Número do Cheque:</span><Input /></Row>
                            <Row><span>Vencimento:</span><Input type="date" /></Row>
                            <Row><span>Valor:</span><Input /></Row>
                            <Row><span>Motivo:</span><Select><option>11 - Insuficiência de Fundos</option><option>12 - Insuficiência de Fundos - 2a Apresentação</option></Select></Row>
                        </>
                    ) : (
                        <>
                            <Row><span>Número do Contrato:</span><Input /></Row>
                            <Row><span>Valor da Dívida:</span><Input /></Row>
                            <Row><span>Data Vencimento da Dívida:</span><Input type="date" /></Row>
                            <Row>
                                <span>Tipo Devedor:</span>
                                <InlineOptions>
                                    <label><Radio name="tipo_devedor" defaultChecked /> Comprador</label>
                                    <label><Radio name="tipo_devedor" /> Fiador</label>
                                </InlineOptions>
                            </Row>
                        </>
                    )}
                </FormGrid>
            ) : (
                <PreviewCard>
                    <h4>Encaminhamento para Protesto em Cartório</h4>
                    <p><strong>Credor:</strong> WebControl Empresas</p>
                    <p><strong>Cartório:</strong> 1º Tabelionato de Protesto</p>
                    <p><strong>Devedor:</strong> Cliente Exemplo</p>
                    <p><strong>Documento:</strong> DOC-874</p>
                    <p><strong>Valor:</strong> R$ 870,00</p>
                    <p><strong>Vencimento:</strong> 15/06/2026</p>
                </PreviewCard>
            )}
        </ModalSimple>
    );
}

export const ProtestoPage: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const excelColumns = useMemo(() => fieldsToExcelColumns(fields), []);

    return (
        <>
        <ListagemTemplate
            titulo="Encaminhar para Protesto"
            secoes={menuSections}
            tituloTabela="Devedores Encaminhados"
            descricaoTabela="Listagem inspirada no legado de protesto."
            dados={records}
            campos={fields}
            colunasExcel={excelColumns}
            arquivoExcel="encaminhar_protesto"
            mensagemVazia="Nenhum devedor encaminhado."
            conteudoAntesTabela={(
                <FilterPanel>
                <ActionsBar>
                    <SearchBox>
                        <Input placeholder="Buscar" />
                        <Botao nome="Pesquisar" action={() => undefined} />
                    </SearchBox>
                    <Botao nome="Encaminhar Novo Devedor para Protesto" action={() => setOpenModal(true)} />
                </ActionsBar>
                </FilterPanel>
            )}
            renderizarTabela={(tabela) => (
                <TwoColumns>
                    <div>{tabela}</div>
                    <SidePanel>
                    <h3>Informações</h3>
                    <ul>
                        <li>Serviço de encaminhamento para protesto nacional em cartório.</li>
                        <li>O devedor protestado pode ser executado judicialmente em qualquer fórum cível do Brasil.</li>
                        <li>Inclusões e exclusões passam a constar em bases privadas conveniadas com cartórios.</li>
                    </ul>
                    <h3>Atenção</h3>
                    <ul>
                        <li>No protesto em cartório, o nome do devedor não caduca enquanto a dívida não for quitada.</li>
                    </ul>
                    </SidePanel>
                </TwoColumns>
            )}
            modaisAbertos={openModal}
            configurarColunas="tabela"
            impressao={{ titulo: 'Encaminhar para Protesto', orientacao: 'landscape' }}
        />
        {openModal ? <ProtestoModal onClose={() => setOpenModal(false)} /> : null}
        </>
    );
};
