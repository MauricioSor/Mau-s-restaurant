import React from 'react';
import { Button, Container,  Table } from 'react-bootstrap';
import MiCarrito from './MiCarrito';
import { NavLink } from 'react-router-dom';

const Carrito = ({pedidos}) => {
    return (
        <Container>
            <h1>Carrito de compras</h1>
            <Table>
                <thead>
                    <th>
                        <td></td>
                        <td>Producto</td>
                        <td>Precio</td>
                        <td>Cantidad</td>
                        <td>Sub Total</td>
                    </th>
                </thead>
                <tbody>
                    <tr>
                        {
                            pedidos.map((item,index)=>(
                                <MiCarrito key={index} item={item}/>
                            ))
                        }
                    </tr>
                </tbody>
            </Table>
            <NavLink className='btn btn-primary' to={"/RealizarPedido"}>Realizar pedido</NavLink>
        </Container>
    );
};

export default Carrito;