import React, { useState, useContext, useEffect } from 'react'
import './styleProductos.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const Productos = ({ producto }) => {
  const { handleAddToCart } = useContext(CartContext)
  
  // Inicializamos cantidad en 1 para que siempre haya al menos uno para agregar
  const [cantidad, setCantidad] = useState(1)

  // Controlamos que la cantidad nunca sea mayor al stock
  const increase = () => {
    if (cantidad < producto.stock) {
      setCantidad(prev => prev + 1)
    }
  }

  const decrease = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1)
    }
  }

  return (
    <section className='card'>
      <div className='imganContainer'>
        <img src={producto.imagen} alt={producto.nombre} className='imagen' />
      </div>

      <h3 className='nombre'>{producto.nombre}</h3>
      <p className='precio'>${producto.precio}</p>
      <p className='stock'>Stock: {producto.stock}</p>

      <div className='cantidadContainer'>
        <button className='qtyButton' onClick={decrease}>-</button>
        <span>{cantidad}</span>
        <button className='qtyButton' onClick={increase}>+</button>
      </div>

      <button
        onClick={() => handleAddToCart({ ...producto, cantidad })}
        disabled={producto.stock === 0}
      >
        Agregar al carrito
      </button>

      <Link to={`/productos/${producto.id}`}>Ver más</Link>
    </section>
  )
}

export default Productos
