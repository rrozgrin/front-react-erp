import React from "react";
import ContatoLogin from "../../../Modals/Login/ContatoLogin";
import QueroSerCliente from "../../../Modals/Login/QueroSerCliente";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ApiError } from "../../../services/apiClient";
import { useLoginMutation } from "../hooks/useLoginMutation";
import {
    ClientButton,
    ErrorMessage,
    FieldWrap,
    Footer,
    FooterLine,
    FooterLink,
    FormFields,
    FormSection,
    LoginPanel,
    Logo,
    PageColumn,
    PageShell,
    PasswordFieldWrap,
    QuickLinkAnchor,
    QuickLinkButton,
    QuickLinksRow,
    QuickLinksWrap,
    SubmitButton,
    Subtitle,
    TextInput,
    Title,
    TogglePasswordButton,
} from "./styled";

const QUICK_LINKS = [
  {
    label: "Site",
    href: "https://www.webcontrolempresas.com.br/site/",
    type: "external",
  },
  {
    label: "Seja franqueado",
    href: "https://www.webcontrolempresas.com.br/site/#seja-um-franqueado",
    type: "external",
  },
  { label: "Suporte", href: "/suporte", type: "internal" },
  { label: "Contato", type: "modal" },
];

const logo = "/logo-webcontrol.png";
const bg = "/bg-login-webcontrol.jpg";

function LoginPage() {
  const [openContactModal, setOpenContactModal] = React.useState(false);
  const [openClientModal, setOpenClientModal] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [codigo, setCodigo] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState("");
  const { mutate: login } = useLoginMutation();

  const handleInternalNavigation = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const renderQuickLinks = () => (
    <QuickLinksRow>
      {QUICK_LINKS.map((item) =>
        item.type === "external" ? (
          <QuickLinkAnchor
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label}
          </QuickLinkAnchor>
        ) : (
          <QuickLinkButton
            key={item.label}
            type="button"
            onClick={
              item.type === "internal"
                ? () => handleInternalNavigation(item.href || "")
                : () => setOpenContactModal(true)
            }
          >
            {item.label}
          </QuickLinkButton>
        )
      )}
    </QuickLinksRow>
  );

  return (
    <PageShell $backgroundImage={bg}>
      <PageColumn>
        <LoginPanel>
          <QuickLinksWrap>{renderQuickLinks()}</QuickLinksWrap>

          <Logo src={logo} alt="Logo Web Control" />

          <FormSection>
            <Title>Seja bem-vindo empresário</Title>
            <Subtitle>Insira seu código e senha para acessar o sistema.</Subtitle>

            <FormFields>
              <FieldWrap>
                Código
                <TextInput
                  value={codigo}
                  onChange={(event) => setCodigo(event.target.value)}
                />
              </FieldWrap>
              <PasswordFieldWrap>
                <FieldWrap>
                  Senha
                  <TextInput
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  />
                </FieldWrap>
                <TogglePasswordButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEye size={18} />
                  ) : (
                    <FaRegEyeSlash size={18} />
                  )}
                </TogglePasswordButton>
              </PasswordFieldWrap>
              <SubmitButton
                type="button"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </SubmitButton>
              {erro ? <ErrorMessage>{erro}</ErrorMessage> : null}
              <ClientButton
                type="button"
                onClick={() => setOpenClientModal(true)}
              >
                Quero ser cliente →
              </ClientButton>
            </FormFields>
          </FormSection>

          <Footer>
            <FooterLine>
              Todos os Direitos Reservados - Web Control Empresas
            </FooterLine>
            <FooterLine>
              © 2026 Desenvolvido por{" "}
              <FooterLink
                href="https://www.webcontrolempresas.com.br/site/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Web Control Empresas
              </FooterLink>
            </FooterLine>
            <FooterLine>41 3207-1744</FooterLine>
          </Footer>
        </LoginPanel>
      </PageColumn>

      <ContatoLogin
        open={openContactModal}
        onClose={() => setOpenContactModal(false)}
      />
      <QueroSerCliente
        open={openClientModal}
        onClose={() => setOpenClientModal(false)}
      />
    </PageShell>
  );

  async function handleLogin() {
    try {
      setLoading(true);
      setErro("");

      await login({ codigo, senha });

      window.history.pushState({}, "", "/home");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        setErro("Login ou senha inválidos.");
      } else {
        setErro("Erro ao autenticar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }
}

export default LoginPage;
