import React from 'react';
import { Button, Container, Nav } from 'react-bootstrap';
import { NavLink,Link, useNavigate } from 'react-router-dom';

const AdminEmpleados = () => {
    const navegar  = useNavigate();
    return (
        <Container>
            <h1>Administrar Empleados</h1>
            <Link className="btn btn-primary" to="/administrador/Registro" >Registrar empleado</Link>
        </Container>
    );
};

export default AdminEmpleados;