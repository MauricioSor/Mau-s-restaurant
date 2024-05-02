import React, { useEffect, useState } from 'react';
import { Container,Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Mesas = () => {

    
    return (
        <Container>
            <h1>Mesas del salon</h1>
            <Link className='btn btn-primary' to={"/Usuario/Mesas/RegistrarVenta"}>Registrar venta</Link>
            
        </Container>
    );
};

export default Mesas;