import { useRef, useState } from "react";
import { FloatingActions } from "../../../../common/components/Buttons/FloatingActions";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { Cliente } from "../../types/Cliente";
import { PiAddressBookBold } from "react-icons/pi";
import { FaTrash, FaPen } from "react-icons/fa";
import { Botao } from "../../../../common/components/Buttons/Botao";
import { NovaOcorrenciaModal } from "./NovaOcorrenciaModal";
import { ClienteDetalhePageLayout } from "../shared/ClienteDetalhePageLayout";
const Card = styled.div`
    border-radius: 0.1875rem;
    border: 1px solid var(--theme-border, #e5e7eb);
    background: var(--theme-surface, #fff);
    box-shadow: var(--shadow-panel, 0 2px 8px rgba(15, 23, 42, 0.04));
    margin-bottom: var(--space-2xl);
    padding: 0;
    overflow: hidden;
`;

const CardSection = styled.div`
    padding: var(--space-2xl) var(--space-2xl) var(--space-md);
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: var(--space-3xl);
    border-bottom: 1px solid var(--theme-border, #f1f5f9);
`;

const CardTitle = styled.h2`
    font-size: var(--font-size-xs);
    font-weight: 500;
    margin: 0 0 var(--space-xl);
    color: #000;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
`;

const ClientCardTitle = styled.h5`
    font-size: var(--font-size-xs);
    font-weight: 500;
    padding: var(--space-2xl) var(--space-2xl) 0;
    margin: 0;
    color: #000;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
    font-size: var(--font-size-sm);
    span.label {
        color: #000;
        font-size: var(--font-size-xs);
        font-weight: 500;
        letter-spacing: 0.04em;
    }
    span.value {
        color: var(--theme-text, #0f172a);
        font-weight: 500;
        font-size: var(--font-size-xs);
        word-break: break-all;
    }
`;

const StatusBadge = styled.span`
    background: var(--status-success-bg, #e6f9ed);
    color: var(--status-success, #1a7f37);
    font-size: var(--font-size-xs);
    font-weight: 500;
    border-radius: var(--radius-pill);
    padding: var(--space-2xs) var(--space-md);
    margin-left: var(--space-sm);
    display: inline-block;
`;

const ClientAvatarWrap = styled.div`
    min-width: 7.5rem; /* 120px */
    text-align: center;
    margin-right: var(--space-3xl);
`;

const ClientAvatar = styled.div`
    width: 4rem; /* 64px */
    height: 4rem; /* 64px */
    border-radius: var(--radius-pill);
    background: var(--theme-surface-muted, #e5e7eb);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-xs);
    font-weight: 500;
    color: #000;
    margin: 0 auto var(--space-sm);
`;

const OcorrenciasBlock = styled.div`
    padding: var(--space-2xl);
    position: relative;
    background: var(--theme-surface-soft, #f9fafb);
    border-radius: 0.1875rem;
    box-shadow: var(--shadow-panel, 0 1px 4px rgba(15, 23, 42, 0.06));
    margin-bottom: var(--space-2xl);
    transition:
        box-shadow 0.2s,
        background 0.2s;
    &:hover {
        background: var(--theme-surface-muted, #f3f6fa);
        box-shadow: var(
            --shadow-panel-strong,
            0 4px 16px rgba(15, 23, 42, 0.1)
        );
    }
`;

const OcorrenciaProtocoloRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-md);
`;

const OcorrenciaProtocolo = styled.div`
    font-size: var(--font-size-xs);
    font-weight: 500;
    color: #000;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    span {
        font-size: var(--font-size-sm);
        color: var(--theme-text-soft, #64748b);
        font-weight: 400;
        margin-right: var(--space-sm);
    }
`;

const TrashButton = styled(FaTrash)`
    cursor: pointer;
    color: #000;
    transition:
        color 0.2s,
        transform 0.2s;
    &:hover {
        color: #e11d48;
        transform: scale(1.15);
    }
`;

const OcorrenciaInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md) var(--space-3xl);
    margin-bottom: var(--space-sm);
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const OcorrenciaRow = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: var(--font-size-xs);
    color: #000;
    margin-bottom: var(--space-2xs);
    svg {
        color: #000;
        font-size: 1.1em;
    }
    span.label {
        font-weight: 500;
        color: #000;
        min-width: 5rem; /* 80px */
        display: inline-block;
    }
`;

const ocorrenciasMock = [
    {
        protocolo: "689348",
        data: "20/05/2026 16:35",
        tipo: "Administrativo",
        atendente: "FUNCIONARIO MASTER",
        descricao: "testando a ocorrencia",
    },
];

const PrintBlock = styled.div`
    background: var(--theme-surface, #fff);
    border-radius: 0.1875rem;
    box-shadow: var(--shadow-panel, 0 2px 8px rgba(15, 23, 42, 0.04));
    margin-bottom: var(--space-2xl);
    padding: 0;
    overflow: hidden;
`;

const OccurrenceDivider = styled.div`
    border-bottom: 1px solid var(--theme-border, #e5e7eb);
    margin: 0 calc(var(--space-2xl) * -1) var(--space-lg);
    height: 0;
`;

interface LocationState {
    cliente?: Cliente;
}

export default function OcorrenciasPage() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const cliente = state?.cliente;
    const nomeCliente = cliente?.nome ?? `Cliente ${id} `;
    const printRef = useRef<HTMLDivElement>(null);
    const [ocorrencias, setOcorrencias] = useState(ocorrenciasMock);
    const [ocorrenciaModal, setOcorrenciaModal] = useState(false);

    function handleExcluir(protocolo: string) {
        setOcorrencias((prev) =>
            prev.filter((oc) => oc.protocolo !== protocolo),
        );
    }
    function handleRegistrarOcorrencia(ocorrencia: any) {
        setOcorrencias((prev) => [
            {
                protocolo: ocorrencia.protocolo,
                data: ocorrencia.data,
                tipo: ocorrencia.tipo,
                atendente: ocorrencia.atendente,
                descricao: ocorrencia.descricao,
            },
            ...prev,
        ]);
    }

    return (
        <ClienteDetalhePageLayout
            clienteId={id}
            clienteNome={nomeCliente}
            title="Ocorrências Cliente"
        >
            <div>
            <Botao
                nome="Nova Ocorrência"
                color="add"
                icone={<FaPen />}
                action={() => setOcorrenciaModal(true)}
            />

            <NovaOcorrenciaModal
                open={ocorrenciaModal}
                onClose={() => setOcorrenciaModal(false)}
                onRegistrar={handleRegistrarOcorrencia}
                cliente={
                    cliente
                        ? {
                              id: String(cliente.id),
                              nome_fantasia: cliente.nome_fantasia,
                          }
                        : undefined
                }
            />

            <Card>
                <ClientCardTitle>
                    <PiAddressBookBold size={20} /> Dados do Cliente
                </ClientCardTitle>
                <CardSection>
                    <ClientAvatarWrap>
                        <ClientAvatar>AT</ClientAvatar>
                        <StatusBadge>Cliente Ativo</StatusBadge>
                    </ClientAvatarWrap>
                    <InfoItem>
                        <span className="label">Nome Fantasia</span>
                        <span className="value">{cliente?.nome_fantasia}</span>
                    </InfoItem>
                    <InfoItem>
                        <span className="label">Código</span>
                        <span className="value">{cliente?.id}</span>
                    </InfoItem>
                    {/* <InfoItem>
                            <span className="label">Data de Cadastro</span>
                            <span className="value">{cliente?.d}</span>
                        </InfoItem> */}
                    {/* <InfoItem>
                            <span className="label">Última Atualização</span>
                            <span className="value">{cliente?.}</span>
                        </InfoItem> */}
                </CardSection>
            </Card>

            <CardTitle>Últimas Ocorrências Registradas</CardTitle>
            <PrintBlock ref={printRef}>
                {ocorrencias.map((oc) => (
                    <OcorrenciasBlock key={oc.protocolo}>
                        <OcorrenciaProtocoloRow>
                            <OcorrenciaProtocolo>
                                <span>Protocolo</span>
                                {oc.protocolo}
                            </OcorrenciaProtocolo>
                            <TrashButton
                                title="Excluir ocorrência"
                                onClick={() => handleExcluir(oc.protocolo)}
                            />
                        </OcorrenciaProtocoloRow>

                        <OccurrenceDivider />
                        <OcorrenciaInfo>
                            <OcorrenciaRow>
                                <span className="label">Data</span>
                                <span>{oc.data}</span>
                            </OcorrenciaRow>
                            <OcorrenciaRow>
                                <span className="label">Tipo</span>
                                <span>{oc.tipo}</span>
                            </OcorrenciaRow>
                            <OcorrenciaRow>
                                <span className="label">Atendente</span>
                                <span>{oc.atendente}</span>
                            </OcorrenciaRow>
                            <OcorrenciaRow>
                                <span className="label">Descrição</span>
                                <span>{oc.descricao}</span>
                            </OcorrenciaRow>
                        </OcorrenciaInfo>
                    </OcorrenciasBlock>
                ))}
            </PrintBlock>

            <FloatingActions
                actions={["print"]}
                printTargetRef={printRef}
                labels={{ print: "Imprimir" }}
                printConfig={{
                    title: "Últimas Ocorrências Registradas",
                    orientation: "portrait",
                }}
            />
            </div>
        </ClienteDetalhePageLayout>
    );
}
