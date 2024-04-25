//#region Imports Enviroments
import axios from 'axios';
//#endregion
//#region Endpoints de Usuarios

export const iniciarSesion = async (usuario) => {
    try {
        const consulta = await axios.post(`${import.meta.env.VITE_PROD_API}/apiUsuarios/autenticacion`,{
            email:usuario.email,
            contraseña:usuario.contraseña
        })
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const listarUsuarios = async () => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiUsuarios/`)
        return consulta
    } catch (error) {
        return(error);
    }
};
export const crearUsuario = async (usuario) => {
    try {
        const consulta = await axios.post(`${import.meta.env.VITE_PROD_API}/apiUsuarios/nuevo`,usuario)
        return consulta;
    } catch (error) {
        return(error);
    }
}
export const modificarUsuario = async (usuario) => {
    try {
        const consulta = await axios.put(`${import.meta.env.VITE_PROD_API}+/apiUsuarios/${usuario.id}`,{
            
        });
        return consulta;
    } catch (error) {
        console.error("Error al modificar usuario:", error);
    }
}
export const borrarUsuario = async (usuario) => {
    try {
        const consulta = await axios.delete(`${import.meta.env.VITE_PROD_API}/apiUsuarios/${usuario._id}`);
        return consulta;
    } catch (error) {
        console.log(error);
    }
}
//#endregion
//#region Endpoints de Comidas 
export const buscarComidas = async () => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiComidas/`);
        return consulta;
    } catch (error) {
        return (error)
    }
}
export const buscarComida = async (id) => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiComidas/${id}`);
        return consulta;
    } catch (error) {
        console.log(error)
    }
}
export const crearComida = async (comida) => {
    try {
        const consulta = await fetch(`${import.meta.env.VITE_PROD_API}/apiComidas/nueva`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comida)

        });
        return consulta;
    } catch (error) {
        console.log(error);
    }
}

export const editarComida = async (comida) => {
    try {
        const consulta = await axios.put(`${import.meta.env.VITE_PROD_API}/apiComidas/${comida._id}`,{body:comida});
        return consulta;
    } catch (error) {
        return(error);
    }
}
export const borrarComida = async (id) => {
    try {
        const consulta = await fetch(`${import.meta.env.VITE_PROD_API}/apiComidas/${id}`, {
            method: "DELETE"
        });
        return consulta;
    } catch (error) {
        console.log(error);
    }
}
//#endregion
//#region Endpoints de Pedidos

export const buscarPedido = async (pedido) => {
    try {
        const consulta = await axios.post(`${import.meta.env.VITE_PROD_API}/apiPedidos/${pedido}`,{
            email:pedido.email,
            contraseña:pedido.contraseña
        })
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const listarPedidos = async () => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiPedidos/`)
        return consulta
    } catch (error) {
        return(error);
    }
};
export const crearPedido = async (pedido) => {
    try {
        const consulta = await axios.post(`${import.meta.env.VITE_PROD_API}/apiPedidos/nuevo`,pedido)
        return consulta;
    } catch (error) {
        return(error);
    }
}
export const modificarPedido = async (pedido) => {
    try {
        const consulta = await axios.put(`${import.meta.env.VITE_PROD_API}/apiPedidos/${pedido._id}`);
        return consulta;
    } catch (error) {
        console.error("Error al modificar pedido:", error);
    }
}
export const borrarPedido = async (pedido) => {
    try {
        const consulta = await axios.delete(`${import.meta.env.VITE_PROD_API}/apiPedidos/${pedido._id}`);
        return consulta;
    } catch (error) {
        console.log(error);
    }
}

//#endregion
//#region Endpoints de Comprobantes
export const listarComprobantes = async () => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiComprobantes/`)
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const buscarComprobante = async (comprobante) => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiComprobantes/${comprobante}`)
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const modificarComprobante = async (comprobante) => {
    try {
        const consulta = await axios.put(`${import.meta.env.VITE_PROD_API}/apiComprobantes/${comprobante.id}`,{
            cliente:comprobante.cliente,
            total:comprobante.total,
            pago:comprobante.pago,
            mesa:comprobante.mesa
        })
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const borrarComprobante = async (id) => {
    try {
        const consulta = await axios.delete(`${import.meta.env.VITE_PROD_API}/apiComprobantes/${id}`)
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const crearComprobante = async (comprobante) => {
    try {
        const consulta = await axios.post(`${import.meta.env.VITE_PROD_API}/apiComprobantes/`,{
            cliente:comprobante.cliente,
            total:comprobante.total,
            pago:comprobante.pago,
            mesa:comprobante.mesa
        })
        return consulta
    } catch (error) {
        console.log(error);
    }
};
//#endregion
//#region Endpoints de Roles
export const listarRoles = async (usuario) => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiRoles/`)
        return consulta
    } catch (error) {
        console.log(error);
    }
};
//#endregion
//#region Endpoints de Clientes
export const listarClientes = async () => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiClientes/`)
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const crearCliente = async () => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiClientes/nuevo`)
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const modificarCliente= async (cliente) => {
    try {
        const consulta = await axios.put(`${import.meta.env.VITE_PROD_API}/apiComprobantes/${cliente._id}`,{
            nombre:cliente.nombre,
            telefono:cliente.telefono,
            direccion:cliente.direccion,
        })
        return consulta
    } catch (error) {
        console.log(error);
    }
};
//#endregion