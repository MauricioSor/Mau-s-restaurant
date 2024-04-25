import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cliente = ({ item, cargarCliente }) => {
    return (
        <tr>
            {
                <>
                {console.log(item)}
                    <td>{item._id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.telefono}</td>
                    <td>{item.direccion}</td>
                    <td>
                        <>
                            <Button className='btn btn-info' onClick={() => {cargarCliente(item) }}>Editar</Button>
                            <Button className='btn btn-danger' type='submit'
                                onClick={() => {
                                    Swal.fire({
                                        title: "Esta seguro que desea borrar el usuario?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Si, eliminar!",
                                        cancelButtonText: "Cancelar"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            //borrar(item);
                                        }
                                    });
                                }}
                            >Borrar
                            </Button>
                        </>
                    </td>
                </>
            }
        </tr>
    );
};

export default Cliente;