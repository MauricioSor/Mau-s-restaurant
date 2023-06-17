import React from 'react';
import { Container, Carousel, Spinner } from 'react-bootstrap';
import { buscarcomidas } from '../helpers/queries';
import { useState, useEffect } from 'react';
const Home = () => {
    const [mostrarSpinner, setMostrarSpinner] = useState(true);
    const [recetas,setRecetas]=useState({});
    const buscarRecetas=()=> {
        buscarcomidas().then((respuesta) =>{
        setRecetas(respuesta);
        setMostrarSpinner(false);
        })
        }
    useEffect(() => {
        setMostrarSpinner(true);
        buscarRecetas();
    }, []);
    
    return (
        <>
            {
                mostrarSpinner ?
                    (<div className="my-5 d-flex justify-content-center">
                        <Spinner animation='border' variant='primary' />
                    </div>) : (
                        <Container className='d-flex justify-content-center'>
                            <Carousel style={{ height: '400px', width: '600px' }}>
                                {
                                    recetas.map((item, index) => (
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
                    )}
        </>
    );
};

export default Home;