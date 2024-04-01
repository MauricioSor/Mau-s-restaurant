import React, { useState } from 'react';
import { Button, Carousel, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { borrarUsuario } from '../../helpers/queries';
import Swal from 'sweetalert2';

const Empleados = ({ item, detallesEmpleado, handleShow }) => {

    const borrar = (item) => {
        borrarUsuario(item).then((resp) => {
            if (resp.status == 201) {
                Swal.fire("Borrado exitoso", "", "success")
            } else {
                Swal.fire("Ocurrió un error", "Intente nuevamente mas tarde", "error")
            }
        })
    }
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
                                            confirmButtonText: "Yes, delete it!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                borrar(item);
                                                Swal.fire({
                                                    title: "Deleted!",
                                                    text: "Your file has been deleted.",
                                                    icon: "success"
                                                });
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