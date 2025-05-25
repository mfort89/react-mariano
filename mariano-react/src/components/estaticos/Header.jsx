
import React, { useContext } from 'react'; 
import { Link } from 'react-router-dom';
import { CartContext } from "../../context/CartContext.jsx";
import "./styleEstaticos.css";
import Cart from "../Cart.jsx";

// El Header ahora recibe props para controlar el carrito y el logout
const Header = ({ countItems, toggleCart, isAuthenticated, userRole, handleLogout }) => {
  
  const { cart } = useContext(CartContext); // Solo para el conteo si no viene en props

  // Si countItems viene como prop, úsalo. Si no, calcula del contexto.
  const displayCountItems = countItems !== undefined ? countItems : cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/' className='link'>Inicio</Link></li>
          <li><Link to='/acercade' className='link'>Sobre nosotros</Link></li>
          <li><Link to='/productos' className='link'>Galería de Productos</Link></li>
          <li><Link to='/contacto' className='link'>Contacto</Link></li>

          {/* Icono del carrito con contador */}
          <li className='cartnav'>
            <button className='btnCart' onClick={toggleCart}>
              <i className="fa-solid fa-cart-shopping"></i>
              {/* Muestra el número de ítems si hay alguno */}
              {displayCountItems > 0 && (
                <span className="cart-item-count">{displayCountItems}</span>
              )}
            </button>
            {/* El componente Cart ya NO se renderiza aquí directamente.
                Se renderiza en AppContent y se controla con 'isCartOpen'.
                Así evitamos renderizar el sidebar dentro del Header. */}
          </li>

          {/* Lógica condicional para el login/logout y el panel de admin */}
          {!isAuthenticated ? (
            // Si NO está autenticado, muestra el botón de Login
            <li className='btnLogin'>
              <Link to='/login' className='link'><i className="fa-solid fa-right-to-bracket"></i> Login</Link>
            </li>
          ) : (
            // Si está autenticado
            <>
              {userRole === 'admin' && (
                // Si es admin, muestra el botón de Admin
                <li className='btnAdmin'>
                  <Link to='/admin' className='link'><i className="fa-solid fa-user-tie"></i> Admin</Link>
                </li>
              )}
              {/* Muestra el botón de Logout */}
              <li className='btnLogout'>
                <button onClick={handleLogout} className='link'> {/* handleLogout viene de las props */}
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;