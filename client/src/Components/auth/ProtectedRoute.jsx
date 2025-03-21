import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Feature/UserSlice';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const user = useSelector(selectUser);
    
    // Allow access if either JWT token or Firebase auth is present
    if (!token && !user) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

export default ProtectedRoute;
