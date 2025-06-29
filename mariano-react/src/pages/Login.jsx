import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async'; 

import { AuthContext } from '../context/AuthContext'; 

/**
 * Componente Login.
 * Permite a los usuarios iniciar sesión en la aplicación.
 * Utiliza el AuthContext para la autenticación contra la lista de usuarios.
 */
const Login = () => {
  // Obtenemos estados y funciones del AuthContext
  const { isAuthenticated, loginUser, cargandoUsers, errorUsers, errors: authContextErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estados locales para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Estado para manejar los errores de validación local del formulario
  const [localErrors, setLocalErrors] = useState({});

  // Redirige si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin'); // O a la ruta deseada después del login
    }
  }, [isAuthenticated, navigate]);

  /**
   * Función para validar los campos del formulario localmente.
   * @returns {boolean} - true si la validación es exitosa, false en caso contrario.
   */
  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El formato del correo electrónico no es válido.';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 6) { // Ejemplo de validación de longitud
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Manejador del envío del formulario de login.
   * Llama a la función loginUser del AuthContext para intentar autenticar.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalErrors({}); // Limpia errores locales previos

    if (validateForm()) {
      const success = await loginUser(email, password); // Llama a la función de login del contexto
      // La lógica de éxito/error (mensajes de toast) ya la maneja loginUser en AuthContext.
      // Si !success, authContextErrors debería ser actualizado por AuthContext.
    }
  };

  // Muestra spinner si los usuarios están cargando
  if (cargandoUsers) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando usuarios...</span>
        </Spinner>
        <p className="mt-3 text-muted">Preparando el formulario de login...</p>
      </Container>
    );
  }

  // Muestra un error si la carga de usuarios falló
  if (errorUsers) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>¡Error de Carga!</Alert.Heading>
          <p>No se pudo cargar la información de usuarios para el login.</p>
          <p>Por favor, verifica el archivo `public/data/users.json` o la URL de la MockAPI si la usas.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - Tienda Gamer</title>
        <meta name="description" content="Inicia sesión en tu cuenta de Tienda Gamer para acceder al panel de administración o gestionar tu perfil." />
      </Helmet>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={7} lg={5}>
            <Card className="shadow-lg rounded-3 p-4 p-md-5">
              <Card.Body>
                <h2 className="text-center mb-4 display-5 fw-bold text-primary">Iniciar Sesión</h2>

                {authContextErrors.email && (
                  <Alert variant="danger" className="mb-3 text-center">
                    {authContextErrors.email}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-bold text-dark">Correo Electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Introduce tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!!localErrors.email || !!authContextErrors.email}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {localErrors.email || authContextErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label className="fw-bold text-dark">Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={!!localErrors.password || !!authContextErrors.password}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {localErrors.password || authContextErrors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" className="py-2 fw-bold fs-5">
                      Entrar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;