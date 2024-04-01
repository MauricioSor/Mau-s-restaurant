import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import MiCarrito from './MiCarrito';
import { NavLink } from 'react-router-dom';
import { buscarComida } from '../../../helpers/queries';

const Carrito = () => {
    const [pedidos, setPedidos] = useState("")
    const [spinner, setSpinner] = useState(false)

    useEffect(() => {
        const pedido = JSON.parse(localStorage.getItem("pedido") || "[]");
        if (pedido.length > 0) {
            Promise.all(pedido.map(id => buscarComida(id)))
                .then(respuestas => {
                    const nuevosPedidos = respuestas.map(resp => resp);
                    setPedidos(pedidos => [...pedidos, ...nuevosPedidos]);
                })
                .catch(error => {
                    console.error("Error al buscar detalles de los pedidos:", error);
                });
        }
        setSpinner(true)
    }, []);
    useEffect(() => {
        console.log(pedidos);
    }, [pedidos])
    return (
        <Container>
            <h1>Carrito de compras</h1>
            {pedidos.length>1 ?
                (<>
                    {spinner ?
                        <>
                            <Table responsive striped bordered hover className="text-center">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Producto</th>
                                        <th>Precio</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                        
                                        {
                                            pedidos.map((item, index) => (
                                                <MiCarrito key={index} item={item} />
                                            ))
                                        }
                                        
                                </tbody>
                            </Table>
                            <NavLink className='btn btn-primary' to={"/RealizarPedido"}>Realizar pedido</NavLink>
                        </> :
                        <Container className='d-flex justify-content-center'>
                            <Spinner variant='primary'/>
                        </Container>
                        }
                </> ):
                    <h2>Vaya! Parece que aún no te has decidido... De cualquier forma, aqui estaremos para usted.</h2>
            }
        </Container >
    );
};

export default Carrito;