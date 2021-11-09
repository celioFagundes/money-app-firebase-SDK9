import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../auth";
import { serverTimestamp } from "@firebase/database";
import { Col, Row, Container } from "react-bootstrap";
const AdicionarMovimentacao = ({ salvarNovaMovimentacao }) => {
  const auth = useContext(AuthContext);
  const [movimentacaoValor, setMovimentacaoValor] = useState("");
  const [movimentacaoDescricao, setMovimentacaoDescricao] = useState("");

  const handleValor = (evt) => {
    setMovimentacaoValor(evt.target.value);
  };
  const handleDescricao = (evt) => {
    setMovimentacaoDescricao(evt.target.value);
  };

  const salvar = () => {
    if (
      !isNaN(movimentacaoValor) &&
      movimentacaoValor.search(/^[-]?\d+(\.)?\d+?$/) >= 0 &&
      movimentacaoDescricao !== ""
    ) {
      salvarNovaMovimentacao({
        descricao: movimentacaoDescricao,
        valor: parseFloat(movimentacaoValor),
        createdAt: serverTimestamp(),
      });
      setMovimentacaoDescricao("");
      setMovimentacaoValor("");
    }
  };
  return (
    <Container
      className="text-white pt-3 pb-1 my-3  rounded"
      style={{ backgroundColor: "rgba(255,255,255,0.2)", height: "140px" }}
    >
      <Row>
        <p className="text-white ">Nova Movimentação</p>
        <Col className="d-flex align-items-center justify-content-start pb-3">
          <input
            type="text"
            maxLength = {30}
            value={movimentacaoDescricao}
            onChange={handleDescricao}
            placeholder="Descrição"
            className="rounded me-2"
            style={{ border: 0, paddingLeft: "10px" ,outline: "none" }}
          />
          <input
            type="number"
            value={movimentacaoValor}
            onChange={handleValor}
            placeholder="Valor"
            className="rounded"
            style={{ border: 0, paddingLeft: "10px", outline: "none" }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button size={"sm"} onClick={salvar}>
            Adicionar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdicionarMovimentacao;
