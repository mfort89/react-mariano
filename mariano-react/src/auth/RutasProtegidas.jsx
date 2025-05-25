// src/auth/RutasProtegidas.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react'; // Necesitamos useContext para obtener el userRole
import { CartContext } from '../context/CartContext'; // Importa el CartContext

// Añadimos una prop opcional 'requiredRole'
function RutaProtegida({ children, requiredRole }) {
  // Obtenemos isAuthenticated y userRole del contexto
  const { isAuthenticated, userRole } = useContext(CartContext);

  if (!isAuthenticated) {
    // Si no está autenticado, siempre redirigir a login
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, pero se requiere un rol específico y el usuario no lo tiene
  if (requiredRole && userRole !== requiredRole) {
    // Podrías redirigir a una página de "Acceso Denegado" o al Home
    return <Navigate to="/" replace />; // Redirige al home por defecto si no tiene el rol
  }

  // Si está autenticado y cumple con el rol (si se especificó uno), renderiza el contenido
  return children;
}
export default RutaProtegida;