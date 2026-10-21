import { Chart } from "react-google-charts";
import { BackDefault } from "../../../../../common/components/Templates/BackDefault";
import { IconFA } from "../../../../../common/components/Icons/IconFA";
import { themes } from "../../../../../context/themes";

interface Consulta {
  debito: string;
  tpinsc: string;
  qtd: number;
}

interface Props {
  consultas: Consulta[];
}

export const ConsultasGrafico = ({ consultas }: Props) => {
  const activeTheme = localStorage.getItem("theme") || "blue";
  const themeColors = themes[activeTheme];

  const data = [
    ["Tipo", "Qtd"],
    ...consultas.map(item => [`${item.tpinsc} - ${item.debito}`, item.qtd])
  ];

  const options = {
    height: 265,
    colors: [themeColors.secondary],
    legend: { position: "none" },
    chartArea: { width: "70%", height: "70%" },
    hAxis: { title: "Consultas" }
  };

  return (
    <BackDefault className="p-3 px-3 mb-3">
      <h3 className="h5 pb-3 mb-4 border-bottom">
        <IconFA iconName="fa-solid fa-magnifying-glass-chart" className="me-2" />
        Consultas
      </h3>
      <Chart chartType="BarChart" width="100%" height="250px" data={data} options={options} />
    </BackDefault>
  );
};
