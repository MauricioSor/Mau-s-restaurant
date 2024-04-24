import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import MiCarrito from './MiCarrito';
import { NavLink } from 'react-router-dom';
import { buscarComida } from '../../../helpers/queries';

const Carrito = () => {
    
    const [pedidos, setPedidos] = useState("")
    const [spinner, setSpinner] = useState(false)
    const [carga, setCarga] = useState(false)
    const ActivarCarga =()=>{setCarga(true)}

    //useEffect(()=>{console.log(pedidos.length);},[])

    useEffect(() => {
        const pedido = JSON.parse(localStorage.getItem("pedido") || "[]");
        if (pedido.length > 0) {
            ActivarCarga();
            Promise.all(pedido.map(id => buscarComida(id))).then(respuesta => {
                const uniqueMap = {};
                respuesta.data.forEach(item => {
                    if (!uniqueMap[item.id]) {
                        uniqueMap[item.id] = { ...item, cantidad: 1 };
                    } else {
                        uniqueMap[item.id].cantidad++;
                    }
                });
                const nuevosPedidos = Object.values(uniqueMap);
                setPedidos(pedidos => [...pedidos, ...nuevosPedidos]);
                setSpinner(true)
            })
                .catch(error => {
                    setSpinner(true)
                    console.error("Error al buscar detalles de los pedidos:", error);
                });
        }
    }, []);
    return (
        <Container>
            <h1>Carrito de compras</h1>
            {carga ?
                (<>
                    {spinner ?
                        (<>
                            <Table responsive striped bordered hover className="text-center">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
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
                        </>) :
                        (<Container className='d-flex justify-content-center my-5'>
                            Cargando<Spinner variant='primary' className='ms-3'/>
                        </Container>)
                    }
                </>) :
                    <h2>Vaya! Parece que aún no te has decidido... De cualquier forma, aqui estaremos para usted.</h2>
            }
        </Container >
    );
};

export default Carrito;