import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';


import { CartContext } from '../context/CartContext';

import ProductList from '../components/ProductList';
import Paginador from '../components/Paginador'; 
import loadingGif from '../assets/loading.gif'; 

/**
 * Componente GaleriaDeProductos.
 * Muestra una galería de productos, gestionando el estado de carga y error,
 * aplicando filtros por categoría y término de búsqueda, y ahora, también paginación.
 */
const GaleriaDeProductos = () => {
  // Obtenemos los productos (ya filtrados y paginados), estado de carga, error,
  // y las funciones para establecer filtros y control de paginación.
  const { 
    productos, 
    cargandoProductos, 
    errorProductos, 
    setCategoriaFiltro, 
    setTerminoBusqueda,
    paginaActual, // Estado actual de la página
    setPaginaActual, // Función para cambiar la página
    totalPaginas, // Total de páginas disponibles
    totalProductosFiltrados // Cantidad total de productos después de filtrar, antes de paginar
  } = useContext(CartContext);

  const [searchParams] = useSearchParams(); // Hook para leer los parámetros de la URL

  // Efecto para leer los parámetros 'category' y 'search' de la URL y establecer los filtros en el contexto
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const searchTermFromUrl = searchParams.get('search'); 

    // Si hay un término de búsqueda en la URL, se prioriza y se limpia la categoría
    if (searchTermFromUrl) {
      setTerminoBusqueda(searchTermFromUrl);
      setCategoriaFiltro('all'); // Si hay búsqueda, limpia filtro de categoría
    } else {
      setTerminoBusqueda(''); // Si no hay término de búsqueda, limpia el filtro
    }

    // Si hay una categoría en la URL (y no hay un término de búsqueda activo que la anule)
    if (categoryFromUrl) {
      setCategoriaFiltro(categoryFromUrl);
    } else if (!searchTermFromUrl) { // Si no hay ni categoría ni búsqueda, mostrar todos por defecto
      setCategoriaFiltro('all'); 
    }
    
  }, [searchParams, setCategoriaFiltro, setTerminoBusqueda]); 

  return (
    <>
      <Helmet>
        <title>Nuestros Productos - Tienda Gamer</title>
        <meta name="description" content="Descubre la amplia colección de videojuegos, consolas y accesorios disponible en Tienda Gamer. ¡Encuentra tu próximo juego!" />
      </Helmet>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center mb-4">
            <h1 className="display-4 fw-bold text-primary">Nuestros Productos</h1>
            <p className="lead text-muted">Explora la más amplia selección de videojuegos, consolas y accesorios.</p>
          </Col>
        </Row>

        {cargandoProductos ? (
          <Row className="justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <Col xs={12} className="text-center">
              <img src={loadingGif} alt="Cargando productos..." className="img-fluid" style={{ maxWidth: '150px' }} />
              <p className="mt-3 text-muted">Cargando la diversión...</p>
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
          totalProductosFiltrados > 0 ? ( // Usamos totalProductosFiltrados para saber si hay algo que mostrar en general
            <>
              {/* Muestra la lista de productos (solo los de la página actual, manejado por CartContext) */}
              <ProductList />
              {/* Renderiza el Paginador si hay más de una página */}
              {totalPaginas > 1 && (
                <Row className="justify-content-center mt-4">
                  <Col xs="auto">
                    <Paginador 
                      paginaActual={paginaActual}
                      totalPaginas={totalPaginas}
                      onPageChange={setPaginaActual} // Pasa la función para cambiar la página
                    />
                  </Col>
                </Row>
              )}
            </>
          ) : (
            <Row className="justify-content-center">
              <Col xs={12} className="text-center">
                <Alert variant="info">
                  No se encontraron productos disponibles para esta categoría o con este término de búsqueda.
                </Alert>
              </Col>
            </Row>
          )
        )}
      </Container>
    </>
  );
};

export default GaleriaDeProductos;