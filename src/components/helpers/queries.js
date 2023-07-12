const URL_recetas_listar = import.meta.env.VITE_RECETAS_LISTA;
const URL_receta_agregar = import.meta.env.VITE_RECETAS_AGREGAR;
const URL_receta = import.meta.env.VITE_RECETAS_BUSCAR_BORRAR_EDITAR;
const URL_usuario = import.meta.env.VITE_USUARIOS_BUSCAR_EDITAR_BORRAR
const URL_usuarios_listar = import.meta.env.VITE_USUARIOS_LISTAR;
const URL_usuario_crear=import.meta.env.VITE_USUARIOS_AGREGAR;

import Swal from 'sweetalert2';

export const iniciarSesion = async (usuario) => {
    try {
        const consulta = await fetch(URL_usuarios_listar);
        const respuesta = await consulta.json();
        const usuarioBuscado = respuesta.find((item) => item.email === usuario.email);
        if (usuarioBuscado){
            if (usuarioBuscado.contraseña === usuario.contraseña) {
                Swal.fire({
                    title: 'Inicio de Sesión Correcto!',
                    text: 'Tienes acceso a la ventana de Administración',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                });
                return usuarioBuscado;
            } else {
                Swal.fire({
                    title: '¡Contraseña Incorrecta!',
                    text: 'Verifica tu contraseña y vuelve a intentarlo.',
                    icon: 'error',
                    confirmButtonText: 'Reintentar'
                });
                return null;
            }
        } else {
            Swal.fire({
                title: '¡Usuario No Registrado!',
                text: 'Debes tener permisos para continuar',
                icon: 'error',
                confirmButtonText: 'Reintentar'
            });
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};
export const buscarcomidas = async () => {
    try {
        const consulta = await fetch(URL_recetas_listar);
        const respuesta = await consulta.json();
        return respuesta;
    } catch (error) {
        console.log(error)
    }
}
export const buscarcomida = async (_id) => {
    try {
        const consulta = await fetch(URL_receta+'/'+_id);
        const respuesta = await consulta.json();
        return respuesta;
    } catch (error) {
        console.log(error)
    }
}
export const crearReceta = async(comida)=>{
    try{
    const consulta = await fetch(URL_receta_agregar,{
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify(comida)
    
    });
    return consulta;
    }catch(error){
        console.log(error);
    }
}

export const editarReceta = async(comida,id)=>{
    try{
    const consulta = await fetch(URL_receta+'/'+id,{
    method: "PUT",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify(comida)    
    });
    return consulta;
    }catch(error){
        console.log(error);
    }
}
export const borrarReceta = async(id)=>{
    try{
    const consulta = await fetch(URL_receta+'/'+id,{
    method: "DELETE"
    });
    return consulta;
    }catch(error){
        console.log(error);
    }
}
export const crearUsuario = async(usuario)=>{
    try{
        const consulta = await fetch(URL_usuario_crear,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        return consulta;
    }catch(error){
        console.log(error);
    }
}