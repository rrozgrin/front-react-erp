import { useMemo } from "react";
import { FiDownload } from "react-icons/fi";
import { Botao } from "../../../../common/components/Buttons/Botao";
import { type TableField } from "../../../../common/components/Table";
import type { ExcelColumn } from "../../../../common/components/Actions/GerarExcel";
import { RelatorioTemplate } from "../../../../common/components/Templates/RelatorioTemplate";
import { moedaBRL } from "../../../../types/Formatadores";
import { buildProdutosMenuSections } from "../shared/produtosMenuSections";

interface InventarioEstoque {
    codigo: string;
    descricao: string;
    quantidade: number;
    valor: number;
    codigoBarras: string;
    ativo: boolean;
}

const inventarioMockData: InventarioEstoque[] = [
    {
        codigo: "2500108",
        descricao: "Capa Banco Mod Orig Biz 125 2008",
        quantidade: 2,
        valor: 20,
        codigoBarras: "7899565702107",
        ativo: true,
    },
    {
        codigo: "2500106",
        descricao: "Capa Banco Mod Orig Titan 150 2004/08",
        quantidade: 25,
        valor: 21.85,
        codigoBarras: "7899565702084",
        ativo: true,
    },
    {
        codigo: "5500190",
        descricao: "Kit Pris Coroa Titan 150 Fan C/Porca",
        quantidade: -1,
        valor: 10.41,
        codigoBarras: "7899565721764",
        ativo: false,
    },
];

const fields: TableField<InventarioEstoque>[] = [
    {
        id: "codigo",
        header: "Código",
        accessorKey: "codigo",
        align: "center",
        defaultVisible: true,
    },
    {
        id: "descricao",
        header: "Descrição",
        accessorKey: "descricao",
        defaultVisible: true,
    },
    {
        id: "quantidade",
        header: "Quantidade",
        accessorKey: "quantidade",
        align: "center",
        defaultVisible: true,
    },
    {
        id: "valor",
        header: "Valor",
        accessorFn: (row) => moedaBRL.format(row.valor),
        align: "right",
        defaultVisible: true,
    },
    {
        id: "codigoBarras",
        header: "Cód. Barras",
        accessorKey: "codigoBarras",
        align: "center",
        defaultVisible: true,
    },
    {
        id: "ativo",
        header: "Status",
        accessorFn: (row) => (row.ativo ? "Ativo" : "Inativo"),
        align: "center",
        defaultVisible: true,
    },
];

const excelColumns: ExcelColumn<InventarioEstoque>[] = [
    { key: "codigo", header: "Código", accessorKey: "codigo" },
    { key: "descricao", header: "Descrição", accessorKey: "descricao" },
    { key: "quantidade", header: "Quantidade", accessorKey: "quantidade" },
    {
        key: "valor",
        header: "Valor",
        accessorFn: (row) => moedaBRL.format(row.valor),
    },
    { key: "codigoBarras", header: "Cód. Barras", accessorKey: "codigoBarras" },
    {
        key: "ativo",
        header: "Status",
        accessorFn: (row) => (row.ativo ? "Ativo" : "Inativo"),
    },
];

const gerarConteudoTxt = (rows: InventarioEstoque[]) => {
    return rows
        .map((row) =>
            [
                row.codigo,
                row.descricao,
                row.quantidade.toFixed(0),
                row.valor.toFixed(2).replace(".", ","),
                row.codigoBarras,
                row.ativo ? "Ativo" : "Inativo",
            ].join(";"),
        )
        .join("\n");
};

export const ProdutosExportarEstoquePage = () => {
    const totalItens = useMemo(
        () =>
            inventarioMockData.reduce(
                (total, item) => total + item.quantidade,
                0,
            ),
        [],
    );

    const baixarTxt = () => {
        const blob = new Blob([gerarConteudoTxt(inventarioMockData)], {
            type: "text/plain;charset=utf-8",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "ESTOQUE.TXT";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    return (
        <RelatorioTemplate
            titulo="Exportar Inventário de Estoque"
            secoes={buildProdutosMenuSections({})}
            tituloTabela="Inventário de Estoque"
            descricaoTabela={`${inventarioMockData.length} produto(s) listados. Quantidade total: ${totalItens}.`}
            dados={inventarioMockData}
            campos={fields}
            colunasExcel={excelColumns}
            arquivoExcel="inventario_estoque"
            mensagemVazia="Nenhum registro encontrado."
            conteudoAdicionalToolbar={
                <Botao
                    nome="GERAR ARQUIVO TXT"
                    icone={<FiDownload />}
                    action={baixarTxt}
                />
            }
            configurarColunas="tabela"
            impressao={{
                titulo: "Exportar Inventário de Estoque",
                subtitulo: "Bloco K e H",
                orientacao: "landscape",
            }}
        />
    );
};
