import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
const Home = ({ receta }) => {
    console.log(receta[0])
    return (
        <Container className='d-flex justify-content-center'>
            <Carousel style={{ height: '400px' ,width:'600px' }}>
                {
                receta.map((item, index)=>(
                    <Carousel.Item key={index}>
                        <div style={{ height: '400px' }}>
                            <img
                                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                src={item.imagen}
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>{item.nombre}</h3>
                            <p>{item.descripcion}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default Home;