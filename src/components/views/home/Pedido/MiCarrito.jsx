import { useEffect } from "react";

const MiCarrito = ({item}) => {
    useEffect(()=>{
    },[])
    return (
        <tr>
            {
                <>
                <td><img src={item.imagen} alt="" className="object-fit-contain" style={{width:"100px",height:"100px"}}/></td>
                <td>{item.nombre}</td>
                <td>{item.precio}</td>
                {/* <td>{item.}</td>
                <td>{item.}</td> */}
                </>
            }
        </tr>
    );
};

export default MiCarrito;