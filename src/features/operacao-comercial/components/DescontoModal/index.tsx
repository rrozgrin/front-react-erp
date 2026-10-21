import React, { useEffect, useState } from "react";
import { FiInfo, FiTag, FiBox } from "react-icons/fi";
import { ModalSimple } from '@/common/components/ModalSimple';
import {
    Wrapper,
    ChoiceGrid,
    ChoiceCard,
    ChoiceRadio,
    ChoiceIcon,
    ChoiceText,
    AlertBox,
    DesktopLayout,
    DesktopFields,
    FieldGrid,
    Label,
    Input,
    MobileStack,
    FooterBar,
} from "./styled";
import { Botao } from '@/common/components/Buttons/Botao';

type DiscountType = "general" | "item";

interface DescontoModalProps {
    open: boolean;
    onClose: () => void;
    disableItemDiscount?: boolean;
    onApply?: (payload: {
        type: DiscountType;
        percentage: string;
        value: string;
        itemNumber: string;
    }) => void;
}

export const DescontoModal: React.FC<DescontoModalProps> = ({
    open,
    onClose,
    disableItemDiscount = false,
    onApply,
}) => {
    const [type, setType] = useState<DiscountType>("general");
    const [percentage, setPercentage] = useState("0,00");
    const [value, setValue] = useState("0,00");
    const [itemNumber, setItemNumber] = useState("");

    useEffect(() => {
        if (open && disableItemDiscount) {
            setType("general");
            setItemNumber("");
        }
    }, [disableItemDiscount, open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key === "F1") {
                event.preventDefault();
                setType("general");
                return;
            }

            if (event.key === "F2") {
                event.preventDefault();
                if (disableItemDiscount) {
                    return;
                }

                setType("item");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [disableItemDiscount, open, onClose]);

    if (!open) {
        return null;
    }

    const isItemType = type === "item";

    const handleApply = () => {
        onApply?.({
            type,
            percentage,
            value,
            itemNumber,
        });
        onClose();
    };

    return (
        <ModalSimple
            title="Desconto"
            onClose={onClose}
            footer={
                <FooterBar>
                    <Botao nome="Fechar" action={onClose} />
                    <Botao nome="Confirmar" color="add" action={handleApply} />
                </FooterBar>
            }
        >
            <Wrapper>
                <DesktopLayout>
                    <ChoiceGrid>
                        <ChoiceCard
                            type="button"
                            $active={type === "general"}
                            onClick={() => setType("general")}
                        >
                            <ChoiceRadio $active={type === "general"} />
                            <ChoiceIcon>
                                <FiTag />
                            </ChoiceIcon>
                            <ChoiceText>
                                <strong>Desconto Geral (F1)</strong>
                                <span>
                                    Aplica o desconto no total da venda.
                                </span>
                            </ChoiceText>
                        </ChoiceCard>

                        <ChoiceCard
                            type="button"
                            $active={type === "item"}
                            disabled={disableItemDiscount}
                            onClick={() => {
                                if (!disableItemDiscount) {
                                    setType("item");
                                }
                            }}
                        >
                            <ChoiceRadio $active={type === "item"} />
                            <ChoiceIcon>
                                <FiBox />
                            </ChoiceIcon>
                            <ChoiceText>
                                <strong>Desconto de Item (F2)</strong>
                                <span>
                                    Aplica o desconto em um item específico.
                                </span>
                            </ChoiceText>
                        </ChoiceCard>
                    </ChoiceGrid>

                    <AlertBox>
                        <FiInfo />
                        <span>
                            Os descontos aplicados anteriormente serão
                            desconsiderados.
                        </span>
                    </AlertBox>

                    <DesktopFields>
                        <FieldGrid>
                            <Label>Preço de Custo Geral</Label>
                            <Input value="R$ 19,00" readOnly />

                            <Label>Preço de Venda</Label>
                            <Input value="R$ 59,69" readOnly />

                            <Label>Desconto (%)</Label>
                            <Input
                                value={percentage}
                                onChange={(event) =>
                                    setPercentage(event.target.value)
                                }
                                inputMode="decimal"
                            />

                            <Label>Desconto (R$)</Label>
                            <Input
                                value={value}
                                onChange={(event) =>
                                    setValue(event.target.value)
                                }
                                inputMode="decimal"
                            />
                        </FieldGrid>
                    </DesktopFields>
                </DesktopLayout>

                <MobileStack>
                    <ChoiceGrid>
                        <ChoiceCard
                            type="button"
                            $active={type === "general"}
                            onClick={() => setType("general")}
                        >
                            <ChoiceRadio $active={type === "general"} />
                            <ChoiceIcon>
                                <FiTag />
                            </ChoiceIcon>
                            <ChoiceText>
                                <strong>Desconto Geral</strong>
                                <span>
                                    Aplica o desconto no total da venda.
                                </span>
                            </ChoiceText>
                        </ChoiceCard>

                        <ChoiceCard
                            type="button"
                            $active={type === "item"}
                            disabled={disableItemDiscount}
                            onClick={() => {
                                if (!disableItemDiscount) {
                                    setType("item");
                                }
                            }}
                        >
                            <ChoiceRadio $active={type === "item"} />
                            <ChoiceIcon>
                                <FiBox />
                            </ChoiceIcon>
                            <ChoiceText>
                                <strong>Desconto de Item</strong>
                                <span>
                                    Aplica o desconto em um item específico.
                                </span>
                            </ChoiceText>
                        </ChoiceCard>
                    </ChoiceGrid>

                    {isItemType ? (
                        <AlertBox $tone="warning">
                            <FiInfo />
                            <span>
                                Caso o produto já tenha recebido desconto, o
                                mesmo será desconsiderado.
                            </span>
                        </AlertBox>
                    ) : (
                        <AlertBox>
                            <FiInfo />
                            <span>
                                Os descontos aplicados anteriormente serão
                                desconsiderados.
                            </span>
                        </AlertBox>
                    )}

                    <FieldGrid>
                        {isItemType ? (
                            <>
                                <Label>Número do item</Label>
                                <Input
                                    placeholder="Digite o número do item"
                                    value={itemNumber}
                                    onChange={(event) =>
                                        setItemNumber(event.target.value)
                                    }
                                    inputMode="numeric"
                                />
                            </>
                        ) : null}

                        <Label>Desconto (%)</Label>
                        <Input
                            value={percentage}
                            onChange={(event) =>
                                setPercentage(event.target.value)
                            }
                            inputMode="decimal"
                        />

                        <Label>Desconto (R$)</Label>
                        <Input
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                            inputMode="decimal"
                        />
                    </FieldGrid>
                </MobileStack>
            </Wrapper>
        </ModalSimple>
    );
};

export default DescontoModal;
