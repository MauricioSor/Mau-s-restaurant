import React, { useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

const UserDashBoard = () => {
    useEffect(()=>{
        //cargar pedidos
        
    },[])
    return (
        <>
            <Container>
                <h1>Administrar pedidos</h1>
                <Button>
                Registrar venta
                </Button>
                <Table>
                
                </Table>
            </Container>
        </>
    );
};

export default UserDashBoard;