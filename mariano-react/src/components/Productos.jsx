
// src/components/Productos.js
import React, { useState } from 'react';
import "./styleProductos.css"; 

const Productos = ({ producto, agregarCarrito }) => {
  const [cantidad, setCantidad] = useState(1); // Estado local para la cantidad a añadir

  // Función para manejar la adición al carrito
  const handleAddToCartClick = () => {
    // Pasa el producto y la cantidad seleccionada a la función del carrito
    // Ajustamos la lógica de cantidad. El contexto ya maneja el incremento,
    // así que aquí solo pasamos el producto completo para que se añada una vez.
    // Si la idea es añadir 'cantidad' unidades de golpe, la lógica del contexto debe ajustarse.
    // Por simplicidad, el botón "Agregar" añade 1 unidad por defecto al hacer clic.
    // Los botones +/- son para ajustar la cantidad antes de añadir.
    agregarCarrito({ ...producto, quantity: cantidad }); // Pasamos el producto con la cantidad deseada
    setCantidad(1); // Reinicia la cantidad a 1 después de añadir
  };

  // Función para incrementar la cantidad
  const handleIncrement = () => {
    setCantidad(prev => Math.min(prev + 1, producto.stock)); // No exceder el stock
  };

  // Función para decrementar la cantidad
  const handleDecrement = () => {
    setCantidad(prev => Math.max(prev - 1, 1)); // Mínimo 1 unidad
  };


  return (
    <div className="card">
      <div className="imganContainer">
        <img src={producto.imagen} alt={producto.nombre} className="imagen" />
      </div>
      <h3 className="nombre">{producto.nombre}</h3>
      <p className="precio">${producto.precio.toFixed(2)}</p>
      <p className="stock">Stock disponible: {producto.stock}</p>

      {/* Control de cantidad para añadir al carrito */}
      <div className="cantidadContainer">
        <button className="qtyButton" onClick={handleDecrement} disabled={cantidad === 1}>
          -
        </button>
        <span className="qtyDisplay">{cantidad}</span>
        <button className="qtyButton" onClick={handleIncrement} disabled={cantidad === producto.stock}>
          +
        </button>
      </div>

      <button
        onClick={handleAddToCartClick}
        className="addToCartButton" // Añadimos una clase específica para el botón de añadir al carrito
        disabled={producto.stock === 0} // Deshabilita si no hay stock
      >
        {producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
      </button>
    </div>
  );
};

export default Productos;