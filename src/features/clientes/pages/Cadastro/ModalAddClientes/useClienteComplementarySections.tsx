import type { Dispatch, SetStateAction } from "react";
import {
    IoBusinessOutline,
    IoCallOutline,
    IoCarOutline,
    IoMailOutline,
    IoPersonOutline,
    IoPricetagsOutline,
} from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import {
    Field,
    FieldsGrid,
    FullWidthStepActionButton,
    InputShell,
    Label,
    RepeatedBlock,
    SectionHeading,
    SectionLine,
    Select,
    Textarea,
} from "../../../../../common/components/BaseStepModal/styled";
import { Botao } from "../../../../../common/components/Buttons/Botao";
import { Input } from "../../../../../common/components/Ui";
import { formatCpfOrCnpj, formatPhone } from "../../../../../utils/brasil";
import type { Cliente } from "../../../types/Cliente";

interface Props {
    activeStep?: string;
    formData: Cliente;
    setFormData: Dispatch<SetStateAction<Cliente>>;
    handleChange: (field: keyof Cliente, value: string) => void;
    handleReferenciaChange: (
        index: number,
        field: "nome" | "telefone" | "relacao",
        value: string,
    ) => void;
    handleTrabalhoChange: (
        index: number,
        field: "empresa" | "cargo" | "renda" | "telefone" | "endereco",
        value: string,
    ) => void;
    handleContatoChange: (
        index: number,
        field: "nome" | "telefone" | "email" | "fax" | "celular",
        value: string,
    ) => void;
}

export const ClienteComplementarySections = ({
    activeStep,
    formData,
    setFormData,
    handleChange,
    handleReferenciaChange,
    handleTrabalhoChange,
    handleContatoChange,
}: Props) => {
    const renderSociosStep = () => (
        <>
            <SectionHeading>
                <span>Cadastro de Sócios</span>
                <SectionLine />
            </SectionHeading>

            {formData.socios &&
                formData.socios.map((socio, index) => (
                    <RepeatedBlock key={index}>
                        <FieldsGrid $columns={4}>
                            <Field $span={2}>
                                <Label htmlFor={`cliente-socio-nome-${index}`}>
                                    Sócio
                                </Label>
                                <InputShell>
                                    <IoPersonOutline size={18} />
                                    <Input
                                        id={`cliente-socio-nome-${index}`}
                                        type="text"
                                        placeholder="Ex.: João Silva"
                                        value={socio.nome}
                                        onChange={(event) =>
                                            handleChangeSocio(
                                                index,
                                                "nome",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field $span={2}>
                                <Label htmlFor={`cliente-socio-email-${index}`}>
                                    E-mail do Sócio
                                </Label>
                                <InputShell>
                                    <IoBusinessOutline size={18} />
                                    <Input
                                        id={`cliente-socio-email-${index}`}
                                        type="email"
                                        placeholder="Ex.: email@dominio.com"
                                        value={socio.email}
                                        onChange={(event) =>
                                            handleChangeSocio(
                                                index,
                                                "email",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field>
                                <Label
                                    htmlFor={`cliente-socio-telefone-${index}`}
                                >
                                    Telefone do Sócio
                                </Label>
                                <InputShell>
                                    <IoBusinessOutline size={18} />
                                    <Input
                                        id={`cliente-socio-telefone-${index}`}
                                        type="text"
                                        placeholder="Ex.: (11) 99999-9999"
                                        value={socio.telefone}
                                        onChange={(event) =>
                                            handleChangeSocio(
                                                index,
                                                "telefone",
                                                formatPhone(event.target.value),
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field>
                                <Label htmlFor={`cliente-socio-cpf-${index}`}>
                                    CPF do Sócio
                                </Label>
                                <InputShell>
                                    <IoBusinessOutline size={18} />
                                    <Input
                                        id={`cliente-socio-cpf-${index}`}
                                        type="text"
                                        placeholder="Ex.: 123.456.789-00"
                                        value={socio.cpf}
                                        onChange={(event) =>
                                            handleChangeSocio(
                                                index,
                                                "cpf",
                                                formatCpfOrCnpj(
                                                    event.target.value,
                                                ),
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field $span={2}>
                                <Label
                                    htmlFor={`cliente-socio-nascimento-${index}`}
                                >
                                    Dt. Nascimento do Sócio
                                </Label>
                                <InputShell>
                                    <IoBusinessOutline size={18} />
                                    <Input
                                        id={`cliente-socio-nascimento-${index}`}
                                        type="text"
                                        placeholder="Ex.: 01/01/1990"
                                        value={socio.nascimento}
                                        onChange={(event) =>
                                            handleChangeSocio(
                                                index,
                                                "nascimento",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            {(formData.socios?.length ?? 0) > 1 && (
                                <Field>
                                    <Label>&nbsp;</Label>
                                    <FullWidthStepActionButton
                                        $variant="secondary"
                                        type="button"
                                        onClick={() => handleRemoveSocio(index)}
                                    >
                                        Remover sócio
                                    </FullWidthStepActionButton>
                                </Field>
                            )}
                        </FieldsGrid>
                    </RepeatedBlock>
                ))}
            <Botao
                nome="Adicionar outro sócio"
                color="add"
                action={() => {
                    handleAddSocio;
                }}
                icone={<FaPlus />}
            />
        </>
    );

    const handleChangeSocio = (index: number, field: string, value: string) => {
        setFormData((prev) => {
            const socios = [...(prev.socios || [])];
            socios[index] = { ...socios[index], [field]: value };
            return { ...prev, socios };
        });
    };

    const handleAddSocio = () => {
        setFormData((prev) => ({
            ...prev,
            socios: [
                ...(prev.socios || []),
                {
                    nome: "",
                    documento: "",
                    participacao: "",
                    observacoes: "",
                },
            ],
        }));
    };

    const handleRemoveSocio = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            socios: prev.socios?.filter((_, i) => i !== index) || [],
        }));
    };

    const renderReferenciaStep = () => (
        <>
            <SectionHeading>
                <span>Referência</span>
                <SectionLine />
            </SectionHeading>

            <FieldsGrid $columns={4}>
                <Field>
                    <Label htmlFor="cliente-referencia-nome">
                        Referência Comercial
                    </Label>
                    <InputShell>
                        <IoPersonOutline size={18} />
                        <Input
                            id="cliente-referencia-nome"
                            type="text"
                            placeholder="Ex.: Carlos Mendes"
                            value={formData.referencia?.[0]?.nome}
                            onChange={(event) =>
                                handleReferenciaChange(
                                    0,
                                    "nome",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-referencia-telefone">
                        Telefone
                    </Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input
                            id="cliente-referencia-telefone"
                            type="text"
                            placeholder="Ex.: (11) 99999-9999"
                            value={formData.referencia?.[0]?.telefone}
                            onChange={(event) =>
                                handleReferenciaChange(
                                    0,
                                    "telefone",
                                    formatPhone(event.target.value),
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-referencia-relacao">
                        Referência Pessoal
                    </Label>
                    <InputShell>
                        <IoPersonOutline size={18} />
                        <Input
                            id="cliente-referencia-relacao"
                            type="text"
                            placeholder="Ex.: Amigo, familiar, fornecedor"
                            value={formData.referencia?.[0]?.relacao}
                            onChange={(event) =>
                                handleReferenciaChange(
                                    0,
                                    "relacao",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-referencia-telefone">Fone</Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input
                            id="cliente-referencia-telefone"
                            type="text"
                            placeholder="Ex.: (11) 99999-9999"
                            value={formData.referencia?.[0]?.telefone}
                            onChange={(event) =>
                                handleReferenciaChange(
                                    0,
                                    "telefone",
                                    formatPhone(event.target.value),
                                )
                            }
                        />
                    </InputShell>
                </Field>
            </FieldsGrid>
        </>
    );

    const renderTrabalhoStep = () => (
        <>
            <SectionHeading>
                <span>Trabalho</span>
                <SectionLine />
            </SectionHeading>

            <FieldsGrid $columns={4}>
                <Field $span={2}>
                    <Label htmlFor="cliente-trabalho-empresa">
                        Empresa onde Trabalha
                    </Label>
                    <InputShell>
                        <IoBusinessOutline size={18} />
                        <Input
                            id="cliente-trabalho-empresa"
                            type="text"
                            placeholder="Ex.: Empresa Exemplo"
                            value={formData.trabalho?.[0]?.empresa}
                            onChange={(event) =>
                                handleTrabalhoChange(
                                    0,
                                    "empresa",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-trabalho-cargo">Cargo</Label>
                    <InputShell>
                        <IoPersonOutline size={18} />
                        <Input
                            id="cliente-trabalho-cargo"
                            type="text"
                            placeholder="Ex.: Analista"
                            value={formData.trabalho?.[0]?.cargo}
                            onChange={(event) =>
                                handleTrabalhoChange(
                                    0,
                                    "cargo",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-trabalho-renda">Renda Média</Label>
                    <InputShell>
                        <IoBusinessOutline size={18} />
                        <Input
                            id="cliente-trabalho-renda"
                            type="text"
                            placeholder="Ex.: 3500,00"
                            value={formData.trabalho?.[0]?.renda}
                            onChange={(event) =>
                                handleTrabalhoChange(
                                    0,
                                    "renda",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-trabalho-telefone">
                        Telefone da Empresa
                    </Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input
                            id="cliente-trabalho-telefone"
                            type="text"
                            placeholder="Ex.: (11) 99999-9999"
                            value={formData.trabalho?.[0]?.telefone}
                            onChange={(event) =>
                                handleTrabalhoChange(
                                    0,
                                    "telefone",
                                    formatPhone(event.target.value),
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-trabalho-endereco">
                        Endereço da Empresa
                    </Label>
                    <InputShell>
                        <IoBusinessOutline size={18} />
                        <Input
                            id="cliente-trabalho-endereco"
                            type="text"
                            placeholder="Ex.: Rua Exemplo, 123"
                            value={formData.trabalho?.[0]?.endereco}
                            onChange={(event) =>
                                handleTrabalhoChange(
                                    0,
                                    "endereco",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </Field>
            </FieldsGrid>
        </>
    );

    const renderContatoStep = () => (
        <>
            <SectionHeading>
                <span>Contato</span>
                <SectionLine />
            </SectionHeading>

            <FieldsGrid $columns={4}>
                <Field $span={2}>
                    <Label htmlFor="cliente-contato-nome">
                        Pessoa de contato
                    </Label>
                    <InputShell>
                        <IoPersonOutline size={18} />
                        <Input
                            id="cliente-contato-nome"
                            type="text"
                            placeholder="Ex.: Maria Comercial"
                            value={formData.contato?.[0]?.nome}
                            onChange={(event) =>
                                handleContatoChange(
                                    0,
                                    "nome",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-contato-celular">Celular</Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input
                            id="cliente-contato-celular"
                            type="text"
                            placeholder="Ex.: (11) 99999-9999"
                            value={formData.contato?.[0]?.celular}
                            onChange={(event) =>
                                handleContatoChange(
                                    0,
                                    "celular",
                                    formatPhone(event.target.value),
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field>
                    <Label htmlFor="cliente-contato-telefone">Telefone</Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input
                            id="cliente-contato-telefone"
                            type="text"
                            placeholder="Ex.: (11) 99999-9999"
                            value={formData.contato?.[0]?.telefone}
                            onChange={(event) =>
                                handleContatoChange(
                                    0,
                                    "telefone",
                                    formatPhone(event.target.value),
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-contato-fax">Fax</Label>
                    <InputShell>
                        <IoCallOutline size={18} />
                        <Input
                            id="cliente-contato-fax"
                            type="text"
                            placeholder="Ex.: (11) 99999-9999"
                            value={formData.contato?.[0]?.fax}
                            onChange={(event) =>
                                handleContatoChange(
                                    0,
                                    "fax",
                                    formatPhone(event.target.value),
                                )
                            }
                        />
                    </InputShell>
                </Field>

                <Field $span={2}>
                    <Label htmlFor="cliente-contato-email">E-mail</Label>
                    <InputShell>
                        <IoMailOutline size={18} />
                        <Input
                            id="cliente-contato-email"
                            type="email"
                            placeholder="Ex.: contato@empresa.com"
                            value={formData.contato?.[0]?.email}
                            onChange={(event) =>
                                handleContatoChange(
                                    0,
                                    "email",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </Field>
            </FieldsGrid>
        </>
    );

    const renderVeiculoStep = () => (
        <>
            <SectionHeading>
                <span>Veículo</span>
                <SectionLine />
            </SectionHeading>

            {formData.veiculos &&
                formData.veiculos.map((veiculo, index) => (
                    <RepeatedBlock key={index}>
                        <FieldsGrid $columns={4}>
                            <Field>
                                <Label
                                    htmlFor={`cliente-veiculo-marca-${index}`}
                                >
                                    Marca
                                </Label>
                                <InputShell>
                                    <IoCarOutline size={18} />
                                    <Input
                                        id={`cliente-veiculo-marca-${index}`}
                                        type="text"
                                        placeholder="Ex.: Fiat"
                                        value={veiculo.marca}
                                        onChange={(event) =>
                                            handleChangeVeiculo(
                                                index,
                                                "marca",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field>
                                <Label
                                    htmlFor={`cliente-veiculo-modelo-${index}`}
                                >
                                    Modelo
                                </Label>
                                <InputShell>
                                    <IoCarOutline size={18} />
                                    <Input
                                        id={`cliente-veiculo-modelo-${index}`}
                                        type="text"
                                        placeholder="Ex.: Toro"
                                        value={veiculo.modelo}
                                        onChange={(event) =>
                                            handleChangeVeiculo(
                                                index,
                                                "modelo",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field>
                                <Label
                                    htmlFor={`cliente-veiculo-placa-${index}`}
                                >
                                    Placa
                                </Label>
                                <InputShell>
                                    <IoCarOutline size={18} />
                                    <Input
                                        id={`cliente-veiculo-placa-${index}`}
                                        type="text"
                                        placeholder="Ex.: ABC1D23"
                                        value={veiculo.placa}
                                        onChange={(event) =>
                                            handleChangeVeiculo(
                                                index,
                                                "placa",
                                                event.target.value.toUpperCase(),
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field>
                                <Label
                                    htmlFor={`cliente-veiculo-ano-fabricacao-${index}`}
                                >
                                    Ano de Fabricação
                                </Label>
                                <InputShell>
                                    <IoCarOutline size={18} />
                                    <Input
                                        id={`cliente-veiculo-ano-fabricacao-${index}`}
                                        type="text"
                                        placeholder="Ex.: 2024"
                                        value={veiculo.anoFabricacao}
                                        onChange={(event) =>
                                            handleChangeVeiculo(
                                                index,
                                                "anoFabricacao",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field>
                                <Label
                                    htmlFor={`cliente-veiculo-ano-modelo-${index}`}
                                >
                                    Ano do Modelo
                                </Label>
                                <InputShell>
                                    <IoCarOutline size={18} />
                                    <Input
                                        id={`cliente-veiculo-ano-modelo-${index}`}
                                        type="text"
                                        placeholder="Ex.: 2024"
                                        value={veiculo.anoModelo}
                                        onChange={(event) =>
                                            handleChangeVeiculo(
                                                index,
                                                "anoModelo",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field>
                                <Label htmlFor={`cliente-veiculo-cor-${index}`}>
                                    Cor
                                </Label>
                                <InputShell>
                                    <IoCarOutline size={18} />
                                    <Input
                                        id={`cliente-veiculo-cor-${index}`}
                                        type="text"
                                        placeholder="Ex.: Vermelho"
                                        value={veiculo.cor}
                                        onChange={(event) =>
                                            handleChangeVeiculo(
                                                index,
                                                "cor",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field $span={2}>
                                <Label
                                    htmlFor={`cliente-veiculo-chassi-${index}`}
                                >
                                    Nº do Chassi
                                </Label>
                                <InputShell>
                                    <IoCarOutline size={18} />
                                    <Input
                                        id={`cliente-veiculo-chassi-${index}`}
                                        type="text"
                                        placeholder="Ex.: 9BWZZZ377VT004251"
                                        value={veiculo.chassi}
                                        onChange={(event) =>
                                            handleChangeVeiculo(
                                                index,
                                                "chassi",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field $span={2}>
                                <Label
                                    htmlFor={`cliente-veiculo-motor-${index}`}
                                >
                                    Nº do Motor
                                </Label>
                                <InputShell>
                                    <IoCarOutline size={18} />
                                    <Input
                                        id={`cliente-veiculo-motor-${index}`}
                                        type="text"
                                        placeholder="Ex.: 123456789"
                                        value={veiculo.motor}
                                        onChange={(event) =>
                                            handleChangeVeiculo(
                                                index,
                                                "motor",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            <Field $span={2}>
                                <Label
                                    htmlFor={`cliente-veiculo-km-atual-${index}`}
                                >
                                    KM Atual
                                </Label>
                                <InputShell>
                                    <IoCarOutline size={18} />
                                    <Input
                                        id={`cliente-veiculo-km-atual-${index}`}
                                        type="text"
                                        placeholder="Ex.: 50000"
                                        value={veiculo.kmAtual}
                                        onChange={(event) =>
                                            handleChangeVeiculo(
                                                index,
                                                "kmAtual",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </InputShell>
                            </Field>

                            {(formData.veiculos?.length ?? 0) > 1 && (
                                <Field>
                                    <Label>&nbsp;</Label>
                                    <FullWidthStepActionButton
                                        $variant="secondary"
                                        type="button"
                                        onClick={() =>
                                            handleRemoveVeiculo(index)
                                        }
                                    >
                                        Remover veículo
                                    </FullWidthStepActionButton>
                                </Field>
                            )}
                        </FieldsGrid>
                    </RepeatedBlock>
                ))}

            <Botao
                nome="Adicionar outro veículo"
                color="add"
                action={() => {
                    handleAddVeiculo;
                }}
                icone={<FaPlus />}
            />

            {/* <SectionHeading>
                <span>Vincular à</span>
                <SectionLine />
            </SectionHeading>
            {formData.vinculara && formData.vinculara.map((vinculo, index) => (
                <RepeatedBlock key={index}>
                    <FieldsGrid $columns={4}>
                        <Field $span={2}>
                            <Label htmlFor={`cliente-vinculo-tipo-${index}`}>Tipo de vínculo</Label>
                            <InputShell>
                                <IoLinkOutline size={18} />
                                <Input
                                    id={`cliente-vinculo-tipo-${index}`}
                                    type="text"
                                    placeholder="Ex.: Fornecedor, parceiro, familiar"
                                    value={vinculo.tipo}
                                    onChange={(event) => handleChangeVinculo(index, 'tipo', event.target.value)}
                                />
                            </InputShell>
                        </Field>
                    </FieldsGrid>
                </RepeatedBlock>
            ))}
            <Botao nome="Adicionar outro vínculo" color="add" action={() => { handleAddVinculo }} icone={<FaPlus />} /> */}

            <SectionHeading>
                <span>Vendedor/Atendente</span>
                <SectionLine />
            </SectionHeading>
            {/* {formData.vendedor && formData.vendedor.map((vendedor, index) => ( */}
            <FieldsGrid $columns={4}>
                <Field $span={2}>
                    {/* <Label htmlFor={`cliente-vendedor-tipo-${index}`}>Tipo de vínculo</Label> */}
                    <Select
                    // id={`cliente-vendedor-tipo-${index}`}
                    // value={vendedor.tipo}
                    // onChange={(event) => handleChangeVendedor(index, 'tipo', event.target.value)}
                    >
                        <option value="">Selecione...</option>
                        <option value="1">Julio Lima</option>
                        <option value="2">Roberta Seixas</option>
                        <option value="3">Endertein Gomes</option>
                        <option value="4">Winglidth Oliveira</option>
                    </Select>
                </Field>
            </FieldsGrid>
            {/* </div>
            ))} */}
        </>
    );

    const handleChangeVeiculo = (
        index: number,
        field: string,
        value: string,
    ) => {
        setFormData((prev) => {
            const veiculos = [...(prev.veiculos || [])];
            veiculos[index] = { ...veiculos[index], [field]: value };
            return { ...prev, veiculos };
        });
    };

    const handleAddVeiculo = () => {
        setFormData((prev) => ({
            ...prev,
            veiculos: [
                ...(prev.veiculos || []),
                {
                    marca: "",
                    modelo: "",
                    placa: "",
                    anoFabricacao: "",
                    anoModelo: "",
                    cor: "",
                    chassi: "",
                    motor: "",
                    kmAtual: "",
                },
            ],
        }));
    };

    const handleRemoveVeiculo = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            veiculos: prev.veiculos?.filter((_, i) => i !== index) || [],
        }));
    };

    const handleInfoAdicionaisChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            infoAdicionais: {
                ...prev.infoAdicionais,
                [field]: value,
            },
        }));
    };

    const renderInformacoesStep = () => (
        <>
            <SectionHeading>
                <span>Informações Adicionais</span>
                <SectionLine />
            </SectionHeading>

            <Field>
                <Label htmlFor="cliente-observacoes">Observações</Label>
                <Textarea
                    id="cliente-observacoes"
                    placeholder="Anotações internas do cadastro"
                    value={formData.observacoes}
                    onChange={(event) =>
                        handleChange("observacoes", event.target.value)
                    }
                />
            </Field>
            <FieldsGrid $columns={4}>
                <Field $span={2}>
                    <Label htmlFor="cliente-tags">Limite de Crédito</Label>
                    <InputShell>
                        <IoPricetagsOutline size={18} />
                        <Input
                            id="cliente-tags"
                            type="text"
                            placeholder="Ex.: R$ 1.000,00"
                            value={formData.infoAdicionais?.limiteCredito}
                            onChange={(event) =>
                                handleInfoAdicionaisChange(
                                    "limiteCredito",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </Field>
                <Field $span={2}>
                    <Label htmlFor="cliente-tags">Taxa de Entrega</Label>
                    <InputShell>
                        <IoPricetagsOutline size={18} />
                        <Input
                            id="cliente-tags"
                            type="text"
                            placeholder="Ex.: R$ 15,00"
                            value={formData.infoAdicionais?.taxaEntrega}
                            onChange={(event) =>
                                handleInfoAdicionaisChange(
                                    "taxaEntrega",
                                    event.target.value,
                                )
                            }
                        />
                    </InputShell>
                </Field>
                <Field>
                    <Label htmlFor="cliente-tags">Lista de Preços</Label>
                    <Select>
                        <option value="">Selecione...</option>
                        <option value="1">Bronze</option>
                        <option value="2">Prata</option>
                        <option value="3">Ouro</option>
                    </Select>
                </Field>

                <Field>
                    <Label htmlFor="cliente-tags">Tipos de Desconto</Label>
                    <Select>
                        <option value="">Selecione...</option>
                        <option value="1">Bronze</option>
                        <option value="2">Prata</option>
                        <option value="3">Ouro</option>
                    </Select>
                </Field>
                <Field $span={2}>
                    <Label htmlFor="cliente-tags">CFPS</Label>
                    <Select>
                        <option value="">Selecione...</option>
                        <option value="1">Bronze</option>
                        <option value="2">Prata</option>
                        <option value="3">Ouro</option>
                    </Select>
                </Field>
            </FieldsGrid>
        </>
    );

    switch (activeStep) {
        case "socios": return renderSociosStep();
        case "referencia": return renderReferenciaStep();
        case "trabalho": return renderTrabalhoStep();
        case "contato": return renderContatoStep();
        case "veiculo": return renderVeiculoStep();
        case "informacoes": return renderInformacoesStep();
        default: return null;
    }
};
