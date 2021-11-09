import React, {useContext } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth";

const Header = () => {
  const auth = useContext(AuthContext);
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
          <Button onClick={auth.userSignOut} variant='danger'>
            Sair
          </Button>
        }
      </Container>
    </Navbar>
  );
};
export default Header;
