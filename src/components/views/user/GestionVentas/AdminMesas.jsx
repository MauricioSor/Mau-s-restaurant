import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Button, Modal, Table, Col } from 'react-bootstrap';
import { Link, NavLink, Navigate } from 'react-router-dom';
import Mesas from './Mesas';
import { useForm } from 'react-hook-form';
import { listarMesas, listarUsuarios, modificarMesa } from '../../../helpers/queries';
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
        localStorage.removeItem("DatosMesa")
    }
    const handleEstado = (estado) => setEstadoMesa(estado);
    const handleShow = () => (reset(), setShow(true));
    const mostrarDatos = (mesa) => {
        setDatosMesa(mesa)
        setEstadoMesa(mesa.estado)
        localStorage.setItem("DatosMesa",JSON.stringify(mesa));
        setCarga(true)
        handleShow()
    }
    const modificarDatos = (mesa) => {
        if (mesa.estado == "Libre") {
            mesa.total = ""
            mesa.pago = ""
        }
        modificarMesa(datosMesa._id, mesa).then((resp) => {
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
        cargarMesas();
    }, [])
    return (
        <>
            <Container>
                <h1>Mesas del salon</h1>
                <Link className='btn btn-primary my-3' to={"/Usuario/Mesas/Informe"}>Informe de ventas</Link>
                <Container fluid className='bg-secondary py-1'>
                    <Row>
                        {
                            spinner ?
                                (
                                    mesas.map((item, index) => (
                                        <Mesas item={item} index={index} mostrarDatos={mostrarDatos} />
                                    ))
                                ) : (
                                    <SpinnerCustom/>
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
                                    <Form className='d-flex flex-column' onSubmit={handleSubmit(modificarDatos)}>
                                        <Form.Group>
                                            <Form.Label>Estado</Form.Label>
                                            <Form.Select
                                                {...register("estado", {
                                                    required: "El campo debe tener un estado"
                                                })} onChange={(e) => handleEstado(e.target.value)}>
                                                <option defaultValue={datosMesa.estado}>{datosMesa.estado}</option>
                                                {datosMesa.estado !== "Libre" && <option value="Libre">Libre</option>}
                                                {datosMesa.estado !== "Ocupado" && <option value="Ocupado">Ocupado</option>}
                                                {datosMesa.estado !== "Reservado" && <option value="Reservado">Reservado</option>}
                                            </Form.Select>
                                            <Form.Text className='text-danger'>
                                                {errors.estado?.message}
                                            </Form.Text>
                                            {
                                                estadoMesa == "Ocupado" ?
                                                    (<>
                                                        <Form.Label>Forma de pago</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            defaultValue={datosMesa.pago}
                                                            {...register("pago", {
                                                                required: "El campo debe tener un pago"
                                                            })
                                                            }
                                                        />
                                                        <Form.Label>Detalle</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            defaultValue={datosMesa.detalle}
                                                            {...register("detalle", {
                                                                required: "El campo debe tener el detalle cargado"
                                                            })
                                                            }
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {errors.detalle?.message}
                                                        </Form.Text>
                                                        <Form.Label>Total</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            defaultValue={datosMesa.total}
                                                            {...register("total", )
                                                            }
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {errors.total?.message}
                                                        </Form.Text>
                                                    </>) :
                                                    <></>
                                            }
                                        </Form.Group>
                                        <Container className='d-flex justify-content-end mt-4'>
                                            <Button type='submit' variant='primary'>Guardar cambios</Button>
                                            {estadoMesa == "Ocupado" ?
                                                (<NavLink  to="/Usuario/Mesas/RegistrarVenta" className="ms-2 btn btn-warning" variant='warning'>Registrar venta</NavLink>) :                                                
                                                <></>
                                            }
                                        </Container>
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