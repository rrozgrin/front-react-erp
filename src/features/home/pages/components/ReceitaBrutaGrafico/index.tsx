import { Chart } from "react-google-charts";
import { IconFA } from "../../../../../common/components/Icons/IconFA";
import { BackDefault } from "../../../../../common/components/Templates/BackDefault";

type DadosGrafico = {
  mes: string;
  receita_bruta: number;
  descontos: number;
};

interface Props {
  dados: DadosGrafico[];
}

export const ReceitaBrutaGrafico = ({ dados }: Props) => {
  return (
    <BackDefault className="p-3 px-3 mb-3">
      <h3 className="h5 pb-3 mb-4 border-bottom" data-app-font-exception="home-dashboard-title">
        <IconFA iconName="fa-solid fa-coins" className="me-2" />
        Receita Bruta e Descontos
      </h3>

      <Chart
        chartType="AreaChart"
        data={[
          ["Mês", "Receita Bruta", "Descontos"],
          ...dados.map((item) => [
            item.mes.toString().padStart(2, "0"),
            item.receita_bruta,
            item.descontos,
          ]),
        ]}
        options={{
          height: 250,
          colors: ["#28a745", "#dc3545"],
          vAxis: { title: "Valores (R$)" },
          chartArea: { width: "70%", height: "70%" },
        }}
      />
    </BackDefault>
  );
};
