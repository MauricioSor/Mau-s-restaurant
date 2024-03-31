import React, { useState } from 'react';
import { Button, Carousel,Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Empleados = ({item,detallesEmpleado,handleShow}) => {

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
                    <Button className='btn btn-info' to={"/AdminEmpleados/Registro/Editar"} onClick={()=>{handleShow(),detallesEmpleado(item)}}>Editar</Button>
                    <Button className='btn btn-danger'>Borrar</Button>
                    </>
                    }</td>
                </>
            }
        </tr>
        </>
    );
};

export default Empleados;