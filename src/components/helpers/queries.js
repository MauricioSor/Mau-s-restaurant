const URL_usuarios= import.meta.env.VITE_USUARIOS;
const URL_recetas= import.meta.env.VITE_RECETAS;

export const iniciarSesion = async(usuario)=>{
    try{
        const consulta = await fetch(URL_usuarios);
        const respuesta = await consulta.json();
        const usuarioBuscado = respuesta.find((item)=> item.email === usuario.email)
        return usuarioBuscado && usuarioBuscado.password === usuario.password ? usuarioBuscado : undefined;
    }catch{
    return null;
    }
}
export const buscarcomidas = async()=>{
    try{
        const consulta = await fetch(URL_recetas);
        const respuesta = await consulta.json();
        return respuesta;
    }catch(error){
    console.log(error)
    }
}