import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listarPedidos, listarPedidosPorEstado, modificarPedido } from '../../../helpers/queries';
import Pedido from './Pedido';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AdminPedidos = () => {
    const [pedidos, setPedidos] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [pedido, setPedido] = useState("")
    const [show, setShow] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [carga, setCarga] = useState(false)
    const [estado, setEstado] = useState("")

    const handleClose = () => {
        reset()
        setShow(false)
        setPedido("")
        setCarga(false)
    }
    const handleShow = () => (reset(), setShow(true));

    useEffect(() => {
        cargarPedidos("Pendiente")
    }, [])

    useEffect(() => {
        if (estado !== "") {
            setSpinner(false)
            estado !== "Todos" ? cargarPedidos(estado) : cargarTodos();
        } else {
            <></>
        }
    }, [estado])

    const cargarPedidos = (estado) => {
        listarPedidosPorEstado(estado).then((resp) => {
            if (resp.status == 200) {
                setPedidos(resp.data)
                setSpinner(true)
            }
        })
    }
    const cargarTodos = () => {
        listarPedidos().then((resp) => {
            if (resp.status == 200) {
                setPedidos(resp.data)
                setSpinner(true)
            }
        })
    }
    const cargarPedido = (pedido, detalle) => {
        pedido.detalle.nombres = detalle
        setPedido(pedido)
        setCarga(true)
        handleShow();
    }
    const filtrarEstado = (estado) => {
        setEstado(estado)
        setSpinner(false)
    }
    const cargarModificacionPedido = (pedido) => {
        modificarPedido(pedido).then((resp) => {
            if (resp.status == 201) {
                handleClose()
                Swal.fire("Modificacion de pedido exitosa", "", "success")
                cargarTodos();
            } else {
                Swal.fire("Error", "Ocurrió un error al conectar con el servidor", "error")
            }
        })
    }

    return (
        <>
            <Container>
                <h1>Administrar pedidos</h1>
                <section className='text-center container d-flex align-items-center my-1'>
                    <div className=" bg-white border rounded  p-1 align-items-center ms-1 row">
                        <div className="col-md-auto">
                            <p className='text-black my-auto text-end'>Estado: </p>
                        </div>
                        <div className="col-md-auto bg-white">
                            <select className="form-control" onChange={(e) => filtrarEstado(e.target.value)}>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Enviado">Enviado</option>
                                <option value="Cancelado">Cancelado</option>
                                <option value="Todos">Todos</option>
                            </select>
                        </div>
                    </div>
                </section>
                {
                    spinner ? (
                        <Table responsive striped bordered hover className="text-center">
                            <thead>
                                <tr>
                                    <th>Estado</th>
                                    <th>Cliente</th>
                                    <th>Dirección</th>
                                    <th>Detalle</th>
                                    <th>Contacto</th>
                                    <th>Monto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pedidos.map((item, index) => (
                                        <Pedido key={index} cargarPedidos={cargarPedidos} handleShow={handleShow} cargarPedido={cargarPedido} item={item} />
                                    ))
                                }
                            </tbody>
                        </Table>
                    ) : <SpinnerCustom/>
                }
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comprobante {pedido._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            carga ?
                                (
                                    <>
                                        <Form className='d-flex flex-column' onSubmit={handleSubmit(cargarModificacionPedido)}>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    className='d-none'
                                                    defaultValue={pedido._id}
                                                    {...register("_id")}
                                                />
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    defaultValue={pedido.cliente.nombre}
                                                    {...register("nombre", {
                                                        required: "El campo debe tener un nombre"
                                                    })
                                                    }
                                                />
                                                <Form.Text className="text-danger">
                                                    {errors.nombre?.message}
                                                </Form.Text>
                                                <Form.Label>telefono</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    defaultValue={pedido.cliente.telefono}
                                                    {...register("telefono", {
                                                        required: "El campo debe tener un telefono"
                                                    })}
                                                />
                                                <Form.Text className='text-danger'>
                                                    {errors.telefono?.message}
                                                </Form.Text>
                                                <Form.Text className="text-danger">
                                                    {errors.telefono?.message}
                                                </Form.Text>
                                                <Form.Label>Detalle</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    defaultValue={pedido.detalle.nombres}
                                                />
                                                <Form.Text className='text-danger'>
                                                    {errors.nombre?.message}
                                                </Form.Text>
                                                <Form.Control
                                                    type="text"
                                                    className='d-none'
                                                    defaultValue={pedido.detalle}
                                                />
                                                <Form.Text className="text-danger">
                                                    {errors.detalle?.message}
                                                </Form.Text>
                                                <Form.Label>Total</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    defaultValue={pedido.total}
                                                    {...register("total", {
                                                        required: "El campo debe tener un total"
                                                    })
                                                    }
                                                />
                                                <Form.Text className="text-danger">
                                                    {errors.total?.message}
                                                </Form.Text>
                                            </Form.Group>
                                            <Button type='submit' variant='primary'>Guardar cambios</Button>
                                        </Form>
                                    </>
                                ) :
                                <SpinnerCustom/>
                        }
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
};

export default AdminPedidos;