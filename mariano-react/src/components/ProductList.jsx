import React, { useContext } from 'react'
import Productos from './Productos'
import { CartContext } from '../context/CartContext'

const ProductList = () => {
  const { productos } = useContext(CartContext)

  return (
    <>
      <h2>Galería de productos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {productos.map(producto => (
          <Productos key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  )
}

export default ProductList
