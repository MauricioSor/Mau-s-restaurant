const URL_usuarios = import.meta.env.VITE_USUARIOS;
const URL_recetas = import.meta.env.VITE_RECETAS;
import Swal from 'sweetalert2';

export const iniciarSesion = async (usuario) => {
    try {
        const consulta = await fetch(URL_usuarios);
        const respuesta = await consulta.json();
        console.log(respuesta);
        const usuarioBuscado = respuesta.find((item) => item.email === usuario.email);
        if (usuarioBuscado){
            if (usuarioBuscado.password === usuario.password) {
                Swal.fire({
                    title: 'Inicio de Sesión Correcto!',
                    text: 'Tienes acceso a la ventana de Administración',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                });
                console.log(respuesta);
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
        const consulta = await fetch(URL_recetas);
        const respuesta = await consulta.json();
        return respuesta;
    } catch (error) {
        console.log(error)
    }
}
export const crearReceta = async()=>{
    try{
    const consulta = await fetch(URL_recetas,{
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSO.stringify(comidas)
    
    });
    return consulta;
    }catch(error){
        console.log(error);
    }
}

export const editarReceta = async()=>{
    try{
    const consulta = await fetch(URL_recetas+'/'+id,{
    method: "PUT",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSO.stringify(comidas)
    
    });
    return consulta;
    }catch(error){
        console.log(error);
    }
}
export const borrarReceta = async()=>{
    try{
    const consulta = await fetch(URL_recetas+'/'+id,{
    method: "DELETE",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSO.stringify(comidas)
    
    });
    return consulta;
    }catch(error){
        console.log(error);
    }
}