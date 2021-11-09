import React, { useState, useEffect, useContext } from "react";
import {
  useDatabase,
  useMovimentacoesPush,
  useDatabaseRemove,
  useUpdateMes,
} from "../../database";
import { AuthContext } from "../../auth";
import InfoMes from "./InfoMes";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import AdicionarMovimentacao from "./AdicionarMovimentacao";
import { Navigate ,useParams} from "react-router";
import Time from "./Time";
const Movimentacoes = () => {
  const auth = useContext(AuthContext);
  const [somaEntradas, setSomaEntradas] = useState(0);
  const [somaSaidas, setSomaSaidas] = useState(0);
  const { id: mesId} = useParams()
  const movimentacoes = useDatabase("/movimentacoes/" + mesId);

  const [saveStatus, salvarMovimentacao] = useMovimentacoesPush(
    "/movimentacoes/" + mesId
  );
  const [removeStatus, removerMovimentacao] = useDatabaseRemove(
    "/movimentacoes/" + mesId
  );
  const [updateStatus, updateMes] = useUpdateMes("/meses/");

  const salvarNovaMovimentacao = (dados) => {
    salvarMovimentacao(dados);
  };
  const remover = (id) => {
    removerMovimentacao(id);
  };

  useEffect(() => {
    let entradas = 0;
    let saidas = 0;

    if (movimentacoes) {
      Object.keys(movimentacoes).forEach((mov) => {
        if (movimentacoes[mov].valor > 0) {
          entradas += movimentacoes[mov].valor;
        } else {
          saidas += movimentacoes[mov].valor;
        }
      });
      setSomaEntradas(entradas);
      setSomaSaidas(saidas);
    }
  }, [movimentacoes]);

  useEffect(() => {
    const update = () => {
      updateMes(mesId, {
        entradas: somaEntradas,
        saidas: somaSaidas,
      });
    };
    update();
  }, [somaEntradas, somaSaidas]);

  if (auth.loading && auth.user === null) {
    return <Navigate to="/login" />;
  }
  return (
    <Container>
      <Col className="my-2 mb-0 pb-0">
        <h1 className="text-white display-6 ">{mesId}</h1>
      </Col>
      <Row>
        <Col>
          <InfoMes mes={mesId} />
        </Col>
        <Col>
          <AdicionarMovimentacao
            salvarNovaMovimentacao={salvarNovaMovimentacao}
          />
        </Col>
      </Row>
      <Table className="text-white">
        <thead>
          <tr
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderTop: "0px",
            }}
          >
            <th>Tipo</th>
            <th>Descricão</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
          {movimentacoes &&
            Object.keys(movimentacoes).map((movimentacao) => (
              <tr key={movimentacao} style={{ borderTop: "hidden" }}>
                <td>
                  {movimentacoes[movimentacao].valor > 0 ? "Entrada" : "Saída"}
                </td>
                <td>{movimentacoes[movimentacao].descricao}</td>
                <td>
                  <Time timestamp={movimentacoes[movimentacao].createdAt} />
                </td>
                <td className="ms-1">
                  {"R$ " +
                    movimentacoes[movimentacao].valor.toLocaleString("pt-br")}
                </td>
                <td>
                  <Button
                    className="ms-1"
                    size={"sm"}
                    variant="danger"
                    onClick={() => remover(movimentacao)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Movimentacoes;