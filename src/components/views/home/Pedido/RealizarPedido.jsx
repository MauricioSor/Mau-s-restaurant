import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Form ,Button} from 'react-bootstrap';
import { crearPedido } from '../../../helpers/queries';
import { useForm } from 'react-hook-form';


const RealizarPedido = () => {
    const [total, setTotal] = useState((localStorage.getItem("Total")))
    const [ubicacion, setubicacion] = useState()
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();

    useEffect(() => {
        const apikey = "AIzaSyBRf-tr_8y893XYqOMJRg5qPSUMU33o-u8&v=3.exp&libraries";
        setubicacion({
            address: "Kala Pattar Ascent Trail, Khumjung 56000, Nepal",
            position: {
                lat: 0,
                lng: 0
            }
        })

    }, [])
    const defaultPosition = {
        lat: 27.9878,
        lng: 86.9250
    };

    function handleLocationChange ({ position, address, places }){

        // Set new location
        setubicacion({ position, address });
    }
    const registrarPedido=(pedido)=>{
        pedido.estado="pendiente"

    }
    return (
        <Container>
            <h1 className='fs-1'>Realizar pedido</h1>
            <Container>
                {/* NO clientes */}
                <Form onSubmit={handleSubmit(registrarPedido)}>
                    <Form.Label>Nombre</Form.Label>
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
            </Container>
        </Container>
    );
};

export default RealizarPedido;