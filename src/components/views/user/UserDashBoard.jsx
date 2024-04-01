import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listarPedidos } from '../../helpers/queries';
import Pedido from './Pedido';

const UserDashBoard = () => {
    const [pedidos, setPedidos] = useState([])
    const [spinner, setSpinner] = useState(true)
    useEffect(() => {
        listarPedidos().then((resp)=>{
            if(resp.status==200){
                setPedidos(resp.data)
                setSpinner(false)
            }
        })
        
    }, [])
    return (
        <>
            <Container>
                <h1>Administrar pedidos</h1>
                <Link className='btn btn-primary' to={"/user/RegistrarVenta"}>Registrar venta</Link>
                <Table>
                    <thead>
                        <tr>
                            <th>codigo</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Contacto</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pedidos.map((item, index) => (
                                <Pedido key={index} item={item} />
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default UserDashBoard;