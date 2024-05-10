import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Modal, Spinner, Table, Form } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Empleados from './Empleados';
import { borrarUsuario, listarUsuarios, modificarUsuario } from '../../../helpers/queries';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import SpinnerCustom from '../../../common/SpinnerCustom';

const AdminEmpleados = () => {
    const [empleados, setEmpleados] = useState([])
    const [empleado, setEmpleado] = useState("");
    const [spinner, setSpinner] = useState(true)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [show, setShow] = useState(false);
    const [carga, setCarga] = useState(false)
    
    const handleClose = () => {
        reset()
        setEmpleado("")
        setShow(false)
        setCarga(false)
    }
    const handleShow = () => (reset(), setShow(true));
    const cargarUsuarios=()=>{
        listarUsuarios().then((resp) => {
            if (resp.status == 200) {
                setSpinner(false)
                setEmpleados(resp.data)
            } else {
                return (Swal.fire("Error", "Ocurrió un error al conectar con el servidor. Intente nuevamente luego", "error"))
            }
        })
    }
    useEffect(() => {
        setEmpleado(true)
        cargarUsuarios();
    }, [])
    const detallesEmpleado = (empleado) => {
        setEmpleado(empleado)
        setCarga(true)
    }
    const borrar = (item) => {
        borrarUsuario(item).then((resp) => {
            if (resp.status == 201) {
                Swal.fire("Borrado exitoso", "", "success")
                setSpinner(true)
                listarUsuarios().then((resp) => setEmpleados(resp.data));
                setSpinner(false)
            } else {
                Swal.fire("Ocurrió un error", "Intente nuevamente mas tarde", "error")
            }
        })
    }
    const modificarEmpleado = (empleado) => {
        modificarUsuario(empleado).then((resp) => {
            if (resp.status == 201) {
                setSpinner(true)
                listarUsuarios().then((resp) => setEmpleados(resp.data));
                setSpinner(false)
                handleClose();
                Swal.fire("Modificado exitosamente", "", "success")
                cargarUsuarios();
                setEmpleado("")
            } else {
                Swal.fire("error", "Error al modificar,intente nuevamente mas tarde", "error")
            }
        })
    }
    return (
        <Container>
            <Container className='d-flex justify-content-between my-5'>
                <h1>Administrar Empleados</h1>
                <Link className="btn btn-primary text-center align-self-center" to="/administrador/Registro" >Registrar empleado</Link>
            </Container>
            {spinner ?
                <SpinnerCustom />:
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
                                    <Empleados key={index} borrar={borrar} item={item} handleShow={handleShow} detallesEmpleado={detallesEmpleado} />
                                ))
                            }
                        </tbody>
                    </Table>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modificar Empleado</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                carga ?
                                    (
                                        <>
                                            <Form className='d-flex flex-column' onSubmit={handleSubmit(modificarEmpleado)}>
                                                <Form.Group>
                                                <Form.Label>Legajo</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={empleado._id}
                                                        {...register("_id", {})}
                                                    />
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={empleado.nombre}
                                                        {...register("nombre", {
                                                            required: "El campo debe tener un nombre"
                                                        })
                                                        }
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.nombre?.message}
                                                    </Form.Text>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={empleado.email}
                                                        {...register("email", {
                                                            required: "El campo debe tener un correo"
                                                        })}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.email?.message}
                                                    </Form.Text>
                                                    <Form.Label>Contraseña</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={empleado.contraseña}
                                                        {...register("contraseña", {
                                                            required: "El campo debe tener una contraseña"
                                                        })
                                                        }
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.contraseña?.message}
                                                    </Form.Text>
                                                    <Form.Label>Rol</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={empleado.rol.nombre}
                                                        value={empleado.rol.nombre}
                                                        {...register("rol.nombre", {
                                                            required: "El campo debe tener un rol"
                                                        })
                                                        }
                                                    />
                                                    <Form.Control
                                                        type="text"
                                                        className='d-none'
                                                        defaultValue={empleado.rol._id}
                                                        {...register("rol._id", {})}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.rol?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                                <Button type='submit' className='mt-3' variant='primary'>Guardar cambios</Button>
                                            </Form>
                                        </>
                                    ) :
                                    <SpinnerCustom/>
                            }
                        </Modal.Body>
                    </Modal>
                </>
            }
        </Container>
    );
};

export default AdminEmpleados;