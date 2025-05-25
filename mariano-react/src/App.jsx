
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, CartContext } from './context/CartContext.jsx';
import Header from "./components/estaticos/Header.jsx";
import Footer from "./components/estaticos/Footer.jsx";
import Cart from './components/Cart';
import HomePage from './pages/Home';
import AcercaDePage from './pages/AcercaDe';
import ContactosPage from './pages/Contactos';
import GaleriaDeProductosPage from './pages/GaleriaDeProductos';
import NotFoundPage from './pages/NotFound';
import AdminPage from './pages/Admin';
import DetallesProductosPage from './components/DetallesDeProductos';
import LoginPage from './pages/Login';
import RutaProtegida from './auth/RutasProtegidas';

import './styles/login.css'; 
import "./App.css";







// Componente que contendrá toda la lógica de la aplicación y las rutas
// Este componente estará envuelto por el CartProvider
function AppContent() {
  // Ahora podemos usar useContext porque AppContent está dentro de CartProvider
  const {
    cart, // Necesario para el conteo de ítems del carrito
    isAuthenticated, // Para controlar el acceso a rutas protegidas
    userRole, // Para mostrar opciones específicas en el Header (ej. "Admin")
    handleLogout // Para la funcionalidad de cerrar sesión
  } = useContext(CartContext);

  // Estado local para controlar la visibilidad del carrito (sidebar)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Calcular el número total de ítems en el carrito para el Header/Nav
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* El Header necesita props del contexto para mostrar el carrito y la autenticación */}
      <Header
        countItems={totalCartItems}
        toggleCart={toggleCart}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        handleLogout={handleLogout}
      />

      {/* Contenido principal de la aplicación */}
      <main className="flex-grow">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/acercade" element={<AcercaDePage />} />
          <Route path="/productos" element={<GaleriaDeProductosPage />} />
          <Route path="/productos/:id" element={<DetallesProductosPage />} />
          <Route path="/contacto" element={<ContactosPage />} />
          <Route path="/login" element={<LoginPage />} /> {/* Login Page usará handleLogin del contexto */}

          {/* Ruta Protegida para el Administrador */}
          <Route
            path="/admin"
            element={
              // RutaProtegida verifica 'isAuthenticated' y renderiza 'AdminPage' si tiene permisos
              <RutaProtegida isAuthenticated={isAuthenticated} requiredRole="admin">
                <AdminPage /> {/* AdminPage ya obtiene su info del contexto */}
              </RutaProtegida>
            }
          />

          {/* Ruta para cualquier URL no definida (NotFound) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* El componente Cart (sidebar) */}
      <Cart
        isOpen={isCartOpen}
        onClose={toggleCart}
        // Todas las funciones y el estado del carrito se obtienen directamente en el componente Cart.js
      />

      <Footer />
    </div>
  );
}

// El componente App principal que envuelve todo con el Router y el CartProvider
function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;