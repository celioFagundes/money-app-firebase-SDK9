import React, { useContext } from "react";
import { Row, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDatabase } from "../../database";
import { AuthContext } from "../../auth";

const Meses = () => {
  const auth = useContext(AuthContext);
  const data = useDatabase("/meses/");

  return (
    <Container>
      <Row>
        <Table  hover className="mt-4 text-white" >
          <thead style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
            <tr>
              <th>Mês</th>
              <th>Previsão entrada</th>
              <th>Entrada</th>
              <th>Previsão Saida</th>
              <th>Saída</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
            {data &&
              Object.keys(data).map((mes) => (
                <tr key={mes} style={{ borderTop : 'hidden' }} >
                  <td >
                    <Link
                      to={"/movimentacoes/" + mes}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      {mes}
                    </Link>
                  </td>
                  <td >
                    {"R$ " + data[mes].previsao_entrada.toLocaleString("pt-br")}
                  </td>
                  <td>{"R$ " + data[mes].entradas.toLocaleString("pt-br")}</td>
                  <td>
                    {"R$ " + data[mes].previsao_saida.toLocaleString("pt-br")}
                  </td>
                  <td>{"R$ " + data[mes].saidas.toLocaleString("pt-br")}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Meses;
