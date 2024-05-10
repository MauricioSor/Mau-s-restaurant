//#region imports
import React from 'react';
import { Container, Nav, Navbar, Button, Modal, Form, Row } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { iniciarSesion } from '../helpers/queries';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
//#endregion
const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
    //#region hooks
    const [show, setShow] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navegacion = useNavigate();
    const rol = JSON.parse(sessionStorage.getItem("rol")) || null
    //#endregion
    //#region funciones
    const enviarDatos = (usuario,e) => {
        e.preventDefault();
        iniciarSesion(usuario).then((respuesta) => {
            if (respuesta.status==200) {
                sessionStorage.setItem('usuario', JSON.stringify(respuesta.data.usuario))
                sessionStorage.setItem('rol', JSON.stringify(respuesta.data.rol.nombre))
                setUsuarioLogueado(respuesta.data)
                reset()
                respuesta.data.rol.nombre=="Admin"?navegacion('/Administrador/'):navegacion("/Usuario/")
                Swal.fire(`Bienvenido ${respuesta.data.usuario}`,"Iniciaste sesión","success")
            } else {
                Swal.fire(`Nombre de usuario o contraseña incorrectos`,"Verifique los datos e intente nuevamente","error")
            }
        });
    }
    const cerrarSesion = () => {
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('rol');
        setUsuarioLogueado();
        Swal.fire(`Sesión cerrada`,"","success")
        navegacion('/');
    }
    //#endregion
    return (
        <>
            <Navbar bg="primary" expand='md' variant="dark" expand='lg site-wrap' >
                <Container>
                    <Navbar.Brand as={Link} to="/">Mau's restobar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink className='nav-item nav-link' end to='/'>Inicio</NavLink>
                            {
                                (usuarioLogueado) ?
                                            (rol=="Admin")?
                                            <>
                                            <NavLink end className='nav-item nav-link' to='/Administrador/Empleados'>Empleados</NavLink>
                                            <NavLink end className='nav-item nav-link' to='/Administrador/'>Comidas</NavLink>
                                            <Button variant="primary" className='border' onClick={cerrarSesion}>Cerrar Sesion</Button>
                                            </>:
                                        <>
                                            <NavLink end className='nav-item nav-link' to='/Usuario/AdminClientes'>Clientes</NavLink>
                                            <NavLink end className='nav-item nav-link' to='/Usuario/Mesas'>Mesas</NavLink>
                                            <NavLink end className='nav-item nav-link' to='/Usuario/'>Pedidos</NavLink>
                                            <Button variant="primary" className='border' onClick={cerrarSesion}>Cerrar Sesion</Button>
                                        </>
                                        :
                                        <>
                                        <NavLink end className='nav-item nav-link' onClick={handleShow} >Iniciar Sesion</NavLink>
                                        <NavLink end className='nav-item nav-link' to={"/MiCarrito"} >Mi Carrito</NavLink>
                                        </>
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
                                    defaultValue="Mauricio123"
                                    {...register('contraseña', {
                                        required: 'La contraseña es obligatoria',
                                        pattern: {
                                            value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                                            message: 'La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. No puede tener otros símbolos.'
                                        }
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.contraseña?.message}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Form.Group className='text-end my-2 '>
                            <Button className='mx-1' variant='danger' onClick={handleClose}>Cancelar</Button>
                            <Button className='mx-1' variant='primary' type='submit' onClick={handleClose}>Enviar</Button>
                        </Form.Group>
                    </Form>
                </Container>
            </Modal>
        </>
    );
};

export default Menu;
