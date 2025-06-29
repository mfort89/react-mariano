// src/components/estaticos/Header.jsx
import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa'; 

// Importamos CartContext, que ahora provee toda la lógica de carrito, productos y autenticación.
import { CartContext } from '../../context/CartContext';

const Header = () => {
  // Obtenemos todos los estados y funciones necesarios del CartContext
  const { 
    cart, 
    isAuthenticated, 
    userRole, 
    handleLogout, 
    toggleCart,
    terminoBusqueda,    // Término de búsqueda actual (Controlado por CartContext)
    setTerminoBusqueda, // Para actualizar el término de búsqueda en CartContext
    setCategoriaFiltro  // Para establecer el filtro de categoría en CartContext
  } = useContext(CartContext);

  const navigate = useNavigate();
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  // Maneja el cambio en el input de búsqueda (ejecutado en cada pulsación de tecla).
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setTerminoBusqueda(newSearchTerm); // Actualiza el término de búsqueda en CartContext
    setCategoriaFiltro('all'); // Limpia cualquier filtro de categoría al iniciar una búsqueda

    // Si el usuario no está ya en la página de productos, redirigimos para ver los resultados.
    if (window.location.pathname !== '/productos') {
      navigate('/productos');
    }
  };

  // Maneja el clic en el botón de búsqueda. Puede usarse para forzar la navegación.
  const handleSearchButtonClick = (e) => {
    e.preventDefault(); // Previene la recarga de la página si está dentro de un form
    setCategoriaFiltro('all'); // Asegura que el filtro de categoría sea 'all'
    // setTerminoBusqueda ya se actualiza en handleSearchChange, solo navegamos si no estamos ya allí
    if (window.location.pathname !== '/productos') {
        navigate('/productos');
    }
  };

  // Función para manejar el logout y redirigir
  const onLogoutClick = () => {
    handleLogout(); // Llama a la función de logout del CartContext
    navigate('/'); // Redirige al inicio después de cerrar sesión
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          🎮 Tienda Gamer
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {[
              { path: '/', label: 'Inicio' },
              { path: '/productos', label: 'Productos' },
              { path: '/contacto', label: 'Contacto' },
              { path: '/acercade', label: 'Acerca De' }
            ].map((route, idx) => (
              <Nav.Link
                key={idx}
                as={NavLink}
                to={route.path}
                className={({ isActive }) => isActive ? 'nav-link active fw-semibold' : 'nav-link'}
                end={route.path === '/'}
              >
                {route.label}
              </Nav.Link>
            ))}
            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              {/* Al hacer clic en una categoría, se limpia el término de búsqueda y se establece el filtro de categoría */}
              <NavDropdown.Item as={Link} to="/productos?category=consolas" onClick={() => { setTerminoBusqueda(''); setCategoriaFiltro('consolas'); }}>Consolas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos?category=videojuegos" onClick={() => { setTerminoBusqueda(''); setCategoriaFiltro('videojuegos'); }}>Videojuegos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos?category=accesorios" onClick={() => { setTerminoBusqueda(''); setCategoriaFiltro('accesorios'); }}>Accesorios</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/productos?category=all" onClick={() => { setTerminoBusqueda(''); setCategoriaFiltro('all'); }}>Ver Todo</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Formulario de búsqueda (conectado a CartContext para búsqueda en vivo) */}
          <Form className="d-flex me-3" onSubmit={handleSearchButtonClick}> {/* onSubmit se mantiene para el botón si se presiona Enter */}
            <FormControl
              type="search"
              placeholder="Buscar productos..."
              className="me-2"
              aria-label="Buscar productos"
              value={terminoBusqueda} // El valor del input ahora se controla por terminoBusqueda del CartContext
              onChange={handleSearchChange} // Llama a la función que actualiza el contexto al escribir
            />
            <Button variant="outline-light" type="submit"> {/* type="submit" para que Enter funcione */}
              <FaSearch />
            </Button>
          </Form>

          <Nav className="align-items-center">
            <Nav.Item className="me-3">
              <Button
                variant="outline-light"
                onClick={toggleCart}
                className="position-relative"
                aria-label="Abrir carrito de compras"
              >
                <FaShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.75rem' }}
                  >
                    {totalItems}
                    <span className="visually-hidden">artículos en carrito</span>
                  </Badge>
                )}
              </Button>
            </Nav.Item>

            {!isAuthenticated ? (
              <Nav.Item>
                <Button as={Link} to="/login" variant="light">
                  Login
                </Button>
              </Nav.Item>
            ) : (
              <>
                {userRole === 'admin' && (
                  <Nav.Item className="me-2">
                    <Button as={Link} to="/admin" variant="light">
                      Admin
                    </Button>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <Button onClick={onLogoutClick} variant="light">
                    Logout
                  </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;