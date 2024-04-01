//#region Imports Enviroments
const URL_comidas_listar = import.meta.env.VITE_COMIDAS_LISTAR;
const URL_comida_editar = import.meta.env.VITE_COMIDAS_BUSCAR_BORRAR_EDITAR;
const URL_comida = import.meta.env.VITE_COMIDAS_AGREGAR;

const URL_usuario = import.meta.env.VITE_USUARIOS_AUTENTICACION;
const URL_usuarios_listar = import.meta.env.VITE_USUARIOS_TODOS;
const URL_usuario_editar = import.meta.env.VITE_USUARIOS_EDITAR;
const URL_usuario_crear = import.meta.env.VITE_USUARIOS_AGREGAR;
const URL_usuario_eliminar=import.meta.env.VITE_USUARIOS_ELIMINAR;

const URL_pedido = import.meta.env.VITE_PEDIDOS_BUSCAR;
const URL_pedidos_listar = import.meta.env.VITE_PEDIDOS_LISTAR;
const URL_pedido_editar = import.meta.env.VITE_PEDIDOS_MODIFICAR;
const URL_pedido_crear = import.meta.env.VITE_PEDIDOS_CREAR;
const URL_pedido_eliminar=import.meta.env.VITE_PEDIDOS_ELIMINAR
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
export const listarUsuarios = async () => {
    try {
        const consulta = await axios.get(URL_usuarios_listar)
        return consulta
    } catch (error) {
        return(error);
    }
};
export const crearUsuario = async (usuario) => {
    try {
        const consulta = await axios.post(URL_usuario_crear,usuario)
        return consulta;
    } catch (error) {
        return(error);
    }
}
export const modificarUsuario = async (usuario) => {
    try {
        const consulta = await axios.put(URL_usuario_editar,usuario);
        return consulta;
    } catch (error) {
        console.error("Error al modificar usuario:", error);
    }
}
export const borrarUsuario = async (usuario) => {
    try {
        const consulta = await axios.delete(URL_usuario_eliminar+`${usuario._id}`);
        return consulta;
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
        const consulta = await fetch(URL_comida_editar + _id);
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

export const editarComida = async (comida) => {
    try {
        const consulta = await axios.put(URL_comida_editar,comida);
        return consulta;
    } catch (error) {
        return(error);
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
//#region Endpoints de Pedidos

export const buscarPedido = async (pedido) => {
    try {
        const consulta = await axios.post(URL_pedido,{
            email:pedido.email,
            contraseña:pedido.contraseña
        })
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const listarPedidos = async () => {
    try {
        const consulta = await axios.get(URL_pedidos_listar)
        return consulta
    } catch (error) {
        return(error);
    }
};
export const crearPedido = async (pedido) => {
    try {
        const consulta = await axios.post(URL_pedido_crear,pedido)
        return consulta;
    } catch (error) {
        return(error);
    }
}
export const modificarPedido = async (pedido) => {
    try {
        const consulta = await axios.put(URL_pedido_editar,pedido);
        return consulta;
    } catch (error) {
        console.error("Error al modificar pedido:", error);
    }
}
export const borrarPedido = async (pedido) => {
    try {
        const consulta = await axios.delete(URL_pedido_eliminar+`${pedido._id}`);
        return consulta;
    } catch (error) {
        console.log(error);
    }
}
//#endregion