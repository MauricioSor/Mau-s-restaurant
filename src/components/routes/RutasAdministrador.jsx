//#region Imports
import { Routes, Route } from "react-router-dom";
import Administrador from "../views/Administrador";
import CrearComida from "../views/comidas/CrearComida";
import EditarComida from "../views/comidas/EditarComida";
import RegistrarUsuario from "../views/RegistrarUsuario";
//#endregion
const RutasAdministrador = () => {
    return (
    <>
    <Routes>
        <Route exact path="/" element={<Administrador/>}/>
        <Route exact path="/AgregarComida"element={<CrearComida/>}/>
        <Route exact path="/Registro" element={<RegistrarUsuario/>}/>
        <Route exact path="/EditarComida/:_id"element={<EditarComida/>}/>
    </Routes>
    </>
    );
};

export default RutasAdministrador;