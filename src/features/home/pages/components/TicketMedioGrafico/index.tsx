import { IconFA } from "../../../../../common/components/Icons/IconFA";
import { BackDefault } from "../../../../../common/components/Templates/BackDefault";
import { ChartTicketMedio, DadosItem } from "../ChartTicketMedio";

interface Props {
  dados: DadosItem[];
}

export const TicketMedioGrafico = ({ dados }: Props) => {
  return (
    <BackDefault className="p-3 px-3 mb-3">
      <h3 className="h5 pb-3 mb-4 border-bottom">
        <IconFA iconName="fa-solid fa-chart-simple" className="me-2" />
        Ticket Médio
      </h3>
      <ChartTicketMedio dados={dados} />
    </BackDefault>
  );
};
