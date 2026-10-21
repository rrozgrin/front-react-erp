import { Chart } from "react-google-charts";
import { IconFA } from "../../../../../common/components/Icons/IconFA";
import { BackDefault } from "../../../../../common/components/Templates/BackDefault";
import { themes } from "../../../../../context/themes";

type Cliente = {
  nome: string;
  qtd_compras: number;
  valor_total: number;
};

interface Props {
  clientes: Cliente[];
}

export const ClientesMaisCompramGrafico = ({ clientes }: Props) => {
  const activeTheme = localStorage.getItem("theme") || "blue";
  const themeColors = themes[activeTheme];

  const data = [
    ["Cliente", "Qtd Compras", { role: "tooltip", type: "string", p: { html: true } }],
    ...(clientes ?? []).map((item) => {
      // normaliza nome SEMPRE em string
      const nome = typeof item?.nome === "string" ? item.nome : "";
      const nomeCurto = nome.length > 20 ? nome.substring(0, 20) + "…" : nome;

      const tooltip = `<div style="padding: 6px var(--space-xs)">
        <strong>${nome || "Sem nome"}</strong><br/>
        Compras: ${item?.qtd_compras ?? 0}<br/>
      </div>`;

      return [nomeCurto, item?.qtd_compras ?? 0, tooltip];
    }),
  ];

  const options = {
    height: 265,
    bars: "horizontal" as const,
    colors: [themeColors.secondary, themeColors.quaternary],
    legend: { position: "top", alignment: "end" },
    chartArea: { width: "70%", height: "70%" },
    hAxes: {
      0: { title: "Qtd Compras" },
      1: { title: "Valor Total (R$)" },
    },
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 1 },
    },
    tooltip: { isHtml: true },
  };

  return (
    <BackDefault className="p-3 px-3 mb-3">
      <h3 className="h5 pb-3 mb-4 border-bottom">
        <IconFA iconName="fa-solid fa-user" className="me-2" />
        Clientes que mais Compram
      </h3>
      <Chart chartType="Bar" width="100%" height="250px" data={data} options={options} />
    </BackDefault>
  );
};
