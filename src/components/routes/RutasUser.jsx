import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashBoard from '../views/user/UserDashBoard';
import RegistrarVenta from '../views/user/RegistrarVenta';

const RutasUser = () => {
    return (
        <>
        <Routes>
            <Route exact path='/' element={<UserDashBoard/>}/>
            <Route exact path='/RegistrarVenta' element={<UserDashBoard/>}/>
        </Routes>
        </>
    );
};

export default RutasUser;