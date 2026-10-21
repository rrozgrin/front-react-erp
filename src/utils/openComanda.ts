import type { Usuario } from "../context/UsuarioContext";

export function openComandaAPPReact(usuario: Usuario | null) {
  if (!usuario) return;

  const session = {
    login: usuario.login_usuario,
    password: usuario.senha_usuario,
    login_master: usuario.login_master,
    id_cadastro: usuario.id_cadastro,
    token: "token_invalido",
    exibe_tutorial: usuario.exibeTutorialComanda
  };

  const origin = window.location.origin;

  const isProd =
    origin === "https://www.webcontrolempresas.com.br" ||
    origin === "https://webcontrolempresas.com.br";

  if (isProd) {
    document.cookie =
      "session_comanda=" +
      encodeURIComponent(JSON.stringify(session)) +
      "; domain=.webcontrolempresas.com.br; path=/";

    window.location.href = "https://comanda.webcontrolempresas.com.br/";
  } else {
    document.cookie =
      "session_comanda=" +
      encodeURIComponent(JSON.stringify(session)) +
      "; domain=localhost; path=/comanda";

    window.location.href = "https://comanda.webcontrolempresas.com.br/";
  }
}
