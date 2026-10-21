import {
    useState,
} from 'react';
import styled from 'styled-components';
import {
    ModalSimple,
    ModalSimpleFooter,
    ModalSimpleFormRow,
} from '../../../../common/components/ModalSimple';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { ImageUploadGrid } from '../../../../common/components/ImageUploadGrid';
import { SegmentedControl } from '../../../../common/components/SegmentedControl';
import { Input, Select, Textarea } from '../../../../common/components/Ui';
import type { Funcionario } from '../../../../types/Funcionario';

const SectionTitle = styled.h4`
    margin: 10px 0 0;
    padding-bottom: var(--space-xs);
    border-bottom: 1px solid var(--theme-border, #d8e2ef);
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-md);
    font-weight: 500;
`;

const TwoColumns = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 45rem) {
        grid-template-columns: 1fr;
    }
`;

const ScheduleGrid = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

const ScheduleRow = styled.div`
    display: grid;
    grid-template-columns: 120px repeat(4, minmax(90px, 1fr));
    gap: var(--space-xs);
    align-items: center;
    font-size: 0.85rem;

    select {
        min-height: 32px;
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: 0.125rem;
        padding: var(--space-2xs) 6px;
    }

    @media (max-width: 760px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const days = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo', 'Feriado'];
const hourOptions = ['Selecione', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

interface ModalAddFuncionarioProps {
    initialData?: Funcionario;
    mode?: 'create' | 'edit';
    onClose: () => void;
    onSubmit: (funcionario: Funcionario) => void;
}

export const ModalAddFuncionario = ({ initialData, mode = 'create', onClose, onSubmit }: ModalAddFuncionarioProps) => {
    const [form, setForm] = useState({
        tipo: 'Normal',
        nome: initialData?.nome ?? '',
        funcao: initialData?.funcao ?? '',
        setor: initialData?.setor ?? '',
        cargo: initialData?.cargo ?? '',
        dataNascimento: initialData?.dataNascimento ?? '',
        sexo: initialData?.sexo ?? 'M' as 'M' | 'F',
        nomePai: (initialData as any)?.nomePai ?? '',
        nomeMae: (initialData as any)?.nomeMae ?? '',
        naturalidade: (initialData as any)?.naturalidade ?? '',
        nacionalidade: (initialData as any)?.nacionalidade ?? '',
        estadoCivil: (initialData as any)?.estadoCivil ?? '',
        instrucao: (initialData as any)?.instrucao ?? '',
        filhos: (initialData as any)?.filhos ?? '',
        cpf: initialData?.cpf ?? '',
        rg: (initialData as any)?.rg ?? '',
        orgaoExpedidor: (initialData as any)?.orgaoExpedidor ?? '',
        pis: (initialData as any)?.pis ?? '',
        dataAdmissao: initialData?.dataContratacao ?? '',
        dataDemissao: initialData?.dataDemissao ?? '',
        telefoneFixo: initialData?.telefoneFixo ?? '',
        celular: initialData?.celular ?? '',
        pessoaRecado1: (initialData as any)?.pessoaRecado1 ?? '',
        foneRecado1: (initialData as any)?.foneRecado1 ?? '',
        pessoaRecado2: (initialData as any)?.pessoaRecado2 ?? '',
        foneRecado2: (initialData as any)?.foneRecado2 ?? '',
        email: (initialData as any)?.email ?? '',
        cep: (initialData as any)?.cep ?? '',
        tipoEndereco: (initialData as any)?.tipoEndereco ?? '',
        endereco: (initialData as any)?.endereco ?? '',
        numero: (initialData as any)?.numero ?? '',
        complemento: (initialData as any)?.complemento ?? '',
        bairro: (initialData as any)?.bairro ?? '',
        cidade: (initialData as any)?.cidade ?? '',
        estado: (initialData as any)?.estado ?? '',
        tempoMedioAtendimento: (initialData as any)?.tempoMedioAtendimento ?? '00:10',
        antecedenciaAgendamento: (initialData as any)?.antecedenciaAgendamento ?? '01:00',
        choqueHorarios: (initialData as any)?.choqueHorarios ?? 'N',
        choqueQuantidade: (initialData as any)?.choqueQuantidade ?? '1',
        observacoes: (initialData as any)?.informacoesAdicionais ?? '',
        ativo: initialData?.ativo ?? 'A',
    });
    const [funcionarioFotos, setFuncionarioFotos] = useState<string[]>((initialData as any)?.fotos ?? []);

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = () => {
        onSubmit({
            id_funcionario: initialData?.id_funcionario ?? Date.now(),
            nome: form.nome || 'NOVO FUNCIONÁRIO',
            cpf: form.cpf,
            telefoneFixo: form.telefoneFixo,
            celular: form.celular,
            funcao: form.funcao,
            setor: form.setor,
            cargo: form.cargo,
            sexo: form.sexo,
            dataNascimento: form.dataNascimento,
            dataContratacao: form.dataAdmissao,
            dataDemissao: form.dataDemissao,
            ativo: form.ativo as Funcionario['ativo'],
            nomePai: form.nomePai,
            nomeMae: form.nomeMae,
            naturalidade: form.naturalidade,
            nacionalidade: form.nacionalidade,
            estadoCivil: form.estadoCivil,
            instrucao: form.instrucao,
            filhos: form.filhos,
            rg: form.rg,
            orgaoExpedidor: form.orgaoExpedidor,
            pis: form.pis,
            pessoaRecado1: form.pessoaRecado1,
            foneRecado1: form.foneRecado1,
            pessoaRecado2: form.pessoaRecado2,
            foneRecado2: form.foneRecado2,
            email: form.email,
            cep: form.cep,
            tipoEndereco: form.tipoEndereco,
            endereco: form.endereco,
            numero: form.numero,
            complemento: form.complemento,
            bairro: form.bairro,
            cidade: form.cidade,
            estado: form.estado,
            tempoMedioAtendimento: form.tempoMedioAtendimento,
            antecedenciaAgendamento: form.antecedenciaAgendamento,
            choqueHorarios: form.choqueHorarios,
            choqueQuantidade: form.choqueQuantidade,
            informacoesAdicionais: form.observacoes,
            fotos: funcionarioFotos,
        } as Funcionario);
        onClose();
    };

    return (
        <ModalSimple
            title={mode === 'edit' ? 'Alterar Dados do Funcionário' : 'Cadastrar Novo Funcionário'}
            subtitle="Dados do Funcionário"
            size="lg"
            onClose={onClose}
            footer={(
                <ModalSimpleFooter>
                    <Botao nome="Fechar" color="close" action={onClose} />
                    <Botao
                        nome={mode === 'edit' ? 'Salvar' : 'Salvar'}
                        color="add"
                        action={handleSubmit}
                    />
                </ModalSimpleFooter>
            )}
        >
            <ModalSimpleFormRow>
                <label>Tipo Funcionário:</label>
                <Select value={form.tipo} onChange={(event) => handleChange('tipo', event.target.value)}>
                    <option>Normal</option>
                    <option>Auxiliar</option>
                    <option>Comissionado</option>
                </Select>
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Nome:</label>
                <Input value={form.nome} onChange={(event) => handleChange('nome', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Função:</label>
                <Input value={form.funcao} onChange={(event) => handleChange('funcao', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Setor:</label>
                <Select value={form.setor} onChange={(event) => handleChange('setor', event.target.value)}>
                    <option value="">Selecione</option>
                    <option>Gestão</option>
                    <option>Vendas</option>
                    <option>Caixa</option>
                    <option>Estoque</option>
                </Select>
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Cargo:</label>
                <Select value={form.cargo} onChange={(event) => handleChange('cargo', event.target.value)}>
                    <option value="">Selecione</option>
                    <option>Master</option>
                    <option>Vendedor</option>
                    <option>Operador</option>
                    <option>Auxiliar</option>
                </Select>
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Data de Nascimento:</label>
                <Input type="date" value={form.dataNascimento} onChange={(event) => handleChange('dataNascimento', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Sexo:</label>
                <SegmentedControl
                    ariaLabel="Sexo"
                    value={form.sexo}
                    onChange={(value) => handleChange('sexo', value)}
                    options={[
                        { value: 'M', label: 'Masculino' },
                        { value: 'F', label: 'Feminino' },
                    ]}
                />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Nome do Pai:</label>
                <Input value={form.nomePai} onChange={(event) => handleChange('nomePai', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Nome da Mãe:</label>
                <Input value={form.nomeMae} onChange={(event) => handleChange('nomeMae', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Naturalidade:</label>
                <Input value={form.naturalidade} onChange={(event) => handleChange('naturalidade', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Nacionalidade:</label>
                <Input value={form.nacionalidade} onChange={(event) => handleChange('nacionalidade', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Estado Civil:</label>
                <Select value={form.estadoCivil} onChange={(event) => handleChange('estadoCivil', event.target.value)}>
                    <option value="">Selecione</option>
                    <option>Solteiro(a)</option>
                    <option>Casado(a)</option>
                    <option>Divorciado(a)</option>
                </Select>
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Instrução:</label>
                <Select value={form.instrucao} onChange={(event) => handleChange('instrucao', event.target.value)}>
                    <option value="">Selecione</option>
                    <option>Ensino Fundamental</option>
                    <option>Ensino Médio</option>
                    <option>Ensino Superior</option>
                </Select>
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Filhos:</label>
                <Input value={form.filhos} onChange={(event) => handleChange('filhos', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Situação:</label>
                <SegmentedControl
                    ariaLabel="Situacao"
                    value={form.ativo}
                    onChange={(value) => handleChange('ativo', value)}
                    options={[
                        { value: 'A', label: 'Ativo' },
                        { value: 'I', label: 'Inativo' },
                    ]}
                />
            </ModalSimpleFormRow>

            <SectionTitle>Documentos</SectionTitle>
            <ModalSimpleFormRow>
                <label>CPF:</label>
                <Input value={form.cpf} onChange={(event) => handleChange('cpf', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>RG:</label>
                <Input value={form.rg} onChange={(event) => handleChange('rg', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Orgão Expedidor:</label>
                <Input value={form.orgaoExpedidor} onChange={(event) => handleChange('orgaoExpedidor', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>PIS:</label>
                <Input value={form.pis} onChange={(event) => handleChange('pis', event.target.value)} />
            </ModalSimpleFormRow>
            <TwoColumns>
                <ModalSimpleFormRow>
                    <label>Data Admissão:</label>
                    <Input type="date" value={form.dataAdmissao} onChange={(event) => handleChange('dataAdmissao', event.target.value)} />
                </ModalSimpleFormRow>
                <ModalSimpleFormRow>
                    <label>Data Demissão:</label>
                    <Input type="date" value={form.dataDemissao} onChange={(event) => handleChange('dataDemissao', event.target.value)} />
                </ModalSimpleFormRow>
            </TwoColumns>

            <SectionTitle>Contato</SectionTitle>
            <ModalSimpleFormRow>
                <label>Telefone Fixo:</label>
                <Input value={form.telefoneFixo} onChange={(event) => handleChange('telefoneFixo', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Celular:</label>
                <Input value={form.celular} onChange={(event) => handleChange('celular', event.target.value)} />
            </ModalSimpleFormRow>
            <TwoColumns>
                <ModalSimpleFormRow>
                    <label>Pessoa Recado 1:</label>
                    <Input value={form.pessoaRecado1} onChange={(event) => handleChange('pessoaRecado1', event.target.value)} />
                </ModalSimpleFormRow>
                <ModalSimpleFormRow>
                    <label>Fone Recado 1:</label>
                    <Input value={form.foneRecado1} onChange={(event) => handleChange('foneRecado1', event.target.value)} />
                </ModalSimpleFormRow>
                <ModalSimpleFormRow>
                    <label>Pessoa Recado 2:</label>
                    <Input value={form.pessoaRecado2} onChange={(event) => handleChange('pessoaRecado2', event.target.value)} />
                </ModalSimpleFormRow>
                <ModalSimpleFormRow>
                    <label>Fone Recado 2:</label>
                    <Input value={form.foneRecado2} onChange={(event) => handleChange('foneRecado2', event.target.value)} />
                </ModalSimpleFormRow>
            </TwoColumns>
            <ModalSimpleFormRow>
                <label>Email:</label>
                <Input type="email" value={form.email} onChange={(event) => handleChange('email', event.target.value)} />
            </ModalSimpleFormRow>

            <SectionTitle>Endereço</SectionTitle>
            <ModalSimpleFormRow>
                <label>CEP:</label>
                <Input value={form.cep} onChange={(event) => handleChange('cep', event.target.value)} />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Tipo de Endereço:</label>
                <Select value={form.tipoEndereco} onChange={(event) => handleChange('tipoEndereco', event.target.value)}>
                    <option value="">Selecione</option>
                    <option>Rua</option>
                    <option>Avenida</option>
                    <option>Travessa</option>
                    <option>Rodovia</option>
                </Select>
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Endereço:</label>
                <Input value={form.endereco} onChange={(event) => handleChange('endereco', event.target.value)} />
            </ModalSimpleFormRow>
            <TwoColumns>
                <ModalSimpleFormRow>
                    <label>Número:</label>
                    <Input value={form.numero} onChange={(event) => handleChange('numero', event.target.value)} />
                </ModalSimpleFormRow>
                <ModalSimpleFormRow>
                    <label>Complemento:</label>
                    <Input value={form.complemento} onChange={(event) => handleChange('complemento', event.target.value)} />
                </ModalSimpleFormRow>
                <ModalSimpleFormRow>
                    <label>Bairro:</label>
                    <Input value={form.bairro} onChange={(event) => handleChange('bairro', event.target.value)} />
                </ModalSimpleFormRow>
                <ModalSimpleFormRow>
                    <label>Cidade:</label>
                    <Input value={form.cidade} onChange={(event) => handleChange('cidade', event.target.value)} />
                </ModalSimpleFormRow>
                <ModalSimpleFormRow>
                    <label>Estado:</label>
                    <Select value={form.estado} onChange={(event) => handleChange('estado', event.target.value)}>
                        <option value="">Selecione</option>
                        <option>PR</option>
                        <option>SP</option>
                        <option>RJ</option>
                        <option>MG</option>
                    </Select>
                </ModalSimpleFormRow>
            </TwoColumns>

            <SectionTitle>Horário de Trabalho</SectionTitle>
            <ScheduleGrid>
                {days.map((day) => (
                    <ScheduleRow key={day}>
                        <span>{day}:</span>
                        <Select>{hourOptions.map((hour) => <option key={hour}>{hour}</option>)}</Select>
                        <Select>{hourOptions.map((hour) => <option key={hour}>{hour}</option>)}</Select>
                        <Select>{hourOptions.map((hour) => <option key={hour}>{hour}</option>)}</Select>
                        <Select>{hourOptions.map((hour) => <option key={hour}>{hour}</option>)}</Select>
                    </ScheduleRow>
                ))}
            </ScheduleGrid>
            <TwoColumns>
                <ModalSimpleFormRow>
                    <label>Tempo Médio Atendimento:</label>
                    <Select value={form.tempoMedioAtendimento} onChange={(event) => handleChange('tempoMedioAtendimento', event.target.value)}>
                        <option>00:10</option>
                        <option>00:15</option>
                        <option>00:30</option>
                        <option>01:00</option>
                    </Select>
                </ModalSimpleFormRow>
                <ModalSimpleFormRow>
                    <label>Antecedência de Agendamento:</label>
                    <Select value={form.antecedenciaAgendamento} onChange={(event) => handleChange('antecedenciaAgendamento', event.target.value)}>
                        <option>00:30</option>
                        <option>01:00</option>
                        <option>02:00</option>
                    </Select>
                </ModalSimpleFormRow>
            </TwoColumns>
            <ModalSimpleFormRow>
                <label>Choque de Horários:</label>
                <SegmentedControl
                    ariaLabel="Choque de horarios"
                    value={form.choqueHorarios}
                    onChange={(value) => handleChange('choqueHorarios', value)}
                    options={[
                        { value: 'S', label: 'Sim' },
                        { value: 'N', label: 'Nao' },
                    ]}
                />
            </ModalSimpleFormRow>
            <ModalSimpleFormRow>
                <label>Choque Quantidade:</label>
                <Select value={form.choqueQuantidade} onChange={(event) => handleChange('choqueQuantidade', event.target.value)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </Select>
            </ModalSimpleFormRow>

            <SectionTitle>Informações Adicionais</SectionTitle>
            <ModalSimpleFormRow>
                <label>Observações:</label>
                <Textarea rows={5} value={form.observacoes} onChange={(event) => handleChange('observacoes', event.target.value)} />
            </ModalSimpleFormRow>
            <SectionTitle>Foto</SectionTitle>
            <ImageUploadGrid
                id="funcionario-foto"
                label="Adicionar foto"
                addLabel="Adicionar foto"
                viewerTitle="Foto do funcionario"
                value={funcionarioFotos}
                onChange={setFuncionarioFotos}
            />
        </ModalSimple>
    );
};
