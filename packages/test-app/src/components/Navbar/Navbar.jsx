import React from 'react'
import { Navbar as BoostrapNavBar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <BoostrapNavBar className="mb-5" bg="dark" variant="dark">
        <Container>
        <BoostrapNavBar.Brand as={Link} to="/">Flynt</BoostrapNavBar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/users">Utilisateurs</Nav.Link>
          <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
        </Nav>
        </Container>
      </BoostrapNavBar>
    </>
  )
}

export { Navbar };
