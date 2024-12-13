import React, { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminRoute: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated && user?.role !== 'ADMIN') {
            toast.error('Access denied. Admin privileges required.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }, [isAuthenticated, user?.role]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin" state={{ from: location }} replace />;
    }

    // Check if user is admin
    if (user?.role !== 'ADMIN') {
        return <Navigate to="/employee" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
