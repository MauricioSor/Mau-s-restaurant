//#region Imports
import React from 'react';
import { Container, Carousel, Spinner } from 'react-bootstrap';
import { buscarComidas } from '../../helpers/queries';
import { useState, useEffect } from 'react';
import CardComidas from './CardComidas';
import Swal from 'sweetalert2';

//#endregion

const Principal = () => {
    //#region States
    const [mostrarSpinner, setMostrarSpinner] = useState(true);
    const [recetas, setRecetas] = useState({});
    const [pedidos, setPedidos] = useState("")
    //#endregion
    //#region Functions
    const agregarPedido=(pedido)=>{
        setPedidos(pedido)
    }
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
                        <CardComidas agregarPedido={agregarPedido} recetas={recetas} />
                    </>
            }
        </>
    );
};

export default Principal;