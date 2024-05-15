import axios from 'axios';
//#region Api de Usuarios

export const iniciarSesion = async (usuario) => {
    try {
        const consulta = await axios.post(`${import.meta.env.VITE_PROD_API}/apiUsuarios/autenticacion`,{
            email:usuario.email,
            contraseña:usuario.contraseña
        })
        return consulta
    } catch (error) {
        console.log(error);
        return error;
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
        const consulta = await axios.put(`${import.meta.env.VITE_PROD_API}/apiUsuarios/${usuario._id}`,{
            usuario
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
//#region Api de Comidas 
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
//#region Api de Pedidos
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
export const listarPedidosPorEstado = async (estadoEnviado) => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiPedidos/filtro/${estadoEnviado}`);
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
        const consulta = await axios.put(`${import.meta.env.VITE_PROD_API}/apiPedidos/${pedido._id}`,{body:pedido});
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
//#region Api de Comprobantes
export const listarComprobantes = async () => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiComprobantes/`)
        return consulta
    } catch (error) {
        return (error);
    }
};
export const buscarComprobante = async (comprobante) => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiComprobantes/${comprobante}`)
        return consulta
    } catch (error) {
        return (error);
    }
};
export const modificarComprobante = async (comprobante) => {
    try {
        const consulta = await axios.put(`${import.meta.env.VITE_PROD_API}/apiComprobantes/${comprobante._id}`,{
            comprobante
        })
        return consulta
    } catch (error) {
        return (error);
    }
};
export const borrarComprobante = async (id) => {
    try {
        const consulta = await axios.delete(`${import.meta.env.VITE_PROD_API}/apiComprobantes/${id}`)
        return consulta
    } catch (error) {
        return (error);
    }
};
export const crearComprobante = async (comprobante) => {
    try {
        
        const consulta = await axios.post(`${import.meta.env.VITE_PROD_API}/apiComprobantes/crear/`,{comprobante})
        return consulta
    } catch (error) {
        return (error);
    }
};
//#endregion
//#region Api de Roles
export const listarRoles = async (usuario) => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiRoles/`)
        return consulta
    } catch (error) {
        console.log(error);
    }
};
//#endregion
//#region Api de Clientes
export const listarClientes = async () => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiClientes/`)
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const buscarCliente = async (cliente) => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiClientes/${cliente._id}`)
        return consulta
    } catch (error) {
        return(error);
    }
};
export const crearCliente = async (cliente) => {
    try {
        const consulta = await axios.post(`${import.meta.env.VITE_PROD_API}/apiClientes/nuevo`,{cliente})
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const modificarCliente= async (cliente) => {
    try {
        const consulta = await axios.put(`${import.meta.env.VITE_PROD_API}/apiClientes/${cliente._id}`,{cliente})
        return consulta
    } catch (error) {
        console.log(error);
    }
};

//#endregion
//#region Api de Mesas
export const listarMesas = async () => {
    try {
        const consulta = await axios.get(`${import.meta.env.VITE_PROD_API}/apiMesas/`)
        return consulta
    } catch (error) {
        console.log(error);
    }
};
export const modificarMesa= async (id,mesa) => {
    try {
        const consulta = await axios.put(`${import.meta.env.VITE_PROD_API}/apiMesas/${id}`,{mesa})
        return consulta
    } catch (error) {
        console.log(error);
    }
};
//#endregion