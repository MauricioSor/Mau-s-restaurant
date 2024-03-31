//#region Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Card, Container, Col, Row,Badge,Stack } from 'react-bootstrap'
import { buscarComida } from "../../helpers/queries";
//#endregion

const Detalle = () => {
//#region States
    const { id } = useParams();
    const [receta, setReceta] = useState();
    const [mostrarSpinner, setMostrarSpinner] = useState(true);
    const [badge,setBadge]=useState();
//#endregion
//#region Functions
    const buscarRecetas = () => {
        buscarComida(id).then((respuesta) => {
            setReceta(respuesta);
            setMostrarSpinner(false);
            capsula(respuesta.categoria);
        })
    }
    const capsula = (categoria) => {
        switch (categoria) {
            case "Calientes":
                setBadge("danger");
                break;
            case "Bebida Caliente":
                setBadge("danger");
                break;
            case "Bebida fria":
                setBadge("info");
                break;
            case "Simples":
                setBadge("light");
                break;
            case "Frio":
                setBadge("info");
                break;
            case "Pastas":
                setBadge("warning");
                break;
            case "Sandwich":
                setBadge("success");
                break;
            case "Minutas":
                setBadge("secondary");
                break;
            case "Guarnicion":
                setBadge("secondary");
                break;
        }
    }
    useEffect(() => {
        console.log(id);
        setMostrarSpinner(true);
        buscarRecetas(id);
    }, [])
//#endregion
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
                                                <p className="text-start">{receta.descripcion}</p>
                                                <br />
                                            </Card.Text>
                                            <Card.Footer className="align-self-start">
                                                <Badge bg={badge} className="text">{receta.categoria}</Badge>
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