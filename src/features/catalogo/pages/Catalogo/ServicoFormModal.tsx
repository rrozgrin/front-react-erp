import { useState } from 'react';
import styled from 'styled-components';
import { ModalSimple } from '../../../../common/components/ModalSimple';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { Checkbox, Input, Radio, Select as UiSelect, Textarea as UiTextarea } from '../../../../common/components/Ui';
import { FaPlus } from 'react-icons/fa';
export interface ServicoFormValues {
    codigo: string;
    fornecedor: string;
    classificacao: string;
    unidade: string;
    nome: string;
    codigoNbs: string;
    listaServico: string;
    descricaoDetalhada: string;
    inserirPorValor: boolean;
    situacao: 'A' | 'I' | 'E';
    lojaVirtual: boolean;
    locacao: boolean;
    custo: number;
    valor: number;
    tributacaoIssqn: string;
    exigibilidadeIss: string;
    aliquotaIss: string;
}

interface ServicoFormModalProps {
    onClose: () => void;
    onSubmit: (values: ServicoFormValues) => void;
}

const Form = styled.form`
    display: grid;
    gap: 20px;
`;

const Section = styled.section`
    border-bottom: 1px solid #d8e2ef;
    padding-bottom: 18px;
    display: grid;
    gap: 14px;

    &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
    }
`;

const SectionTitle = styled.h3`
    margin: 0;
    border-left: 3px solid #000000;
    padding-left: 10px;
    color: #000000;
    font-size: var(--font-size-md);
    font-weight: 800;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--space-sm) var(--space-md);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const Field = styled.label<{ $span?: number }>`
    grid-column: span ${({ $span = 6 }) => $span};
    display: grid;
    gap: 6px;
    color: #000000;
    font-size: var(--font-size-xs);
    font-weight: 500;

    @media (max-width: 768px) {
        grid-column: span 1;
    }
`;

const Control = styled(Input)`
    min-height: 36px;
    color: #000000;
    font-weight: 400;

    &::placeholder {
        color: #6b7280;
    }
`;

const Select = styled(UiSelect)`
    min-height: 36px;
    color: #000000;
    font-weight: 400;
`;

const Textarea = styled(UiTextarea)`
    min-height: 76px;
    color: #000000;
    font-weight: 400;

    &::placeholder {
        color: #6b7280;
    }
`;

const ActionField = styled.div<{ $span?: number }>`
    grid-column: span ${({ $span = 6 }) => $span};
    display: flex;
    align-items: end;

    @media (max-width: 768px) {
        grid-column: span 1;
    }
`;

const RadioGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 14px;

    label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: #000000;
        font-weight: 400;
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    flex-wrap: wrap;
`;

const parseNumber = (value: string) => {
    const parsed = Number(value.replace(/\./g, '').replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : 0;
};

export const ServicoFormModal = ({ onClose, onSubmit }: ServicoFormModalProps) => {
    const [values, setValues] = useState({
        codigo: '',
        fornecedor: '',
        classificacao: '',
        unidade: '',
        nome: '',
        codigoNbs: '',
        listaServico: '',
        descricaoDetalhada: '',
        inserirPorValor: false,
        situacao: 'A' as 'A' | 'I' | 'E',
        lojaVirtual: false,
        locacao: false,
        custo: '',
        valor: '',
        tributacaoIssqn: '',
        exigibilidadeIss: '',
        aliquotaIss: '',
    });

    const updateValue = <TKey extends keyof typeof values>(key: TKey, value: typeof values[TKey]) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const submit = () => {
        if (!values.nome.trim()) return;

        onSubmit({
            ...values,
            custo: parseNumber(values.custo),
            valor: parseNumber(values.valor),
        });
    };

    return (
        <ModalSimple
            title="Cadastrar Novo Serviço"
            ariaLabel="Cadastrar Novo Serviço"
            size="lg"
            onClose={onClose}
            footer={(
                <Footer>
                    <Botao nome="Cancelar" color="close" action={onClose} />
                    <Botao nome="Finalizar Cadastro do Serviço" color="add" action={submit} />
                </Footer>
            )}
        >
            <Form>
                <Section>
                    <SectionTitle>Dados Básicos</SectionTitle>
                    <Grid>
                        <Field $span={5}>
                            Código de Barras
                            <Control value={values.codigo} onChange={(event) => updateValue('codigo', event.target.value)} placeholder="Digite ou gere código" />
                        </Field>
                        <ActionField $span={7}>
                            <Botao
                                nome="Gerar código automático"
                                action={() => updateValue('codigo', String(Date.now()).slice(-10))}
                            />
                        </ActionField>
                        <Field $span={5}>
                            Fornecedor
                            <Select value={values.fornecedor} onChange={(event) => updateValue('fornecedor', event.target.value)}>
                                <option value="">Selecione um fornecedor</option>
                                <option value="Interno">Interno</option>
                                <option value="Prestador Parceiro">Prestador Parceiro</option>
                            </Select>
                        </Field>
                        <ActionField $span={7}>
                            <Botao nome="Fornecedor" color="add" action={() => undefined} icone={<FaPlus />} />
                        </ActionField>
                        <Field $span={5}>
                            Classificação
                            <Select value={values.classificacao} onChange={(event) => updateValue('classificacao', event.target.value)}>
                                <option value="">Selecione uma classificação</option>
                                <option value="Manutenção">Manutenção</option>
                                <option value="Atendimento">Atendimento</option>
                                <option value="Suporte Técnico">Suporte Técnico</option>
                                <option value="Assistência Técnica">Assistência Técnica</option>
                            </Select>
                        </Field>
                        <ActionField $span={7}>
                            <Botao nome="Classificação" action={() => undefined} color="add" icone={<FaPlus />} />
                        </ActionField>
                        <Field $span={5}>
                            Unidade
                            <Select value={values.unidade} onChange={(event) => updateValue('unidade', event.target.value)}>
                                <option value="">Selecione uma unidade</option>
                                <option value="UN">UN</option>
                                <option value="H">H</option>
                                <option value="SERV">SERV</option>
                            </Select>
                        </Field>
                        <Field $span={12}>
                            Nome do Serviço *
                            <Control value={values.nome} onChange={(event) => updateValue('nome', event.target.value)} placeholder="Digite o nome do serviço" maxLength={120} />
                        </Field>
                        <Field $span={6}>
                            Código NBS
                            <Select value={values.codigoNbs} onChange={(event) => updateValue('codigoNbs', event.target.value)}>
                                <option value="">Selecione o código NBS</option>
                                <option value="1.01">1.01 - Serviços técnicos</option>
                                <option value="1.02">1.02 - Suporte e manutenção</option>
                            </Select>
                        </Field>
                        <Field $span={6}>
                            Lista de Serviços
                            <Select value={values.listaServico} onChange={(event) => updateValue('listaServico', event.target.value)}>
                                <option value="">Selecione o código do serviço</option>
                                <option value="14.01">14.01 - Lubrificação, limpeza e revisão</option>
                                <option value="17.01">17.01 - Assessoria ou consultoria</option>
                            </Select>
                        </Field>
                        <Field $span={12}>
                            Descrição Detalhada
                            <Textarea value={values.descricaoDetalhada} onChange={(event) => updateValue('descricaoDetalhada', event.target.value)} placeholder="Digite uma descrição detalhada do serviço" maxLength={2000} />
                        </Field>
                    </Grid>
                </Section>

                <Section>
                    <SectionTitle>Configurações</SectionTitle>
                    <Grid>
                        <Field $span={4}>
                            Inserir por Valor
                            <RadioGroup>
                                <label><Radio checked={values.inserirPorValor} onChange={() => updateValue('inserirPorValor', true)} /> Sim</label>
                                <label><Radio checked={!values.inserirPorValor} onChange={() => updateValue('inserirPorValor', false)} /> Não</label>
                            </RadioGroup>
                        </Field>
                        <Field $span={4}>
                            Situação
                            <RadioGroup>
                                <label><Radio checked={values.situacao === 'A'} onChange={() => updateValue('situacao', 'A')} /> Ativar</label>
                                <label><Radio checked={values.situacao === 'I'} onChange={() => updateValue('situacao', 'I')} /> Desativar</label>
                                <label><Radio checked={values.situacao === 'E'} onChange={() => updateValue('situacao', 'E')} /> Excluir</label>
                            </RadioGroup>
                        </Field>
                        <Field $span={4}>
                            Mostrar na Loja Virtual
                            <RadioGroup>
                                <label><Radio checked={values.lojaVirtual} onChange={() => updateValue('lojaVirtual', true)} /> Sim</label>
                                <label><Radio checked={!values.lojaVirtual} onChange={() => updateValue('lojaVirtual', false)} /> Não</label>
                            </RadioGroup>
                        </Field>
                        <Field $span={12}>
                            <label><Checkbox checked={values.locacao} onChange={(event) => updateValue('locacao', event.target.checked)} /> Habilitar serviço para locação</label>
                        </Field>
                    </Grid>
                </Section>

                <Section>
                    <SectionTitle>Dados Financeiros</SectionTitle>
                    <Grid>
                        <Field $span={6}>
                            Preço de Custo
                            <Control value={values.custo} onChange={(event) => updateValue('custo', event.target.value)} placeholder="0,00" />
                        </Field>
                        <Field $span={6}>
                            Preço do Serviço
                            <Control value={values.valor} onChange={(event) => updateValue('valor', event.target.value)} placeholder="0,00" />
                        </Field>
                    </Grid>
                </Section>

                <Section>
                    <SectionTitle>Impostos do Serviço</SectionTitle>
                    <Grid>
                        <Field $span={4}>
                            Tributação ISSQN
                            <Select value={values.tributacaoIssqn} onChange={(event) => updateValue('tributacaoIssqn', event.target.value)}>
                                <option value="">Selecione</option>
                                <option value="normal">Normal</option>
                                <option value="retido">Retido</option>
                            </Select>
                        </Field>
                        <Field $span={4}>
                            Exigibilidade ISS
                            <Select value={values.exigibilidadeIss} onChange={(event) => updateValue('exigibilidadeIss', event.target.value)}>
                                <option value="">Selecione</option>
                                <option value="1">Exigível</option>
                                <option value="2">Não incidência</option>
                            </Select>
                        </Field>
                        <Field $span={4}>
                            Alíquota ISS
                            <Control value={values.aliquotaIss} onChange={(event) => updateValue('aliquotaIss', event.target.value)} placeholder="0,00" />
                        </Field>
                    </Grid>
                </Section>
            </Form>
        </ModalSimple>
    );
};
