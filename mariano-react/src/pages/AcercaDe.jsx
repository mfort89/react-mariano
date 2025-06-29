import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';


const AcercaDe = () => {
  return (
    <>
      <Helmet>
        <title>Acerca de Nosotros - Tienda Gamer</title>
        <meta name="description" content="Conoce la misión, visión y valores de Tienda Gamer. Somos apasionados por los videojuegos y ofrecemos la mejor experiencia de compra." />
      </Helmet>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="text-center">
            <h1 className="display-4 fw-bold text-primary mb-4">Sobre Nosotros</h1>
            <p className="lead text-secondary mb-4">
              Bienvenido a **Tienda Gamer**, tu destino definitivo para el universo de los videojuegos.
              Somos apasionados por el gaming y nos dedicamos a ofrecerte la mejor selección de
              videojuegos de última generación, las consolas más buscadas y los accesorios esenciales
              para llevar tu experiencia de juego al siguiente nivel.
            </p>
            <p className="mb-4">
              Nuestra misión es conectar a los gamers con los productos que aman, brindando una
              experiencia de compra fácil, segura y emocionante. Nos esforzamos por mantener nuestro
              catálogo actualizado con los lanzamientos más recientes y los clásicos atemporales,
              asegurando siempre la calidad y el mejor servicio.
            </p>
            <p className="mb-4">
              Desde los gráficos envolventes de las consolas de nueva generación hasta la precisión
              de los controladores y la inmersión de los auriculares, en Tienda Gamer encontrarás
              todo lo que necesitas para equiparte y sumergirte en tus mundos virtuales favoritos.
            </p>
            <p className="text-muted fst-italic">
              ¡Únete a nuestra comunidad y que la aventura continúe!
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AcercaDe;
