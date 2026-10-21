import { useEffect, useState } from 'react';
import { DashboardTableModal, type DashboardColumn } from '../DashboardTableModal';
import { LinkFeature } from '../LinkFeature';

type ClienteAniversariante = {
    data: string;
    idade: string;
    nome: string;
    telefone: string;
    isHoje?: boolean;
};

interface Props {
    baseUrl: string;
}

const colunas: DashboardColumn<ClienteAniversariante>[] = [
    { key: 'data', header: 'Data', render: (cliente) => cliente.data },
    { key: 'idade', header: 'Idade', render: (cliente) => cliente.idade },
    { key: 'nome', header: 'Nome', render: (cliente) => cliente.nome },
    { key: 'telefone', header: 'Telefone', render: (cliente) => cliente.telefone },
];

export const AniversariantesCard = ({ baseUrl: _baseUrl }: Props) => {
    const [clientes, setClientes] = useState<ClienteAniversariante[]>([]);
    const [aberto, setAberto] = useState(false);

    useEffect(() => {
        setClientes([
            { data: '01/03', idade: '25', nome: 'Ana Silva', telefone: '99999-0001' },
            { data: '15/03', idade: '30', nome: 'Carlos Souza', telefone: '99999-0002', isHoje: true },
            { data: '22/03', idade: '40', nome: 'Maria Oliveira', telefone: '99999-0003' },
            { data: '28/03', idade: '35', nome: 'João Pereira', telefone: '99999-0004', isHoje: true },
        ]);
    }, []);

    const aniversariantesHoje = clientes.filter((cliente) => cliente.isHoje).length;

    return (
        <>
            <LinkFeature
                to="#"
                iconName="fa-solid fa-cake-candles"
                text="Aniversariantes do mês"
                badge={aniversariantesHoje || undefined}
                onClick={() => setAberto(true)}
            />

            {aberto ? (
                <DashboardTableModal
                    columns={colunas}
                    emptyMessage="Você não tem aniversariantes este mês."
                    iconName="fa-solid fa-cake-candles"
                    onClose={() => setAberto(false)}
                    rows={clientes}
                    title="Aniversariantes do mês"
                    width="600px"
                    getRowState={(cliente) => ({ highlighted: Boolean(cliente.isHoje) })}
                />
            ) : null}
        </>
    );
};
