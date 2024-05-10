//#region imports
import { Navigate } from 'react-router-dom';
import RutasAdministrador from './RutasAdministrador';
import RutasUser from './RutasUser';
//#endregion
const RutasProtegidas = () => {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario')) || null;
    const rol = JSON.parse(sessionStorage.getItem('rol')) || null;
    if (!usuarioLogueado) {
        return <Navigate to='/'/>
    } else {
        if(rol=="Admin"){
            return <RutasAdministrador/>
        }else{
            return <RutasUser/>
        }
    }
};
export default RutasProtegidas;