// src/context/PermissoesContext.tsx
import React, { createContext, useContext } from "react";
import { usePermissoesQuery } from "../hooks/permissoes/usePermissoesQuery";

interface PermissoesContextType {
  permissoes: string[];
  hasPermissao: (id: string) => boolean;
}

const PermissoesContext = createContext<PermissoesContextType>({
  permissoes: [],
  hasPermissao: () => false,
});

export const PermissoesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: permissoes } = usePermissoesQuery();

  const hasPermissao = (id: string) => permissoes.includes(id);

  return (
    <PermissoesContext.Provider value={{ permissoes, hasPermissao }}>
      {children}
    </PermissoesContext.Provider>
  );
};

export const usePermissoes = () => useContext(PermissoesContext);
