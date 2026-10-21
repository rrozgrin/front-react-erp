import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { FiEdit2, FiPauseCircle, FiPlayCircle } from 'react-icons/fi';
import { PageLayout } from '../../../../common/components/PageLayout';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { ButtonTableAction } from '../../../../common/components/Buttons/ButtonTableAction';
import { SearchWrapper } from '../../../../common/components/PageLayout/styled';
import { BuscaSimples } from '../../../../common/components/Inputs/BuscaSimples';
import { Input as UiInput, Select as UiSelect } from '../../../../common/components/Ui';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

interface ProdutoCaracteristica {
    id: number;
    nome: string;
    ativo: boolean;
}

interface ProdutoCaracteristicaValor {
    id: number;
    atributoId: number;
    valor: string;
    ativo: boolean;
}

const caracteristicasMockData: ProdutoCaracteristica[] = [
    { id: 1, nome: 'COR', ativo: true },
    { id: 2, nome: 'TAMANHO', ativo: true },
    { id: 3, nome: 'VOLTAGEM', ativo: true },
    { id: 4, nome: 'MODELO', ativo: false },
];

const valoresMockData: ProdutoCaracteristicaValor[] = [
    { id: 1, atributoId: 1, valor: 'VERDE', ativo: true },
    { id: 2, atributoId: 1, valor: 'AMARELO', ativo: true },
    { id: 3, atributoId: 1, valor: 'VERMELHO', ativo: false },
    { id: 4, atributoId: 2, valor: 'P', ativo: true },
    { id: 5, atributoId: 2, valor: 'M', ativo: true },
    { id: 6, atributoId: 2, valor: 'G', ativo: true },
    { id: 7, atributoId: 3, valor: '110V', ativo: true },
    { id: 8, atributoId: 3, valor: '220V', ativo: true },
    { id: 9, atributoId: 4, valor: 'SLIM', ativo: false },
];

const ContentStack = styled.div`
    display: grid;
    gap: var(--space-md);
`;

const InfoGrid = styled.div`
    display: grid;
    gap: var(--space-md);
    grid-template-columns: repeat(2, minmax(0, 1fr));

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const Panel = styled.section`
    background: var(--theme-surface, #ffffff);
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: var(--radius-sm);
    overflow: hidden;
`;

const PanelHeader = styled.header`
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--theme-border, #d8e2ef);
    background: linear-gradient(180deg, #fbfdff 0%, #f3f7fb 100%);

    h3 {
        margin: 0;
        font-size: 1.05rem;
        color: var(--color-main, var(--bs-primary));
    }
`;

const PanelBody = styled.div`
    padding: var(--space-md);
`;

const InstructionText = styled.div`
    color: var(--theme-text-soft, #475569);
    line-height: 1.6;

    h4 {
        margin: 0 0 10px;
        color: var(--theme-text, #0f172a);
        font-size: var(--font-size-md);
    }

    strong {
        color: var(--theme-text, #0f172a);
    }
`;

const FormGrid = styled.div`
    display: grid;
    gap: var(--space-sm);
    grid-template-columns: repeat(2, minmax(0, 1fr));

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const InputGroup = styled.div`
    display: grid;
    gap: 10px;
`;

const Select = styled(UiSelect)`
    min-height: var(--control-height-sm);
    border-radius: 0.125rem;
    padding: var(--space-xs) 10px;
`;

const Input = styled(UiInput)`
    min-height: var(--control-height-sm);
    border-radius: 0.125rem;
    padding: var(--space-xs) 10px;
    text-transform: uppercase;
`;

const GroupGrid = styled.div`
    display: grid;
    gap: var(--space-md);
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const AttributeCard = styled.article`
    min-height: 180px;
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: var(--radius-sm);
    background: var(--theme-surface, #ffffff);
    overflow: hidden;
`;

const AttributeHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xs);
    padding: 10px var(--space-sm);
    border-bottom: 1px solid var(--theme-border, #d8e2ef);
    background: #f8fbff;
    font-weight: 500;
    color: var(--theme-text, #0f172a);
`;

const AttributeActions = styled.div`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
`;

const ValuesList = styled.div`
    display: grid;
    gap: var(--space-xs);
    padding: var(--space-sm);
`;

const ValueItem = styled.div<{ $inactive?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xs);
    color: ${({ $inactive }) => ($inactive ? '#94a3b8' : '#475569')};
    font-size: 0.92rem;
`;

const EmptyMessage = styled.div`
    color: #94a3b8;
    font-size: 0.92rem;
`;

export const ProdutosCaracteristicasValoresPage: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const [pesquisa, setPesquisa] = useState('');
    const [caracteristicas, setCaracteristicas] = useState<ProdutoCaracteristica[]>(caracteristicasMockData);
    const [valores, setValores] = useState<ProdutoCaracteristicaValor[]>(valoresMockData);
    const [novaCaracteristica, setNovaCaracteristica] = useState('');
    const [atributoSelecionado, setAtributoSelecionado] = useState('');
    const [novoValor, setNovoValor] = useState('');

    const termo = pesquisa.trim().toLowerCase();

    const caracteristicasFiltradas = useMemo(() => {
        if (!termo) {
            return caracteristicas;
        }

        return caracteristicas.filter((atributo) => {
            const valoresDoAtributo = valores.filter((valor) => valor.atributoId === atributo.id);

            return (
                atributo.nome.toLowerCase().includes(termo) ||
                valoresDoAtributo.some((valor) => valor.valor.toLowerCase().includes(termo))
            );
        });
    }, [caracteristicas, termo, valores]);

    const handleAdicionarCaracteristica = () => {
        const nome = novaCaracteristica.trim().toUpperCase();

        if (!nome) {
            void Swal.fire('Campo obrigatório', 'Informe o nome da característica.', 'warning');
            return;
        }

        setCaracteristicas((current) => [
            { id: Date.now(), nome, ativo: true },
            ...current,
        ]);
        setNovaCaracteristica('');
    };

    const handleAdicionarValor = () => {
        const valor = novoValor.trim().toUpperCase();

        if (!atributoSelecionado) {
            void Swal.fire('Campo obrigatório', 'Selecione a característica.', 'warning');
            return;
        }

        if (!valor) {
            void Swal.fire('Campo obrigatório', 'Informe o valor da característica.', 'warning');
            return;
        }

        setValores((current) => [
            { id: Date.now(), atributoId: Number(atributoSelecionado), valor, ativo: true },
            ...current,
        ]);
        setNovoValor('');
    };

    const handleEditarCaracteristica = async (atributo: ProdutoCaracteristica) => {
        const result = await Swal.fire({
            title: 'Editar Característica',
            input: 'text',
            inputValue: atributo.nome,
            inputAttributes: {
                autocapitalize: 'characters',
            },
            showCancelButton: true,
            confirmButtonText: 'Alterar',
            cancelButtonText: 'Fechar',
            inputValidator: (value) => (!value.trim() ? 'Informe o nome da característica.' : undefined),
        });

        if (result.isConfirmed && result.value) {
            setCaracteristicas((current) =>
                current.map((item) =>
                    item.id === atributo.id ? { ...item, nome: result.value.trim().toUpperCase() } : item
                )
            );
        }
    };

    const handleEditarValor = async (item: ProdutoCaracteristicaValor) => {
        const result = await Swal.fire({
            title: 'Editar Valor',
            input: 'text',
            inputValue: item.valor,
            inputAttributes: {
                autocapitalize: 'characters',
            },
            showCancelButton: true,
            confirmButtonText: 'Alterar',
            cancelButtonText: 'Fechar',
            inputValidator: (value) => (!value.trim() ? 'Informe o valor.' : undefined),
        });

        if (result.isConfirmed && result.value) {
            setValores((current) =>
                current.map((valor) =>
                    valor.id === item.id ? { ...valor, valor: result.value.trim().toUpperCase() } : valor
                )
            );
        }
    };

    const handleToggleCaracteristica = async (atributo: ProdutoCaracteristica) => {
        const acao = atributo.ativo ? 'desativar' : 'ativar';
        const result = await Swal.fire({
            title: `${atributo.ativo ? 'Desativar' : 'Ativar'} Característica`,
            text: `Deseja ${acao} "${atributo.nome}"${atributo.ativo ? ' e seus valores?' : '?'}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: atributo.ativo ? 'Desativar' : 'Ativar',
            cancelButtonText: 'Fechar',
        });

        if (result.isConfirmed) {
            setCaracteristicas((current) =>
                current.map((item) => (item.id === atributo.id ? { ...item, ativo: !item.ativo } : item))
            );

            if (atributo.ativo) {
                setValores((current) =>
                    current.map((valor) =>
                        valor.atributoId === atributo.id ? { ...valor, ativo: false } : valor
                    )
                );
            }
        }
    };

    const handleToggleValor = async (item: ProdutoCaracteristicaValor) => {
        const acao = item.ativo ? 'desativar' : 'ativar';
        const result = await Swal.fire({
            title: `${item.ativo ? 'Desativar' : 'Ativar'} Valor`,
            text: `Deseja ${acao} o valor "${item.valor}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: item.ativo ? 'Desativar' : 'Ativar',
            cancelButtonText: 'Fechar',
        });

        if (result.isConfirmed) {
            setValores((current) =>
                current.map((valor) => (valor.id === item.id ? { ...valor, ativo: !valor.ativo } : valor))
            );
        }
    };

    const menuSections = useMemo(() => buildProdutosMenuSections({}), []);

    return (
        <PageLayout
            title="Características e Valores"
            sections={menuSections}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            toolbar={(
                <>
                    <SearchWrapper>
                        <BuscaSimples
                            pesquisa={pesquisa}
                            onChange={setPesquisa}
                            placeholder="Buscar característica ou valor"
                        />
                    </SearchWrapper>
                </>
            )}
        >
            <ContentStack>
                <InfoGrid>
                    <Panel>
                        <PanelHeader>
                            <h3>Instruções</h3>
                        </PanelHeader>
                        <PanelBody>
                            <InstructionText>
                                <h4>Característica</h4>
                                As características classificam os produtos dentro de uma grade.
                                Uma característica criada pode ser associada a qualquer tipo de produto.
                                <br />
                                <br />
                                <strong>Ex.</strong> COR, TAMANHO...
                            </InstructionText>
                        </PanelBody>
                    </Panel>

                    <Panel>
                        <PanelHeader>
                            <h3>Valores</h3>
                        </PanelHeader>
                        <PanelBody>
                            <InstructionText>
                                <h4>Valor</h4>
                                Os valores estão diretamente associados a uma característica.
                                <br />
                                <br />
                                <strong>Ex.</strong> Característica: COR
                                <br />
                                Valores: VERDE, AMARELO, VERMELHO
                            </InstructionText>
                        </PanelBody>
                    </Panel>
                </InfoGrid>

                <FormGrid>
                    <Panel>
                        <PanelHeader>
                            <h3>Característica</h3>
                        </PanelHeader>
                        <PanelBody>
                            <InputGroup>
                                <Botao nome="Adicionar Característica" action={handleAdicionarCaracteristica} />
                                <Input
                                    value={novaCaracteristica}
                                    onChange={(event) => setNovaCaracteristica(event.target.value.toUpperCase())}
                                    placeholder="Nome da Característica"
                                />
                            </InputGroup>
                        </PanelBody>
                    </Panel>

                    <Panel>
                        <PanelHeader>
                            <h3>Valor</h3>
                        </PanelHeader>
                        <PanelBody>
                            <InputGroup>
                                <Botao nome="Adicionar Valor" action={handleAdicionarValor} />
                                <Select
                                    value={atributoSelecionado}
                                    onChange={(event) => setAtributoSelecionado(event.target.value)}
                                >
                                    <option value="">Selecione a Característica</option>
                                    {caracteristicas
                                        .filter((item) => item.ativo)
                                        .map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.nome}
                                            </option>
                                        ))}
                                </Select>
                                <Input
                                    value={novoValor}
                                    onChange={(event) => setNovoValor(event.target.value.toUpperCase())}
                                    placeholder="Valor"
                                />
                            </InputGroup>
                        </PanelBody>
                    </Panel>
                </FormGrid>

                <Panel>
                    <PanelHeader>
                        <h3>Características e Valores</h3>
                    </PanelHeader>
                    <PanelBody>
                        <GroupGrid>
                            {caracteristicasFiltradas.map((atributo) => {
                                const valoresDoAtributo = valores.filter((item) => item.atributoId === atributo.id);

                                return (
                                    <AttributeCard key={atributo.id}>
                                        <AttributeHeader>
                                            <span>{atributo.nome}</span>
                                            <AttributeActions>
                                                {atributo.ativo && (
                                                    <ButtonTableAction
                                                        title={`Editar ${atributo.nome}`}
                                                        onClick={() => {
                                                            void handleEditarCaracteristica(atributo);
                                                        }}
                                                    >
                                                        <FiEdit2 />
                                                    </ButtonTableAction>
                                                )}

                                                <ButtonTableAction
                                                    title={`${atributo.ativo ? 'Desativar' : 'Ativar'} ${atributo.nome}`}
                                                    variant={atributo.ativo ? 'danger' : 'success'}
                                                    onClick={() => {
                                                        void handleToggleCaracteristica(atributo);
                                                    }}
                                                >
                                                    {atributo.ativo ? <FiPauseCircle /> : <FiPlayCircle />}
                                                </ButtonTableAction>
                                            </AttributeActions>
                                        </AttributeHeader>

                                        <ValuesList>
                                            {valoresDoAtributo.length ? (
                                                valoresDoAtributo.map((item) => (
                                                    <ValueItem key={item.id} $inactive={!item.ativo}>
                                                        <span>- {item.valor}</span>
                                                        {atributo.ativo && (
                                                            <AttributeActions>
                                                                <ButtonTableAction
                                                                    title={`Editar valor ${item.valor}`}
                                                                    fontSize={14}
                                                                    onClick={() => {
                                                                        void handleEditarValor(item);
                                                                    }}
                                                                >
                                                                    <FiEdit2 size={14} />
                                                                </ButtonTableAction>
                                                                <ButtonTableAction
                                                                    title={`${item.ativo ? 'Desativar' : 'Ativar'} valor ${item.valor}`}
                                                                    variant={item.ativo ? 'danger' : 'success'}
                                                                    fontSize={14}
                                                                    onClick={() => {
                                                                        void handleToggleValor(item);
                                                                    }}
                                                                >
                                                                    {item.ativo ? <FiPauseCircle size={14} /> : <FiPlayCircle size={14} />}
                                                                </ButtonTableAction>
                                                            </AttributeActions>
                                                        )}
                                                    </ValueItem>
                                                ))
                                            ) : (
                                                <EmptyMessage>Nenhum valor cadastrado.</EmptyMessage>
                                            )}
                                        </ValuesList>
                                    </AttributeCard>
                                );
                            })}
                        </GroupGrid>
                    </PanelBody>
                </Panel>
            </ContentStack>
        </PageLayout>
    );
};
