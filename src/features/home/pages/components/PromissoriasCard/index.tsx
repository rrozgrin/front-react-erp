import { useState, useMemo } from "react";
import { LinkFeature } from "../LinkFeature";
import { useUsuario } from "../../../../../context/UsuarioContext";
import { usePromissoriasQuery } from "../../../hooks/useHomeCards";
import { DashboardTableModal, type DashboardColumn } from "../DashboardTableModal";

interface Props {
  baseUrl: string;
}

export const PromissoriasCard = ({ baseUrl: _baseUrl }: Props) => {
  const [open, setOpen] = useState(false);
  const { usuario } = useUsuario();
  const idCadastro = usuario?.id_cadastro?.replace(/"/g, "") || "";
  const { data: promissorias } = usePromissoriasQuery(idCadastro);

  // Badge: quantas vencem hoje
  const promissoriasHojeCount = useMemo(() => {
    if (!promissorias.length) return 0;

    const hoje = new Date();
    const diaAtual = hoje.getDate();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();

    return promissorias.filter((p) => {
      const [dia, mes, ano] = p.data_venc.split("/").map(Number);
      return dia === diaAtual && mes === mesAtual && ano === anoAtual;
    }).length;
  }, [promissorias]);

  const isPromissoriaHoje = (dataVenc: string) => {
    const hoje = new Date();
    const [dia, mes, ano] = dataVenc.split("/").map(Number);
    return dia === hoje.getDate() && mes === hoje.getMonth() + 1 && ano === hoje.getFullYear();
  };

  const columns: DashboardColumn<(typeof promissorias)[number]>[] = [
    { key: "data_venc", header: "Data vencimento", render: (promissoria) => promissoria.data_venc },
    { key: "nome", header: "Cliente", render: (promissoria) => promissoria.nome },
    { key: "parcela", header: "Parcela", render: (promissoria) => promissoria.parcela },
    { key: "valor", header: "Valor", align: "right", render: (promissoria) => promissoria.valor },
  ];

  return (
    <>
      <LinkFeature
        to="#"
        iconName="fa-solid fa-cash-register"
        text="Promissórias vencendo hoje"
        badge={promissoriasHojeCount > 0 ? promissoriasHojeCount : undefined}
        onClick={() => setOpen(true)}
      />

      {open && (
        <DashboardTableModal
          columns={columns}
          emptyMessage="Você não tem promissórias a vencer hoje."
          iconName="fa-solid fa-cash-register"
          onClose={() => setOpen(false)}
          rows={promissorias}
          title="Promissórias vencendo hoje"
          getRowState={(promissoria) => ({ highlighted: isPromissoriaHoje(promissoria.data_venc) })}
        />
      )}
    </>
  );
};
