import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext)

    if(user && user?.email){
        return children
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;