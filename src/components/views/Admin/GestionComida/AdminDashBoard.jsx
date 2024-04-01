//#region Imports
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DetalleComida from "./DetalleComida";
import { buscarComidas } from "../../../helpers/queries";
//#endregion

const Administrador = () => {
    const [comidas, setComidas] = useState([]);

    useEffect(() => {
        buscarComidas().then((respuesta) => {
            if(respuesta){
                (setComidas(respuesta.data)) 
            } 
            else{
                (Swal.fire('Error', 'Ocurrió un error en el servidor. Porfavor intente nuevamente', 'error'));
            }
        })
    }, []);
    return (
        <section className="container mainSection">
            <div className="d-flex justify-content-between align-items-center my-3">
                <h1 className="ms-3 display-4">Administrar comidas:</h1>
                <Link className="btn btn-primary" to="/administrador/AgregarComida" >Nuevo producto</Link>
            </div>
            <hr />
            <Table responsive striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>URL de Imagen</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        comidas.map((item, index) => (
                            <DetalleComida key={index} item={item} />
                        ))
                    }
                </tbody>
            </Table>
        </section>
    );
};

export default Administrador;