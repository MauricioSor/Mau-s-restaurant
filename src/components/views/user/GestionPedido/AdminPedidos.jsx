import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listarPedidos } from '../../../helpers/queries';
import Pedido from './Pedido';
import { useForm } from 'react-hook-form';

const AdminPedidos = () => {
    const [pedidos, setPedidos] = useState([])
    const [spinner, setSpinner] = useState(true)
    const [pedido, setPedido] = useState("")
    const [show, setShow] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [carga, setCarga] = useState(false)
    const handleClose = () => {
        reset()
        setShow(false)
        setPedido("")
        setCarga(false)
    }
    const handleShow = () => (reset(), setShow(true));
    useEffect(() => {
        listarPedidos().then((resp)=>{
            if(resp.status==200){
                setPedidos(resp.data)
                setSpinner(false)
            }
        })
    }, [])
    const cargarPedido=(pedido,detalle)=>{
        pedido.detalle=detalle
        setPedido(pedido)
        setCarga(true)
        handleShow();
        
    }
    return (
        <>
            <Container>
                <h1>Administrar pedidos</h1>
                <Table>
                    <thead>
                        <tr>
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
                                <Pedido key={index} handleShow={handleShow} cargarPedido={cargarPedido} item={item} />
                            ))
                        }
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Comprobante {pedido._id}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                carga ?
                                    (
                                        <>
                                            <Form onSubmit={handleSubmit()}>
                                                <Form.Group>
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={pedido.cliente.nombre}
                                                        {...register("nombre", {
                                                            required: "El campo debe tenerun nombre"
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
                                                            required: "El campo debe tener un correo"
                                                        })}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.telefono?.message}
                                                    </Form.Text>
                                                    <Form.Label>Detalle</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={pedido.detalle}
                                                        {...register("detalle", {
                                                            required: "El campo debe tener una contraseña"
                                                        })
                                                        }
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.detalle?.message}
                                                    </Form.Text>
                                                    <Form.Label>Total</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={pedido.total}
                                                        {...register("total", {
                                                            required: "El campo debe tener un rol"
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
                                    <></>
                            }
                        </Modal.Body>
                    </Modal>
            </Container>
        </>
    );
};

export default AdminPedidos;