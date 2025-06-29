import React, { useContext } from 'react';
import './styleCart.css';
import { CartContext } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { cart, handleDeleteFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className='cart-header'>
        <h2 style={{ color: 'black' }}>Carrito de Compras</h2>
        <button
          style={{ color: 'blue' }}
          onClick={onClose}
          className='close-button'
          aria-label='Cerrar carrito'
        >
          X
        </button>
      </div>

      <div className='cart-content'>
        {cart.length === 0 ? (
          <p style={{ color: 'red' }}>El carrito está vacío</p>
        ) : (
          <>
            <ul className='cart-item'>
              {cart.map((item) => (
                <li key={item.id} style={{ color: 'black' }}>
                  {item.nombre} - ${item.precio.toFixed(2)} - Cant: {item.cantidad}
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteFromCart(item)}
                    aria-label={`Eliminar ${item.nombre}`}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>

            <div className='cart-footer'>
              <p style={{ color: 'blue' }}>
                Total: <strong>${total.toFixed(2)}</strong>
              </p>
              <button
                style={{ color: 'black' }}
                onClick={clearCart}
                className='btnCheckout'
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
