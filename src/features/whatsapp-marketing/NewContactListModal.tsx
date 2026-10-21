import { useState, type FormEvent, type ReactNode } from 'react';
import { FiDownload, FiFileText, FiSave, FiUploadCloud, FiUser, FiUserPlus } from 'react-icons/fi';
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../common/components/ModalSimple';
import {
    DownloadActions,
    ImportMethodList,
    ImportMethodOption,
    ModalFooterActions,
    ModalIconBox,
    ModalInput,
    ModalStepCard,
    ModalStepHeader,
    ModalStepNumber,
    ModalSteps,
    ModalStepTitle,
    UploadDropzone,
} from './styled';
import { Radio } from '../../common/components/Ui';

type ImportMethod = 'manual' | 'system' | 'file';

interface NewContactListModalProps {
    onClose: () => void;
    onSave?: (listName: string) => void;
}

const importMethods: Array<{
    id: ImportMethod;
    title: string;
    description: string;
    icon: ReactNode;
}> = [
        {
            id: 'manual',
            title: 'Digitar / colar números de telefone',
            description: 'Digite ou cole os números de telefone manualmente.',
            icon: <FiUserPlus size={20} />,
        },
        {
            id: 'system',
            title: 'Importar clientes do sistema',
            description: 'Selecione clientes cadastrados no seu sistema.',
            icon: <FiUser size={20} />,
        },
        {
            id: 'file',
            title: 'Importar arquivo .CSV ou .TXT',
            description: 'Faça o upload de um arquivo com os números de telefone.',
            icon: <FiUploadCloud size={20} />,
        },
    ];

export const NewContactListModal = ({ onClose, onSave }: NewContactListModalProps) => {
    const [listName, setListName] = useState('');
    const [importMethod, setImportMethod] = useState<ImportMethod>('manual');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave?.(listName.trim() || 'Nova lista de contatos');
        onClose();
    };

    return (
        <ModalSimple
            title="Criar nova lista de telefones para envio automático"
            subtitle="Crie uma nova lista e adicione os números de telefone que deseja enviar suas campanhas."
            size="xl"
            onClose={onClose}
            footer={(
                <ModalFooterActions>
                    <ModalSimpleActionButton $variant="secondary" type="button">
                        <FiUser size={16} />
                        Clientes que não compram
                    </ModalSimpleActionButton>
                    <ModalSimpleActionButton type="submit" form="whatsapp-new-contact-list-form">
                        <FiSave size={16} />
                        Salvar lista
                    </ModalSimpleActionButton>
                </ModalFooterActions>
            )}
        >
            <form id="whatsapp-new-contact-list-form" onSubmit={handleSubmit}>
                <ModalSteps>
                    <ModalStepCard>
                        <ModalStepHeader>
                            <ModalStepNumber>1</ModalStepNumber>
                            <ModalStepTitle>
                                <strong>Dados da lista</strong>
                            </ModalStepTitle>
                        </ModalStepHeader>
                        <ModalInput
                            value={listName}
                            onChange={(event) => setListName(event.target.value)}
                            placeholder="Ex.: Lista de Clientes VIP"
                        />
                    </ModalStepCard>

                    <ModalStepCard>
                        <ModalStepHeader>
                            <ModalStepNumber>2</ModalStepNumber>
                            <ModalStepTitle>
                                <strong>Telefones para a lista</strong>
                                <span>Escolha a forma de adicionar os telefones à lista.</span>
                            </ModalStepTitle>
                        </ModalStepHeader>

                        <ImportMethodList>
                            {importMethods.map((method) => (
                                <ImportMethodOption key={method.id} $selected={importMethod === method.id}>
                                    <Radio
                                        name="contact-import-method"
                                        checked={importMethod === method.id}
                                        onChange={() => setImportMethod(method.id)}
                                    />
                                    <ModalIconBox>{method.icon}</ModalIconBox>
                                    <div>
                                        <strong>{method.title}</strong>
                                        <span>{method.description}</span>
                                    </div>
                                </ImportMethodOption>
                            ))}
                        </ImportMethodList>

                        <UploadDropzone>
                            <FiUploadCloud size={20} />
                            <p>
                                Arraste e solte o arquivo aqui ou <strong>clique para selecionar</strong>
                            </p>
                            <p>Formatos aceitos: .CSV, .TXT. Tamanho máximo: 5 MB.</p>
                        </UploadDropzone>
                    </ModalStepCard>

                    <ModalStepCard>
                        <ModalStepHeader>
                            <ModalStepNumber>3</ModalStepNumber>
                            <ModalStepTitle>
                                <strong>Modelos para download</strong>
                                <span>Baixe os modelos de arquivo para facilitar a importação dos números.</span>
                            </ModalStepTitle>
                        </ModalStepHeader>
                        <DownloadActions>
                            <ModalSimpleActionButton $variant="secondary" type="button">
                                <FiDownload size={16} />
                                Baixar modelo .TXT
                            </ModalSimpleActionButton>
                            <ModalSimpleActionButton $variant="secondary" type="button">
                                <FiFileText size={16} />
                                Baixar modelo .CSV
                            </ModalSimpleActionButton>
                        </DownloadActions>
                    </ModalStepCard>
                </ModalSteps>
            </form>
        </ModalSimple>
    );
};
