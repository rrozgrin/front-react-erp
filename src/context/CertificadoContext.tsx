import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

type CertificadoContextType = {
  notCertificado: number | null; // ou boolean, dependendo do backend
  loadingCertificado: boolean;
};

const CertificadoContext = createContext<CertificadoContextType>({
  notCertificado: null,
  loadingCertificado: true,
});

export const CertificadoProvider = ({ children }: { children: ReactNode }) => {
  const [notCertificado, setNotCertificado] = useState<number | null>(null);
  const [loadingCertificado, setLoadingCertificado] = useState(true);
  const baseUrl = '/webcontrol';

  useEffect(() => {
    const fetchCertificado = async () => {
      try {
        // const res = await fetch(`${baseUrl}/apoio/novo_inicio/TemCertificado.php`, {
        //   method: "GET",
        //   credentials: "include",
        // });

        // if (!res.ok) throw new Error("Erro na resposta");

        // const data = await res.json();
        // setNotCertificado(data?.not_certificado ?? null);
        setNotCertificado(1);
      } catch (err) {
        console.error("Erro buscando certificado:", err);
        setNotCertificado(null);
      } finally {
        setLoadingCertificado(false);
      }
    };

    fetchCertificado();
  }, [baseUrl]);

  return (
    <CertificadoContext.Provider value={{ notCertificado, loadingCertificado }}>
      {children}
    </CertificadoContext.Provider>
  );
};

export const useCertificado = () => useContext(CertificadoContext);
