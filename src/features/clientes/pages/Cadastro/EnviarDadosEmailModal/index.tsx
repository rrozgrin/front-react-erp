import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiMail, FiSend, FiUser } from "react-icons/fi";
import { IoInformationCircle } from "react-icons/io5";
import {
    Body,
    Divider,
    FieldGroup,
    FieldLabel,
    Form,
    InfoBox,
    Input,
    InputIcon,
    InputShell,
    SectionTitle,
} from "./styled";
import { ModalSimple } from "../../../../../common/components/ModalSimple";
import { Botao } from "../../../../../common/components/Buttons/Botao";
interface EnviarDadosEmailModalProps {
    open: boolean;
    onClose: () => void;
    initialEmail?: string;
}

export const EnviarDadosEmailModal: React.FC<EnviarDadosEmailModalProps> = ({
    open,
    onClose,
    initialEmail,
}) => {
    const [assunto, setAssunto] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (!open) {
            return;
        }

        setAssunto("");
        setEmail(initialEmail ?? "");

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [initialEmail, onClose, open]);

    if (!open) {
        return null;
    }

    const handleEnviar = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await Swal.fire(
            "Envio indisponível",
            "O envio ainda não está integrado com o backend.",
            "info",
        );
    };

    return (
        <ModalSimple
            title="Enviar dados via e-mail"
            subtitle="Preencha os campos abaixo para enviar os dados."
            onClose={onClose}
            size="sm"
            footer={
                <>
                    <Botao nome="Cancelar" color="close" action={onClose} />
                    <Botao
                        nome="Enviar"
                        color="add"
                        action={onClose}
                        icone={<FiSend />}
                    />
                </>
            }
        >
            <Body>
                <SectionTitle>Destinatário</SectionTitle>
                <Divider />

                <Form id="enviar-dados-email-form" onSubmit={handleEnviar}>
                    <FieldGroup>
                        <FieldLabel>Assunto</FieldLabel>
                        <InputShell>
                            <InputIcon>
                                <FiMail />
                            </InputIcon>
                            <Input
                                type="text"
                                value={assunto}
                                placeholder="Ex.: Atualização cadastral"
                                onChange={(event) =>
                                    setAssunto(event.target.value)
                                }
                            />
                        </InputShell>
                    </FieldGroup>

                    <FieldGroup>
                        <FieldLabel>E-mail</FieldLabel>
                        <InputShell>
                            <InputIcon>
                                <FiUser />
                            </InputIcon>
                            <Input
                                type="email"
                                value={email}
                                placeholder="cliente@email.com"
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </InputShell>
                    </FieldGroup>

                    <InfoBox>
                        <IoInformationCircle />
                        <span>
                            O envio ainda não está integrado com o backend.
                        </span>
                    </InfoBox>
                </Form>
            </Body>
        </ModalSimple>
    );
};
