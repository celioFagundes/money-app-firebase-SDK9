import React, {useContext } from "react";
import { Container, Navbar, Button ,Row,Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth";

const Header = () => {
  const auth = useContext(AuthContext);
  const [userName] = auth.user ? auth.user.email.split('@') : 'UserName'
  
  
  return (
    <Navbar
      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
      expand="md"
      fixed
    >
      <Container>
        <Navbar.Brand as={Link} to='/' className='text-white'>
          MyMoney
        </Navbar.Brand>

        {auth.user && 
          <Row>
            <Col>
              <span className ='text-white me-3'>{userName}</span>
              <Button onClick={auth.userSignOut} variant='danger' size = {'sm'}>
                Sair
              </Button>
            </Col>
          </Row>
        }
      </Container>
    </Navbar>
  );
};
export default Header;
