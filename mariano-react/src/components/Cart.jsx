// src/components/Cart.js
import React, { useContext } from 'react'; // <--- Asegúrate de importar useContext
import './styleCart.css';
import { CartContext } from '../context/CartContext';

// El componente ahora solo necesita isOpen y onClose como props, el resto viene del contexto
const Cart = ({ isOpen, onClose }) => {
  // Extrae solo lo que necesitas del contexto para este componente
  const { cart, handleDeleteFromCart, handleIncrementQuantity, handleDecrementQuantity } = useContext(CartContext);

  // Calcula el total del carrito
  const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2);

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className='cart-header'>
        <h2 style={{ color: 'black' }}>Carrito de Compras</h2>
        <button onClick={onClose} className='close-button'>X</button>
      </div>
      <div className='cart-content'>
        {cart.length === 0 ? (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>El carrito está vacío</p>
        ) : (
          <ul className='cart-items-list'> {/* Cambié la clase de 'cart-item' a 'cart-items-list' para el ul */}
            {cart.map((item) => (
              <li key={item.id} className='cart-item'> {/* Cada 'li' es un 'cart-item' individual */}
                <div className='item-details'>
                  <span style={{ color: 'black', fontWeight: 'bold' }}>{item.nombre}</span>
                  <span style={{ color: 'black' }}>${item.precio.toFixed(2)}</span>
                </div>
                <div className='item-controls'>
                  <button onClick={() => handleDecrementQuantity(item.id)} className='quantity-button'>-</button>
                  <span style={{ color: 'black', margin: '0 8px' }}>{item.quantity}</span>
                  <button onClick={() => handleIncrementQuantity(item.id)} className='quantity-button'>+</button>
                  <button onClick={() => handleDeleteFromCart(item.id)} className='delete-button'>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {cart.length > 0 && (
        <div className='cart-footer'>
          <h3 style={{ color: 'black' }}>Total: ${total}</h3>
          <button className='checkout-button'>Proceder al Pago</button>
        </div>
      )}
    </div>
  );
};

export default Cart;