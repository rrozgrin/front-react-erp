import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    BsBoxSeam,
    BsEnvelope,
    BsFileEarmarkText,
    BsGeoAlt,
    BsPlusCircle,
    BsPrinter,
    BsReceipt,
    BsTruck,
    BsWallet2,
} from "react-icons/bs";
import {
    Page,
    Header,
    TitleGroup,
    Title,
    MetaBar,
    MetaItem,
    TopGrid,
    AddressGrid,
    ContentGrid,
    Card,
    CardTitle,
    CardBody,
    DetailsGrid,
    Detail,
    PaymentTable,
    PaymentRow,
    ProductCard,
    TableWrap,
    ProductDescription,
    SmallSelect,
    SmallInput,
    ProductsFooter,
    ProductsFooterLine,
    AddressBody,
    ActionArea,
    PrintGrid,
    Footer,
    FooterSpacer,
} from "./styled";
import { FiEdit2, FiLogOut } from "react-icons/fi";
import { Table, type TableField } from '@/common/components/Table';
import { Botao } from '@/common/components/Buttons/Botao';
const products = [
    {
        numero: "1",
        descricao:
            "TORTA DE LIMAO - TRADICIONAL CARAMELO QUEIMADO TAMANHO 55 CM",
        quantidade: "1,000 KG",
        unitario: "R$ 59,69",
        desconto: "R$ 0,00",
        subtotal: "R$ 59,69",
        cfop: "5102",
    },
    {
        numero: "2",
        descricao:
            "TORTA DE MORANGO - TRADICIONAL CARAMELO QUEIMADO TAMANHO 55 CM",
        quantidade: "1,000 KG",
        unitario: "R$ 102,69",
        desconto: "R$ 0,00",
        subtotal: "R$ 102,69",
        cfop: "5102",
    },
    {
        numero: "2",
        descricao:
            "TORTA DE MORANGO - TRADICIONAL CARAMELO QUEIMADO TAMANHO 55 CM",
        quantidade: "1,000 KG",
        unitario: "R$ 102,69",
        desconto: "R$ 0,00",
        subtotal: "R$ 102,69",
        cfop: "5102",
    },
];
export const VendaFinalizadaFrenteCaixaPage: React.FC = () => {
    const navigate = useNavigate();
    const productFields = useMemo<TableField<(typeof products)[number]>[]>(
        () => [
            {
                id: "numero",
                header: "N.",
                accessorKey: "numero",
                width: "54px",
                align: "center",
            },
            {
                id: "descricao",
                header: "Descricao",
                accessorKey: "descricao",
                width: "320px",
                cell: (value) => (
                    <ProductDescription>
                        <span>{String(value)}</span>
                        <Botao
                            nome="Editar produto"
                            action={() => undefined}
                            ariaLabel="Editar produto"
                            className="product-edit-button"
                            icone={<FiEdit2 />}
                        />
                    </ProductDescription>
                ),
            },
            {
                id: "quantidade",
                header: "Qtde.",
                accessorKey: "quantidade",
                width: "110px",
            },
            {
                id: "unitario",
                header: "Vlr. Unit.",
                accessorKey: "unitario",
                width: "110px",
                align: "right",
            },
            {
                id: "desconto",
                header: "Desconto p/ Item",
                accessorKey: "desconto",
                width: "150px",
                align: "right",
            },
            {
                id: "subtotal",
                header: "Sub-total",
                accessorKey: "subtotal",
                width: "120px",
                align: "right",
            },
            {
                id: "cfop",
                header: "CFOP",
                accessorKey: "cfop",
                width: "110px",
                cell: (value) => (
                    <SmallSelect defaultValue={String(value)} aria-label="CFOP">
                        <option>{String(value)}</option>
                    </SmallSelect>
                ),
            },
            {
                id: "xped",
                header: "XPED",
                width: "120px",
                cell: () => <SmallInput aria-label="XPED" />,
            },
        ],
        [],
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault();
                navigate("/frente-caixa");
                return;
            }

            if (event.key === "F8") {
                event.preventDefault();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate]);

    return (
        <Page>
            <Header>
                <TitleGroup>
                    <Title>Frente de Caixa</Title>
                </TitleGroup>
            </Header>

            <MetaBar>
                <MetaItem>
                    <span>Caixa:</span>
                    <strong>016</strong>
                </MetaItem>
                <MetaItem>
                    <span>Operador:</span>
                    <strong>Funcionario MASTER</strong>
                </MetaItem>
                <MetaItem>
                    <span>Funcionario:</span>
                    <strong>Emyli Caroline Quadros</strong>
                </MetaItem>
                <MetaItem>
                    <span>Cliente:</span>
                    <strong>CLIENTE BALCAO</strong>
                </MetaItem>
            </MetaBar>

            <TopGrid>
                <Card>
                    <CardTitle>
                        <BsReceipt />
                        Detalhes do Pedido
                    </CardTitle>
                    <CardBody>
                        <DetailsGrid>
                            <Detail>
                                <span>
                                    <strong>Número do Pedido:</strong> 258512542
                                </span>
                            </Detail>
                            <Detail>
                                <span>
                                    <strong>CPF/CNPJ do Cliente:</strong>{" "}
                                    00000000000
                                </span>
                            </Detail>
                            <Detail>
                                <span>
                                    <strong>Data/Hora do Pedido:</strong>{" "}
                                    09/06/2026 10:07:15
                                </span>
                            </Detail>
                            <Detail>
                                <span>
                                    <strong>Cliente:</strong> CLIENTE BALCAO
                                </span>
                            </Detail>
                            <Detail>
                                <span>
                                    <strong>Data/Hora da Alteração:</strong>{" "}
                                    09/06/2026 10:07:15
                                </span>
                            </Detail>
                            <Detail>
                                <span>
                                    <strong>Funcionário:</strong> Funcionario
                                    MASTER
                                </span>
                            </Detail>
                        </DetailsGrid>
                    </CardBody>
                </Card>

                <Card>
                    <CardTitle>
                        <BsWallet2 />
                        Formas de Pagamento
                    </CardTitle>
                    <CardBody>
                        <PaymentTable>
                            <PaymentRow $head>
                                <span />
                                <b>Forma de Pagamento</b>
                                <b>Dt. Pagamento</b>
                                <b>Valor</b>
                            </PaymentRow>
                            <PaymentRow>
                                <span>1</span>
                                <span>Dinheiro</span>
                                <span>09/06/2026</span>
                                <span>R$ 59,69</span>
                            </PaymentRow>
                            <PaymentRow $total>
                                <span />
                                <span>TOTAL</span>
                                <span />
                                <strong>R$ 59,69</strong>
                            </PaymentRow>
                        </PaymentTable>
                    </CardBody>
                </Card>
            </TopGrid>

            <AddressGrid>
                <Card>
                    <CardTitle>
                        <BsGeoAlt />
                        Endereco de Entrega NF-e
                    </CardTitle>
                    <AddressBody>
                        <SmallSelect defaultValue="">
                            <option value="">Selecione o endereco</option>
                        </SmallSelect>
                        <Botao
                            nome="Atualizar"
                            action={() => undefined}
                            className="address-action-button"
                        />
                    </AddressBody>
                </Card>

                <Card>
                    <CardTitle>
                        <BsTruck />
                        Endereco de Retirada NF-e
                    </CardTitle>
                    <AddressBody>
                        <SmallSelect defaultValue="">
                            <option value="">Selecione o endereco</option>
                        </SmallSelect>
                        <Botao
                            nome="Atualizar"
                            action={() => undefined}
                            className="address-action-button"
                        />
                    </AddressBody>
                </Card>
            </AddressGrid>

            <ContentGrid>
                <div>
                    <ProductCard>
                        <CardTitle>
                            <BsBoxSeam />
                            Produtos e Servicos
                        </CardTitle>
                        <TableWrap>
                            <Table
                                data={products}
                                fields={productFields}
                                emptyMessage="Nenhum produto ou servico encontrado."
                                showHeader={false}
                                showColumnSelector={false}
                                compact
                            />
                        </TableWrap>
                        <ProductsFooter>
                            <ProductsFooterLine>
                                <b>SubTotal</b>
                                <span>R$ 59,69</span>
                            </ProductsFooterLine>
                            <ProductsFooterLine>
                                <b>Descontos</b>
                                <span>R$ 0,00</span>
                            </ProductsFooterLine>
                            <ProductsFooterLine>
                                <b>Valor Total a Pagar</b>
                                <strong>R$ 59,69</strong>
                            </ProductsFooterLine>
                        </ProductsFooter>
                    </ProductCard>
                </div>
                <ActionArea>
                    <CardTitle>
                        <BsPrinter />
                        Impressoes e Acoes
                    </CardTitle>
                    <PrintGrid>
                        <Botao
                            nome="Imprimir Recibo (Impressora Termica)"
                            action={() => undefined}
                            icone={<BsPrinter />}
                            className="print-action-button"
                        />
                        <Botao
                            nome="Imprimir Recibo (F1)"
                            action={() => undefined}
                            icone={<BsFileEarmarkText />}
                            className="print-action-button"
                        />
                        <Botao
                            nome="Imprimir Cupom de Troca"
                            action={() => undefined}
                            icone={<BsFileEarmarkText />}
                            className="print-action-button"
                        />
                        <Botao
                            nome="Imprimir Sem Valor Fiscal (F2)"
                            action={() => undefined}
                            icone={<BsPrinter />}
                            className="print-action-button"
                        />
                        <Botao
                            nome="Imprimir Sem Valor Fiscal (58mm)"
                            action={() => undefined}
                            icone={<BsPrinter />}
                            className="print-action-button"
                        />
                        <Botao
                            nome="Solicitar NF do Consumidor (F3)"
                            action={() => undefined}
                            icone={<BsPrinter />}
                            className="print-action-button"
                        />
                        <Botao
                            nome="Espelho NF"
                            action={() => undefined}
                            icone={<BsFileEarmarkText />}
                            className="print-action-button"
                        />
                        <Botao
                            nome="Solicitar NF Eletronica (F4)"
                            action={() => undefined}
                            icone={<BsFileEarmarkText />}
                            className="print-action-button"
                            disabled
                        />
                        <Botao
                            nome="Imprimir Producao (F6)"
                            action={() => undefined}
                            icone={<BsPrinter />}
                            className="print-action-button"
                        />
                        <Botao
                            nome="Gerar Etiqueta Melhor Envio"
                            action={() => undefined}
                            icone={<BsReceipt />}
                            className="print-action-button print-action-button-wide"
                        />
                    </PrintGrid>
                </ActionArea>
            </ContentGrid>

            <Footer>
                <Botao
                    nome="Enviar NFe/NFC E-mail"
                    action={() => undefined}
                    icone={<BsEnvelope />}
                    className="footer-action-button"
                />
                <Botao
                    nome="Encaminhamento (F8)"
                    action={() => undefined}
                    icone={<BsPrinter />}
                    className="footer-action-button"
                />
                <FooterSpacer />
                <Botao
                    nome="Enviar NFS E-mail"
                    action={() => undefined}
                    icone={<BsEnvelope />}
                    className="footer-action-button"
                />
                <Botao
                    nome="Sair do Caixa"
                    action={() => navigate("/home")}
                    icone={<FiLogOut />}
                    color="close"
                    className="footer-action-button"
                />
                <Botao
                    nome="Nova Venda (Enter)"
                    action={() => navigate("/frente-caixa")}
                    icone={<BsPlusCircle />}
                    color="add"
                    variant="primary"
                    className="footer-action-button"
                />
            </Footer>
        </Page>
    );
};
