import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import RutasProtegidas from './rutas/RutasProtegidas';

import Home from './pages/Home';
import AcercaDe from './pages/AcercaDe';
import Contactos from './pages/Contactos';
import GaleriaDeProductos from './pages/GaleriaDeProductos';
import NotFound from './pages/NotFound';
import DetallesProductos from './components/DetallesDeProductos';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  return (
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
          <RutasProtegidas isAuthenticated={isAuthenticated} requiredRole="admin">
            <Admin />
          </RutasProtegidas>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
