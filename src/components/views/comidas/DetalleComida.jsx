import React from 'react';
import { Table, Button,Container} from "react-bootstrap";
import { Link } from "react-router-dom";

const DetalleComida = ({item}) => {
    return (
    <tr>
        {
            <>
            <td>{item.id}</td>
            <td>{item.nombre}</td>
            <td>{item.precio}</td>
            <td>{item.imagen}</td>
            <td>{item.categoria}</td>
            <td>
            <Container className='d-flex'>
            <Link className='btn btn-warning' to={'/administrador/editar-producto/'+item.id}>Editar</Link>
            <Button variant='danger' type='submit'>Eliminar</Button>
            </Container>
            </td>
            </>
        }
    </tr>
    );
};

export default DetalleComida;