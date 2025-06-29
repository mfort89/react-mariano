// src/components/estaticos/Header.jsx
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '@/context/CartContext.jsx';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const { cart, isAuthenticated, userRole, handleLogout } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className="link">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/productos" className="link">Productos</NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className="link">Contacto</NavLink>
          </li>
          <li>
            <NavLink to="/acerca" className="link">Acerca de</NavLink>
          </li>

          <li className="cartnav">
            <Link to="/carrito" className="btnCart">
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="cart-item-count">{totalItems}</span>
              )}
            </Link>
          </li>

          {!isAuthenticated ? (
            <li className="btnLogin">
              <NavLink to="/login" className="link">Login</NavLink>
            </li>
          ) : (
            <>
              {userRole === 'admin' && (
                <li className="btnAdmin">
                  <NavLink to="/admin" className="link">Admin</NavLink>
                </li>
              )}
              <li className="btnLogout">
                <button onClick={handleLogout} className="link">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
