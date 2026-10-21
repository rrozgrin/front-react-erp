import { useState } from "react";
import {
    Modal,
    Button,
    Form,
    Row,
    Col,
    Alert,
} from "react-bootstrap";
import { IconFA } from "../../../../../common/components/Icons/IconFA";
import swal from "sweetalert2";
import styled from "styled-components";
import useBaseUrl from "../../../../../hooks/useBaseUrl";
import { PhoneInput } from "../../../../../hooks/PhoneInput";
import { useIndicarAmigoMutation } from "../../../hooks/useIndicarAmigoMutation";
const CustomModal = styled(Modal)`
  .modal-dialog {
    max-width: 600px; /* tamanho intermediário entre sm e lg */
  }
`;

export function ModalIndiqueAmigo({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {

  const baseUrl = useBaseUrl();
  const { mutate: indicarAmigo } = useIndicarAmigoMutation();

  // estados do form
  const [formData, setFormData] = useState({
    action: "indicacao",
    iptAmigoNome: "",
    iptAmigoFone1: "",
    iptAmigoFone2: "",
    quemIndicou: "",
    receber: "fatura", // fatura ou dinheiro
    funcaoEmpresa: "",
    contaBancariaTipo: "1", // 1: corrente, 2: poupanca, 3: pix
    contaBancariaBanco: "",
    contaBancariaAgencia: "",
    contaBancariaNConta: "",
    contaBancaria: "",
    contaBancariaNTitular: "",
    pix: "",
    cpf_cnpj: "cpf_cnpj",
    chave_pix: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.iptAmigoFone1 && !formData.iptAmigoFone2) {
      swal.fire({
        icon: "warning",
        title: "Por favor, preencha ao menos um telefone do amigo.",
        showConfirmButton: true,
        timer: 2000,
      });
      return;
    }

    try {
      const result = await indicarAmigo(formData);
      console.log("Resposta:", result);

      swal.fire({
        icon: "success",
        title: "Indicação enviada com sucesso! ",
        text: "Entraremos em contato com o seu indicado nas próximas 48 horas. Caso ele se afilie, você receberá seu prêmio.",
        showConfirmButton: false,
        timer: 2000,
      });
      handleClose();
    } catch (err) {
      console.error(err);
      swal.fire({
        icon: "error",
        title: "Erro ao enviar indicação. Tente novamente mais tarde.",
        showConfirmButton: true,
        timer: 2000,
      });
    }
  };

  return (
    <CustomModal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <img
          src={`${baseUrl}/view/images/banner-ganhe-uma-mensalidade.jpg`}
          style={{ width: "100%" }}
          alt="Indique e Ganhe"
          className="mb-3"
        />
        <Alert
          className="text-center"
          style={{
            backgroundColor: "#3d71a0",
            color: "#fff",
            border: "none",
          }}
        >
          <IconFA iconName="fa-solid fa-user-tie" className="me-2" style={{ color: "#fff" }} />
          (Válido para Funcionários, Balconistas, Secretárias, e outros)
        </Alert>

        <Form onSubmit={handleSubmit}>
          {/* Nome Amigo */}
          <Row className="mb-1">
            <Col md={3}>
              <Form.Label>
                <IconFA
                  iconName="fa-solid fa-pen-clip"
                  className="me-2"
                />{" "}
                Nome do Amigo:
              </Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                name="iptAmigoNome"
                value={formData.iptAmigoNome}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          {/* Telefones */}
          <Row className="mb-1">
            <Col md={3}>
              <Form.Label>
                <IconFA iconName="fa-solid fa-phone" className="me-2" /> Fone do Amigo 1
                (DDD + Telefone):
              </Form.Label>
            </Col>
            <Col md={3}>
              <PhoneInput
                name="iptAmigoFone1"
                value={formData.iptAmigoFone1}
                onChange={handleChange}
              />
            </Col>

            <Col md={3}>
              <Form.Label>
                <IconFA
                  iconName="fa-solid fa-mobile-screen-button"
                  className="me-2"
                />{" "}
                Celular do Amigo (DDD + Telefone):
              </Form.Label>
            </Col>
            <Col md={3}>
              <PhoneInput
                name="iptAmigoFone2"
                value={formData.iptAmigoFone2}
                onChange={handleChange}
              />
            </Col>
          </Row>

          {/* Quem Indicou */}
          <Row className="mb-1">
            <Col md={3}>
              <Form.Label>
                <IconFA
                  iconName="fa-solid fa-people-arrows"
                  className="me-2"
                />{" "}
                Quem Indicou?
              </Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                name="quemIndicou"
                value={formData.quemIndicou}
                onChange={handleChange}
              />
            </Col>
          </Row>

          {/* Opções de receber */}
          <Alert
            className="text-center"
            style={{
              backgroundColor: "#3d71a0",
              color: "#fff",
              border: "none",
            }}
          >
            <Row>
              <Col md={6}>
                <Form.Check
                  type="radio"
                  label="Quero abater na próxima fatura"
                  name="receber"
                  value="fatura"
                  checked={formData.receber === "fatura"}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Check
                  type="radio"
                  label="Quero R$ 100,00 em Dinheiro"
                  name="receber"
                  value="dinheiro"
                  checked={formData.receber === "dinheiro"}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Alert>

          {/* Se escolher Dinheiro → mostra os campos extras */}
          {formData.receber === "dinheiro" && (
            <>
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label>
                    <IconFA
                      iconName="fa-solid fa-clipboard-user"
                      className="me-2"
                    />{" "}
                    Sua função na empresa
                  </Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    name="funcaoEmpresa"
                    value={formData.funcaoEmpresa}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              {/* Tipo Conta */}
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label>
                    <IconFA
                      iconName="fa-solid fa-money-check-dollar"
                      className="me-2"
                    />{" "}
                    Tipo de Conta
                  </Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Check
                    inline
                    type="radio"
                    name="contaBancariaTipo"
                    value="1"
                    label="Conta Corrente"
                    checked={formData.contaBancariaTipo === "1"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    name="contaBancariaTipo"
                    value="2"
                    label="Conta Poupança"
                    checked={formData.contaBancariaTipo === "2"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    name="contaBancariaTipo"
                    value="3"
                    label="PIX"
                    checked={formData.contaBancariaTipo === "3"}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              {/* Conta bancária */}
              {formData.contaBancariaTipo !== "3" && (
                <>
                  <Row className="mb-3">
                    <Col md={3}>
                      <Form.Label>Banco</Form.Label>
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        name="contaBancariaBanco"
                        value={formData.contaBancariaBanco}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label>Agência</Form.Label>
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        name="contaBancariaAgencia"
                        value={formData.contaBancariaAgencia}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <Form.Label>N° Conta</Form.Label>
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        name="contaBancariaNConta"
                        value={formData.contaBancariaNConta}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label>CPF/CNPJ Titular</Form.Label>
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        name="contaBancaria"
                        value={formData.contaBancaria}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <Form.Label>Nome Titular</Form.Label>
                    </Col>
                    <Col md={9}>
                      <Form.Control
                        name="contaBancariaNTitular"
                        value={formData.contaBancariaNTitular}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </>
              )}

              {/* PIX */}
              {formData.contaBancariaTipo === "3" && (
                <>
                  <Row className="mb-3">
                    <Col md={3}>
                      <Form.Label>
                        <IconFA
                          iconName="fa-solid fa-key"
                          className="me-2"
                        />{" "}
                        Tipo de chave Pix
                      </Form.Label>
                    </Col>
                    <Col md={9}>
                      <Form.Check
                        inline
                        type="radio"
                        name="pix"
                        value="cpf_cnpj"
                        label="CPF/CNPJ"
                        checked={formData.pix === "cpf_cnpj"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        name="pix"
                        value="telefone"
                        label="Telefone"
                        checked={formData.pix === "telefone"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        name="pix"
                        value="email"
                        label="E-mail"
                        checked={formData.pix === "email"}
                        onChange={handleChange}
                      />
                    </Col>
                    <Row className="mb-3">
                      <Col md={3}>
                        <Form.Label>Nome Titular</Form.Label>
                      </Col>
                      <Col md={9}>
                        <Form.Control
                          name="contaBancariaNTitular"
                          value={formData.contaBancariaNTitular}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </Row>
                  <Row className="mb-3">
                    <Col md={3}>
                      <Form.Label>Chave Pix</Form.Label>
                    </Col>
                    <Col md={9}>
                      <Form.Control
                        name="chave_pix"
                        value={formData.chave_pix}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}

          <div className="text-center">
            <Button type="submit" variant="primary">
              Enviar Indicação{" "}
              <IconFA iconName="fa-solid fa-arrow-right" className="me-2" />
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ width: "100%" }}>
        <Alert variant="warning" className="mb-0" style={{ width: "100%" }}>
          <IconFA
            iconName="fa-solid fa-circle-exclamation"
            className="me-2"
          />{" "}
          Obs: Só terá validade caso o empresário indicado se afilie com a Web
          Control Empresas.
        </Alert>
      </Modal.Footer>
    </CustomModal>
  );
}
