import type { FC } from 'react';
import { ModalCadastroParceiro } from '../../../../parceiros/components/ModalCadastroParceiro';
import type { Transportadoras } from '../../../types/Transportadoras';

interface ModalAddTransportadorasProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: Transportadoras) => void;
}

export const ModalAddTransportadoras: FC<ModalAddTransportadorasProps> = (props) => (
    <ModalCadastroParceiro<Transportadoras> {...props} titulo="Adicionar transportadora" />
);
