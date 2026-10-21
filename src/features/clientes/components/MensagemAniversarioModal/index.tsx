import { useState } from 'react';
import { ModalSimple, ModalSimpleActionButton } from '@/common/components/ModalSimple';
import {
    CheckboxGroup,
    CheckboxItem,
    Content,
    Description,
    Field,
    Helper,
    Info,
    InputShell,
    Label,
    RadioGroup,
    Textarea,
} from './styled';

export interface DadosMensagemAniversario {
    titulo?: string;
    mensagem: string;
    canais: string[];
    ativo: boolean;
}

interface Props {
    open: boolean;
    modo: 'criar' | 'editar';
    onClose: () => void;
    onSave: (dados: DadosMensagemAniversario) => void;
}

const MENSAGEM_PADRAO = 'Caro {{nome}}, neste dia especial nossa equipe gostaria de lhe parabenizar e desejar muito sucesso em sua vida, além de agradecer a parceria conosco durante o último ano.';
const CANAIS = ['todos', 'sms', 'email'];

export const MensagemAniversarioModal = ({ open, modo, onClose, onSave }: Props) => {
    const [titulo, setTitulo] = useState('');
    const [mensagem, setMensagem] = useState(MENSAGEM_PADRAO);
    const [canais, setCanais] = useState<string[]>(['todos']);
    const [ativo, setAtivo] = useState(true);

    if (!open) return null;

    const toggleCanal = (canal: string) => {
        setCanais((anteriores) => anteriores.includes(canal)
            ? anteriores.filter((item) => item !== canal)
            : [...anteriores, canal]);
    };

    const salvar = () => {
        onSave({ ...(modo === 'criar' ? { titulo } : {}), mensagem, canais, ativo });
        onClose();
    };

    return (
        <ModalSimple
            title="Mensagem de Aniversário"
            subtitle={modo === 'criar' ? 'Crie uma mensagem de aniversário para enviar aos clientes aniversariantes do dia.' : undefined}
            onClose={onClose}
            size="md"
            footer={(
                <>
                    {modo === 'criar' && <Info>Mensagem criada em 22/01/2024 10:48:17</Info>}
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Cancelar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button" onClick={salvar}>Salvar</ModalSimpleActionButton>
                </>
            )}
        >
            <Content>
                {modo === 'criar' && (
                    <>
                        <Description>Configure o título, a mensagem e os canais de envio.</Description>
                        <Field>
                            <Label htmlFor="mensagem-aniversario-titulo">Informe o Título</Label>
                            <InputShell>
                                <input id="mensagem-aniversario-titulo" value={titulo} onChange={(evento) => setTitulo(evento.target.value)} />
                            </InputShell>
                        </Field>
                    </>
                )}

                <Field>
                    <Label htmlFor="mensagem-aniversario-texto">Digite sua mensagem</Label>
                    <Textarea id="mensagem-aniversario-texto" value={mensagem} onChange={(evento) => setMensagem(evento.target.value)} />
                    <Helper>Use a marcação {'{{nome}}'} onde deseja exibir o nome do seu cliente.</Helper>
                </Field>

                <Field>
                    <Label>Como você deseja enviar esta mensagem?</Label>
                    <CheckboxGroup>
                        {CANAIS.map((canal) => (
                            <CheckboxItem key={canal}>
                                <input type="checkbox" checked={canais.includes(canal)} onChange={() => toggleCanal(canal)} />
                                <span>{canal.toUpperCase()}</span>
                            </CheckboxItem>
                        ))}
                    </CheckboxGroup>
                </Field>

                <Field>
                    <Label>Ativar mensagem?</Label>
                    <RadioGroup>
                        <label><input type="radio" name="mensagem-aniversario-ativo" checked={ativo} onChange={() => setAtivo(true)} />Sim</label>
                        <label><input type="radio" name="mensagem-aniversario-ativo" checked={!ativo} onChange={() => setAtivo(false)} />Não</label>
                    </RadioGroup>
                </Field>
            </Content>
        </ModalSimple>
    );
};
