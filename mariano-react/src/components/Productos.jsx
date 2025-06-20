// src/components/Productos.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Asegúrate de que esta ruta sea correcta para styleProductos.css
// Si styleProductos.css está en la misma carpeta que Productos.jsx, esta ruta es correcta.
import './styleProductos.css'; 

const Productos = ({ producto, agregarCarrito }) => {
  return (
    // Las clases 'card', 'imganContainer', 'imagen', 'info-section', 'nombre', etc.,
    // son definidas en 'src/components/styleProductos.css'
    <div className="card">
      {/* Link que envuelve la imagen para ir a la página de detalles del producto */}
      <Link to={`/productos/${producto.id}`} className="image-link">
        <div className="imganContainer">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="imagen"
            onError={(e) => {
              e.target.onerror = null;
              // [Image of Placeholder product image]
              e.target.src = `https://placehold.co/400x300/E0E0E0/333333?text=Producto`;
            }}
          />
        </div>
      </Link>

      {/* Sección de información del producto */}
      <div className="info-section">
        {/* Link que envuelve el nombre para ir a la página de detalles */}
        <Link to={`/productos/${producto.id}`} className="title-link">
          <h3 className="nombre">{producto.nombre}</h3>
        </Link>
        
        <p className="precio">${producto.precio.toFixed(2)}</p>
        <p className="stock">Stock disponible: {producto.stock}</p>
      </div>
      
      {/* Botón para agregar al carrito */}
      <button 
        onClick={() => agregarCarrito({ ...producto, quantity: 1 })} 
        className="addToCartButton"
        disabled={producto.stock === 0} // Deshabilita el botón si no hay stock
      >
        {producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
      </button>
    </div>
  );
};

export default Productos;