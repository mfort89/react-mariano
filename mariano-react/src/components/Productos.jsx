import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, InputGroup, FormControl, Badge } from 'react-bootstrap';

/**
 * Componente Productos.
 * Muestra un producto individual en formato de tarjeta.
 *
 * @param {object} props - Las props del componente.
 * @param {object} props.producto - Objeto que contiene los detalles del producto.
 * @param {function} props.onAddToCart - Función para agregar el producto al carrito.
 */
const Productos = ({ producto, onAddToCart }) => {
  const [cantidad, setCantidad] = useState(1);

  // Funciones para controlar la cantidad de producto a agregar
  const increase = () => {
    if (cantidad < producto.stock) {
      setCantidad(prev => prev + 1);
    }
  };

  const decrease = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };

  // URL de imagen de fallback
  const fallbackImageUrl = `https://placehold.co/300x200/cccccc/333333?text=${encodeURIComponent(producto.nombre || 'Producto')}`;

  return (
    <Card className="h-100 shadow-sm rounded d-flex flex-column border-0" style={{ backgroundColor: '#212529', color: '#f8f9fa' }}>
      <Card.Img
        variant="top"
        src={producto.imagen || fallbackImageUrl}
        alt={producto.nombre}
        className="img-fluid rounded-top"
        style={{ height: '200px', objectFit: 'cover' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImageUrl;
        }}
      />

      <Card.Body className="d-flex flex-column text-center p-3">
        <Card.Title className="fw-bold mb-2 text-truncate text-white">{producto.nombre}</Card.Title>
        <Card.Text className="fs-5 fw-bold text-primary mb-2">
          ${producto.precio ? producto.precio.toFixed(2) : 'N/A'}
        </Card.Text>

        <Card.Text className="mb-3">
          Stock: {' '}
          <Badge bg={producto.stock > 0 ? "success" : "danger"} className="p-2">
            {producto.stock > 0 ? producto.stock : "Agotado"}
          </Badge>
        </Card.Text>

        {/* Controles de cantidad */}
        <div className="d-flex justify-content-center align-items-center mb-3">
          <Button variant="outline-light" size="sm" onClick={decrease} disabled={cantidad <= 1} className="rounded-start">
            -
          </Button>
          <InputGroup style={{ width: 'auto', flexGrow: 0 }}>
            <FormControl
              className="text-center bg-secondary text-white border-secondary"
              readOnly
              value={cantidad}
              style={{ maxWidth: '60px' }}
            />
          </InputGroup>
          <Button variant="outline-light" size="sm" onClick={increase} disabled={cantidad >= producto.stock} className="rounded-end">
            +
          </Button>
        </div>

        {/* Botones de acción */}
        <div className="mt-auto d-grid gap-2">
          <Button
            variant="primary"
            onClick={() => onAddToCart({ ...producto, cantidad: cantidad })}
            disabled={producto.stock === 0}
            className="py-2 fw-bold"
          >
            {producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
          </Button>

          <Button
            variant="outline-info"
            as={Link}
            to={`/productos/${producto.id}`}
            className="py-2 fw-bold"
          >
            Ver más
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Productos;
