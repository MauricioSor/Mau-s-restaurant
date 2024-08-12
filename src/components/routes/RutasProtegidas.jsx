//#region imports
import { Navigate } from 'react-router-dom';
import RutasAdministrador from './RutasAdministrador';
import RutasUser from './RutasUser';
import { useContext } from 'react';
import { authContext } from '../../context/authContext';
//#endregion
const RutasProtegidas = () => {
    const {state}=useContext(authContext)
    const usuarioLogueado = state.isAuth;
    const rol = state.rol;    
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