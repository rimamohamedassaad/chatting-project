import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import Login from '../pages/Login';
import { Route, Navigate ,Outlet} from 'react-router-dom';
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext)
    if (user) return <Outlet />;
    else return <Login />; //if not authenticated
};