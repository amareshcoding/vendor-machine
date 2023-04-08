import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavbarComponent = () => {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('employee'));
    setLoggedInUser(res.employee);
  }, []);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/machine">VENDER MACHINE</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">DASHBOARD</Nav.Link>
            <Nav.Link href="/failedtransactions">FAILED TRANSACTIONS</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#features">
              Hi {loggedInUser?.employeeName}
            </Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
