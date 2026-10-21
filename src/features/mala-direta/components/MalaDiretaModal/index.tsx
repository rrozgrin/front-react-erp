import type { FC } from 'react';
import { ModalSimple, ModalSimpleActionButton } from '@/common/components/ModalSimple';
import {
    Card,
    Content,
    Field,
    Grid,
    Input,
    Label,
    Preview,
    Radio,
    Section,
    Select,
} from './styled';

interface MalaDiretaModalProps {
    open: boolean;
    onClose: () => void;
    onPrint: () => void;
    entidadePlural: string;
}

export const MalaDiretaModal: FC<MalaDiretaModalProps> = ({
    open,
    onClose,
    onPrint,
    entidadePlural,
}) => {
    if (!open) return null;

    return (
        <ModalSimple
            title="Gerar Etiqueta"
            onClose={onClose}
            size="md"
            footer={(
                <>
                    <ModalSimpleActionButton $variant="secondary" type="button" onClick={onClose}>Cancelar</ModalSimpleActionButton>
                    <ModalSimpleActionButton type="button" onClick={onPrint}>Imprimir</ModalSimpleActionButton>
                </>
            )}
        >
            <Content>
                <Section>
                    <Label>Tamanho da Etiqueta</Label>
                    <Card>
                        <Radio checked readOnly />
                        <Preview><span>30</span></Preview>
                        <span>Modelo Pimaco 6180</span>
                    </Card>
                </Section>

                <Section>
                    <Label>Filtro de {entidadePlural}</Label>
                    <Grid>
                        <Field>
                            <span>Cidade</span>
                            <Select><option>Todas</option></Select>
                        </Field>
                        <Field>
                            <span>UF</span>
                            <Select><option>Todos</option></Select>
                        </Field>
                    </Grid>
                </Section>

                <Section>
                    <Label>Posição da Impressão</Label>
                    <Grid>
                        <Field>
                            <span>Horizontal (X)</span>
                            <Input type="number" placeholder="0 mm" />
                        </Field>
                        <Field>
                            <span>Vertical (Y)</span>
                            <Input type="number" placeholder="0 mm" />
                        </Field>
                    </Grid>
                </Section>
            </Content>
        </ModalSimple>
    );
};
