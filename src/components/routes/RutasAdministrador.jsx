//#region Imports
import { Routes, Route } from "react-router-dom";
import Administrador from "../views/Admin/AdminDashBoard";
import CrearComida from "../views/Admin/CrearComida";
import EditarComida from "../views/Admin/EditarComida";
import RegistrarUsuario from "../views/Admin/RegistrarUsuario";
import AdminEmpleados from "../views/Admin/AdminEmpleados";

//#endregion
const RutasAdministrador = () => {
    return (
    <>
    <Routes>
        <Route exact path="/" element={<Administrador/>}/>
        <Route exact path="/AgregarComida"element={<CrearComida/>}/>
        <Route exact path="/AdminEmpleados"element={<AdminEmpleados/>}/>
        <Route exact path="/Registro" element={<RegistrarUsuario/>}/>
        <Route exact path="/EditarComida/:_id"element={<EditarComida/>}/>
    </Routes>
    </>
    );
};

export default RutasAdministrador;