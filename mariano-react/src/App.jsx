import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import Home from './pages/Home';
import AcercaDe from './pages/AcercaDe';
import Contactos from './pages/Contactos';
import GaleriaDeProductos from './pages/GaleriaDeProductos';
import NotFound from './pages/NotFound';
import DetallesProductos from './components/DetallesDeProductos';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Header from './components/estaticos/Header.jsx';
import Footer from './components/estaticos/Footer.jsx';
import Cart from './components/Cart.jsx';

// Componentes de rutas protegidas
import RutasProtegidas from './rutas/RutasProtegidas';

// Importamos CartContext para obtener el estado de autenticación (y todo lo demás)
import { CartContext } from './context/CartContext.jsx';

function App() {

  const { isAuthenticated, userRole } = useContext(CartContext);

  return (
    <>
      <Header />

      <Container as="main" className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acercade" element={<AcercaDe />} />
          <Route path="/productos" element={<GaleriaDeProductos />} />
          <Route path="/productos/:id" element={<DetallesProductos />} />
          <Route path="/contacto" element={<Contactos />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={


              <RutasProtegidas isAuthenticated={isAuthenticated} requiredRole="admin" userRole={userRole}>
                <Admin />
              </RutasProtegidas>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>

      <Footer />
      <Cart />
    </>
  );
}

export default App;