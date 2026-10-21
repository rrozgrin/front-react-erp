import { useMemo, useState } from 'react';
import { FiCalendar, FiDatabase, FiEye, FiPlus, FiTrash2, FiUserPlus, FiUsers } from 'react-icons/fi';
import { Botao } from '../../common/components/Buttons/Botao';
import { BuscaSimples } from '../../common/components/Inputs/BuscaSimples';
import { SearchWrapper } from '../../common/components/PageLayout/styled';
import { Table, type TableField } from '../../common/components/Table';
import { ListStatusBadge, SummaryCard, WhatsappMarketingPage } from './components';
import { NewContactListModal } from './NewContactListModal';
import { contactLists, formatNumber, type ContactList } from './whatsappMarketingData';
import { FiltersCard, Grid, InlineSelect, TableName, TableToolbar, ToolbarActions } from './styled';

const normalizeText = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const listFields: TableField<ContactList>[] = [
    {
        id: 'name',
        header: 'Nome da lista',
        accessorKey: 'name',
        defaultVisible: true,
        cell: (_value, row) => (
            <TableName>
                <strong>{row.name}</strong>
                <span>{row.description}</span>
            </TableName>
        ),
    },
    {
        id: 'contacts',
        header: 'Contatos',
        accessorKey: 'contacts',
        align: 'center',
        defaultVisible: true,
        cell: (value) => formatNumber(Number(value)),
    },
    {
        id: 'createdAt',
        header: 'Criada em',
        accessorKey: 'createdAt',
        defaultVisible: true,
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        align: 'center',
        defaultVisible: true,
        cell: (value) => <ListStatusBadge status={value as ContactList['status']} />,
    },
];

export const WhatsappMarketingListasPage = () => {
    const [lists, setLists] = useState(contactLists);
    const [search, setSearch] = useState('');
    const [showNewListModal, setShowNewListModal] = useState(false);

    const filteredLists = useMemo(() => {
        const term = normalizeText(search);

        if (!term) {
            return lists;
        }

        return lists.filter((list) => normalizeText(`${list.name} ${list.description}`).includes(term));
    }, [lists, search]);

    const totalContacts = lists.reduce((total, list) => total + list.contacts, 0);

    const handleSaveList = (listName: string) => {
        setLists((currentLists) => [
            {
                id: Math.max(...currentLists.map((list) => list.id), 0) + 1,
                name: listName,
                description: 'Lista criada manualmente para campanhas de WhatsApp',
                contacts: 0,
                createdAt: new Date().toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                status: 'active',
            },
            ...currentLists,
        ]);
    };

    return (
        <>
            <WhatsappMarketingPage
                title="1º passo: Criar Lista de Contatos"
                toolbar={<Botao nome="Criar nova lista" action={() => setShowNewListModal(true)} icone={<FiPlus />} />}
            >
                <Grid $columns="repeat(3, minmax(0, 1fr))">
                    <SummaryCard label="Total de listas" value={String(lists.length)} helper="listas criadas" icon={<FiDatabase size={22} />} />
                    <SummaryCard label="Total de contatos" value={formatNumber(totalContacts)} helper="números salvos" tone="blue" icon={<FiUsers size={22} />} />
                    <SummaryCard label="Última lista criada" value={lists[0]?.name ?? '--'} helper={lists[0]?.createdAt ?? '--'} tone="green" icon={<FiCalendar size={22} />} />
                </Grid>

                <FiltersCard>
                    <TableToolbar>
                        <SearchWrapper>
                            <BuscaSimples
                                pesquisa={search}
                                onChange={setSearch}
                                placeholder="Buscar lista pelo nome..."
                            />
                        </SearchWrapper>
                        <ToolbarActions>
                            <InlineSelect aria-label="Ordenar por">
                                <option>Ordenar por</option>
                                <option>Nome da lista</option>
                                <option>Quantidade de contatos</option>
                            </InlineSelect>
                            <InlineSelect aria-label="Mais recentes">
                                <option>Mais recentes</option>
                                <option>Mais antigas</option>
                            </InlineSelect>
                        </ToolbarActions>
                    </TableToolbar>
                </FiltersCard>

                <Table
                    title="Listas de contatos"
                    description="Gerencie suas bases de telefones para campanhas de WhatsApp."
                    data={filteredLists}
                    fields={listFields}
                    showColumnSelector={false}
                    emptyMessage="Nenhuma lista encontrada."
                    rowActions={[
                        {
                            label: 'Visualizar',
                            icon: <FiEye size={16} />,
                            onClick: () => undefined,
                        },
                        {
                            label: 'Adicionar contatos',
                            icon: <FiUserPlus size={16} />,
                            variant: 'success',
                            onClick: () => undefined,
                        },
                        {
                            label: 'Excluir',
                            icon: <FiTrash2 size={16} />,
                            variant: 'danger',
                            onClick: () => undefined,
                        },
                    ]}
                />
            </WhatsappMarketingPage>

            {showNewListModal ? (
                <NewContactListModal
                    onClose={() => setShowNewListModal(false)}
                    onSave={handleSaveList}
                />
            ) : null}
        </>
    );
};
