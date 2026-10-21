import { Chart } from "react-google-charts";
import { BackDefault } from "../../../../../common/components/Templates/BackDefault";
import { IconFA } from "../../../../../common/components/Icons/IconFA";
import { themes } from "../../../../../context/themes";

interface Pedido {
  id_tipo_venda: string;
  qtd: number;
}

interface Props {
  pedidos: Pedido[];
}

export const PedidosGrafico = ({ pedidos }: Props) => {
  const activeTheme = localStorage.getItem("theme") || "blue";
  const themeColors = themes[activeTheme];

  const data = [["Tipo de Venda", "Qtd"], ...pedidos.map(item => [item.id_tipo_venda, item.qtd])];

  const options = {
    height: 265,
    colors: [themeColors.main, themeColors.secondary, themeColors.tertiary, themeColors.quaternary],
    vAxis: { title: "Pedidos" },
    hAxis: { title: "Tipo de Venda" },
    chartArea: { width: "70%", height: "70%" },
    legend: { position: "right" },
  };

  return (
    <BackDefault className="p-3 px-3 mb-3">
      <h3 className="h5 pb-3 mb-4 border-bottom">
        <IconFA iconName="fa-solid fa-receipt" className="me-2" />
        Pedidos
      </h3>
      <Chart chartType="PieChart" width="100%" height="250px" data={data} options={options} />
    </BackDefault>
  );
};
