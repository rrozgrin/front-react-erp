import { useState, useMemo } from "react";
import { LinkFeature } from "../LinkFeature";
import { useUsuario } from "../../../../../context/UsuarioContext";
import { useLocacoesQuery } from "../../../hooks/useHomeCards";
import { formatarDataBR } from "../../../../../types/Data";
import { DashboardTableModal, type DashboardColumn } from "../DashboardTableModal";

interface Props {
  baseUrl: string;
}

export const LocacoesCard = ({ baseUrl: _baseUrl }: Props) => {
  const [open, setOpen] = useState(false);
  const { usuario } = useUsuario();
  const idCadastro = usuario?.id_cadastro?.replace(/"/g, "") || "";
  const { data: locacoes } = useLocacoesQuery(idCadastro);

  // Conta locações que vencem hoje
  const locacoesHojeCount = useMemo(() => {
    if (!locacoes.length) return 0;

    const hoje = new Date();
    const diaAtual = hoje.getDate();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();

    return locacoes.filter((l) => {
      const [ano, mes, dia] = l.data_venc.split("-").map(Number);
      return dia === diaAtual && mes === mesAtual && ano === anoAtual;
    }).length;
  }, [locacoes]);

  const isHoje = (dateStr: string): boolean => {
    if (!dateStr) return false;
    const hoje = new Date();
    const [year, month, day] = dateStr.split("-").map(Number);
    return (
      day === hoje.getDate() &&
      month === hoje.getMonth() + 1 &&
      year === hoje.getFullYear()
    );
  };

  const columns: DashboardColumn<(typeof locacoes)[number]>[] = [
    { key: "data_venc", header: "Data vencimento", render: (locacao) => formatarDataBR(locacao.data_venc, "") },
    { key: "nome_cli", header: "Cliente", render: (locacao) => locacao.nome_cli },
  ];

  return (
    <>
      <LinkFeature
        to="#"
        iconName="fa-solid fa-calendar-check"
        text="Locações a vencer"
        badge={locacoesHojeCount > 0 ? locacoesHojeCount : undefined}
        onClick={() => setOpen(true)}
      />

      {open && (
        <DashboardTableModal
          columns={columns}
          emptyMessage="Você não tem locações a vencer."
          iconName="fa-solid fa-calendar-check"
          onClose={() => setOpen(false)}
          rows={locacoes}
          title="Locações a vencer"
          width="600px"
          getRowState={(locacao) => ({ highlighted: isHoje(locacao.data_venc) })}
        />
      )}
    </>
  );
};
