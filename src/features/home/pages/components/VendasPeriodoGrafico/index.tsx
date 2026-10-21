import { Chart } from "react-google-charts";
import { IconFA } from "../../../../../common/components/Icons/IconFA";
import { BackDefault } from "../../../../../common/components/Templates/BackDefault";
import { themes } from "../../../../../context/themes";

type Venda = {
  mes: string;
  total: number;
};

interface Props {
  vendas: Venda[];
}

export const VendasPeriodoGrafico = ({ vendas }: Props) => {
  const activeTheme = localStorage.getItem("theme") || "blue";
  const themeColors = themes[activeTheme];

  const data = [["", "Vendas"], ...vendas.map((item) => [item.mes, item.total])];

  const options = {
    height: 265,
    colors: [themeColors.secondary, themeColors.quaternary],
    vAxis: { title: "Vendas (R$)" },
    hAxis: { title: "Meses", titleTextStyle: { color: "#333" } },
    chartArea: { width: "70%", height: "70%" },
    legend: { position: "none" },
  };

  return (
    <BackDefault className="p-3 px-3 mb-3">
      <h3 className="h5 pb-3 mb-4 border-bottom">
        <IconFA iconName="fa-solid fa-chart-line" className="me-2" />
        Vendas por Período
      </h3>
      <Chart chartType="Bar" width="100%" height="250px" data={data} options={options} />
    </BackDefault>
  );
};
