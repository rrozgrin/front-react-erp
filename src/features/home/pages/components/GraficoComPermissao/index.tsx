import { ReactNode } from "react";
import { IconFA } from '../../../../../common/components/Icons/IconFA';
import { usePermissoes } from '../../../../../context/PermissoesContext';
import { useUsuario } from "../../../../../context/UsuarioContext";
import { FixedChartCard, PermissionPlaceholder } from '../ChartCard/styled';
interface Props {
  permissaoId: string;
  titulo: string;      // título que aparece no card
  icon: string;        // ícone que aparece no título
  children: ReactNode; // o gráfico em si
}

export const GraficoComPermissao = ({ permissaoId, titulo, icon, children }: Props) => {
  const { hasPermissao } = usePermissoes();
  const { usuario } = useUsuario();
  return (
    <>
      {(hasPermissao(permissaoId) || usuario?.login_master === "S") ? (
        children
      ) : (
        <FixedChartCard className="p-3 px-3 mb-3">
          <h3 className="h5 pb-3 mb-4 border-bottom d-flex align-items-center" data-app-font-exception="home-dashboard-title">
            <IconFA iconName={icon} className="me-2" />
            {titulo}
          </h3>
          <PermissionPlaceholder>
            <IconFA iconName="fa-solid fa-lock" className="me-2" />
          </PermissionPlaceholder>
        </FixedChartCard>
      )}
    </>
  );
};
