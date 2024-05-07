import React, { useEffect, useState } from 'react';
import { Container, Col } from 'react-bootstrap';

const Mesas = ({ item, index, mostrarDatos }) => {
    const [colorEstado, setColorEstado] = useState()
    useEffect(() => {
    color(item.estado);
    }, [])
    const color = (mesa) => {
        switch (mesa) {
            case "Libre":
            setColorEstado("green")
                break;
                case "Ocupado":
                setColorEstado("yellow")
                break;
                case "Reservado":
            setColorEstado("red")
                break;
            default:
                setColorEstado("green")
                break;
        }
    }
    return (
        <Col className='col-4'>
            <div className='d-flex flex-column'>
                {
                    <button className="py-4" style={{ backgroundColor:colorEstado}} onClick={() => mostrarDatos(item)}>Mesa {item._id}<br /></button>
                }
            </div>
        </Col>
    );
};

export default Mesas;