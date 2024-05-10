import React from 'react';
import { Button } from 'react-bootstrap';

const Venta = ({ item, cargarComprobante }) => {
    return (
        <>
            <tr>
                {<>
                    <td>{item._id}</td>
                    <td>{item.cliente.nombre}</td>
                    <td>{item.total}</td>
                    <td>{item.pago}</td>
                    <td>{item.mesa}</td>
                    <td>{item.usuario.nombre}</td>
                    <td>
                        {
                            <>
                                <Button variant='info' onClick={() => cargarComprobante(item)}>Ver detalle</Button>
                            </>
                        }
                    </td>
                </>}
            </tr>
        </>
    );
};

export default Venta;