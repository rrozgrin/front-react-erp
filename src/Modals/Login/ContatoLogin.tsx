import { IoIosSend } from 'react-icons/io';
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../common/components/ModalSimple';
import {
    FieldBlock,
    FormRow,
    FormStack,
    Input,
    TextArea,
} from './loginModalForm.styles';

type ContatoLoginProps = {
    open: boolean
    onClose: () => void
}

function ContatoLogin({ open, onClose }: ContatoLoginProps) {
    if (!open) return null

    return (
        <ModalSimple
            title="✉ Contato"
            onClose={onClose}
            size="xl"
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>
                        Fechar
                    </ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button">
                        Solicitar <IoIosSend size={20} />
                    </ModalSimpleActionButton>
                </>
            )}
        >
            <FormStack>
                <FormRow>
                    <FieldBlock>
                        Nome completo
                        <Input />
                    </FieldBlock>
                    <FieldBlock>
                        Telefone
                        <Input />
                    </FieldBlock>
                </FormRow>

                <FieldBlock>
                    E-mail
                    <Input />
                </FieldBlock>

                <FieldBlock>
                    Mensagem
                    <TextArea />
                </FieldBlock>
            </FormStack>
        </ModalSimple>
    )
}

export default ContatoLogin
