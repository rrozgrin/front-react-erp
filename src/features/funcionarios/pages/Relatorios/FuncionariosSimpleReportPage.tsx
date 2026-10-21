import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '../../../../common/components/PageLayout';
import { ModalSimpleActionButton } from '../../../../common/components/ModalSimple';
import { buildFuncionariosMenuSections } from '../shared/funcionariosMenuSections';
import { funcionariosMockData } from '../../data/funcionariosListConfig';
import { ActionsRow, FormField, Input, Panel, Select } from '../../../../common/components/Ui';

const Form = styled(Panel).attrs({ as: 'form' })`
    width: min(680px, 100%);
    margin: 0 auto;
    display: grid;
    gap: var(--space-lg);
`;

interface FuncionariosSimpleReportPageProps {
    title: string;
    type: 'comissao' | 'auxiliares' | 'valePresente' | 'setores';
}

export const FuncionariosSimpleReportPage: React.FC<FuncionariosSimpleReportPageProps> = ({ title, type }) => {
    const [searchParams] = useSearchParams();
    const selectedFuncionarioId = searchParams.get('id_funcionario') ?? (type === 'comissao' ? '' : undefined);
    const sections = useMemo(() => buildFuncionariosMenuSections(), []);

    return (
        <PageLayout title={title} sections={sections}>
            <Form onSubmit={(event) => event.preventDefault()}>
                {type !== 'setores' ? (
                    <>
                        {(type === 'comissao' || type === 'auxiliares') && (
                            <FormField>
                                Funcionário
                                <Select defaultValue={selectedFuncionarioId}>
                                    <option value="">Selecione</option>
                                    {funcionariosMockData.map((funcionario) => (
                                        <option key={funcionario.id_funcionario} value={funcionario.id_funcionario}>
                                            {funcionario.nome}
                                        </option>
                                    ))}
                                </Select>
                            </FormField>
                        )}
                        <FormField>
                            Data inicial
                            <Input type="date" />
                        </FormField>
                        <FormField>
                            Data final
                            <Input type="date" />
                        </FormField>
                        <ActionsRow>
                            <ModalSimpleActionButton type="submit">Gerar Relatório</ModalSimpleActionButton>
                        </ActionsRow>
                    </>
                ) : (
                    <>
                        <FormField>
                            Nome do setor
                            <Input />
                        </FormField>
                        <ActionsRow>
                            <ModalSimpleActionButton type="submit">Adicionar Setor</ModalSimpleActionButton>
                        </ActionsRow>
                    </>
                )}
            </Form>
        </PageLayout>
    );
};
