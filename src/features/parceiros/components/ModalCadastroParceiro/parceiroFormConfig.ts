import type { Parceiro } from '../../types/Parceiro';

export type LookupState = 'idle' | 'loading' | 'success' | 'error';
export interface ContaBancariaItem { tipoConta: 'corrente' | 'poupanca' | ''; banco: string; agenciaDv: string; contaDv: string; titular: string; cpfCnpjTitular: string; }
export interface FornecedorFormData {
    tipoPessoa: 'f' | 'j' | 'e'; nome: string; razaoSocial: string; nomeFantasia: string; documento: string; cpf: string;
    rg: string; dataNascimento: string; dataFundacao: string; inscricaoMunicipal: string; inscricaoEstadual: string;
    nomeContato: string; telefone: string; celular: string; fax: string; site: string; email: string; skype: string; cep: string;
    tipoEndereco: string; endereco: string; numero: string; complemento: string; bairro: string; cidade: string; estado: string;
    pais: string; prazoEntrega: string; observacoes: string; produtos: Array<{ nome: string }>; transportadoras: Array<{ nome: string }>;
    contasBancarias: ContaBancariaItem[];
}

export const parceiroSteps = [
    { id: 'dados', title: 'Dados Pessoais', description: 'Dados principais conforme o tipo de pessoa.' },
    { id: 'contato', title: 'Contato', description: 'Dados do contato principal e canais de atendimento.' },
    { id: 'endereco', title: 'Endereço', description: 'Endereço completo do fornecedor.' },
    { id: 'produtos', title: 'Produtos e Entrega', description: 'Produtos, prazo de entrega e transportadoras.' },
    { id: 'bancarios', title: 'Dados Bancários', description: 'Contas bancárias para pagamento.' },
    { id: 'adicionais', title: 'Informações Adicionais', description: 'Observações internas e complementares.' },
];

export const initialParceiroFormData: FornecedorFormData = {
    tipoPessoa:'f',nome:'',razaoSocial:'',nomeFantasia:'',documento:'',cpf:'',rg:'',dataNascimento:'',dataFundacao:'',
    inscricaoMunicipal:'',inscricaoEstadual:'',nomeContato:'',telefone:'',celular:'',fax:'',site:'',email:'',skype:'',cep:'',
    tipoEndereco:'',endereco:'',numero:'',complemento:'',bairro:'',cidade:'',estado:'',pais:'Brasil',prazoEntrega:'',observacoes:'',
    produtos:[{nome:''}],transportadoras:[{nome:''}],contasBancarias:[{tipoConta:'',banco:'',agenciaDv:'',contaDv:'',titular:'',cpfCnpjTitular:''}],
};

export const parceiroFormToPayload = (formData: FornecedorFormData): Parceiro => ({
    id:Date.now(),razaoSocial:(formData.tipoPessoa==='j'?formData.razaoSocial:formData.nome).trim(),fantasia:formData.nomeFantasia.trim(),
    contato:formData.nomeContato.trim(),cnpjCpf:(formData.tipoPessoa==='f'?formData.cpf:formData.documento).trim(),rgie:formData.rg.trim(),
    telefone:formData.telefone.trim(),celular:formData.celular.trim(),fax:formData.fax.trim(),email:formData.email.trim(),site:formData.site.trim(),
    skype:formData.skype.trim(),endereco:formData.endereco.trim(),numero:formData.numero.trim(),complemento:formData.complemento.trim(),
    bairro:formData.bairro.trim(),cidade:formData.cidade.trim(),uf:formData.estado.trim(),pais:formData.pais.trim(),
    prazoEntregaProdutos:Number(formData.prazoEntrega)||0,informacoesAdicionais:formData.observacoes.trim(),tipoPessoa:formData.tipoPessoa,
    dataFundacao:formData.dataFundacao.trim(),inscMunicipal:formData.inscricaoMunicipal.trim(),inscEstadual:formData.inscricaoEstadual.trim(),
    auxImport1:JSON.stringify({produtos:formData.produtos,transportadoras:formData.transportadoras}),
    auxImport2:JSON.stringify({contasBancarias:formData.contasBancarias,dataNascimento:formData.dataNascimento}),
});
