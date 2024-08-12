import React from 'react';
import { Carousel, Spinner } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const CarouselSkeleton = () => {
    return (
        <>
            <Carousel style={{ width: '100%' }}>
                <Carousel.Item>
                    <div className='d-flex justify-content-center align-items-center fluid' fluid style={{ height: '400px' }}>
                        <Spinner animation='grow' variant='primary' style={{minWidth:"30vh",minHeight:"30vh"}} />
                    </div>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default CarouselSkeleton;