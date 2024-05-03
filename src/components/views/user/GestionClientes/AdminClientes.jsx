import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import Cliente from "./Cliente"
import { listarClientes } from '../../../helpers/queries';
import { useForm } from 'react-hook-form';

const AdminClientes = () => {
    const [clientes, setClientes] = useState()
    const [cliente, setCliente] = useState()
    const [spinner, setSpinner] = useState(false)
    const [carga, setCarga] = useState(false)
    const [show, setShow] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleClose = () => {
        reset()
        setShow(false)
        setCliente("")
        setCarga(false)
    }
    const handleShow = () => (reset(), setShow(true));
    useEffect(() => {
        listarClientes().then((resp) => {
            if (resp.status == 200) {
                setClientes(resp.data)
                setSpinner(true)
            }
        })
    }, [])

    const cargarCliente = (cliente) => {
        setCliente(cliente)
        setCarga(true)
        handleShow();
    }
    return (
        <Container>
            <h1>Clientes</h1>
            <hr />
            {
                spinner ? (
                    <>
                        <Table responsive striped bordered hover className="text-center">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Direccion</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clientes.map((item, index) => (
                                        <Cliente cargarCliente={cargarCliente} key={index} item={item} />
                                    ))
                                }
                            </tbody>
                        </Table>
                    </>
                ) : <></>
            }
            <Modal show={show} onHide={handleClose}>
                {carga?
                <>
                <Modal.Header closeButton>
                    <Modal.Title>Cliente {cliente._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                                <>
                                    <Form onSubmit={handleSubmit()}>
                                        <Form.Group>
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={cliente.nombre}
                                                {...register("nombre", {
                                                    required: "El campo debe tenerun nombre"
                                                })
                                                }
                                            />
                                            <Form.Text className="text-danger">
                                                {errors.nombre?.message}
                                            </Form.Text>
                                            <Form.Label>Teléfono</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={cliente.telefono}
                                                {...register("telefono", {
                                                    required: "El campo debe tener un correo"
                                                })}
                                            />
                                            <Form.Text className="text-danger">
                                                {errors.telefono?.message}
                                            </Form.Text>
                                            <Form.Label>Dirección</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={cliente.direccion}
                                                {...register("detalle", {
                                                    required: "El campo debe tener una contraseña"
                                                })
                                                }
                                            />
                                        </Form.Group>
                                        <Button type='submit' variant='primary'>Guardar cambios</Button>
                                    </Form>
                                </>
                </Modal.Body>
                </>:<></>
                }
            </Modal>
        </Container>
    );
};

export default AdminClientes;