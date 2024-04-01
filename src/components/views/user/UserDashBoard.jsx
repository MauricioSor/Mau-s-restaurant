import React, { useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserDashBoard = () => {
    useEffect(() => {
        //cargar pedidos
        
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
                            pedidos.map((item, index) => {
                                <Pedidos key={index} item={item} />
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default UserDashBoard;