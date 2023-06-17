import React from 'react';
import { Navigate } from 'react-router-dom';
const RutasProtegidas = ({children}) => {
    const usuariologueado  = JSON.parse(sessionStorage.getItem('usuario')) || null;
    return usuariologueado?({children}):(<Navigate to='/'></Navigate>)
};

export default RutasProtegidas;