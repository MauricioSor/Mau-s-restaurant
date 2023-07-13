import React from 'react';
import { Card, Button, Container } from 'react-bootstrap/'
import { useNavigate } from 'react-router-dom';
const CardComidas = ({ recetas }) => {
const navegar=useNavigate();

    return (
        <>
        <div><h1 className='text-start ms-2 mt-3'>Nuestras Selección Especial</h1></div>
        <Container className='d-flex justify-content-center my-2'>
        {
            recetas.map((item, index) => (
                <Card className='mx-1' style={{ width: '18rem' }} key={index}>
                    <Card.Img variant="top" src={item.imagen} style={{height:'180px'}} />
                    <Card.Body className='d-flex flex-column'>
                        <Card.Title className='text-center'>{item.nombre}</Card.Title>
                        <Card.Text className='text-truncate'>
                        <p className='text-center'><strong >${item.precio}</strong></p>
                        </Card.Text>
                        <div className='text-center'>
                        <Button className='mt-auto' type='submit' onClick={()=>{navegar('/Detalle/'+item._id)}} variant="primary">Ver Detalle</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
        </>
    );
};

export default CardComidas;