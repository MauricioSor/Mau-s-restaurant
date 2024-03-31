//#region Imports Enviroments
const URL_comidas_listar = import.meta.env.VITE_COMIDAS_LISTAR;
const URL_comida_editar = import.meta.env.VITE_COMIDAS_BUSCAR_BORRAR_EDITAR;
const URL_comida = import.meta.env.VITE_COMIDAS_AGREGAR;

const URL_usuario = import.meta.env.VITE_USUARIOS_AUTENTICACION;
const URL_usuario_editar = import.meta.env.VITE_USUARIOS_EDITAR;
const URL_usuario_crear = import.meta.env.VITE_USUARIOS_AGREGAR;
import axios from 'axios';
import Swal from 'sweetalert2';
//#endregion
//#region Endpoints de Usuarios

export const iniciarSesion = async (usuario) => {
    try {
        const consulta = await axios.post(URL_usuario,{
            email:usuario.email,
            contraseña:usuario.contraseña
        })
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const crearUsuario = async (usuario) => {
    try {
        const consulta = await axios(URL_usuario_crear, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        return consulta.data;
    } catch (error) {
        console.log(error);
    }
}
export const borrarUsuario = async (usuario) => {
    try {
        const consulta = await axios.delete(URL_usuario_crear, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        return consulta.data;
    } catch (error) {
        console.log(error);
    }
}
//#endregion
//#region Endpoints de Comidas 
export const buscarComidas = async () => {
    try {
        const consulta = await axios.get(URL_comidas_listar);
        return consulta;
    } catch (error) {
        return (error)
    }
}
export const buscarComida = async (_id) => {
    try {
        const consulta = await fetch(URL_comida + '/' + _id);
        const respuesta = await consulta.json();
        return respuesta;
    } catch (error) {
        console.log(error)
    }
}
export const crearComida = async (comida) => {
    try {
        const consulta = await fetch(URL_comida, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comida)

        });
        return consulta;
    } catch (error) {
        console.log(error);
    }
}

export const editarComida = async (comida, id) => {
    try {
        const consulta = await fetch(URL_comida_editar + '/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comida)
        });
        return consulta;
    } catch (error) {
        console.log(error);
    }
}
export const borrarComida = async (id) => {
    try {
        const consulta = await fetch(URL_comida_editar + '/' + id, {
            method: "DELETE"
        });
        return consulta;
    } catch (error) {
        console.log(error);
    }
}
//#endregion