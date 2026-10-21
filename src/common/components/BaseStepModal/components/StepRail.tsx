import React from 'react';
import { StepBadge, StepBadgeNumber, StepBadges } from '../styled';

interface StepItem {
    id: string;
    title: string;
    description: string;
}

interface StepRailProps {
    currentStep: number;
    onStepChange: (stepIndex: number) => void;
    steps: StepItem[];
}

export const StepRail: React.FC<StepRailProps> = ({ currentStep, onStepChange, steps }) => {
    return (
        <StepBadges>
            {steps.map((step, index) => (
                <StepBadge
                    key={`${step.id}-rail`}
                    type="button"
                    onClick={() => onStepChange(index)}
                    $active={index === currentStep}
                    $done={index < currentStep}
                    data-tooltip={`${step.title} - ${step.description}`}
                    aria-label={`${step.title}. ${step.description}`}
                    title={`${step.title} - ${step.description}`}
                >
                    <StepBadgeNumber $active={index === currentStep} $done={index < currentStep}>
                        {index + 1}
                    </StepBadgeNumber>
                </StepBadge>
            ))}
        </StepBadges>
    );
};
