import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import {
    CloseButton,
    Header,
    HeaderContent,
    Subtitle,
    Title,
} from '../styled';

interface ModalHeaderProps {
    onClose: () => void;
    title?: string;
    subtitle?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
    onClose,
    title = 'Adicionar cliente',
    subtitle = ''
}) => {
    return (
        <Header>
            <HeaderContent>
                <Title>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </HeaderContent>

            <CloseButton type="button" onClick={onClose} aria-label="Fechar modal">
                <IoCloseOutline size={26} />
            </CloseButton>
        </Header>
    );
};
