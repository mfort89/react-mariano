import React, { useContext } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap'; 
import Productos from './Productos'; 


import { CartContext } from '../context/CartContext';


const ProductList = () => {
  // Obtenemos los productos (que ya vienen filtrados por CartContext), 
  // su estado de carga y error, y la función handleAddToCart del CartContext.
  const { productos, cargandoProductos, errorProductos, handleAddToCart } = useContext(CartContext);

  // --- Renderizado condicional para estados de carga, error o sin productos ---
  if (cargandoProductos) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </Spinner>
        <p className="mt-3 text-muted">Cargando la diversión...</p>
      </div>
    );
  }

  if (errorProductos) {
    return (
      <div className="text-center text-danger py-4">
        <p>Error al cargar los productos: {errorProductos.message || 'Error desconocido'}</p>
        <p>Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  if (!productos || productos.length === 0) {
    return (
      <div className="text-center py-5">
        <h3 className="text-muted">No se encontraron productos disponibles.</h3>
        <p className="text-secondary">Parece que no hay nada por aquí todavía, o tu búsqueda no arrojó resultados.</p>
      </div>
    );
  }

  return (
    // Grilla responsiva de productos usando Row y Col de react-bootstrap
    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 justify-content-center">
      {productos.map((producto) => (
        <Col key={producto.id} className="d-flex align-items-stretch">
          {/* Renderiza el componente Productos (tarjeta individual)
              Le pasa el objeto 'producto' y la función 'onAddToCart' */}
          <Productos producto={producto} onAddToCart={handleAddToCart} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;