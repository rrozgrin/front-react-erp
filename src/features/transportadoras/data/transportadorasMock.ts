import type { Transportadoras } from '../types/Transportadoras';

export const transportadorasMockData: Transportadoras[] = [
    { id: 1, razaoSocial: 'Mariana Souza', email: 'mariana@lojadomix.com', telefone: '(11) 99871-2001', cidade: 'São Paulo', tipoPessoa: 'f', ativo: true },
    { id: 2, razaoSocial: 'Carlos Henrique', email: 'carlos@constrular.com', telefone: '(21) 98765-1122', cidade: 'Rio de Janeiro', tipoPessoa: 'f', ativo: true },
    { id: 3, razaoSocial: 'Fernanda Lima', email: 'fernanda@petluar.com', telefone: '(31) 99123-0045', cidade: 'Belo Horizonte', tipoPessoa: 'f', ativo: false },
    { id: 4, razaoSocial: 'Rafael Gomes', email: 'rafael@fastcell.com', telefone: '(41) 98888-9090', cidade: 'Curitiba', tipoPessoa: 'j', ativo: false },
    { id: 5, razaoSocial: 'Juliana Prado', email: 'juliana@casabello.com', telefone: '(71) 97777-8181', cidade: 'Salvador', tipoPessoa: 'f', ativo: true },
    { id: 6, razaoSocial: 'Eduardo Nunes', email: 'eduardo@agrovale.com', telefone: '(62) 96666-4500', cidade: 'Goiania', tipoPessoa: 'f', ativo: true },
];

export const transportadorasExcluidosMockData = transportadorasMockData.filter((transportadora) => transportadora.ativo === false);
