// src/components/estaticos/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Iconos de redes sociales

const Footer = () => (
  // Footer con fondo oscuro, texto blanco, padding y margen superior.
  <footer className="bg-dark text-white py-4 mt-5 shadow-sm">
    <Container>
      <Row className="justify-content-center text-center text-md-start">
        {/* Columna de Información de la Empresa */}
        <Col md={4} className="mb-3 mb-md-0">
          <h5 className="text-uppercase fw-bold mb-3">Tienda Gamer</h5>
          <p>Tu destino número uno para videojuegos, consolas y accesorios de última generación. Calidad y diversión garantizadas.</p>
        </Col>

        {/* Columna de Enlaces Rápidos */}
        <Col md={3} className="mb-3 mb-md-0">
          <h5 className="text-uppercase fw-bold mb-3">Enlaces Rápidos</h5>
          <ul className="list-unstyled">
            <li><a href="/" className="text-white text-decoration-none">Inicio</a></li>
            <li><a href="/productos" className="text-white text-decoration-none">Productos</a></li>
            <li><a href="/acercade" className="text-white text-decoration-none">Acerca De</a></li>
            <li><a href="/contacto" className="text-white text-decoration-none">Contacto</a></li>
          </ul>
        </Col>

        {/* Columna de Contacto */}
        <Col md={3} className="mb-3 mb-md-0">
          <h5 className="text-uppercase fw-bold mb-3">Contacto</h5>
          {/* Para estos iconos (bi bi-), necesitarás 'bootstrap-icons' en tu proyecto */}
          <p><i className="bi bi-geo-alt-fill me-2"></i>Calle Falsa 123, Ciudad, País</p>
          <p><i className="bi bi-envelope-fill me-2"></i>info@tiendagamer.com</p>
          <p><i className="bi bi-phone-fill me-2"></i>+54 11 1234 5678</p>
        </Col>

        {/* Columna de Redes Sociales */}
        <Col md={2} className="mb-3 mb-md-0">
          <h5 className="text-uppercase fw-bold mb-3">Síguenos</h5>
          <div className="d-flex justify-content-center justify-content-md-start">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaLinkedin size={24} />
            </a>
          </div>
        </Col>
      </Row>
      <hr className="my-4 border-light" />
      <Row>
        <Col className="text-center">
          <small>&copy; {new Date().getFullYear()} Tienda Gamer. Todos los derechos reservados. Desarrollado por Mariano Fort.</small>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
