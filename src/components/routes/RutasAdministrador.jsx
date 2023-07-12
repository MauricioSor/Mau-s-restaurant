import { Routes, Route } from "react-router-dom";
import Administrador from "../views/Administrador";
import CrearComida from "../views/comidas/CrearComida";
import EditarComida from "../views/comidas/EditarComida";
import RegistrarUsuario from "../views/RegistrarUsuario";
const RutasAdministrador = () => {
    return (
    <>
    <Routes>
        <Route exact path="/" element={<Administrador></Administrador>}></Route>
        <Route exact path="/AgregarComida"element={<CrearComida></CrearComida>}></Route>
        <Route exact path="/Registro" element={<RegistrarUsuario></RegistrarUsuario>}></Route>
        <Route exact path="/EditarComida/:_id"element={<EditarComida></EditarComida>}></Route>
    </Routes>
    </>
    );
};

export default RutasAdministrador;