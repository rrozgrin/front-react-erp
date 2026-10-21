import type { FC } from 'react';
import { ModalCadastroParceiro } from '../../../../parceiros/components/ModalCadastroParceiro';
import type { Fornecedores } from '../../../types/Fornecedores';

interface ModalAddFornecedoresProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: Fornecedores) => void;
}

export const ModalAddFornecedores: FC<ModalAddFornecedoresProps> = (props) => (
    <ModalCadastroParceiro<Fornecedores> {...props} titulo="Adicionar fornecedor" />
);
