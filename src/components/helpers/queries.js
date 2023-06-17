const URL_USUARIO= import.meta.env.VITE_USUARIOS;
const URL_RECETAS= import.meta.env.VITE_RECETAS;

export const IniciarSesion = async(usuario)=>{
    try{
        const consulta = await fetch(URL_USUARIO);
        const respuesta = await consulta.json();
        const usuarioBuscado = listaUsuario.find((item)=> item.usuario === usuario.email);
    }catch{
    console.log(error);
    }
}
export const buscarcomidas = async()=>{
    try{
        const consulta = await fetch(URL_RECETAS);
        const respuesta = await consulta.json();
        return respuesta;
    }catch(error){
    console.log(error)
    }
}