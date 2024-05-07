import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { modificarPedido } from '../../../helpers/queries';

const Pedido = ({ item, borrar, cargarPedido,cargarPedidos }) => {
    const [detalle, setDetalle] = useState([])
    const [carga, setCarga] = useState(false)
    useEffect(() => {
        (item.detalle).map((pedidos) => {
            setDetalle((anterior) => ([...anterior, "," + pedidos.nombre]))
        })
        setCarga(true)
    }, [])
    const cambiarEstado =(pedido,estado)=>{
        pedido.estado=estado
        modificarPedido(pedido).then((resp)=>{
            if(resp.status==201){
                Swal.fire("Modificado Exitosamente","","success")
                cargarPedidos("Cancelado");
            }else{
                Swal.fire("Error","Error al conectar con el servidor","error")
            }
        })
    }
    return (
        <tr>
            {carga ? (
                <>
                    <td>{item.estado}</td>
                    <td>{item.cliente.nombre}</td>
                    <td>{item.cliente.direccion}</td>
                    <td>{detalle}</td>
                    <td>{item.cliente.telefono}</td>
                    <td>${item.total}</td>
                    <td>{
                        <>
                            {item.estado == "Pendiente" ? (
                                (<Button variant="primary" onClick={() => cambiarEstado(item,"Enviado")}>
                            Completar</Button>)
                        ):<></>}
                            <Button className='btn btn-info' onClick={() => { cargarPedido(item, detalle) }}>Modificar</Button>
                            <Button className='btn btn-danger' type='submit'
                                onClick={() => {
                                    Swal.fire({
                                        title: "Esta seguro que desea cancelar el pedido?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Si, cancelar!",
                                        cancelButtonText: "Cancelar"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            cambiarEstado(item,"Cancelado")
                                        }
                                    });
                                }}
                            >Cancelar
                            </Button>
                        </>
                    }</td>
                </>) : (
                <>YA VA</>
            )
            }
        </tr>
    );
};

export default Pedido;