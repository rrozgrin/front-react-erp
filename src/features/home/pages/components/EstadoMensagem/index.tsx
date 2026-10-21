import { IconFA } from "../../../../../common/components/Icons/IconFA";

interface Props {
  icon: string;
  mensagem: string;
}

export const EstadoMensagem = ({ icon, mensagem }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        color: "var(--color-secondary, var(--bs-primary))",
        fontSize: 16,
        background: "#f7f9fc",
        borderRadius: 6,
        border: "1px dashed #d1d5db",
        gap: 12,
      }}
    >
      <IconFA iconName={icon} style={{ fontSize: 40 }} />

      <span style={{ textAlign: "center", padding: "0 20px" }}>
        {mensagem}
      </span>
    </div>
  );
};
