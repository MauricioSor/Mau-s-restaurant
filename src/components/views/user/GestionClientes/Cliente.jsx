//#region imports
import React from 'react';
import { Button} from 'react-bootstrap';
//#endregion

const Cliente = ({ item, cargarCliente }) => {
    return (
        <tr>
            {
                <>
                    <td>{item._id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.telefono}</td>
                    <td>{item.direccion}</td>
                    <td>
                        <>
                            <Button className='btn btn-info' onClick={() => {cargarCliente(item) }}>Editar</Button>
                        </>
                    </td>
                </>
            }
        </tr>
    );
};

export default Cliente;