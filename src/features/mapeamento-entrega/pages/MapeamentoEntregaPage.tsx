import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import { TableField } from '../../../common/components/Table';
import { RelatorioTemplate } from '../../../common/components/Templates/RelatorioTemplate';
import { PeriodoInput } from '../../../common/components/Inputs/PeriodoInput';
import { Entrega } from '../../../types/Entrega';
import { ExcelColumn } from '../../../common/components/Actions/GerarExcel';
import { FaFilter } from "react-icons/fa";
import { Botao } from '../../../common/components/Buttons/Botao';
import { Panel } from '../../../common/components/Ui';
// Styled Components
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0;
`;

const FilterSection = styled(Panel)`
    background: white;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: var(--space-md);
    }
`;

const FilterTitle = styled.h3`
    margin: 0 0 var(--space-md) 0;
    font-size: var(--font-size-md);
    font-weight: 600;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: var(--space-xs);

    svg {
        width: 20px;
        height: 20px;
        color: #3b82f6;
    }
`;

const FilterContent = styled.div`
    display: flex;
    gap: var(--space-sm);
    align-items: flex-end;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;

        & > div {
            width: 100%;
        }
    }
`;

const TableContainer = styled.div`
    width: 100%;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
`;

// Mock Data
const mockEntregas: Entrega[] = [
    {
        id: 1,
        data: '22/06/2026',
        cliente: 'HOMEM DE FERRO',
        contato: '(41) 98537-3483',
        valorTotal: 10.0,
        dataPrevista: '22/06/2026',
    },
    {
        id: 2,
        data: '22/06/2026',
        cliente: 'CLIENTE BALCAO',
        contato: '(00) 00000-0000',
        valorTotal: 18.26,
        dataPrevista: '22/06/2026',
    },
    {
        id: 3,
        data: '22/06/2026',
        cliente: 'CLIENTE BALCAO',
        contato: '(00) 00000-0000',
        valorTotal: 350.92,
        dataPrevista: '23/06/2026',
    },
    {
        id: 4,
        data: '22/06/2026',
        cliente: 'NOVO CLIENTE',
        contato: '(11) 98765-4321',
        valorTotal: 25.5,
        dataPrevista: '22/06/2026',
    },
];

export const MapeamentoEntregaPage: React.FC = () => {
    const [dataInicio, setDataInicio] = useState('22/06/2026');
    const [dataFim, setDataFim] = useState('22/06/2026');
    const [entregas] = useState<Entrega[]>(mockEntregas);

    const handleDateRangeChange = (inicio: string, fim: string) => {
        setDataInicio(inicio);
        setDataFim(fim);
        // Aqui você faria a busca dos dados com base na data
    };

    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        if (printWindow) {
            const content = `
                <html>
                    <head>
                        <title>Mapeamento de Entregas</title>
                        <style>
                            h1 { text-align: center; color: #1f2937; }
                            .filters { margin-bottom: 20px; }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-top: 20px;
                            }
                            th {
                                background: #3b82f6;
                                color: white;
                                padding: var(--space-sm);
                                text-align: left;
                                border: 1px solid #ddd;
                            }
                            td {
                                padding: 10px var(--space-sm);
                                border: 1px solid #ddd;
                            }
                            tr:nth-child(even) { background: #f9fafb; }
                            .status { font-weight: bold; padding: var(--space-2xs) var(--space-xs); border-radius: var(--radius-sm); }
                            .status-entregue { background: #d1fae5; color: #065f46; }
                            .status-em_rota { background: #dbeafe; color: #0c4a6e; }
                            .status-pendente { background: #fef3c7; color: #78350f; }
                            .status-problema { background: #fee2e2; color: #7f1d1d; }
                            .header-info { margin-bottom: 20px; }
                        </style>
                    </head>
                    <body>
                        <h1>Mapeamento de Entregas</h1>
                        <div class="header-info">
                            <p><strong>Período:</strong> ${dataInicio} até ${dataFim}</p>
                            <p><strong>Total de Entregas:</strong> ${entregas.length}</p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Cliente</th>
                                    <th>Contato</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${entregas.map(e => `
                                    <tr>
                                        <td>${e.data}</td>
                                        <td>${e.cliente}</td>
                                        <td>${e.contato}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </body>
                </html>
            `;
            printWindow.document.write(content);
            printWindow.document.close();
            setTimeout(() => printWindow.print(), 300);
        }
    };

    // Calcular estatísticas
    const stats = useMemo(() => {
        return {
            total: entregas.length,
            valorTotal: entregas.reduce((acc, e) => acc + e.valorTotal, 0),
        };
    }, [entregas]);

    // Definir campos da tabela
    const fields: TableField<Entrega>[] = [
        {
            id: 'data',
            header: 'Data',
            accessorKey: 'data',
            align: 'center',
            width: '100px',
        },
        {
            id: 'cliente',
            header: 'Cliente',
            accessorKey: 'cliente',
            align: 'left',
        },
        {
            id: 'contato',
            header: 'Contato',
            accessorKey: 'contato',
            align: 'center',
            width: '130px',
        },
        {
            id: 'valorTotal',
            header: 'Valor Total',
            accessorKey: 'valorTotal',
            cell: (value) => `R$ ${Number(value).toFixed(2)}`,
            align: 'right',
            width: '120px',
        },
    ];

    // Configurar dados para Excel
    const excelColumns: ExcelColumn<Entrega>[] = [
        { key: 'data', header: 'Data', accessorKey: 'data' },
        { key: 'cliente', header: 'Cliente', accessorKey: 'cliente' },
        { key: 'contato', header: 'Contato', accessorKey: 'contato' },
        { key: 'valorTotal', header: 'Valor Total', accessorKey: 'valorTotal' },
        { key: 'dataPrevista', header: 'Data Prevista', accessorKey: 'dataPrevista' },
    ];

    return (
        <RelatorioTemplate
            titulo="Mapeamento de Entregas"
            tituloTabela="Entregas para Realizar"
            descricaoTabela={`${stats.total} entregas no período de ${dataInicio} a ${dataFim}`}
            dados={entregas}
            campos={fields}
            colunasExcel={excelColumns}
            arquivoExcel={`mapeamento-entregas-${dataInicio}`}
            mensagemVazia="Nenhuma entrega encontrada para o período selecionado."
            painelFiltros={(
                <FilterSection>
                    <FilterTitle>
                        <FiMapPin /> Filtrar Entregas
                    </FilterTitle>
                    <FilterContent>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <PeriodoInput larguraTotal onChange={handleDateRangeChange} />
                        </div>
                        <Botao nome="Filtrar" action={() => handleDateRangeChange(dataInicio, dataFim)} icone={<FaFilter />} />
                    </FilterContent>
                </FilterSection>
            )}
            renderizarTabela={(tabela) => <TableContainer>{tabela}</TableContainer>}
            renderizarConteudo={(conteudo) => <Container>{conteudo}</Container>}
            configurarColunas="tabela"
            impressao={{ titulo: 'Mapeamento de Entregas', orientacao: 'landscape', onPrint: handlePrint }}
        />
    );
};
