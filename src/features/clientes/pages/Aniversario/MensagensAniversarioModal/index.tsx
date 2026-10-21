import React, { useState } from 'react';
import { Table, TableField } from '../../../../../common/components/Table';
import { ModalSimple } from '../../../../../common/components/ModalSimple';

interface Props {
    open: boolean;
    onClose: () => void;
}

interface Mensagem {
    id: number;
    titulo: string;
    mensagem: string;
    acoes: string[];
}

export const ModalVisualizarMensagemAniversario: React.FC<Props> = ({ onClose }) => {
    const [mensagens] = useState<Mensagem[]>([
        {
            id: 1,
            titulo: 'Feliz Aniversário',
            mensagem: 'Desejamos um feliz aniversário cheio de alegrias!',
            acoes: ['email', 'sms']
        },
        {
            id: 2,
            titulo: 'Parabéns pelo seu dia',
            mensagem: 'Que este dia seja especial e cheio de bênçãos.',
            acoes: ['email', 'whatsapp']
        },
        {
            id: 3,
            titulo: 'Melhor ano ainda',
            mensagem: 'Esperamos que o novo ano seja seu melhor ainda!',
            acoes: ['sms']
        }
    ]);

    const fields: TableField<Mensagem>[] = [
        {
            id: 'titulo',
            header: 'Título',
            accessorKey: 'titulo',
        },
        {
            id: 'mensagem',
            header: 'Mensagem',
            accessorKey: 'mensagem',
        },
        {
            id: 'acoes',
            header: 'Canais',
            accessorKey: 'acoes',
            cell: (value) => (value as string[]).join(', '),
        }
    ];
    return (
        <ModalSimple
            title="Visualizar Mensagens de Aniversário"
            onClose={onClose}
            size="lg"
        >
            <Table<Mensagem>
                data={mensagens}
                fields={fields}
                emptyMessage="Nenhuma mensagem encontrada"
                showHeader={false}
                showColumnSelector={false}
                compact
            />
        </ModalSimple>
    );
};
