import React, { useContext } from 'react';
import './styleCart.css';
import { CartContext } from '../context/CartContext'; // Asegúrate de que la ruta sea correcta

const Cart = ({ isOpen, onClose }) => {
  // Extrae las funciones y el estado del carrito del contexto
  const { cart, agregarCarrito, restarCantidad, eliminarProducto, vaciarCarrito } = useContext(CartContext);

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
          <ul className='cart-items-list'>
            {cart.map((item) => (
              <li key={item.id} className='cart-item'>
                <div className='item-details'>
                  <span style={{ color: 'black', fontWeight: 'bold' }}>{item.nombre}</span>
                  <span style={{ color: 'black' }}>${item.precio.toFixed(2)}</span>
                </div>
                <div className='item-controls'>
                  {/* Botón para restar cantidad */}
                  <button 
                    onClick={() => restarCantidad(item.id)} 
                    className='quantity-button'
                    disabled={item.quantity <= 1} // Deshabilita si la cantidad es 1 o menos
                  >
                    -
                  </button>
                  <span style={{ color: 'black', margin: '0 8px' }}>{item.quantity}</span>
                  {/* Botón para sumar cantidad (usa agregarCarrito con cantidad 1) */}
                  <button 
                    onClick={() => agregarCarrito({ ...item, quantity: 1 })} // Pasa el item y quantity: 1
                    className='quantity-button'
                    disabled={item.quantity >= item.stock} // Deshabilita si ya tiene el stock máximo
                  >
                    +
                  </button>
                  {/* Botón para eliminar completamente el producto */}
                  <button 
                    onClick={() => eliminarProducto(item.id)} 
                    className='delete-button'
                  >
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
          <button onClick={vaciarCarrito} className='clear-cart-button'>Vaciar Carrito</button> {/* Nuevo botón */}
          <button className='checkout-button'>Proceder al Pago</button>
        </div>
      )}
    </div>
  );
};

export default Cart;