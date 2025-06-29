import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2"; 

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true); // Renombrado de 'loading' a 'cargando' para consistencia
  const [open, setOpen] = useState(false); // Para controlar el modal de agregar
  const [seleccionado, setSeleccionado] = useState(null); // Producto seleccionado para edición
  const [openEditor, setOpenEditor] = useState(false); // Para controlar el modal de edición

  
  const apiUrl = "https://68588753138a18086dfb2a51.mockapi.io/product"; 

  // Función para cargar/recargar los productos desde la API
  const cargarProductos = async () => {
    try {
      setCargando(true); // Inicia el estado de carga
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status} al cargar productos`);
      }
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos en AdminContext:", error);
      Swal.fire({
        icon: "error",
        title: "Error de carga",
        text: "Hubo un problema al cargar los productos. Inténtalo de nuevo.",
      });
    } finally {
      setCargando(false); // Finaliza el estado de carga
    }
  };

  // useEffect para la carga inicial de productos
  useEffect(() => {
    cargarProductos();
    // El setTimeout original era para simular carga, no es necesario con el patrón async/await y cargando.
  }, []);

  // Función para agregar un nuevo producto
  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
      if (!respuesta.ok) {
        throw new Error("Error al agregar el producto");
      }
      await respuesta.json(); // Consumir la respuesta JSON
      Swal.fire({
        title: "¡Éxito!",
        text: "Producto agregado correctamente.",
        icon: "success",
        timer: 2000, // Se cierra automáticamente en 2 segundos
        showConfirmButton: false
      });
      cargarProductos(); // Recargar la lista de productos
      setOpen(false); // Cerrar el modal de agregar
    } catch (error) {
      console.error("Error al agregar producto:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo agregar el producto: ${error.message}`,
      });
    }
  };

  // Función para actualizar un producto existente
  const actualizarProducto = async (producto) => { // Corregido de 'actulizarProducto'
    try {
      const respuesta = await fetch(`${apiUrl}/${producto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
      if (!respuesta.ok) {
        throw new Error("Error al actualizar el producto");
      }
      await respuesta.json();
      Swal.fire({
        title: "¡Actualizado!",
        text: "Producto actualizado correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
      setOpenEditor(false); // Cerrar el modal de edición
      setSeleccionado(null); // Limpiar el producto seleccionado
      cargarProductos(); // Recargar la lista
    } catch (error) {
      console.error("Error al actualizar producto:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo actualizar el producto: ${error.message}`,
      });
    }
  };

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    // Usamos Swal.fire para la confirmación en lugar de window.confirm
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545", // Color rojo de Bootstrap para peligro
      cancelButtonColor: "#6c757d", // Color gris de Bootstrap para secundario
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) { // Si el usuario confirma
      try {
        const respuesta = await fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
        });
        if (!respuesta.ok) {
          throw new Error("Error al eliminar el producto");
        }
        Swal.fire({
          title: "¡Eliminado!",
          text: "El producto ha sido eliminado correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        cargarProductos(); // Recargar la lista
      } catch (error) {
        console.error("Error al eliminar producto:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Hubo un problema al eliminar el producto: ${error.message}`,
        });
      }
    }
  };

  return (
    <AdminContext.Provider
      value={{
        productos,
        cargando, // Exportamos el estado 'cargando'
        open,
        setOpen,
        openEditor,
        setOpenEditor,
        seleccionado,
        setSeleccionado,
        agregarProducto,
        actualizarProducto, // Exportamos el nombre corregido
        eliminarProducto,
        cargarProductos, // Opcional: exportar para recargas manuales si fuera necesario en Admin.jsx
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};