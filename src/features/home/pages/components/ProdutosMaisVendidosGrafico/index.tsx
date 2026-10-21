import { Chart } from "react-google-charts";
import { IconFA } from "../../../../../common/components/Icons/IconFA";
import { themes } from "../../../../../context/themes";
import { ChartFill, FixedChartCard } from "../ChartCard/styled";

type Produto = {
  nome_produto: string;
  total_qtd_vendida: number;
  lucro_total: number;
};

interface Props {
  produtos: Produto[];
}

export const ProdutosMaisVendidosGrafico = ({ produtos }: Props) => {
  const activeTheme = localStorage.getItem("theme") || "blue";
  const themeColors = themes[activeTheme];

  const dataChart = [
    ["Produto", "Produto", "Faturamento"],
    ...produtos.map((item) => [
      item.nome_produto,
      Number(item.total_qtd_vendida),
      Number(item.lucro_total),
    ]),
  ];

  const options = {
    height: 250,
    colors: [themeColors.secondary, themeColors.quaternary],
    seriesType: "bars",
    series: {
      0: { type: "bars", targetAxisIndex: 0 },
      1: { type: "line", targetAxisIndex: 1 },
    },
    vAxes: {
      0: { title: "Qtd Vendida" },
      1: { title: "Lucro (R$)" },
    },
    legend: { position: "top", alignment: "end" },
    chartArea: { width: "70%", height: "70%" },
  };

  return (
    <FixedChartCard className="p-3 px-3 mb-3">
      <h3 className="h5 pb-3 mb-4 border-bottom">
        <IconFA iconName="fa-solid fa-box-archive" className="me-2" />
        Produtos mais Vendidos
      </h3>
      <ChartFill>
        <Chart chartType="ComboChart" width="100%" height="100%" data={dataChart} options={options} />
      </ChartFill>
    </FixedChartCard>
  );
};
