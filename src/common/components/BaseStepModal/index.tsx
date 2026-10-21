import type { ComponentProps, FormEventHandler, ReactNode } from 'react';
import { ModalHeader } from './components/ModalHeader';
import { StepRail } from './components/StepRail';
import { Dialog, Form, Overlay, ScrollArea, StepLayout, StepPanel } from './styled';

type BaseStepModalProps = {
    title: string;
    subtitle?: string;
    onClose: () => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
    steps: ComponentProps<typeof StepRail>['steps'];
    currentStep: number;
    onStepChange: (step: number) => void;
    showSteps?: boolean;
    closeOnBackdrop?: boolean;
    headerInsideForm?: boolean;
    children: ReactNode;
    afterContent?: ReactNode;
    footer: ReactNode;
    dialogs?: ReactNode;
};

/** Estrutura visual; estado, campos e validação pertencem ao domínio. */
export const BaseStepModal = ({
    title, subtitle, onClose, onSubmit, steps, currentStep, onStepChange,
    showSteps = true, closeOnBackdrop = true, headerInsideForm = false,
    children, afterContent, footer, dialogs,
}: BaseStepModalProps) => {
    const header = <ModalHeader title={title} subtitle={subtitle} onClose={onClose} />;

    return (
        <Overlay onClick={closeOnBackdrop ? onClose : undefined}>
            <Dialog onClick={(event) => event.stopPropagation()}>
                {!headerInsideForm && header}
                <Form onSubmit={onSubmit}>
                    {headerInsideForm && header}
                    <ScrollArea>
                        {showSteps ? (
                            <StepLayout>
                                <StepRail steps={steps} currentStep={currentStep} onStepChange={onStepChange} />
                                <StepPanel>{children}</StepPanel>
                            </StepLayout>
                        ) : children}
                        {afterContent}
                    </ScrollArea>
                    {footer}
                </Form>
                {dialogs}
            </Dialog>
        </Overlay>
    );
};
