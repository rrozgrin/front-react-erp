import { useState, useMemo } from "react";
import { LinkFeature } from "../LinkFeature";
import { useUsuario } from "../../../../../context/UsuarioContext";
import { useContasPagarSemanaQuery } from "../../../hooks/useHomeCards";
import { DashboardTableModal, type DashboardColumn } from "../DashboardTableModal";

interface Props {
  baseUrl: string;
}

export const ContasPagarCard = ({ baseUrl: _baseUrl }: Props) => {
  const [open, setOpen] = useState(false);
  const { usuario } = useUsuario();
  const idCadastro = usuario?.id_cadastro?.replace(/"/g, "") || "";
  const { data: minhasContasPagar } = useContasPagarSemanaQuery(idCadastro);

  // Badge: quantas contas vencem hoje
  const contasHojeCount = useMemo(() => {
    if (!minhasContasPagar.length) return 0;

    const hoje = new Date();
    const diaAtual = hoje.getDate();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();

    return minhasContasPagar.filter((c) => {
      const [dia, mes, ano] = c.data_venc.split("/").map(Number);
      return dia === diaAtual && mes === mesAtual && ano === anoAtual;
    }).length;
  }, [minhasContasPagar]);

  const isContaHoje = (dataVenc: string) => {
    const hoje = new Date();
    const [dia, mes, ano] = dataVenc.split("/").map(Number);
    return dia === hoje.getDate() && mes === hoje.getMonth() + 1 && ano === hoje.getFullYear();
  };

  const columns: DashboardColumn<(typeof minhasContasPagar)[number]>[] = [
    { key: "data_venc", header: "Data vencimento", render: (conta) => conta.data_venc },
    { key: "nome", header: "Fornecedor", render: (conta) => conta.nome },
  ];

  return (
    <>
      <LinkFeature
        to="#"
        iconName="fa-solid fa-file-invoice-dollar"
        text="Minhas contas a pagar"
        badge={contasHojeCount > 0 ? contasHojeCount : undefined}
        onClick={() => setOpen(true)}
      />

      {open && (
        <DashboardTableModal
          columns={columns}
          emptyMessage="Você não tem contas a pagar."
          iconName="fa-solid fa-file-invoice-dollar"
          onClose={() => setOpen(false)}
          rows={minhasContasPagar}
          title="Minhas contas a pagar"
          width="600px"
          getRowState={(conta) => ({ highlighted: isContaHoje(conta.data_venc) })}
        />
      )}
    </>
  );
};
