import { IoBusinessOutline, IoCallOutline, IoDocumentTextOutline, IoHomeOutline, IoLocationOutline, IoMailOutline, IoPersonOutline } from 'react-icons/io5';
import { MdOutlineFax } from 'react-icons/md';
import { Field, FieldsGrid, InputShell, Label, LookupStatus, Select } from '../../../../../common/components/BaseStepModal/styled';
import { SegmentedControl, SegmentedFieldHeader, SegmentedFieldLabel } from '../../../../../common/components/SegmentedControl';
import { Input } from '../../../../../common/components/Ui';
import { formatCep, formatCpfOrCnpj, formatPhone, onlyDigits } from '../../../../../utils/brasil';
import type { Cliente, TipoPessoa } from '../../../types/Cliente';
import type { LookupState } from './formConfig';

interface Props {
    formData: Cliente;
    isCompleteMode: boolean;
    lastFetchedCnpjRef: { current: string };
    lastCnpjSourceRef: { current: string };
    cnpjLookupState: LookupState;
    cnpjMessage: string;
    cepLookupState: LookupState;
    cepMessage: string;
    onChange: (field: keyof Cliente, value: string) => void;
    onTipoPessoaChange: (tipoPessoa: TipoPessoa) => void;
    onResetCnpjLookup: () => void;
}

export const ClienteDadosPessoaisStep = ({ formData, isCompleteMode, lastFetchedCnpjRef, lastCnpjSourceRef, cnpjLookupState, cnpjMessage, cepLookupState, cepMessage, onChange: handleChange, onTipoPessoaChange: handleTipoPessoaChange, onResetCnpjLookup }: Props) => (
<>
    <Field>
        <SegmentedControl
            ariaLabel="Tipo de pessoa"
            value={formData.tipoPessoa}
            onChange={(value) => handleTipoPessoaChange(value as TipoPessoa)}
            options={[
                { value: 'f', label: 'Pessoa Física' },
                { value: 'j', label: 'Pessoa Jurídica' },
                { value: 'e', label: 'Estrangeiro' },
            ]}
        />
    </Field>

    <FieldsGrid $columns={4}>
        {formData.tipoPessoa === 'j' ? (
            <>
                <Field $span={2}>
                    <Label htmlFor="cliente-razao-social">Razao Social</Label>
                    <InputShell>
                        <IoPersonOutline size={18} />
                        <Input id="cliente-razao-social" type="text" placeholder="Ex.: Empresa Exemplo LTDA" value={formData.razao_social} onChange={(event) => handleChange('razao_social', event.target.value)} />
                    </InputShell>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-nome-fantasia">Nome Fantasia</Label>
                    <InputShell>
                        <IoBusinessOutline size={18} />
                        <Input id="cliente-nome-fantasia" type="text" placeholder="Ex.: Empresa Exemplo" value={formData.nome_fantasia} onChange={(event) => handleChange('nome_fantasia', event.target.value)} />
                    </InputShell>
                </Field>
            </>
        ) : (
            <Field $span={2}>
                <Label htmlFor="cliente-nome">Nome do cliente</Label>
                <InputShell>
                    <IoPersonOutline size={18} />
                    <Input id="cliente-nome" type="text" placeholder="Ex.: Mariana Souza" value={formData.nome} onChange={(event) => handleChange('nome', event.target.value)} />
                </InputShell>
            </Field>
        )}
        {formData.tipoPessoa !== 'e' && (
            <Field $span={2}>
                <Label htmlFor="cliente-documento">{formData.tipoPessoa === 'j' ? 'CNPJ' : 'CPF'}</Label>
                <InputShell>
                    <IoBusinessOutline size={18} />
                    <Input
                        id="cliente-documento"
                        type="text"
                        placeholder={formData.tipoPessoa === 'j' ? 'Ex.: 00.000.000/0000-00' : 'Ex.:000.000.000-00'}
                        value={formData.documento}
                        onChange={(event) => {
                            const nextDocumento = formatCpfOrCnpj(event.target.value);

                            if (lastFetchedCnpjRef.current && onlyDigits(nextDocumento) !== lastFetchedCnpjRef.current) {
                                lastFetchedCnpjRef.current = '';
                                lastCnpjSourceRef.current = '';
                                onResetCnpjLookup();
                            }

                            handleChange('documento', nextDocumento);
                        }}
                    />
                </InputShell>
                {formData.tipoPessoa === 'j' && (
                    <>
                        {cnpjMessage && <LookupStatus $status={cnpjLookupState}>{cnpjMessage}</LookupStatus>}
                    </>
                )}
            </Field>
        )}
        {formData.tipoPessoa !== 'j' && formData.tipoPessoa !== 'e' && isCompleteMode && (
            <Field>
                <Label htmlFor="cliente-rg">RG</Label>
                <InputShell>
                    <IoBusinessOutline size={18} />
                    <Input id="cliente-rg" type="text" placeholder="Ex.: DD/MM/AAAA" value={formData.rg} onChange={(event) => handleChange('rg', event.target.value)} />
                </InputShell>
            </Field>
        )}
        {formData.tipoPessoa === 'e' && (
            <Field $span={2}>
                <Label htmlFor="cliente-documento">Documento</Label>
                <InputShell>
                    <IoDocumentTextOutline size={18} />
                    <Input id="cliente-documento" type="text" placeholder="" value={formData.pais} onChange={(event) => handleChange('pais', event.target.value)} />
                </InputShell>
            </Field>
        )}

        {formData.tipoPessoa !== 'j' && isCompleteMode && (
            <>
                <Field>
                    <Label htmlFor="cliente-expedidor">Órgão Expedidor</Label>
                    <InputShell>
                        <MdOutlineFax size={18} />
                        <Input id="cliente-expedidor" type="text" placeholder="Ex.: SSP" value={formData.expedidor} onChange={(event) => handleChange('expedidor', event.target.value)} />
                    </InputShell>
                </Field>
                <Field>
                    <Label htmlFor="cliente-naturalidade">Naturalidade</Label>
                    <InputShell>
                        <IoMailOutline size={18} />
                        <Input id="cliente-naturalidade" type="text" placeholder="Ex.: SSP" value={formData.naturalidade} onChange={(event) => handleChange('naturalidade', event.target.value)} />
                    </InputShell>
                </Field>
                <Field>
                    <Label htmlFor="cliente-cnh">CNH</Label>
                    <InputShell>
                        <IoMailOutline size={18} />
                        <Input id="cliente-cnh" type="text" placeholder="Ex.: xxxxxxxxxxx" value={formData.cnh} onChange={(event) => handleChange('cnh', event.target.value)} />
                    </InputShell>
                </Field>
            </>
        )}

        <Field $span={2}>
            <Label htmlFor="cliente-email">E-mail</Label>
            <InputShell>
                <IoMailOutline size={18} />
                <Input id="cliente-email" type="email" placeholder="Ex.: cliente@empresa.com" value={formData.email} onChange={(event) => handleChange('email', event.target.value)} />
            </InputShell>
        </Field>

        {formData.tipoPessoa === 'f' && isCompleteMode && (
            <Field>
                <Label htmlFor="cliente-fax">Fax</Label>
                <InputShell>
                    <IoMailOutline size={18} />
                    <Input id="cliente-fax" type="text" placeholder="Ex.: (11) 99999-9999" value={formData.fax} onChange={(event) => handleChange('fax', formatPhone(event.target.value))} />
                </InputShell>
            </Field>
        )}

        <Field>
            <Label htmlFor="cliente-telefone">Telefone</Label>
            <InputShell>
                <IoCallOutline size={18} />
                <Input id="cliente-telefone" type="text" placeholder="Ex.: (11) 99999-9999" value={formData.telefone} onChange={(event) => handleChange('telefone', formatPhone(event.target.value))} />
            </InputShell>
        </Field>

        <Field>
            <Label htmlFor="cliente-celular">Celular</Label>
            <InputShell>
                <IoCallOutline size={18} />
                <Input id="cliente-celular" type="text" placeholder="Ex.: (11) 99999-9999" value={formData.celular} onChange={(event) => handleChange('celular', formatPhone(event.target.value))} />
            </InputShell>
        </Field>

        {formData.tipoPessoa === 'j' ? (
            <Field $span={2}>
                <Label htmlFor="cliente-data-fundacao">Data Fundacao</Label>
                <InputShell>
                    <IoBusinessOutline size={18} />
                    <Input id="cliente-data-fundacao" type="text" placeholder="Ex.: DD/MM/AAAA" value={formData.dataFundacao} onChange={(event) => handleChange('dataFundacao', event.target.value)} />
                </InputShell>
            </Field>
        ) : (
            <Field $span={2}>
                <Label htmlFor="cliente-data-nascimento">Data Nascimento</Label>
                <InputShell>
                    <IoPersonOutline size={18} />
                    <Input id="cliente-data-nascimento" type="date" value={formData.dataNascimento} onChange={(event) => handleChange('dataNascimento', event.target.value)} />
                </InputShell>
            </Field>
        )}

        {formData.tipoPessoa !== 'j' && (
            <>

                <Field $span={2}>
                    <Label htmlFor="cliente-estado-civil">Estado Civil</Label>
                    <Select id="cliente-estado-civil" value={formData.estadoCivil || ''} onChange={(event) => handleChange('estadoCivil', event.target.value)}>
                        <option value="">Selecione...</option>
                        <option value="solteiro">Solteiro(a)</option>
                        <option value="casado">Casado(a)</option>
                        <option value="divorciado">Divorciado(a)</option>
                        <option value="viuvo">Viúvo(a)</option>
                        <option value="separado">Separado(a)</option>
                        <option value="uniao_estavel">União Estável</option>
                        <option value="outro">Outro(a)</option>
                    </Select>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-inscricao-rural">Inscrição Rural</Label>
                    <InputShell>
                        <IoHomeOutline size={18} />
                        <Input id="cliente-inscricao-rural" type="text" value={formData.inscricaoRural} onChange={(event) => handleChange('inscricaoRural', event.target.value)} />
                    </InputShell>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-conjuge">Cônjuge</Label>
                    <InputShell>
                        <IoPersonOutline size={18} />
                        <Input id="cliente-conjuge" type="text" value={formData.conjuge} onChange={(event) => handleChange('conjuge', event.target.value)} />
                    </InputShell>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-tipo-residencia">Tipo de Residência</Label>
                    <InputShell>
                        <IoHomeOutline size={18} />
                        <Input id="cliente-tipo-residencia" type="text" value={formData.tipoResidencia} onChange={(event) => handleChange('tipoResidencia', event.target.value)} />
                    </InputShell>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-nome-pai">Nome do Pai</Label>
                    <InputShell>
                        <IoPersonOutline size={18} />
                        <Input id="cliente-nome-pai" type="text" placeholder="Ex.: Nome do pai..." value={formData.nomePai} onChange={(event) => handleChange('nomePai', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-telefone-pai">Telefone Pai</Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input id="cliente-telefone-pai" placeholder="Ex.: (99) 99999-9999" type="text" value={formData.telefonePai} onChange={(event) => handleChange('telefonePai', formatPhone(event.target.value))} />
                    </InputShell>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-nome-mae">Nome da Mãe</Label>
                    <InputShell>
                        <IoPersonOutline size={18} />
                        <Input id="cliente-nome-mae" type="text" placeholder="Ex.: Nome da mãe..." value={formData.nomeMae} onChange={(event) => handleChange('nomeMae', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-telefone-mae">Telefone Mãe</Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input id="cliente-telefone-mae" placeholder="Ex.: (99) 99999-9999" type="text" value={formData.telefoneMae} onChange={(event) => handleChange('telefoneMae', formatPhone(event.target.value))} />
                    </InputShell>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-titulo-eleitor">Título de Eleitor</Label>
                    <InputShell>
                        <IoDocumentTextOutline size={18} />
                        <Input id="cliente-titulo-eleitor" type="text" value={formData.tituloEleitor} onChange={(event) => handleChange('tituloEleitor', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-zona">Zona Eleitoral</Label>
                    <InputShell>
                        <IoLocationOutline size={18} />
                        <Input id="cliente-zona" type="text" value={formData.zonaEleitoral} onChange={(event) => handleChange('zonaEleitoral', event.target.value)} />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-secao">Seção</Label>
                    <InputShell>
                        <IoLocationOutline size={18} />
                        <Input id="cliente-secao" type="text" value={formData.secao} onChange={(event) => handleChange('secao', event.target.value)} />
                    </InputShell>
                </Field>

            </>
        )}

        {formData.tipoPessoa === 'j' && (
            <>
                <Field $span={2}>
                    <SegmentedFieldHeader>
                        <SegmentedFieldLabel htmlFor="cliente-porcen-iss-retido">Substituto Tributario / ISS Retido</SegmentedFieldLabel>
                        <SegmentedControl
                            ariaLabel="Substituto tributario ISS retido"
                            size="compact"
                            value={formData.issRetido === 'sim' ? 'sim' : 'nao'}
                            onChange={(value) => handleChange('issRetido' as keyof Cliente, value)}
                            options={[
                                { value: 'sim', label: 'Sim' },
                                { value: 'nao', label: 'Nao' },
                            ]}
                        />
                    </SegmentedFieldHeader>
                    {formData.issRetido === 'sim' && (
                        <InputShell>
                            <IoMailOutline size={18} />
                            <Input
                                id="cliente-porcen-iss-retido"
                                type="text"
                                placeholder="Ex.: 5%"
                                value={formData.porcentISS || ''}
                                onChange={(event) => handleChange('porcentISS' as keyof Cliente, event.target.value)}
                            />
                        </InputShell>
                    )}
                </Field>
                <Field>
                    <Label htmlFor="cliente-segmento">Inscrição SUFRAMA</Label>
                    <InputShell>
                        <IoBusinessOutline size={18} />
                        <Input id="cliente-segmento" type="text" value={formData.suframa} onChange={(event) => handleChange('suframa', event.target.value)} />
                    </InputShell>
                </Field>
                <Field>
                    <SegmentedFieldHeader>
                        <SegmentedFieldLabel htmlFor="cliente-muni">Inscrição Municipal</SegmentedFieldLabel>
                    </SegmentedFieldHeader>
                    <InputShell>
                        <IoBusinessOutline size={18} />
                        <Input id="cliente-muni" type="text" value={formData.municipal} onChange={(event) => handleChange('municipal', event.target.value)} />
                    </InputShell>
                </Field>
            </>
        )}

        <Field $span={2}>
            <SegmentedFieldHeader>
                <SegmentedFieldLabel htmlFor="cliente-ie">Inscrição Estadual</SegmentedFieldLabel>
                <SegmentedControl
                    ariaLabel="Inscrição estadual"
                    size="compact"
                    value={formData.inscricao_estadual === 'ISENTO' ? 'isento' : 'nao-isento'}
                    onChange={(value) => handleChange('inscricao_estadual', value === 'isento' ? 'ISENTO' : '')}
                    options={[
                        { value: 'isento', label: 'Isento' },
                        { value: 'nao-isento', label: 'Não isento' },
                    ]}
                />
            </SegmentedFieldHeader>
            {formData.inscricao_estadual !== 'ISENTO' && (
                <InputShell>
                    <IoMailOutline size={18} />
                    <Input
                        id="cliente-ie"
                        type="text"
                        placeholder="Ex.: 123456789"
                        value={formData.inscricao_estadual}
                        onChange={(event) => handleChange('inscricao_estadual', event.target.value)}
                    />
                </InputShell>
            )}
        </Field>

    </FieldsGrid>
    <FieldsGrid $columns={4}>
        <Field>
            <Label htmlFor="cliente-cep">CEP</Label>
            <InputShell>
                <IoLocationOutline size={18} />
                <Input id="cliente-cep" type="text" placeholder="Ex.: 41000-000" value={formData.cep} onChange={(event) => handleChange('cep', formatCep(event.target.value))} />
            </InputShell>
            {cepMessage && <LookupStatus $status={cepLookupState}>{cepMessage}</LookupStatus>}
        </Field>

        <Field>
            <Label htmlFor="cliente-tipo-endereco">Tipo de Endereço</Label>
            <InputShell>
                <IoHomeOutline size={18} />
                <Input id="cliente-tipo-endereco" type="text" placeholder="Ex.: Residencial" value={formData.tipoEndereco} onChange={(event) => handleChange('tipoEndereco', event.target.value)} />
            </InputShell>
        </Field>

        <Field $span={2}>
            <Label htmlFor="cliente-cidade">Cidade</Label>
            <InputShell>
                <IoHomeOutline size={18} />
                <Input id="cliente-cidade" type="text" placeholder="Ex.: São Paulo" value={formData.cidade} onChange={(event) => handleChange('cidade', event.target.value)} />
            </InputShell>
        </Field>

        <Field $span={2}>
            <Label htmlFor="cliente-endereco">Endereço</Label>
            <InputShell>
                <IoHomeOutline size={18} />
                <Input id="cliente-endereco" type="text" placeholder="Ex.: Rua, avenida ou travessa" value={formData.endereco} onChange={(event) => handleChange('endereco', event.target.value)} />
            </InputShell>
        </Field>

        <Field>
            <Label htmlFor="cliente-numero">Número</Label>
            <InputShell>
                <IoHomeOutline size={18} />
                <Input id="cliente-numero" type="text" placeholder="Ex.: 123" value={formData.numero} onChange={(event) => handleChange('numero', event.target.value)} />
            </InputShell>
        </Field>

        <Field>
            <Label htmlFor="cliente-bairro">Bairro</Label>
            <InputShell>
                <IoHomeOutline size={18} />
                <Input id="cliente-bairro" type="text" placeholder="Ex.: Centro" value={formData.bairro} onChange={(event) => handleChange('bairro', event.target.value)} />
            </InputShell>
        </Field>

        <Field $span={2}>
            <Label htmlFor="cliente-estado">Estado</Label>
            <InputShell>
                <IoHomeOutline size={18} />
                <Input id="cliente-estado" type="text" placeholder="Ex.: SP" value={formData.estado} onChange={(event) => handleChange('estado', event.target.value.toUpperCase().slice(0, 2))} />
            </InputShell>
        </Field>

        <Field $span={2}>
            <Label htmlFor="cliente-complemento">Complemento</Label>
            <InputShell>
                <IoHomeOutline size={18} />
                <Input id="cliente-complemento" type="text" placeholder="Ex.: Sala, bloco, referência" value={formData.complemento} onChange={(event) => handleChange('complemento', event.target.value)} />
            </InputShell>
        </Field>
    </FieldsGrid>
</>
);
