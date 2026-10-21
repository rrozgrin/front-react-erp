import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { FiCreditCard, FiSave } from "react-icons/fi";
import {
    PageLayout,
    type PageLayoutMenuSection,
} from "../../../common/components/PageLayout";
import { Botao } from "../../../common/components/Buttons/Botao";
import { Table, type TableField } from "../../../common/components/Table";
import {
    Checkbox,
    Input,
    Radio,
    Select,
    Textarea,
} from "../../../common/components/Ui";

type ActiveTab =
    | "empresa"
    | "pagamentos"
    | "credenciadora"
    | "intermediadora"
    | "boleto"
    | "nota";

interface EmpresaInfo {
    campo: string;
    valor: string;
}

interface Credenciadora {
    nome: string;
    cnpj: string;
    situacao: "Ativo" | "Inativo";
}

interface Convenio {
    codigo: string;
    banco: string;
    carteira: string;
    agencia: string;
    conta: string;
    status: string;
}

interface PaymentRow {
    descricao: string;
    index: number;
}

const Card = styled.section`
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.28));
    background:
        radial-gradient(
            circle at top left,
            var(--theme-surface-soft, rgba(59, 130, 246, 0.1)),
            transparent 26%
        ),
        var(--theme-surface, #fff);
    padding: var(--space-lg);
`;

const CardTitle = styled.h3`
    margin: 0 0 18px;
    color: var(--color-main, var(--bs-primary));
    font-size: 1.15rem;
    font-weight: 800;
`;

const FormGrid = styled.div`
    display: grid;
    gap: var(--space-md);
`;

const TwoColumns = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const ThreeColumns = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const Field = styled.label`
    display: grid;
    gap: 7px;
    color: var(--theme-text-soft, #475569);
    font-size: 0.92rem;
`;

const Section = styled.div`
    display: grid;
    gap: var(--space-md);
    padding-top: 18px;
    border-top: 1px solid var(--theme-border, rgba(148, 163, 184, 0.32));

    &:first-child {
        padding-top: 0;
        border-top: 0;
    }
`;

const SectionTitle = styled.h4`
    margin: 0;
    color: var(--theme-text, #0f172a);
    font-size: var(--font-size-md);
    font-weight: 800;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: var(--space-sm);
    flex-wrap: wrap;
    margin-top: 18px;
`;

const PaymentInput = styled(Input)`
    min-width: 72px;
    min-height: 34px;
    padding: 5px var(--space-xs);
`;

const PaymentSelect = styled(Select)`
    min-width: 72px;
    min-height: 34px;
    padding: 5px var(--space-xs);
`;

const PaymentCheckbox = styled(Checkbox)`
    width: 18px;
    height: 18px;
    min-width: 18px;
    min-height: 18px;
`;

const NotaGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 270px;
    gap: 18px;

    @media (max-width: 1020px) {
        grid-template-columns: 1fr;
    }
`;

const Guidance = styled.aside`
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.32));
    background: var(--theme-surface-muted, #f8fafc);
    padding: 18px;
    align-self: start;

    h4 {
        margin: 0 0 14px;
        color: var(--color-main, var(--bs-primary));
        font-size: var(--font-size-md);
        font-weight: 800;
        text-align: center;
    }

    a {
        display: block;
        padding: 10px 0;
        border-top: 1px solid var(--theme-border, rgba(148, 163, 184, 0.28));
        color: var(--theme-text, #0f172a);
        text-decoration: none;
    }

    strong {
        color: #dc2626;
    }
`;

const HistoryLink = styled.button`
    border: 0;
    background: transparent;
    padding: 0;
    color: var(--color-main, var(--bs-primary));
    font-weight: 800;
    text-align: left;
`;

const InlineOptions = styled.div`
    display: flex;
    gap: 18px;
    flex-wrap: wrap;

    label {
        display: inline-flex;
        gap: var(--space-xs);
        align-items: center;
        color: var(--theme-text-soft, #475569);
    }
`;

const empresaData: EmpresaInfo[] = [
    {
        campo: "Razão Social",
        valor: "DEMONSTRATIVO T.I CURITIBA - WEB CONTROL",
    },
    {
        campo: "Nome Fantasia",
        valor: "DEMONSTRATIVO T.I CURITIBA - WEB CONTROL",
    },
    { campo: "CPF/CNPJ", valor: "08.745.918/0001-71" },
    { campo: "Sócio 1", valor: "MATHEUS FERNANDES" },
    { campo: "Sócio 2", valor: "SANDRA BARBOSA DE ARAUJO" },
    { campo: "Ramo Atividade", valor: "pet_shop" },
    { campo: "CEP", valor: "80530-000" },
    { campo: "Endereço", valor: "AVENIDA CANDIDO DE ABREU" },
    { campo: "Número", valor: "70" },
    { campo: "Complemento", valor: "CONJ 404" },
    { campo: "Bairro", valor: "CENTRO CIVICO" },
    { campo: "Cidade", valor: "CURITIBA" },
    { campo: "Estado", valor: "PR" },
    { campo: "Telefone", valor: "(41) 3207-1744" },
    {
        campo: "E-mail no Cadastro",
        valor: "administrativo@webcontrolempresas.com.br",
    },
];

const credenciadoras: Credenciadora[] = [
    { nome: "CIELO", cnpj: "01.027.058/0001-91", situacao: "Inativo" },
    { nome: "REDE CARD", cnpj: "01.425.787/0001-04", situacao: "Ativo" },
    { nome: "SENFF", cnpj: "03.877.288/0001-75", situacao: "Ativo" },
    { nome: "GETNET", cnpj: "05.127.438/0001-59", situacao: "Ativo" },
    { nome: "PAGSEGURO", cnpj: "08.561.701/0001-01", situacao: "Ativo" },
];

const intermediadoras: Credenciadora[] = [
    { nome: "Mercado Pago", cnpj: "10.573.521/0001-91", situacao: "Ativo" },
    {
        nome: "PagSeguro Internet",
        cnpj: "08.561.701/0001-01",
        situacao: "Ativo",
    },
];

const convenios: Convenio[] = [
    {
        codigo: "001",
        banco: "Banco do Brasil",
        carteira: "17",
        agencia: "3207",
        conta: "1744-9",
        status: "Ativo",
    },
];

const paymentRows: PaymentRow[] = [
    "CARTAO DE CREDITO",
    "PIX TEF",
    "NOTA PROMISSÓRIA",
    "BOLETO",
    "CARTÃO CRÉDITO VISA",
    "NOTA DE CRÉDITO",
    "BOLETO PRÓPRIO",
    "CONTA CORRENTE",
].map((descricao, index) => ({ descricao, index }));

const paymentFields: TableField<PaymentRow>[] = [
    {
        id: "descricao",
        header: "Descrição",
        accessorKey: "descricao",
        width: "180px",
        defaultVisible: true,
        canHide: false,
    },
    {
        id: "ativo",
        header: "Ativo",
        width: "80px",
        align: "center",
        canHide: false,
        cell: () => <PaymentCheckbox defaultChecked />,
    },
    {
        id: "creditoVista",
        header: "Cartão Crédito à Vista",
        width: "150px",
        align: "center",
        canHide: false,
        cell: (_, row) => <PaymentCheckbox defaultChecked={row.index === 4} />,
    },
    {
        id: "adiantamento",
        header: "Aceito como Adiantamento",
        width: "170px",
        align: "center",
        canHide: false,
        cell: (_, row) => (
            <PaymentCheckbox
                defaultChecked={
                    row.index === 0 || row.index === 2 || row.index === 4
                }
            />
        ),
    },
    {
        id: "baixaAutomatica",
        header: "Baixa Automática",
        width: "140px",
        align: "center",
        canHide: false,
        cell: (_, row) => (
            <PaymentCheckbox
                defaultChecked={row.index === 0 || row.index === 4}
            />
        ),
    },
    {
        id: "ordemVisual",
        header: "Ordem Visual",
        width: "110px",
        align: "center",
        canHide: false,
        cell: (_, row) => <PaymentInput defaultValue={String(row.index + 2)} />,
    },
    {
        id: "parcela",
        header: "Nº Parcela",
        width: "110px",
        align: "center",
        canHide: false,
        cell: (_, row) => (
            <PaymentSelect defaultValue={row.index === 0 ? "12" : "1"}>
                <option>1</option>
                <option>5</option>
                <option>9</option>
                <option>12</option>
                <option>16</option>
            </PaymentSelect>
        ),
    },
    {
        id: "avista",
        header: "À Vista (%)",
        width: "110px",
        align: "center",
        canHide: false,
        cell: (_, row) => (
            <PaymentInput defaultValue={row.index === 0 ? "10.00" : "0.00"} />
        ),
    },
    {
        id: "antecipacao",
        header: "Antecipação (%)",
        width: "130px",
        align: "center",
        canHide: false,
        cell: (_, row) => (
            <PaymentInput defaultValue={row.index === 2 ? "2.00" : "0.00"} />
        ),
    },
    {
        id: "prazo",
        header: "À Prazo (%)",
        width: "110px",
        align: "center",
        canHide: false,
        cell: (_, row) => (
            <PaymentInput defaultValue={row.index === 4 ? "5.00" : "0.00"} />
        ),
    },
    {
        id: "multa",
        header: "Multa por Atraso",
        width: "140px",
        align: "center",
        canHide: false,
        cell: (_, row) => (
            <PaymentInput defaultValue={row.index === 2 ? "2.00" : "0.00"} />
        ),
    },
    {
        id: "juros",
        header: "Juros por Atraso",
        width: "140px",
        align: "center",
        canHide: false,
        cell: (_, row) => (
            <PaymentInput defaultValue={row.index === 2 ? "1.00" : "0.00"} />
        ),
    },
    {
        id: "taxaFixa",
        header: "Taxa Fixa",
        width: "100px",
        align: "center",
        canHide: false,
        cell: (_, row) => (
            <PaymentInput defaultValue={row.index === 2 ? "5.00" : "0.00"} />
        ),
    },
    {
        id: "diasVencimento",
        header: "Dias vencimento",
        width: "130px",
        align: "center",
        canHide: false,
        cell: () => <PaymentInput defaultValue="0" />,
    },
    {
        id: "catalogoDigital",
        header: "Catálogo Digital",
        width: "130px",
        align: "center",
        canHide: false,
        cell: (_, row) => <PaymentCheckbox defaultChecked={row.index === 0} />,
    },
];

const DadosEmpresariaisPage: React.FC = () => {
    const [active, setActive] = useState<ActiveTab>("empresa");

    const sections = useMemo<PageLayoutMenuSection[]>(
        () => [
            {
                titulo: "Dados Empresariais",
                paginas: [
                    {
                        titulo: "Informações Empresariais",
                        action: () => setActive("empresa"),
                    },
                    {
                        titulo: "Formas de Pagamento",
                        action: () => setActive("pagamentos"),
                    },
                ],
            },
            {
                titulo: "Operadoras e Convênios",
                paginas: [
                    {
                        titulo: "Credenciadora de Cartões",
                        action: () => setActive("credenciadora"),
                    },
                    {
                        titulo: "Intermediadora",
                        action: () => setActive("intermediadora"),
                    },
                    {
                        titulo: "Convênio Boleto",
                        action: () => setActive("boleto"),
                    },
                ],
            },
            {
                titulo: "Fiscal",
                paginas: [
                    { titulo: "Nota Fiscal", action: () => setActive("nota") },
                ],
            },
        ],
        [],
    );

    return (
        <PageLayout title="Dados Empresariais" sections={sections}>
            {active === "empresa" && <EmpresaPanel />}
            {active === "pagamentos" && <PagamentosPanel />}
            {active === "credenciadora" && (
                <CadastroOperadoraPanel
                    title="Credenciadora de Cartões"
                    buttonLabel="Adicionar Credenciadora"
                    data={credenciadoras}
                />
            )}
            {active === "intermediadora" && (
                <CadastroOperadoraPanel
                    title="Cadastro de Intermediadora"
                    buttonLabel="Adicionar Intermediadora"
                    data={intermediadoras}
                />
            )}
            {active === "boleto" && <ConvenioBoletoPanel />}
            {active === "nota" && <NotaFiscalPanel />}
        </PageLayout>
    );
};

const EmpresaPanel = () => {
    const fields: TableField<EmpresaInfo>[] = [
        {
            id: "campo",
            header: "Campo",
            accessorKey: "campo",
            defaultVisible: true,
            canHide: false,
            width: "240px",
        },
        {
            id: "valor",
            header: "Informação",
            accessorKey: "valor",
            defaultVisible: true,
            canHide: false,
        },
    ];

    return (
        <Table
            data={empresaData}
            fields={fields}
            title="Dados da minha empresa"
            description="Informações principais cadastradas no sistema."
            showColumnSelector={false}
            compact
        />
    );
};

const PagamentosPanel = () => (
    <Card>
        <Table
            data={paymentRows}
            fields={paymentFields}
            title="Configure suas Formas de Pagamento"
            description="Defina comportamento financeiro e comercial de cada forma de pagamento."
            showColumnSelector={false}
            compact
        />
        <Actions>
            <Botao
                nome="Salvar Formas de Pagamento"
                action={() => undefined}
                icone={<FiSave />}
            />
        </Actions>
    </Card>
);

const CadastroOperadoraPanel = ({
    title,
    buttonLabel,
    data,
}: {
    title: string;
    buttonLabel: string;
    data: Credenciadora[];
}) => {
    const fields: TableField<Credenciadora>[] = [
        {
            id: "nome",
            header: "Nome",
            accessorKey: "nome",
            defaultVisible: true,
        },
        {
            id: "cnpj",
            header: "CNPJ",
            accessorKey: "cnpj",
            defaultVisible: true,
        },
        {
            id: "situacao",
            header: "Situação",
            accessorKey: "situacao",
            defaultVisible: true,
            cell: (value) => (
                <InlineOptions>
                    <label>
                        <Radio checked={value === "Ativo"} readOnly /> Ativo
                    </label>
                    <label>
                        <Radio checked={value === "Inativo"} readOnly /> Inativo
                    </label>
                </InlineOptions>
            ),
        },
    ];

    return (
        <FormGrid>
            <Card>
                <CardTitle>{title}</CardTitle>
                <TwoColumns>
                    <Field>
                        Nome
                        <Input />
                    </Field>
                    <Field>
                        CNPJ
                        <Input />
                    </Field>
                </TwoColumns>
                <Actions>
                    <Botao
                        nome={buttonLabel}
                        action={() => undefined}
                        icone={<FiCreditCard />}
                    />
                </Actions>
            </Card>
            <Table
                data={data}
                fields={fields}
                title={title}
                description="Gerencie operadoras cadastradas."
                compact
            />
        </FormGrid>
    );
};

const ConvenioBoletoPanel = () => {
    const fields: TableField<Convenio>[] = [
        {
            id: "codigo",
            header: "Código",
            accessorKey: "codigo",
            defaultVisible: true,
        },
        {
            id: "banco",
            header: "Banco",
            accessorKey: "banco",
            defaultVisible: true,
        },
        {
            id: "carteira",
            header: "Carteira",
            accessorKey: "carteira",
            defaultVisible: true,
        },
        {
            id: "agencia",
            header: "Agência",
            accessorKey: "agencia",
            defaultVisible: true,
        },
        {
            id: "conta",
            header: "Conta",
            accessorKey: "conta",
            defaultVisible: true,
        },
        {
            id: "status",
            header: "Status",
            accessorKey: "status",
            defaultVisible: true,
        },
    ];

    return (
        <FormGrid>
            <Card>
                <CardTitle>Convênio Bancário</CardTitle>
                <TwoColumns>
                    <Field>
                        Banco
                        <Select defaultValue="">
                            <option value="">Selecione</option>
                            <option>001 - Banco do Brasil</option>
                            <option>237 - Bradesco</option>
                            <option>341 - Itaú</option>
                        </Select>
                    </Field>
                    <Field>
                        Carteira
                        <Input />
                    </Field>
                    <Field>
                        Agência + DV
                        <Input />
                    </Field>
                    <Field>
                        Conta + DV
                        <Input />
                    </Field>
                    <Field>
                        Seq. Boleto
                        <Input />
                    </Field>
                    <Field>
                        Status
                        <Select defaultValue="">
                            <option value="">Selecione</option>
                            <option>Ativo</option>
                            <option>Inativo</option>
                        </Select>
                    </Field>
                    <Field>
                        Cód. Convênio
                        <Input />
                    </Field>
                    <Field>
                        Chave de Criptografia
                        <Input />
                    </Field>
                </TwoColumns>
                <Actions>
                    <Botao nome="Adicionar" action={() => undefined} />
                    <Botao nome="Cancelar" action={() => undefined} />
                </Actions>
            </Card>
            <Table
                data={convenios}
                fields={fields}
                title="Meus Convênios"
                description="Convênios bancários disponíveis para emissão."
                compact
            />
        </FormGrid>
    );
};

const NotaFiscalPanel = () => (
    <NotaGrid>
        <Card>
            <FormGrid>
                <HistoryLink type="button">
                    → Histórico de modificações nos dados de nota fiscal
                </HistoryLink>

                <Section>
                    <SectionTitle>Liberação e Certificado Digital</SectionTitle>
                    <TwoColumns>
                        <Field>
                            Situação
                            <Input value="NFe - NFSe habilitado" readOnly />
                        </Field>
                        <Field>
                            Certificado Digital
                            <Input type="file" />
                        </Field>
                        <Field>
                            Senha do Certificado
                            <Input type="password" defaultValue="123456" />
                        </Field>
                        <Field>
                            Regime Fiscal
                            <Select defaultValue="Regime Normal">
                                <option>Regime Normal</option>
                                <option>Simples Nacional</option>
                                <option>MEI</option>
                            </Select>
                        </Field>
                    </TwoColumns>
                </Section>

                <Section>
                    <SectionTitle>Parâmetros Fiscais</SectionTitle>
                    <ThreeColumns>
                        <Field>
                            CFOP - Dentro do Estado
                            <Select defaultValue="5102">
                                <option>5102</option>
                                <option>5405</option>
                                <option>5101</option>
                            </Select>
                        </Field>
                        <Field>
                            CFOP - Fora do Estado
                            <Select defaultValue="6102">
                                <option>6102</option>
                                <option>6404</option>
                                <option>6101</option>
                            </Select>
                        </Field>
                        <Field>
                            Código do Benefício
                            <Input />
                        </Field>
                        <Field>
                            Calcular DIFAL
                            <Select defaultValue="Não">
                                <option>Não</option>
                                <option>Sim</option>
                            </Select>
                        </Field>
                        <Field>
                            Habilitar XPED Frente Caixa
                            <Select defaultValue="Sim">
                                <option>Sim</option>
                                <option>Não</option>
                            </Select>
                        </Field>
                    </ThreeColumns>
                </Section>

                <FiscalDocumentSection
                    title="NFe"
                    sequenceLabel="Sequência/Número"
                    showPrint
                />
                <FiscalDocumentSection
                    title="NFCe"
                    sequenceLabel="Sequência NFCe"
                    showToken
                />
                <FiscalDocumentSection
                    title="NFSe"
                    sequenceLabel="Sequência RPS"
                    showCity
                />
                <FiscalDocumentSection
                    title="CTe"
                    sequenceLabel="Sequência CTe"
                />
                <FiscalDocumentSection
                    title="MDFe"
                    sequenceLabel="Sequência MDFe"
                />

                <Section>
                    <SectionTitle>Autorizados para Download XML</SectionTitle>
                    <ThreeColumns>
                        <Field>
                            Tipo de Documento
                            <Select defaultValue="CNPJ">
                                <option>CNPJ</option>
                                <option>CPF</option>
                            </Select>
                        </Field>
                        <Field>
                            CPF/CNPJ
                            <Input />
                        </Field>
                        <Field>
                            E-mail
                            <Input type="email" />
                        </Field>
                    </ThreeColumns>
                    <Actions>
                        <Botao
                            nome="Adicionar Autorizado"
                            action={() => undefined}
                        />
                    </Actions>
                </Section>

                <Section>
                    <SectionTitle>Configurações adicionais</SectionTitle>
                    <InlineOptions>
                        <label>
                            <Checkbox /> Exigir código de autorização da
                            credenciadora
                        </label>
                        <label>
                            <Checkbox defaultChecked /> Receber cópia de Nota
                            Fiscal por e-mail
                        </label>
                    </InlineOptions>
                    <Field>
                        Observações fiscais
                        <Textarea />
                    </Field>
                </Section>

                <Actions>
                    <Botao
                        nome="Salvar Nota Fiscal"
                        action={() => undefined}
                        icone={<FiSave />}
                    />
                </Actions>
            </FormGrid>
        </Card>

        <Guidance>
            <h4>Orientações para Gerar Nota</h4>
            <a href="#nota">› Como Gerar Nota?</a>
            <a href="#manual">› Manual da NFe e NFCe</a>
            <a href="#contador">
                › E-mail para o Contador solicitando informações para cadastro
            </a>
            <a href="#sefaz">
                › E-mail para Contador orientando cadastro no SEFAZ
            </a>
            <strong>Somente p/ Contadores do Estado do Paraná</strong>
        </Guidance>
    </NotaGrid>
);

const FiscalDocumentSection = ({
    title,
    sequenceLabel,
    showPrint,
    showToken,
    showCity,
}: {
    title: string;
    sequenceLabel: string;
    showPrint?: boolean;
    showToken?: boolean;
    showCity?: boolean;
}) => (
    <Section>
        <SectionTitle>{title}</SectionTitle>
        <ThreeColumns>
            <Field>
                Ambiente
                <Select defaultValue="Produção">
                    <option>Produção</option>
                    <option>Homologação</option>
                </Select>
            </Field>
            <Field>
                {sequenceLabel}
                <Input defaultValue="1" />
            </Field>
            <Field>
                Série
                <Input defaultValue="1" />
            </Field>
            {showPrint && (
                <Field>
                    Formato de Impressão
                    <Select defaultValue="Retrato">
                        <option>Retrato</option>
                        <option>Paisagem</option>
                    </Select>
                </Field>
            )}
            {showToken && (
                <>
                    <Field>
                        Código CSC Token
                        <Input />
                    </Field>
                    <Field>
                        ID Token
                        <Input />
                    </Field>
                    <Field>
                        Data/Hora Ativação
                        <Input type="datetime-local" />
                    </Field>
                </>
            )}
            {showCity && (
                <>
                    <Field>
                        Cidade habilitada
                        <Input defaultValue="Curitiba" />
                    </Field>
                    <Field>
                        Sequência Lote
                        <Input defaultValue="1" />
                    </Field>
                </>
            )}
        </ThreeColumns>
    </Section>
);

export { DadosEmpresariaisPage };
