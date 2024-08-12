import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Card, Button, Container, Row, Spinner } from 'react-bootstrap';

const CardComidasSkeleton = () => (
    <Container className='d-flex justify-content-center my-2'>
        <Row lg={6} md={4} sm={1} className='d-flex justify-content-center'>
            {[...Array(6)].map((_, index) => (
                <Card className='mx-1 mt-3' style={{ width: '18rem' }} key={index}>
                    <Container className='d-flex justify-content-center align-items-center'>
                    <Spinner animation='grow' variant='primary'style={{ minWidth: '10vh',minHeight:"10vh" }}/>
                    </Container>
                    <Card.Body className='d-flex flex-column justify-content-center'>
                        <Skeleton count={3}  />
                        <Skeleton count={3}  />
                        <div className='text-center mt-auto'>
                            <Skeleton width={150} height={40} />
                        </div>
                        <Button><Skeleton baseColor='#00FF0000' highlightColor='white'/></Button>
                    </Card.Body>
                </Card>
            ))}
        </Row>
    </Container>
);

export default CardComidasSkeleton;