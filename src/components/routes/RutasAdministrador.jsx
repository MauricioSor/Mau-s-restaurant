//#region imports
import { Routes, Route } from "react-router-dom";
import Administrador from "../views/Admin/GestionComida/AdminDashBoard";
import CrearComida from "../views/Admin/GestionComida/CrearComida";
import EditarComida from "../views/Admin/GestionComida/EditarComida";
import RegistrarUsuario from "../views/Admin/GestionEmpleados/RegistrarUsuario";
import AdminEmpleados from "../views/Admin/GestionEmpleados/AdminEmpleados";
//#endregion
const RutasAdministrador = () => {
    return (
    <>
    <Routes>
        <Route exact path="/" element={<Administrador/>}/>
        <Route exact path="/ComidaNueva"element={<CrearComida/>}/>
        <Route exact path="/Empleados"element={<AdminEmpleados/>}/>
        <Route exact path="/Registro" element={<RegistrarUsuario/>}/>
        <Route exact path="/EditarComida/:_id"element={<EditarComida/>}/>
    </Routes>
    </>
    );
};

export default RutasAdministrador;