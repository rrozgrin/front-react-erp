import { IoIosSend } from 'react-icons/io';
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../common/components/ModalSimple';
import {
    AddressRow,
    FieldBlock,
    Input,
    Select,
    FormRow,
    FormStack,
    ThreeColumnRow,
} from './loginModalForm.styles';

const STATES = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

type QueroSerClienteProps = {
    open: boolean
    onClose: () => void
}

function QueroSerCliente({ open, onClose }: QueroSerClienteProps) {
    if (!open) return null

    return (
        <ModalSimple
            title="Quero Ser Cliente"
            ariaLabel="Quero Ser Cliente"
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
                    Empresa
                    <Input />
                </FieldBlock>

                <AddressRow>
                    <FieldBlock>
                        Endereço
                        <Input />
                    </FieldBlock>
                    <FieldBlock>
                        Nº
                        <Input />
                    </FieldBlock>
                </AddressRow>

                <ThreeColumnRow>
                    <FieldBlock>
                        Bairro
                        <Input />
                    </FieldBlock>
                    <FieldBlock>
                        Cidade
                        <Input />
                    </FieldBlock>
                    <FieldBlock>
                        UF
                        <Select defaultValue="">
                            <option value="" disabled>
                                Selecione
                            </option>
                            {STATES.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </Select>
                    </FieldBlock>
                </ThreeColumnRow>
            </FormStack>
        </ModalSimple>
    )
}

export default QueroSerCliente
