import React from 'react';
import { Container, Carousel, Spinner } from 'react-bootstrap';
import { buscarcomidas } from '../helpers/queries';
import { useState, useEffect } from 'react';
import CardComidas from './comidas/CardComidas';
const Home = () => {
    const [mostrarSpinner, setMostrarSpinner] = useState(true);
    const [recetas, setRecetas] = useState({});
    const buscarRecetas = () => {
        buscarcomidas().then((respuesta) => {
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
                    </div>) :
                    <>
                            <Carousel style={{ width:'100vw' }}>
                                {
                                    recetas.map((item, index) => (
                                        <Carousel.Item key={index}>
                                            <div style={{ height: '400px' }}>
                                                <img
                                                    style={{ objectFit: 'cover', height: '100%', width: '100%',filter:'blur(5px)',filter: 'opacity(60%)'
                                                }}
                                                    src={item.imagen}
                                                    alt={`Slide ${index + 1}`}
                                                />
                                            </div>
                                            <Carousel.Caption>
                                                <h1 className='display-1'>{item.nombre}</h1>
                                                <p>{item.descripcion}</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        <CardComidas recetas={recetas}></CardComidas>
                    </>}
        </>
    );
};

export default Home;