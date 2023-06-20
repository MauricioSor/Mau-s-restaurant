import React from 'react';
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { borrarReceta } from '../../helpers/queries';
const DetalleComida = ({ item }) => {
    const borrar = (comida) => {
        borrarReceta(comida).then((respuesta) => {
            respuesta.status == 201 ? (Swal.fire('Comida Eliminada', 'Actualizacion Exitosa', 'success'), reset()) : Swal.fire('Error al Eliminar', `El producto ${comidaNueva.nombre} no se pudo borrar`, 'error');
        })
    }

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
                            <Link className='btn btn-warning' to={'/administrador/EditarComida/' + item.id}>Editar</Link>
                            <Button onClick={()=>{borrar(item)}} variant='danger' type='submit'>Eliminar</Button>
                        </Container>
                    </td>
                </>
            }
        </tr>
    );
};

export default DetalleComida;