import React, {useRef, useContext } from "react";
import { Row, Button, Col, Alert } from "react-bootstrap";
import { useMesPush } from "../../database";
import { AuthContext } from "../../auth";
import successIcon from "../../assets/success-icon.svg";
import failureIcon from "../../assets/failure-icon.svg";

const minAno = 2017;
const maxAno = 2022;

const AdicionarMes = () => {
  const auth = useContext(AuthContext);
  const refAno = useRef();
  const refMes = useRef();
  const anos = [];
  const meses = [];
  const [saveStatus, salvarMes] = useMesPush("/meses/");

  for (let i = minAno; i <= maxAno; i++) {
    anos.push(i);
  }
  
  for (let i = 1; i <= 12; i++) {
    meses.push(i);
  }

  const zeroPad = (num) => {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  };

  const addNovoMes = () => {
    const mes = refAno.current.value + "-" + refMes.current.value;
    if (refAno.current.value !== "Ano" && refMes.current.value !== "Mes") {
      salvarMes(mes, {
        entradas: 0,
        saidas: 0,
        previsao_entrada: 0,
        previsao_saida: 0,
      });
    }
  };
  return (
    <div className="my-2 mb-0 pb-0 rounded">
      <Row xs={1} sm={1} lg={4} md={3}>
        <Col xs lg="2">
          <h1 className="h4 text-white">Adicionar mês</h1>
        </Col>
        <Col xs lg="2">
          <select
            ref={refAno}
            className="form-select"
            aria-label="Default select example"
          >
            <option hidden>Ano</option>
            {anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </Col>
        <Col xs lg="2">
          <select
            ref={refMes}
            className="form-select"
            aria-label="Default select example"
          >
            <option hidden>Mes</option>
            {meses.map(zeroPad).map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </Col>
        <Col>
          <Button onClick={addNovoMes}>Adicionar</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {saveStatus !== "" && 
            <Alert
              variant={saveStatus === "Mes adicionado" ? "success " : "danger "}
              className="d-flex align-items-center py-2  col-md-2 mt-1"
            >
              <img
                src={
                  saveStatus === "Mes adicionado" ? successIcon : failureIcon
                }
                className=" me-2"
              />
              {saveStatus}
            </Alert>
          }
        </Col>
      </Row>
    </div>
  );
};

export default AdicionarMes;
