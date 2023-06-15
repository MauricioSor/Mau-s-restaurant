import React from 'react';
import {Container,Nav,Navbar} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
const Menu = () => {
    return (
            <Navbar bg="black" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">TusRecetas.com</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink className='mx-2 nav-item nav-link' end to='/'>Inicio</NavLink>
                        <NavLink className='mx-2 nav-item nav-link' end to='/Administrador'>Administrador</NavLink>
                    </Nav>
                </Container>
            </Navbar>
    );
};

export default Menu;