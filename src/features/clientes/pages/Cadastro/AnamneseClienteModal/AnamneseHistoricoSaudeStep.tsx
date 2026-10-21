import { Field, FieldsGrid, InputShell, Label, RadioGroup, SectionHeading, SectionLine } from '../../../../../common/components/BaseStepModal/styled';
import { Input } from '../../../../../common/components/Ui';
import { questoesSaude, type AnamneseFormData } from './anamneseConfig';

interface Props {
    formData: AnamneseFormData;
    onChange: (field: keyof AnamneseFormData, value: string) => void;
}

export const AnamneseHistoricoSaudeStep = ({ formData, onChange }: Props) => (
    <>
        <SectionHeading><span>Histórico de saúde</span><SectionLine /></SectionHeading>
        <FieldsGrid>
            {questoesSaude.map(({ campo, campoDescricao, label }) => (
                <Field key={campo}>
                    <Label htmlFor={`anamnese-${campo}`}>{label}</Label>
                    <RadioGroup>
                        <label><Input type="radio" name={campo} value="sim" checked={formData[campo] === 'sim'} onChange={(event) => onChange(campo, event.target.value)} />Sim</label>
                        <label><Input type="radio" name={campo} value="nao" checked={formData[campo] === 'nao'} onChange={(event) => onChange(campo, event.target.value)} />Não</label>
                    </RadioGroup>
                    {formData[campo] === 'sim' ? (
                        <InputShell><Input id={`anamnese-${campo}`} value={String(formData[campoDescricao] ?? '')} onChange={(event) => onChange(campoDescricao, event.target.value)} placeholder="Descreva..." /></InputShell>
                    ) : null}
                </Field>
            ))}
        </FieldsGrid>
    </>
);
