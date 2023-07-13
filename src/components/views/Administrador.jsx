import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DetalleComida from "./comidas/DetalleComida";
import { buscarcomidas } from "../helpers/queries";
const Administrador = () => {
    const [comidas,setComidas]= useState([]);
    
    useEffect(() =>{
    buscarcomidas().then((respuesta)=>{
    respuesta?(setComidas(respuesta)):(Swal.fire('Error','Intente nuevamente','error'));    
    })
    },[]);
    
    return (
        <section className="container mainSection">
            <div className="d-flex justify-content-between align-items-center my-3"> 
            <h1 className="ms-3 display-4">Administrar Productos:</h1>
            <Link className="btn btn-primary" to="/administrador/AgregarComida" >Agregar</Link>
            </div>
            <hr />
            <Table responsive striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>URL de Imagen</th>
                        <th>Descripcion</th>
                        <th>Categoria</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    comidas.map((item,index)=>(
                    <DetalleComida key={index} item={item} />
                    ))
                    }
                </tbody>
            </Table>
        </section>
    );
};

export default Administrador;