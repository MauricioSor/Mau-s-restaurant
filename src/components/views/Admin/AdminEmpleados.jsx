import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Modal, Spinner, Table, Form } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Empleados from './Empleados';
import { listarUsuarios, modificarUsuario } from '../../helpers/queries';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const AdminEmpleados = () => {
    const [empleados, setEmpleados] = useState([])
    const [empleado, setEmpleado] = useState("")
    const [spinner, setSpinner] = useState(true)
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        listarUsuarios().then((resp) => {
            console.log(resp);
            if (resp.status == 200) {
                setSpinner(false)
                setEmpleados(resp.data)
            } else {
                return (Swal.fire("Error", "Ocurrió un error al conectar con el servidor. Intente nuevamente luego", "error"))
            }
        })
    }, [])
    const detallesEmpleado = (empleado) => {
        setEmpleado(empleado)
    }
    const modificarEmpleado = (empleado) => {
        modificarUsuario().then((resp)=>{
            if(resp.status==201){
                Swal.fire("success","Modificado exitosamente","success")
            }else{
                Swal.fire("error","Error al modificar,intente nuevamente mas tarde","error")
            }
    })
    }
    return (
        <Container>
            <Container className='d-flex justify-content-between my-5'>
                <h1>Administrar Empleados</h1>
                <Link className="btn btn-primary" to="/administrador/Registro" >Registrar empleado</Link>
            </Container>
            {spinner ?
                <Container className='d-flex justify-content-center align-items-center'>
                    <Spinner variant='primary' />
                </Container> :
                <>
                    <Table responsive striped bordered hover className="text-center">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Contraseña</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                empleados.map((item, index) => (
                                    <Empleados key={index} item={item} handleShow={handleShow} detallesEmpleado={detallesEmpleado} />
                                ))
                            }
                        </tbody>
                    </Table>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Modificar Empleado</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit(modificarEmpleado)}>
                                <Form.Group>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={empleado.nombre}
                                        {...register("nombre", {
                                            require: "true"
                                        })
                                        }
                                    />
                                    <Form.Text className="text-danger">
                                        {errors.nombre?.message}
                                    </Form.Text>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={empleado.email}
                                        {...register("email", {
                                            require: "true"
                                        })
                                        }
                                    />
                                    <Form.Text className="text-danger">
                                        {errors.email?.message}
                                    </Form.Text>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={empleado.contraseña}
                                        {...register("contraseña", {
                                            require: "true"
                                        })
                                        }
                                    />
                                    <Form.Text className="text-danger">
                                        {errors.contraseña?.message}
                                    </Form.Text>
                                </Form.Group>
                                <Button type='submit' variant='primary'>Guardar cambios</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            }
        </Container>
    );
};

export default AdminEmpleados;