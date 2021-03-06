import React, { useContext } from "react";
import { Row, Table, Container,Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDatabase ,useDatabaseRemove} from "../../database";
import { AuthContext } from "../../auth";

const Meses = () => {
  const auth = useContext(AuthContext);
  const data = useDatabase("/meses/");
  const [removeData, remover] = useDatabaseRemove()

  const excluirMes = id =>{
    remover('/meses/' + id)
    remover('/movimentacoes/' + id)
  }
  return (
    <Container>
      <Row>
        <Table hover className="mt-4 text-white">
          <thead>
            <tr>
              <th>Mês</th>
              <th>Previsão entrada</th>
              <th>Entrada</th>
              <th>Previsão Saida</th>
              <th>Saída</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.keys(data).map((mes) => (
                <tr key={mes}>
                  <td>
                    <Link to={"/movimentacoes/" + mes} className="link">
                      {mes}
                    </Link>
                  </td>
                  <td>
                    {"R$ " + data[mes].previsao_entrada.toLocaleString("pt-br")}
                  </td>
                  <td>{"R$ " + data[mes].entradas.toLocaleString("pt-br")}</td>
                  <td>
                    {"R$ " + data[mes].previsao_saida.toLocaleString("pt-br")}
                  </td>
                  <td>{"R$ " + data[mes].saidas.toLocaleString("pt-br")}</td>
                  <td><Button onClick = {() => excluirMes(mes)}variant = 'danger' size = {'sm'}>Excluir</Button></td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Meses;
