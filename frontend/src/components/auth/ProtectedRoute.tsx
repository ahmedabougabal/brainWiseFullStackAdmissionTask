import React, {FC} from 'react'
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export const ProtectedRoute : React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
    const {isAuthenticated , loading } = useAuth();
    const location = useLocation()
    if(loading){
        return <div>Loading...</div>; // I will add a proper loader component later
    }
    if(!isAuthenticated){
        return <Navigate to="/login" state={{from: location}} replace/>
    }
    return <>{children}</>;
};
