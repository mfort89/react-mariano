import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup, Spinner, Alert, InputGroup, FormControl } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async'; // Para SEO

// ¡Ahora importamos SOLO CartContext!
import { CartContext } from '../context/CartContext'; 

const DetallesDeProductos = () => {
  const { id } = useParams(); // Obtiene el ID del producto de la URL
  // Obtenemos todos los productos (sin filtrar aquí, ya que buscamos por ID específico)
  // y el estado de carga/error, y la función para añadir al carrito, todo del CartContext.
  const { productos: allProducts, cargandoProductos, errorProductos, handleAddToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [localLoading, setLocalLoading] = useState(true); // Para la carga local
  const [localError, setLocalError] = useState(null); // Para errores locales
  const [cantidad, setCantidad] = useState(1); // Cantidad a añadir al carrito

  // Efecto para encontrar el producto específico una vez que todos los productos estén cargados
  useEffect(() => {
    // Si CartContext aún está cargando o tiene un error global para productos
    if (cargandoProductos || errorProductos) {
      setLocalLoading(cargandoProductos);
      setLocalError(errorProductos);
      return;
    }

    // Una vez que allProducts estén disponibles (y no haya error global)
    if (allProducts.length > 0) {
      // Busca el producto por ID. Convierte ambos a String para una comparación robusta.
      const foundProduct = allProducts.find(p => String(p.id) === String(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setLocalLoading(false); // La carga local ha terminado
      } else {
        // Si no se encuentra el producto después de cargar todos, es un error 404
        setLocalError("Producto no encontrado.");
        setLocalLoading(false);
      }
    } else { // Si allProducts está vacío y no hay carga/error global, significa que no hay productos o el ID no existe.
      setLocalLoading(false);
      setLocalError("No se pudieron cargar los productos o el producto no existe.");
    }
  }, [id, allProducts, cargandoProductos, errorProductos]); // Dependencias del useEffect

  // Manejadores de cantidad
  const increase = () => {
    if (product && cantidad < product.stock) {
      setCantidad(prev => prev + 1);
    }
  };

  const decrease = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };

  // Manejador para agregar al carrito
  const handleAddToCartClick = () => {
    if (product) {
      handleAddToCart({ ...product, cantidad: cantidad });
    }
  };

  // --- Renderizado del estado de carga, error o producto no encontrado ---
  // Si está cargando a nivel global (CartContext) o localmente
  if (localLoading || cargandoProductos) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando producto...</span>
        </Spinner>
        <p className="mt-3 text-muted">Cargando detalles del producto...</p>
      </Container>
    );
  }

  // Si hay un error local (ej. producto no encontrado) o un error del contexto
  if (localError) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>¡Error!</Alert.Heading>
          <p>{localError.message || localError}</p>
          <Link to="/productos" className="btn btn-danger mt-3">Volver a la Galería</Link>
        </Alert>
      </Container>
    );
  }

  // Si no se encontró el producto (después de la carga y sin errores)
  if (!product) {
    return (
      <Container className="text-center py-5">
        <h1 className="display-5 text-danger">Producto no encontrado</h1>
        <p className="lead">El producto con ID "{id}" no existe o ha sido eliminado.</p>
        <Link to="/productos" className="btn btn-primary mt-3">Volver a la Galería</Link>
      </Container>
    );
  }

  // --- Renderizado de los detalles del producto ---
  const fallbackImageUrl = `https://placehold.co/600x400/cccccc/333333?text=${encodeURIComponent(product.nombre || 'Producto')}`;

  return (
    <>
      <Helmet>
        <title>{product.nombre} - Tienda Gamer</title>
        <meta name="description" content={`Descubre ${product.nombre}, disponible en Tienda Gamer. Precio: $${product.precio?.toFixed(2) || 'N/A'}. ${product.descripcion || 'Conoce más detalles y añádelo a tu carrito.'}`} />
      </Helmet>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <Card className="shadow-lg rounded-3 border-0">
              <Card.Body className="p-4 p-md-5">
                <Row>
                  <Col md={6} className="mb-4 mb-md-0 d-flex justify-content-center align-items-center">
                    <img
                      src={product.imagen || fallbackImageUrl} 
                      alt={product.nombre}
                      className="img-fluid rounded-3 shadow-sm"
                      style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImageUrl;
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <Card.Title className="display-5 fw-bold text-dark mb-3">
                      {product.nombre}
                    </Card.Title>

                    <Card.Text className="lead text-secondary mb-3">
                      {product.descripcion || "Descripción no disponible."}
                    </Card.Text>

                    <Card.Text className="fs-3 fw-bold text-primary mb-4">
                      Precio: ${product.precio ? product.precio.toFixed(2) : 'N/A'}
                    </Card.Text>

                    <ListGroup variant="flush" className="mb-4 rounded">
                      <ListGroup.Item>
                        <strong>Categoría:</strong> {product.categoria || 'N/A'}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Marca:</strong> {product.brand || 'Acme'}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>SKU:</strong> {product.sku || (product.id * 1250)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Fecha de lanzamiento:</strong>{' '}
                        {product.releaseDate ? new Date(product.releaseDate).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }) : new Date().toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Stock:</strong>{' '}
                        <span className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                          {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
                        </span>
                      </ListGroup.Item>
                    </ListGroup>

                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <Button variant="outline-secondary" size="sm" onClick={decrease} disabled={cantidad <= 1}>
                          -
                        </Button>
                        <InputGroup style={{ width: 'auto', flexGrow: 0 }}>
                          <FormControl
                            className="text-center"
                            readOnly
                            value={cantidad}
                            style={{ maxWidth: '60px' }}
                          />
                        </InputGroup>
                        <Button variant="outline-secondary" size="sm" onClick={increase} disabled={product.stock <= 0 || cantidad >= product.stock}>
                          +
                        </Button>
                    </div>

                    <div className="d-grid gap-2">
                      <Button
                        variant="success"
                        onClick={handleAddToCartClick}
                        disabled={product.stock <= 0}
                        className="py-2"
                      >
                        {product.stock > 0 ? `Agregar ${cantidad} al Carrito` : 'Sin Stock'}
                      </Button>
                      <Button variant="outline-secondary" as={Link} to="/productos" className="py-2">
                        Volver a la Galería
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetallesDeProductos;