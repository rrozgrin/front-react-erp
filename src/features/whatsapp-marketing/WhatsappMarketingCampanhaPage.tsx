import { useMemo, useState } from 'react';
import { FiClock, FiImage, FiPlus, FiSave, FiSend, FiUploadCloud } from 'react-icons/fi';
import { WhatsappMarketingPage, WhatsappPreview } from './components';
import { NewContactListModal } from './NewContactListModal';
import { contactLists, formatNumber, messageTemplates } from './whatsappMarketingData';
import {
    CampaignLayout,
    ContactListOption,
    ContactListPicker,
    Field,
    FormCard,
    FormSection,
    PrimaryButton,
    RadioCard,
    RadioGroup,
    SecondaryButton,
    TemplateButton,
    TemplateRow,
    ToolbarActions,
    UploadBox,
} from './styled';
import { Input, Radio, Textarea } from '../../common/components/Ui';

export const WhatsappMarketingCampanhaPage = () => {
    const [campaignName, setCampaignName] = useState('Promoção de Inverno 2026');
    const [message, setMessage] = useState(messageTemplates[0].text);
    const [templateId, setTemplateId] = useState(messageTemplates[0].id);
    const [lists, setLists] = useState(contactLists);
    const [selectedListId, setSelectedListId] = useState(contactLists[0].id);
    const [sendMode, setSendMode] = useState<'now' | 'schedule'>('now');
    const [showNewListModal, setShowNewListModal] = useState(false);

    const selectedList = useMemo(
        () => lists.find((list) => list.id === selectedListId),
        [lists, selectedListId]
    );

    const applyTemplate = (template: typeof messageTemplates[number]) => {
        setTemplateId(template.id);
        setMessage(template.text);
    };

    const handleSaveList = (listName: string) => {
        const nextId = Math.max(...lists.map((list) => list.id), 0) + 1;

        setLists((currentLists) => [
            {
                id: nextId,
                name: listName,
                description: 'Lista criada manualmente para campanhas de WhatsApp',
                contacts: 0,
                createdAt: new Date().toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                status: 'active',
            },
            ...currentLists,
        ]);
        setSelectedListId(nextId);
    };

    return (
        <>
            <WhatsappMarketingPage title="2º passo: Criar Mensagem">
                <CampaignLayout>
                    <FormCard as="form" onSubmit={(event) => event.preventDefault()}>
                        <FormSection>
                            <h3>Dados da campanha</h3>
                            <Field>
                                Nome da campanha
                                <Input
                                    value={campaignName}
                                    onChange={(event) => setCampaignName(event.target.value)}
                                    placeholder="Ex.: Promoção de Maio, oferta especial..."
                                />
                            </Field>
                        </FormSection>

                        <FormSection>
                            <h3>Mensagem</h3>
                            <TemplateRow>
                                {messageTemplates.map((template) => (
                                    <TemplateButton
                                        key={template.id}
                                        type="button"
                                        $active={templateId === template.id}
                                        onClick={() => applyTemplate(template)}
                                    >
                                        {template.label}
                                    </TemplateButton>
                                ))}
                            </TemplateRow>
                            <Field>
                                Texto da mensagem
                                <Textarea
                                    value={message}
                                    onChange={(event) => {
                                        setTemplateId('');
                                        setMessage(event.target.value);
                                    }}
                                    placeholder="Digite a mensagem da campanha..."
                                />
                                <span>Use uma linguagem objetiva e inclua uma chamada para ação.</span>
                            </Field>
                        </FormSection>

                        <FormSection>
                            <h3>Imagem da campanha</h3>
                            <UploadBox>
                                <FiUploadCloud size={28} />
                                <div>
                                    <strong>Clique para fazer upload</strong>
                                    <p>Formatos JPG, JPEG ou PNG. Tamanho máximo sugerido: 400 KB.</p>
                                </div>
                                <SecondaryButton type="button">
                                    <FiImage size={16} />
                                    Selecionar imagem
                                </SecondaryButton>
                            </UploadBox>
                        </FormSection>

                        <FormSection>
                            <h3>Lista de contatos</h3>
                            <ContactListPicker>
                                {lists.map((list) => (
                                    <ContactListOption key={list.id} $selected={selectedListId === list.id}>
                                        <Radio
                                            name="contact-list"
                                            checked={selectedListId === list.id}
                                            onChange={() => setSelectedListId(list.id)}
                                        />
                                        <div>
                                            <strong>{list.name}</strong>
                                            <span>{list.description}</span>
                                        </div>
                                        <span>{formatNumber(list.contacts)}</span>
                                    </ContactListOption>
                                ))}
                            </ContactListPicker>
                            <ToolbarActions>
                                <SecondaryButton type="button" onClick={() => setShowNewListModal(true)}>
                                    <FiPlus size={16} />
                                    Criar nova lista
                                </SecondaryButton>
                            </ToolbarActions>
                        </FormSection>

                        <FormSection>
                            <h3>Agendamento</h3>
                            <RadioGroup>
                                <RadioCard $selected={sendMode === 'now'}>
                                    <Radio
                                        checked={sendMode === 'now'}
                                        onChange={() => setSendMode('now')}
                                    />
                                    <FiSend size={16} />
                                    Enviar agora
                                </RadioCard>
                                <RadioCard $selected={sendMode === 'schedule'}>
                                    <Radio
                                        checked={sendMode === 'schedule'}
                                        onChange={() => setSendMode('schedule')}
                                    />
                                    <FiClock size={16} />
                                    Agendar para depois
                                </RadioCard>
                            </RadioGroup>
                            {sendMode === 'schedule' ? (
                                <Field>
                                    Data e hora do envio
                                    <Input type="datetime-local" />
                                </Field>
                            ) : null}
                        </FormSection>

                        <ToolbarActions>
                            <SecondaryButton type="button">Cancelar</SecondaryButton>
                            <PrimaryButton type="submit">
                                <FiSave size={16} />
                                Salvar campanha
                            </PrimaryButton>
                        </ToolbarActions>
                        <span>
                            Lista selecionada: {selectedList?.name} com {formatNumber(selectedList?.contacts ?? 0)} contatos.
                        </span>
                    </FormCard>

                    <WhatsappPreview campaignName={campaignName} message={message} />
                </CampaignLayout>
            </WhatsappMarketingPage>

            {showNewListModal ? (
                <NewContactListModal
                    onClose={() => setShowNewListModal(false)}
                    onSave={handleSaveList}
                />
            ) : null}
        </>
    );
};
