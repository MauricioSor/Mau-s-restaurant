import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPedidos from '../views/user/GestionPedido/AdminPedidos';
import RegistrarVenta from '../views/user/GestionVentas/RegistrarVenta';
import RegistrarCliente from "../views/user/GestionClientes/RegistrarCliente"
import AdminClientes from  "../views/user/GestionClientes/AdminClientes"
import AdminMesas from '../views/user/GestionVentas/AdminMesas';

const RutasUser = () => {
    return (
        <>
        <Routes>
            <Route exact path='/' element={<AdminPedidos/>}/>
            <Route exact path='/AdminClientes' element={<AdminClientes/>}/>
            <Route exact path='/AdminClientes/RegistrarCliente' element={<RegistrarCliente/>}/>
            <Route exact path='/Mesas' element={<AdminMesas/>}/>
            <Route exact path='/Mesas/RegistrarVenta' element={<RegistrarVenta/>}/>
        </Routes>
        </>
    );
};

export default RutasUser;