//#region imports
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPedidos from '../views/user/GestionPedido/AdminPedidos';
import RegistrarVenta from '../views/user/GestionVentas/RegistrarVenta';
import AdminClientes from  "../views/user/GestionClientes/AdminClientes"
import AdminMesas from '../views/user/GestionVentas/AdminMesas';
import InformeVentas from '../views/user/GestionVentas/InformeVentas';
//#endregion
const RutasUser = () => {
    return (
        <>
        <Routes>
            <Route exact path='/' element={<AdminPedidos/>}/>
            <Route exact path='/AdminClientes' element={<AdminClientes/>}/>
            <Route exact path='/Mesas' element={<AdminMesas/>}/>
            <Route exact path='/Mesas/RegistrarVenta' element={<RegistrarVenta/>}/>
            <Route exact path='/Mesas/Informe' element={<InformeVentas/>}/>
        </Routes>
        </>
    );
};

export default RutasUser;