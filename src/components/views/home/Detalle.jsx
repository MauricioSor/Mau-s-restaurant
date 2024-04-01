//#region Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Card, Container, Col, Row,Badge } from 'react-bootstrap'
import { buscarComida } from "../../helpers/queries";
//#endregion

const Detalle = () => {
//#region States
    const { id } = useParams();
    const [comida, setComida] = useState([]);
    const [mostrarSpinner, setMostrarSpinner] = useState(true);
    const [badge,setBadge]=useState();
//#endregion
//#region Functions
    const buscarComidas = () => {
        buscarComida(id).then((respuesta) => {
            if(respuesta.status)
            setComida(respuesta);
            capsula(respuesta.categoria);
            setMostrarSpinner(false);
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
        setMostrarSpinner(true);
        buscarComidas(id);
    }, [])
//#endregion
    return (
        <>
            {
                mostrarSpinner ?
                    (<div className="d-flex justify-content-center">
                        <Spinner/>
                    </div>) :
                    <>
                        <Container className="mt-2 mainSection">
                            <Card>
                                <Row>
                                    <Col md={6}>
                                        <Card.Img variant="top" src={comida.imagen} />
                                    </Col>
                                    <Col md={6}>
                                        <Card.Title className="text-center display-4">{comida.nombre}</Card.Title>
                                        <Card.Body>
                                            <Card.Text>
                                                <span>Valor: <strong>{comida.precio}</strong></span>
                                                <br />
                                                <p className="text-start">{comida.descripcion}</p>
                                                <br />
                                            </Card.Text>
                                            <Card.Footer className="align-self-start">
                                                <Badge bg={badge} className="text">{comida.categoria}</Badge>
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