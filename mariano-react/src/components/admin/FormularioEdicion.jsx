import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa'; // Iconos para guardar y cerrar

/**
 * Componente FormularioEdicion.
 * Formulario para editar un producto existente.
 * Recibe el producto a editar y una función para manejar la actualización.
 * Utiliza componentes de react-bootstrap y aplica validaciones.
 *
 * @param {object} props - Las props del componente.
 * @param {object} props.productoSeleccionado - El objeto del producto a precargar en el formulario.
 * @param {function} props.onActualizar - Función para llamar con los datos actualizados del producto.
 * @param {function} props.onClose - Función para cerrar el modal donde se encuentra el formulario.
 */
const FormularioEdicion = ({ productoSeleccionado, onActualizar, onClose }) => {
  // Estado local del producto que se está editando
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    stock: '',
    imagen: '',
    categoria: '',
    descripcion: ''
  });
  // Estado para manejar los errores de validación del formulario
  const [errors, setErrors] = useState({});

  // Efecto para precargar los datos del producto seleccionado cuando cambia
  useEffect(() => {
    if (productoSeleccionado) {
      setProducto({
        id: productoSeleccionado.id || '',
        nombre: productoSeleccionado.nombre || '',
        precio: productoSeleccionado.precio || '',
        stock: productoSeleccionado.stock || '',
        imagen: productoSeleccionado.imagen || '',
        categoria: productoSeleccionado.categoria || '',
        descripcion: productoSeleccionado.descripcion || ''
      });
      setErrors({}); // Limpiar errores al cargar un nuevo producto
    }
  }, [productoSeleccionado]);

  /**
   * Manejador de cambios para los campos del formulario.
   * Convierte 'precio' y 'stock' a números.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: (name === 'precio' || name === 'stock') ? Number(value) : value,
    }));
    // Limpiar el error específico del campo al que se le está escribiendo
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  /**
   * Realiza la validación del formulario.
   * @returns {object} Un objeto con errores si los hay, o vacío si es válido.
   */
  const validateForm = () => {
    const newErrors = {};
    if (!producto.nombre.trim()) {
      newErrors.nombre = 'El nombre del producto es obligatorio.';
    }
    if (isNaN(producto.precio) || producto.precio <= 0) {
      newErrors.precio = 'El precio debe ser un número mayor que 0.';
    }
    if (isNaN(producto.stock) || producto.stock < 0) {
      newErrors.stock = 'El stock debe ser un número entero no negativo.';
    }
    if (!producto.descripcion || producto.descripcion.trim().length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres.';
    }
    if (!producto.imagen.trim()) {
      newErrors.imagen = 'La URL de la imagen es obligatoria.';
    }
    if (!producto.categoria.trim()) {
      newErrors.categoria = 'La categoría es obligatoria.';
    }
    return newErrors;
  };

  /**
   * Manejador del envío del formulario.
   * Realiza la validación antes de llamar a onActualizar.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onActualizar(producto); // Llama a la función de actualización del contexto
      // onClose(); // Esto se puede llamar aquí si onActualizar no lo hace automáticamente
                 // (AdminContext lo hace con Swal.fire y luego recarga)
    }
  };

  return (
    // Usa Form de react-bootstrap. El padding y sombra ya los maneja el Modal.Body
    <Form onSubmit={handleSubmit} className="p-1">
      <h4 className="mb-4 text-center text-primary">Detalles del Producto</h4>

      {/* Campo ID (solo lectura) */}
      <Form.Group as={Row} className="mb-3" controlId="formEditId">
        <Form.Label column sm="3">ID:</Form.Label>
        <Col sm="9">
          <Form.Control type="text" value={producto.id || ''} readOnly disabled />
        </Col>
      </Form.Group>

      {/* Campo Nombre */}
      <Form.Group as={Row} className="mb-3" controlId="formEditNombre">
        <Form.Label column sm="3">Nombre:</Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            name="nombre"
            value={producto.nombre || ''}
            onChange={handleChange}
            isInvalid={!!errors.nombre} // Muestra el estilo de error de Bootstrap
          />
          <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* Campo Precio */}
      <Form.Group as={Row} className="mb-3" controlId="formEditPrecio">
        <Form.Label column sm="3">Precio:</Form.Label>
        <Col sm="9">
          <Form.Control
            type="number"
            name="precio"
            value={producto.precio || ''}
            onChange={handleChange}
            min="0"
            step="0.01"
            isInvalid={!!errors.precio}
          />
          <Form.Control.Feedback type="invalid">{errors.precio}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* Campo Stock */}
      <Form.Group as={Row} className="mb-3" controlId="formEditStock">
        <Form.Label column sm="3">Stock:</Form.Label>
        <Col sm="9">
          <Form.Control
            type="number"
            name="stock"
            value={producto.stock || ''}
            onChange={handleChange}
            min="0"
            isInvalid={!!errors.stock}
          />
          <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* Campo Imagen (URL) */}
      <Form.Group as={Row} className="mb-3" controlId="formEditImagen">
        <Form.Label column sm="3">Imagen (URL):</Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            name="imagen"
            value={producto.imagen || ''}
            onChange={handleChange}
            isInvalid={!!errors.imagen}
          />
          <Form.Control.Feedback type="invalid">{errors.imagen}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* Campo Categoría */}
      <Form.Group as={Row} className="mb-3" controlId="formEditCategoria">
        <Form.Label column sm="3">Categoría:</Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            name="categoria"
            value={producto.categoria || ''}
            onChange={handleChange}
            isInvalid={!!errors.categoria}
          />
          <Form.Control.Feedback type="invalid">{errors.categoria}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* Campo Descripción */}
      <Form.Group className="mb-4" controlId="formEditDescripcion">
        <Form.Label>Descripción:</Form.Label>
        <Form.Control
          as="textarea"
          name="descripcion"
          value={producto.descripcion || ''}
          onChange={handleChange}
          rows="3"
          isInvalid={!!errors.descripcion}
        />
        <Form.Control.Feedback type="invalid">{errors.descripcion}</Form.Control.Feedback>
      </Form.Group>

      {/* Botones de acción */}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onClose} className="d-flex align-items-center">
          <FaTimes className="me-2" /> Cancelar
        </Button>
        <Button type="submit" variant="primary" className="d-flex align-items-center">
          <FaSave className="me-2" /> Actualizar Producto
        </Button>
      </div>
    </Form>
  );
};

export default FormularioEdicion;