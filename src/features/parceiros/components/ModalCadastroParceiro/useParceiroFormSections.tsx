import type { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { IoBusinessOutline, IoCallOutline, IoHomeOutline, IoLocationOutline, IoMailOutline, IoPersonOutline } from 'react-icons/io5';
import { MdOutlineFax } from 'react-icons/md';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { Field, FieldsGrid, InputShell, Label, LookupStatus, RepeatedBlock, SectionHeading, SectionLine, Select, Textarea } from '../../../../common/components/BaseStepModal/styled';
import { SegmentedControl, SegmentedFieldHeader, SegmentedFieldLabel } from '../../../../common/components/SegmentedControl';
import { Input } from '../../../../common/components/Ui';
import { formatCep, formatCpfOrCnpj, formatPhone } from '../../../../utils/brasil';
import type { ContaBancariaItem, FornecedorFormData, LookupState } from './parceiroFormConfig';

interface Props {
    activeStep?: string;
    formData: FornecedorFormData;
    setFormData: Dispatch<SetStateAction<FornecedorFormData>>;
    cnpjLookupState: LookupState;
    cnpjMessage: string;
    cepLookupState: LookupState;
    cepMessage: string;
    handleChange: (field: keyof FornecedorFormData, value: string) => void;
    handleTipoPessoaChange: (tipo: FornecedorFormData['tipoPessoa']) => void;
    handleProdutoChange: (index: number, value: string) => void;
    handleTransportadoraChange: (index: number, value: string) => void;
    handleContaChange: (index: number, field: keyof ContaBancariaItem, value: string) => void;
    handleObservacoesChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export const ParceiroFormSection = ({ activeStep, ...props }: Props) => {
    const { formData, setFormData, cnpjLookupState, cnpjMessage, cepLookupState, cepMessage, handleChange, handleTipoPessoaChange, handleProdutoChange, handleTransportadoraChange, handleContaChange, handleObservacoesChange } = props;
    const createContaTipoChangeHandler = (index: number): ChangeEventHandler<HTMLSelectElement> => (event) => {
        handleContaChange(index, 'tipoConta', event.target.value);
    };

    const renderDadosPessoaisStep = () => (
        <>
            <SectionHeading>
                <span>Dados Pessoais</span>
                <SectionLine />
            </SectionHeading>

            <Field>
                <Label>Pessoa</Label>
                <SegmentedControl
                    ariaLabel="Tipo de pessoa"
                    value={formData.tipoPessoa}
                    onChange={(value) => handleTipoPessoaChange(value as FornecedorFormData['tipoPessoa'])}
                    options={[
                        { value: 'f', label: 'Pessoa fisica' },
                        { value: 'j', label: 'Pessoa juridica' },
                        { value: 'e', label: 'Pessoa estrangeira' },
                    ]}
                />
            </Field>

            <FieldsGrid>
                {formData.tipoPessoa === 'j' ? (
                    <>
                        <Field>
                            <Label htmlFor="fornecedor-razao-social">Razao social</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input id="fornecedor-razao-social" type="text" value={formData.razaoSocial} onChange={(event) => handleChange('razaoSocial', event.target.value)} />
                            </InputShell>
                        </Field>

                        <Field>
                            <Label htmlFor="fornecedor-nome-fantasia">Nome fantasia</Label>
                            <InputShell>
                                <IoPersonOutline size={18} />
                                <Input id="fornecedor-nome-fantasia" type="text" value={formData.nomeFantasia} onChange={(event) => handleChange('nomeFantasia', event.target.value)} />
                            </InputShell>
                        </Field>

                        <Field>
                            <Label htmlFor="fornecedor-cnpj">CNPJ</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input
                                    id="fornecedor-cnpj"
                                    type="text"
                                    placeholder="00.000.000/0000-00"
                                    value={formData.documento}
                                    onChange={(event) => handleChange('documento', formatCpfOrCnpj(event.target.value))}
                                />
                            </InputShell>
                            {cnpjMessage && <LookupStatus $status={cnpjLookupState}>{cnpjMessage}</LookupStatus>}
                        </Field>

                        <Field>
                            <Label htmlFor="fornecedor-data-fundacao">Data fundacao</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input id="fornecedor-data-fundacao" type="text" placeholder="DD/MM/AAAA" value={formData.dataFundacao} onChange={(event) => handleChange('dataFundacao', event.target.value)} />
                            </InputShell>
                        </Field>

                        <Field>
                            <SegmentedFieldHeader>
                                <SegmentedFieldLabel htmlFor="fornecedor-inscricao-municipal">Inscricao municipal</SegmentedFieldLabel>
                            </SegmentedFieldHeader>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input id="fornecedor-inscricao-municipal" type="text" value={formData.inscricaoMunicipal} onChange={(event) => handleChange('inscricaoMunicipal', event.target.value)} />
                            </InputShell>
                        </Field>

                        <Field>
                            <SegmentedFieldHeader>
                                <SegmentedFieldLabel htmlFor="fornecedor-inscricao-estadual">Inscricao estadual</SegmentedFieldLabel>
                                <SegmentedControl
                                    ariaLabel="Inscricao estadual"
                                    size="compact"
                                    value={formData.inscricaoEstadual === 'ISENTO' ? 'isento' : 'nao-isento'}
                                    onChange={(value) => handleChange('inscricaoEstadual', value === 'isento' ? 'ISENTO' : '')}
                                    options={[
                                        { value: 'isento', label: 'Isento' },
                                        { value: 'nao-isento', label: 'Não isento' },
                                    ]}
                                />
                            </SegmentedFieldHeader>

                            {formData.inscricaoEstadual !== 'ISENTO' && (
                                <InputShell>
                                    <IoBusinessOutline size={18} />
                                    <Input
                                        id="fornecedor-inscricao-estadual"
                                        type="text"
                                        value={formData.inscricaoEstadual}
                                        onChange={(event) => handleChange('inscricaoEstadual', event.target.value)}
                                    />
                                </InputShell>
                            )}
                        </Field>
                    </>
                ) : (
                    <>
                        <Field>
                            <Label htmlFor="fornecedor-nome">Nome</Label>
                            <InputShell>
                                <IoPersonOutline size={18} />
                                <Input id="fornecedor-nome" type="text" value={formData.nome} onChange={(event) => handleChange('nome', event.target.value)} />
                            </InputShell>
                        </Field>

                        <Field>
                            <Label htmlFor={formData.tipoPessoa === 'e' ? 'fornecedor-documento' : 'fornecedor-cpf'}>{formData.tipoPessoa === 'e' ? 'Documento' : 'CPF'}</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input
                                    id={formData.tipoPessoa === 'e' ? 'fornecedor-documento' : 'fornecedor-cpf'}
                                    type="text"
                                    placeholder={formData.tipoPessoa === 'e' ? 'Documento de identificacao' : '000.000.000-00'}
                                    value={formData.tipoPessoa === 'e' ? formData.documento : formData.cpf}
                                    onChange={(event) => {
                                        if (formData.tipoPessoa === 'e') {
                                            handleChange('documento', event.target.value);
                                            return;
                                        }
                                        handleChange('cpf', formatCpfOrCnpj(event.target.value));
                                    }}
                                />
                            </InputShell>
                        </Field>

                        <Field>
                            <Label htmlFor="fornecedor-rg">RG</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input id="fornecedor-rg" type="text" value={formData.rg} onChange={(event) => handleChange('rg', event.target.value)} />
                            </InputShell>
                        </Field>

                        <Field>
                            <Label htmlFor="fornecedor-data-nascimento">Data nascimento</Label>
                            <InputShell>
                                <IoPersonOutline size={18} />
                                <Input id="fornecedor-data-nascimento" type="date" value={formData.dataNascimento} onChange={(event) => handleChange('dataNascimento', event.target.value)} />
                            </InputShell>
                        </Field>
                    </>
                )}
            </FieldsGrid>
        </>
    );

    const renderContatoStep = () => (
        <>
            <SectionHeading>
                <span>Contato</span>
                <SectionLine />
            </SectionHeading>

            <FieldsGrid>
                <Field>
                    <Label htmlFor="fornecedor-contato-nome">Nome contato</Label>
                    <InputShell>
                        <IoPersonOutline size={18} />
                        <Input id="fornecedor-contato-nome" type="text" value={formData.nomeContato} onChange={(event) => handleChange('nomeContato', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-telefone">Telefone</Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input id="fornecedor-telefone" type="text" value={formData.telefone} onChange={(event) => handleChange('telefone', formatPhone(event.target.value))} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-celular">Celular</Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input id="fornecedor-celular" type="text" value={formData.celular} onChange={(event) => handleChange('celular', formatPhone(event.target.value))} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-fax">Fax</Label>
                    <InputShell>
                        <MdOutlineFax size={18} />
                        <Input id="fornecedor-fax" type="text" value={formData.fax} onChange={(event) => handleChange('fax', formatPhone(event.target.value))} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-site">Site</Label>
                    <InputShell>
                        <IoHomeOutline size={18} />
                        <Input id="fornecedor-site" type="text" value={formData.site} onChange={(event) => handleChange('site', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-email">Email</Label>
                    <InputShell>
                        <IoMailOutline size={18} />
                        <Input id="fornecedor-email" type="email" value={formData.email} onChange={(event) => handleChange('email', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-skype">Skype</Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input id="fornecedor-skype" type="text" value={formData.skype} onChange={(event) => handleChange('skype', event.target.value)} />
                    </InputShell>
                </Field>
            </FieldsGrid>
        </>
    );

    const renderEnderecoStep = () => (
        <>
            <SectionHeading>
                <span>Endereço</span>
                <SectionLine />
            </SectionHeading>

            <FieldsGrid>
                <Field>
                    <Label htmlFor="fornecedor-cep">CEP</Label>
                    <InputShell>
                        <IoLocationOutline size={18} />
                        <Input id="fornecedor-cep" type="text" value={formData.cep} onChange={(event) => handleChange('cep', formatCep(event.target.value))} />
                    </InputShell>
                    {cepMessage && <LookupStatus $status={cepLookupState}>{cepMessage}</LookupStatus>}
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-tipo-endereco">Tipo de endereço</Label>
                    <InputShell>
                        <IoHomeOutline size={18} />
                        <Input id="fornecedor-tipo-endereco" type="text" value={formData.tipoEndereco} onChange={(event) => handleChange('tipoEndereco', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-endereco">Endereço</Label>
                    <InputShell>
                        <IoHomeOutline size={18} />
                        <Input id="fornecedor-endereco" type="text" value={formData.endereco} onChange={(event) => handleChange('endereco', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-numero">Número</Label>
                    <InputShell>
                        <IoHomeOutline size={18} />
                        <Input id="fornecedor-numero" type="text" value={formData.numero} onChange={(event) => handleChange('numero', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-complemento">Complemento</Label>
                    <InputShell>
                        <IoHomeOutline size={18} />
                        <Input id="fornecedor-complemento" type="text" value={formData.complemento} onChange={(event) => handleChange('complemento', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-bairro">Bairro</Label>
                    <InputShell>
                        <IoHomeOutline size={18} />
                        <Input id="fornecedor-bairro" type="text" value={formData.bairro} onChange={(event) => handleChange('bairro', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-cidade">Cidade</Label>
                    <InputShell>
                        <IoHomeOutline size={18} />
                        <Input id="fornecedor-cidade" type="text" value={formData.cidade} onChange={(event) => handleChange('cidade', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-estado">Estado</Label>
                    <InputShell>
                        <IoLocationOutline size={18} />
                        <Input id="fornecedor-estado" type="text" value={formData.estado} onChange={(event) => handleChange('estado', event.target.value.toUpperCase().slice(0, 2))} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="fornecedor-pais">Pais</Label>
                    <InputShell>
                        <IoLocationOutline size={18} />
                        <Input id="fornecedor-pais" type="text" value={formData.pais} onChange={(event) => handleChange('pais', event.target.value)} />
                    </InputShell>
                </Field>
            </FieldsGrid>
        </>
    );

    const renderProdutosStep = () => (
        <>
            <SectionHeading>
                <span>Produtos e Entrega</span>
                <SectionLine />
            </SectionHeading>

            {formData.produtos.map((produto, index) => (
                <RepeatedBlock key={`produto-${index}`} $compact>
                    <FieldsGrid>
                        <Field>
                            <Label htmlFor={`fornecedor-produto-${index}`}>Novo produto</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input
                                    id={`fornecedor-produto-${index}`}
                                    type="text"
                                    value={produto.nome}
                                    onChange={(event) => handleProdutoChange(index, event.target.value)}
                                />
                            </InputShell>
                        </Field>

                        {formData.produtos.length > 1 && (
                            <Field>
                                <Label>&nbsp;</Label>
                                <Botao
                                    nome="Remover produto"
                                    color="close"
                                    action={() => setFormData((prev) => ({ ...prev, produtos: prev.produtos.filter((_, i) => i !== index) }))}
                                />
                            </Field>
                        )}
                    </FieldsGrid>
                </RepeatedBlock>
            ))}

            <Botao
                nome="+ Adicionar produto"
                color="add"
                action={() => setFormData((prev) => ({ ...prev, produtos: [...prev.produtos, { nome: '' }] }))}
            />

            <FieldsGrid>
                <Field>
                    <Label htmlFor="fornecedor-prazo-entrega">Prazo de entrega</Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input
                            id="fornecedor-prazo-entrega"
                            type="number"
                            min={0}
                            placeholder="Dias"
                            value={formData.prazoEntrega}
                            onChange={(event) => handleChange('prazoEntrega', event.target.value)}
                        />
                    </InputShell>
                </Field>
            </FieldsGrid>

            {formData.transportadoras.map((transportadora, index) => (
                <RepeatedBlock key={`transportadora-${index}`} $compact>
                    <FieldsGrid>
                        <Field>
                            <Label htmlFor={`fornecedor-transportadora-${index}`}>Nova transportadora</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input
                                    id={`fornecedor-transportadora-${index}`}
                                    type="text"
                                    value={transportadora.nome}
                                    onChange={(event) => handleTransportadoraChange(index, event.target.value)}
                                />
                            </InputShell>
                        </Field>

                        {formData.transportadoras.length > 1 && (
                            <Field>
                                <Label>&nbsp;</Label>
                                <Botao
                                    nome="Remover transportadora"
                                    color="close"
                                    action={() => setFormData((prev) => ({ ...prev, transportadoras: prev.transportadoras.filter((_, i) => i !== index) }))}
                                />
                            </Field>
                        )}
                    </FieldsGrid>
                </RepeatedBlock>
            ))}

            <Botao
                nome="+ Adicionar transportadora"
                color="add"
                action={() => setFormData((prev) => ({ ...prev, transportadoras: [...prev.transportadoras, { nome: '' }] }))}
            />
        </>
    );

    const renderBancariosStep = () => (
        <>
            <SectionHeading>
                <span>Dados Bancarios</span>
                <SectionLine />
            </SectionHeading>

            {formData.contasBancarias.map((conta, index) => (
                <RepeatedBlock key={`conta-${index}`}>
                    <FieldsGrid>
                        <Field>
                            <Label htmlFor={`fornecedor-conta-tipo-${index}`}>Tipo de conta</Label>
                            <Select
                                id={`fornecedor-conta-tipo-${index}`}
                                value={conta.tipoConta}
                                onChange={createContaTipoChangeHandler(index)}
                            >
                                <option value="">Selecione...</option>
                                <option value="corrente">Corrente</option>
                                <option value="poupanca">Poupanca</option>
                            </Select>
                        </Field>

                        <Field>
                            <Label htmlFor={`fornecedor-conta-banco-${index}`}>Banco</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input id={`fornecedor-conta-banco-${index}`} type="text" value={conta.banco} onChange={(event) => handleContaChange(index, 'banco', event.target.value)} />
                            </InputShell>
                        </Field>

                        <Field>
                            <Label htmlFor={`fornecedor-conta-agencia-${index}`}>Agencia + DV</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input id={`fornecedor-conta-agencia-${index}`} type="text" value={conta.agenciaDv} onChange={(event) => handleContaChange(index, 'agenciaDv', event.target.value)} />
                            </InputShell>
                        </Field>

                        <Field>
                            <Label htmlFor={`fornecedor-conta-numero-${index}`}>Conta + DV</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input id={`fornecedor-conta-numero-${index}`} type="text" value={conta.contaDv} onChange={(event) => handleContaChange(index, 'contaDv', event.target.value)} />
                            </InputShell>
                        </Field>

                        <Field>
                            <Label htmlFor={`fornecedor-conta-titular-${index}`}>Nome titular / Razao social</Label>
                            <InputShell>
                                <IoPersonOutline size={18} />
                                <Input id={`fornecedor-conta-titular-${index}`} type="text" value={conta.titular} onChange={(event) => handleContaChange(index, 'titular', event.target.value)} />
                            </InputShell>
                        </Field>

                        <Field>
                            <Label htmlFor={`fornecedor-conta-cpf-${index}`}>CPF/CNPJ do titular</Label>
                            <InputShell>
                                <IoBusinessOutline size={18} />
                                <Input
                                    id={`fornecedor-conta-cpf-${index}`}
                                    type="text"
                                    value={conta.cpfCnpjTitular}
                                    onChange={(event) => handleContaChange(index, 'cpfCnpjTitular', formatCpfOrCnpj(event.target.value))}
                                />
                            </InputShell>
                        </Field>

                        {formData.contasBancarias.length > 1 && (
                            <Field>
                                <Label>&nbsp;</Label>
                                <Botao
                                    nome="Remover conta"
                                    color="close"
                                    action={() => setFormData((prev) => ({ ...prev, contasBancarias: prev.contasBancarias.filter((_, i) => i !== index) }))}
                                />
                            </Field>
                        )}
                    </FieldsGrid>
                </RepeatedBlock>
            ))}

            <Botao nome="+ Adicionar conta bancária" color="add" action={() => setFormData((prev) => ({
                ...prev,
                contasBancarias: [
                    ...prev.contasBancarias,
                    {
                        tipoConta: '',
                        banco: '',
                        agenciaDv: '',
                        contaDv: '',
                        titular: '',
                        cpfCnpjTitular: '',
                    },
                ],
            }))} />
        </>
    );

    const renderAdicionaisStep = () => (
        <>
            <SectionHeading>
                <span>Informações adicionais</span>
                <SectionLine />
            </SectionHeading>

            <Field>
                <Label htmlFor="fornecedor-observacoes">Observações</Label>
                <Textarea id="fornecedor-observacoes" value={formData.observacoes} onChange={handleObservacoesChange} />
            </Field>
        </>
    );


    switch (activeStep) {
        case 'dados': return renderDadosPessoaisStep();
        case 'contato': return renderContatoStep();
        case 'endereco': return renderEnderecoStep();
        case 'produtos': return renderProdutosStep();
        case 'bancarios': return renderBancariosStep();
        case 'adicionais': return renderAdicionaisStep();
        default: return null;
    }
};
