//#region imports
import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
//#endregion
const SpinnerCustom = () => {
    return (
        <Container className='d-flex justify-content-center align-items-center'>
            <Spinner variant='primary' />
        </Container>
    );
};

export default SpinnerCustom;