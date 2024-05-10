import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import { listarComprobantes } from '../../../helpers/queries';
import Swal from 'sweetalert2';
import Venta from "./Venta"

const InformeVentas = () => {
    const [spinner, setspinner] = useState(false)
    const [carga, setCarga] = useState(false)
    const [comprobantes, setcomprobantes] = useState("")
    const [comprobanteDatos, setComprobanteDatos] = useState("")
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
        setComprobanteDatos("")
        setCarga(false)
    }
    const handleShow = () => (setShow(true));
    const cargarComprobantes = () => {
        listarComprobantes().then((resp) => {
            if (resp.status = 200) {
                setcomprobantes(resp.data)
                setspinner(true)
            } else {
                Swal.fire("error", "", "error")
            }
        })
    }
    const cargarComprobante = (item) => {
        setComprobanteDatos(item)
        setCarga(true)
        handleShow();
    }
    useEffect(() => {
        cargarComprobantes();
    }, [])
    return (
        <>
            <Container>
                <h1>Informe de ventas realizadas</h1>
                {
                    spinner ? (
                        <Table responsive striped bordered hover className="text-center">
                            <thead>
                                <tr>
                                    <td>Id</td>
                                    <td>Cliente</td>
                                    <td>Total</td>
                                    <td>Pago</td>
                                    <td>Mesa</td>
                                    <td>Empleado</td>
                                    <td>Acciones</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    comprobantes.map((item, index) => (
                                        <Venta item={item} cargarComprobante={cargarComprobante} key={index} />
                                    ))
                                }
                            </tbody>
                        </Table>
                    ) : <></>
                }
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comprobante {comprobanteDatos._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        carga ?
                            (
                                <>
                                    <Form className='d-flex flex-column'>
                                        <Form.Group>
                                            <Form.Label>Cliente</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={comprobanteDatos.cliente.nombre}
                                            />
                                            <Form.Label>Nro. de socio</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={comprobanteDatos.cliente._id}
                                            />
                                            <Form.Label>Detalle</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={comprobanteDatos.detalle}
                                            />
                                            <Form.Label>Total</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={comprobanteDatos.total}
                                            />
                                            <Form.Label>Pago</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className='d-none'
                                                defaultValue={comprobanteDatos.pago}
                                            />
                                            <Form.Label>Mesa</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={comprobanteDatos.total}
                                            />
                                            <Form.Label>Empleado</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={comprobanteDatos.usuario._id}
                                            />
                                        </Form.Group>
                                        <Button className='mt-2 text-center' onClick={() => handleClose()} variant='danger'>Cerrar</Button>
                                    </Form>
                                </>
                            ) :
                            <></>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default InformeVentas;