import React from 'react';
import { Card, Button, Container } from 'react-bootstrap/'
import Comida from './Comida';
import { buscarcomidas } from '../../helpers/queries';
const CardComidas = ({ recetas }) => {

    return (
        <>
        <div><h1 className='text-start ms-2'>Nuestras Recetas</h1></div>
        <Container className='d-flex justify-content-center my-2'>
        {
            recetas.map((item, index) => (
                <Card className='mx-1' style={{ width: '18rem' }} key={index}>
                    <Card.Img variant="top" src={item.imagen} />
                    <Card.Body>
                        <Card.Title>{item.nombre}</Card.Title>
                        <Card.Text>
                        {item.descripcion}
                        </Card.Text>
                        <Button variant="primary">Ver Detalle</Button>
                    </Card.Body>
                </Card>
            ))}
        </Container>
        </>
    );
};

export default CardComidas;