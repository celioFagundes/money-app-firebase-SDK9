import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Form, Container, Col, Row, Button, Card } from "react-bootstrap";
import { AuthContext } from "../../auth";

const SignIn = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (field) => (evt) => {
    setForm({
      ...form,
      [field]: evt.target.value,
    });
  };
  if (auth.user !== null) {
    return <Navigate to="/" />;
  }
  return (
    <Container classNameName=" pt-3">
      <Row>
        <Col>
          <Col className="mx-auto" lg={3} md={7} sm={9}>
            <Card className=" border-0 shadow rounded-3 my-5">
              <Card.Body className=" p-4 p-sm-5">
                <Card.Title className="text-center mb-5 fw-light fs-5 ">
                  Entrar
                </Card.Title>
                <Form>
                  <div className="form-floating mb-3">
                    <Form.Control
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={onChange("email")}
                    />
                    <Form.Label for="floatingInput">Email </Form.Label>
                  </div>
                  <div className="form-floating mb-3">
                    <Form.Control
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={form.password}
                      onChange={onChange("password")}
                    />
                    <Form.Label for="floatingPassword">Senha</Form.Label>
                  </div>
                  <div className="d-grid">
                    <Button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="button"
                      onClick={() =>
                        auth.userSignIn.signIn(form.email, form.password)
                      }
                    >
                      Entrar
                    </Button>
                  </div>
                  <p>
                    Nao possui uma conta?{" "}
                    <Link to="/criarconta">Criar uma conta</Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
export default SignIn;
