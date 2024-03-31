import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashBoard from '../views/user/UserDashBoard';

const RutasUser = () => {
    return (
        <>
        <Routes>
            <Route exact path='/' element={<UserDashBoard/>}/>
        </Routes>
        </>
    );
};

export default RutasUser;