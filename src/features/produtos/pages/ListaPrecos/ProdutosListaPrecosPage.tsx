import { useMemo, useState } from 'react';
import { FiCheck, FiEdit2, FiSlash } from 'react-icons/fi';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { CadastroAuxiliarTemplate } from '../../../../common/components/Templates/CadastroAuxiliarTemplate';
import { type TableField } from '../../../../common/components/Table';
import { Input as UiInput, Select as UiSelect } from '../../../../common/components/Ui';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

interface ListaPreco {
    id: number;
    nome: string;
    ativo: boolean;
}

const listasMockData: ListaPreco[] = [
    { id: 1, nome: 'TABELA PADRÃO', ativo: true },
    { id: 2, nome: 'ATACADO', ativo: true },
    { id: 3, nome: 'CLIENTE VIP', ativo: false },
];

const FormPanel = styled.section`
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: 0.1875rem;
    background: var(--theme-surface, #ffffff);
    padding: 20px;
`;

const FormGrid = styled.form`
    display: grid;
    grid-template-columns: minmax(260px, 1fr) 220px auto;
    gap: 14px;
    align-items: end;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const Field = styled.label`
    display: grid;
    gap: var(--space-xs);
    color: var(--theme-text, #0f172a);
    font-weight: 500;
`;

const Input = styled(UiInput)`
    text-transform: uppercase;
`;

const Select = styled(UiSelect)``;

const InfoPanel = styled.section`
    border: 1px solid #bae6fd;
    border-radius: 0.1875rem;
    background: #eff6ff;
    color: #1e3a8a;
    padding: var(--space-md) 18px;
    font-size: 0.95rem;

    h3 {
        margin: 0 0 10px;
        font-size: 1.1rem;
    }

    p {
        margin: 6px 0;
    }
`;

const StatusText = styled.span<{ $active: boolean }>`
    color: ${({ $active }) => ($active ? '#166534' : '#991b1b')};
    font-weight: 500;
`;

const fields: TableField<ListaPreco>[] = [
    { id: 'nome', header: 'Nome', accessorKey: 'nome', defaultVisible: true },
    {
        id: 'ativo',
        header: 'Ativo',
        accessorKey: 'ativo',
        align: 'center',
        defaultVisible: true,
        cell: (value) => <StatusText $active={Boolean(value)}>{value ? 'Ativo' : 'Inativo'}</StatusText>,
    },
];

export const ProdutosListaPrecosPage = () => {
    const [listas, setListas] = useState<ListaPreco[]>(listasMockData);
    const [nome, setNome] = useState('');
    const [ativo, setAtivo] = useState('S');

    const nomesCadastrados = useMemo(
        () => listas.map((lista) => lista.nome.trim().toUpperCase()),
        [listas]
    );

    const adicionarLista = async () => {
        const nomeNormalizado = nome.trim().toUpperCase();

        if (!nomeNormalizado) {
            await Swal.fire('Oops...', 'O campo Nome da lista de preço não pode estar vazio.', 'error');
            return;
        }

        if (nomesCadastrados.includes(nomeNormalizado)) {
            await Swal.fire('Oops...', 'Esse nome de lista de preço já está cadastrado.', 'error');
            return;
        }

        setListas((current) => [
            ...current,
            {
                id: Math.max(0, ...current.map((lista) => lista.id)) + 1,
                nome: nomeNormalizado,
                ativo: ativo === 'S',
            },
        ]);
        setNome('');
        setAtivo('S');
    };

    const editarLista = async (lista: ListaPreco) => {
        const result = await Swal.fire<string>({
            title: 'Editar lista de preço',
            input: 'text',
            inputValue: lista.nome,
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                const nomeEditado = value.trim().toUpperCase();

                if (!nomeEditado) {
                    return 'O campo Nome da lista de preço não pode estar vazio.';
                }

                if (listas.some((item) => item.id !== lista.id && item.nome.trim().toUpperCase() === nomeEditado)) {
                    return 'Esse nome de lista de preço já está cadastrado.';
                }

                return undefined;
            },
        });

        if (!result.isConfirmed || !result.value) return;

        setListas((current) =>
            current.map((item) =>
                item.id === lista.id ? { ...item, nome: String(result.value).trim().toUpperCase() } : item
            )
        );
    };

    const alternarStatus = (lista: ListaPreco) => {
        setListas((current) =>
            current.map((item) => (item.id === lista.id ? { ...item, ativo: !item.ativo } : item))
        );
    };

    return (
        <CadastroAuxiliarTemplate
            titulo="Lista de Preços"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Listas de preços"
            descricaoTabela="Cadastre tabelas personalizadas e controle quais estão ativas."
            dados={listas}
            campos={fields}
            mensagemVazia="Nenhuma lista de preço cadastrada."
            conteudoAntesTabela={(
                <FormPanel>
                    <FormGrid
                        onSubmit={(event) => {
                            event.preventDefault();
                            void adicionarLista();
                        }}
                    >
                        <Field>
                            Nome da lista de preço:
                            <Input value={nome} onChange={(event) => setNome(event.target.value)} />
                        </Field>

                        <Field>
                            Status:
                            <Select value={ativo} onChange={(event) => setAtivo(event.target.value)}>
                                <option value="S">Ativo</option>
                                <option value="N">Inativo</option>
                            </Select>
                        </Field>

                        <Botao nome="Adicionar" action={() => void adicionarLista()} />
                    </FormGrid>
                </FormPanel>
            )}
            acoes={[
                { label: 'Inativar', icon: <FiSlash size={16} />, variant: 'danger', hidden: (lista) => !lista.ativo, onClick: alternarStatus },
                { label: 'Editar', icon: <FiEdit2 size={16} />, hidden: (lista) => !lista.ativo, onClick: (lista) => void editarLista(lista) },
                { label: 'Ativar', icon: <FiCheck size={16} />, variant: 'success', hidden: (lista) => lista.ativo, onClick: alternarStatus },
            ]}
            conteudoDepoisTabela={(
                <InfoPanel>
                    <h3>IMPORTANTE!</h3>
                    <p>Após criar as listas personalizadas, acesse cada produto e clique em "Tabela de Preço".</p>
                    <p>Selecione a lista personalizada desejada e adicione o preço ao produto.</p>
                    <p>Para produtos com variações, escolha o item/variação e adicione o preço específico.</p>
                    <p>No cadastro do cliente, selecione a lista personalizada correspondente.</p>
                </InfoPanel>
            )}
            agruparConteudo
            configurarColunas="tabela"
            impressao={false}
            exibirAcoesFlutuantes={false}
        />
    );
};
