// src/App.jsx (Este archivo NO ha cambiado respecto a mi última versión)
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, CartContext } from './context/CartContext.jsx';

// Importa tus componentes de página
import HomePage from './pages/Home';
import AcercaDePage from './pages/AcercaDe';
import ContactosPage from './pages/Contactos';
import GaleriaDeProductosPage from './pages/GaleriaDeProductos';
import NotFoundPage from './pages/NotFound';
import AdminPage from './pages/Admin';
import DetallesProductosPage from './components/DetallesDeProductos';
import LoginPage from './pages/Login';
import RutaProtegida from './auth/RutasProtegidas';

// Importa los componentes estáticos (Header, Footer, Cart sidebar)
import Header from "./components/estaticos/Header.jsx";
import Footer from "./components/estaticos/Footer.jsx";
import Cart from './components/Cart'; 

// Importa tus estilos globales
import './styles/login.css';
import "./App.css";

function AppContent() {
  const {
    cart,
    isAuthenticated,
    userRole,
    handleLogout,
    eliminarProducto, // Nombre de función desde CartContext
    decrementarCantidad, // Nombre de función desde CartContext
    agregarCarrito // Nombre de función desde CartContext
  } = useContext(CartContext);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => {
      console.log('toggleCart llamado. isCartOpen cambia de', prev, 'a', !prev);
      return !prev;
    });
  }, []);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        countItems={totalCartItems}
        toggleCart={toggleCart}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        handleLogout={handleLogout}
      />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/acercade" element={<AcercaDePage />} />
          <Route path="/productos" element={<GaleriaDeProductosPage />} />
          <Route path="/productos/:id" element={<DetallesProductosPage />} />
          <Route path="/contacto" element={<ContactosPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/admin"
            element={
              <RutaProtegida isAuthenticated={isAuthenticated} requiredRole="admin">
                <AdminPage />
              </RutaProtegida>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Renderiza el componente Cart (sidebar) */}
      <Cart
        cartItems={cart}
        isOpen={isCartOpen}
        onClose={toggleCart}
        onRemove={eliminarProducto} 
        onIncrement={agregarCarrito} 
        onDecrement={decrementarCantidad} 
      />

      <Footer />
    </div>
  );
}

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