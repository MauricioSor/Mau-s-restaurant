//#region imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  Card, Container, Col, Row,Button } from 'react-bootstrap'
import { buscarComida } from "../../../helpers/queries";
import SpinnerCustom from "../../../common/SpinnerCustom";
//#endregion

const Detalle = () => {
//#region hooks
    const { id } = useParams();
    const [comida, setComida] = useState([]);
    const [mostrarSpinner, setMostrarSpinner] = useState(true);
//#endregion
//#region funciones
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
//#endregion
    return (
        <>
            {
                mostrarSpinner ?
                    (<SpinnerCustom/>) :
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
                                                <span>Precio:{comida.precio}</span>
                                                <br />
                                                <span className="text-start">{comida.descripcion}</span>
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