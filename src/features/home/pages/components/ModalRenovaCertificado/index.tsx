import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCertificadoQuery } from '../../../hooks/useCertificadoQuery';

interface CertificadoModalProps {
  idCadastro: string;
  cnpj: string;
}

const CertificadoModal: React.FC<CertificadoModalProps> = () => {
  const [show, setShow] = useState(false);
  const [diasRestantes, setDiasRestantes] = useState<number | null>(null);
  const { data } = useCertificadoQuery();
  const getBaseUrl = () => {
    const href = window.location.href;
    if (href.includes('webcontrol.test')) {
      return 'https://webcontrol.test/webcontrol';
    } else if (href.includes('webcontrolempresas.com.br')) {
      return 'https://webcontrolempresas.com.br/webcontrol';
    } else {
      return 'http://localhost/webcontrol';
    }
  };

  const baseUrl = getBaseUrl();

  useEffect(() => {
    if (data?.dias_restantes === undefined) return;

    const dias = Number(data.dias_restantes);
    setDiasRestantes(dias);

    if (!isNaN(dias) && dias <= 10) {
      setShow(true);
    }
  }, [data]);

  const handleClose = () => setShow(false);

  return (
    <>
      {diasRestantes !== null && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body className="text-center">
            <strong style={{ fontSize: 15 }}>
              {diasRestantes <= 0
                ? 'Seu Certificado Digital está vencido!'
                : `Seu Certificado Digital expira em ${diasRestantes} dias.`}
            </strong>

            <div className="mt-3">
              <a
                href="https://dominium.gfsis.com.br/gestaofacil/publico/RealizarPedido?local=1000&indicacao=500034&idProduto=84"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${baseUrl}/view/images/banner_dominium.png`}
                  alt="Renovar Certificado"
                  style={{ border: '1px solid #DDD', borderRadius: '4px', maxWidth: '450px'}}
                />
              </a>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CertificadoModal;
