import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    BsCashCoin,
    BsChatSquareText,
    BsCreditCard2Front,
    BsCreditCard,
} from 'react-icons/bs';
import { MdPix } from 'react-icons/md';
import { FaExclamationTriangle, FaMoneyBillWave } from 'react-icons/fa';
import { ModalSimple } from '@/common/components/ModalSimple';
import { Botao } from '@/common/components/Buttons/Botao';
import {
    ModalContent,
    Card,
    LeftColumn,
    SidePanel,
    SidePanelSection,
    SectionTitle,
    SectionBody,
    InfoList,
    InfoLine,
    SummaryLine,
    TotalLine,
    PaymentFields,
    PaymentMethodGrid,
    PaymentMethodCard,
    Field,
    Input,
    Select,
    Textarea,
    StatusGrid,
    StatusBox,
    StatusText,
    PaymentItem,
    FooterActions,
} from './styled';

type FinalFrenteCaixaModalProps = {
    clienteNome?: string;
    documentoData?: string;
    documentoLabel: string;
    documentoNumero: string;
    funcionarioNome?: string;
    onClose: () => void;
    onFinalize: () => void;
    open: boolean;
    totalCompra?: string;
    totalLabel?: string;
    vendedorNome?: string;
};

const parseCurrency = (value: string) => {
    const normalized = value
        .replace(/[^\d,.-]/g, '')
        .replace(/\./g, '')
        .replace(',', '.');

    const numberValue = Number(normalized);
    return Number.isFinite(numberValue) ? numberValue : 0;
};

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
}).format(value);

const paymentOptions = [
    {
        icon: <FaMoneyBillWave />,
        label: 'Dinheiro',
        value: 'DINHEIRO',
    },
    {
        icon: <BsCreditCard2Front />,
        label: 'Debito',
        value: 'CARTAO DE DEBITO',
    },
    {
        icon: <BsCreditCard />,
        label: 'Credito',
        value: 'CARTAO DE CREDITO',
    },
    {
        icon: <MdPix />,
        label: 'Pix',
        value: 'PIX',
    },
];

export const FinalFrenteCaixaModal: React.FC<FinalFrenteCaixaModalProps> = ({
    clienteNome = 'CLIENTE BALCAO',
    documentoData,
    documentoLabel,
    documentoNumero,
    funcionarioNome = 'Funcionario MASTER',
    onClose,
    onFinalize,
    open,
    totalCompra = 'R$ 0,00',
    totalLabel = 'TOTAL DA COMPRA',
    vendedorNome = '-',
}) => {
    const observacoesRef = useRef<HTMLTextAreaElement | null>(null);
    const [formaPagamento, setFormaPagamento] = useState('DINHEIRO');
    const [frete, setFrete] = useState('0,00');
    const [valorRecebido, setValorRecebido] = useState(totalCompra.replace('R$ ', ''));

    const totalValue = useMemo(() => parseCurrency(totalCompra), [totalCompra]);
    const recebidoValue = useMemo(() => parseCurrency(valorRecebido), [valorRecebido]);
    const faltaValue = Math.max(totalValue - recebidoValue, 0);
    const trocoValue = Math.max(recebidoValue - totalValue, 0);

    useEffect(() => {
        setValorRecebido(totalCompra.replace('R$ ', ''));
    }, [totalCompra]);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'F2') {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key === 'F3') {
                event.preventDefault();
                onFinalize();
                return;
            }

            if (event.key === 'F4') {
                event.preventDefault();
                observacoesRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, onFinalize, open]);

    if (!open) {
        return null;
    }

    return (
        <ModalSimple
            title="Finalizar Venda"
            size="xl"
            onClose={onClose}
            footer={(
                <FooterActions>
                    <Botao nome="Voltar (F2)" action={onClose} />
                    <Botao nome="Finalizar (F3)" action={onFinalize} color="add" />
                </FooterActions>
            )}
        >
            <ModalContent>
                <LeftColumn>
                    <Card>
                        <SectionTitle>
                            <BsCreditCard2Front />
                            Forma de pagamento
                        </SectionTitle>
                        <SectionBody>
                            <PaymentMethodGrid>
                                {paymentOptions.map((option) => (
                                    <PaymentMethodCard
                                        key={option.label}
                                        type="button"
                                        $active={formaPagamento === option.value}
                                        onClick={() => setFormaPagamento(option.value)}
                                        aria-pressed={formaPagamento === option.value}
                                    >
                                        {option.icon}
                                        <strong>{option.label}</strong>
                                    </PaymentMethodCard>
                                ))}
                            </PaymentMethodGrid>

                            <PaymentFields>
                                <Field>
                                    Frete
                                    <Input value={frete} onChange={(event) => setFrete(event.target.value)} />
                                </Field>

                                <Field>
                                    Valor Recebido
                                    <Input value={valorRecebido} onChange={(event) => setValorRecebido(event.target.value)} />
                                </Field>
                            </PaymentFields>

                            <StatusGrid>
                                <StatusBox>
                                    <FaMoneyBillWave />
                                    <StatusText>
                                        <small>TROCO</small>
                                        <strong>{formatCurrency(trocoValue)}</strong>
                                    </StatusText>
                                </StatusBox>

                                <StatusBox $danger>
                                    <FaExclamationTriangle />
                                    <StatusText>
                                        <small>FALTA</small>
                                        <strong>{formatCurrency(faltaValue)}</strong>
                                    </StatusText>
                                </StatusBox>
                            </StatusGrid>

                            <PaymentItem>
                                <span>
                                    <FaMoneyBillWave color="#078b2f" />
                                    {formaPagamento}
                                </span>
                                <strong>{formatCurrency(recebidoValue)}</strong>
                            </PaymentItem>
                        </SectionBody>
                    </Card>

                    <Card>
                        <SectionTitle>
                            <BsChatSquareText />
                            Observacao geral (F4)
                        </SectionTitle>
                        <SectionBody>
                            <Select defaultValue="Nenhuma predefinicao">
                                <option>Nenhuma predefinicao</option>
                            </Select>
                            <Textarea ref={observacoesRef} placeholder="Digite suas observacoes aqui..." />
                        </SectionBody>
                    </Card>
                </LeftColumn>

                <SidePanel>
                    <SidePanelSection>
                        <InfoList>
                            <InfoLine>
                                <span>Cliente</span>
                                <strong>{clienteNome}</strong>
                            </InfoLine>
                            <InfoLine>
                                <span>Venda</span>
                                <strong>{documentoLabel} {documentoNumero}</strong>
                            </InfoLine>
                            <InfoLine>
                                <span>Funcionario</span>
                                <strong>{funcionarioNome}</strong>
                            </InfoLine>
                            <InfoLine>
                                <span>Vendedor</span>
                                <strong>{vendedorNome}</strong>
                            </InfoLine>
                            <InfoLine>
                                <span>Data</span>
                                <strong>{documentoData ?? '-'}</strong>
                            </InfoLine>
                        </InfoList>
                    </SidePanelSection>

                    <SidePanelSection>
                        <SectionTitle>
                            <BsCashCoin />
                            Resumo da venda
                        </SectionTitle>
                        <SectionBody>
                            <SummaryLine>
                                <span>{totalLabel}</span>
                                <strong>{totalCompra}</strong>
                            </SummaryLine>
                            <SummaryLine>
                                <span>Desconto</span>
                                <strong>R$ 0,00</strong>
                            </SummaryLine>
                            <SummaryLine>
                                <span>Frete</span>
                                <strong>R$ 0,00</strong>
                            </SummaryLine>
                            <TotalLine>
                                <span>Total a pagar</span>
                                <strong>{totalCompra}</strong>
                            </TotalLine>
                        </SectionBody>
                    </SidePanelSection>
                </SidePanel>
            </ModalContent>
        </ModalSimple>
    );
};
