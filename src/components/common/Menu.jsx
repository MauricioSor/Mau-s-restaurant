import React from 'react';
import { Container, Nav, Navbar, Button, Modal, Form,Row } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
const Menu = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">TusRecetas.com</Navbar.Brand>
                    <Nav className="ms-auto">
                        <NavLink className='mx-2 nav-item nav-link' end to='/'>Inicio</NavLink>
                        <NavLink className='mx-2 nav-item nav-link' end to='/Administrador'>Administrador</NavLink>
                        <NavLink className='mx-2 nav-item nav-link' end onClick={handleShow}>Login</NavLink>
                    </Nav>
                </Container>
            </Navbar>
            <Modal className='border' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title ><h3 >Inicio de Sesion</h3></Modal.Title>
                </Modal.Header>
                <Container>
                <Form>
                    <Row>
                    <Form.Group>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Ingrese Correo electronico..."
                        defaultValue="mauricio@admin.com"
                    />
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Ingrese Contraseña"
                        defaultValue="123Abcd"
                    />
                    </Form.Group>
                    </Row>
                    <Form.Group className='text-end my-2 '>
                    <Button className='mx-1' variant='danger' onClick={handleClose}>Cancelar</Button>
                    <Button className='mx-1' variant='primary' >Enviar</Button>
                    </Form.Group>
                </Form>
                </Container>
            </Modal>
        </>
    );
};

export default Menu;