import React, { useState } from 'react';

const FormularioProducto = ({ onAgregar }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    imagen: '',
    categoria: '',
    descripcion: '',
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value,
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!producto.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }
    if (!producto.precio || producto.precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0.';
    }
    if (!producto.categoria.trim() || producto.categoria.length < 3) {
      nuevosErrores.categoria = 'La categoría debe tener al menos 3 caracteres.';
    }
    if (!producto.imagen.trim()) {
      nuevosErrores.imagen = 'La URL de la imagen es obligatoria.';
    }
    if (!producto.stock || producto.stock < 0) {
      nuevosErrores.stock = 'El stock debe ser 0 o más.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    onAgregar(producto);
    setProducto({
      nombre: '',
      precio: '',
      stock: '',
      imagen: '',
      categoria: '',
      descripcion: '',
    });
    setErrores({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold">Agregar Producto</h2>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
          required
        />
        {errores.nombre && <p className="text-red-500">{errores.nombre}</p>}
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
          min="0"
          step="0.01"
          required
        />
        {errores.precio && <p className="text-red-500">{errores.precio}</p>}
      </div>

      <div>
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
          min="0"
          required
        />
        {errores.stock && <p className="text-red-500">{errores.stock}</p>}
      </div>

      <div>
        <label>Imagen URL:</label>
        <input
          type="text"
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
          required
        />
        {errores.imagen && <p className="text-red-500">{errores.imagen}</p>}
      </div>

      <div>
        <label>Categoría:</label>
        <input
          type="text"
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
          required
        />
        {errores.categoria && <p className="text-red-500">{errores.categoria}</p>}
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
      >
        Agregar Producto
      </button>
    </form>
  );
};

export default FormularioProducto;
