import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGamepad, FaArrowRight } from 'react-icons/fa'; 

// Importamos CartContext para obtener los productos y su estado
import { CartContext } from '../context/CartContext'; 

import ProductList from '../components/ProductList'; 
import loadingGif from '../assets/loading.gif'; // Tu GIF de carga

const Home = () => {
  // Obtenemos los productos (ya filtrados si se aplica), estado de carga y error del CartContext
  const { productos, cargandoProductos, errorProductos } = useContext(CartContext);

  return (
    <>
      <Helmet>
        <title>Tienda Gamer - Tu Destino para Videojuegos y Consolas</title>
        <meta name="description" content="Explora la mejor selección de videojuegos, consolas y accesorios de última generación en Tienda Gamer. ¡Ofertas exclusivas y envíos rápidos!" />
        <meta property="og:title" content="Tienda Gamer - Videojuegos y Consolas" />
        <meta property="og:description" content="Encuentra tus juegos favoritos y el mejor hardware en Tienda Gamer." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Sección principal (Hero Section) con fondo estético */}
      <div 
        className="py-5 text-center text-white d-flex align-items-center justify-content-center" 
        style={{
          minHeight: '80vh',
          background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <h1 className="display-2 fw-bolder text-primary mb-4 animate__animated animate__fadeInDown">
                Bienvenido a Tienda Gamer
              </h1>
              <p className="lead fs-4 text-white-50 mb-5 animate__animated animate__fadeInUp">
                Aquí encontrarás los últimos lanzamientos y tus clásicos favoritos.
                Sumérgete en mundos inmersivos con nuestras consolas de última generación
                y los títulos más esperados. ¡Tu aventura comienza ahora!
              </p>
              
              {/* Sección del botón de llamada a la acción */}
              <div className="animate__animated animate__zoomIn">
                <Button
                  as={Link}
                  to="/productos"
                  variant="outline-light"
                  size="lg"
                  className="py-3 px-5 fw-bold shadow-lg d-inline-flex align-items-center justify-content-center rounded-pill"
                  style={{ fontSize: '1.5rem', transition: 'all 0.3s ease', borderColor: 'var(--bs-primary)' }}
                >
                  <FaGamepad className="me-3" size={30} />
                  Explora Nuestros Productos
                  <FaArrowRight className="ms-3" size={20} />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sección de productos destacados (o todos los productos, dependiendo de la preferencia) */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center mb-4">
            <h2 className="display-4 fw-bold text-dark mb-4">Nuestros Productos Destacados</h2>
            <p className="lead text-muted">Descubre lo más vendido y las novedades en nuestro catálogo.</p>
          </Col>
        </Row>

        {/* Renderizado condicional de productos */}
        {cargandoProductos ? (
          <Row className="justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <Col xs={12} className="text-center">
              <img src={loadingGif} alt="Cargando productos..." className="img-fluid" style={{ maxWidth: '150px' }} />
              <p className="mt-3 text-muted">Cargando los últimos lanzamientos...</p>
            </Col>
          </Row>
        ) : errorProductos ? (
          <Row className="justify-content-center">
            <Col xs={12} className="text-center">
              <Alert variant="danger">
                Error al cargar los productos: {errorProductos.message || 'Error desconocido'}
              </Alert>
            </Col>
          </Row>
        ) : (
          productos && productos.length > 0 ? (
            <ProductList /> 
          ) : (
            <Row className="justify-content-center">
              <Col xs={12} className="text-center">
                <Alert variant="info">
                  No se encontraron productos disponibles.
                </Alert>
              </Col>
            </Row>
          )
        )}
      </Container>
    </>
  );
};

export default Home;