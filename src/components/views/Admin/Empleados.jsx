import React, { useState } from 'react';
import { Button, Carousel, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { borrarUsuario } from '../../helpers/queries';
import Swal from 'sweetalert2';

const Empleados = ({ item, detallesEmpleado, handleShow,borrar }) => {
    return (
        <>
            <tr>
                {
                    <>
                        <td>{item.nombre}</td>
                        <td>{item.email}</td>
                        <td>{item.contraseña}</td>
                        <td>{item.rol}</td>
                        <td>{
                            <>
                                <Button className='btn btn-info' onClick={() => { handleShow(), detallesEmpleado(item) }}>Editar</Button>
                                <Button className='btn btn-danger' type='submit'
                                    onClick={() => {
                                        Swal.fire({
                                            title: "Esta seguro que desea borrar el usuario?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Si, eliminar!",
                                            cancelButtonText:"Cancelar"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                borrar(item);
                                            }
                                        });
                                    }}
                                >Borrar
                                </Button>
                            </>
                        }</td>
                    </>
                }
            </tr>
        </>
    );
};

export default Empleados;