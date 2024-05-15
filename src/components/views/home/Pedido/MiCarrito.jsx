//#region imports
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
//#endregion
const MiCarrito = ({ item }) => {
    //#region hooks
    const [precio, setPrecio] = useState((item.precio) * (item.cantidad))
    const [cantidad, setcantidad] = useState(item.cantidad)
    //#endregion
    //#region funciones
    const agregar=(cantidad)=>{
        //
        //const pedido=localStorage.getItem("pedido");
        //pedido.push(cantidad)
        //console.log(pedido);
        console.log(cantidad);
    }
    const calcularPrecio = () => {
        const nuevoPrecio = item.precio * cantidad;
        setPrecio(nuevoPrecio);
    };
    useEffect(() => {
        localStorage.setItem("Total", "");
        localStorage.setItem("Total", precio)
    }, [precio])
    useEffect(() => {
        calcularPrecio();
    }, [cantidad])
    //#endregion
    return (
        <tr>
            {
                <>
                    <td>
                        <Container className="d-flex justify-content-around align-items-center">
                            <img src={item.imagen} alt="" className="object-fit-cover " style={{ borderRadius: "50%", width: "100px", height: "100px" }} />
                            {item.nombre}
                        </Container>
                    </td>
                    <td >{item.precio}$</td>
                    <td >
                        <input className="text-center" type="number" min={0}
                            defaultValue={cantidad}
                            disabled={true}
                            onChange={(e) => { setcantidad(e.target.value)}}
                        />
                    </td>
                    <td >{precio}$</td>
                </>
            }
        </tr>
    );
};

export default MiCarrito;