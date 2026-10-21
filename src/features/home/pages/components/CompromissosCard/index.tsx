import { useState } from "react";
import { LinkFeature } from "../LinkFeature";
import { useUsuario } from "../../../../../context/UsuarioContext";
import { useCompromissosQuery } from "../../../hooks/useHomeCards";
import { DashboardTableModal, type DashboardColumn } from "../DashboardTableModal";

interface Props {
  baseUrl: string;
}

export const CompromissosCard = ({ baseUrl: _baseUrl }: Props) => {
  const [open, setOpen] = useState(false);
  const { usuario } = useUsuario();
  const idCadastro = usuario?.id_cadastro?.replace(/"/g, "") || "";
  const { data: compromissos } = useCompromissosQuery(idCadastro);
  const columns: DashboardColumn<(typeof compromissos)[number]>[] = [
    { key: "funcionario", header: "Funcionário", render: (compromisso) => compromisso.funcionario },
    { key: "descricao", header: "Descrição", render: (compromisso) => compromisso.descricao },
    { key: "inicio", header: "Início", render: (compromisso) => compromisso.inicio },
    { key: "fim", header: "Fim", render: (compromisso) => compromisso.fim },
  ];

  return (
    <>
      <LinkFeature
        to="#"
        iconName="fa-solid fa-calendar-check"
        text="Meus Compromissos"
        badge={compromissos.length > 0 ? compromissos.length : undefined}
        onClick={() => setOpen(true)}
      />

      {open && (
        <DashboardTableModal
          columns={columns}
          emptyMessage="Você não tem compromissos para hoje."
          iconName="fa-solid fa-calendar-check"
          onClose={() => setOpen(false)}
          rows={compromissos}
          title="Meus Compromissos"
        />
      )}
    </>
  );
};
