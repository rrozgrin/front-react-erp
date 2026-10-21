import { ReactNode } from "react";
import { IconFA } from "../../../../../common/components/Icons/IconFA";
import { EstadoMensagem } from "../EstadoMensagem";
import { FixedChartCard } from "./styled";

interface Props<T> {
  titulo: string;
  icon: string;
  dados: T[] | null | undefined;
  children: ReactNode;
}

export const ChartCard = <T,>({
  titulo,
  icon,
  dados,
  children,
}: Props<T>) => {

  const renderContent = () => {
    if (dados === undefined || dados === null) {
      return (
        <FixedChartCard className="p-3 px-3 mb-3">
          <h3 className="h5 pb-3 mb-4 border-bottom d-flex align-items-center" data-app-font-exception="home-dashboard-title">
            <IconFA iconName={icon} className="me-2" />
            {titulo}
          </h3>
          <EstadoMensagem
            icon="fa-solid fa-spinner"
            mensagem="Os dados não foram carregados corretamente, tente atualizar a página."
          />
        </FixedChartCard>
      );
    }

    if (dados.length === 0) {
      return (
        <FixedChartCard className="p-3 px-3 mb-3">
          <h3 className="h5 pb-3 mb-4 border-bottom d-flex align-items-center" data-app-font-exception="home-dashboard-title">
            <IconFA iconName={icon} className="me-2" />
            {titulo}
          </h3>
          <EstadoMensagem
            icon="fa-solid fa-face-frown"
            mensagem="Nenhum dado encontrado."
          />
        </FixedChartCard>
      );
    }

    return children;
  };

  return (
    <>
      {renderContent()}
    </>
  );
};
