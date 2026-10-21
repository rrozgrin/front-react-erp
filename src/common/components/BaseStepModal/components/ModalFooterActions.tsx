import React from 'react';
import {
    Actions,
    Footer,
} from '../styled';
import { Botao } from '../../Buttons/Botao';

interface ModalFooterActionsProps {
    currentStep: number;
    isCompleteMode: boolean;
    isDisabled: boolean;
    totalSteps: number;
    onClose: () => void;
    onNextStep: () => void;
    onPreviousStep: () => void;
    onToggleMode?: () => void;
    submitLabel?: string;
    completeModeLabel?: string;
    quickModeLabel?: string;
}

export const ModalFooterActions: React.FC<ModalFooterActionsProps> = ({
    currentStep,
    isCompleteMode,
    isDisabled,
    totalSteps,
    onClose,
    onNextStep,
    onPreviousStep,
    onToggleMode,
    submitLabel = 'Salvar',
    completeModeLabel = 'Cadastro completo',
    quickModeLabel = 'Cadastro rápido',
}) => {
    return (
        <Footer>
            <Actions>
                <Botao nome="Cancelar" color="close" action={() => onClose()} />

                {isCompleteMode && currentStep > 0 && (
                    <Botao nome="Voltar" action={() => onPreviousStep()} />
                )}

                {isCompleteMode && currentStep < totalSteps - 1 ? (
                    <Botao nome="Proximo passo" action={() => onNextStep()} />
                ) : (
                    <Botao
                        nome={submitLabel}
                        color="add"
                        type="submit"
                        disabled={isDisabled}
                        action={() => undefined}
                    />
                )}

                {onToggleMode && <Botao
                    nome={isCompleteMode ? quickModeLabel : completeModeLabel}
                    action={() => onToggleMode()}
                />}
            </Actions>
        </Footer>
    );
};
