import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { buscarCliente, crearPedido } from '../../../helpers/queries';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const RealizarPedido = () => {
    const [total, setTotal] = useState((localStorage.getItem("Total")))
    const [ubicacion, setubicacion] = useState()
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    const [cliente, setCliente] = useState(false)
    const [clienteDatos, setClienteDatos] = useState("")
    const [cargaCliente, setCargaCliente] = useState(false)
    
    const cargarCliente=(id)=>{
    buscarCliente(id).then((resp)=>{
        if(resp.status==200){
            setClienteDatos(resp.data)
            setCargaCliente(true)
        }else{
            Swal.fire("Error","No se encontraron datos coincidentes con el codigo ingresado.","error")
        }
    })
    }
    useEffect(() => {
        hora();
        Swal.fire({
            title: "Es cliente asociado de Mau's restobar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si!",
            cancelButtonText: "Aun no"
        }).then((result) => {
            if (result.isConfirmed) {
                setCliente(true);
            } else {
                setCliente(false);
            }
        });
    }, [])

    const registrarPedido = (pedido) => {
        pedido.estado = "Pendiente"
        pedido.cliente=clienteDatos._id
        pedido.hora=hora();
        pedido.detalle=JSON.parse(localStorage.getItem("pedido"))
        pedido.total=total
        crearPedido(pedido).then((resp)=>{
            if(resp.status==201){
            Swal.fire("Pedido realizado!","En minutos nos estaremos contanctando para avisarle cuando salga su pedido","success");
            }else{
                Swal.fire("Error","Ocurrió un error inesperado, intente nuevamente mas tarde","error")
            }
        })
    }
    const hora=()=>{
        const fecha = new Date();
        const añoActual = fecha.getFullYear();
        const mesActual = fecha.getMonth()+1;
        const diaActual = fecha.getDay()-2;
        const hora=fecha.getHours();
        const minutos=fecha.getMinutes();
        const fechaParseada=(diaActual+"/"+mesActual+"/"+añoActual+"-"+hora+":"+minutos);
        return fechaParseada
    }
    return (
        <Container>
            <h1 className='fs-1'>Realizar pedido</h1>
            <Container>
                {
                    cliente ?
                        (<>
                            <Form onSubmit={handleSubmit(cargarCliente)}>
                                <Form.Label>Código de socio</Form.Label>
                                <Form.Group className='d-flex'>
                                <Form.Control
                                    type='text'
                                    disabled={(cargaCliente)}
                                    placeholder="Ingrese un nombre de usuario"
                                    {...register('_id', {
                                        required: "El nombre es obligatorio"
                                        , minLength: {
                                            value: 2,
                                            message: "Debe tener mas de 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Debe tener menos de 25 caracteres"
                                        }
                                    })}
                                />
                                <Button variant='warning'className='ms-1' type='submit'>Cargar</Button>
                                </Form.Group>
                            </Form>
                            {cargaCliente ?
                                (<>{/* Aqui cuando se cargan los datos del cliente */}
                                <h2 className='fs-2 text-center'>Datos de envío</h2>
                                    <Form onSubmit={handleSubmit(registrarPedido)}>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type='text'
                                            disabled="true"
                                            
                                            value={clienteDatos.nombre}
                                        />
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control
                                            type='text'
                                            disabled="true"
                                            
                                            value={clienteDatos.telefono}
                                            
                                        />
                                        <Form.Label>Direccion</Form.Label>
                                        <Form.Control
                                            type='text'
                                            disabled="true"
                                            
                                            value={clienteDatos.direccion}
                                        />
                                        <h2 className='fs-2 text-center'>Datos del pedido</h2>
{/*                                         <Form.Label>Forma de pago</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Ingrese un nombre de usuario"
                                            {...register('nombre', {
                                                required: "El nombre es obligatorio"
                                                , minLength: {
                                                    value: 2,
                                                    message: "Debe tener mas de 2 caracteres"
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: "Debe tener menos de 25 caracteres"
                                                }
                                            })}
                                        />
                                        <Form.Label>Aclaraciones:</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Ingrese un nombre de usuario"
                                            {...register('nombre', {
                                                required: "El nombre es obligatorio"
                                                , minLength: {
                                                    value: 2,
                                                    message: "Debe tener mas de 2 caracteres"
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: "Debe tener menos de 25 caracteres"
                                                }
                                            })}
                                        /> */}
                                        <Form.Label>Total: {total}</Form.Label>
                                        <Button type="submit" variant="primary">Realizar Pedido!</Button>
                                    </Form>
                                </>) : (<>{/* Aqui no se hace nada */}</>)
                            }
                        </>) : (<>
                            {/* NO clientes */}
                            <Form onSubmit={handleSubmit(registrarPedido)}>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type='text'
                                    disabled="true"
                                    
                                    placeholder="Ingrese un nombre de usuario"
                                    {...register('nombre', {
                                        required: "El nombre es obligatorio"
                                        , minLength: {
                                            value: 2,
                                            message: "Debe tener mas de 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Debe tener menos de 25 caracteres"
                                        }
                                    })}
                                />
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Ingrese un nombre de usuario"
                                    {...register('nombre', {
                                        required: "El nombre es obligatorio"
                                        , minLength: {
                                            value: 2,
                                            message: "Debe tener mas de 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Debe tener menos de 25 caracteres"
                                        }
                                    })}
                                />
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Ingrese un nombre de usuario"
                                    {...register('nombre', {
                                        required: "El nombre es obligatorio"
                                        , minLength: {
                                            value: 2,
                                            message: "Debe tener mas de 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Debe tener menos de 25 caracteres"
                                        }
                                    })}
                                />
                                <Form.Label>Forma de pago</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Ingrese un nombre de usuario"
                                    {...register('nombre', {
                                        required: "El nombre es obligatorio"
                                        , minLength: {
                                            value: 2,
                                            message: "Debe tener mas de 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Debe tener menos de 25 caracteres"
                                        }
                                    })}
                                />
                                <Form.Label>Aclaraciones:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Ingrese un nombre de usuario"
                                    {...register('nombre', {
                                        required: "El nombre es obligatorio"
                                        , minLength: {
                                            value: 2,
                                            message: "Debe tener mas de 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Debe tener menos de 25 caracteres"
                                        }
                                    })}
                                />
                                <Form.Label>Total: {total}</Form.Label>
                                <Button type="submit" variant="primary">Realizar Pedido!</Button>
                            </Form>
                        </>)
                }
            </Container>
        </Container >
    );
};

export default RealizarPedido;