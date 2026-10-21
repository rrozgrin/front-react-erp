import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { PageLayout } from "../../../../common/components/PageLayout";
import { ModalSimpleActionButton } from "../../../../common/components/ModalSimple";
import { buildFuncionariosMenuSections } from "../shared/funcionariosMenuSections";
import {
    ActionsRow,
    Input,
    Panel,
    Select,
} from "../../../../common/components/Ui";
const ReportForm = styled(Panel).attrs({ as: "form" })`
    width: min(760px, 100%);
    margin: 0 auto;
    display: grid;
    gap: var(--space-xl);
`;

const FormTitle = styled.h3`
    margin: 0;
    text-align: center;
    font-size: var(--font-size-lg);
    color: var(--theme-text, #0f172a);
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--space-md);
    align-items: center;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

const InlineFields = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-wrap: wrap;
`;

const CheckGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-sm);

    label {
        display: inline-flex;
        align-items: center;
        gap: var(--space-sm);
    }

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

const reportFields = [
    "Pessoa/Fone de Recado 2",
    "Pessoa/Fone de Recado 1",
    "E-mail",
    "Telefone",
    "Celular",
    "Função",
    "Setor",
    "Cargo",
];

export const RelatorioFuncionariosPage: React.FC = () => {
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const sections = useMemo(() => buildFuncionariosMenuSections(), []);

    const toggleField = (field: string) => {
        setSelectedFields((current) =>
            current.includes(field)
                ? current.filter((item) => item !== field)
                : [...current, field],
        );
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        window.location.assign("/funcionarios/relatorios/impressao");
    };

    return (
        <PageLayout title="Relatórios de Funcionários" sections={sections}>
            <ReportForm onSubmit={handleSubmit}>
                <FormTitle>Selecione os Dados para o Relatório</FormTitle>
                <Row>
                    <label>Funcionários CONTRATADOS por período:</label>
                    <InlineFields>
                        <Input type="date" name="data_inicial_contratado" />
                        <span>À</span>
                        <Input type="date" name="data_final_contratado" />
                    </InlineFields>
                </Row>
                <Row>
                    <label>Funcionários DEMITIDOS por período:</label>
                    <InlineFields>
                        <Input type="date" name="data_inicial_demitido" />
                        <span>À</span>
                        <Input type="date" name="data_final_demitido" />
                    </InlineFields>
                </Row>
                <Row>
                    <label>Sexo:</label>
                    <Select name="sexo" defaultValue="A">
                        <option value="A">Todos</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </Select>
                </Row>
                <Row>
                    <label>Ativo / Inativo:</label>
                    <Select name="situacao" defaultValue="A">
                        <option value="T">Todos</option>
                        <option value="A">Ativo</option>
                        <option value="I">Inativo</option>
                    </Select>
                </Row>
                <Row>
                    <label>Quais dados você quer trazer no relatório?</label>
                    <CheckGrid>
                        {reportFields.map((field) => (
                            <label key={field}>
                                <Input
                                    type="checkbox"
                                    checked={selectedFields.includes(field)}
                                    onChange={() => toggleField(field)}
                                />
                                {field}
                            </label>
                        ))}
                    </CheckGrid>
                </Row>
                <ActionsRow>
                    <ModalSimpleActionButton type="submit">
                        Gerar Relatório
                    </ModalSimpleActionButton>
                </ActionsRow>
            </ReportForm>
        </PageLayout>
    );
};
