import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Pedido = ({ item, borrar,cargarPedido }) => {
    const [detalle, setDetalle] = useState([])
    const [carga, setCarga] = useState(false)
    useEffect(()=>{
        (item.detalle).map((pedidos)=>{
            setDetalle((anterior)=>([...anterior,","+pedidos.nombre]))
        })
        setCarga(true)
    },[item])
    return (
        <tr>
            { carga?(
                <>
                {console.log(item)}
                    <td>{item.estado}</td>
                    <td>{item.cliente.nombre}</td>
                    <td>{item.cliente.direccion}</td>
                    <td>{detalle}</td>
                    <td>{item.cliente.telefono}</td>
                    <td>${item.total}</td>
                    <td>{
                        <>
                            <Button className='btn btn-info' onClick={() => {  cargarPedido(item,detalle) }}>Ver/editar</Button>
                            <Button className='btn btn-danger' type='submit'
                                onClick={() => {
                                    Swal.fire({
                                        title: "Esta seguro que desea borrar el comprobante?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Si, eliminar!",
                                        cancelButtonText: "Cancelar"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            //borrar(item);
                                        }
                                    });
                                }}
                            >Borrar
                            </Button>
                        </>
                    }</td>
                </>):(
                    <>YA VA</>
                )
            }
        </tr>
    );
};

export default Pedido;