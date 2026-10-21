import { LinkFavorite } from "../../components/LinkFavorite";
import {
  NovosPedidosAlert,
  NOVOS_PEDIDOS_ENDPOINT_PATH,
  NOVOS_PEDIDOS_FAVORITO_ID,
  NOVOS_PEDIDOS_RELATORIO_PATH,
} from '@/features/home/components/NovosPedidosAlert';
import type { Favorito } from "../../../../../types/Favorito";

type GridTemplate = {
  rows: string;
  colsTop: number[];
  colsBottom: number[];
};

const TOTAL_COLS = 4;

export const FavoritosGrid = ({
  favoritos,
  baseUrl,
}: {
  favoritos: Favorito[];
  baseUrl: string;
}) => {
  const getGridTemplate = (length: number): GridTemplate => {
    switch (length) {
      case 1:
        return {
          rows: "50% 50%",
          colsTop: [4],
          colsBottom: [],
        };

      case 2:
        return {
          rows: "50% 50%",
          colsTop: [4],
          colsBottom: [4],
        };

      case 3:
        return {
          rows: "50% 50%",
          colsTop: [2, 2],
          colsBottom: [4],
        };

      case 4:
        return {
          rows: "50% 50%",
          colsTop: [2, 2],
          colsBottom: [2, 2],
        };

      case 5:
        return {
          rows: "50% 50%",
          colsTop: [2, 1, 1],
          colsBottom: [2, 2],
        };

      case 6:
        return {
          rows: "50% 50%",
          colsTop: [1, 1, 1, 1],
          colsBottom: [2, 2],
        };

      case 7:
        return {
          rows: "50% 50%",
          colsTop: [1, 1, 1, 1],
          colsBottom: [2, 1, 1],
        };

      case 8:
        return {
          rows: "50% 50%",
          colsTop: [1, 1, 1, 1],
          colsBottom: [1, 1, 1, 1],
        };

      default:
        return {
          rows: "auto",
          colsTop: [4],
          colsBottom: [],
        };
    }
  };

  const grid = getGridTemplate(favoritos.length);
  const topCount = grid.colsTop.length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: grid.rows,
        gridTemplateColumns: `repeat(${TOTAL_COLS}, 1fr)`,
        width: "100%",
        height: 210,
        gap: 6,
      }}
    >
      {favoritos.map((fav, index) => {
        const url =
          fav.url &&
            (fav.url.startsWith("http://") || fav.url.startsWith("https://"))
            ? fav.url
            : fav.url
              ? `${baseUrl}/${fav.url}`
              : "#";

        const isTopRow = index < topCount;
        const spanArray = isTopRow ? grid.colsTop : grid.colsBottom;
        const spanIndex = isTopRow ? index : index - topCount;
        const span = spanArray[spanIndex] ?? TOTAL_COLS;

        return (
          <div
            key={fav.id}
            style={{
              gridColumn: `span ${span}`,
              display: "flex",
            }}
          >
            {fav.id === NOVOS_PEDIDOS_FAVORITO_ID ? (
              <NovosPedidosAlert
                baseUrl={baseUrl}
                endpoint={`${baseUrl}${NOVOS_PEDIDOS_ENDPOINT_PATH}`}
                to={`${baseUrl}${NOVOS_PEDIDOS_RELATORIO_PATH}`}
                title={fav.descricao || "Novos Pedidos"}
                variant="favorite"
              />
            ) : (
              <LinkFavorite
                to={url}
                iconName={fav.icone || "store"}
                title={fav.descricao}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
