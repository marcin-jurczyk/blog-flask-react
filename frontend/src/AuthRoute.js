import React from 'react'
import {Redirect, Route} from "react-router";
import jwt_decode from "jwt-decode";


export const AuthRoute = ({children, ...rest}) => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') return <Redirect to={`/login`}/>;

    const decoded = jwt_decode(token);
    const now = Date.now() / 1000;
    if (decoded.exp <= now) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return <Redirect to={`/`}/>;
    }
    return <Route {...rest}>{children}</Route>
};
