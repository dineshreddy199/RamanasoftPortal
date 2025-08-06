import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // adjust path as needed

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/loginPage" replace />;
  }

  return children;
};

export default ProtectedRoute;
