import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Button, Modal, Table, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fila1 } from '../../../Mesas';
import Mesas from './Mesas';
import { useForm } from 'react-hook-form';
import { listarMesas, modificarMesa } from '../../../helpers/queries';
import Swal from 'sweetalert2';

const AdminMesas = () => {
    const [estado, setEstado] = useState("Libre")
    const [show, setShow] = useState(false);
    const [carga, setCarga] = useState(false)
    const [mesas, setMesas] = useState()
    const [spinner, setSpinner] = useState(false)
    const [estadoMesa, setEstadoMesa] = useState("")
    const [datosMesa, setDatosMesa] = useState("")
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleClose = () => {
        reset()
        setShow(false)
        setDatosMesa("")
        setCarga(false)
    }
    const handleEstado = (estado) => setEstadoMesa(estado);
    const handleShow = () => (reset(), setShow(true));
    const mostrarDatos = (mesa) => {
        setDatosMesa(mesa)
        setEstadoMesa(mesa.estado)
        setCarga(true)
        handleShow()
    }
    const modificarDatos = (mesa) => {
        if (mesa.estado == "Libre") {
            mesa.total=""
            mesa.pago = ""
        }
        modificarMesa(mesa).then((resp) => {
            handleClose();
            if (resp.status == 201) {
                Swal.fire("Exito", "Modificacion exitosa", "success")
                setSpinner(false)
                cargarMesas();
            }
        })
    }
    const cargarMesas = async () => {
        listarMesas().then((resp) => {
            if (resp.status == 200) {
                setMesas(resp.data)
                setSpinner(true)
            }
        })
    }
    useEffect(() => {
        cargarMesas()
    }, [])
    return (
        <>
            <Container>
                <h1>Mesas del salon</h1>
                <Link className='btn btn-primary' to={"/Usuario/Mesas/RegistrarVenta"}>Registrar venta</Link>
                <Container fluid className='bg-secondary py-1'>
                    <Row>
                        {
                            spinner ?
                                (
                                    mesas.map((item, index) => (
                                        <Mesas item={item} index={index} mostrarDatos={mostrarDatos} />
                                    ))
                                ) : (
                                    <></>
                                )
                        }
                    </Row>
                </Container>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Mesa {datosMesa._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        carga ?
                            (
                                <>
                                    <Form onSubmit={handleSubmit(modificarDatos)}>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                className='d-none'
                                                defaultValue={datosMesa._id}
                                                {...register("_id")}
                                            />
                                            <Form.Label>Estado</Form.Label>
                                            <Form.Select
                                                {...register("estado", {
                                                    required: "El campo debe tenerun nombre"
                                                })} onChange={(e) => handleEstado(e.target.value)}>
                                                <option value="Libre">Libre</option>
                                                <option value="Ocupado">Ocupado</option>
                                                <option value="Reservado">Reservado</option>
                                            </Form.Select>
                                            {
                                                estadoMesa !== "Libre" ?
                                                    (<>
                                                        <Form.Label>Forma de pago</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            defaultValue={datosMesa.pago}
                                                            {...register("pago", {
                                                                required: "El campo debe tenerun nombre"
                                                            })
                                                            }
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {errors.pago?.message}
                                                        </Form.Text>
                                                        <Form.Label>Total</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            defaultValue={datosMesa.total}
                                                            {...register("total", {
                                                                required: "El campo debe tener un rol"
                                                            })
                                                            }
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {errors.total?.message}
                                                        </Form.Text>
                                                    </>) :
                                                    <></>
                                            }
                                        </Form.Group>
                                        <Button type='submit' variant='primary'>Guardar cambios</Button>
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

export default AdminMesas;