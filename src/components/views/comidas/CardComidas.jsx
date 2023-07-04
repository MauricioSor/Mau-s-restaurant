import React from 'react';
import { Card, Button, Container } from 'react-bootstrap/'
import DetalleComida from './DetalleComida';
import { useNavigate } from 'react-router-dom';
import Detalle from './Detalle';
const CardComidas = ({ recetas }) => {
    const navegar = useNavigate();

    return (
        <>
        <div><h1 className='text-start ms-2 mt-3'>Nuestras Selección Especial</h1></div>
        <Container className='d-flex justify-content-center my-2'>
        {
            recetas.map((item, index) => (
                <Card className='mx-1' style={{ width: '18rem' }} key={index}>
                    <Card.Img variant="top" src={item.imagen} style={{height:'180px'}} />
                    <Card.Body>
                        <Card.Title className='text-center'>{item.nombre}</Card.Title>
                        <Card.Text className='text-truncate'>
                        {item.pasos}
                        </Card.Text>
                        <Button type='submit' onClick={()=>{navegar('/DetalleComida')}} variant="primary">Ver Detalle</Button>
                    </Card.Body>
                </Card>
            ))}
        </Container>
        </>
    );
};

export default CardComidas;