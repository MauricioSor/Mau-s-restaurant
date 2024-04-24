import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
    
const RealizarPedido = () => {
    const [total, setTotal] = useState((localStorage.getItem("Total")))
    const [ubicacion, setubicacion] = useState()
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
    return (
        <Container>
            <h1 className='fs-1'>Realizar pedido</h1>
            <Container>
                <Form>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type='text'
                    />
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control
                        type='text'
                    />
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control
                        type='text'
                    />

                    <Form.Label>Forma de pago</Form.Label>
                    <Form.Control
                        type='text'
                    />
                    <Form.Label>Aclaraciones:</Form.Label>
                    <Form.Control
                        type='text'
                    />
                    <Form.Label>Total: {total}</Form.Label>
                </Form>
            </Container>
        </Container>
    );
};

export default RealizarPedido;