import { useState } from "react";
import {
    FiClock,
    FiFileText,
    FiList,
    FiPower,
    FiSave,
    FiShuffle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { PageLayout } from "../../../../common/components/PageLayout";
import { Botao } from "../../../../common/components/Buttons/Botao";
import { Input } from "../../../../common/components/Ui";
import { buildProdutosMenuSections } from "../shared/produtosMenuSections";
type MetodoConsumo = "FEFO" | "FIFO";

const ContentStack = styled.div`
    display: grid;
    gap: 22px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
    gap: 18px;

    @media (max-width: 920px) {
        grid-template-columns: 1fr;
    }
`;

const TwoColumns = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;

    @media (max-width: 920px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled.section`
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: 0.1875rem;
    background: var(--theme-surface, #ffffff);
    overflow: hidden;
`;

const CardHeader = styled.header`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px var(--space-md);
    border-bottom: 1px solid var(--theme-border, #d8e2ef);
    background: var(--theme-surface-muted, #f8fafc);
    color: var(--theme-text, #0f172a);
    font-weight: 500;
`;

const CardBody = styled.div`
    padding: 18px;
    display: grid;
    gap: 14px;
`;

const ToggleBox = styled.div<{ $active: boolean }>`
    border: 1px solid ${({ $active }) => ($active ? "#bbf7d0" : "#fecaca")};
    border-radius: 0.1875rem;
    background: ${({ $active }) => ($active ? "#f0fdf4" : "#fef2f2")};
    padding: 18px;
    display: grid;
    gap: 10px;
`;

const StatusBadge = styled.span<{ $active: boolean }>`
    display: inline-flex;
    align-items: center;
    padding: 5px var(--space-sm);
    border-radius: 0.1875rem;
    background: ${({ $active }) => ($active ? "#16a34a" : "#dc2626")};
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
`;

const CheckboxLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--theme-text, #0f172a);
    font-weight: 500;
`;

const HelpText = styled.p`
    margin: 0;
    color: var(--theme-text-soft, #475569);
    line-height: 1.55;
`;

const MethodOption = styled.label<{ $selected: boolean }>`
    border: 2px solid
        ${({ $selected }) => ($selected ? "var(--color-main, var(--bs-primary))" : "#d8e2ef")};
    border-radius: 0.1875rem;
    background: ${({ $selected }) => ($selected ? "var(--theme-surface-soft, #f0f7ff)" : "#ffffff")};
    padding: 14px var(--space-md);
    display: grid;
    gap: var(--space-xs);
    cursor: pointer;
`;

const MethodTitle = styled.span.attrs({ "data-app-title": true })`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--theme-text, #0f172a);
    font-weight: 500;
`;

const NumberField = styled.div`
    display: flex;
    align-items: center;
    width: 190px;

    input {
        width: 110px;
        min-height: 46px;
        border: 1px solid var(--theme-border, #cbd5e1);
        border-radius: 0.1875rem 0 0 0.1875rem;
        padding: var(--space-xs) 10px;
        text-align: center;
        font-size: 1.1rem;
        font-weight: 500;
    }

    span {
        min-height: 46px;
        display: inline-flex;
        align-items: center;
        border: 1px solid var(--theme-border, #cbd5e1);
        border-left: 0;
        border-radius: 0 0.1875rem 0.1875rem 0;
        padding: 0 var(--space-sm);
        background: #f8fafc;
        color: var(--theme-text-soft, #475569);
        font-weight: 500;
    }
`;

const SaveRow = styled.div`
    display: flex;
    justify-content: center;
`;

export const ProdutosLoteVencimentoPage = () => {
    const navigate = useNavigate();
    const [ativo, setAtivo] = useState(true);
    const [metodo, setMetodo] = useState<MetodoConsumo>("FEFO");
    const [exibirRastroXml, setExibirRastroXml] = useState(true);
    const [diasProximoVencer, setDiasProximoVencer] = useState(30);
    const [bloquearVencido, setBloquearVencido] = useState(false);

    const salvarConfiguracoes = async () => {
        if (ativo && !metodo) {
            await Swal.fire(
                "Atenção",
                "Selecione o método de consumo (FEFO ou FIFO).",
                "warning",
            );
            return;
        }

        if (diasProximoVencer < 1 || diasProximoVencer > 365) {
            await Swal.fire(
                "Atenção",
                "Informe um prazo entre 1 e 365 dias.",
                "warning",
            );
            return;
        }

        await Swal.fire(
            "Sucesso",
            ativo
                ? "Controle de Lote e Validade ativado com sucesso!"
                : "Controle de Lote e Validade desativado.",
            "success",
        );
    };

    return (
        <PageLayout
            title="Configurações de Lote e Validade"
            sections={buildProdutosMenuSections({})}
        >
            <ContentStack>
                <Grid>
                    <Card>
                        <CardHeader>
                            <FiPower />
                            Status da Funcionalidade
                            <StatusBadge $active={ativo}>
                                {ativo ? "Ativo" : "Inativo"}
                            </StatusBadge>
                        </CardHeader>
                        <CardBody>
                            <ToggleBox $active={ativo}>
                                <CheckboxLabel>
                                    <Input
                                        type="checkbox"
                                        checked={ativo}
                                        onChange={(event) =>
                                            setAtivo(event.target.checked)
                                        }
                                    />
                                    Ativar controle de Lote e Validade
                                </CheckboxLabel>
                                <HelpText>
                                    Quando ativado, o sistema registra lotes na
                                    entrada (XML ou manual) e consome
                                    automaticamente na saída.
                                </HelpText>
                            </ToggleBox>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <FiList />
                            Acesso Rápido
                        </CardHeader>
                        <CardBody>
                            <HelpText>
                                Consulte, cadastre e ajuste os lotes dos seus
                                produtos.
                            </HelpText>
                            <Botao
                                nome="Relatório de Lotes"
                                action={() =>
                                    navigate("/produtos/relatorio-lotes")
                                }
                            />
                        </CardBody>
                    </Card>
                </Grid>

                <TwoColumns>
                    <Card>
                        <CardHeader>
                            <FiShuffle />
                            Método de Consumo
                        </CardHeader>
                        <CardBody>
                            <MethodOption $selected={metodo === "FEFO"}>
                                <MethodTitle>
                                    <Input
                                        type="radio"
                                        name="metodoConsumo"
                                        checked={metodo === "FEFO"}
                                        onChange={() => setMetodo("FEFO")}
                                    />
                                    FEFO - First Expire, First Out
                                </MethodTitle>
                                <HelpText>
                                    Primeiro a vencer, primeiro a sair. Ideal
                                    para perecíveis.
                                </HelpText>
                            </MethodOption>

                            <MethodOption $selected={metodo === "FIFO"}>
                                <MethodTitle>
                                    <Input
                                        type="radio"
                                        name="metodoConsumo"
                                        checked={metodo === "FIFO"}
                                        onChange={() => setMetodo("FIFO")}
                                    />
                                    FIFO - First In, First Out
                                </MethodTitle>
                                <HelpText>
                                    Primeiro a entrar, primeiro a sair. Ideal
                                    para produtos sem validade crítica.
                                </HelpText>
                            </MethodOption>
                        </CardBody>
                    </Card>

                    <ContentStack>
                        <Card>
                            <CardHeader>
                                <FiFileText />
                                XML da NFe
                            </CardHeader>
                            <CardBody>
                                <CheckboxLabel>
                                    <Input
                                        type="checkbox"
                                        checked={exibirRastroXml}
                                        onChange={(event) =>
                                            setExibirRastroXml(
                                                event.target.checked,
                                            )
                                        }
                                    />
                                    Gerar tag &lt;rastro&gt; no XML
                                </CheckboxLabel>
                                <HelpText>
                                    Obrigatório para rastreabilidade conforme
                                    SEFAZ (Grupo I80 - NFe 4.0).
                                </HelpText>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <FiClock />
                                Alerta de Validade
                            </CardHeader>
                            <CardBody>
                                <FieldsetLabel>
                                    Dias antes do vencimento para alertar como
                                    Próx. Venc.
                                </FieldsetLabel>
                                <NumberField>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={365}
                                        value={diasProximoVencer}
                                        onChange={(event) =>
                                            setDiasProximoVencer(
                                                Number(event.target.value),
                                            )
                                        }
                                    />
                                    <span>dias</span>
                                </NumberField>
                                <HelpText>
                                    Exemplo: 30 = o lote muda de OK para Próx.
                                    Venc. 30 dias antes.
                                </HelpText>

                                <CheckboxLabel>
                                    <Input
                                        type="checkbox"
                                        checked={bloquearVencido}
                                        onChange={(event) =>
                                            setBloquearVencido(
                                                event.target.checked,
                                            )
                                        }
                                    />
                                    Bloquear consumo de lotes vencidos
                                </CheckboxLabel>
                                <HelpText>
                                    Apenas lotes válidos serão utilizados quando
                                    esta opção estiver ativa.
                                </HelpText>
                            </CardBody>
                        </Card>
                    </ContentStack>
                </TwoColumns>

                <SaveRow>
                    <Botao
                        nome="Salvar Configurações"
                        icone={<FiSave />}
                        action={() => void salvarConfiguracoes()}
                    />
                </SaveRow>
            </ContentStack>
        </PageLayout>
    );
};

const FieldsetLabel = styled.label`
    color: var(--theme-text, #0f172a);
    font-weight: 500;
`;
