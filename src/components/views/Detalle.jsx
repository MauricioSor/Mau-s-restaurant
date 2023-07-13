import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Card, Container } from 'react-bootstrap'
import { buscarcomida } from "../helpers/queries";
const Detalle = () => {

    const { id } = useParams();
    const [receta, setReceta] = useState();
    const [mostrarSpinner, setMostrarSpinner] = useState(true);

    const buscarRecetas = () => {
        buscarcomida(id).then((respuesta) => {
            setReceta(respuesta);
            setMostrarSpinner(false);
        })
    }
    useEffect(() => {
        console.log(id);
        setMostrarSpinner(true);
        buscarRecetas(id);
    }, [])
    return (
        <>
            {
                mostrarSpinner ?
                    (<div className="d-flex justify-content-center">
                        <Spinner></Spinner>
                    </div>) :
                    <>
                        <Container className="mainSection">
                            <Card>
                                <Card.Img variant="start" src={receta.imagen} />
                                <Card.Body>
                                    <Card.Text>
                                        {receta.descripcion}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <br />
                        </Container>
                    </>

            }
        </>
    );
};

export default Detalle;