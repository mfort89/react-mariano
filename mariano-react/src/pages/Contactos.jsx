import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async'; 

/**
 * Componente Contactos.
 * Proporciona un formulario de contacto y/o información de contacto para la tienda.
 */
const Contactos = () => {
  // Estado local para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  // Manejador de cambios para los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'); // Usar toastify para notificaciones reales
    setFormData({ nombre: '', email: '', mensaje: '' }); // Limpiar formulario
  };

  return (
    <>
      <Helmet>
        <title>Contacto - Tienda Gamer</title>
        <meta name="description" content="Contáctate con Tienda Gamer para preguntas, soporte o información sobre nuestros productos y servicios de videojuegos." />
      </Helmet>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">Contáctanos</h1>
            <p className="lead text-secondary">
              ¿Tienes alguna pregunta, sugerencia o necesitas ayuda con tu compra?
              ¡No dudes en ponerte en contacto con nosotros!
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg rounded-3 p-4">
              <Card.Body>
                <h2 className="h4 text-center mb-4">Envíanos un Mensaje</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Introduce tu nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="ejemplo@dominio.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formMensaje">
                    <Form.Label>Tu Mensaje</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Escribe aquí tu consulta o comentario..."
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" className="py-2">
                      Enviar Mensaje
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Sección de Información de Contacto (opcional) */}
        <Row className="justify-content-center mt-5">
          <Col md={10} lg={8} className="text-center">
            <h2 className="h4 fw-bold text-secondary mb-3">O encuéntranos aquí:</h2>
            <p className="lead">
              <i className="bi bi-geo-alt-fill me-2"></i>Calle de los Gamers 123, Ciudad Gaming, País
            </p>
            <p className="lead">
              <i className="bi bi-envelope-fill me-2"></i>info@tiendagamer.com
            </p>
            <p className="lead">
              <i className="bi bi-phone-fill me-2"></i>+XX XXX XXXX XXXX
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contactos;