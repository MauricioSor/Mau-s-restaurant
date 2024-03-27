//#region Imports
import React from 'react';
import { Container, Carousel, Spinner } from 'react-bootstrap';
import { buscarcomidas } from '../helpers/queries';
import { useState, useEffect } from 'react';
import CardComidas from './comidas/CardComidas';
//#endregion

const Principal = () => {
//#region States
    const [mostrarSpinner, setMostrarSpinner] = useState(true);
    const [recetas, setRecetas] = useState({});
//#endregion
//#region Functions
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
//#endregion
    return (
        <>
            {
                mostrarSpinner ?
                    (<div className="my-5 d-flex justify-content-center">
                        <Spinner animation='border' variant='primary' />
                    </div>) :
                    <>
                        <Carousel style={{ width: '100' }}>
                            {
                                recetas.map((item, index) => (
                                    <Carousel.Item key={index}>
                                        <div style={{ height: '400px' }}>
                                            <img
                                                style={{ objectFit: 'cover', height: '100%', width: '100%', filter: 'blur(10px)', filter: 'opacity(55%)' }}
                                                src={item.imagen}
                                                alt={`Slide ${index + 1}`}
                                            />
                                        </div>
                                        <Carousel.Caption>
                                            <h1 className='display-1'>
                                                {item.nombre}
                                            </h1>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                        <CardComidas recetas={recetas}/>
                    </>
            }
        </>
    );
};

export default Principal;