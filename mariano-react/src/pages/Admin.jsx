import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Spinner,
  Card,
  Modal, // Usaremos Modal para los formularios de agregar/editar
  Stack, // Para organizar elementos horizontalmente
} from "react-bootstrap";
import { FaSignOutAlt, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Iconos para los botones

// Importamos los contextos necesarios
import { CartContext } from "../context/CartContext"; // Para setIsAuth y handleLogout
import { AdminContext } from "../context/AdminContext"; // Para la gestión de productos en el panel

// Importamos los formularios (asumimos que estos también serán estilizados con Bootstrap internamente)
import FormularioProducto from "../components/admin/FormularioProducto";
import FormularioEdicion from "../components/admin/FormularioEdicion";

/**
 * Componente Admin.
 * Este panel permite a los usuarios administradores gestionar los productos:
 * ver la lista, agregar nuevos, editar existentes y eliminarlos.
 * Incorpora un sistema de autenticación básica (logout) y utiliza componentes de Bootstrap
 * para su diseño y funcionalidad.
 */
const Admin = () => {
  // Obtenemos la función para cambiar el estado de autenticación y handleLogout desde CartContext
  // Renombramos handleLogout a globalHandleLogout para evitar conflictos si tuvieras otra función local.
  const { handleLogout: globalHandleLogout } = useContext(CartContext); 

  // Obtenemos los estados y funciones de gestión de productos desde AdminContext
  const {
    productos,
    cargando, 
    open, 
    setOpen,
    openEditor, 
    setOpenEditor,
    seleccionado, 
    setSeleccionado,
    agregarProducto,
    actualizarProducto, 
    eliminarProducto,
  } = useContext(AdminContext);

  // Hook para la navegación programática
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => { // Esta función local ahora llama a la global
    globalHandleLogout(); // Llama a la función de logout del CartContext
    navigate("/"); // Redirige al usuario a la página de inicio
  };

  // Funciones para abrir/cerrar los Modals
  const handleOpenAddModal = () => setOpen(true);
  const handleCloseAddModal = () => setOpen(false);

  const handleOpenEditModal = (product) => {
    setSeleccionado(product);
    setOpenEditor(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditor(false);
    setSeleccionado(null); // Limpiar producto seleccionado al cerrar
  };

  return (
    <Container className="my-4 p-4 bg-white rounded shadow-lg">
      {cargando ? ( // Usa el estado 'cargando' de AdminContext
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Cargando productos...</span>
          </Spinner>
          <p className="mt-3 text-muted">Cargando el panel administrativo...</p>
        </div>
      ) : (
        <>
          <Row className="mb-4 justify-content-end">
            <Col xs="auto"> 
              <Stack direction="horizontal" gap={3}> 
                <Button variant="outline-danger" onClick={handleLogout} className="d-flex align-items-center">
                  <FaSignOutAlt className="me-2" /> Cerrar sesión
                </Button>
                <Button variant="outline-secondary" disabled>Admin Panel</Button>
              </Stack>
            </Col>
          </Row>

          <h1 className="text-center mb-5 display-4 fw-bold text-dark text-uppercase">
            Panel Administrativo
          </h1>

          <Card className="mb-5 p-4 border-0 shadow-sm" style={{ backgroundColor: '#f8faff' }}>
            <Card.Body>
              <h2 className="text-center mb-4 text-primary fw-bold fs-4">
                Gestión de Productos
              </h2>
              <Button variant="success" className="w-100 py-3 mb-4 fs-5 fw-bold" onClick={handleOpenAddModal}>
                <FaPlus className="me-2" /> Agregar Nuevo Producto
              </Button>

              <Modal show={open} onHide={handleCloseAddModal} centered>
                <Modal.Header closeButton className="bg-success text-white">
                  <Modal.Title>Agregar Nuevo Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FormularioProducto onAgregar={agregarProducto} onClose={handleCloseAddModal} />
                </Modal.Body>
              </Modal>

              {productos.length === 0 ? (
                <div className="text-center text-muted py-4">
                  No hay productos para mostrar.
                </div>
              ) : (
                <Table responsive striped bordered hover className="mt-4 shadow-sm rounded-3 overflow-hidden">
                  <thead className="bg-primary text-white"> 
                    <tr>
                      <th className="py-3">Imagen</th>
                      <th className="py-3">Nombre</th>
                      <th className="py-3">Precio</th>
                      <th className="py-3">Stock</th>
                      <th className="py-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={product.imagen || `https://placehold.co/60x60/cccccc/333333?text=N/A`}
                            alt={product.nombre}
                            className="img-fluid rounded"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>{product.nombre}</td>
                        <td>${product.precio?.toFixed(2) || 'N/A'}</td>
                        <td>{product.stock}</td>
                        <td className="text-center">
                          <Stack direction="horizontal" gap={2} className="justify-content-center">
                            <Button
                              variant="warning" 
                              size="sm"
                              onClick={() => handleOpenEditModal(product)}
                            >
                              <FaEdit /> Editar
                            </Button>
                            <Button
                              variant="danger" 
                              size="sm"
                              onClick={() => eliminarProducto(product.id)}
                            >
                              <FaTrashAlt /> Eliminar
                            </Button>
                          </Stack>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              <Modal show={openEditor} onHide={handleCloseEditModal} centered>
                <Modal.Header closeButton className="bg-warning text-dark">
                  <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {seleccionado && ( 
                    <FormularioEdicion
                      productoSeleccionado={seleccionado}
                      onActualizar={actualizarProducto}
                      onClose={handleCloseEditModal}
                    />
                  )}
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Admin;