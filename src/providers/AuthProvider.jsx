import React, { Children, useReducer, useState } from 'react';
import { authContext } from '../context/authContext';
import { AuthReducer } from '../reducers/authReducer';
import { iniciarSesion } from '../components/helpers/queries';


const initialValue = {
    user: null,
    isAuth: false,
}
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialValue)

    const login = async (usuario) => {
        const { data } = await iniciarSesion(usuario)
        console.log(data);
        sessionStorage.setItem('usuario', JSON.stringify(data.usuario))
        sessionStorage.setItem('rol', JSON.stringify(data.rol.nombre))
        dispatch({
            type: 'LOGIN',
            payload:{
                user: data.usuario,
                rol:data.rol.nombre
            }
        })
    }
    const logout = async () => {
        sessionStorage.removeItem('usuario')
        sessionStorage.removeItem('rol')
        dispatch({
            type: 'LOGOUT'
        })
    }
    const checkSession = async () => {
        const usuarioSessionStorage = JSON.parse(sessionStorage.getItem('usuario')) || null;
        const rolSessionStorage = JSON.parse(sessionStorage.getItem('rol')) || null;
        if (usuarioSessionStorage !== null) {
            dispatch({
                type: "LOGIN",
                payload: {
                    user:usuarioSessionStorage,
                    rol:rolSessionStorage
                }
            })
        } else {
            dispatch({ type: "LOGOUT" })
        }
    }
    return (
        <authContext.Provider
            value={{
                login,
                state,
                logout,
                checkSession
            }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;