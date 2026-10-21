import React from 'react';
import { FaRegUser, FaStar } from 'react-icons/fa';
import { DetailProfileCard } from '../../../../../common/components/DetailView';
import { Cliente } from '../../../types/Cliente';

interface FotoClienteCardProps {
    cliente: Cliente;
}

export const FotoClienteCard: React.FC<FotoClienteCardProps> = ({ cliente }) => {
    return (
        <DetailProfileCard
            name={cliente.nome || 'Cliente sem nome'}
            badges={[
                { icon: <FaStar aria-hidden="true" />, label: cliente.status?.toUpperCase() || 'SEM STATUS' },
                { icon: <FaRegUser aria-hidden="true" />, label: cliente.segmento || 'Sem segmento' },
            ]}
        />
    );
};
