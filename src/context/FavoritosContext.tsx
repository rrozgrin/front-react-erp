import { createContext, useContext, useState, useEffect } from "react";

type Favorito = {
    id: string;
    descricao: string;
    segmento_url: string;
    icone?: string;
    url?: string;
};

type FavoritosContextType = {
    favoritos: Favorito[];
    carregarFavoritosCliente: () => Promise<void>;
};

const FavoritosContext = createContext<FavoritosContextType>({
    favoritos: [],
    carregarFavoritosCliente: async () => {},
});

export const useFavoritos = () => useContext(FavoritosContext);

export const FavoritosProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [favoritos, setFavoritos] = useState<Favorito[]>([]);

    const carregarFavoritosCliente = async () => {
        // TODO: requisições comentadas — ainda não funciona
        // try {
        //   const res1 = await fetch(`${baseUrl}/apoio/novo_inicio/Favoritos.php?action=getFavoritosCliente`, {
        //     credentials: 'include',
        //   });
        //   const json = await res1.json();
        //   let favoritosIds: string[] = [];
        //   try {
        //     const arr = JSON.parse(json.favoritos || '[]') as (string | number)[];
        //     favoritosIds = arr.map(v => String(v));
        //   } catch {
        //     favoritosIds = [];
        //   }

        //   // Agora busque os dados completos com base nesses IDs
        //   const res2 = await fetch(`${baseUrl}/apoio/novo_inicio/Favoritos.php?action=listarFavoritos`, {
        //     credentials: 'include',
        //   });
        //   const todosFavoritos: Favorito[] = await res2.json();

        //   const selecionados = todosFavoritos.filter(f => favoritosIds.includes(f.id));
        //   setFavoritos(selecionados);
        // } catch (e) {
        //   console.error('Erro ao carregar favoritos do cliente:', e);
        // }

        // --- MOCK: dados estáticos enquanto as requisições não funcionam ---
        const favoritosIds: string[] = ["1", "3"];

        const todosFavoritos: Favorito[] = [
            {
                id: "1",
                descricao: "Pedidos",
                segmento_url: "pedidos",
                icone: "thumb_down",
            },
            {
                id: "2",
                descricao: "Clientes",
                segmento_url: "clientes",
                icone: "group",
            },
            {
                id: "3",
                descricao: "Financeiro",
                segmento_url: "financeiro",
                icone: "finance",
            },
        ];

        const selecionados = todosFavoritos.filter((f) =>
            favoritosIds.includes(f.id),
        );
        setFavoritos(selecionados);
    };

    useEffect(() => {
        carregarFavoritosCliente();
    }, []);

    return (
        <FavoritosContext.Provider
            value={{ favoritos, carregarFavoritosCliente }}
        >
            {children}
        </FavoritosContext.Provider>
    );
};
