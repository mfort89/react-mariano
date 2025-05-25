
import React from 'react';
import { Link } from 'react-router-dom'; 
import './styleProductos.css'; 

const Productos = ({ producto, agregarCarrito }) => {
  return (
    <div className="product-card">
      {/* Envuelve la imagen con Link */}
      <Link to={`/productos/${producto.id}`}> {/* <--- RUTA DINÁMICA */}
        <img src={producto.imagen} alt={producto.nombre} className="imagen" />
      </Link>

      <div className="product-info">
        {/* Opcional: También puedes envolver el nombre del producto con Link */}
        <Link to={`/productos/${producto.id}`} className="product-name-link"> {/* Puedes añadir una clase para estilo si lo necesitas */}
          <h2 className="nombre">{producto.nombre}</h2>
        </Link>
        
        <p className="precio">${producto.precio.toFixed(2)}</p>
        <p className="stock">Stock: {producto.stock}</p>
      </div>
      <button 
        onClick={() => agregarCarrito({ ...producto, quantity: 1 })} 
        className="add-to-cart-button"
        disabled={producto.stock === 0}
      >
        {producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
      </button>
    </div>
  );
};

export default Productos;