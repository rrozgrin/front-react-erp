import { ReactElement, useEffect, useState } from 'react';
import { IconFA } from '../../../../../common/components/Icons/IconFA';
import { Checkbox } from '../../../../../common/components/Ui';
import swal from 'sweetalert2';
import { useFavoritos } from '../../../../../context/FavoritosContext';
import {
    useFavoritosModalQuery,
    useSalvarFavoritosMutation,
    type Favorito,
    type FavoritosModalData,
} from '../../../../../hooks/favoritos/useFavoritosModal';

type ModalFavoritosProps = {
  show: boolean;
  handleClose: () => void;
};

export const ModalFavoritos = ({ show, handleClose }: ModalFavoritosProps): ReactElement | null => {
  const [favoritos, setFavoritos] = useState<Record<string, Favorito[]>>({});
  const [selecionados, setSelecionados] = useState<Favorito[]>([]);
  const { carregarFavoritosCliente } = useFavoritos();
  const { data } = useFavoritosModalQuery(show);
  const { mutate: salvarFavoritosCliente } = useSalvarFavoritosMutation();

  const segmentos: Record<string, string> = {
    '1': 'Administrar e Configurar',
    '2': 'Comercial e Financeiro',
    '3': 'Consultar e Localizar',
    '4': 'Negativar e Receber',
    '5': 'Crescimento Empresarial',
    '6': 'Comércio Online',
  };

  useEffect(() => {
    const modalData = data as FavoritosModalData;
    setFavoritos(modalData.favoritos);
    setSelecionados(modalData.selecionados);
  }, [data]);

  const salvarFavoritos = () => {
    if (selecionados.length === 0) return;

    salvarFavoritosCliente(selecionados.map(f => f.id))
      .then(async () => {
        await carregarFavoritosCliente();

        swal.fire({
          title: 'Sucesso!',
          text: 'Favoritos salvos com sucesso!',
          icon: 'success',
        });

        handleClose();
      })
      .catch(err => {
        swal.fire({
          title: 'Erro',
          text: err.message || 'Erro ao salvar favoritos',
          icon: 'error',
        });
      });
  };

  const toggleSelecionado = (fav: Favorito) => {
    const jaSelecionado = selecionados.some(f => f.id === fav.id);

    if (jaSelecionado) {
      setSelecionados(prev => prev.filter(f => f.id !== fav.id));
    } else {
      if (selecionados.length >= 8) return; // máximo de 8
      setSelecionados(prev => [...prev, fav]);
    }
  };

  const isSelecionado = (id: string) => selecionados.some(f => f.id === id);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: '#fff',
          padding: 24,
          borderRadius: 8,
          width: '90%',
          height: '90%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: -0,
            right: 20,
            background: 'none',
            border: 'none',
            fontSize: 35,
            cursor: 'pointer',
          }}
        >
          ×
        </button>

        <h3 style={{ top: 12, marginBottom: 25, fontSize: 20, fontWeight: 600 }}>
          <IconFA iconName="fa-solid fa-star" className="me-2" fontSize={19} /> Favoritos
        </h3>

        <div style={{ display: 'flex', flex: 1, gap: 20, minHeight: 0 }}>
          {/* Lado Esquerdo — Lista de todos os favoritos agrupados */}
          <div
            style={{
              flex: 2,
              overflowY: 'auto',
              paddingRight: 10,
              borderRight: '1px solid #dee2e6',
              maxHeight: '100%',
              minHeight: 0,
            }}
          >
            {Object.entries(favoritos).map(([segmento, items]) => (
              <div
                key={segmento}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '14px',
                  background: '#f8f9fa',
                  borderRadius: 8,
                  padding: '18px 12px',
                  marginBottom: 20,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                }}
              >
                <p style={{ gridColumn: '1 / -1', fontWeight: 600 }}>{segmentos[segmento] || `Segmento ${segmento}`}</p>

                {items.map(fav => (
                  <label
                    key={fav.id}
                    htmlFor={`fav-${fav.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: '#fff',
                      borderRadius: 6,
                      padding: '8px 12px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                      cursor: selecionados.length >= 8 && !isSelecionado(fav.id) ? 'not-allowed' : 'pointer',
                      opacity: selecionados.length >= 8 && !isSelecionado(fav.id) ? 0.5 : 1,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    <Checkbox
                      id={`fav-${fav.id}`}
                      value={fav.id}
                      checked={isSelecionado(fav.id)}
                      disabled={selecionados.length >= 8 && !isSelecionado(fav.id)}
                      onChange={() => toggleSelecionado(fav)}
                      style={{
                        accentColor: '#ffc107',
                        width: 14,
                        height: 14,
                        cursor: 'pointer',
                      }}
                    />
                    {fav.descricao}
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* Lado Direito — Selecionados */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              background: '#f8f9fa',
              borderRadius: 8,
              padding: 16,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <p style={{ fontWeight: 500, fontSize: 15, marginBottom: 10 }}>Selecionados ({selecionados.length}/8):</p>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {selecionados.map(fav => (
                <li
                  key={fav.id}
                  style={{
                    background: '#fff',
                    padding: '8px 12px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    fontSize: 13,
                  }}
                >
                  <span>
                    <IconFA iconName="fa-solid fa-star" style={{ color: '#ffc107', marginRight: 6 }} />
                    {fav.descricao}
                  </span>
                  <button
                    onClick={() => toggleSelecionado(fav)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      fontSize: 14,
                      cursor: 'pointer',
                      color: '#dc3545',
                    }}
                    title="Remover"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
              <button
                onClick={salvarFavoritos}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#ffc107',
                  color: '#000',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
