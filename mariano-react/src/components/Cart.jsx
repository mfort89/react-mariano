// src/components/Cart.js
import React, { useContext } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { CartContext } from "../context/CartContext.jsx"; // Asegúrate de que esta ruta sea correcta
import './styleCart.css'; // <--- ¡Asegúrate de que este archivo está siendo importado!

const Cart = ({ isOpen, onClose }) => {
  const { 
    cart, 
    eliminarProducto,      
    decrementarCantidad,   
    agregarCarrito         
  } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  // El componente se renderiza SIEMPRE. Su visibilidad y animación son controladas por CSS.
  // Ya no usamos 'return null' condicionalmente aquí.

  return (
    <>
      {/* Fondo oscuro que cubre la pantalla. Su opacidad se controla con la clase 'open'. */}
      <div 
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        // El z-index ya lo controlamos en styleCart.css
        onClick={onClose} // Cierra el carrito al hacer clic en este fondo
      ></div>

      {/* Sidebar real del carrito. Su posición se controla con la clase 'open'. */}
      <div 
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del sidebar cierre el carrito
      >
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button onClick={onClose} className="close-button">
            <X size={28} />
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <ul className="cart-items-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-details">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="cart-item-image" // Usamos tu clase de CSS
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/60x60/E0E0E0/333333?text=Prod`;
                      }}
                    />
                    <div>
                      <h3>{item.nombre}</h3>
                      <p>${item.precio.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="item-controls">
                    <button onClick={() => decrementarCantidad(item.id)} className="quantity-button">
                      <Minus size={18} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => agregarCarrito({ ...item, quantity: 1 })} className="quantity-button">
                      <Plus size={18} />
                    </button>
                    <button onClick={() => eliminarProducto(item.id)} className="delete-button">
                      <X size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cart-footer">
          <h3>Total: ${total.toFixed(2)}</h3>
          <button className="checkout-button">Proceder al Pago</button>
        </div>
      </div>
    </>
  );
};

export default Cart;