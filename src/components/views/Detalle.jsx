import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Card, Container, Col, Row } from 'react-bootstrap'
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
                        <Container className="mt-2 mainSection">
                            <Card>
                                <Row>
                                    <Col md={6}>
                                        <Card.Img variant="top" src={receta.imagen} />
                                    </Col>
                                    <Col md={6}>
                                        <Card.Title className="text-center display-4">{receta.nombre}</Card.Title>
                                        <Card.Body>
                                            <Card.Text>
                                                <span>Valor: <strong>${receta.precio}</strong></span>
                                                <br />
                                                <p className="text-center">Descripcion:{receta.descripcion}</p> 
                                                <br/>
                                            </Card.Text>
                                            <Card.Footer className="align-self-start">
                                            <p className="text">{receta.categoria}</p>
                                            </Card.Footer>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                            <br />
                        </Container>
                    </>

            }
        </>
    );
};

export default Detalle;