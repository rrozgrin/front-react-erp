import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

export type Usuario = {
  id_cadastro: string;
  nome_usuario: string;
  nome_empresa: string;
  id_franquia: number;
  login_master: string;
  fone_franquia1?: string;
  fone_franquia3?: string;
  email: string;
  login: string;
  login_usuario: string;
  senha_usuario: string;
  franqueado: string;
  tipo_acesso: string;
  insc: string;
  exibeTutorialComanda: string;
};

type UsuarioContextType = {
  usuario: Usuario | null;
  loading: boolean;
};

const UsuarioContext = createContext<UsuarioContextType>({
  usuario: null,
  loading: true,
});

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  // const baseUrl = '/webcontrol';

  // useEffect(() => {
  //   fetch(`${baseUrl}/apoio/novo_inicio/Usuario.php`, {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Erro na resposta");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (!data?.id_cadastro) {
  //         window.location.href = baseUrl; // sem sessão → volta pro início
  //         return;
  //       }
  //       setUsuario(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Erro buscando sessão:", err);
  //       setLoading(false);
  //     });
  // }, [baseUrl]);

  useEffect(() => {
    setUsuario({
      "id_cadastro": "73",
      "nome_usuario": "FUNCIONARIO MASTER",
      "nome_empresa": "DEMONSTRATIVO T.I CURITIBA - WEB CONTROL",
      "id_franquia": 1,
      "login_master": "S",
      "fone_franquia1": "(41) 3207-1744",
      "fone_franquia3": "(41) 99937-0033",
      "email": "administrativo@webcontrolempresas.com.br",
      "senha_usuario": "1874@WELL",
      "login_usuario": "17001",
      "insc": "08745918000171",
      "franqueado": "N",
      "login": "17001",
      "tipo_acesso": "master",
      "exibeTutorialComanda": "N"
    });
    setLoading(false);
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, loading }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => useContext(UsuarioContext);
