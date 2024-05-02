//#region Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Card, Container, Col, Row,Badge,Button } from 'react-bootstrap'
import { buscarComida } from "../../helpers/queries";
import RealizarPedido from "./Pedido/RealizarPedido";
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
            setComida(respuesta.data);
            setMostrarSpinner(false);
        })
    }
    useEffect(() => {
        setMostrarSpinner(true);
        buscarComidas(id);
    }, [])
    const realizarPedido=()=>{
        localStorage.setItem("pedido",comida)
    }
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
                                                <p>Precio:{comida.precio}</p>
                                                <br />
                                                <p className="text-start">{comida.descripcion}</p>
                                                <br />
                                            </Card.Text>
                                            <Card.Footer className="align-self-start">
                                                <Button  className="text-center">Agregar al carrito</Button>
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