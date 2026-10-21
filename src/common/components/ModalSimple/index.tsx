import type { ReactNode } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import {
    Body,
    CloseButton,
    Dialog,
    Footer,
    FormRow,
    ModalActions,
    Header,
    HeaderContent,
    InlineOptions,
    ModalActionButton,
    ModalForm,
    Overlay,
    Subtitle,
    Title,
    type ModalSize,
} from './styled';

interface ModalSimpleProps {
    ariaLabel?: string;
    children: ReactNode;
    footer?: ReactNode;
    onClose: () => void;
    size?: ModalSize;
    subtitle?: string;
    title: string;
}

export const ModalSimple = ({
    ariaLabel,
    children,
    footer,
    onClose,
    size = 'md',
    subtitle,
    title,
}: ModalSimpleProps) => {
    return (
        <Overlay>
            <Dialog role="dialog" aria-modal="true" aria-label={ariaLabel || title} $size={size}>
                <Header>
                    <HeaderContent>
                        <Title>{title}</Title>
                        {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
                    </HeaderContent>

                    <CloseButton type="button" onClick={onClose} aria-label="Fechar">
                        <IoCloseOutline size={24} />
                    </CloseButton>
                </Header>

                <Body>{children}</Body>
                {footer ? <Footer>{footer}</Footer> : null}
            </Dialog>
        </Overlay>
    );
};

export {
    Footer as ModalSimpleFooter,
    FormRow as ModalSimpleFormRow,
    InlineOptions as ModalSimpleInlineOptions,
    ModalActionButton as ModalSimpleActionButton,
    ModalActions as ModalSimpleActions,
    ModalForm as ModalSimpleForm,
};

export type {
    ModalSize as ModalSimpleSize,
};
