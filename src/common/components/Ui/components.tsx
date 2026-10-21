import type { ReactNode } from 'react';
import {
    FormFeedback,
    FormField,
    StatusPill,
    type UiStatusTone,
} from './styled';

interface CampoFormularioProps {
    rotulo: ReactNode;
    children: ReactNode;
    obrigatorio?: boolean;
    dica?: ReactNode;
    erro?: ReactNode;
    span?: number;
}

export const CampoFormulario = ({
    rotulo,
    children,
    obrigatorio = false,
    dica,
    erro,
    span,
}: CampoFormularioProps) => (
    <FormField $span={span}>
        <span>{rotulo}{obrigatorio ? ' *' : null}</span>
        {children}
        {erro ? <FormFeedback $tone="danger">{erro}</FormFeedback> : null}
        {!erro && dica ? <small>{dica}</small> : null}
    </FormField>
);

export const FeedbackFormulario = ({
    children,
    tom = 'danger',
}: {
    children: ReactNode;
    tom?: UiStatusTone;
}) => <FormFeedback $tone={tom}>{children}</FormFeedback>;

export const IndicadorStatus = ({
    children,
    tom = 'neutral',
}: {
    children: ReactNode;
    tom?: UiStatusTone;
}) => <StatusPill $tone={tom}>{children}</StatusPill>;
