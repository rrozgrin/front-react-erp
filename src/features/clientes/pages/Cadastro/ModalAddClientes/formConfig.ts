import type { Cliente, TipoPessoa } from '../../../types/Cliente';

export type LookupState = 'idle' | 'loading' | 'success' | 'error';

export interface ClienteCadastroStep {
    id: string;
    title: string;
    description: string;
}

export const initialClienteState: Cliente = {
    id: '', nome: '', email: '', inscricao_estadual: '', telefone: '', rg: '', expedidor: '', cnh: '', naturalidade: '', fax: '', celular: '', cidade: '', segmento: '', status: 'ativo', observacoes: '', fotos: [], documento: '', endereco: '', numero: '', bairro: '', estado: '', cep: '', complemento: '', tipoPessoa: 'f', tipoEndereco: '', pais: '', nome_fantasia: '', razao_social: '', dataFundacao: '', dataNascimento: '', estadoCivil: '', issRetido: '', porcentISS: '', suframa: '', municipal: '', inscricaoRural: '', conjugeNome: '', tipoResidencia: '', nomePai: '', telefonePai: '', nomeMae: '', telefoneMae: '', tituloEleitor: '', zonaEleitoral: '', secao: '',
    referencia: [{ nome: '', telefone: '', relacao: '' }],
    trabalho: [{ empresa: '', cargo: '', renda: '', telefone: '', endereco: '' }],
    contato: [{ nome: '', celular: '', telefone: '', email: '', fax: '' }],
    socios: [{ nome: '', email: '', telefone: '', cpf: '', nascimento: '', documento: '', participacao: '', observacoes: '' }],
    vendedor: [], vinculara: [],
    veiculos: [{ marca: '', modelo: '', placa: '', cor: '', anoModelo: '', anoFabricacao: '', chassi: '', motor: '', kmAtual: '' }],
    infoAdicionais: { limiteCredito: '', taxaEntrega: '' },
};

export const buildClienteFormState = (cliente?: Cliente): Cliente => {
    if (!cliente) return initialClienteState;

    return {
        ...initialClienteState,
        ...cliente,
        referencia: cliente.referencia?.length ? cliente.referencia : initialClienteState.referencia,
        trabalho: cliente.trabalho?.length ? cliente.trabalho : initialClienteState.trabalho,
        contato: cliente.contato?.length ? cliente.contato : initialClienteState.contato,
        socios: cliente.socios?.length ? cliente.socios : initialClienteState.socios,
        vendedor: cliente.vendedor?.length ? cliente.vendedor : initialClienteState.vendedor,
        vinculara: cliente.vinculara?.length ? cliente.vinculara : initialClienteState.vinculara,
        veiculos: cliente.veiculos?.length ? cliente.veiculos : initialClienteState.veiculos,
        infoAdicionais: { ...initialClienteState.infoAdicionais, ...cliente.infoAdicionais },
    };
};

const baseCompleteSteps: ClienteCadastroStep[] = [
    { id: 'dados', title: 'Dados Pessoais', description: 'Dados principais do cliente com endereço completo.' },
    { id: 'contato', title: 'Contato', description: 'Canais e pessoa de contato para acompanhamento.' },
    { id: 'veiculo', title: 'Veículo', description: 'Dados do veículo vinculados ao cadastro.' },
    { id: 'informacoes', title: 'Informações Adicionais', description: 'Observações complementares do cliente.' },
];

export const getClienteCompleteSteps = (tipoPessoa: TipoPessoa): ClienteCadastroStep[] => (
    tipoPessoa === 'j'
        ? [baseCompleteSteps[0], { id: 'socios', title: 'Cadastro de Sócios', description: 'Informações principais dos sócios da empresa.' }, ...baseCompleteSteps.slice(1)]
        : [baseCompleteSteps[0], { id: 'referencia', title: 'Referência', description: 'Referência pessoal para o cadastro.' }, { id: 'trabalho', title: 'Trabalho', description: 'Informações profissionais do cliente.' }, ...baseCompleteSteps.slice(1)]
);

export const clienteFormToPayload = (formData: Cliente, fotos: string[]): Cliente => ({
    ...formData,
    nome: (formData.tipoPessoa === 'j' ? (formData.razao_social || formData.nome) : formData.nome).trim(),
    email: formData.email?.trim(), telefone: formData.telefone?.trim(), celular: formData.celular?.trim(),
    cidade: formData.cidade?.trim(), segmento: formData.segmento?.trim(), observacoes: formData.observacoes?.trim(),
    documento: formData.documento?.trim(), endereco: formData.endereco?.trim(), numero: formData.numero?.trim(),
    bairro: formData.bairro?.trim(), estado: formData.estado?.trim(), cep: formData.cep?.trim(), complemento: formData.complemento?.trim(),
    nome_fantasia: formData.nome_fantasia?.trim(), razao_social: formData.razao_social?.trim(),
    dataFundacao: formData.dataFundacao?.trim(), dataNascimento: formData.dataNascimento?.trim(), fotos,
    referencia: formData.referencia?.map((item) => ({ nome: item.nome?.trim(), telefone: item.telefone?.trim(), relacao: item.relacao?.trim() })),
    trabalho: formData.trabalho?.map((item) => ({ empresa: item.empresa?.trim(), cargo: item.cargo?.trim(), renda: item.renda?.trim(), telefone: item.telefone?.trim(), endereco: item.endereco?.trim() })),
    contato: formData.contato?.map((item) => ({ nome: item.nome?.trim(), telefone: item.telefone?.trim(), celular: item.celular?.trim(), email: item.email?.trim(), fax: item.fax?.trim() })),
    infoAdicionais: { limiteCredito: formData.infoAdicionais?.limiteCredito?.trim(), taxaEntrega: formData.infoAdicionais?.taxaEntrega?.trim() },
});
