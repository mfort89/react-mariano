import React, { useState, useEffect } from 'react';

const FormularioEdicion = ({ productoSeleccionado, onActualizar }) => {
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    stock: '',
    imagen: '',
    categoria: '',
    descripcion: ''
  });

  useEffect(() => {
    if (productoSeleccionado) {
      setProducto(productoSeleccionado);
    }
  }, [productoSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onActualizar(producto);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold">Editar Producto</h2>

      <div>
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={producto.id || ''}
          readOnly
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre || ''}
          onChange={handleChange}
          required
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={producto.precio || ''}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div>
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={producto.stock || ''}
          onChange={handleChange}
          required
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div>
        <label>Imagen (URL):</label>
        <input
          type="text"
          name="imagen"
          value={producto.imagen || ''}
          onChange={handleChange}
          required
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div>
        <label>Categoría:</label>
        <input
          type="text"
          name="categoria"
          value={producto.categoria || ''}
          onChange={handleChange}
          required
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={producto.descripcion || ''}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
      >
        Actualizar Producto
      </button>
    </form>
  );
};

export default FormularioEdicion;
