import React, { useEffect, useState } from 'react';
import { Container,Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Mesas = () => {

    
    return (
        <Container>
            <h1>Mesas del salon</h1>
            <Link className='btn btn-primary' to={"/user/RegistrarVenta"}>Registrar venta</Link>
            <Table>
            
            </Table>
        </Container>
    );
};

export default Mesas;