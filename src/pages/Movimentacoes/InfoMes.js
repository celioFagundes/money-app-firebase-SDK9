import React, { useState, useContext } from "react";
import { useDatabase, useUpdateMes } from "../../database";
import { AuthContext } from "../../auth";
import { Container, Row, Col } from "react-bootstrap";

const InfoMes = ({ mes }) => {
  const auth = useContext(AuthContext);
  const dataMes = useDatabase("/meses/" + mes);
  const [inputPrevEntrada, setInputPrevEntrada] = useState("");
  const [inputPrevSaida, setInputPrevSaida] = useState("");
  const [updateStatus, updateMes] = useUpdateMes("/meses/");

  const alterarPrevisaoEntrada = () => {
    if (inputPrevEntrada !== "") {
      updateMes(mes, { previsao_entrada: inputPrevEntrada });
    }
    setInputPrevEntrada("");
  };
  const alterarPrevisaoSaida = () => {
    if (inputPrevSaida !== "") {
      updateMes(mes, { previsao_saida: inputPrevSaida });
    }
    setInputPrevSaida("");
  };
  if (!dataMes) {
    return <p>Carregando ...</p>;
  }
  return (
    <div className="text-white pt-3 pb-1 px-3 my-3 rounded" style={{ backgroundColor: "rgba(255,255,255,0.2)",height:'140px'}}>
      <Row>
        <Col>
          <p className="d-inline-block ">
            Entrada :{" R$ " + dataMes.entradas.toLocaleString("pt-br")}
          </p>
        </Col>
        <Col>
          <p className="d-inline-block ">
            Saídas :{" R$ " + dataMes.saidas.toLocaleString("pt-br")}
          </p>
        </Col>
      </Row>
      <Row>
        
        <Col>
          <p className="d-inline-block me-1">
            Previsão Entrada :
            {" R$ " + dataMes.previsao_entrada.toLocaleString("pt-br")}
          </p>
          <input
            className ='rounded'
            style = {{border:0, paddingLeft:'10px',outline: "none" }}
            type="number"
            placeholder="Nova previsão"
            onBlur={alterarPrevisaoEntrada}
            value={inputPrevEntrada}
            onChange={(evt) =>
              setInputPrevEntrada(parseFloat(evt.target.value))
            }
          />
        </Col>
        <Col>
          <p className="d-inline-block  me-1">
            Previsão saída:
            {" R$ " + dataMes.previsao_saida.toLocaleString("pt-br")}
          </p>
          <input
          className ='rounded'
          style = {{border:0, paddingLeft:'10px',outline: "none" }}
            type="number"
            value={inputPrevSaida}
            onChange={(evt) => setInputPrevSaida(parseFloat(evt.target.value))}
            placeholder="Nova previsão"
            onBlur={alterarPrevisaoSaida}
          />
        </Col>
      </Row>

    </div>
  );
};

export default InfoMes;
