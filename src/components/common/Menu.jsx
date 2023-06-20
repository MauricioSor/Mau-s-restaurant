import React from 'react';
import { Container, Nav, Navbar, Button, Modal, Form, Row } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { iniciarSesion } from '../helpers/queries';
import { useNavigate } from 'react-router-dom'

const Menu = ({ usuarioLogueado,setUsuarioLogueado }) => {
    const [show, setShow] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const enviarDatos = (usuario) => {
        console.log(usuario);
        iniciarSesion(usuario).then((respuesta) => {
            respuesta ? (sessionStorage.setItem('usuario', JSON.stringify(respuesta)),setUsuarioLogueado(respuesta),reset(),navegacion('/Administrador')) : undefined
        });
    }
    const navegacion = useNavigate();
    const cerrarSesion = () => {
        sessionStorage.removeItem('usuario');
        setUsuarioLogueado({});
        navegacion('/');
    }
    return (
        <>
            <Navbar bg="primary" variant="dark" expand='lg'>
                <Container>
                    <Navbar.Brand as={Link} to="/">TusRecetas.com</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink className='nav-item nav-link' end to='/'>Inicio</NavLink>
                        {
                            (usuarioLogueado.id)?
                                <>
                                    <NavLink end className='nav-item nav-link' to='/administrador'>Administrador</NavLink>
                                    <Button variant="primary" className='border' onClick={cerrarSesion}>Cerrar Sesion</Button>
                                </>:<NavLink end className='nav-item nav-link' onClick={handleShow} >Iniciar Sesion</NavLink>
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal className='border' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title ><h3 >Inicio de Sesion</h3></Modal.Title>
                </Modal.Header>
                <Container>
                    <Form onSubmit={handleSubmit(enviarDatos)}>
                        <Row>
                            <Form.Group>
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese Correo electronico..."
                                    defaultValue="mauricio@admin.com"
                                    {...register('email', {
                                        required: 'El email es un dato obligatorio',
                                        pattern: {
                                            value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=? ^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a -z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                            message: 'El email debe tener el siguiente formato mail@dominio.com'
                                        }
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.email?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese Contraseña"
                                    defaultValue="123Abcde"
                                    {...register('password', {
                                        required: 'El password es obligatorio',
                                        pattern: {
                                            value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                                            message: 'El password debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. No puede tener otros símbolos.'
                                        }
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.password?.message}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Form.Group className='text-end my-2 '>
                            <Button className='mx-1' variant='danger' onClick={handleClose}>Cancelar</Button>
                            <Button className='mx-1' variant='primary' type='submit'onClick={handleClose}>Enviar</Button>
                        </Form.Group>
                    </Form>
                </Container>
            </Modal>
        </>
    );
};

export default Menu;