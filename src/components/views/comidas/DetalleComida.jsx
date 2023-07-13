import React from 'react';
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { borrarReceta } from '../../helpers/queries';
import Swal from 'sweetalert2';

const DetalleComida = ({ item }) => {

    const borrar = (comida) => {
        Swal.fire({
            title: 'Estas Seguro?',
            text: "No podras revertir este cambio despues!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si,estoy seguro!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                borrarReceta(comida._id).then((respuesta) => {
                    if (respuesta.status === 200) {
                        Swal.fire('Comida Eliminada', 'Actualizacion Exitosa', 'success');
                        setTimeout(()=>{
                            window.location.reload();
                        },2500)
                        return respuesta;
                    } else {
                        console.log(respuesta.status)
                        Swal.fire('Error al Eliminar', `El producto ${comida.nombre} no se pudo borrar`, 'error');
                    }
                })
            }
        })
    }
    return (
        <tr>
            {
                <>
                    <td>{item._id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.precio}</td>
                    <td>{item.imagen}</td>
                    <td className='text-truncate' style={{maxWidth:'20px'}}>{item.descripcion}</td>
                    <td>{item.categoria}</td>
                    <td>
                        <Container className='d-flex'>
                            <Link className='btn btn-warning mx-1' to={'/administrador/EditarComida/' + item._id}>Editar</Link>
                            <Button onClick={() => { borrar(item) }} variant='danger' type='submit'>Eliminar</Button>
                        </Container>
                    </td>
                </>
            }
        </tr>
    );
};

export default DetalleComida;