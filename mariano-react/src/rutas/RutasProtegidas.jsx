import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 

const RutasProtegidas = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole } = useContext(CartContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutasProtegidas;
