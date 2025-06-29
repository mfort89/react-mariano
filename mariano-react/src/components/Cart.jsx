import React, { useContext } from 'react';
// Importamos componentes de react-bootstrap para la barra lateral, botones y listas
import { Offcanvas, Button, ListGroup, Stack } from 'react-bootstrap';
import { FaTimes, FaTrashAlt } from 'react-icons/fa'; // Icono de cerrar y de eliminar

// Importamos CartContext para acceder al estado y funciones del carrito
import { CartContext } from '../context/CartContext';

/**
 * Componente Cart.
 * Muestra una barra lateral (Offcanvas) con los productos en el carrito.
 * Permite ver, eliminar ítems, vaciar el carrito y finalizar la compra.
 * Su visibilidad es controlada por el estado 'isCartOpen' del CartContext.
 */
const Cart = () => {
  // Obtenemos los estados y funciones necesarios del CartContext
  const { cart, handleDeleteFromCart, clearCart, isCartOpen, toggleCart } = useContext(CartContext);

  // Calcula el total de la compra
  const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    // Offcanvas de react-bootstrap.
    // 'show': Controla si el Offcanvas está visible o no (basado en isCartOpen).
    // 'onHide': Función que se llama cuando el Offcanvas debe cerrarse (ej. clic fuera, Esc).
    // 'placement="end"': Aparece desde el lado derecho de la pantalla.
    // 'backdrop={true}': Muestra un fondo oscuro detrás del Offcanvas para enfocar.
    // 'scroll={false}': El scroll de la página no se mueve con el Offcanvas.
    <Offcanvas show={isCartOpen} onHide={toggleCart} placement="end" backdrop={true} scroll={false}>
      <Offcanvas.Header closeButton className="bg-dark text-white"> {/* Encabezado del Offcanvas con botón de cerrar */}
        <Offcanvas.Title className="fw-bold fs-5">🛒 Tu Carrito de Compras</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column"> {/* Cuerpo del Offcanvas, usa flexbox */}
        {cart.length === 0 ? (
          // Mensaje si el carrito está vacío
          <div className="text-center my-5">
            <p className="text-muted fs-5">Tu carrito está vacío. ¡Explora nuestros productos!</p>
            <Button variant="outline-primary" onClick={toggleCart}>
              Volver a la tienda
            </Button>
          </div>
        ) : (
          // Contenido del carrito si hay productos
          <>
            <ListGroup variant="flush" className="flex-grow-1 overflow-auto"> {/* Lista de productos, crece para ocupar espacio y permite scroll */}
              {cart.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center py-3">
                  <Stack direction="horizontal" gap={3}> {/* Stack para organizar el contenido del ítem */}
                    {/* Imagen pequeña del producto */}
                    <img
                      src={item.imagen || `https://placehold.co/50x50/cccccc/333333?text=${encodeURIComponent(item.nombre || 'Prod')}`}
                      alt={item.nombre}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                    />
                    <div>
                      {/* Nombre y cantidad del producto */}
                      <div className="fw-bold">{item.nombre}</div>
                      <div className="text-muted small">Cantidad: {item.cantidad}</div>
                    </div>
                  </Stack>
                  {/* Precio y botón de eliminar */}
                  <Stack direction="horizontal" gap={2}>
                    <div className="fw-bold text-primary">${(item.precio * item.cantidad).toFixed(2)}</div>
                    <Button
                      variant="outline-danger" // Botón de eliminar con estilo de peligro
                      size="sm" // Tamaño pequeño
                      onClick={() => handleDeleteFromCart(item)}
                      aria-label={`Eliminar ${item.nombre} del carrito`}
                    >
                      <FaTrashAlt /> {/* Icono de bote de basura */}
                    </Button>
                  </Stack>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="border-top pt-3 mt-3"> {/* Separador y área de total/botones */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0 text-dark">Total:</h4>
                <h4 className="mb-0 text-primary fw-bold">${total.toFixed(2)}</h4>
              </div>
              <div className="d-grid gap-2"> {/* Botones apilados */}
                <Button variant="success" className="py-2" onClick={clearCart}>
                  Finalizar Compra
                </Button>
                <Button variant="outline-secondary" className="py-2" onClick={toggleCart}>
                  Seguir Comprando
                </Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
