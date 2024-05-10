//#region imports
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { buscarComidas } from '../../../helpers/queries';
import { useState, useEffect } from 'react';
import CardComidas from './CardComidas';
import SpinnerCustom from '../../../common/SpinnerCustom';
//#endregion

const Principal = () => {
    //#region hooks
    const [mostrarSpinner, setMostrarSpinner] = useState(true);
    const [recetas, setRecetas] = useState("");
    //#endregion
    //#region Functions
    const buscarRecetas = () => {
        buscarComidas().then((respuesta) => {
            setRecetas(respuesta.data);
            setMostrarSpinner(false);
        })
    }
    useEffect(() => {
        setMostrarSpinner(true);
        buscarRecetas()
    }, []);
    //#endregion
    return (
        <>
            {
                mostrarSpinner ?
                    (<SpinnerCustom/>) :
                    <>
                        <Carousel style={{ width: '100' }}>
                            {
                                recetas.map((item, index) => (
                                    <Carousel.Item key={index}>
                                        <div style={{ height: '400px' }}>
                                            <img
                                                style={{ objectFit: 'cover', height: '100%', width: '100%', filter: 'blur(10px),opacity(55%)' }}
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
                        <CardComidas recetas={recetas} />
                    </>
            }
        </>
    );
};

export default Principal;