import { Chart } from "react-google-charts";
import { BackDefault } from "../../../../../common/components/Templates/BackDefault";
import { IconFA } from "../../../../../common/components/Icons/IconFA";
import { themes } from "../../../../../context/themes";

interface NotaFiscal {
  tipo: string;
  qtd: number;
}

interface Props {
  notas: NotaFiscal[]; // Renomear no backend para ficar semântico
}

export const NotasFiscaisGrafico = ({ notas }: Props) => {
  const activeTheme = localStorage.getItem("theme") || "blue";
  const themeColors = themes[activeTheme];

  const data = [["Tipo", "Quantidade"], ...notas.map(item => [item.tipo, item.qtd])];

  const options = {
    height: 265,
    pieHole: 0.4, // transforma em Doughnut
    colors: [themeColors.main, themeColors.secondary, themeColors.tertiary, themeColors.quaternary],
    legend: { position: "right" },
    chartArea: { width: "90%", height: "80%" }
  };

  return (
    <BackDefault className="p-3 px-3 mb-3">
      <h3 className="h5 pb-3 mb-4 border-bottom">
        <IconFA iconName="fa-solid fa-file-invoice" className="me-2" />
        Notas Fiscais
      </h3>
      <Chart chartType="PieChart" width="100%" height="250px" data={data} options={options} />
    </BackDefault>
  );
};
