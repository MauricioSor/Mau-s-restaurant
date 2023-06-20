import { Routes, Route } from "react-router-dom";
import Administrador from "../views/Administrador";
import CrearComida from "../views/comidas/CrearComida";
import EditarComida from "../views/comidas/EditarComida";
const RutasAdministrador = () => {
    return (
    <>
    <Routes>
        <Route exact path="/" element={<Administrador></Administrador>}></Route>
        <Route exact path="/AgregarComida"element={<CrearComida></CrearComida>}></Route>
        <Route exact path="/EditarComida/:id"element={<EditarComida></EditarComida>}></Route>
    </Routes>
    </>
    );
};

export default RutasAdministrador;