import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { listarComprobantes } from '../../../helpers/queries';
import Swal from 'sweetalert2';

const InformeVentas = () => {
    const [spinner, setspinner] = useState(false)
    const [comprobantes, setcomprobantes] = useState("")
    
    const cargarComprobantes=()=>{
        listarComprobantes().then((resp)=>{
            if(resp.status=200){
                setcomprobantes(resp.data)
                setspinner(true)
            }else{
                Swal.fire("error","","error")
            }
        })
    }
    useEffect(()=>{
        cargarComprobantes();
    },[])
    return (
        <Container>
            <h1>Informe de ventas realizadas</h1>
            {
                spinner?(
            <Table responsive>
            <thead>
                <td>Id</td>
                <td>Cliente</td>
                <td>Pago</td>
                <td>Mesa</td>
                <td>Empleado</td>
            </thead>
            <tbody>
                {
                    comprobantes.map((item,index)=>(
                        <Ventas item={item}key={index}/>
                    ))
                }
            </tbody>
            </Table>
                ):<></>
            }
        </Container>
    );
};

export default InformeVentas;