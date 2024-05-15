//#region imports
import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import MiCarrito from './MiCarrito';
import { NavLink } from 'react-router-dom';
import SpinnerCustom from '../../../common/SpinnerCustom';
//#endregion
const Carrito = () => {
    //#region hooks
    const [pedidos, setPedidos] = useState("")
    const [spinner, setSpinner] = useState(false)
    const [carga, setCarga] = useState(false)
    const ActivarCarga = () => { setCarga(true) }
    //#endregion
    //#region funciones
    function filtrarYContarRepetidos(array) {
        // Creamos un objeto para llevar un registro de cuántas veces aparece cada objeto
        const contador = {};
        // Iteramos sobre el array para contar la cantidad de cada objeto
        array.forEach(objeto => {
            const clave = JSON.stringify(objeto); // Convertimos el objeto a una cadena JSON para usarlo como clave
            contador[clave] = (contador[clave] || 0) + 1; // Incrementamos el contador para esta clave
        });
        // Filtramos los objetos repetidos y creamos un nuevo array con el campo 'cantidad'
        const resultados = Object.keys(contador).map(clave => {
            const objeto = JSON.parse(clave); // Convertimos la clave de vuelta a un objeto
            return { ...objeto, cantidad: contador[clave] };
        });
        setSpinner(true)
        return resultados;
    }
    useEffect(() => {
        const pedidos = JSON.parse(localStorage.getItem("pedido") || "[]");
        pedidos.length > 0 ? (ActivarCarga(), setPedidos(filtrarYContarRepetidos(pedidos))) : <></>;
    }, []);
    //#endregion
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
                        (<SpinnerCustom />)
                    }
                </>) :
                <h2>Vaya! Parece que aún no te has decidido... De cualquier forma, aqui estaremos para usted.</h2>
            }
        </Container >
    );
};

export default Carrito;